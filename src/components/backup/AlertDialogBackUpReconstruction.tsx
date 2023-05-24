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

export const AlertDialogBackUpReconstruction = memo((props: Props) => {
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
				復元
			</Button>

			<AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							バックアップデータの復元（上書き）
						</AlertDialogHeader>

						<AlertDialogBody>
							<Text>
								復元すると上書きされます。 現在の状態をバックアップしていない場合元に戻すことはできなくなります。
							</Text>
							<Text>選択したバックアップを復元してよろしいですか？</Text>
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose} _focus={{ boxShadow: "none" }}>
								キャンセル
							</Button>
							<Button colorScheme="teal" onClick={onClickReconstructionButton} ml={3} _focus={{ boxShadow: "none" }}>
								復元する
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
});
AlertDialogBackUpReconstruction.displayName = "AlertDialogBackUpReconstruction";
