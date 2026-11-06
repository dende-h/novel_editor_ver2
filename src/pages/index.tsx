import Head from 'next/head';

//後継エディタ「コトノハ-leaf-」の紹介ページ
const successorEditorUrl = 'https://cotonoha-leaf.org/lp';

export default function ServiceClosed() {
	return (
		<>
			<Head>
				<title>サービス終了のお知らせ | Re:terature</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="小説エディタ「Re:terature」はサービスを終了いたしました。" />
			</Head>
			<main>
				<article className="card">
					<p className="service">Re:terature</p>
					<h1>サービス終了のお知らせ</h1>
					<p>
						小説エディタ「Re:terature」は、サービスを終了いたしました。
						<br />
						これまでご利用いただいた皆さまに、心より御礼申し上げます。
					</p>
					<p>
						サービス終了に伴い、保存されていた原稿・公開作品・バックアップデータはご覧いただけなくなりました。また、閲覧サイト「Lit:Bite」も同時にサービスを終了しております。
					</p>

					<section>
						<h2>後継エディタ「コトノハ-leaf-」</h2>
						<p>Re:teratureの後継となる、新しい小説エディタです。無料でお使いいただけます。</p>
						<a className="button" href={successorEditorUrl} target="_blank" rel="noopener noreferrer">
							コトノハ-leaf-を見る
						</a>
					</section>

					<section className="en" lang="en">
						<h2>Re:terature has been discontinued</h2>
						<p>
							Thank you for using Re:terature. The service has ended, and saved drafts, published works, and backup
							data are no longer available. Our successor editor, “Cotonoha -leaf-” (Japanese), is available free of
							charge.
						</p>
					</section>

					<p className="closing">長らくのご愛顧、誠にありがとうございました。</p>
				</article>
			</main>
		</>
	);
}
