import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html lang="ja">
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/android-chrome-180x180.png" />
				<meta name="robots" content="noindex" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
