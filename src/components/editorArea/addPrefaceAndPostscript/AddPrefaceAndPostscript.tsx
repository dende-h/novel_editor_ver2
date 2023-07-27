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
	Textarea,
	VStack
} from "@chakra-ui/react";
import { LegacyRef, memo, useRef, useState } from "react";
import { useDraft } from "../../../hooks/useDraft";
import { useLocale } from "../../../hooks/useLocale";

type Props = {
	defaultPreface: string | null;
	defaultPostscript: string | null;
};

export const AddPrefaceAndPostscript = memo(({ defaultPreface, defaultPostscript }: Props) => {
	const { t } = useLocale();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const bgTextArea = useColorModeValue("gray.100", "gray.500");
	const [prefaceText, setPrefaceText] = useState<string>(defaultPreface ? defaultPreface : "");
	const [postscriptText, setPostscriptText] = useState<string>(defaultPostscript ? defaultPostscript : "");
	const [isLoading, setIsLoading] = useState(false);
	const { setPrefaceAndPostScript } = useDraft();

	const css = {
		overflow: "auto",
		scrollbarWidth: "none",
		webkitScrollbar: {
			width: "0",
			height: "0"
		}
	};

	const onClickAddButton = (prefaceText, postscriptText) => {
		setIsLoading(true);
		setPrefaceAndPostScript(prefaceText, postscriptText);
		setTimeout(() => {
			setIsLoading(false);
		}, 1000);
		setTimeout(() => {
			onClose();
		}, 1500);
	};

	return (
		<>
			<Button ref={btnRef} onClick={onOpen} borderRadius={2} size={"xs"} colorScheme="facebook" ml={4}>
				{t.prefaceAndPostscript.button}
			</Button>

			<Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef} size={"sm"}>
				<DrawerOverlay />
				<DrawerContent sx={css} bgColor={backgroundColor}>
					<DrawerCloseButton />
					<DrawerHeader>{t.prefaceAndPostscript.header}</DrawerHeader>
					<DrawerBody>
						<VStack spacing={6}>
							<Textarea
								bgColor={bgTextArea}
								placeholder={t.prefaceAndPostscript.placeholder}
								value={prefaceText}
								onChange={(e) => {
									setPrefaceText(e.target.value);
								}}
								maxLength={200}
								minH={"300px"}
							/>

							<Textarea
								bgColor={bgTextArea}
								placeholder={t.prefaceAndPostscript.placeholder2}
								value={postscriptText}
								onChange={(e) => {
									setPostscriptText(e.target.value);
								}}
								maxLength={200}
								minH={"300px"}
							/>
						</VStack>
					</DrawerBody>

					<DrawerFooter>
						<Button
							colorScheme={"teal"}
							onClick={() => onClickAddButton(prefaceText, postscriptText)}
							isDisabled={isLoading}
							isLoading={isLoading}
							mr={4}
						>
							{t.prefaceAndPostscript.save}
						</Button>
						<Button colorScheme={"gray"} onClick={onClose} isDisabled={isLoading} isLoading={isLoading}>
							{t.prefaceAndPostscript.cancel}
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
});
AddPrefaceAndPostscript.displayName = "AddPrefaceAndPostscript";
