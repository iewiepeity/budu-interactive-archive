import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const traits = [
  ["故事雜食", "小說、漫畫、動畫、電影與遊戲都看，尤其偏愛奇幻、冒險、懸疑、災難與群像。會分析動機與伏筆，遇到真的好看也能乾脆關掉職業病。"],
  ["買得比看得快", "愛逛書店、二手書店與文具店。設定集、畫冊、神話傳說或奇怪冷門資料尤其危險，通常清醒時人已經站在櫃檯。"],
  ["這可以寫", "對神話、民俗、都市傳說、歷史逸聞與各地怪談毫無抵抗力。看到奇怪傳聞的第一反應不是害怕，是先記下來。"],
  ["半夜兜風", "喜歡騎車亂晃。比起精緻行程，更常臨時起意找宵夜、看夜景，或鑽進從來沒走過的陌生巷子。"],
  ["遊戲嘴很臭", "偏愛 RPG、開放世界、劇情向與合作遊戲。輸了會靠北隊友，自己雷到則先裝死，幾秒後再笑得最大聲。"],
  ["歌單沒有邏輯", "工作時習慣放歌，曲風跨度大得像共用帳號。有時只因一句歌詞或一段旋律，就突然想到角色與場景。"],
  ["宵夜派", "愛台灣小吃、超商新品與垃圾食物。真的好吃的店會默默記住，下次不解釋，直接把熟人載過去。"],
  ["什麼都想摸", "好奇心很重，陌生東西總想摸、想試、想問清楚。進入自己筆下的世界後，連沒寫過的路邊攤都不會放過。"]
];
export default function AuthorPage(){const basePath=process.env.NEXT_PUBLIC_BASE_PATH??"";return <main className="author-page"><Link href="/" className="back"><ArrowLeft size={16}/> 回到首頁</Link><header><div><p className="eyebrow">AUTHOR PROFILE · UNABRIDGED</p><h1>許哲維</h1><p>筆名不渡。寫小說的，還活著。<br/>至少網站資料最後一次更新時是這樣寫的。</p></div><div className="author-page-photo"><Image src={`${basePath}/images/xu-zhewei.jpeg`} alt="許哲維" fill priority/></div></header><section className="profile-notes section"><div className="profile-heading"><p className="eyebrow">BEYOND THE DESK</p><h2>創作之外</h2><p>如果不在寫稿，他大概正在替下一本書蒐集一些暫時用不到的東西。</p></div><div className="profile-grid">{traits.map((t,i)=><article key={t[0]}><span>{String(i+1).padStart(2,"0")}</span><h3>{t[0]}</h3><p>{t[1]}</p></article>)}</div></section></main>}
