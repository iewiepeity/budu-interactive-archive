import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { volumeOne } from "@/lib/volume-one";

export default function VolumeOnePage() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return <main className="novel-page volume-index">
    <Link href="/works/stars" className="back"><ArrowLeft size={16}/> 回到作品頁</Link>
    <header className="novel-hero"><Image src={`${basePath}/images/lorn-first-fall.png`} alt="洛恩城第一次群星墜落之夜" fill priority/><div/><section><p className="eyebrow">VOLUME I · CONTENTS</p><h1>第一集・墜星</h1><p>當世界的常識失效，三個普通人決定追著墜落的星辰前進。</p></section></header>
    <section className="chapter-list"><p className="eyebrow">CHAPTER INDEX</p><h2>目錄</h2>{volumeOne.map((ch, i) => <Link href={`/works/stars/volume-1/${ch.id}`} key={ch.id}><span>{String(i + 1).padStart(2,"0")}</span><div><small>{ch.number}</small><b>{ch.title}</b></div><ArrowRight size={18}/></Link>)}</section>
  </main>;
}
