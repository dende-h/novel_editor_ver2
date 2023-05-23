/* eslint-disable react/display-name */
import {
	$createParagraphNode,
	$createTextNode,
	$getRoot,
	$getSelection,
	LexicalEditor,
	EditorState,
	UNDO_COMMAND,
	REDO_COMMAND
} from "lexical";
import { Dispatch, memo, MutableRefObject, SetStateAction, useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, chakra } from "@chakra-ui/react";
import { useDraft } from "../../hooks/useDraft";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { useCallback } from "react";
import { isEdited } from "../../globalState/atoms/isEdited";
import { Toolbar } from "./Toolbar";
import { draftsJson } from "../../globalState/atoms/draftJson";
import { editorJson } from "../../globalState/selector/editorJson";

const theme = {
	// Theme styling goes here
};

const ChakraContentEditable = chakra(ContentEditable);

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
	const [editor] = useLexicalComposerContext();

	useEffect(() => {
		// Focus the editor when the effect fires!
		editor.focus();
	}, [editor]);

	return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
	console.error(error);
}

// const Update = memo(() => {
// 	const { onChangeTextArea } = useDraft();
// 	const text = useRecoilValue(editorState);
// 	console.log(text);
// 	const [editor] = useLexicalComposerContext();
// 	editor.registerTextContentListener((textContent) => {
// 		// The latest text content of the editor!
// 		console.log(textContent);
// 		onChangeTextArea(textContent);
// 	});
// 	useEffect(() => {
// 		editor.update(() => {
// 			// Get the RootNode from the EditorState
// 			const root = $getRoot();

// 			// Create a new ParagraphNode
// 			const paragraphNode = $createParagraphNode();

// 			paragraphNode.append($createTextNode(text.body));

// 			// Finally, append the paragraph to the root
// 			root.append(paragraphNode);
// 		});
// 	}, []);

// 	return null;
// });

export const LexicalEditorArea = memo((props: { setValue: (value: SetStateAction<string>) => void }) => {
	const { setValue } = props;
	const text = useRecoilValue(editorState);
	const setJson = useSetRecoilState(draftsJson);
	const json = useRecoilValue(editorJson);
	const { onChangeTextArea } = useDraft();
	const initialJson = json ? json.json : undefined;

	const initialConfig = {
		namespace: "MyEditor",
		theme,
		onError,
		editorState: initialJson
	};

	const onChange = (editorState: EditorState) => {
		editorState.read(() => {
			const root = $getRoot().getTextContent();
			const json = editorState.toJSON();
			setJson((prevItems) => {
				// 配列内に指定したidのオブジェクトがあるかどうかを確認
				const existingItemIndex = prevItems.findIndex((item) => item.id === text.id);

				if (existingItemIndex > -1) {
					// idが見つかった場合、そのオブジェクトのjsonを更新
					// 配列を直接変更せずに新しい配列を作成します
					const newItems = [...prevItems];
					newItems[existingItemIndex] = { ...newItems[existingItemIndex], json: JSON.stringify(json) };
					return newItems;
				} else {
					// idが見つからなかった場合、新しいオブジェクトを追加
					return [...prevItems, { id: text.id, json: JSON.stringify(json) }];
				}
			});
			setValue(root);
			onChangeTextArea(root);
		});
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<Box
				backgroundColor={"gray.100"}
				position={"relative"}
				padding={{ base: 6, lg: 8 }}
				height={{ base: "77vh", lg: "75vh" }}
			>
				<PlainTextPlugin
					contentEditable={<ChakraContentEditable outline={"none"} position={"relative"} zIndex={2} />}
					placeholder={
						<Box color={"blue.500"} position={"absolute"} top={{ base: 6, lg: 8 }} left={{ base: 6, lg: 8 }} zIndex={1}>
							本文を入力...
						</Box>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<OnChangePlugin onChange={onChange} />
				<HistoryPlugin />
				<MyCustomAutoFocusPlugin />
				<Toolbar />
			</Box>
		</LexicalComposer>
	);
});
