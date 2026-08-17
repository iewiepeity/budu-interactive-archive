"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useArchive } from "@/components/ArchiveProvider";

export default function Home() {
  const archive = useArchive();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const [newsOpen, setNewsOpen] = useState(false);
  useEffect(() => { archive.unlock("first-visit"); }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const reveal = () => { setNewsOpen(true); archive.disturb(1); };
  return <main className={`home anomaly-${archive.anomaly}`}>
    <section className="hero">
      <div className="hero-copy"><p className="eyebrow">NOVELIST · SCREENWRITER · STILL ALIVE</p><h1>寫故事的人，<br />通常不在故事裡。</h1><p className="lead">不渡，小說作者。擅長把角色推進絕境，<br />再假裝一切都在計畫之中。</p><div className="hero-actions"><Link href="#works" className="primary">閱讀作品 <ArrowDown size={17}/></Link><button onClick={reveal}>近期消息 <ArrowUpRight size={17}/></button></div></div>
      <div className="portrait"><Image className="author-photo" src={`${basePath}/images/xu-zhewei.jpeg`} alt="小說作者不渡，許哲維" fill sizes="(max-width: 800px) 90vw, 34vw" priority/><div className="portrait-shade"/><span className="vertical">AUTHOR · 29 · TAIPEI</span><p>「寫小說的。還活著。<br/>截稿日前不一定。」</p></div>
      <span className="chapter-mark">01 / 05</span>
    </section>
    {newsOpen && <section className="notice"><span>2026. 08. 17</span><p>{archive.anomaly > 1 ? "出版社目前仍無法與不渡老師取得聯繫。" : "《當群星墜落》典藏版資訊將於近期公開。"}</p><button onClick={() => archive.disturb(1)}>重新整理</button></section>}
    <section id="about" className="about section"><p className="eyebrow">ABOUT THE AUTHOR</p><div><h2>不渡</h2><p className="kanji">許哲維</p></div><div className="about-copy"><p>29 歲，台北人。出道作《流年望月》獲新人創作大獎出道大獎。文字流暢精準，尤其擅長群像、災難與藏在日常細節裡的感情。</p><p>耗費多年完成長篇奇幻冒險《當群星墜落》全五冊。業界評價他：「世界觀很大，筆卻始終落在人身上。」</p><dl><div><dt>身分</dt><dd>小說家</dd></div><div><dt>出沒地點</dt><dd>書店、宵夜攤、陌生巷子</dd></div><div><dt>目前狀態</dt><dd className={archive.anomaly >= 2 ? "corrupt" : ""}>{archive.anomaly >= 2 ? "無法定位" : "新作休息中"}</dd></div></dl></div></section>
    <section id="works" className="works section"><div className="section-title"><div><p className="eyebrow">SELECTED WORKS</p><h2>作品</h2></div><span>02</span></div>
      <div className="work-list"><article><div className="book book-moon"><span>不渡</span><strong>流年<br/>望月</strong></div><div><small>DEBUT NOVEL · 2021</small><h3>流年望月</h3><p>有些人用一生等一個月圓，有些人等到的只有天亮。</p></div></article>
      <Link href="/works/stars" className="work-link" onClick={() => archive.disturb(1)}><article><div className="book book-stars official"><Image src={`${basePath}/images/when-the-stars-fall.png`} alt="《當群星墜落》封面" fill sizes="235px"/></div><div><small>FANTASY SERIES · COMPLETE</small><h3>當群星墜落</h3><p>群星墜下的那一夜，世界原本的秩序開始崩落。</p><b>查看作品 <ArrowUpRight size={18}/></b></div></article></Link></div>
    </section>
    {archive.anomaly >= 3 && <div className="intrusion" aria-hidden="true">第二集・失序　//　你已經讀過了</div>}
  </main>;
}
