"use client";
import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Repeat2, Search } from "lucide-react";

const platforms = [
  { id:"ptt", tab:"P踢踢", name:"P踢踢｜C_Novel 板", sub:"奇幻小說與作者八卦集中區", posts:[
    { title:"[閒聊] 不渡是不是很愛先讓讀者喜歡再下手？", meta:"reader404 · 2026/08/12", body:"剛重看洛恩城。肉桂捲越香，我越確定作者沒有心。", comments:["推 mooncake：他有心，只是拿去換劇情張力了","推 budu本人疑似帳號：合理創作手法，謝謝","噓 editor_lin：許老師請不要用分身幫自己講話"] },
    { title:"[情報] 《當群星墜落》第五集今晚完稿？", meta:"starfall5 · 2026/08/17 01:36", body:"不渡剛在小帳說只剩結尾最後一段。有人今晚一起蹲嗎？", comments:["推 sleepless：蹲","推 breadshop：我飲料都買好了","推 grantdad：拜託讓葛蘭特活著"] },
    { title:"[討論] 如果只能跟一個角色組隊，你選誰", meta:"partybuilder · 2026/08/14", body:"理性上選葛蘭特，感性上選菲蕾，想死得有戲劇性就選亞維爾。", replyCount:486, comments:["推 grantdad：葛蘭特，穩定、有經驗、會叫你快跑","推 mooncake：菲蕾，至少死前有麵包吃","推 wisdomfail：亞維爾本人看到最後一句會怎樣","推 budu：會先問你憑什麼覺得自己有戲劇性","推 5F：作者又開分身下場了"] },
    { title:"[崩潰] 第四章看完的人進來集合", meta:"bakery_memorial · 2026/08/15", body:"不接受劇情討論。本串唯一用途是要求不渡賠償菲蕾的麵包店。", replyCount:913, comments:["推 breadshop：簽到","推 cinnamon：一人一磚重建洛恩","推 budu：那個是魔物燒的","噓 全板：你寫的","推 editor_lin：民意很清楚了，許老師"] },
    { title:"[考據] 凱洛斯能力不是預知，講錯的人罰重看", meta:"lorekeeper · 2026/08/16", body:"是分析軌跡、規律與可能性。再看到短影音說他能預知未來，我就要順著網路線去洛恩。", replyCount:327, comments:["推 glassesmage：終於有人說","推 futureboy：但效果看起來很像啊","噓 lorekeeper：你就是我要抓的那個","推 budu：原作者認證一樓正確","推 lorekeeper：抓到野生的，先去上傳第五集"] },
    { title:"[問卦] 不渡人咧？第五集到底上傳了沒", meta:"whereisbudu · 2026/08/18 09:14", body:"昨天說剩最後一個字，出版社頁面沒檔案，作者所有帳號也沒上線。這是史上最長的上傳進度條嗎？", comments:["推 editor不是敵人：出版社說聯絡不上，不像宣傳","推 mooncake：一開始笑得出來，現在有點毛","噓 uploadplease：許哲維你有種完稿有種按上傳","推 7F：有人去過他家嗎？","推 9F：編輯說電腦還亮著，人不在"] }
  ]},
  { id:"plurk", tab:"噗浪", name:"噗浪河道｜不渡與他的快樂催稿夥伴", sub:"時間軸已停止更新", posts:[
    { title:"不渡 說", meta:"8 月 16 日 23:48", body:"剩最後兩千字。寫完我要睡到下一個星辰紀元。", comments:["月餅：截圖了，兩千字","編輯不是敵人：我也截圖了","不渡：妳不要每個平台都在"] },
    { title:"不渡 說", meta:"8 月 17 日 02:42", body:"最後一個字。幹。終於。", comments:["葛蘭特爸爸粉：完結撒花！！！","編輯不是敵人：恭喜。現在請上傳。","月餅：老師？","編輯不是敵人：許老師？"] },
    { title:"菲蕾麵包後援會 分享", meta:"8 月 13 日 18:22", body:"【投票】如果洛恩城有外送，你最想點什麼？投票選項沒有『作者的良心』，因為店裡不賣不存在的東西。", replyCount:264, comments:["不渡：我好好一個作者為什麼每天被公開處刑","月餅：因為你追蹤了這條河道","不渡：取消追蹤了","菲蕾麵包後援會：你三分鐘後又回來留言"] },
    { title:"不渡 分享", meta:"8 月 15 日 02:09", body:"寫作冷知識：角色不肯照大綱走的時候，可以把大綱關掉，假裝一開始就沒有。", replyCount:189, comments:["編輯不是敵人：合約不能關掉","凱洛斯觀察員：所以第三集那段真的是失控？","不渡：那叫有機生長","月餅：那截稿叫什麼","不渡：無機死亡"] },
    { title:"葛蘭特爸爸粉 說", meta:"8 月 16 日 21:40", body:"許願第五集葛蘭特平安。此噗每回一則，不渡少虐他一次。", replyCount:1207, comments:["不渡：妳這是非法干涉創作","葛蘭特爸爸粉：1207 次了，請簽收","編輯不是敵人：我代表出版社支持讀者","不渡：這公司到底誰的人"] },
    { title:"月餅不加蛋黃 問", meta:"8 月 18 日 20:07", body:"有人收到第五集了嗎？不渡最後上線就停在『最後一個字』，後面一整天沒動靜。", comments:["編輯不是敵人：沒有收到檔案，電話也沒有接","凱洛斯觀察員：他平常失聯會先發廢文，這次連廢文都沒有","路過：別嚇人……","月餅不加蛋黃：許哲維，看到就吱一聲。稿可以晚，人先出現。"] }
  ]},
  { id:"threads", tab:"Threads", name:"Threads｜正在討論《當群星墜落》", sub:"熱門串文 · 為你推薦", posts:[
    { title:"@讀到天亮", meta:"17 小時", body:"第一次看《當群星墜落》，請問那間麵包店很重要嗎？我很喜歡，想先畫同人。", comments:["@老讀者：你先畫","@老讀者：現在就畫","@菲蕾麵包後援會：不要看留言，快樂一天是一天"] },
    { title:"@第五集受害者聯盟", meta:"8 小時", body:"全網都在等不渡按一個上傳。寫完最後一個字後消失，這是什麼沉浸式《群星墜落》行銷？作者本人先墜落？", comments:["@出版社員工匿名：不是行銷","@不要嚇我：這句讓整串突然不好笑","@宵夜地圖：他常去的店昨晚也沒看到人"] },
    { title:"@一句話惹怒書粉", meta:"3 天", body:"《當群星墜落》不就是星星掉下來，大家一直跑嗎？", replyCount:2381, comments:["@群像派萬歲：對，三體也是球在動","@凱洛斯觀察員：你的位置已被智慧之星標記","@不渡本人：沒事，他至少有看懂標題","@一句話惹怒書粉：作者怎麼也來了","@不渡本人：演算法把我推來受苦"] },
    { title:"@文學系逃兵", meta:"2 天", body:"不渡寫感情最好看的地方，是角色根本沒空告白。世界要毀滅、城要塌了、魔物在追，兩個人只能說『你先走』。然後讀者自己在螢幕前結婚。", replyCount:764, comments:["@月餅不加蛋黃：民政局已經下班但我可以主持","@不渡本人：我真的沒有寫他們交往","@全體讀者：不重要","@不渡本人：尊重一下作者解釋權","@全體讀者：不要"] },
    { title:"@編輯不是敵人", meta:"1 天", body:"溫馨提醒：催稿不是暴力。凌晨三點在四個平台留言，也只是跨平台關懷。", replyCount:532, comments:["@不渡本人：妳帳號名稱就是一種威脅","@讀到天亮：編輯姊姊第五集有了嗎","@編輯不是敵人：他說今晚","@第五集受害者聯盟：歷史上最危險的三個字"] },
    { title:"@找不到不渡", meta:"剛剛", body:"整理目前資訊：電腦有完稿時間、雲端沒有第五集、機車還在、手機沒帶走，監視器也沒拍到他離開。到底一個 183 公分的人要怎麼憑空不見？", comments:["@星星掉下來了：先別把這串刪掉","@路人甲：等等，他官網剛才是不是自己更新了？","@找不到不渡：哪一頁？","@路人甲：第二集下面，多了一個『繼續閱讀』。"] }
  ]}
];

