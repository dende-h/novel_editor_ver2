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
import { memo, useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { PlainTextPlugin } from "@lexical/react/LexicalPlainTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Box, chakra } from "@chakra-ui/react";
import { useDraft } from "../../hooks/useDraft";
import { useRecoilValue } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { useCallback } from "react";
import { isEdited } from "../../globalState/atoms/isEdited";
import { Toolbar } from "./Toolbar";

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

export const LexicalEditorArea = memo(() => {
	const text = useRecoilValue(editorState);
	const { onChangeTextArea } = useDraft();
	const initialJson = `{"root":{"children":[{"children":[{"detail":0,"format":0,"mode":"normal","style":"","text":"${text.body}","type":"text","version":1}],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}`;
	const initialConfig = {
		namespace: "MyEditor",
		theme,
		onError,
		editorState: text.body === "" ? undefined : initialJson
	};

	const onChange = (editorState: EditorState) => {
		editorState.read(() => {
			const root = $getRoot().getTextContent();
			onChangeTextArea(root);
		});
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<Box
				backgroundColor={"gray.100"}
				position={"relative"}
				padding={{ base: 4, md: 6, lg: 8 }}
				height={{ base: "77vh", lg: "75vh" }}
			>
				<PlainTextPlugin
					contentEditable={<ChakraContentEditable outline={"none"} />}
					placeholder={
						<Box
							color={"blue.500"}
							position={"absolute"}
							top={{ base: 4, md: 6, lg: 8 }}
							left={{ base: 4, md: 6, lg: 8 }}
						>
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
