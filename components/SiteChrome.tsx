"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { badges } from "@/lib/content";
import { useArchive } from "./ArchiveProvider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const archive = useArchive();
  return <>
    <header className="nav">
      <Link href="/" className="brand"><span>不渡</span><small>BU DU · AUTHOR ARCHIVE</small></Link>
      <nav><Link href="/#about">關於</Link><Link href="/#works">作品</Link><button onClick={() => setOpen(true)} className="badge-button">徽章 {archive.badges.length}<i>/5</i></button></nav>
    </header>
    {children}
    <footer><span>© 2026 不渡・著作權所有</span><span>本站內容皆為虛構。</span></footer>
    {open && <div className="overlay" onClick={() => setOpen(false)}><aside className="badge-drawer" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setOpen(false)}>×</button><p className="eyebrow">READER ARCHIVE</p><h2>閱讀紀錄</h2><p className="muted">有些東西，不該被收藏。</p><div className="badge-grid">{badges.map(b => { const got = archive.badges.includes(b.id); return <div className={`badge ${got ? "unlocked" : "locked"}`} key={b.id}>{got && b.asset ? <Image className="badge-art" src={b.asset} alt={b.title} width={1254} height={1254}/> : <div className="badge-icon">{got ? b.icon : "?"}</div>}<div><strong>{got ? b.title : "未解鎖"}</strong><small>{b.hint}</small></div></div>})}</div><button className="reset" onClick={archive.reset}>清除閱讀紀錄</button></aside></div>}
  </>;
}
