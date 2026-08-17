"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LockKeyhole, TriangleAlert } from "lucide-react";
import { spoilerVolumes } from "@/lib/volume-one";

export default function SpoilersPage() {
  const [open, setOpen] = useState(false);
  return <main className={`spoiler-page ${open ? "revealed" : ""}`}>
    <Link href="/works/stars" className="back"><ArrowLeft size={16}/> 回到作品頁</Link>
    {!open ? <section className="spoiler-gate"><LockKeyhole size={34}/><p className="eyebrow">CLASSIFIED STORY ARCHIVE</p><h1>前方是原著劇透區</h1><p>將揭露第二集至第五集的大事件、世界真相與最終結局。第一集讀者請慎入。</p><button onClick={() => setOpen(true)}><TriangleAlert size={17}/> 我確定要看劇透</button></section> : <section className="event-archive"><p className="eyebrow">SPOILERS UNSEALED</p><h1>《當群星墜落》大事件</h1><p className="spoiler-intro">這是原著已定稿的世界線。許哲維穿越後，玩家的選擇可能使它偏離。</p>{spoilerVolumes.map((v,i)=><article key={v.volume}><span>0{i+2}</span><div><h2>{v.volume}</h2><ol>{v.events.map(e=><li key={e}>{e}</li>)}</ol></div></article>)}</section>}
  </main>;
}
