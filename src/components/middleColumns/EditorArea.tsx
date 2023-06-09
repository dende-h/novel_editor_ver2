import {
	Box,
	Flex,
	HStack,
	IconButton,
	Input,
	Spacer,
	Text,
	useClipboard,
	useColorModeValue,
	VStack
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { ImCross, ImPlus } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { isClientState } from "../../globalState/atoms/isClientState";
import { draftObject, editorState } from "../../globalState/selector/editorState";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { SelectMaxLengthSlider } from "./SelectMaxLengthSlider";
import { LexicalEditorArea } from "./LexicalEditorArea";
import { Memo } from "../memoArea/Memo";
import { PreviweModal } from "./PreviweModal";

export const EditorArea = memo(() => {
	const { onChangeTitleArea, onBlurFocusTitleInput, onLengthOver, onAddNovel, selectStateReset } = useDraft(); //Draftオブジェクトの操作hooks
	const { charCount, calcCharCount, isCharCountOverflow } = useCalcCharCount(); //文字数計算のロジック部
	const selectedDraft: draftObject = useRecoilValue(editorState);
	const [bodyMaxLength, setBodyMaxLength] = useState<number>(0);
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const isClient = useRecoilValue(isClientState);
	const { onCopy, setValue, hasCopied } = useClipboard("");

	useEffect(() => {
		calcCharCount(selectedDraft ? selectedDraft.body : "", selectedDraft ? selectedDraft.maxLength : 0);
		setBodyMaxLength(selectedDraft ? selectedDraft.maxLength : 0);
	}, [selectedDraft]);

	useEffect(() => {
		onLengthOver(isCharCountOverflow);
	}, [charCount]);

	return (
		<>
			{isClient ? (
				selectedDraft ? (
					<Box p={{ base: 2, md: 3, lg: 4, xl: 6 }} w={"100%"} position={"relative"} zIndex={1} h={"90vh"}>
						<VStack spacing={4} w={"100%"}>
							<VStack w={"100%"}>
								<Text fontSize={{ base: "xs", md: "sm" }}>{`タイトル : ${selectedDraft.title.length} / 60文字`}</Text>
								<Input
									fontSize={{ base: "md", md: "lg", lg: "xl" }}
									value={selectedDraft.title}
									onChange={onChangeTitleArea}
									border={"none"}
									borderRadius={0}
									width={"80%"}
									height={"auto"}
									placeholder="novel title"
									textAlign={"center"}
									maxLength={60}
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
									transitionProperty="all"
									transitionDuration="1.0s"
									transitionTimingFunction={"ease-out"}
									autoFocus={selectedDraft.title === "" ? true : false}
									onBlur={onBlurFocusTitleInput}
								/>
							</VStack>
							<VStack w={"85%"} spacing={2}>
								<Text textColor={isCharCountOverflow && "red"} fontSize={{ base: "xs", md: "sm" }}>
									現在の文字数 : {charCount} / {bodyMaxLength} 文字
								</Text>
								<HStack>
									<Memo id={selectedDraft.id} />
									{<PreviweModal title={selectedDraft.title} body={selectedDraft.body} isWritingHoraizontally={true} />}
									{
										<PreviweModal
											title={selectedDraft.title}
											body={selectedDraft.body}
											isWritingHoraizontally={false}
										/>
									}
								</HStack>
								<SelectMaxLengthSlider maxLength={bodyMaxLength} />
							</VStack>
							<Box zIndex={1} w={"100%"} h={"100%"} position={"relative"}>
								<LexicalEditorArea setValue={setValue} />
								<Text
									fontFamily={"heading"}
									fontSize={{ base: "11px", md: "12px", lg: "13px" }}
									_hover={{ fontSize: "14px", cursor: "pointer" }}
									fontStyle={"italic"}
									fontWeight={"bold"}
									as={"a"}
									onClick={onCopy}
									color={hasCopied && "green.500"}
									position={"absolute"}
									top={0}
									right={2}
									zIndex={2}
								>
									{hasCopied ? "Copied!" : "Copy"}
								</Text>
							</Box>
						</VStack>

						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"35px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImCross />}
								aria-label="resetSelect"
								onClick={selectStateReset}
								colorScheme="red"
								borderRadius={"full"}
								boxSize={12}
								shadow="lg"
							/>
						</Box>
					</Box>
				) : (
					<Box h={"90vh"}>
						<Box display={{ base: "block", lg: "none" }} position={"fixed"} bottom={"35px"} right={"30px"} zIndex={2}>
							<IconButton
								icon={<ImPlus />}
								aria-label="addNovel"
								onClick={onAddNovel}
								colorScheme="teal"
								borderRadius={"full"}
								boxSize={12}
								shadow="lg"
							/>
						</Box>
					</Box>
				)
			) : (
				<Box h={"100%"}>Loading...</Box>
			)}
		</>
	);
});

EditorArea.displayName = "EditorArea";
