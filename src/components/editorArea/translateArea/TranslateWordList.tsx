// src/pages/index.tsx
import { useState } from "react";
import { Box, Button, Center, Input, Spinner, VStack } from "@chakra-ui/react";
import { sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { SentenceList } from "./SentenceList";
import { isClientState } from "../../../globalState/atoms/isClientState";

type SentenceData = {
	original: string;
	translated: string;
	memo: string;
};

export const TranslateWordList = () => {
	const isClient = useRecoilValue(isClientState);
	const [sentence, setSentence] = useState("");
	const [sentences, setSentences] = useRecoilState<SentenceData[]>(sentenceListAtoms);

	const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSentence(e.target.value);
	};

	const handleAddSentence = async () => {
		try {
			const translated = await translate(sentence);
			setSentences([...sentences, { original: sentence, translated, memo: "" }]);
			setSentence("");
		} catch (error) {
			console.error(error);
		}
	};

	const handleRemoveSentence = (index: number) => {
		setSentences(sentences.filter((_, i) => i !== index));
	};

	const handlePlaySentence = (index: number) => {
		const sentence = sentences[index].translated; // Get the translated sentence.
		const utterance = new SpeechSynthesisUtterance(sentence);
		utterance.lang = "en-US"; // Set the language to English.
		speechSynthesis.speak(utterance);
	};

	return (
		<Box p={4} bg="gray.50" minH="100vh">
			<VStack spacing={4} maxW="800px" m="auto">
				{isClient ? (
					<>
						<Input
							value={sentence}
							onChange={handleSentenceChange}
							placeholder="翻訳ワードを入力(70文字まで)"
							size="md"
							maxLength={70}
						/>
						<Button colorScheme="teal" onClick={handleAddSentence} isDisabled={sentence.trim().length === 0}>
							ワードを追加
						</Button>
						<SentenceList sentences={sentences} onRemove={handleRemoveSentence} onPlay={handlePlaySentence} />
					</>
				) : (
					<Center>
						<Spinner />
					</Center>
				)}
			</VStack>
		</Box>
	);
};

async function translate(text: string): Promise<string> {
	try {
		console.log("Translating text: ", text); // ここにconsole.logを追加しました
		const res = await fetch("/api/translate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({ text })
		});
		if (!res.ok) {
			throw new Error(res.statusText);
		}
		const data = await res.json();
		console.log("Received response: ", data); // ここにconsole.logを追加しました
		return data.translated;
	} catch (error) {
		console.error("Error during translation: ", error); // ここにconsole.logを追加しました
		return "";
	}
}
