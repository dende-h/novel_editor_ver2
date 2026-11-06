# Re:terature（サービス終了）

小説エディタ「Re:terature」はサービスを終了しました。

このリポジトリの `main` は、どの URL にアクセスしても終了告知ページのみを表示する最小構成の Next.js アプリです。
サービス稼働中のソースコードは git の履歴（`service-closed` ブランチ作成以前のコミット）を参照してください。

- 終了告知ページ: `src/pages/index.tsx`
- すべてのパスを告知ページへ書き換える設定: `next.config.js`
- 旧 Service Worker の解除用: `public/sw.js`
