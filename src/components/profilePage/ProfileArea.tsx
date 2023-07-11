import {
	Box,
	Divider,
	Flex,
	Heading,
	Spacer,
	VStack,
	Text,
	Card,
	CardBody,
	HStack,
	useColorModeValue,
	Button,
	Spinner,
	Tooltip,
	Textarea
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { isPublishedState } from "../../globalState/atoms/isPublishedState";
import { lastPublishedTime } from "../../globalState/atoms/lastPublishedTime";
import { userName } from "../../globalState/atoms/userName";
import { profileItem } from "../../globalState/selector/profileItem";
import { publishSettingsDraftsSelector } from "../../globalState/selector/publishSettingsDraftsSelector";
import { useNovelPublished } from "../../hooks/useNovelPublished";
import { useUserIntroductionInput } from "../../hooks/useUserIntroductionInput";
import { ChangeUserNameModal } from "./ChangeUserNameModal";
import { UploadProfileImageModal } from "./UploadProfileImageModal";

export const ProfileArea = memo(() => {
	const isClient = useRecoilValue(isClientState);
	const userPenName = useRecoilValue(userName);
	const profileArray = useRecoilValue(profileItem);
	const backgroundColor = useColorModeValue("gray.100", "gray.600");
	const isPublished = useRecoilValue(isPublishedState);
	const timeStamp = useRecoilValue(lastPublishedTime);
	const { onPublishedNovel, isLoading, stopPublishedNovel, updatePublishedNovel } = useNovelPublished();
	const publishedDrafts = useRecoilValue(publishSettingsDraftsSelector);
	const { onChangeTextArea, textValue } = useUserIntroductionInput();

	return (
		<>
			<Head>
				<title>ユーザープロフィール</title>
				<meta name="description" content="ユーザープロフィール" />
			</Head>
			{isClient ? (
				<Box textAlign={"center"} paddingY={4} h={"90vh"} w={"100%"} overflow={"scroll"}>
					<Divider borderWidth="2px" w={"auto"} />
					<Divider marginTop={1} marginLeft={0.5} w={"auto"} />

					<Heading
						w={"100%"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontSize={{ base: "md", md: "xl", lg: "2xl" }}
					>
						{userPenName}の書斎
					</Heading>

					<Divider marginBottom={1} marginLeft={0.5} w={"auto"} />
					<Divider borderWidth="2px" w={"auto"} />
					{isPublished ? (
						<Text color={"red"} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
							小説公開中ペンネームは変更できません
						</Text>
					) : (
						<Box ml={"60%"}>
							<HStack>
								<ChangeUserNameModal />
								<UploadProfileImageModal />
							</HStack>
						</Box>
					)}
					<VStack padding={3} h={"auto"}>
						{profileArray.map((item, index) => {
							return (
								<Card
									key={index}
									w={{ base: "300px", md: "400px", lg: "500px" }}
									h={{ base: "40px", lg: "auto" }}
									backgroundColor={backgroundColor}
									display="flex"
								>
									<CardBody height="100%" p={{ base: "11px", lg: "auto" }}>
										<Flex alignItems="center">
											{item.heading === "公開済み原稿数:" ? (
												<Link href={"/published"} passHref>
													<Heading
														as={"a"}
														fontSize={{ base: "sm", lg: "lg" }}
														color={"blue"}
														borderBottom="1px"
														borderColor={"blue"}
													>
														{item.heading}
													</Heading>
												</Link>
											) : (
												<Heading as={"h5"} fontSize={{ base: "sm", lg: "lg" }}>
													{item.heading}
												</Heading>
											)}
											<Spacer />
											<HStack>
												<Text fontSize={{ base: "xs", md: "sm", lg: "lg" }}>{item.description}</Text>
												<Text fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
													{index === 0
														? undefined
														: index === 1 || index === 2 || index === 3
														? "Drafts"
														: index === 4
														? "Characters"
														: undefined}
												</Text>
											</HStack>
										</Flex>
									</CardBody>
								</Card>
							);
						})}
						<Card w={{ base: "300px", md: "400px", lg: "500px" }} h={"auto"} backgroundColor={backgroundColor}>
							<CardBody>
								<Heading as={"h5"} fontSize={"sm"}>
									{`自己紹介(${textValue.length}/200文字)`}
								</Heading>

								<Textarea
									value={textValue}
									onChange={onChangeTextArea}
									placeholder={isPublished || "クリックで編集可能です"}
									maxLength={200}
									fontSize={"sm"}
									border="none"
									isDisabled={isPublished}
									overflow="scroll"
									position={"relative"}
								/>
								{isPublished && (
									<Text color={"red.500"} position={"absolute"} top={"50%"} left={"30%"}>
										公開中は編集できません
									</Text>
								)}
							</CardBody>
						</Card>
					</VStack>
					{isLoading ? (
						<Box textAlign={"center"} marginTop={5}>
							<Spinner />
						</Box>
					) : (
						<Box textAlign={"center"} marginTop={5}>
							{isPublished ? (
								<Tooltip label={"公開設定を同期します"} placement="top">
									<Button
										colorScheme={"teal"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={updatePublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										追加更新
									</Button>
								</Tooltip>
							) : undefined}
							{isPublished ? (
								<Tooltip label={"小説の公開を停止できます"} placement="top">
									<Button
										colorScheme={"red"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={stopPublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										{"公開を停止"}
									</Button>
								</Tooltip>
							) : (
								<Button
									colorScheme={"teal"}
									size={{ base: "xs", md: "sm", lg: "md" }}
									fontSize={{ base: "xs", md: "sm", lg: "lg" }}
									onClick={onPublishedNovel}
									isDisabled={publishedDrafts.length === 0 || userPenName === "Ghost Writer"}
									margin={2}
								>
									{"小説を投稿"}
								</Button>
							)}
							<Text>{isPublished ? `最終更新日時：${timeStamp}` : timeStamp}</Text>
							{isPublished ? (
								<>
									<Text color={"green.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										追加更新で新しい変更をWEBサイトに同期します
									</Text>
									<Text color={"red.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										公開停止で全ての公開を停止します
									</Text>
								</>
							) : (
								<>
									<Text color={"red.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										既に同じペンネームでの投稿がある場合は投稿できません
									</Text>
									<Text
										color={publishedDrafts.length === 0 ? "red.500" : "green.500"}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
									>
										{publishedDrafts.length === 0
											? "公開設定済みの小説がありません"
											: "公開設定済みの小説を公開できます"}
									</Text>
								</>
							)}
						</Box>
					)}
				</Box>
			) : undefined}
		</>
	);
});
ProfileArea.displayName = "ProfileArea";
