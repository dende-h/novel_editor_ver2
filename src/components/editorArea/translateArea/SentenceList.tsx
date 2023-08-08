// src/components/SentenceList.tsx
import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import { SentenceData } from "../../../globalState/atoms/sentenceListAtoms";
import { SentenceItem } from "./SentenceItem";

type SentenceListProps = {
	id: string;
	sentences: SentenceData[];
	onRemove: (index: number) => void;
	onPlay: (index: number) => void;
};

export const SentenceList: FC<SentenceListProps> = ({ id, sentences, onRemove, onPlay }) => {
	return (
		<Accordion allowToggle minW={"300px"}>
			{sentences?.map((_, index) => (
				<SentenceItem key={index} index={index} id={id} onRemove={() => onRemove(index)} onPlay={() => onPlay(index)} />
			))}
		</Accordion>
	);
};
