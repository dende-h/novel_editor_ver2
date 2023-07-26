/* eslint-disable @next/next/no-page-custom-font */
import Head from "next/head";
import { useLocale } from "../../hooks/useLocale";

const Seo = ({ pageTitle, pageDescription, pagePath, pageImg, pageImgWidth, pageImgHeight }) => {
	const { locale } = useLocale();

	const defaultTitle = "Re:terature";
	const defaultDescription =
		locale === "ja"
			? "小説を書くために作られたシンプルなエディタアプリです。会員登録不要で誰でも無料で利用できます。書いた小説はTXT形式のダウンロードやクラウドにバックアップができます。WEBへ公開したい場合専用サイトへの公開も可能です。"
			: "This is a simple editor application designed for writing novels. Anyone can use it for free, no registration required. You can download your novels in TXT format or back them up to the cloud, and if you want to publish them on the web, you can publish them to a dedicated website.";
	const defaultImageUrl =
		"https://enjzxtbbcyrptkkutovq.supabase.co/storage/v1/object/public/images/siteImage/android-chrome-256x256%20(1).png";
	const title = pageTitle ? `${pageTitle} | ${defaultTitle}` : defaultTitle;
	const description = pageDescription ? pageDescription : defaultDescription;
	const url = pagePath;
	const imgUrl = pageImg ? pageImg : defaultImageUrl;
	const imgWidth = pageImgWidth ? pageImgWidth : 1280;
	const imgHeight = pageImgHeight ? pageImgHeight : 640;

	return (
		<Head>
			<title>{title}</title>
			<meta name="viewport" content="width=device-width,initial-scale=1.0" />
			<meta name="description" content={description} />
			<meta name="twitter:card" content="summary_large_image" />
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:site_name" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:type" content="website" />
			<meta property="og:image" content={imgUrl} />
			<meta property="og:image:width" content={String(imgWidth)} />
			<meta property="og:image:height" content={String(imgHeight)} />
			<meta name="twitter:title" content={title} />
			<link rel="preconnect" href="https://fonts.gstatic.com" />
			<link rel="canonical" href={url} />
			<link rel="icon" href="/favicon.ico" />
			<meta name="google-site-verification" content="26u2b3-4uum3ZXDKrS6jWfPzCaWa9I8dPyp5TD2ekrE" />
			<script
				async
				src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9778569212499788"
				crossorigin="anonymous"
			></script>
		</Head>
	);
};

export default Seo;