export default function CommunityPage(){const [active,setActive]=useState(0);const p=platforms[active];return <main className={`community-page platform-${p.id}`}><header className="community-top"><Link href="/" className="back"><ArrowLeft size={16}/> 回到作者官網</Link><div><Search size={16}/><span>搜尋「不渡 第五集 人呢」</span></div><small>ARCHIVED · READ ONLY</small></header><section className="community-hero"><p className="eyebrow">READER COMMUNITY · WEB ARCHAEOLOGY</p><h1>大家本來只是在催稿。</h1><p>直到他真的不見了。</p><nav>{platforms.map((x,i)=><button className={i===active?"active":""} onClick={()=>setActive(i)} key={x.id}>{x.tab}</button>)}</nav></section><section className="fake-platform"><header><div className="fake-logo">{p.tab.slice(0,1)}</div><div><h2>{p.name}</h2><p>{p.sub}</p></div></header><div className="fake-feed">{p.posts.map((post,i)=>{const replies=(post as typeof post&{replyCount?:number}).replyCount??post.comments.length;return <article className={`${i===p.posts.length-1?"last-trace":""} ${replies>500?"viral-post":""}`} key={post.title}><small>{post.meta}{replies>500&&"　🔥 熱門討論"}</small><h3>{post.title}</h3><p>{post.body}</p><div className="engagement"><span><Heart size={13}/> {128+i*317+replies}</span><span><MessageCircle size={13}/> {replies} 則回應</span><span><Repeat2 size={14}/> 分享</span></div><div className="fake-comments">{post.comments.map(c=><p key={c}>{c}</p>)}{replies>post.comments.length&&<button>展開其餘 {replies-post.comments.length} 則回應</button>}</div>{i===p.posts.length-1&&<b className="archive-flag">最後存檔：作者失聯後 {active+3} 小時</b>}</article>})}</div></section><p className="fiction-note">※ 本頁為虛構平台與虛構網友內容，沒有任何鄉民真的為了第五集熬夜。應該吧。</p></main>}
