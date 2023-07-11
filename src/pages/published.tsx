import Seo from "../components/util/Seo";
import Image from "next/image";
import { VStack, Heading, Box, Center, Table, Tbody, Td, Th, Thead, Tr, Text, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userName } from "../globalState/atoms/userName";
import { supabase } from "../../lib/supabaseClient";
import { draftData } from "../globalState/atoms/publishedDraftsData";
import { useToastTemplate } from "../hooks/useToastTemplate";
import { error } from "console";

type FeatchData = {
	id: string;
	good_mark: number;
	title: string;
	image_url: string;
	last_edit_time: string;
};

type NovelId = {
	novel_id: string;
};

export default function Published() {
	const [isLoading, setIsLoading] = useState(false);
	const name = useRecoilValue(userName);
	const toast = useToastTemplate();
	const [novelData, setNovelData] = useState<FeatchData[]>([]);
	const [novelId, setNovelId] = useState<NovelId[]>([]);

	const fetchPublishedDraftData = async (userName: string) => {
		try {
			const { data, error } = await supabase
				.from("drafts")
				.select("id,title,good_mark,image_url,last_edit_time")
				.eq("user_name", userName);
			setNovelData(data);
			try {
				const { data, error } = await supabase.from("comments").select("novel_id");
				setNovelId(data);
			} catch (error) {
				toast.praimaryErrorToast("データの取得に失敗しました");
				setNovelData([]);
				setNovelId([]);
				return Promise.reject(error);
			}
		} catch (error) {
			toast.praimaryErrorToast("データの取得に失敗しました");
			setNovelData([]);
			setNovelId([]);
			return Promise.reject(error);
		}
	};

	useEffect(() => {
		setIsLoading(true);
		fetchPublishedDraftData(name);
		setIsLoading(false);
	}, []);

	return (
		<>
			<Seo
				pageTitle="投稿済みの小説"
				pageDescription="投稿済みのステータスを閲覧できます"
				pagePath="https://novel-editor-ver2.vercel.app/published"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box p="6" w="100%" h={"90vh"}>
				<VStack spacing="6">
					<Heading as="h1" size="xl">
						投稿済みの小説一覧
					</Heading>
					{isLoading ? (
						<Center p={6}>
							<Spinner />
						</Center>
					) : (
						<Box borderRadius="md" borderWidth="1px" borderColor="gray.300" overflow="hidden" mt={4}>
							<Table variant="simple" size="sm">
								<Thead>
									<Tr>
										<Th textAlign="center" fontWeight="semibold">
											タイトル
										</Th>
										<Th textAlign="center" fontWeight="semibold">
											サムネイル画像
										</Th>
										<Th textAlign="center" fontWeight="semibold">
											いいね数
										</Th>
										<Th textAlign="center" fontWeight="semibold">
											コメント数
										</Th>
									</Tr>
								</Thead>
								<Tbody>
									{novelData.map((draft, index) => {
										return (
											<Tr key={index}>
												<Td textAlign="center">
													<Text fontSize="sm">{draft.title}</Text>
												</Td>

												<Td>
													<Center w={"72px"} h={"72px"} position={"relative"} mx={"auto"}>
														<Image
															alt={"image"}
															src={draft.image_url ? draft.image_url : "/android-chrome-72x72.png"}
															fill
															style={{ objectFit: "contain" }}
														/>
													</Center>
												</Td>

												<Td>
													<Text fontSize="sm">{draft.good_mark} 件</Text>
												</Td>

												<Td textAlign="center">
													<Text fontSize="sm">
														{
															novelId.filter((novelId) => {
																return novelId.novel_id === draft.id;
															}).length
														}
														件
													</Text>
												</Td>
											</Tr>
										);
									})}
									)
								</Tbody>
							</Table>
						</Box>
					)}
				</VStack>
			</Box>
		</>
	);
}
