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
	useColorModeValue,
	FormControl,
	FormErrorMessage
} from "@chakra-ui/react";
import { memo, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { passWord } from "../../globalState/atoms/passWord";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useInput } from "../../hooks/useInput";
import { useLocale } from "../../hooks/useLocale";

export const ChangePassWordModal = memo(() => {
	const { t } = useLocale();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputfontColor = useColorModeValue("gray.700", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const setPass = useSetRecoilState(passWord);
	const { onChangeInputForm, value, setValue } = useInput();
	const { calcCharCount, charCount } = useCalcCharCount();
	const maxLength = 15;

	const [isValid, setIsValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onChangeInputFormWithValidation = (e) => {
		onChangeInputForm(e);
		const value = e.target.value;
		const isLongEnough = value.length >= 8;
		const isAlphanumeric = /^[a-zA-Z0-9]+$/.test(value);
		const containsNumberAndLetter = /[0-9]/.test(value) && /[a-zA-Z]/.test(value);

		const isValid = isLongEnough && isAlphanumeric && containsNumberAndLetter;
		setIsValid(isValid);

		if (!isLongEnough) {
			setErrorMessage(t.setPassword.mess1);
		} else if (!isAlphanumeric) {
			setErrorMessage(t.setPassword.mess2);
		} else if (!containsNumberAndLetter) {
			setErrorMessage(t.setPassword.mess3);
		} else {
			setErrorMessage("");
		}
	};
	const onSave = async () => {
		if (isValid) {
			setPass(value === "" ? null : value);
			setValue("");
			onClose();
		} else {
			alert(t.setPassword.alert);
		}
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
				{t.setPassword.button}
			</Button>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} borderRadius={"md"} border={"1px"} boxShadow={"lg"}>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"}>
						{t.setPassword.header}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2}>
							<HStack>
								<FormControl isInvalid={!isValid && charCount > 0}>
									<Input
										_focus={{ backgroundColor: isValid ? "green.100" : "red.100", boxShadow: "none" }}
										placeholder={t.setPassword.placeholder}
										onChange={onChangeInputFormWithValidation}
										maxLength={maxLength}
										w={"300px"}
										overflow={"hidden"}
										borderColor={isValid ? "green.500" : "red.500"}
										color={inputfontColor}
									/>
									<FormErrorMessage>{errorMessage}</FormErrorMessage>
								</FormControl>
								<Text>
									{charCount}/{maxLength}
								</Text>
							</HStack>
						</Center>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme="blue" mr={3} onClick={onSave} isDisabled={!isValid || charCount === 0}>
							{t.setPassword.save}
						</Button>
						<Button onClick={onCloseModal} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							{t.setPassword.cancel}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
ChangePassWordModal.displayName = "ChangePassWordModal";
