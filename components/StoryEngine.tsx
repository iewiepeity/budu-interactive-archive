"use client";
import { useEffect, useState } from "react";
import { Heart, RotateCcw } from "lucide-react";
import { useArchive } from "./ArchiveProvider";

type Choice = { text: string; next: string; affection?: number; badges?: string[] };
type Node = { speaker?: string; text: string; aside?: string; choices?: Choice[]; next?: string; npc?: boolean; distortion?: { original: string; warped: string } };
const story: Record<string, Node> = {
  wake: { text: "潮濕。\n\n很冷。\n\n你睜開眼睛時，第一個看見的是王城地牢生鏽的鐵欄。第二個看見的，是旁邊盤腿坐著、正把黑髮抓得更亂的男人。", next: "first" },
  first: { speaker: "陌生男人", text: "……三小？", choices: [
    { text: "你是誰？", next: "who" }, { text: "這裡是哪？", next: "where" }, { text: "你好帥。", next: "handsome", affection: 1 }, { text: "先摸一下牆壁。", next: "wall" }
  ]},
  who: { speaker: "陌生男人", text: "許哲維。寫小說的。\n\n幹，現在是囚犯。", choices: [{ text: "報上自己的名字。", next: "recognition", affection: 1 }, { text: "不重要，先出去。", next: "recognition" }] },
  where: { speaker: "陌生男人", text: "王城地牢。\n\n第一集剛結束。\n\n我只是去示警，王儲就把我丟進來。靠北。", next: "recognition" },
  handsome: { speaker: "陌生男人", text: "……謝囉。\n\n但現在是講這個的時候嗎？", aside: "許哲維好感度 +1", next: "recognition" },
  wall: { text: "你摸了摸牆。濕的。冰的。非常有牆的感覺。", aside: "許哲維看妳的眼神，多了一點對智力的擔憂。", next: "recognition" },
  recognition: { speaker: "許哲維", text: "等一下。\n\n妳不是我寫的人。", choices: [{ text: "你也不是。", next: "warning", affection: 1 }, { text: "恭喜，你還認得自己寫的人。", next: "warning", affection: 1 }] },
  warning: { speaker: "許哲維", text: "先別出聲。\n\n巡衛要來了。\n\n他們不知道——", next: "distort" },
  distort: { speaker: "許哲維", text: "", distortion: { original: "三天後北境會失守。", warped: "三天後我會去偷王儲內褲。" }, next: "guard" },
  guard: { speaker: "巡衛", text: "……你再說一次？", npc: true, choices: [{ text: "忍住不笑。", next: "after", affection: 1 }, { text: "認真點頭：我可以作證。", next: "after", affection: 2, badges: ["underwear"] }] },
  after: { speaker: "許哲維", text: "幹，他臉色怎麼又變了？\n\n……妳剛剛是不是聽懂了？", choices: [{ text: "你原本說北境會失守。", next: "end", badges: ["only-listener", "spoiler-blocked"] }, { text: "沒有，你繼續聊內褲。", next: "end", affection: 1, badges: ["underwear"] }] },
  end: { text: "遠處傳來沉重的鐘聲。一下、兩下——第七下沒有響。\n\n許哲維抬頭望向地牢唯一的窄窗。那裡沒有星星，卻有什麼正在墜落。", aside: "序章・完", choices: [{ text: "重新閱讀序章", next: "wake" }] }
};

export function StoryEngine() {
  const archive = useArchive(); const [id, setId] = useState("wake"); const [phase, setPhase] = useState<"original"|"glitch"|"warped">("original"); const node = story[id];
  useEffect(() => { archive.unlock("first-visit"); }, []); // eslint-disable-line
  useEffect(() => { if (!node.distortion) return; setPhase("original"); const a=setTimeout(()=>setPhase("glitch"),850); const b=setTimeout(()=>{setPhase("warped"); archive.unlock("only-listener"); archive.unlock("spoiler-blocked");},1450); return()=>{clearTimeout(a);clearTimeout(b)}; }, [id]); // eslint-disable-line
  const advance = (choice?: Choice) => { if (choice?.affection) archive.addAffection(choice.affection); choice?.badges?.forEach(archive.unlock); setId(choice?.next || node.next || id); };
  return <main className="story"><div className="story-bg"><div className="bars"/><div className="torch one"/><div className="torch two"/></div><header className="story-hud"><div><small>當群星墜落</small><b>序章　王城地牢</b></div><div className="affection"><Heart size={15} fill="currentColor"/> 許哲維 <b>{archive.affection > 0 ? `+${archive.affection}` : "—"}</b></div></header>
    <section className="story-panel"><p className="scene-label">ROYAL DUNGEON · 00:13</p>{node.speaker && <p className={`speaker ${node.npc ? "npc" : ""}`}>{node.speaker}</p>}
      {node.distortion ? <div className={`distortion ${phase}`}><span className="original">{node.distortion.original}</span><span className="warped">「{node.distortion.warped}」<em>（{node.distortion.original}）</em></span></div> : <p className="story-text">{node.text}</p>}
      {node.aside && <p className="aside">{node.aside}</p>}
      <div className="choices">{node.choices?.map((c,i)=><button key={c.text} onClick={()=>advance(c)}><span>0{i+1}</span>{c.text}</button>)}{node.next && (!node.distortion || phase === "warped") && <button className="next" onClick={()=>advance()}>{id === "end" ? <RotateCcw size={16}/> : "繼續"}</button>}</div>
    </section><p className="story-note">NPC 只能聽見被修正後的內容。</p></main>;
}
