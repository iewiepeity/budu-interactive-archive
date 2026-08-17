"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, BookOpen, Coffee, FileText, KeyRound, Notebook, Smartphone, Trophy, X } from "lucide-react";
import { useArchive } from "@/components/ArchiveProvider";

const objects = [
  { id:"manuscript", icon:FileText, name:"第五集完稿檔案", title:"WTSTF_VOL5_FINAL_final_真的最後版.docx", body:<>最後儲存：2026.08.17　02:42:57<br/>字數：184,206<br/>同步狀態：<b>尚未上傳</b><br/><br/>游標停在最後一個句號後。檔案完整，人不在。</> },
  { id:"notebook", icon:Notebook, name:"黑色筆記本", title:"一本很不想讓人翻的東西", body:<>前半本是世界觀與人物關係，後半本逐漸變成宵夜名單、農場文標題和髒話。<br/><br/><s>結局一定不能心軟</s><br/>……再想一下。</> },
  { id:"phone", icon:Smartphone, name:"手機", title:"23 則未接來電", body:<>編輯（17）<br/>出版社（4）<br/>小凱（2）<br/><br/>最後通知：<br/>「恭喜完稿。現在請、立刻、馬上，上傳。」</> },
  { id:"coffee", icon:Coffee, name:"超商咖啡", title:"喝到三分之一的冰美式", body:<>購買時間：凌晨 01:12<br/>冰塊已經融光。<br/><br/>本人失蹤得太快，甚至來不及讓它自然變難喝。</> },
  { id:"keys", icon:KeyRound, name:"機車鑰匙", title:"鑰匙還在桌上", body:<>機車停在樓下。安全帽也在。<br/><br/>他沒有騎車離開，監視器也沒拍到他走出大門。</> },
  { id:"books", icon:BookOpen, name:"未讀書堆", title:"購買速度遠高於閱讀速度", body:<>《北境失落神話》<br/>《王權與古代祭儀》<br/>《七十種世界末日》<br/>《三分鐘學會整理房間》——全新未拆。</> },
  { id:"award", icon:Trophy, name:"新人獎獎座", title:"被設定集壓住的獎座", body:<>刻字：新人創作大獎・出道大獎<br/>得獎作品：《流年望月》<br/><br/>底座貼著一張便條：<br/>「至少證明我以前有準時交過稿。」</> }
];

export default function DeskPage(){const archive=useArchive();const [selected,setSelected]=useState<typeof objects[number]|null>(null);const inspect=(o:typeof objects[number])=>{setSelected(o);archive.mark(`desk-${o.id}`);archive.disturb(1)};return <main className="desk-page"><header><Link href="/author" className="back"><ArrowLeft size={16}/> 回到作者側寫</Link><div><p className="eyebrow">PRIVATE WORKSPACE · ARCHIVED</p><h1>許哲維的工作桌</h1><p>人不在。桌面停留在他寫完最後一個字的那一刻。</p></div><small>已調查 {archive.flags.filter(f=>f.startsWith("desk-")).length} / {objects.length}</small></header><section className="desk-surface">{objects.map((o,i)=>{const Icon=o.icon;return <button className={`desk-object object-${i+1} ${archive.flags.includes(`desk-${o.id}`)?"seen":""}`} onClick={()=>inspect(o)} key={o.id}><Icon/><span>{o.name}</span></button>})}<div className="desk-screen"><span>02:42:57</span><b>FINAL_真的最後版</b><i>● 尚未同步</i></div></section><div className="desk-links"><Link href="/deviations">查看偏差紀錄</Link><Link href="/archive">開啟玩家存檔</Link></div>{selected&&<div className="desk-modal" onClick={()=>setSelected(null)}><article onClick={e=>e.stopPropagation()}><button onClick={()=>setSelected(null)}><X/></button><p className="eyebrow">EVIDENCE · {selected.id.toUpperCase()}</p><h2>{selected.title}</h2><div>{selected.body}</div></article></div>}</main>}
