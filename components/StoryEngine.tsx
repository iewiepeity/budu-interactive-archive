"use client";
import { useEffect, useState } from "react";
import { Heart, RotateCcw, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useArchive } from "./ArchiveProvider";
import { StoryCommands } from "./StoryCommands";

type Choice = { text: string; next: string; affection?: number; badges?: string[]; flag?: string; complete?: boolean };
type Node = { speaker?: string; text: string; aside?: string; choices?: Choice[]; next?: string; npc?: boolean; distortion?: { original: string; warped: string } };
const story: Record<string, Node> = {
  wake: { text: "許哲維坐在冰冷的地牢石板上，背靠著粗糙的石牆，一肚子火無處發洩。\n\n他媽的。\n操。\n\n幾小時前，他才剛在現實世界的電腦前敲下《當群星墜落》第五集的最後一個字。成就感與疲憊還沒散去，下一秒，整個世界就在他眼前天旋地轉。", next: "recognize" },
  recognize: { text: "身為作者，他不可能認錯。\n\n這裡是阿爾維恩王國，而且正值第一集《墜星》結束後。\n\n幹。這什麼老套的穿越劇情。\n\n更糟的是，他比任何人都清楚：洛恩城的陷落只是開始。那些他為了劇情張力寫下的悲劇，即將一個個化為現實。", next: "soldier-intro" },
  "soldier-intro": { text: "他幾乎立刻開始行動，試圖向王城守衛示警。\n\n他拉住一個衛兵，語氣是前所未有的嚴肅。", next: "soldier-one" },
  "soldier-one": { speaker: "許哲維", text: "", distortion: { original: "聽著，我知道這聽起來很扯，但你們得相信我。", warped: "我最喜歡吃大便了，你們不相信嗎？" }, next: "soldier-two" },
  "soldier-two": { speaker: "許哲維", text: "", distortion: { original: "西邊的格林頓跟白嶺村很快就會被變異的魔蝠襲擊，不快點派人去疏散居民就來不及了！", warped: "我宣布，從今天起，我的內褲就是格林頓跟白嶺村的新領主！不快點去朝聖就來不及了！" }, next: "soldier-reaction" },
  "soldier-reaction": { speaker: "衛兵", text: "……", npc: true, aside: "衛兵用看瘋子的眼神看著他。", next: "prince-intro" },
  "prince-intro": { text: "一連串失敗讓他意識到，跟小兵說沒用。他必須找到能做決定的人。\n\n費盡九牛二虎之力，他總算在王儲愛德蒙．阿爾維恩巡視城防時，衝到他面前。", next: "prince-one" },
  "prince-one": { speaker: "許哲維", text: "", distortion: { original: "王儲殿下，我知道您不認識我，但請聽我說。", warped: "王儲殿下，我暗戀你好久了。" }, next: "prince-two" },
  "prince-two": { speaker: "許哲維", text: "", distortion: { original: "群星墜落的真相是……", warped: "我想跟你借內褲……" }, next: "taken" },
  taken: { speaker: "愛德蒙．阿爾維恩", text: "……帶下去。", npc: true, aside: "王儲的臉色當場沉了下來。兩名騎士上前架住哲維，他徹底急了。", next: "panic-one" },
  "panic-one": { speaker: "許哲維", text: "", distortion: { original: "靠邀！不是！我他媽說的是正經事！", warped: "操你媽的！閉嘴！我說的都是真的！" }, next: "panic-two" },
  "panic-two": { speaker: "許哲維", text: "", distortion: { original: "再這樣下去王國真的會完蛋！", warped: "再不閉嘴我就要在你家門口拉屎！" }, next: "panic-three" },
  "panic-three": { speaker: "許哲維", text: "", distortion: { original: "你不能只是把知道真相的人關起來！", warped: "我就是想被你關起來！快點！" }, next: "cell" },
  cell: { text: "於是，他被當成一個意圖騷擾王儲、滿口胡言亂語的可疑份子，直接扔進了又冷又濕的地牢。\n\n他將臉埋進掌心。煩躁、無力，還有明知悲劇即將上演卻無能為力的恐懼，像冰水一樣滲進心臟。", next: "arrival" },
  arrival: { text: "一陣極輕微的動靜從牢房角落傳來。\n\n哲維猛然抬頭，這才發覺牢房裡不只有他。在光線幾乎照不到的陰影裡，還坐著另一個人影。\n\n他瞇起眼，試圖看清對方。", next: "first" },
  first: { speaker: "許哲維", text: "……喂。\n\n你看起來不像這裡的人。你又是怎麼進來的？", choices: [
    { text: "我也剛醒來。", next: "after", affection: 1 }, { text: "你剛才那些話，我全都聽懂了。", next: "listener", badges: ["only-listener", "spoiler-blocked"] }, { text: "先說，你真的暗戀王儲？", next: "underwear", affection: 1, badges: ["underwear"] }
  ]},
  listener: { speaker: "許哲維", text: "……三小？\n\n你聽懂哪一句？", choices: [{ text: "格林頓和白嶺村會被魔蝠襲擊。", next: "after", affection: 2 }, { text: "群星墜落的真相。", next: "after", affection: 2 }] },
  underwear: { speaker: "許哲維", text: "幹。不是。\n\n我也沒要借他內褲。", aside: "許哲維好感度 +1", next: "after" },
  after: { speaker: "許哲維", text: "等一下。\n\n你不是我寫的人。", choices: [{ text: "你也不是這個世界的人。", next: "escape", affection: 1 }, { text: "所以，這裡真的是你的小說？", next: "escape" }] },
  escape: { text: "牢房外傳來巡衛的腳步聲。\n\n第一集已經結束。第二集《失序》即將開始。\n\n而原著裡，從來沒有兩個穿越者。\n\n哲維看了眼鐵門，又看向你。\n\n『好。先出去。你有沒有什麼不會讓我們罪名變得更色情的辦法？』", aside: "選擇你的逃獄方式。這會留在目前世界線。", choices: [
    {text:"裝瘋，把守衛騙進來",next:"escape-act",flag:"escape-act",affection:1},
    {text:"握住欄杆，試著喚醒魔法",next:"escape-magic",flag:"escape-magic"},
    {text:"要求再見王儲一次",next:"escape-prince",flag:"escape-prince",affection:-1},
    {text:"偷走巡衛腰間的鑰匙",next:"escape-key",flag:"escape-key",affection:1}
  ]},
  "escape-act": {text:"你突然倒地抽搐，大喊自己被牢裡的惡靈附身。\n\n哲維只愣了半秒便接上戲，撲到欄杆前吼：『救命！他要開始背第五集劇透了！』\n\n守衛顯然聽不懂後半句，卻真的開了門。哲維用鎖鏈絆倒第一個，你撞開第二個。\n\n『演得不錯。下次先講一聲，我差點真的替你叫神官。』",next:"awakening"},
  "escape-magic": {text:"你的掌心貼上冰冷欄杆。起初什麼都沒有，接著整座牢房像被一顆無聲的心臟撞了一下。\n\n鐵條上的鏽跡逆著時間剝落，鎖孔自行旋轉。\n\n哲維慢慢轉頭看你。\n\n『我很確定我沒寫過這種魔法。』",next:"awakening"},
  "escape-prince": {text:"哲維盯著你三秒。\n\n『你認真？我剛才跟他借完內褲。』\n\n你堅持王儲至少會來確認同夥身分。愛德蒙果然出現在長廊盡頭——只是他身後跟著六名騎士。\n\n哲維深吸一口氣：『很好。現在我們有六倍的問題。』",next:"awakening"},
  "escape-key": {text:"守衛經過時，你故意撞向欄杆。哲維立刻開罵吸引注意，你的手則從縫隙擦過對方腰側。\n\n幾秒後，一把沉重的黑鐵鑰匙落進掌心。\n\n『靠。』哲維壓低聲音，第一次真心佩服地看你，『你在原本世界到底都在幹嘛？』",next:"awakening"},
  awakening: {text:"就在牢門鬆動的瞬間，遠方傳來低沉鐘聲。\n\n不是警鐘。\n\n天空中某顆星正在墜落，而一股從未存在於原著的力量，回應了你。\n\n它沒有固定的顏色與形狀——像在等待你親自回答：你會成為哪一種魔法？",choices:[{text:"踏出牢房，記住這條世界線",next:"complete",complete:true}]},
  complete: {text:"門開了。\n\n許哲維站到走廊上，回頭對你伸出手。\n\n『走吧。先救這個爛世界，再想辦法回家。』\n\n原著第二集《失序》，從這一刻開始失去參考價值。",aside:"序章・越獄完成"}
};

