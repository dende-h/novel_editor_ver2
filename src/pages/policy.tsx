import { Heading, Text, VStack } from "@chakra-ui/react";
import Seo from "../components/util/Seo";
import { useTranslation } from "react-i18next";

export default function PrivacyPolicy() {
	const { t } = useTranslation();
	return (
		<>
			<Seo
				pageTitle="プライバシーポリシー"
				pageDescription="当サイトにおけるプライバシーポリシーです"
				pageImg={null}
				pagePath="https://next-novel-site.vercel.app/policy"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<VStack maxW="800px" mx="auto" px={4} py={8} spacing={8}>
				<Heading as="h1" size="lg">
					Re:teratureのプライバシーポリシー
				</Heading>
				<VStack align="start" spacing={4}>
					<Text>
						{t("greeting")}
						このドキュメントは当サイトRe:teratureにおいて個人情報を収集、使用、保護する方法について説明します。
					</Text>
					<Text fontWeight="bold">1. 当サイトに掲載されている広告について</Text>
					<Text>
						当サイトでは、第三者配信の広告サービス（Googleアドセンス）を利用しています。
						<br />
						このような広告配信事業者は、ユーザーの興味に応じた商品やサービスの広告を表示するため、当サイトや他サイトへのアクセスに関する情報
						『Cookie』(氏名、住所、メール アドレス、電話番号は含まれません) を使用することがあります。
						<br />
						またGoogleアドセンスに関して、このプロセスの詳細やこのような情報が広告配信事業者に使用されないようにする方法については、
						<a href="https://policies.google.com/technologies/ads?gl=jp">こちら</a>をご覧ください。
					</Text>
					<Text fontWeight="bold">2. 当サイトが使用しているアクセス解析ツールについて</Text>
					<Text>
						当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
						<br />
						このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
						<br />
						このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
						<br />
						この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
						<br />
						この規約に関して、詳しくは
						<a href="https://marketingplatform.google.com/about/analytics/terms/jp/">こちら</a>
						をご覧ください。
					</Text>
					<Text fontWeight="bold">3. 当サイトの情報について</Text>
					<Text>
						当サイトに掲載されている情報については、可能な限り正確な情報を提供するよう努めておりますが、誤情報が混入する場合や、情報の最新性が損なわれる場合もございます。
						<br />
						情報の正確性を鑑みた際に、予告なしでの情報の変更・削除をすることもございますので、ご了承ください。
					</Text>
					<Text fontWeight="bold">4. 収集した情報の利用</Text>
					<Text>
						当サイトで取得した情報は、小説とサムネイル画像の投稿・閲覧に使用されます。
						<br />
						ペンネームは、ユーザーの投稿した小説に表示されます。ペンネームは、他のユーザーが投稿した小説と区別するために使用されます。
						<br />
						当サイトは、利用者の個人情報を第三者に提供することはありません。
					</Text>
					<Text fontWeight="bold">5. 情報の保護について</Text>
					<Text>
						当サイトは、取得した情報を厳密に管理し、不正アクセス、漏洩、紛失、破壊などを防止するために必要な措置を講じます。
					</Text>
					<Text fontWeight="bold">6. 免責事項</Text>
					<Text>
						当サイトにおいて提供される情報については、正確性、確実性、適合性、有用性等について一切保証するものではありません。当サイトの利用によって生じたいかなる損害についても、一切責任を負いません。
						<br />
						また、当サイトの掲載情報をご利用頂く場合には、お客様のご判断と責任におきましてご利用頂けますようお願い致します。
						<br />
						当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
					</Text>
					<Text fontWeight="bold">7. 投稿したコンテンツの著作権</Text>
					<Text>
						当サイトから投稿先のLit:Biteに掲載されているコンテンツの著作権は、その提供者に帰属します。
						<br />
						本サイトのコンテンツを提供者以外の第三者が無断で転載・複製・編集することを禁じます。
					</Text>
					<Text fontWeight="bold">8. 違法なコンテンツ</Text>
					<Text>
						当サイトにおいて暴力的または中傷的、性的、不正行為や差別を助長する、その他不適切な表現と判断した場合、予告なく掲載の削除等の措置を講じます。
					</Text>
					<Text fontWeight="bold">9. お問い合わせフォームについて</Text>
					<Text>
						当サイトでは、お問い合わせフォームからお問い合わせいただく際に、お名前とメールアドレス等の個人情報をご登録いただいています。
						<br />
						これらの個人情報は質問に対する回答を電子メールなどでご連絡する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
					</Text>
					<Text fontWeight="bold">10. リンクについて</Text>
					<Text>
						当サイトは原則リンクフリーです。リンクを行う場合の許可や連絡は不要です。
						<br />
						引用する際は、引用元の明記と該当ページへのリンクをお願いします。
						<br />
						ただし、画像ファイルへの直リンク、インラインフレームを使用したHTMLページ内で表示する形でのリンクはご遠慮ください。
					</Text>
					<Text fontWeight="bold">11. プライバシーポリシーの変更</Text>
					<Text>
						当サイトは、利用者に事前の通知なく、いつでもプライバシーポリシーを変更することができます。
						<br />
						変更後のプライバシーポリシーは、当サイトに掲載した時点で効力を発揮します。
					</Text>
					<Text fontWeight="bold">12. 最終更新日</Text>
					<Text>本プライバシーポリシーは2023年7月13日に最終更新されました。</Text>
				</VStack>
			</VStack>
		</>
	);
}
export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
