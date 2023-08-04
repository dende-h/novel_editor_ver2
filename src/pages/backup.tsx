import {
	Box,
	VStack,
	Text,
	Flex,
	useColorModeValue,
	Button,
	HStack,
	Spacer,
	StackDivider,
	Divider,
	Spinner
} from "@chakra-ui/react";
import format from "date-fns/format";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { supabase } from "../../lib/supabaseClient";
import { ChangePassWordModal } from "../components/backup/ChangePassWordModal";
import { ChangeUserNameModal } from "../components/profilePage/ChangeUserNameModal";
import Seo from "../components/util/Seo";
import { backUpData, BackUpDataObject } from "../globalState/selector/backUpData";
import { drafts } from "../globalState/atoms/drafts";
import { draftsJson } from "../globalState/atoms/draftJson";
import { isPublishedState } from "../globalState/atoms/isPublishedState";
import { isSelected } from "../globalState/atoms/isSelected";
import { lastPublishedTime } from "../globalState/atoms/lastPublishedTime";
import { publishedCount } from "../globalState/atoms/publishedCount";
import { publishedDraftsData } from "../globalState/atoms/publishedDraftsData";
import { userImageUrl } from "../globalState/atoms/userImageUrl";
import { userIntroduction } from "../globalState/atoms/userIntroduction";
import { userName } from "../globalState/atoms/userName";
import { passWord } from "../globalState/atoms/passWord";
import { AlertDialogBackUpDelete } from "../components/backup/AlertDialogBackUpDelete";
import { AlertDialogBackUpReconstruction } from "../components/backup/AlertDialogBackUpReconstruction";
import { memoState } from "../globalState/atoms/memoState";
import { hash, compare } from "bcryptjs";
import { CheckPassWordModal } from "../components/backup/CheckPassModal";
import { sentenceListAtoms } from "../globalState/atoms/sentenceListAtoms";
import { useLocale } from "../hooks/useLocale";

