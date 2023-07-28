import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	useDisclosure,
	Text
} from "@chakra-ui/react";
import React, { memo } from "react";
import { useLocale } from "../../hooks/useLocale";

type Props = {
	id: string;
	onClick: (id: string) => void;
	isLoading: boolean;
};

//バックアップを復元する際の確認ダイアログ
export const AlertDialogBackUpReconstruction = memo((props: Props) => {
	const { t } = useLocale();
	const { id, onClick, isLoading } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	const onClickReconstructionButton = () => {
		onClick(id);
		onClose();
	};

	return (
		<>
			<Button
				onClick={(e) => {
					onOpen();
					e.stopPropagation(); //親要素へのバブリングを停止
				}}
				size="sm"
				colorScheme="teal"
				isDisabled={isLoading}
				isLoading={isLoading}
			>
				{t.backUpReconstruction.button}
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{t.backUpReconstruction.header}
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text>{t.backUpReconstruction.bodyLine1}</Text>
							<Text>{t.backUpReconstruction.bodyLine2}</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								{t.backUpReconstruction.cancel}
							</Button>
							<Button colorScheme="teal" onClick={onClickReconstructionButton} ml={3} _focus={{ boxShadow: "none" }}>
								{t.backUpReconstruction.reconstruction}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
AlertDialogBackUpReconstruction.displayName = "AlertDialogBackUpReconstruction";
