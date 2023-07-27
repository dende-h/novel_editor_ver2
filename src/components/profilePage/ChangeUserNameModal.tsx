import {
	useDisclosure,
	Button,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Input,
	HStack,
	Center,
	Text,
	useColorModeValue
} from "@chakra-ui/react";
import { memo, useEffect } from "react";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useDraft } from "../../hooks/useDraft";
import { useInput } from "../../hooks/useInput";
import { useLocale } from "../../hooks/useLocale";

export const ChangeUserNameModal = memo(() => {
	const { t } = useLocale();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputFocusBgColor = useColorModeValue("gray.100", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const { onSetUserName } = useDraft();
	const { onChangeInputForm, value, setValue } = useInput();
	const { calcCharCount, charCount } = useCalcCharCount();
	const maxLength = 15;

	const onSave = () => {
		onSetUserName(value);
		setValue("");
		onClose();
	};

	const onCloseModal = () => {
		setValue("");
		onClose();
	};

	useEffect(() => {
		calcCharCount(value);
	}, [value]);

	return (
		<>
			<Button
				colorScheme={"teal"}
				onClick={onOpen}
				size={{ base: "xs", md: "sm", lg: "md" }}
				fontSize={{ base: "xs", md: "sm", lg: "lg" }}
				margin={1}
			>
				{t.changeUserNameModal.chagePH}
			</Button>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} borderRadius={"md"} border={"1px"} boxShadow={"lg"}>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"}>
						{t.changeUserNameModal.chageName}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2}>
							<HStack>
								<Input
									_focus={{ backgroundColor: inputFocusBgColor, boxShadow: "outline" }}
									placeholder={t.changeUserNameModal.newName}
									onChange={onChangeInputForm}
									maxLength={maxLength}
									w={"300px"}
									overflow={"hidden"}
								/>
								<Text>
									{charCount}/{maxLength}
								</Text>
							</HStack>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={charCount === 0}>
							{t.changeUserNameModal.save}
						</Button>
						<Button onClick={onCloseModal} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							{t.changeUserNameModal.cancel}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
ChangeUserNameModal.displayName = "ChangeUserNameModal";