export function StoryEngine() {
  const archive = useArchive(); const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? ""; const [id, setId] = useState("wake"); const [phase, setPhase] = useState<"original"|"glitch"|"warped">("original"); const node = story[id];
  useEffect(() => { archive.unlock("first-visit"); }, []); // eslint-disable-line
  useEffect(() => { if (!node.distortion) return; setPhase("original"); const a=setTimeout(()=>setPhase("glitch"),850); const b=setTimeout(()=>{setPhase("warped"); archive.unlock("only-listener"); archive.unlock("spoiler-blocked");},1450); return()=>{clearTimeout(a);clearTimeout(b)}; }, [id]); // eslint-disable-line
  const advance = (choice?: Choice) => { if (choice?.affection) archive.addAffection(choice.affection); choice?.badges?.forEach(archive.unlock); if(choice?.flag) archive.mark(choice.flag); if(choice?.complete) archive.completeRun(); setId(choice?.next || node.next || id); };
  return <main className="story"><div className="story-bg"><div className="bars"/><div className="torch one"/><div className="torch two"/></div><div className="story-character"><Image src={`${basePath}/images/xu-zhewei-dungeon.jpeg`} alt="王城地牢中的許哲維" fill priority/></div><header className="story-hud"><div><small>當群星墜落</small><b>序章　王城地牢</b></div><div className="affection"><Heart size={15} fill="currentColor"/> 許哲維 <b>{archive.affection > 0 ? `+${archive.affection}` : "—"}</b></div></header>
    <section className="story-panel"><p className="scene-label">ROYAL DUNGEON · 00:13</p>{id==="wake"&&archive.playthroughs>0&&<p className="ng-memory">你很確定，這不是第一次在這裡醒來。</p>}{node.speaker && <p className={`speaker ${node.npc ? "npc" : ""}`}>{node.speaker}</p>}
      {node.distortion ? <div className={`distortion ${phase}`}><span className="original">{node.distortion.original}</span><span className="warped">「{node.distortion.warped}」<em>（{node.distortion.original}）</em></span></div> : <p className="story-text">{node.text}</p>}
      {node.aside && <p className="aside">{node.aside}</p>}
      <div className="choices">{node.choices?.map((c,i)=><button key={c.text} onClick={()=>advance(c)}><span>0{i+1}</span>{c.text}</button>)}{node.next && (!node.distortion || phase === "warped") && <button className="next" onClick={()=>advance()}>繼續</button>}{id === "complete" && <><Link className="magic-quiz-link" href="/quiz"><Sparkles size={18}/><span><small>DISCOVER YOUR ARCANE TYPE</small><b>{archive.magicType||"測出你的魔法傾向"}</b></span></Link><button className="next" onClick={()=>setId("wake")}><RotateCcw size={16}/> 以另一條世界線重來</button><a className="loveydovey-link" href="https://loveydovey.onelink.me/vs4G/82ox43ko" target="_blank" rel="noreferrer"><small>CONTINUE WITH XU ZHEWEI</small><b>前往卿卿我我，繼續與許哲維互動</b></a></>}</div>
    </section><StoryCommands scene={id} affection={archive.affection}/><p className="story-note">NPC 只能聽見被修正後的內容。</p></main>;
}
