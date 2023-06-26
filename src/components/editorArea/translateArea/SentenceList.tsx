// src/components/SentenceList.tsx
import { Accordion } from "@chakra-ui/react";
import { FC } from "react";
import { SentenceItem } from "./SentenceItem";

type SentenceListProps = {
	listId: string;
	sentences: { id: string; original: string; translated: string; memo: string }[];
	onRemove: (index: number) => void;
	onPlay: (index: number) => void;
};

export const SentenceList: FC<SentenceListProps> = ({ listId, sentences, onRemove, onPlay }) => {
	return (
		<Accordion allowToggle minW={"328px"}>
			{sentences
				.filter((item) => {
					return item.id === listId;
				})
				.map((sentence, index) => (
					<SentenceItem
						key={sentence.id}
						sentenceId={index}
						sentence={sentence}
						onRemove={() => onRemove(index)}
						onPlay={() => onPlay(index)}
					/>
				))}
		</Accordion>
	);
};
