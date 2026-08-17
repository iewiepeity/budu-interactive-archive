import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { volumeOne } from "@/lib/volume-one";

export function generateStaticParams() { return volumeOne.map(ch => ({ chapter: ch.id })); }

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const index = volumeOne.findIndex(ch => ch.id === chapter);
  if (index < 0) notFound();
  const current = volumeOne[index];
  const previous = volumeOne[index - 1];
  const next = volumeOne[index + 1];
  return <main className="chapter-page">
    <header className="chapter-header"><Link href="/works/stars/volume-1" className="back"><ArrowLeft size={16}/> 第一集目錄</Link><p>《當群星墜落》・第一集</p></header>
    <article className="novel-copy single-chapter"><section><span>CHAPTER {current.number}</span><h1>{current.title}</h1><div className="chapter-body">{current.body}</div></section></article>
    <nav className="chapter-turn">{previous ? <Link href={`/works/stars/volume-1/${previous.id}`}><ArrowLeft size={17}/><small>上一章</small><b>{previous.title}</b></Link> : <span/>}{next ? <Link href={`/works/stars/volume-1/${next.id}`}><small>下一章</small><b>{next.title}</b><ArrowRight size={17}/></Link> : <Link href="/works/stars"><small>閱讀完畢</small><b>回到作品頁</b><ArrowRight size={17}/></Link>}</nav>
  </main>;
}
