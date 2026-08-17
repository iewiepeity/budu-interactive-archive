"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ChevronDown, LockKeyhole, TriangleAlert } from "lucide-react";
import { spoilerVolumes } from "@/lib/volume-one";

export default function SpoilersPage() {
  const [open, setOpen] = useState(false);
  return <main className={`spoiler-page ${open ? "revealed" : ""}`}>
    <Link href="/works/stars" className="back"><ArrowLeft size={16}/> 回到作品頁</Link>
    {!open ? <section className="spoiler-gate"><LockKeyhole size={34}/><p className="eyebrow">CLASSIFIED STORY ARCHIVE</p><h1>前方是原著劇透區</h1><p>完整收錄第二集至第五集共 26 件大事件、世界影響、可改變部分與限制。</p><button onClick={() => setOpen(true)}><TriangleAlert size={17}/> 我確定要看劇透</button></section> : <section className="event-archive"><p className="eyebrow">SPOILERS UNSEALED</p><h1>《當群星墜落》大事件</h1><p className="spoiler-intro">選擇集數，再點開事件檔案閱讀完整內容。</p><nav className="volume-jump">{spoilerVolumes.map((v,i)=><a href={`#spoiler-volume-${i}`} key={v.title}>第{i+2}集</a>)}</nav>{spoilerVolumes.map((volume, i) => <section className="spoiler-volume" id={`spoiler-volume-${i}`} key={volume.title}><header><span>VOLUME {String(i+2).padStart(2,"0")}</span><h2>{volume.title}</h2><b>{volume.events.length} EVENTS</b></header><div className="event-accordion">{volume.events.map((event, j)=><details key={event.title}><summary><span>{String(j+1).padStart(2,"0")}</span><div><b>{event.title.replace(/^大事件\d+｜/, "")}</b><small>{event.stage}</small></div><ChevronDown size={18}/></summary><div className="event-detail">{event.sections.map(section=><section key={section.title}><h4>{section.title}</h4>{section.items.map((item,k)=><p key={k}>{item}</p>)}</section>)}</div></details>)}</div></section>)}</section>}
  </main>;
}
