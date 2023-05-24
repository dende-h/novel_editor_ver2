/* eslint-disable react/display-name */
import { $getRoot, EditorState } from "lexical";
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

export const LexicalEditor = memo(() => {
	const { onChangeTextArea } = useDraft();
	const text = useRecoilValue(editorState);
	const json = `{"root":{"children":[{"children":[{"detail": 0, "format": 0, "mode": "normal", "style": "", "text": "${text.body}", "type": "text", "version": 1 }],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`;
	const initialConfig = {
		namespace: "MyEditor",
		onError,
		editorState: text.body === "" ? undefined : json
	};

	const onChange = (editorState: EditorState) => {
		editorState.read(() => {
			const root = $getRoot().getTextContent();
			onChangeTextArea(root);
		});
	};

	return (
		<LexicalComposer initialConfig={initialConfig}>
			<Box backgroundColor={"gray.100"} position={"relative"} padding={6}>
				<PlainTextPlugin
					contentEditable={<ChakraContentEditable outline={"none"} />}
					placeholder={
						<Box color={"blue.500"} position={"absolute"} top={0} left={0}>
							Enter some text...
						</Box>
					}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<OnChangePlugin onChange={onChange} />
				<HistoryPlugin />
				<MyCustomAutoFocusPlugin />
			</Box>
		</LexicalComposer>
	);
});
