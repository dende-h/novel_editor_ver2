import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	useColorModeValue,
	Button
} from "@chakra-ui/react";
import { LegacyRef, memo, useRef } from "react";
import { TranslateWordList } from "./TranslateWordList";

type Props = {
	id: string;
};

export const TranslateDrawer = memo(({ id }: Props) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");

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
					<DrawerHeader>Translation List</DrawerHeader>
					<DrawerBody>
						<TranslateWordList id={id} />
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	);
});
TranslateDrawer.displayName = "TranslateDrawer";
