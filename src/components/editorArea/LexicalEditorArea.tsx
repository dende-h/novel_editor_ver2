/* eslint-disable react/display-name */
import { $getRoot, EditorState } from "lexical";
import { memo, SetStateAction, useEffect } from "react";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, chakra, useColorModeValue } from "@chakra-ui/react";
import { useDraft } from "../../hooks/useDraft";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { Toolbar } from "./Toolbar";
import { draftsJson } from "../../globalState/atoms/draftJson";
import { useInitialJson } from "../../hooks/useInitialJson";

const ChakraContentEditable = chakra(ContentEditable);

function MyCustomAutoFocusPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		editor.focus();
	}, [editor]);

	return null;
}

function onError(error) {
	console.error(error);
}

export const LexicalEditorArea = memo((props: { setValue: (value: SetStateAction<string>) => void }) => {
	const { setValue } = props;
	const text = useRecoilValue(editorState);
	const setJson = useSetRecoilState(draftsJson);
	const { onChangeTextArea } = useDraft();
	const initialJson = useInitialJson();

	const initialConfig = {
		namespace: "MyEditor",
		onError,
		editorState: initialJson
	};

	const onChange = (editorState: EditorState) => {
		editorState.read(() => {
			const root = $getRoot().getTextContent();
			const json = editorState.toJSON();

			setJson((prevItems) => {
				// 配列内に指定したidのオブジェクトがあるかどうかを確認
				const existingItemIndex = prevItems?.findIndex((item) => item.id === text.id);

				if (existingItemIndex > -1) {
					// idが見つかった場合、そのオブジェクトのjsonを更新
					// 配列を直接変更せずに新しい配列を作成
					const newItems = [...prevItems];
					newItems[existingItemIndex] = { ...newItems[existingItemIndex], json: JSON.stringify(json) };
					return newItems;
				} else {
					// idが見つからなかった場合、新しいオブジェクトを追加

					return prevItems
						? [...prevItems, { id: text.id, json: JSON.stringify(json) }]
						: [{ id: text.id, json: JSON.stringify(json) }];
				}
			});
			setValue(root);
			onChangeTextArea(root);
		});
	};

	const boxColor = useColorModeValue("gray.100", "gray.900");

	return (
		<>
			{initialJson !== null ? (
				<LexicalComposer initialConfig={initialConfig}>
					<Toolbar />
					<Box
						backgroundColor={boxColor}
						position={"relative"}
						padding={4}
						height={{ base: "73vh", lg: "73vh" }}
						overflowY={"scroll"}
					>
						<PlainTextPlugin
							contentEditable={
								<ChakraContentEditable
									outline={"none"}
									position={"relative"}
									zIndex={2}
									fontSize={{ base: "12px", md: "14px" }}
									fontFamily={"body"}
									style={{ textDecoration: "underline", textDecorationColor: "rgba(0, 0, 0, 0.2)" }}
									borderLeft={"1px"}
									borderLeftColor={"gray.300"}
								/>
							}
							placeholder={
								<Box color={"blue.500"} position={"absolute"} top={{ base: 3, lg: 4 }} left={5} zIndex={1}>
									Enter the text...
								</Box>
							}
							ErrorBoundary={LexicalErrorBoundary}
						/>
						<OnChangePlugin onChange={onChange} />
						<HistoryPlugin />
						<MyCustomAutoFocusPlugin />
					</Box>
				</LexicalComposer>
			) : (
				<Box>...Loading</Box>
			)}
		</>
	);
});
