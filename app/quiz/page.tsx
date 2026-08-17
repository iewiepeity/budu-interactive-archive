"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw, Sparkles } from "lucide-react";
import { useArchive } from "@/components/ArchiveProvider";

const types = {
  star: { name: "星軌洞察系", sigil: "✦", desc: "你擅長從碎片裡看見路徑。別人看星星，你看事故預告與伏筆回收表。", xu: "很強。缺點是跟你一起看電影，大概前三十分鐘就會被你猜完。閉嘴，拜託。" },
  ward: { name: "生命庇護系", sigil: "◇", desc: "你的魔力會優先護住身邊的人。越危急，結界越穩；嘴上嫌麻煩，身體倒是很誠實。", xu: "標準的『我才沒有擔心你』型。很好，我這種會主動踩陷阱的作者正需要一個。" },
  rewrite: { name: "因果改寫系", sigil: "⌁", desc: "規則對你而言比較像參考資料。你能撬動微小因果，把必然改寫成『再看看』。", xu: "恭喜，你是編輯最討厭、角色最想抱大腿的類型。不要亂改我的結局。……至少先跟我講。" },
  echo: { name: "記憶共鳴系", sigil: "◉", desc: "你能碰觸物件殘留的情緒與記憶。秘密藏得越深，在你手裡反而越吵。", xu: "所以黑色筆記本絕對不能給你碰。不是因為有什麼，是因為……幹，總之不准。" },
  desire: { name: "慾望共鳴系・貼身施法者", sigil: "♡", desc: "距離越近，魔力越強。眼神、呼吸與心跳都是媒介；理論上是高階共鳴，實際上很容易讓隊伍氣氛變奇怪。", xu: "這不是我設計的魔法。真的。你先把手放下，施法不需要摸那裡——你到底從哪學的？" }
};
type Kind = keyof typeof types;
const questions: { q:string; options:{t:string;k:Kind}[] }[] = [
  {q:"半夜，你在王城禁區看到一扇寫著『絕對不要開』的門。",options:[{t:"研究門縫、灰塵與巡邏路線",k:"star"},{t:"先確認同行的人都能安全撤退",k:"ward"},{t:"規則寫『不要開』，沒寫不能拆牆",k:"rewrite"},{t:"把手貼上去，聽門記得什麼",k:"echo"}]},
  {q:"許哲維說：『別碰我的黑色筆記本。』你會？",options:[{t:"推理他最怕我看到哪一頁",k:"star"},{t:"先不碰，但等他願意自己說",k:"ward"},{t:"把『碰』重新定義成用夾子翻",k:"rewrite"},{t:"碰。順便感應殘留情緒",k:"echo"},{t:"靠近他耳邊問：那我可以碰你嗎？",k:"desire"}]},
  {q:"戰鬥時，同伴突然把你壓到牆邊。合理原因是？",options:[{t:"他看見我背後的伏擊",k:"star"},{t:"替我擋下攻擊",k:"ward"},{t:"我們在演戲騙守衛",k:"rewrite"},{t:"接觸能共享記憶",k:"echo"},{t:"原因不重要，請繼續描述",k:"desire"}]},
  {q:"你最想從異世界帶回來的是？",options:[{t:"完整星圖與失落史料",k:"star"},{t:"能治癒所有人的術式",k:"ward"},{t:"可以修改爛結局的筆",k:"rewrite"},{t:"承載一生記憶的舊物",k:"echo"},{t:"某位嘴很臭但腰很好看的作者",k:"desire"}]},
  {q:"面對注定發生的悲劇，你的第一反應？",options:[{t:"找到最早出錯的節點",k:"star"},{t:"至少先把眼前的人帶走",k:"ward"},{t:"注定？誰規定的？",k:"rewrite"},{t:"記住所有人，讓死亡不是消失",k:"echo"},{t:"抓住許哲維的領口，叫作者負責",k:"desire"}]},
  {q:"最後：魔力需要一個啟動口令。",options:[{t:"『答案一直都在這裡。』",k:"star"},{t:"『站到我身後。』",k:"ward"},{t:"『這段不算，重寫。』",k:"rewrite"},{t:"『我聽見了。』",k:"echo"},{t:"『靠近一點，我不咬人。大概。』",k:"desire"}]}
];

export default function QuizPage(){
  const archive=useArchive(); const [step,setStep]=useState(0); const [scores,setScores]=useState<Record<Kind,number>>({star:0,ward:0,rewrite:0,echo:0,desire:0}); const [result,setResult]=useState<Kind|null>(null);
  const progress=useMemo(()=>`${Math.min(step+1,questions.length)} / ${questions.length}`,[step]);
  const choose=(k:Kind)=>{const next={...scores,[k]:scores[k]+1};setScores(next);if(step===questions.length-1){const winner=(Object.keys(next) as Kind[]).sort((a,b)=>next[b]-next[a])[0];setResult(winner);archive.setMagicType(types[winner].name);archive.mark("magic-awakened");archive.disturb(1);}else setStep(step+1)};
  const restart=()=>{setStep(0);setResult(null);setScores({star:0,ward:0,rewrite:0,echo:0,desire:0})};
  return <main className="quiz-page"><header className="quiz-hero"><p className="eyebrow">UNLICENSED ARCANE ASSESSMENT</p><h1>許哲維式<br/>魔法傾向測驗</h1><p>沒有科學根據，也沒有魔法學會認證。答完若發生爆炸，請自行向作者求償。</p></header>
    {!result?<section className="quiz-card"><div className="quiz-progress"><span>{progress}</span><i style={{width:`${((step+1)/questions.length)*100}%`}}/></div><p className="quiz-number">QUESTION {String(step+1).padStart(2,"0")}</p><h2>{questions[step].q}</h2><div className="quiz-options">{questions[step].options.map((o,i)=><button key={o.t} onClick={()=>choose(o.k)}><span>{String.fromCharCode(65+i)}</span>{o.t}</button>)}</div></section>:
    <section className="quiz-result"><p className="eyebrow">ARCANE SIGNATURE CONFIRMED</p><div className="result-sigil">{types[result].sigil}</div><small>你的魔法傾向是</small><h2>{types[result].name}</h2><p>{types[result].desc}</p><blockquote><b>許哲維：</b>「{types[result].xu}」</blockquote><div><Link href="/read/prologue" className="primary">帶著能力回到地牢 <ArrowRight size={17}/></Link><button onClick={restart}><RotateCcw size={16}/> 不服，重測</button></div><p className="saved"><Sparkles size={14}/> 結果已寫入你的世界線</p></section>}
  </main>
}
