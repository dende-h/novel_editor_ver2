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
import Link from "next/link";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { isPublishedState } from "../../globalState/atoms/isPublishedState";
import { lastPublishedTime } from "../../globalState/atoms/lastPublishedTime";
import { userName } from "../../globalState/atoms/userName";
import { profileItem } from "../../globalState/selector/profileItem";
import { publishSettingsDraftsSelector } from "../../globalState/selector/publishSettingsDraftsSelector";
import { useLocale } from "../../hooks/useLocale";
import { useNovelPublished } from "../../hooks/useNovelPublished";
import { useUserIntroductionInput } from "../../hooks/useUserIntroductionInput";
import { ChangeUserNameModal } from "./ChangeUserNameModal";
import { UploadProfileImageModal } from "./UploadProfileImageModal";

export const ProfileArea = memo(() => {
	const { t } = useLocale();
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
						{userPenName}
						{t.profileArea.studyRoomSuffix}
					</Heading>
					<Divider marginBottom={1} marginLeft={0.5} w={"auto"} />
					<Divider borderWidth="2px" w={"auto"} />
					{isPublished ? (
						<Text color={"red"} fontSize={{ base: "sm", md: "md", lg: "lg" }}>
							{t.profileArea.cannotChangePenname}
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
											{item.heading === "Published" ? (
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
									{`${t.profileArea.selfIntroduction}(${textValue.length}/${t.profileArea.twoHundredCharacters})`}
								</Heading>

								<Textarea
									value={textValue}
									onChange={onChangeTextArea}
									placeholder={isPublished || t.profileArea.clickToEdit}
									maxLength={200}
									fontSize={"sm"}
									border="none"
									isDisabled={isPublished}
									overflow="scroll"
									position={"relative"}
								/>
								{isPublished && (
									<Text color={"red.500"} position={"absolute"} top={"50%"} left={"30%"}>
										{t.profileArea.cannotEditWhilePublishing}
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
								<Tooltip label={t.profileArea.synchronizePublicSettings} placement="top">
									<Button
										colorScheme={"teal"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={updatePublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										{t.profileArea.updateAddition}
									</Button>
								</Tooltip>
							) : undefined}
							{isPublished ? (
								<Tooltip label={t.profileArea.canStopPublishing} placement="top">
									<Button
										colorScheme={"red"}
										size={{ base: "xs", md: "sm", lg: "md" }}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
										onClick={stopPublishedNovel}
										isDisabled={isLoading}
										margin={2}
									>
										{t.profileArea.stopPublishing}
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
									{t.profileArea.postNovel}
								</Button>
							)}
							<Text>{isPublished ? `${t.profileArea.lastUpdated}${timeStamp}` : timeStamp}</Text>
							{isPublished ? (
								<>
									<Text color={"green.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										{t.profileArea.synchronizeNewChanges}
									</Text>
									<Text color={"red.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										{t.profileArea.stopAllPublishing}
									</Text>
								</>
							) : (
								<>
									<Text color={"red.500"} fontSize={{ base: "xs", md: "sm", lg: "lg" }}>
										{t.profileArea.cannotChangePenname}
									</Text>
									<Text
										color={publishedDrafts.length === 0 ? "red.500" : "green.500"}
										fontSize={{ base: "xs", md: "sm", lg: "lg" }}
									>
										{publishedDrafts.length === 0 ? t.profileArea.noNovelsToPublish : t.profileArea.canPublishNovels}
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
