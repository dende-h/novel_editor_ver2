import React, { useState, useEffect, LegacyRef, useRef } from "react";
import {
	Box,
	Button,
	Textarea,
	Flex,
	Center,
	Circle,
	DrawerFooter,
	css,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	IconButton,
	useDisclosure,
	useColorModeValue,
	Text,
	Spacer,
	VStack,
	HStack
} from "@chakra-ui/react";
import { IoMdRemoveCircle, IoIosColorFill } from "react-icons/io";
import { NovelViewer } from "../middleColumns/NovelViwer";
import { MemoViewer } from "./MemoViwer";

type Item = { t: string; x: number; y: number; c: number };
type Items = { [key: string]: Item };

const COLORS = ["#ffe1b4", "#FFF9D5", "#ECFAF5", "#CBF5E4", "#A5DEC8", "#FFF"];

export const Memo: React.FC = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();
	const [items, setItems] = useState<Items | null>(null);
	const [dragging, setDragging] = useState({ key: "", x: 0, y: 0 });

	const [input, setInput] = useState("");
	const [editMode, setEditMode] = useState({ key: "", w: 0, h: 0 });
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	useEffect(() => {
		// データの初期化やロード処理をここに追加する

		// 例: 初期データのセット
		const initialItems: Items = {
			item1: { t: "text here", x: 100, y: 100, c: 0 },
			item2: { t: "another text", x: 200, y: 200, c: 0 }
		};
		setItems(initialItems);
	}, []);

	const add = () => {
		// メモの追加処理をここに追加する

		// 例: ランダムな位置に新しいメモを追加
		const newItemKey = `item${Object.keys(items).length + 1}`;
		const newItem: Item = {
			t: "new text",
			x: Math.floor(Math.random() * 500),
			y: Math.floor(Math.random() * 500),
			c: 0
		};
		setItems({ ...items, [newItemKey]: newItem });
	};

	const update = (key: string, item: Item) => {
		// メモの更新処理をここに追加する
		setItems({ ...items, [key]: item });
	};

	const remove = (key: string) => {
		// メモの削除処理をここに追加する
		const updatedItems = { ...items };
		delete updatedItems[key];
		setItems(updatedItems);
	};

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} borderRadius={2} size={"xs"} colorScheme="facebook" ml={4}>
				メモ
			</Button>

			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size={"full"}>
				<DrawerOverlay />
				<DrawerContent backgroundColor={backgroundColor}>
					<DrawerCloseButton />
					<DrawerHeader>原稿メモ</DrawerHeader>
					<DrawerBody w={"100%"} h={"100%"}>
						<Box
							onDragOver={(e) => e.preventDefault()}
							onDrop={(e) => {
								if (!dragging || !items) return;
								update(dragging.key, {
									...items[dragging.key],
									x: e.clientX - dragging.x,
									y: e.clientY - dragging.y
								});
							}}
							w={"100%"}
							h={"100%"}
						>
							<Flex>
								{Object.keys(items).map((key) => (
									<Box
										key={key}
										position="absolute"
										left={items[key].x + "px"}
										top={items[key].y + "px"}
										background={COLORS[items[key].c]}
										draggable
										onDragStart={(e) =>
											setDragging({
												key,
												x: e.clientX - items[key].x,
												y: e.clientY - items[key].y
											})
										}
										minW={"160px"}
										minH={"35px"}
										maxW={"250px"}
										maxH={"250px"}
									>
										<Flex>
											{/* <Flex>
												{COLORS.map((c, i) => (
													<Circle
														key={c}
														onClick={() => {
															update(key, { ...items[key], c: i });
														}}
														bg={c}
														margin="2px"
														cursor="pointer"
													/>
												))}
											</Flex> */}
											{editMode.key === key ? (
												<Textarea
													onChange={(e) => setInput(e.target.value)}
													defaultValue={items[key].t}
													autoFocus
													onFocus={(e) => e.target.select()}
													onBlur={() => {
														setInput("");
														setEditMode({ key: "", w: 0, h: 0 });
														input && update(key, { ...items[key], t: input });
													}}
													overflow="scroll"
													fontSize={"12px"}
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
												>
													<MemoViewer text={items[key].t} />
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
														update(key, { ...items[key], c: items[key].c === 5 ? 0 : items[key].c + 1 });
													}}
													aria-label={"color"}
													borderRadius={"full"}
													size={"xs"}
													variant="ghost"
													colorScheme={"twitter"}
												/>
											</VStack>
										</Flex>
									</Box>
								))}
							</Flex>
						</Box>
					</DrawerBody>
					<DrawerFooter>
						<Button onClick={() => add()} colorScheme={"teal"}>
							付箋を追加
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Memo;
