"use client";
import { useState } from "react";
import { BookOpen, Terminal, X } from "lucide-react";

const notes = [
  { title: "頁角沒有日期", body: <>洛恩沒了。<br/>第一集結束。<br/><br/>接下來是第二次墜星。<br/>格林頓、白嶺村、魔蝠。<br/><u>得想辦法讓人相信我。</u><br/><br/>為什麼我一講正事，他們就想抓我？</> },
  { title: "潦草到差點看不懂", body: <>待辦：<br/>→ 出去<br/>→ 找亞維爾三人<br/>→ 確認現在到底差多少<br/>→ 吃東西<br/>→ 不要再跟王儲提內褲<br/><br/><s>最後一條又不是我要提的</s></> },
  { title: "整頁只寫了幾句", body: <>幹。<br/>幹。<br/>幹。<br/><br/>我寫地牢時為什麼沒寫床？<br/><small>頁角：世界觀寫太完整的報應。</small></> },
  { title: "夾在情報頁後面", body: <>牢房裡那個人不在原著。<br/>看起來也不像本地人。<br/><br/>能聽懂我？還是猜的？<br/><s>如果是真的，至少不用再一個人</s><br/><br/>先觀察。不要亂信人。</> },
  { title: "農場文標題練習", body: <>《震驚！知名作家熬夜完稿，醒來竟被王儲關進地牢》<br/><br/>《他只說了這一句，兩名騎士當場把他拖走》<br/><br/>《穿越後千萬別做這五件事，最後一件我已經做了》</> }
];

const posts = [
  { platform: "字窩・作者動態", meta: "不渡　凌晨 03:17", post: "有人問第五集什麼時候寫完。問得很好，我也想知道。現在主角在世界末日，我在截稿末日，某種程度上大家進度一致。", comments: ["月下等更：老師你三天前才說剩最後一章", "不渡：一天有寫三百字也是寫", "編輯不是敵人：許老師，請看訊息。", "不渡：這帳號名字誰改的"] },
  { platform: "深夜匿名板／閒聊", meta: "匿名作者#7F2A　01:48", post: "認真問，泡麵加蛋但蛋掉到流理台，五秒內撿回去還算加蛋嗎？", comments: ["2F：算加菌", "3F：你先說你是不是不渡", "4F：第五集是不是就這樣寫出來的", "原PO：靠北不要認親"] },
  { platform: "舊個人部落格", meta: "不渡｜〈關於下雨天〉｜2019.06.14", post: "我喜歡凌晨騎車經過剛下完雨的城市。紅綠燈像只替你一個人亮，便利商店永遠醒著。這種時候會覺得故事不是被想出來的，只是躲在某條巷子裡，等你剛好經過。", comments: ["小凱：所以你昨天三點找我吃鹹酥雞是取材？", "不渡：對", "小凱：你放屁", "路過讀者：這篇居然沒有髒話"] },
  { platform: "短文社群", meta: "@budu_writes · 23:52", post: "投票：角色活著但讀者哭，跟角色死了讀者罵作者，哪個比較算成功？", comments: ["@starreader：你先把稿交出來", "@editor_lin：沒有『作者失聯』這個選項。", "@budu_writes：民主已死", "@mianbao：老師是不是喝了"] }
];

export function StoryCommands({ scene, affection }: { scene: string; affection: number }) {
  const [value, setValue] = useState("");
  const [result, setResult] = useState<{ kind: "note"|"post"; index: number } | null>(null);
  const run = () => {
    const command = value.trim();
    const hasMetPlayer = ["first", "listener", "underwear", "after", "end"].includes(scene);
    const availableNotes = hasMetPlayer ? notes : notes.slice(0, 3);
    const pool = command === "!廢文" ? posts : command === "!筆記本" || command === "!查看筆記本" ? availableNotes : null;
    if (!pool) return;
    const seed = scene.length + affection + Date.now();
    setResult({ kind: command === "!廢文" ? "post" : "note", index: seed % pool.length });
    setValue("");
  };
  const post = result?.kind === "post" ? posts[result.index] : null;
  const note = result?.kind === "note" ? notes[result.index] : null;
  return <div className="story-commands"><div className="command-line"><Terminal size={14}/><input aria-label="輸入隱藏指令" value={value} onChange={e=>setValue(e.target.value)} onKeyDown={e=>e.key==="Enter"&&run()} placeholder="輸入隱藏指令…"/><button onClick={run}>執行</button></div><p>可用指令：!筆記本　!查看筆記本　!廢文</p>{result && <div className="artifact-overlay" onClick={()=>setResult(null)}><article className={result.kind} onClick={e=>e.stopPropagation()}><button className="artifact-close" onClick={()=>setResult(null)}><X/></button>{note && <><BookOpen size={22}/><small>許哲維的黑色隨身筆記本</small><h3>{note.title}</h3><div className="handwriting">{note.body}</div></>}{post && <><small>{post.platform}</small><h3>{post.meta}</h3><p className="old-post">{post.post}</p><div className="comments">{post.comments.map(c=><p key={c}>{c}</p>)}</div><p className="zhewei-reaction">許哲維盯著半空中的舊文章，沉默了三秒。<br/>「……幹。這三小公開處刑？」</p></>}</article></div>}</div>;
}
