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

//バックアップを消去する際の確認ダイアログ
export const AlertDialogBackUpDelete = memo((props: Props) => {
	const { t } = useLocale();
	const { id, onClick, isLoading } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();

	const onClickDeleteButton = () => {
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
				colorScheme="red"
				isDisabled={isLoading}
				isLoading={isLoading}
			>
				{t.backUpDelete.button}
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{t.backUpDelete.header}
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text>{t.backUpDelete.bodyLine1}</Text>
							<Text>{t.backUpDelete.bodyLine2}</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								{t.backUpDelete.cancel}
							</Button>
							<Button colorScheme="red" onClick={onClickDeleteButton} ml={3} _focus={{ boxShadow: "none" }}>
								{t.backUpDelete.delete}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
AlertDialogBackUpDelete.displayName = "AlertDialogBackUpDelete";
