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

type Props = {
	id: string;
	onClick: (id: string) => void;
	isLoading: boolean;
};

export const AlertDialogBackUpDelete = memo((props: Props) => {
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
				削除
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							バックアップデータの消去
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text>消去したバックアップは元に戻すことはできません</Text>
							<Text>バックアップを完全に消去しますか？</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								キャンセル
							</Button>
							<Button colorScheme="red" onClick={onClickDeleteButton} ml={3} _focus={{ boxShadow: "none" }}>
								消去する
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
AlertDialogBackUpDelete.displayName = "AlertDialogBackUpDelete";
