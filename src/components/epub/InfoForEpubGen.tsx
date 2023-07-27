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
import { infoEpubGen, infoEpubGenForEn } from "../../constant/constant";
import { useLocale } from "../../hooks/useLocale";

export const InfoForEpubGen = memo(() => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { locale, t } = useLocale();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const buttonHoverBgColor = useColorModeValue("gray.300", "gray.500");
	const items = locale === "ja" ? infoEpubGen : infoEpubGenForEn;

	return (
		<>
			<Box>
				<Text as="a" onClick={() => onOpen()} color="red" _hover={{ cursor: "pointer" }}>
					{t.infoForEpubGen.readFirst}
				</Text>

				<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} size={"3xl"}>
					<ModalOverlay />
					<ModalContent backgroundColor={backgroundColor}>
						<ModalHeader>{t.infoForEpubGen.bookDownloadNotes}</ModalHeader>
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
								{t.infoForEpubGen.close}
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
});
InfoForEpubGen.displayName = "InfoForEpubGen";
