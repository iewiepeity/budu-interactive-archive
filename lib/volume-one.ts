import archive from "./archive-source.json";

const dedupe = (text: string) => {
  const out: string[] = [];
  for (const line of text.replace(/\r/g, "").split("\n")) {
    if (line.trim() && out.at(-1)?.trim() === line.trim()) continue;
    out.push(line);
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim();
};

const chapterHeadings = ["第一章、寂靜", "第二章、星辰", "第三章、失效", "第四章、加冕於灰燼之上", "終章、荒野上的同行者"];
const cleanNovel = dedupe(archive.volumeOne);

export const volumeOne = chapterHeadings.map((heading, index) => {
  const start = cleanNovel.indexOf(heading) + heading.length;
  const next = chapterHeadings[index + 1];
  const end = next ? cleanNovel.indexOf(next) : cleanNovel.length;
  const [number, title] = heading.split("、");
  return { id: `chapter-${index + 1}`, number, title, body: cleanNovel.slice(start, end).trim() };
});

export const majorEventsText = dedupe(archive.majorEvents)
  .replace(/《當群星墜落》｜主角NPC設定[\s\S]*$/, "")
  .trim();

export type StoryEvent = { title: string; stage: string; sections: { title: string; items: string[] }[] };
export type SpoilerVolume = { title: string; events: StoryEvent[] };

export const spoilerVolumes: SpoilerVolume[] = (() => {
  const volumes: SpoilerVolume[] = [];
  let volume: SpoilerVolume | undefined;
  let event: StoryEvent | undefined;
  let section: { title: string; items: string[] } | undefined;
  for (const raw of majorEventsText.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith("《當群星墜落》")) { volume = { title: line, events: [] }; volumes.push(volume); event = undefined; continue; }
    if (line.startsWith("# 大事件")) { event = { title: line.slice(2), stage: "", sections: [] }; volume?.events.push(event); continue; }
    if (line.startsWith("## ")) { if (event) event.stage = line.slice(3); continue; }
    if (line.startsWith("### ")) { section = { title: line.slice(4), items: [] }; event?.sections.push(section); continue; }
    if (event) {
      if (!section || !event.sections.includes(section)) { section = { title: "事件內容", items: [] }; event.sections.push(section); }
      section.items.push(line.replace(/^-\s*/, ""));
    }
  }
  return volumes.filter((v, i, all) => v.events.length > 0 && all.findIndex(x => x.title === v.title && x.events.length > 0) === i);
})();
