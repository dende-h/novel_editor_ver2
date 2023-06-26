import { HStack, IconButton } from "@chakra-ui/react";
import { FC } from "react";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const Toolbar: FC = () => {
	const [editor] = useLexicalComposerContext();
	return (
		<HStack position={"absolute"} top={0} left={0} zIndex={3}>
			<IconButton
				aria-label="undo"
				icon={<IoIosUndo />}
				onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
				borderRadius={"full"}
				colorScheme={"teal"}
				size={"sm"}
				variant={"ghost"}
			/>
			<IconButton
				aria-label="redo"
				icon={<IoIosRedo />}
				onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
				borderRadius={"full"}
				colorScheme={"teal"}
				size={"sm"}
				variant={"ghost"}
			/>
		</HStack>
	);
};
