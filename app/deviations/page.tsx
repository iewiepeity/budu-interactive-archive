"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useArchive } from "@/components/ArchiveProvider";

export default function DeviationsPage(){const a=useArchive();const rows=[
  ["洛恩城陷落","已發生","原著一致","fixed"],
  ["許哲維進入小說","原著不存在","嚴重偏差","danger"],
  ["玩家出現在王城地牢",a.flags.includes("prologue-complete")?"已確認":"尚未確認",a.flags.includes("prologue-complete")?"世界線偏移":"資料不足","danger"],
  ["格林頓與白嶺村魔蝠襲擊","尚未發生","倒數中","warning"],
  ["玩家魔法傾向",a.magicType??"尚未覺醒",a.magicType?"新變數":"未判定",a.magicType?"danger":"warning"],
  ["第二次群星墜落","必然事件","結果可改變","warning"],
  ["第五集原著結局","拒絕歸還權能","不再絕對","danger"]
];return <main className="deviation-page"><Link href="/desk" className="back"><ArrowLeft size={16}/> 返回工作桌</Link><header><p className="eyebrow">CANON COMPARISON SYSTEM</p><h1>原著／現況偏差</h1><p>哲維知道的是他寫過的歷史，不是這個世界接下來必然發生的未來。</p></header><section>{rows.map((r,i)=><article key={r[0]}><span>{String(i+1).padStart(2,"0")}</span><h2>{r[0]}</h2><p>{r[1]}</p><b className={r[3]}>{r[2]}</b></article>)}</section><footer><small>偏差值</small><b>{Math.min(99,18+a.anomaly*9+a.flags.length*3)}%</b><p>警告：觀測行為本身可能正在改變結果。</p></footer></main>}