export default function BackUP() {
	const { t } = useLocale();
	//バックアップする永続化中の状態のsetStateを定義
	const setDrafts = useSetRecoilState(drafts);
	const setDraftsJson = useSetRecoilState(draftsJson);
	const setIsSelected = useSetRecoilState(isSelected);
	const setLastPublishedTime = useSetRecoilState(lastPublishedTime);
	const setPublishedCount = useSetRecoilState(publishedCount);
	const setPublishedDraftsData = useSetRecoilState(publishedDraftsData);
	const setUserImageUrl = useSetRecoilState(userImageUrl);
	const setUserIntroduction = useSetRecoilState(userIntroduction);
	const setMemoData = useSetRecoilState(memoState);
	const setTranslateData = useSetRecoilState(sentenceListAtoms);
	//復元の際に手入力が必要なユーザーネームとパスワードのsetStateは不要

	const name = useRecoilValue(userName); //ユーザーネーム
	const pass = useRecoilValue(passWord); //パスワード
	const [isPublished, setIsPublished] = useRecoilState(isPublishedState); //小説を公開しているか
	const backUpDataObject = useRecoilValue(backUpData); //バックアップ用のオブジェクトデータ
	const textColor = useColorModeValue("gray.700", "gray.200");
	const boxColor = useColorModeValue("gray.100", "gray.900");
	const [isLoading, setIsLoading] = useState(true);
	const [backUpList, setBackUpList] = useState<{ id: string; created_at: string }[]>(); //画面に表示する用のリスト

	//ユーザーネームやパスワードの入力に変更があるたびデータをフェッチする
	useEffect(() => {
		fetchData();
	}, [name, pass]);

	//削除関数
	const onClickDelete = async (id: string) => {
		setIsLoading(true);
		await supabase.from("backup").delete().eq("id", id);
		fetchData();
		setIsLoading(false);
	};

	//データ復元関数
	const onClickReconstruction = async (id: string) => {
		setIsLoading(true);
		const { data, error } = await supabase.from("backup").select("*").eq("id", id);
		if (error) {
			alert(error.message);
		} else {
			//復元対象のデータ取得がエラーじゃなければ取ってきたデータを現在の状態にsetして上書きする
			const fetchData: BackUpDataObject = {
				drafts_data: data[0].drafts_data,
				drafts_json_data: data[0].drafts_json_data,
				is_published: data[0].is_published,
				is_selected: data[0].is_selected,
				last_published: data[0].last_published,
				published_count: data[0].published_count,
				published_draft: data[0].published_draft,
				user_image: data[0].user_image,
				user_introduction: data[0].user_introduction,
				password: data[0].password,
				user_name: data[0].user_name,
				memo_data: data[0].memo_data,
				translate_words: data[0].translate_words
			};
			//json形式で保存しているものはパースしてからsetする
			setDrafts(JSON.parse(fetchData.drafts_data));
			setDraftsJson(JSON.parse(fetchData.drafts_json_data));
			setIsPublished(fetchData.is_published);
			setIsSelected(fetchData.is_selected);
			setLastPublishedTime(fetchData.last_published);
			setPublishedCount(fetchData.published_count);
			setPublishedDraftsData(JSON.parse(fetchData.published_draft));
			setUserImageUrl(JSON.parse(fetchData.user_image));
			setUserIntroduction(fetchData.user_introduction);
			setMemoData(JSON.parse(fetchData.memo_data));
			setTranslateData(JSON.parse(fetchData.translate_words));
		}
		setIsLoading(false);
	};

	//データをフェッチしてユーザー名とパスワードで表示データをフィルターする関数
	const fetchData = async () => {
		setIsLoading(true);

		//ユーザー名一致でデータ郡を取得
		const { data, error } = await supabase
			.from("backup")
			.select("id,created_at,password")
			.eq("user_name", name)
			.order("created_at", { ascending: false });

		//自身が入力済みのパスワードとハッシュ化してあるパスワードを検査
		//マッチするモノだけを表示するリストに追加
		const newList = [];
		for (const item of data) {
			if (pass !== null) {
				const match = await compare(pass, item.password);
				if (match) {
					newList.push({ id: item.id, created_at: format(new Date(item.created_at), "yyyy/MM/dd-HH:mm") });
				}
			}
		}
		setBackUpList(newList);
		setIsLoading(false);
	};

	const onClickBackUpButton = async () => {
		setIsLoading(true);
		try {
			//バックアップする際の保存するパスワードのハッシュ化
			const hashedPassword = pass !== null ? await hash(pass, 10) : pass;
			const { data, error } = await supabase.from("backup").insert([{ ...backUpDataObject, password: hashedPassword }]);
			try {
				//バックアップ処理成功したら、最新データをフェッチ
				fetchData();
			} catch (error) {
				alert(error);
			}
		} catch (error) {
			alert(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Seo
				pageTitle={t.backUp.backupAndRestore}
				pageDescription={t.backUp.novelBackupRestore}
				pagePath="https://novel-editor-ver2.vercel.app/profile"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box p="6" w="100%" h={"90vh"} overflowY={"scroll"}>
				<Flex direction="column" p={2} w={{ base: "350px", md: "600px" }} marginX={"auto"} h={"100%"}>
					<VStack spacing={8}>
						<Box>
							<Text fontSize="lg" fontWeight="bold" color={textColor}>
								{t.backUp.penName}
							</Text>
							<Box bg={boxColor} p={4} borderRadius="md" shadow="md" w={{ base: "300px", md: "550px" }}>
								<Text fontSize="lg" fontWeight="bold" color={textColor} textAlign="center">
									{name === "Ghost Writer" ? t.backUp.setName : name}
								</Text>
							</Box>
							<Box textAlign={"end"}>{isPublished ? undefined : <ChangeUserNameModal />}</Box>
						</Box>
						<Box>
							<Text fontSize="lg" fontWeight="bold" color={textColor}>
								{t.backUp.backupPassword}
							</Text>
							<Box bg={boxColor} p={4} borderRadius="md" shadow="md" w={{ base: "300px", md: "550px" }}>
								<Text fontSize="lg" fontWeight="bold" color={pass ? "teal.500" : "red.500"} textAlign="center">
									{pass ? t.backUp.passwordSet : t.backUp.passwordNotSet}
								</Text>
							</Box>

							<Box textAlign={"end"}>
								{isLoading ? <Spinner /> : pass === null ? <ChangePassWordModal /> : <CheckPassWordModal />}
							</Box>
						</Box>
						<Box w={{ base: "300px", md: "550px" }}>
							<Text fontSize={"11px"} color="red.500">
								{t.backUp.forgotPasswordNote}
								<br />
								{t.backUp.dataRetrieveNote}
								<br />
								{t.backUp.passwordMismatchNote}
							</Text>
						</Box>
						<Button
							minW={"300px"}
							colorScheme="teal"
							isDisabled={name !== "Ghost Writer" || pass || !isLoading ? false : true}
							isLoading={isLoading}
							onClick={fetchData}
						>
							{t.backUp.getData}
						</Button>
						<Button
							minW={"300px"}
							colorScheme="teal"
							isDisabled={name !== "Ghost Writer" || pass || !isLoading ? false : true}
							isLoading={isLoading}
							onClick={onClickBackUpButton}
						>
							{t.backUp.backup}
						</Button>
					</VStack>
					{isLoading ? (
						<Box flex="1" display="flex" alignItems="center" justifyContent="center">
							Loading...
						</Box>
					) : (
						<>
							<Text as={"h2"} fontWeight={"bold"} fontSize={"xl"} textAlign="center" mt={6}>
								{t.backUp.backupList}
							</Text>
							<Divider w={{ base: "300px", md: "550px" }} mx={"auto"} my={2} />
							<Box flex="1">
								<VStack
									borderColor="gray.200"
									borderRadius="md"
									spacing={2}
									divider={<StackDivider borderColor="gray.200" />}
								>
									{backUpList.map((item) => {
										return (
											<HStack
												key={item.id}
												w={{ base: "300px", md: "550px" }}
												bg={boxColor}
												borderRadius="md"
												shadow="md"
												p={2}
											>
												<VStack align="start" spacing={1}>
													<Text fontWeight="bold">{item.created_at}</Text>
													<Text fontSize="sm" color="gray.500">
														{item.id}
													</Text>
												</VStack>
												<Spacer />
												<HStack spacing={2}>
													<AlertDialogBackUpReconstruction
														id={item.id}
														onClick={onClickReconstruction}
														isLoading={isLoading}
													/>
													<AlertDialogBackUpDelete id={item.id} onClick={onClickDelete} isLoading={isLoading} />
												</HStack>
											</HStack>
										);
									})}
								</VStack>
							</Box>
						</>
					)}
				</Flex>
			</Box>
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
