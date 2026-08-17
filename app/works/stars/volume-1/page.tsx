"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useArchive } from "@/components/ArchiveProvider";
import { volumeOne } from "@/lib/volume-one";

export default function VolumeOnePage() {
  const archive = useArchive();
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  useEffect(() => archive.unlock("budu"), []); // eslint-disable-line react-hooks/exhaustive-deps
  return <main className="novel-page">
    <Link href="/works/stars" className="back"><ArrowLeft size={16}/> 回到作品頁</Link>
    <header className="novel-hero"><Image src={`${basePath}/images/lorn-first-fall.png`} alt="洛恩城第一次群星墜落之夜" fill priority/><div/><section><p className="eyebrow">VOLUME I · OFFICIAL ARCHIVE</p><h1>第一集・墜星</h1><p>當世界的常識失效，三個普通人決定追著墜落的星辰前進。</p></section></header>
    <nav className="chapter-nav">{volumeOne.map(ch => <a key={ch.id} href={`#${ch.id}`}>{ch.number}　{ch.title}</a>)}</nav>
    <article className="novel-copy"><p className="source-note">依據「許哲維－設定資料」第一集內容整理為網站閱讀版。</p>{volumeOne.map(ch => <section id={ch.id} key={ch.id}><span>CHAPTER {ch.number}</span><h2>{ch.title}</h2>{ch.paragraphs.map((p,i)=><p key={i}>{p}</p>)}</section>)}</article>
  </main>;
}
