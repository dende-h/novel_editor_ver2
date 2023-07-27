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

export const ChangePassWordModal = memo(() => {
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
			setErrorMessage("パスワードは8文字以上必要です");
		} else if (!isAlphanumeric) {
			setErrorMessage("パスワードは半角英数字である必要があります");
		} else if (!containsNumberAndLetter) {
			setErrorMessage("パスワードは英字と数字を少なくとも1つずつ含む必要があります");
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
			alert("パスワードは半角英数字で8文字以上必要です");
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
				パスワードの変更
			</Button>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onCloseModal} size={"3xl"}>
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} borderRadius={"md"} border={"1px"} boxShadow={"lg"}>
					<ModalHeader fontSize={"lg"} fontWeight={"bold"}>
						パスワードを変更する
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2}>
							<HStack>
								<FormControl isInvalid={!isValid && charCount > 0}>
									<Input
										_focus={{ backgroundColor: isValid ? "green.100" : "red.100", boxShadow: "none" }}
										placeholder={"半角英数8文字以上"}
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
							保存
						</Button>
						<Button onClick={onCloseModal} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							キャンセル
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
ChangePassWordModal.displayName = "ChangePassWordModal";
