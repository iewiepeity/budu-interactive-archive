# 不渡｜互動式作者檔案館

「不渡／許哲維」互動式網站 MVP：一個看似正常的小說作者官網，逐漸遭到《當群星墜落》的世界侵蝕。

## MVP 內容

- 不渡作者官網與作品介紹
- 隨閱讀進度出現的 ARG 異常與 glitch
- 《當群星墜落》的隱藏「繼續閱讀」入口
- 王城地牢選項式序章
- 許哲維好感度與瀏覽器存檔
- 玩家可短暫看見原話的「自動扭曲」演出
- 10 枚徽章解鎖框架與 5 枚正式徽章素材

## 開始使用

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 驗證

```bash
npm run build
```

技術與擴充說明請見 [`docs/MVP-ARCHITECTURE.md`](docs/MVP-ARCHITECTURE.md)。

## 技術

Next.js、React、TypeScript、CSS。閱讀進度目前儲存在瀏覽器 `localStorage`，未來可替換為帳號與雲端存檔。

## 授權

角色、故事、文字與圖像素材保留所有權利。未經授權不得重製或再利用。
