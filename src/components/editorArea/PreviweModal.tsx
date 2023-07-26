import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useColorModeValue,
	useDisclosure
} from "@chakra-ui/react";
import { FC, LegacyRef, memo, useRef } from "react";
import { NovelViewer } from "../draftViewArea/NovelViwer";
type Props = {
	title: string;
	body: string;
	isWritingHoraizontally: boolean;
};

export const PreviweModal: FC<Props> = memo((props: Props) => {
	const { title, body, isWritingHoraizontally } = props;
	const btnRef: LegacyRef<HTMLButtonElement> = useRef();

	const css = { writingMode: "vertical-rl", textOrientation: "upright" };

	const backgroundColor = useColorModeValue("gray.200", "gray.600");
	const textBackgroundColor = useColorModeValue("gray.100", "gray.500");
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<>
			<Button
				ref={btnRef}
				onClick={onOpen}
				borderRadius={2}
				size={"xs"}
				colorScheme="orange"
				ml={4}
				display={isWritingHoraizontally ? "block" : { base: "none", lg: "block" }}
			>
				{isWritingHoraizontally ? "preview" : "vertical"}
			</Button>

			<Modal isOpen={isOpen} onClose={onClose} size="full">
				<ModalOverlay />
				<ModalContent backgroundColor={backgroundColor} position={"relative"}>
					<ModalHeader
						maxW={"300px"}
						textOverflow={"ellipsis"}
						overflow={"hidden"}
						whiteSpace={"nowrap"}
						fontFamily={"Noto Serif JP"}
						marginX={"auto"}
						fontSize={{ base: "14px", md: "16px", lg: "18px" }}
					>
						{title}
					</ModalHeader>
					<ModalCloseButton position={"absolute"} top={1} left={1} />
					<ModalBody h={"100%"}>
						<Box
							bgColor={textBackgroundColor}
							borderRadius={"md"}
							margin={"0"}
							marginLeft={"auto"}
							w={"100%"}
							h={"80vh"}
							p={6}
							overflowX={"scroll"}
							position={"relative"}
							sx={isWritingHoraizontally ? undefined : css}
						>
							<NovelViewer text={body} />
						</Box>
					</ModalBody>
					<ModalFooter>
						<Button colorScheme={"teal"} onClick={onClose}>
							Close
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
});
PreviweModal.displayName = "PreviweModal";
