import {
	Container,
	VStack,
	HStack,
	Heading,
	UnorderedList,
	ListItem,
	List,
	ListIcon,
	Text,
	Box
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { MdSettings } from "react-icons/md";
import Seo from "../util/Seo";

export const JaDeveloper = () => {
	return (
		<>
			<Seo
				pageTitle="開発者情報"
				pageDescription="当アプリ運営開発者の情報"
				pageImg={null}
				pagePath="https://novel-editor-ver2.vercel.app/developer"
				pageImgHeight="600"
				pageImgWidth="1200"
			/>
			<Container maxW="xl" centerContent mt={8}>
				<VStack spacing={8} align="center">
					<HStack>
						<Image src={"/android-chrome-36x36.png"} alt={"logoImage"} width={36} height={36} priority />
						<Heading as="h1" size="lg" fontWeight="bold">
							開発者プロフィール
						</Heading>
					</HStack>

					<Text fontSize="md" textAlign="center" color="gray.500">
						当アプリを開発、運営する管理人のプロフィールページです
					</Text>
				</VStack>
				<Box mt={8} maxW="2xl" w="full" px={4}>
					<Heading as="h2" size="md" textAlign="left" mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ dende-hプロフィール
					</Heading>
					<UnorderedList>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>開発者名</Text>
							<Text>dende-h</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>作家活動ペンネーム</Text>
							<Text>でんで</Text>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>自己紹介</Text>
							<Text>
								趣味で小説を書いています。普段は会社員でSEとして働いています。作家活動している方が創作に集中できるよう使いやすい小説エディターを目指して当アプリを開発いたしました。
							</Text>
							<Text>
								<Text
									as="a"
									href="https://next-novel-site.vercel.app/"
									color="blue.500"
									borderBottom={"1px"}
									borderColor={"blue.500"}
								>
									投稿小説サイト
								</Text>
								も開発しております。当アプリからそのサイトへ小説が投稿できます。
							</Text>
							<Text>投稿するためのアプリではなく、小説を書くことを目的としています。</Text>
							<Text>
								取り敢えずサクサク書いたり、消したり、文字数を調整してその文字数に収める練習をしたり、色々試してみて下さい。
							</Text>
							<Text>皆さまの創作活動を支援できるよう頑張ります。</Text>
							<Link href={"https://twitter.com/dendeiriamaka1"} passHref>
								<Text color="blue.500">Twitterしております</Text>
							</Link>
						</ListItem>
						<ListItem mb={1}>
							<Text fontWeight={"bold"}>問い合わせ</Text>
							<Link href="/contact" passHref>
								<Text color="blue.500">contactフォーム</Text>
							</Link>
						</ListItem>
					</UnorderedList>
					<Heading as="h2" size="md" textAlign="left" mt={8} mb={2} borderBottom={"1px"} borderColor={"gray.400"}>
						◆ サイト更新情報
					</Heading>
					<Box pb={6}>
						<List>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/08/10</Text>
								</HStack>
								<Text>電子書籍リーダーBibi追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/08/09</Text>
								</HStack>
								<Text>翻訳メモ機能のバグ解消と対応言語の追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/08/04</Text>
								</HStack>
								<Text>ボタン間隔の修正とメニュー項目の入れ替え、ポモドーロタイマーのボタン移動</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/27</Text>
								</HStack>
								<Text>サイトの2ヵ国語対応</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/13</Text>
								</HStack>
								<Text>ポリシーの修正、開発者紹介ページの追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/07</Text>
								</HStack>
								<Text>自動校正ツールの機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/07/05</Text>
								</HStack>
								<Text>電子書籍形式の出力機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/27</Text>
								</HStack>
								<Text>単語の翻訳機能と、前書き後書きのフォーム追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>原稿ごとのプレビューボタン追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>原稿ごとのプレビューボタン追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/10</Text>
								</HStack>
								<Text>原稿ごとのプレビューボタン追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/07</Text>
								</HStack>
								<Text>操作説明文追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/06/05</Text>
								</HStack>
								<Text>原稿ごとに付箋型のメモを残せる機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/29</Text>
								</HStack>
								<Text>常時ロード状態になってしまう不具合の修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/26</Text>
								</HStack>
								<Text>初回表示時本文が表示されない不具合の修正、ポリシー修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/25</Text>
								</HStack>
								<Text>Editor操作性をアップした、Ver2のリリース、バックアップ機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/05/09</Text>
								</HStack>
								<Text>レイアウト調整、その他軽微な不具合の修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/23</Text>
								</HStack>
								<Text>How to use ページの追加、フッターヘッダーのリンク修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/20</Text>
								</HStack>
								<Text>リロードした際にデータが消えてしまう不具合を修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/17</Text>
								</HStack>
								<Text>プライバシーポリシー追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/04/14</Text>
								</HStack>
								<Text>ポモドーロタイマー機能実装、グーグルアナリティクス導入、ファビコン変更</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/29</Text>
								</HStack>
								<Text>データベースへのアップロード機能追加</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/24</Text>
								</HStack>
								<Text>ふりがな追加の特殊記法に対応</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/15</Text>
								</HStack>
								<Text>本棚レイアウト追加、タグ検索機能実装、コピーボタン追加、その他微修正</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/03/09</Text>
								</HStack>
								<Text>メニューボタン修正、ユーザー頁実装、ダークモード実装、レスポンシブ対応</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/02/28</Text>
								</HStack>
								<Text>コンタクトフォーム実装</Text>
							</ListItem>
							<ListItem mb={1}>
								<HStack spacing={0}>
									<ListIcon as={MdSettings} color="green.500" />
									<Text fontWeight={"bold"}>23/02/27</Text>
								</HStack>
								<Text>アプリリリース</Text>
							</ListItem>
						</List>
					</Box>
				</Box>
			</Container>
		</>
	);
};
