// src/components/SentenceList.tsx
import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import { SentenceItem } from "./SentenceItem";

type SentenceListProps = {
	sentences: { original: string; translated: string; memo: string }[];
	onRemove: (index: number) => void;
	onPlay: (index: number) => void;
};

export const SentenceList: FC<SentenceListProps> = ({ sentences, onRemove, onPlay }) => {
	return (
		<Accordion allowToggle minW={"300px"}>
			{sentences.map((sentence, index) => (
				<SentenceItem
					key={index}
					sentenceId={index}
					sentence={sentence}
					onRemove={() => onRemove(index)}
					onPlay={() => onPlay(index)}
				/>
			))}
		</Accordion>
	);
};
