import Seo from "../components/util/Seo";
import { VStack, Heading, Box, Center, Spinner, SimpleGrid } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { userName } from "../globalState/atoms/userName";
import { supabase } from "../../lib/supabaseClient";
import { useToastTemplate } from "../hooks/useToastTemplate";
import NovelCard from "../components/publishedNovel/NovelCard";

export type FeatchData = {
	id: string;
	good_mark: number;
	title: string;
	image_url: string;
	last_edit_time: string;
};

export type NovelId = {
	novel_id: string;
};

export default function Published() {
	const [isLoading, setIsLoading] = useState(false);
	const name = useRecoilValue(userName);
	const toast = useToastTemplate();
	const [novelData, setNovelData] = useState<FeatchData[]>([]);
	const [novelId, setNovelId] = useState<NovelId[]>([]);

	const fetchPublishedDraftData = async (userName: string) => {
		setIsLoading(true);
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
				setIsLoading(false);
				return Promise.reject(error);
			}
		} catch (error) {
			toast.praimaryErrorToast("データの取得に失敗しました");
			setNovelData([]);
			setNovelId([]);
			setIsLoading(false);
			return Promise.reject(error);
		}
		setIsLoading(false);
	};

	console.log(novelData);

	useEffect(() => {
		fetchPublishedDraftData(name);
	}, [name]);

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
			<Box p="6" w="100%" h={"90vh"} overflowY={"scroll"}>
				<Heading as="h1" size="lg" textAlign={"center"}>
					投稿済みの小説一覧
				</Heading>
				{isLoading ? (
					<Center p={6}>
						<Spinner />
					</Center>
				) : novelData.length < 1 ? (
					<Center p={6}>
						<Heading as="h3" size="md">
							投稿済みの小説はありません
						</Heading>
					</Center>
				) : (
					<SimpleGrid spacing={1} minChildWidth="300px">
						{novelData.map((novel) => {
							return (
								<Center key={novel.id} mt={4}>
									<NovelCard novel={novel} commentNovelId={novelId} />
								</Center>
							);
						})}
					</SimpleGrid>
				)}
			</Box>
		</>
	);
}
