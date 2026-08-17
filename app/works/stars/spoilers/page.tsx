"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, LockKeyhole, TriangleAlert } from "lucide-react";
import { majorEventsText } from "@/lib/volume-one";

function EventDocument() {
  return <>{majorEventsText.split("\n").map((raw, i) => {
    const line = raw.trim();
    if (!line) return <span className="event-space" key={i}/>;
    if (line.startsWith("《當群星墜落》")) return <h2 className="volume-heading" key={i}>{line}</h2>;
    if (line.startsWith("# 大事件")) return <h3 key={i}>{line.slice(2)}</h3>;
    if (line.startsWith("## ")) return <p className="event-stage" key={i}>{line.slice(3)}</p>;
    if (line.startsWith("### ")) return <h4 key={i}>{line.slice(4)}</h4>;
    if (line.startsWith("- ")) return <p className="event-item" key={i}>{line.slice(2)}</p>;
    return <p key={i}>{line}</p>;
  })}</>;
}

export default function SpoilersPage() {
  const [open, setOpen] = useState(false);
  return <main className={`spoiler-page ${open ? "revealed" : ""}`}>
    <Link href="/works/stars" className="back"><ArrowLeft size={16}/> 回到作品頁</Link>
    {!open ? <section className="spoiler-gate"><LockKeyhole size={34}/><p className="eyebrow">CLASSIFIED STORY ARCHIVE</p><h1>前方是原著劇透區</h1><p>完整收錄第二集至第五集共 26 件大事件、世界影響、可改變部分與限制。</p><button onClick={() => setOpen(true)}><TriangleAlert size={17}/> 我確定要看劇透</button></section> : <section className="event-archive"><p className="eyebrow">SPOILERS UNSEALED</p><h1>《當群星墜落》大事件</h1><p className="spoiler-intro">原著世界線已解鎖。穿越者介入後，必然發生的災變仍會推進，但人物選擇與結果可能改寫。</p><EventDocument/></section>}
  </main>;
}
