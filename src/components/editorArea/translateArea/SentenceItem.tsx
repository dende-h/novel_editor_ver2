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
import { SentenceData, sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";

type SentenceItemProps = {
	id: string;
	index: number;
	onRemove: () => void;
	onPlay: () => void;
};

export const SentenceItem: FC<SentenceItemProps> = ({ id, index, onRemove, onPlay }) => {
	const [isEditMode, setIsEditMode] = useState(false);
	const [list, setList] = useRecoilState<SentenceData[]>(sentenceListAtoms);

	const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setList(
			list.map((item, i) => {
				return i === index ? { ...item, memo: e.target.value } : item;
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
		<AccordionItem display={id === list[index].id ? "block" : "none"}>
			<h2>
				<Box display="flex" alignItems="center">
					<AccordionButton>
						<Box flex="1" textAlign="left" fontSize={"12px"} wordBreak={"break-word"}>
							<Text>{list[index].translated}</Text>
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
					{list[index].original}
				</Text>
				{isEditMode ? (
					<Input
						value={list[index].memo}
						onBlur={handleMemoBlur}
						onChange={handleMemoChange}
						autoFocus
						fontSize={"10px"}
					/>
				) : (
					<Text onClick={handleMemoClick} color="blue.500" _hover={{ cursor: "pointer" }} fontSize={"10px"}>
						{list[index].memo.trim().length === 0 ? "Click to add a memo" : list[index].memo}
					</Text>
				)}
			</AccordionPanel>
		</AccordionItem>
	);
};
