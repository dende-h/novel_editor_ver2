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
	useColorModeValue,
	Box,
	Text,
	Icon,
	List,
	ListItem,
	HStack
} from "@chakra-ui/react";
import { memo } from "react";
import { CheckIcon } from "@chakra-ui/icons";
import { infoEpubGen } from "../../constant/constant";

export const InfoForEpubGen = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const items = infoEpubGen;

	return (
		<>
			<Box>
				<Text as="a" onClick={() => onOpen()} color="red" _hover={{ cursor: "pointer" }}>
					《必ずお読みください》電子書籍の出力に際しての注意事項
				</Text>

				<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
					<ModalOverlay />
					<ModalContent backgroundColor={backgroundColor}>
						<ModalHeader>電子書籍ダウンロードの注意点</ModalHeader>
						<ModalCloseButton />
						<ModalBody p={6}>
							<Box>
								<List spacing={4}>
									{items.map((item, index) => (
										<ListItem key={index}>
											<HStack>
												<Icon as={CheckIcon} color="red" boxSize={4} />
												<Text
													fontFamily={"Noto Serif JP"}
													fontWeight="semibold"
													textDecoration="underline"
													fontSize={{ base: "12px", md: "14px", lg: "16px" }}
												>
													{item}
												</Text>
											</HStack>
										</ListItem>
									))}
								</List>
							</Box>
						</ModalBody>
						<ModalFooter>
							<Button onClick={onClose} variant={"ghost"} _hover={{ bg: buttonHoverBgColor }} colorScheme={"red"}>
								閉じる
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
});
InfoForEpubGen.displayName = "InfoForEpubGen";
