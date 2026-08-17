"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useArchive } from "@/components/ArchiveProvider";
import { books } from "@/lib/content";
import { starsReviews, worksPraise } from "@/lib/community";

export default function Stars() {
  const archive = useArchive();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [opened, setOpened] = useState(false);
  useEffect(() => { const t = setTimeout(() => archive.disturb(1), 900); return () => clearTimeout(t); }, []); // eslint-disable-line
  const canRead = archive.anomaly >= 2;
  const open = () => { setOpened(true); archive.disturb(2); archive.unlock("first-visit"); };
  return <main className="stars-page">
    <Link href="/" className="back"><ArrowLeft size={16}/> 回到作品列表</Link>
    <section className="stars-hero"><div className="official-cover"><div className="cover-aura"/><Image src={`${basePath}/images/when-the-stars-fall.png`} alt="《當群星墜落》正式封面" width={1362} height={1706} priority/></div><div><p className="eyebrow">FIVE-VOLUME FANTASY SERIES</p><h1>當群星墜落</h1><p className="subtitle">WHEN THE STARS FALL</p><p className="synopsis">第一顆星辰墜落後，魔物開始異變。亞維爾、菲蕾與葛蘭特從只想活下去的普通人，走上追查災變真相的旅程；直到他們發現，墜落的從來不只是星星。</p><div className="meta"><div><small>類型</small><b>奇幻冒險・群像・災變</b></div><div><small>冊數</small><b>全五冊</b></div><div><small>狀態</small><b className={canRead ? "corrupt" : ""}>{canRead ? "未完待續" : "已完結"}</b></div></div></div></section>
    <section className="volumes"><p className="eyebrow">THE SERIES</p>{books.map((book, i) => <article key={book.number} className={i === 1 && archive.anomaly >= 3 ? "infected" : ""}><span>{book.number}</span><h2>{book.title}</h2><p>{i === 1 && archive.anomaly >= 3 ? "你確定這是原本的第二集嗎？" : book.note}</p><i>{i === 1 && archive.anomaly >= 3 ? "OPEN" : "—"}</i></article>)}</section>
    <section className="archive-links"><div><p className="eyebrow">OFFICIAL READING ARCHIVE</p><h2>第一集・墜星</h2><p>從洛恩城的寂靜森林，到第一顆星辰墜下的那一夜。收錄第一集五個章節。</p><Link href="/works/stars/volume-1" className="primary">閱讀第一集 <ArrowRight size={17}/></Link></div><div className="spoiler-card"><p className="eyebrow">CLASSIFIED · SPOILERS</p><h2>原著大事件</h2><p>第二集至第五集的事件檔案。內容會揭露世界真相與原著結局。</p><Link href="/works/stars/spoilers">進入劇透區 <ArrowRight size={17}/></Link></div></section>
    <section className="book-reception"><div className="score-panel"><p className="eyebrow">READER SCORE</p><b>{worksPraise.stars.score}</b><span>★★★★★</span><small>{worksPraise.stars.count} 位讀者評分</small></div><blockquote>「{worksPraise.stars.quote}」<cite>{worksPraise.stars.author}</cite></blockquote><div className="review-list">{starsReviews.map(r=><article key={r[0]}><header><b>{r[0]}</b><span>{r[1]}</span></header><p>{r[2]}</p></article>)}</div></section>
    <section className={`reader-entry ${canRead ? "anomaly-entry" : ""}`}>{!opened ? <>{canRead ? <div className="anomaly-copy"><p className="system-line">UNSYNCED READING DATA DETECTED</p><h2>這個故事，還沒有結束。</h2><p>找到一段不該存在的閱讀進度。<br/>有人正在第一集結束後等你。</p><button className="continue" onClick={open}><span><small>ENTER THE STORY</small>繼續閱讀</span><ArrowRight size={22}/></button></div> : <p>本系列已完結，感謝閱讀。</p>}</> : <div className="confirm"><p className="system-line">ARCHIVE ERROR · PAGE DOES NOT EXIST</p><h2>你確定要打開嗎？</h2><div><Link href="/read/prologue" className="primary">確定</Link><button onClick={() => setOpened(false)}>不要</button></div><small>選擇不會改變任何事。</small></div>}</section>
  </main>;
}
