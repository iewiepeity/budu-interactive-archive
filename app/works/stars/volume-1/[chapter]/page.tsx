import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { volumeOne } from "@/lib/volume-one";
import { chapterMeta } from "@/lib/community";

export function generateStaticParams() { return volumeOne.map(ch => ({ chapter: ch.id })); }

export default async function ChapterPage({ params }: { params: Promise<{ chapter: string }> }) {
  const { chapter } = await params;
  const index = volumeOne.findIndex(ch => ch.id === chapter);
  if (index < 0) notFound();
  const current = volumeOne[index];
  const meta = chapterMeta[index];
  const previous = volumeOne[index - 1];
  const next = volumeOne[index + 1];
  return <main className="chapter-page blog-page">
    <header className="chapter-header blog-nav"><Link href="/works/stars/volume-1" className="back"><ArrowLeft size={16}/> 文章列表</Link><div><b>不渡的夜間書房</b><small>寫故事，也寫一些不該寫的。</small></div><p>ABOUT　ARCHIVE　LOGIN</p></header>
    <article className="novel-copy single-chapter"><section><div className="post-meta"><span>{meta.date}　·　不渡</span><span>瀏覽 {meta.views}　♡ {meta.likes}</span></div><span>《當群星墜落》連載 · CHAPTER {current.number}</span><h1>{current.title}</h1><div className="post-tags">{meta.tags.map(t=><i key={t}>#{t}</i>)}</div><div className="chapter-body">{current.body}</div><footer className="author-signoff">— 不渡<br/><small>如果看到錯字，先假裝沒看到。讓我睡醒再說。</small></footer></section></article>
    <section className="reader-comments"><header><p className="eyebrow">READER COMMENTS</p><h2>留言（{meta.comments.length}）</h2></header>{meta.comments.map((c,i)=><article className={c[2]==="作者"?"author-reply":""} key={`${c[0]}-${i}`}><div className="avatar">{c[0].slice(0,1)}</div><div><b>{c[0]} {c[2]==="作者"&&<em>作者本人</em>}</b><p>{c[1]}</p><small>{c[2]}　·　{index+3} 年前</small></div></article>)}<div className="comment-box">登入後才能留言。<button>讀者登入</button></div></section>
    <nav className="chapter-turn">{previous ? <Link href={`/works/stars/volume-1/${previous.id}`}><ArrowLeft size={17}/><small>上一章</small><b>{previous.title}</b></Link> : <span/>}{next ? <Link href={`/works/stars/volume-1/${next.id}`}><small>下一章</small><b>{next.title}</b><ArrowRight size={17}/></Link> : <Link href="/works/stars"><small>閱讀完畢</small><b>回到作品頁</b><ArrowRight size={17}/></Link>}</nav>
  </main>;
}
