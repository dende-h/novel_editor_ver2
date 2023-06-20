import React, { useState, useEffect, LegacyRef, useRef } from "react";
import {
	Box,
	Button,
	Textarea,
	Flex,
	Center,
	Circle,
	ModalFooter,
	css,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Text,
	Spacer,
	VStack,
	HStack
} from "@chakra-ui/react";
import { IoMdRemoveCircle, IoIosColorFill } from "react-icons/io";
import { MemoViewer } from "./MemoViwer";
import { Item, Items, memoState } from "../../globalState/atoms/memoState";
import { useRecoilState } from "recoil";

const COLORS = ["#ffe1b4", "#FFF9D5", "#ECFAF5", "#CBF5E4", "#A5DEC8", "#FFF"];

type Props = {
	id: string;
	title: string;
};

export const Memo: React.FC<Props> = (props: Props) => {
	const { id, title } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();
	const [memos, setMemos] = useRecoilState<Items[]>(memoState);
	const [dragging, setDragging] = useState({ key: "", x: 0, y: 0 });
	const [isMemo, setIsMemo] = useState(false);
	const [input, setInput] = useState("");
	const [editMode, setEditMode] = useState({ key: "", w: 0, h: 0 });
	const backgroundColor = useColorModeValue("gray.300", "gray.600");
	const backgroundDropAreaColor = useColorModeValue("gray.100", "gray.700");
	const updateItemsIndex = memos?.findIndex((item) => {
		return item.id === id;
	});

	useEffect(() => {
		if (updateItemsIndex !== -1) {
			setIsMemo(true);
		}
	}, [memos]);

	const add = () => {
		// メモの追加処理をここに追加する

		// 例: ランダムな位置に新しいメモを追加

		setMemos(
			memos.map((memo) => {
				if (memo.id === id) {
					const newItem: Item = {
						t: "新しいメモ",
						x: Math.floor(Math.random() * 300),
						y: Math.floor(Math.random() * 300),
						c: 0
					};
					const newItemKey = `item${Object.keys(memo.memoList).length + 1}`;
					return {
						...memo,
						memoList: {
							...memo.memoList,
							[newItemKey]: newItem
						}
					};
				} else {
					// メモが見つからなかった場合、そのまま返す
					return memo;
				}
			})
		);
	};

	const update = (key: string, item: Item) => {
		// メモの更新処理をここに追加する
		setMemos(
			memos.map((memo) => {
				if (memo.id === id) {
					return {
						...memo,
						memoList: {
							...memo.memoList,
							[key]: item
						}
					};
				} else {
					// メモが見つからなかった場合、そのまま返す
					return memo;
				}
			})
		);
	};

	const remove = (key) => {
		setMemos((prevMemos) =>
			prevMemos.map((memo) => {
				if (memo.id === id) {
					// idが一致したメモを見つける
					const { [key]: removedItem, ...remainingItems } = memo.memoList; // removedItemに削除するitemを取得し、remainingItemsに残りのitemsを格納
					return {
						...memo,
						memoList: remainingItems // 削除後のItemsを返す
					};
				} else {
					// メモが見つからなかった場合、そのまま返す
					return memo;
				}
			})
		);
	};

	const handleDragStart = (e) => {
		const ghostImg = new Image(100, 100);
		ghostImg.src = "/22878546.jpg";
		e.dataTransfer.setDragImage(ghostImg, 0, 0);
	};

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} borderRadius={2} size={"xs"} colorScheme="facebook" ml={4}>
				メモ
			</Button>
			<Modal isOpen={isOpen} onClose={onClose} finalFocusRef={btnRef} size={"full"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} position={"relative"}>
					<ModalHeader
						maxW={"300px"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontFamily={"Noto Serif JP"}
						marginX={"auto"}
						fontSize={{ base: "14px", md: "16px", lg: "18px" }}
					>
						{title}
					</ModalHeader>
					<ModalCloseButton position={"absolute"} top={1} left={1} />
					<ModalBody h={"100%"}>
						<Box
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								if (!dragging || !memos[updateItemsIndex].memoList) return;
								update(dragging.key, {
									...memos[updateItemsIndex].memoList[dragging.key],
									x: e.clientX - dragging.x,
									y: e.clientY - dragging.y
								});
							}}
							bgColor={backgroundDropAreaColor}
							borderRadius={"md"}
							margin={"0"}
							marginLeft={"auto"}
							w={"100%"}
							h={"80vh"}
							p={6}
							overflowX={"scroll"}
							position={"relative"}
						>
							{isMemo &&
								Object.keys(memos[updateItemsIndex].memoList).map((key) => (
									<Box
										key={key}
										position="absolute"
										left={memos[updateItemsIndex].memoList[key].x + "px"}
										top={memos[updateItemsIndex].memoList[key].y + "px"}
										background={COLORS[memos[updateItemsIndex].memoList[key].c]}
										draggable
										onDragStart={(e) => {
											setDragging({
												key,
												x: e.clientX - memos[updateItemsIndex].memoList[key].x,
												y: e.clientY - memos[updateItemsIndex].memoList[key].y
											});
											handleDragStart(e);
										}}
										minW={"160px"}
										minH={"35px"}
										maxW={"250px"}
										maxH={"250px"}
										_hover={{ boxShadow: "lg" }}
									>
										<Flex>
											<Flex>
												{editMode.key === key ? (
													<Textarea
														onChange={(e) => setInput(e.target.value)}
														defaultValue={memos[updateItemsIndex].memoList[key].t}
														autoFocus
														onFocus={(e) => e.target.select()}
														onBlur={() => {
															setInput("");
															setEditMode({ key: "", w: 0, h: 0 });
															input && update(key, { ...memos[updateItemsIndex].memoList[key], t: input });
														}}
														overflow="scroll"
														fontSize={"12px"}
														color="gray.800"
													/>
												) : (
													<Box
														onClick={(e) =>
															setEditMode({
																key,
																w: e.currentTarget.clientWidth,
																h: e.currentTarget.clientHeight
															})
														}
														fontSize={"12px"}
														p={2}
														minW={"160px"}
														minH={"35px"}
														maxW={"250px"}
														maxH={"250px"}
														overflow={"scroll"}
													>
														<MemoViewer text={memos[updateItemsIndex].memoList[key].t} />
													</Box>
												)}
												<Spacer />
												<VStack spacing={"0"}>
													<IconButton
														fontSize={"md"}
														icon={<IoMdRemoveCircle />}
														aria-label={"remove"}
														onClick={() => remove(key)}
														borderRadius={"full"}
														size={"xs"}
														variant="ghost"
														colorScheme={"red"}
													/>
													<IconButton
														fontSize={"md"}
														icon={<IoIosColorFill />}
														onClick={() => {
															update(key, {
																...memos[updateItemsIndex].memoList[key],
																c:
																	memos[updateItemsIndex].memoList[key].c === 5
																		? 0
																		: memos[updateItemsIndex].memoList[key].c + 1
															});
														}}
														aria-label={"color"}
														borderRadius={"full"}
														size={"xs"}
														variant="ghost"
														colorScheme={"twitter"}
													/>
												</VStack>
											</Flex>
										</Flex>
									</Box>
								))}
						</Box>
					</ModalBody>
					<ModalFooter>
						<HStack>
							<Button onClick={() => add()} colorScheme={"teal"}>
								付箋を追加
							</Button>
							<Button onClick={onClose} colorScheme={"gray"}>
								とじる
							</Button>
						</HStack>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default Memo;
