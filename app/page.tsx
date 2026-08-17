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
    {newsOpen && <div className="news-overlay" onClick={() => setNewsOpen(false)}><section className="news-dialog" onClick={e=>e.stopPropagation()}><button className="news-close" onClick={() => setNewsOpen(false)}>×</button><p className="eyebrow">LATEST NOTICE · 2026. 08. 17</p><h2>近期消息</h2><p>{archive.anomaly > 1 ? "出版社目前仍無法與不渡老師取得聯繫。" : "《當群星墜落》典藏版資訊將於近期公開。"}</p><button className="news-refresh" onClick={() => archive.disturb(1)}>重新整理</button></section></div>}
    <section id="about" className="about section"><p className="eyebrow">ABOUT THE AUTHOR</p><div><h2>不渡</h2><p className="kanji">許哲維</p></div><div className="about-copy"><p>29 歲，台北人。出道作《流年望月》獲新人創作大獎出道大獎。文字流暢精準，尤其擅長群像、災難與藏在日常細節裡的感情。</p><p>耗費多年完成長篇奇幻冒險《當群星墜落》全五冊。業界評價他：「世界觀很大，筆卻始終落在人身上。」</p><dl><div><dt>身分</dt><dd>小說家</dd></div><div><dt>出沒地點</dt><dd>書店、宵夜攤、陌生巷子</dd></div><div><dt>目前狀態</dt><dd className={archive.anomaly >= 2 ? "corrupt" : ""}>{archive.anomaly >= 2 ? "無法定位" : "新作休息中"}</dd></div></dl></div></section>
    <section className="profile-notes section"><div className="profile-heading"><p className="eyebrow">BEYOND THE DESK</p><h2>創作之外</h2><p>如果不在寫稿，他大概正在替下一本書蒐集一些暫時用不到的東西。</p></div><div className="profile-grid"><article><span>01</span><h3>故事雜食</h3><p>小說、漫畫、動畫、電影與遊戲都看，尤其偏愛奇幻、冒險、懸疑、災難與群像。會分析人物動機、伏筆與世界觀，遇到真正好看的作品也能乾脆關掉職業病。</p></article><article><span>02</span><h3>買得比看得快</h3><p>愛逛書店、二手書店與文具店。設定集、畫冊、神話傳說或奇怪冷門資料尤其危險，通常清醒時人已經站在櫃檯。</p></article><article><span>03</span><h3>這可以寫</h3><p>對神話、民俗、都市傳說、歷史逸聞與各地怪談毫無抵抗力。看到奇怪傳聞的第一反應不是害怕，是先記下來。</p></article><article><span>04</span><h3>半夜兜風</h3><p>喜歡騎車亂晃。比起精緻行程，更常臨時起意找宵夜、看夜景，或鑽進一條從來沒走過的陌生巷子。</p></article><article><span>05</span><h3>遊戲嘴很臭</h3><p>偏愛 RPG、開放世界、劇情向與合作遊戲。輸了會靠北隊友，自己雷到則先裝死，幾秒後再笑得最大聲。</p></article><article><span>06</span><h3>歌單沒有邏輯</h3><p>工作時習慣放歌，曲風跨度大得像共用帳號。有時只因一句歌詞或一段旋律，就突然想到角色與場景。</p></article><article><span>07</span><h3>宵夜派</h3><p>愛台灣小吃、超商新品與垃圾食物，沒有太多用餐儀式。真的好吃的店會默默記住，下次直接帶熟人去。</p></article><article><span>08</span><h3>什麼都想摸</h3><p>好奇心很重，陌生東西總想摸、想試、想問清楚。若真進入自己筆下的世界，他大概連沒寫過的路邊攤都不會放過。</p></article></div></section>
    {archive.anomaly >= 2 && <section className="absence-traces"><p className="eyebrow">UNRESOLVED ACTIVITY</p><h2>作者近況</h2><div><article><small>LAST ONLINE</small><b>2026.08.17　02:43</b><p>《當群星墜落》第五集完稿檔案已同步。</p></article><article><small>EDITOR MESSAGE · 未讀</small><b>「許老師，看到請回電。」</b><p>最後一次登入後，所有聯絡方式皆無回應。</p></article><article><small>SCHEDULED POST</small><b>「我先消失一下。」</b><p>文章發布時，帳號沒有任何登入紀錄。</p></article></div></section>}
    <section id="works" className="works section"><div className="section-title"><div><p className="eyebrow">SELECTED WORKS</p><h2>作品</h2></div><span>02</span></div>
      <div className="work-list"><article><div className="book book-moon official"><Image src={`${basePath}/images/flowing-years-moon.png`} alt="《流年望月》封面" fill sizes="235px"/><div className="moon-cover-type"><strong>流年<br/>望月</strong><span>不渡・著</span></div></div><div><small>DEBUT NOVEL · 2021</small><h3>流年望月</h3><p>有些人用一生等一個月圓，有些人等到的只有天亮。</p></div></article>
      <Link href="/works/stars" className="work-link" onClick={() => archive.disturb(1)}><article><div className="book book-stars official"><Image src={`${basePath}/images/when-the-stars-fall.png`} alt="《當群星墜落》封面" fill sizes="235px"/></div><div><small>FANTASY SERIES · COMPLETE</small><h3>當群星墜落</h3><p>群星墜下的那一夜，世界原本的秩序開始崩落。</p><b>查看作品 <ArrowUpRight size={18}/></b></div></article></Link></div>
    </section>
    {archive.anomaly >= 3 && <div className="intrusion" aria-hidden="true">第二集・失序　//　你已經讀過了</div>}
  </main>;
}
