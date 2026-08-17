export type Badge = { id: string; icon: string; title: string; hint: string; asset?: string };

const asset = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

export const badges: Badge[] = [
  { id: "first-visit", icon: "◌", title: "共犯入坑", hint: "翻開這個不該存在的故事。", asset: asset("/badges/accomplice.png") },
  { id: "only-listener", icon: "◉", title: "唯一聽眾", hint: "聽懂一次不該被聽懂的話。", asset: asset("/badges/only-listener.png") },
  { id: "spoiler-blocked", icon: "×", title: "禁止暴雷", hint: "目擊世界修正原著情報。", asset: asset("/badges/spoiler-blocked.png") },
  { id: "underwear", icon: "◇", title: "內褲之亂", hint: "他真的不是那個意思。", asset: asset("/badges/underwear-chaos.png") },
  { id: "budu", icon: "渡", title: "不渡老師", hint: "認識作家，而不是筆名。", asset: asset("/badges/budu.png") },
];

export const books = [
  { number: "01", title: "墜星", note: "第一顆星辰墜落，魔物開始異變。" },
  { number: "02", title: "失序", note: "本頁沒有任何異常。" },
  { number: "03", title: "裂痕", note: "災難使王國與同行者逐漸分裂。" },
  { number: "04", title: "神隕", note: "每一顆墜星，都代表一位神明正在消亡。" },
  { number: "05", title: "群星墜落", note: "神明的時代結束，人類迎來第一個黎明。" },
];
