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
import { ImFire } from "react-icons/im";
import { useDraft } from "../../hooks/useDraft";
import { useLocale } from "../../hooks/useLocale";
import { PrimaryIconButton } from "../templates/PrimaryIconButton";

export const AlertDialogDelete = memo(() => {
	const { t } = useLocale();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = React.useRef();
	const { deleteAction } = useDraft();
	const onClickDeleteButton = () => {
		deleteAction();
		onClose();
	};

	return (
		<>
			<PrimaryIconButton
				aria-label="deleteDraft"
				icon={<ImFire />}
				colorScheme={"orange"}
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
							{t.delete.header}
						</AlertDialogHeader>

						<AlertDialogBody>{t.delete.body}</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								{t.delete.cancel}
							</Button>
							<Button colorScheme="red" onClick={onClickDeleteButton} ml={3} _focus={{ boxShadow: "none" }}>
								{t.delete.delete}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
AlertDialogDelete.displayName = "AlertDialogDelete";
