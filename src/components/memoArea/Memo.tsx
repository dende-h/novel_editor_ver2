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
	useDisclosure
} from "@chakra-ui/react";
import { ImMenu } from "react-icons/im";

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

	useEffect(() => {
		// データの初期化やロード処理をここに追加する

		// 例: 初期データのセット
		const initialItems: Items = {
			item1: { t: "text here", x: 100, y: 100, c: 0 },
			item2: { t: "another text", x: 200, y: 200, c: 1 }
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
			c: 2
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

	if (!items) {
		return (
			<Center>
				<Button onClick={() => add()}>＋ add card</Button>
			</Center>
		);
	}

	return (
		<>
			<IconButton
				icon={<ImMenu />}
				aria-label="openDrawer"
				ref={btnRef}
				onClick={onOpen}
				borderRadius={2}
				boxSize={8}
			/>

			<Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={btnRef} size={"sm"}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>原稿メモ</DrawerHeader>
					<DrawerBody>
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
							backgroundColor="gray"
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
										className="Card"
										onDragStart={(e) =>
											setDragging({
												key,
												x: e.clientX - items[key].x,
												y: e.clientY - items[key].y
											})
										}
										w={"200px"}
										h={"200px"}
									>
										<Button
											className="DeleteBtn"
											onClick={() => remove(key)}
											position="absolute"
											top="-10px"
											right="-10px"
										>
											×
										</Button>
										<Flex direction="column" alignItems="center">
											<Flex>
												{COLORS.map((c, i) => (
													<Circle
														key={c}
														className="ColorCircle"
														onClick={() => {
															update(key, { ...items[key], c: i });
														}}
														bg={c}
														margin="2px"
														cursor="pointer"
													/>
												))}
											</Flex>
											{editMode.key === key ? (
												<Textarea
													className="EditableText"
													onChange={(e) => setInput(e.target.value)}
													defaultValue={items[key].t}
													autoFocus
													onFocus={(e) => e.target.select()}
													onBlur={() => {
														setInput("");
														setEditMode({ key: "", w: 0, h: 0 });
														input && update(key, { ...items[key], t: input });
													}}
												/>
											) : (
												<pre
													className="Text"
													onClick={(e) =>
														setEditMode({
															key,
															w: e.currentTarget.clientWidth,
															h: e.currentTarget.clientHeight
														})
													}
												>
													{items[key].t}
												</pre>
											)}
										</Flex>
									</Box>
								))}
							</Flex>
						</Box>
					</DrawerBody>
					<DrawerFooter>
						<Button onClick={() => add()}>＋ add card</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default Memo;
