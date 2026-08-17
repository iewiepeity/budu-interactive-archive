export type Badge = { id: string; icon: string; title: string; hint: string; asset?: string };

export const badges: Badge[] = [
  { id: "first-visit", icon: "◌", title: "共犯入坑", hint: "翻開這個不該存在的故事。", asset: "/badges/accomplice.png" },
  { id: "wrong-page", icon: "⌁", title: "不該存在的頁面", hint: "找到被藏起來的入口。" },
  { id: "beyond-script", icon: "⌘", title: "劇本之外", hint: "以自己的身分醒來。" },
  { id: "only-listener", icon: "◉", title: "唯一聽眾", hint: "聽懂一次不該被聽懂的話。", asset: "/badges/only-listener.png" },
  { id: "spoiler-blocked", icon: "×", title: "禁止暴雷", hint: "目擊世界修正原著情報。", asset: "/badges/spoiler-blocked.png" },
  { id: "underwear", icon: "◇", title: "內褲之亂", hint: "他真的不是那個意思。", asset: "/badges/underwear-chaos.png" },
  { id: "handsome", icon: "+1", title: "現在是說這個的時候？", hint: "在最糟的時機說實話。" },
  { id: "budu", icon: "渡", title: "不渡老師", hint: "認識作家，而不是筆名。", asset: "/badges/budu.png" },
  { id: "cellmate", icon: "Ⅱ", title: "牢友", hint: "與許哲維達成初步共識。" },
  { id: "stargazer", icon: "✦", title: "仰望墜落的群星", hint: "完成序章。" },
];

export const books = [
  { number: "01", title: "墜星", note: "第一顆星辰墜落，魔物開始異變。" },
  { number: "02", title: "失序", note: "本頁沒有任何異常。" },
  { number: "03", title: "裂痕", note: "災難使王國與同行者逐漸分裂。" },
  { number: "04", title: "神隕", note: "每一顆墜星，都代表一位神明正在消亡。" },
  { number: "05", title: "群星墜落", note: "神明的時代結束，人類迎來第一個黎明。" },
];
