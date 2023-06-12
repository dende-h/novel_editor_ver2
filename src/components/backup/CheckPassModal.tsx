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
import { useRecoilValue, useSetRecoilState } from "recoil";
import { passWord } from "../../globalState/atoms/passWord";
import { useCalcCharCount } from "../../hooks/useCalcCharCount";
import { useInput } from "../../hooks/useInput";
import { ChangePassWordModal } from "./ChangePassWordModal";

export const CheckPassWordModal = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const inputfontColor = useColorModeValue("gray.700", "gray.700");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const setPass = useSetRecoilState(passWord);
	const { onChangeInputForm, value, setValue } = useInput();
	const { calcCharCount, charCount } = useCalcCharCount();
	const pass = useRecoilValue(passWord);
	const maxLength = 15;

	const [isValid, setIsValid] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");

	const onChangeInputFormWithValidation = async (e) => {
		onChangeInputForm(e);
		const value: string = e.target.value;
		const isValid = value.includes(pass);

		setIsValid(isValid);

		if (!isValid) {
			setErrorMessage("現在のパスワードと一致しません");
		} else {
			setErrorMessage("");
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
						現在のパスワード確認
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6} paddingTop={"0"}>
						<Center padding={2}>
							<HStack>
								<FormControl isInvalid={!isValid && charCount > 0}>
									<Input
										_focus={{ backgroundColor: isValid ? "green.100" : "red.100", boxShadow: "none" }}
										placeholder={"現在のパスワードを入力してください"}
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
						{isValid && <ChangePassWordModal />}
						<Button onClick={onCloseModal} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }}>
							キャンセル
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
CheckPassWordModal.displayName = "CheckPassWordModal";
