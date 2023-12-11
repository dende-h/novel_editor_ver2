// pages/_document.js

import { ColorModeScript } from "@chakra-ui/react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { staticPath } from "../lib/$path";
import theme from "../theme/theme";

export default class Document extends NextDocument {
	render() {
		return (
			<Html lang="en">
				<Head>
					<link rel="manifest" href={staticPath.manifest_json} />
					<link rel="apple-touch-icon" sizes="180x180" href={staticPath.android_chrome_180x180_png} />
					<link rel="icon" type="image/png" sizes="16x16" href={staticPath.android_chrome_16x16_png} />
					<link rel="icon" type="image/png" sizes="32x32" href={staticPath.android_chrome_36x36_png} />
					<link rel="icon" type="image/png" sizes="48x48" href={staticPath.android_chrome_48x48_png} />
					<link rel="icon" type="image/png" sizes="96x96" href={staticPath.android_chrome_96x96_png} />
					<link rel="icon" type="image/png" sizes="128x128" href={staticPath.android_chrome_128x128_png} />
					<link rel="icon" type="image/png" sizes="144x144" href={staticPath.android_chrome_144x144_png} />
					<link rel="icon" type="image/png" sizes="152x152" href={staticPath.android_chrome_152x152_png} />
					<link rel="icon" type="image/png" sizes="192x192" href={staticPath.android_chrome_192x192_png} />
					<link rel="icon" type="image/png" sizes="256x256" href={staticPath.android_chrome_256x256_png} />
					<link rel="icon" type="image/png" sizes="384x384" href={staticPath.android_chrome_384x384_png} />
					<link rel="icon" type="image/png" sizes="512x512" href={staticPath.android_chrome_512x512_png} />
					<meta name="theme-color" content="#808080" />
					<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
					<meta name="msapplication-TileColor" content="#808080" />
					<meta name="msapplication-TileImage" content={staticPath.android_chrome_144x144_png} />
					<meta name="application-name" content="Re:terature" />
					<meta
						name="description"
						content="短編小説エディターアプリRe:teratureです。閲覧サイトLit:Biteへ投稿できます"
					/>
				</Head>
				<body>
					{/* 👇 Here's the script */}
					<ColorModeScript initialColorMode={theme.config.initialColorMode} />
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
