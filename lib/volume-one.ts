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
