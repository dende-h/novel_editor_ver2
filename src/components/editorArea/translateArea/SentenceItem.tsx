// src/components/SentenceItem.tsx

import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Box,
	Text,
	Input,
	AccordionIcon,
	IconButton,
	Spinner
} from "@chakra-ui/react";
import { useState } from "react";
import { FC } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useRecoilState, useRecoilValue } from "recoil";
import { sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";
import { isClientState } from "../../../globalState/atoms/isClientState";

type SentenceItemProps = {
	sentenceId: number;
	sentence: { id: string; original: string; translated: string; memo: string };
	onRemove: () => void;
	onPlay: () => void;
};

type Sentence = { id: string; original: string; translated: string; memo: string };

export const SentenceItem: FC<SentenceItemProps> = ({ sentenceId, sentence, onRemove, onPlay }) => {
	const isClient = useRecoilValue(isClientState);
	const [isEditMode, setIsEditMode] = useState(false);
	const [memo, setMemo] = useRecoilState<Sentence[]>(sentenceListAtoms);

	const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMemo(
			memo.map((item, index) => {
				return index !== sentenceId ? item : { ...item, memo: e.target.value };
			})
		);
	};

	const handleMemoClick = () => {
		setIsEditMode(true);
	};

	const handleMemoBlur = () => {
		setIsEditMode(false);
	};
	return (
		<AccordionItem>
			{isClient ? (
				<>
					<h2>
						<Box display="flex" alignItems="center">
							<AccordionButton>
								<Box flex="1" textAlign="left" fontSize={"12px"} wordBreak={"break-word"}>
									<Text>{sentence.translated}</Text>
								</Box>
								<AccordionIcon />
							</AccordionButton>
							<Box display="flex" alignItems="center">
								<IconButton
									aria-label="remove"
									icon={<MdRemoveCircle />}
									colorScheme="red"
									variant="outline"
									onClick={onRemove}
									mr={1}
									border={"none"}
									borderRadius={"full"}
									fontSize={"20px"}
									size={"xs"}
								/>
								<IconButton
									aria-label="play"
									icon={<AiOutlinePlayCircle />}
									colorScheme="teal"
									variant="outline"
									onClick={onPlay}
									mr={1}
									border={"none"}
									borderRadius={"full"}
									fontSize={"20px"}
									size={"xs"}
								/>
							</Box>
						</Box>
					</h2>
					<AccordionPanel pb={4}>
						<Text mb={2} color="gray.600" fontSize={"12px"}>
							{sentence.original}
						</Text>
						{isEditMode ? (
							<Input
								value={memo[sentenceId].memo}
								onBlur={handleMemoBlur}
								onChange={handleMemoChange}
								autoFocus
								fontSize={"10px"}
							/>
						) : (
							<Text onClick={handleMemoClick} color="blue.500" _hover={{ cursor: "pointer" }} fontSize={"10px"}>
								{memo[sentenceId].memo.trim().length === 0 ? "Click to add a memo" : memo[sentenceId].memo}
							</Text>
						)}
					</AccordionPanel>
				</>
			) : (
				<Spinner />
			)}
		</AccordionItem>
	);
};
