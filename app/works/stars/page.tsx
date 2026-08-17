"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useArchive } from "@/components/ArchiveProvider";
import { books } from "@/lib/content";

export default function Stars() {
  const archive = useArchive();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [opened, setOpened] = useState(false);
  useEffect(() => { const t = setTimeout(() => archive.disturb(1), 900); return () => clearTimeout(t); }, []); // eslint-disable-line
  const canRead = archive.anomaly >= 2;
  const open = () => { setOpened(true); archive.disturb(2); archive.unlock("wrong-page"); };
  return <main className="stars-page">
    <Link href="/" className="back"><ArrowLeft size={16}/> 回到作品列表</Link>
    <section className="stars-hero"><div className="official-cover"><div className="cover-aura"/><Image src={`${basePath}/images/when-the-stars-fall.png`} alt="《當群星墜落》正式封面" width={1362} height={1706} priority/></div><div><p className="eyebrow">FIVE-VOLUME FANTASY SERIES</p><h1>當群星墜落</h1><p className="subtitle">WHEN THE STARS FALL</p><p className="synopsis">第一顆星辰墜落後，魔物開始異變。亞維爾、菲蕾與葛蘭特從只想活下去的普通人，走上追查災變真相的旅程；直到他們發現，墜落的從來不只是星星。</p><div className="meta"><div><small>類型</small><b>奇幻冒險・群像・災變</b></div><div><small>冊數</small><b>全五冊</b></div><div><small>狀態</small><b className={canRead ? "corrupt" : ""}>{canRead ? "未完待續" : "已完結"}</b></div></div></div></section>
    <section className="volumes"><p className="eyebrow">THE SERIES</p>{books.map((book, i) => <article key={book.number} className={i === 1 && archive.anomaly >= 3 ? "infected" : ""}><span>{book.number}</span><h2>{book.title}</h2><p>{i === 1 && archive.anomaly >= 3 ? "你確定這是原本的第二集嗎？" : book.note}</p><i>{i === 1 && archive.anomaly >= 3 ? "OPEN" : "—"}</i></article>)}</section>
    <section className="reader-entry">{!opened ? <><p>{canRead ? "偵測到未同步的閱讀進度。" : "本系列已完結，感謝閱讀。"}</p>{canRead && <button className="continue" onClick={open}>繼續閱讀 <ArrowRight size={18}/></button>}</> : <div className="confirm"><p className="system-line">ARCHIVE ERROR · PAGE DOES NOT EXIST</p><h2>你確定要打開嗎？</h2><div><Link href="/read/prologue" className="primary">確定</Link><button onClick={() => setOpened(false)}>不要</button></div><small>選擇不會改變任何事。</small></div>}</section>
  </main>;
}
