import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure
} from "@chakra-ui/react";
import React, { memo } from "react";
import { ImDownload2 } from "react-icons/im";
import { useRecoilValue } from "recoil";
import { editorState } from "../../globalState/selector/editorState";
import { useLocale } from "../../hooks/useLocale";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const DownloadTXT = memo(() => {
	const { t } = useLocale();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const downloadDraft = useRecoilValue(editorState);

	const downloadLink = () => {
		if (downloadDraft) {
			const blob = new Blob([downloadDraft.body], { type: "text/plain" });

			const link = document.createElement("a");

			link.href = URL.createObjectURL(blob);

			link.download = `${downloadDraft.title}.txt`;

			return link;
		}
	};
	const onClickDownloadButton = () => {
		downloadLink().click();
		onClose();
	};

	return (
		<>
			<PrimaryIconButton
				aria-label="downloadText"
				icon={<ImDownload2 />}
				colorScheme={"telegram"}
				focusOutline={"none"}
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
			/>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{t.downloadTXT.header}
						</AlertDialogHeader>

						<AlertDialogBody>{t.downloadTXT.body}</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								{t.downloadTXT.cancel}
							</Button>
							<Button colorScheme="teal" onClick={onClickDownloadButton} ml={3} _focus={{ boxShadow: "none" }}>
								{t.downloadTXT.download}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
DownloadTXT.displayName = "DownloadTXT";
