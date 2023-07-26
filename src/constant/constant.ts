export type numberOfCharacters = {
	veryShortNovel: number;
	shortShortNovel: number;
	shortNovel: number;
};

export const numberOfCharacters: numberOfCharacters = {
	veryShortNovel: 1200,
	shortShortNovel: 6000,
	shortNovel: 24000
};

export const userProfileItem: string[] = [
	"Alias",
	"Manuscripts",
	"Ready for Public.",
	"Published",
	"Total Chars",
	"Last Updated"
];

export const infoEpubGen: string[] = [
	"フォームの入力内容は自動保存されませんのでご注意ください。",
	"出力できる電子書籍はEPUB形式のみです。",
	"各電子書籍サービスに出版可能な形式です。",
	"出版に際しては、そのサービスの規約に従ってください。",
	"タイトルと最低一つ以上のチャプターは必須です。",
	"表紙はチャプター1の原稿に使用している画像となります。",
	"作者名はプロフィールに設定しているペンネームになります。",
	"ブラウザの機能を利用してダウンロードします。推奨はChromeです。",
	"生成されたファイルは端末内に保存されます。WEB上に残ることはありません。",
	"利用している機種やブラウザによって動作しない場合があります。",
	"細かいレイアウトの変更はできないのでご了承ください。",
	"ファイルがダウンロードされない場合は、ポップアップブロックを無効にしてください。",
	"ダウンロードされたEPUBファイルは、適切な電子書籍リーダーで開くことができます。",
	"利用するリーダーによって文章が崩れる場合があります。",
	"文字化けやレイアウトの崩れが見られる場合、他の電子書籍リーダーを試すか、サポートに連絡してください。",
	"原稿の改訂が必要な場合は、ダウンロード前に行ってください。ダウンロード後の編集はできません。",
	"プライバシーに関する注意: 作成された電子書籍の内容は、当サイト側が一切保存または共有しません。"
];

export const infoEpubGenForEn: string[] = [
	"Please note that form entries are not automatically saved.",
	"The only e-books that can be output are in EPUB format.",
	"The format is publishable to each e-book service.",
	"When publishing, please follow the terms and conditions of that service.",
	"A title and at least one or more chapters are required.",
	"The cover is the image used in the Chapter 1 manuscript.",
	"The author's name will be the pen name you have set in your profile.",
	"Download using your browser's functionality. Chrome is recommended.",
	"The generated file will be stored in the terminal, it will not remain on the web.",
	"It may not work depending on the model and browser you are using.",
	"Please note that minor layout changes are not possible.",
	"If the file does not download, please disable your pop-up blocker.",
	"The downloaded EPUB file can be opened in any suitable e-book reader.",
	"The text may be broken depending on the reader you use.",
	"If you see garbled text or broken layouts, try another e-reader or contact support.",
	"If you need to revise your manuscript, please do so before downloading. Edits cannot be made after downloading.",
	"Privacy Note: We do not store or share any of the content of the eBooks you create."
];
