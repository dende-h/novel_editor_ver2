import { Box, Button, HStack, Text } from "@chakra-ui/react";
import { FC, useEffect } from "react";

type CardProps = {
	word: string;
	meaning: string;
	showMeaning: boolean;
	toggleMeaning: () => void; // 追加
	handleCorrect: () => void;
	handleIncorrect: () => void;
};

export const WordCard: FC<CardProps> = ({
	word,
	meaning,
	showMeaning,
	toggleMeaning, // 追加
	handleCorrect,
	handleIncorrect
}) => {
	return (
		<>
			<Box boxShadow={"2xl"} bg={"gray.100"} w={"300px"} h={"150px"} textAlign={"center"} p={6} onClick={toggleMeaning}>
				<Box my={"auto"}>
					<Text>{word}</Text> {/* 更新 */}
					{showMeaning && <Text>{meaning}</Text>}
				</Box>
			</Box>
			<HStack>
				<Button onClick={handleCorrect}>{"I've got it."}</Button>
				<Button onClick={handleIncorrect}>{"Not yet."}</Button>
			</HStack>
		</>
	);
};
