import { memo, useRef } from "react";
import { ImPointUp, ImPriceTag } from "react-icons/im";
import { useRecoilState, useRecoilValue } from "recoil";
import { IntroductionNovelBody } from "./IntroductionNovelBody";
import {
	VStack,
	Box,
	Center,
	Heading,
	IconButton,
	Text,
	HStack,
	Icon,
	Button,
	useColorModeValue
} from "@chakra-ui/react";
import { DraftControllButton } from "./DraftControllButton";
import { isSelected } from "../../globalState/atoms/isSelected";
import { numberOfCharacters } from "../../constant/constant";
import { useDraft } from "../../hooks/useDraft";
import { isClientState } from "../../globalState/atoms/isClientState";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { drafts } from "../../globalState/atoms/drafts";
import { useLocale } from "../../hooks/useLocale";

export const LeftColumnArea = memo(() => {
	const { t } = useLocale();
	const [draft, setDraft] = useRecoilState(drafts);
	const isSelect = useRecoilValue(isSelected);
	const { onAddNovel, onEnterKey, onClickOpenDraft } = useDraft();
	const { veryShortNovel, shortShortNovel } = numberOfCharacters;
	const scrollTopRef = useRef<HTMLDivElement>(null);
	const fontColorIsNotSelectedDraft = useColorModeValue("gray.400", "gray.100");
	const bgColorIsSelectedDraftCard = useColorModeValue("gray.300", "gray.500");
	const bgColorIsNotSelectedDraftCard = useColorModeValue("gray.200", "gray.600");
	const isClient = useRecoilValue(isClientState);

	const onDragEnd = (result) => {
		if (!result.destination) {
			return;
		}

		const items = [...draft];
		const [reorderedItem] = items.splice(result.source.index, 1);
		items.splice(result.destination.index, 0, reorderedItem);

		setDraft(items);
	};

	const cssTranstionPropaty = { transitionProperty: "color , shadow , height , backgroundColor " };

	return (
		<>
			{/* クライアントサイドのみでのレンダリング */}
			{isClient ? (
				<DragDropContext onDragEnd={onDragEnd}>
					<Droppable droppableId="draft">
						{(provided) => (
							<VStack
								p={6}
								maxH={{ base: "100%", lg: "100%" }}
								overflowY="scroll"
								position={"relative"}
								zIndex={1}
								h={"100%"}
								ref={provided.innerRef}
								{...provided.droppableProps}
							>
								<IconButton
									boxSize={12}
									position={"fixed"}
									bottom={"30px"}
									left={{ base: "10px", lg: "75px" }}
									shadow={"lg"}
									transitionProperty="all"
									transitionDuration="0.8s"
									transitionTimingFunction={"ease-out"}
									aria-label="scrollTop"
									_focus={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
									_hover={{ shadow: "2xl", cursor: "pointer", opacity: "1.0" }}
									icon={<ImPointUp />}
									colorScheme={"orange"}
									opacity={0.6}
									border={"none"}
									borderRadius={"full"}
									onClick={() => {
										scrollTopRef?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
									}}
									zIndex={2}
								/>
								<Center>
									<VStack ref={scrollTopRef}>
										<Button
											colorScheme={"teal"}
											border={"none"}
											_focus={{ opacity: 0.8, shadow: "2xl" }}
											_hover={{ opacity: 0.8, shadow: "2xl" }}
											w={{ base: "270px", xl: "290px" }}
											onClick={onAddNovel}
										>
											{t.leftColumnArea.addNovel}
										</Button>
										<Text fontWeight={"bold"} fontStyle="italic">
											{draft.length}:drafts
										</Text>
									</VStack>
								</Center>

								{draft.map((item, index) => {
									//配列をmap関数で回してレンダリングするため、クリックで選択した際の状態をboolean配列で管理
									return (
										<Draggable key={item.id} draggableId={item.id} index={index}>
											{(provided) => (
												<Center
													key={index}
													{...provided.draggableProps}
													{...provided.dragHandleProps}
													ref={provided.innerRef}
												>
													<Box
														opacity={!item.isSelected && 0.6}
														sx={
															isSelect
																? item.isSelected
																	? undefined
																	: {
																			_hover: { cursor: "pointer" }
																	  }
																: {
																		_hover: { shadow: "lg", cursor: "pointer" }
																  }
														}
														shadow={item.isSelected ? "lg" : "none"}
														h={item.isSelected ? "200px" : "155px"}
														color={!item.isSelected && fontColorIsNotSelectedDraft}
														marginBottom={item.isSelected ? 8 : 1}
														backgroundColor={
															item.isSelected ? bgColorIsSelectedDraftCard : bgColorIsNotSelectedDraftCard
														}
														// ここから下は固定値、上は受け取った真偽値によって変化
														paddingTop={"30px"}
														w={"300px"}
														marginTop={3}
														borderRadius={5}
														border={item.lengthOver ? "2px" : "none"}
														borderColor="red"
														css={cssTranstionPropaty}
														transitionDuration="0.8s"
														transitionTimingFunction={"ease-out"}
														fontWeight={"normal"}
														textAlign={"center"}
														tabIndex={0}
														onKeyUp={(e) => onEnterKey(e.key, index)}
														onClick={() => onClickOpenDraft(index)}
														position={"relative"}
													>
														<VStack p={2} marginBottom={"100%"} w={"100%"}>
															<Heading
																fontSize={"lg"}
																fontWeight="bold"
																textOverflow={"ellipsis"}
																overflow={"hidden"}
																whiteSpace={"nowrap"}
																w={"60%"}
															>
																{item.title}
															</Heading>
															{item.tag.length === 0 ? (
																<HStack
																	spacing={2}
																	position={"absolute"}
																	textAlign={"left"}
																	top={0}
																	left={2}
																	w={"100%"}
																>
																	<Icon as={ImPriceTag} boxSize={{ base: 3.5, xl: 4 }} color={"teal.400"} />
																	<Text fontSize={{ base: "xs", xl: "md" }}>{t.leftColumnArea.noConfig}</Text>
																</HStack>
															) : (
																<HStack
																	spacing={2}
																	position={"absolute"}
																	textAlign={"left"}
																	top={0}
																	left={2}
																	w={"100%"}
																>
																	<Icon as={ImPriceTag} boxSize={4} color={"teal.400"} />
																	<Text
																		textOverflow={"ellipsis"}
																		overflow={"hidden"}
																		fontSize={{ base: "xs", xl: "md" }}
																		whiteSpace={"nowrap"}
																		w={"85%"}
																	>
																		{[...item.tag].toString()}
																	</Text>
																</HStack>
															)}
															{/* <VStack position={"absolute"} top={5} left={1} spacing={0}> */}
															{/* <Text fontSize={"xs"} fontWeight={"bold"} fontStyle={"italic"}>
																	{item.maxLength <= veryShortNovel
																		? `《 ${t.leftColumnArea.veryShort} 》`
																		: item.maxLength <= shortShortNovel
																		? `《 ${t.leftColumnArea.SS} 》`
																		: `《 ${t.leftColumnArea.Short} 》`}
																</Text> */}
															{item.isPublished ? (
																<Text
																	color={"twitter.600"}
																	fontWeight={"bold"}
																	fontSize={"xs"}
																	position={"absolute"}
																	top={5}
																	left={4}
																>
																	{t.leftColumnArea.published}
																</Text>
															) : (
																<Text
																	color={"red.600"}
																	fontWeight={"bold"}
																	fontSize={"xs"}
																	position={"absolute"}
																	top={5}
																	left={4}
																>
																	{t.leftColumnArea.notPublished}
																</Text>
															)}
															{/* </VStack> */}
															<IntroductionNovelBody bodyText={item.body} lastEditedTime={item.lastEditedTime} />
															<DraftControllButton isAccordionOpen={item.isSelected} />
														</VStack>
													</Box>
												</Center>
											)}
										</Draggable>
									);
								})}
							</VStack>
						)}
					</Droppable>
				</DragDropContext>
			) : undefined}
		</>
	);
});

LeftColumnArea.displayName = "LeftColumnArea";
