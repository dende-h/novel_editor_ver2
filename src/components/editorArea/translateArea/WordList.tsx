import { Box, Text } from "@chakra-ui/react";
import { FC } from "react";

type WordListProps = {
	words: { en: string; jp: string }[];
};

export const WordList: FC<WordListProps> = ({ words }) => {
	return (
		<Box>
			{words.map((word, index) => (
				<Text key={index}>
					{word.en}: {word.jp}
				</Text>
			))}
		</Box>
	);
};
