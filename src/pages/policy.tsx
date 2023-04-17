import { Heading, Text, VStack } from "@chakra-ui/react";

export default function PrivacyPolicy() {
	return (
		<VStack maxW="800px" mx="auto" px={4} py={8} spacing={8}>
			<Heading as="h1" size="lg">
				プライバシーポリシー
			</Heading>
			<VStack align="start" spacing={4}>
				<Text>
					当サイトは、短編小説とサムネイル画像を投稿し、閲覧することができるウェブアプリです。当サイトのプライバシーポリシーは、以下の通りです。
				</Text>
				<Text fontWeight="bold">1. 取得する情報について</Text>
				<Text>
					当サイトでは、サムネイル画像、小説、およびペンネームを取得します。それ以外の個人情報は一切取得いたしません。
				</Text>
				<Text fontWeight="bold">2. 取得した情報の利用について</Text>
				<Text>
					当サイトで取得した情報は、短編小説とサムネイル画像の投稿・閲覧に使用されます。当サイトは、利用者の個人情報を第三者に提供することはありません。
				</Text>
				<Text fontWeight="bold">3. 情報の保護について</Text>
				<Text>
					当サイトは、取得した情報を厳密に管理し、不正アクセス、漏洩、紛失、破壊などを防止するために必要な措置を講じます。
				</Text>
				<Text fontWeight="bold">4. 免責事項</Text>
				<Text>
					当サイトは、利用者が投稿した短編小説やサムネイル画像に関する権利侵害、誹謗中傷などのトラブルについては一切責任を負いません。利用者が自己責任で投稿・閲覧を行うものとします。
				</Text>
				<Text fontWeight="bold">5. プライバシーポリシーの変更について</Text>
				<Text>
					当サイトは、プライバシーポリシーを変更することがあります。変更があった場合は、当サイトに掲載することで利用者に通知します。
				</Text>
			</VStack>
		</VStack>
	);
}
