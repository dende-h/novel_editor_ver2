// src/components/SentenceItem.tsx

import {
	AccordionItem,
	AccordionButton,
	AccordionPanel,
	Box,
	Text,
	Input,
	AccordionIcon,
	IconButton
} from "@chakra-ui/react";
import { useState } from "react";
import { FC } from "react";
import { MdRemoveCircle } from "react-icons/md";
import { AiOutlinePlayCircle } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { sentenceMemoAtoms } from "../../../globalState/atoms/sentenceMemoAtoms";

type SentenceItemProps = {
	sentenceId: string;
	sentence: { original: string; translated: string };
	onRemove: () => void;
	onPlay: () => void;
};

export const SentenceItem: FC<SentenceItemProps> = ({ sentenceId, sentence, onRemove, onPlay }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [memo, setMemo] = useRecoilState(sentenceMemoAtoms(sentenceId));

	const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMemo(e.target.value);
	};

	const handleMemoClick = () => {
		setIsEditMode(true);
	};

	const handleMemoBlur = () => {
		setIsEditMode(false);
	};
	return (
		<AccordionItem>
			<h2>
				<AccordionButton>
					<Box flex="1" textAlign="left" fontSize={"12px"} wordBreak={"break-word"}>
						<Text>{sentence.translated}</Text>
					</Box>
					<Box display="flex" justifyContent="center" alignItems="center">
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
						<AccordionIcon />
					</Box>
				</AccordionButton>
			</h2>
			<AccordionPanel pb={4}>
				<Text mb={2} color="gray.600" fontSize={"12px"}>
					{sentence.original}
				</Text>
				{isEditMode ? (
					<Input value={memo} onBlur={handleMemoBlur} onChange={handleMemoChange} autoFocus fontSize={"10px"} />
				) : (
					<Text onClick={handleMemoClick} color="blue.500" _hover={{ cursor: "pointer" }} fontSize={"10px"}>
						{memo || "Click to add a memo"}
					</Text>
				)}
			</AccordionPanel>
		</AccordionItem>
	);
};
