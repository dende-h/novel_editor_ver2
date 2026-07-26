import {
	Box,
	Button,
	Heading,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Stack,
	StackDivider,
	Text,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import { FC, memo, useEffect } from "react";
import { useRecoilState } from "recoil";
import { currentNoticeId, successorEditorUrl } from "../../constant/constant";
import { seenNoticeId } from "../../globalState/atoms/seenNoticeId";
import { useLocale } from "../../hooks/useLocale";

export const ServiceNoticeModal: FC = memo(() => {
	const { t } = useLocale();
	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const accentColor = useColorModeValue("teal.600", "teal.200");
	const attentionBorderColor = useColorModeValue("orange.400", "orange.300");
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [seenId, setSeenId] = useRecoilState(seenNoticeId);

	useEffect(() => {
		if (typeof window !== "undefined" && seenId !== currentNoticeId) {
			onOpen();
		}
	}, []);

	//一度閉じたら同じお知らせは再表示しない
	const onCloseNotice = () => {
		setSeenId(currentNoticeId);
		onClose();
	};

	return (
		<Modal
			isOpen={isOpen}
			onClose={onCloseNotice}
			size="2xl"
			scrollBehavior="inside"
			closeOnOverlayClick={false}
			isCentered
		>
			<ModalOverlay />
			<ModalContent backgroundColor={backgroundColor}>
				<ModalCloseButton />
				<ModalHeader fontSize={{ base: "md", md: "lg" }}>{t.serviceNotice.header}</ModalHeader>
				<ModalBody>
					<Stack divider={<StackDivider />} spacing="4">
						<Text fontSize="sm">{t.serviceNotice.lead}</Text>

						<Box>
							<Heading size="sm" mb={2}>
								{t.serviceNotice.closeTitle}
							</Heading>
							<Text fontSize="sm">{t.serviceNotice.closeText1}</Text>
							<Text fontSize="sm">{t.serviceNotice.closeText2}</Text>
						</Box>

						<Box>
							<Heading size="sm" mb={2} color={accentColor}>
								{t.serviceNotice.editorTitle}
							</Heading>
							<Text fontSize="sm">{t.serviceNotice.editorText1}</Text>
							<Text fontSize="sm">{t.serviceNotice.editorText2}</Text>
							<Button
								as="a"
								href={successorEditorUrl}
								target="_blank"
								rel="noopener noreferrer"
								colorScheme="teal"
								size="sm"
								mt={3}
								rightIcon={<ExternalLinkIcon />}
							>
								{t.serviceNotice.editorLink}
							</Button>
						</Box>

						<Box>
							<Heading size="sm" mb={2}>
								{t.serviceNotice.platformTitle}
							</Heading>
							<Text fontSize="sm">{t.serviceNotice.platformText}</Text>
						</Box>

						<Box borderLeftWidth="4px" borderLeftColor={attentionBorderColor} pl={3}>
							<Heading size="sm" mb={2}>
								{t.serviceNotice.dataTitle}
							</Heading>
							<Text fontSize="sm">{t.serviceNotice.dataText1}</Text>
							<Text fontSize="sm" fontWeight="bold">
								{t.serviceNotice.dataText2}
							</Text>
						</Box>

						<Text fontSize="sm">{t.serviceNotice.closing}</Text>
					</Stack>
				</ModalBody>
				<ModalFooter>
					<Button colorScheme="teal" variant="outline" onClick={onCloseNotice}>
						{t.serviceNotice.closeButton}
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
});

ServiceNoticeModal.displayName = "ServiceNoticeModal";
