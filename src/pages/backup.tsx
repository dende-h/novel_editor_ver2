import { Box, VStack, Text, Flex, useColorModeValue, Button, HStack, Spacer, StackDivider } from "@chakra-ui/react";
import format from "date-fns/format";
import { da } from "date-fns/locale";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
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

export default function BackUP() {
	const name = useRecoilValue(userName);
	const pass = useRecoilValue(passWord);
	const isPublished = useRecoilValue(isPublishedState);
	const backUpDataObject = useRecoilValue(backUpData);
	const textColor = useColorModeValue("gray.700", "gray.200");
	const boxColor = useColorModeValue("gray.100", "gray.900");
	const [isLoading, setIsLoading] = useState(true);
	const [backUpList, setBackUpList] = useState<{ id: string; created_at: string }[]>();

	useEffect(() => {
		fetchData();
	}, [name, pass]);

	const onClickDelete = async (id: string) => {
		setIsLoading(true);
		await supabase.from("backup").delete().eq("id", id);
		fetchData();
		setIsLoading(false);
	};

	const onClickReconstruction = async (id: string) => {
		setIsLoading(true);
		const { data, error } = await supabase.from("backup").select("*").eq("id", id);
		if (error) {
			alert(error.message);
		} else {
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
				user_name: data[0].user_name
			};
			console.log(fetchData);
		}
		setIsLoading(false);
	};

	const fetchData = async () => {
		setIsLoading(true);
		const { data, error } = await supabase
			.from("backup")
			.select("id,created_at")
			.eq("password", pass)
			.eq("user_name", name)
			.order("created_at", { ascending: false });
		const newList = data.map((item) => {
			return { id: item.id, created_at: format(new Date(item.created_at), "yyyy/MM/dd-HH:mm") };
		});
		console.log(newList);
		setBackUpList(newList);
		setIsLoading(false);
	};

	const onClickBackUpButton = async () => {
		setIsLoading(true);
		try {
			const { data, error } = await supabase.from("backup").insert([backUpDataObject]);
			try {
				const { data, error } = await supabase
					.from("backup")
					.select("id,created_at")
					.eq("password", pass)
					.eq("user_name", name)
					.order("created_at", { ascending: false });
				const newList = data.map((item) => {
					return { id: item.id, created_at: format(new Date(item.created_at), "yyyy/MM/dd-HH:mm") };
				});
				setBackUpList(newList);
			} catch (error) {
				console.log(error);
			}
		} catch (error) {
			console.log(error);
		}
		setIsLoading(false);
	};

	return (
		<>
			<Seo
				pageTitle="バックアップと復元"
				pageDescription="小説のバックアップと復元ができます"
				pagePath="https://next-novel-editor.vercel.app/profile"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Flex direction="column" p="6" w="100%" h="90vh">
				<VStack spacing={4}>
					<Box>
						<Box bg={boxColor} p={4} borderRadius="md" shadow="md" minW={"300px"}>
							<Text fontSize="lg" fontWeight="bold" color={textColor}>
								{name === "Ghost Writer" ? "名前を設定してください" : name}
							</Text>
						</Box>
						{isPublished ? undefined : <ChangeUserNameModal />}
					</Box>
					<Box>
						<Box bg={boxColor} p={4} borderRadius="md" shadow="md" minW={"300px"}>
							<Text fontSize="lg" fontWeight="bold" color={textColor}>
								{pass ? pass : "passWordを設定してください"}
							</Text>
						</Box>
						<ChangePassWordModal />
					</Box>
					<Button
						minW={"300px"}
						colorScheme="teal"
						isDisabled={name !== "Ghost Writer" || pass || !isLoading ? false : true}
						isLoading={isLoading}
						onClick={onClickBackUpButton}
					>
						バックアップする
					</Button>
				</VStack>
				{isLoading ? (
					<Box flex="1" display="flex" alignItems="center" justifyContent="center">
						Loading...
					</Box>
				) : (
					<>
						<Text as={"h3"} textAlign="center" mt={6}>
							バックアップリスト
						</Text>
						<Box flex="1" overflowY="auto">
							<VStack
								borderColor="gray.200"
								borderRadius="md"
								p={2}
								spacing={2}
								divider={<StackDivider borderColor="gray.200" />}
							>
								{backUpList.map((item) => {
									return (
										<HStack key={item.id} w="full" bg={boxColor} p={4} borderRadius="md" shadow="md">
											<VStack align="start" spacing={1}>
												<Text fontWeight="bold">{item.created_at}</Text>
												<Text fontSize="sm" color="gray.500">
													{item.id}
												</Text>
											</VStack>
											<Spacer />
											<HStack spacing={2}>
												<Button onClick={() => onClickReconstruction(item.id)} size="sm" colorScheme="teal">
													復元
												</Button>
												<Button onClick={() => onClickDelete(item.id)} size="sm" colorScheme="red">
													削除
												</Button>
											</HStack>
										</HStack>
									);
								})}
							</VStack>
						</Box>
					</>
				)}
			</Flex>
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
