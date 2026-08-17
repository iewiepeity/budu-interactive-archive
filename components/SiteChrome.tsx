"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { badges } from "@/lib/content";
import { useArchive } from "./ArchiveProvider";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const archive = useArchive();
  return <>
    <header className="nav">
      <Link href="/" className="brand"><span>不渡</span><small>BU DU · AUTHOR ARCHIVE</small></Link>
      <nav className="desktop-nav"><Link href="/author">作者</Link><Link href="/#works">作品</Link><Link href="/community">讀者社群</Link><Link href="/desk">調查</Link><button onClick={() => setOpen(true)} className="badge-button">徽章 {archive.badges.length}<i>/5</i></button></nav>
      <div className="mobile-actions"><button className="mobile-badge" onClick={() => setOpen(true)}>徽章 {archive.badges.length}/5</button><button className="menu-toggle" aria-label="開啟導覽" onClick={()=>setMenuOpen(true)}><Menu/></button></div>
    </header>
    {menuOpen&&<div className="mobile-menu"><button aria-label="關閉導覽" onClick={()=>setMenuOpen(false)}><X/></button><p className="eyebrow">NAVIGATION</p><nav><Link onClick={()=>setMenuOpen(false)} href="/">首頁 <span>01</span></Link><Link onClick={()=>setMenuOpen(false)} href="/author">作者側寫 <span>02</span></Link><Link onClick={()=>setMenuOpen(false)} href="/#works">作品 <span>03</span></Link><Link onClick={()=>setMenuOpen(false)} href="/community">讀者社群 <span>04</span></Link><Link onClick={()=>setMenuOpen(false)} href="/desk">許哲維的書桌 <span>05</span></Link><Link onClick={()=>setMenuOpen(false)} href="/characters">角色檔案 <span>06</span></Link><Link onClick={()=>setMenuOpen(false)} href="/quiz">魔法測驗 <span>07</span></Link><Link onClick={()=>setMenuOpen(false)} href="/archive">世界線存檔 <span>08</span></Link></nav><small>不渡・作者檔案</small></div>}
    {children}
    <footer><span>© 2026 不渡・著作權所有</span><span>本站內容皆為虛構。</span></footer>
    {open && <div className="overlay" onClick={() => setOpen(false)}><aside className="badge-drawer" onClick={e => e.stopPropagation()}><button className="close" onClick={() => setOpen(false)}>×</button><p className="eyebrow">READER ARCHIVE</p><h2>閱讀紀錄</h2><p className="muted">有些東西，不該被收藏。</p><div className="badge-grid">{badges.map(b => { const got = archive.badges.includes(b.id); return <div className={`badge ${got ? "unlocked" : "locked"}`} key={b.id}>{got && b.asset ? <Image className="badge-art" src={b.asset} alt={b.title} width={1254} height={1254}/> : <div className="badge-icon">{got ? b.icon : "?"}</div>}<div><strong>{got ? b.title : "未解鎖"}</strong><small>{b.hint}</small></div></div>})}</div><button className="reset" onClick={archive.reset}>清除閱讀紀錄</button></aside></div>}
  </>;
}
