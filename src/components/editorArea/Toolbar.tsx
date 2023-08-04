import { HStack, IconButton, Tooltip } from "@chakra-ui/react";
import { FC } from "react";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { UNDO_COMMAND, REDO_COMMAND } from "lexical";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";

export const Toolbar: FC = () => {
	const [editor] = useLexicalComposerContext();
	return (
		<HStack position={"absolute"} top={{ base: -6, md: -9 }} spacing={0} left={0} zIndex={3}>
			<Tooltip placement="top" label={"Undo"}>
				<IconButton
					aria-label="undo"
					icon={<IoIosUndo />}
					onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
					borderRadius={"full"}
					colorScheme={"teal"}
					size={"sm"}
					variant={"ghost"}
				/>
			</Tooltip>
			<Tooltip placement="top" label={"Redo"}>
				<IconButton
					aria-label="redo"
					icon={<IoIosRedo />}
					onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
					borderRadius={"full"}
					colorScheme={"teal"}
					size={"sm"}
					variant={"ghost"}
				/>
			</Tooltip>
		</HStack>
	);
};
