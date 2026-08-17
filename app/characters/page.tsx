"use client";
import { useState } from "react";

const people=[
 {id:"avier",name:"亞維爾",role:"流亡者／群星的見證者",official:"在邊境災變中失去故鄉的青年。沉默、敏銳，對任何權威都保持距離；他相信活下來不是恩賜，而是一筆遲早要償還的債。",note:"前期看起來最像主角的人。其實很會記仇。讀者以為他冷淡，我寫的是『不知道怎麼求人留下』。差很多，好嗎。"},
 {id:"philae",name:"菲蕾",role:"星象學徒／王城紀錄官",official:"能從墜星軌跡讀出魔力異常的少女。理智且固執，習慣把恐懼整理成資料；隊伍中最常提出正確判斷，也最常被局勢逼著違反自己的判斷。",note:"我本來只打算讓她出場三章。她拒絕。寫到後來整個情報網都被她接管，作者本人沒有發言權。"},
 {id:"grant",name:"葛蘭特",role:"傭兵／沒有神力的人",official:"以一柄舊劍護送眾人穿過崩壞之地。沒有被星辰選中，也沒有傳說血脈；他的力量來自經驗、承諾，以及在所有人後退時仍向前一步。",note:"沒有神力。但我寫到最後才發現，他根本不需要。……這句不要給他看到，會得意。"},
 {id:"edmund",name:"愛德蒙・阿爾維恩",role:"阿爾維恩王儲",official:"背負王國秩序的繼承人。寡言、自律，將私人情感置於職責之後；在群星墜落後，他必須決定要守住既有世界，還是承認它早已無法被挽回。",note:"很難溝通。不借內褲。幹，我根本沒要借。原著的他明明沒有這麼針對作者。"}
];
export default function CharactersPage(){const [active,setActive]=useState(people[0]);const [privateMode,setPrivateMode]=useState(false);return <main className="characters-page"><header><p className="eyebrow">WHEN THE STARS FALL · PERSONNEL</p><h1>角色檔案</h1><p>官方人物介紹，以及理論上不該公開的作者私人註記。</p></header><section className="character-console"><nav>{people.map((p,i)=><button className={active.id===p.id?"active":""} onClick={()=>setActive(p)} key={p.id}><span>0{i+1}</span><b>{p.name}</b><small>{p.role}</small></button>)}</nav><article key={active.id}><p className="eyebrow">ARCHIVE / {active.id.toUpperCase()}</p><h2>{active.name}</h2><h3>{active.role}</h3><p className="character-copy">{active.official}</p><button className="private-toggle" onClick={()=>setPrivateMode(!privateMode)}>{privateMode?"收起作者註記":"偷看作者註記"}</button>{privateMode&&<div className="private-note"><small>不渡私人檔案／禁止外流</small><p>「{active.note}」</p><i>——黑色筆記本頁角潦草字跡</i></div>}</article></section></main>}
