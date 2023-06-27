import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	useColorModeValue,
	Button,
	DrawerFooter,
	Textarea
} from "@chakra-ui/react";
import { LegacyRef, memo, useRef, useState } from "react";
import { useDraft } from "../../../hooks/useDraft";

export const AddPrefaceAndPostscript = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const [prefaceText, setPrefaceText] = useState<string>("");
	const [postscriptText, setPostscriptText] = useState<string>("");

	const { setPostScript, setPreface } = useDraft();

	const css = {
		overflow: "auto",
		scrollbarWidth: "none",
		webkitScrollbar: {
			width: "0",
			height: "0"
		}
	};

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} borderRadius={2} size={"xs"} colorScheme="whatsapp" ml={4}>
				翻訳
			</Button>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size={"sm"}>
				<DrawerOverlay />
				<DrawerContent sx={css} bgColor={backgroundColor}>
					<DrawerCloseButton />
					<DrawerHeader>前書き/後書きの追加</DrawerHeader>
					<DrawerBody>
						<Textarea
							placeholder="前書きを記入できます(200文字)"
							value={prefaceText}
							onChange={(e) => {
								setPrefaceText(e.target.value);
							}}
						></Textarea>

						<Textarea
							placeholder="後書きを記入できます(200文字)"
							value={postscriptText}
							onChange={(e) => {
								setPostscriptText(e.target.value);
							}}
						></Textarea>
					</DrawerBody>
				</DrawerContent>
				<DrawerFooter>
					<Button colorScheme={"teal"}>追加</Button>
					<Button colorScheme={"gray"} onClick={onClose}>
						キャンセル
					</Button>
				</DrawerFooter>
			</Drawer>
		</>
	);
});
AddPrefaceAndPostscript.displayName = "AddPrefaceAndPostscript";
