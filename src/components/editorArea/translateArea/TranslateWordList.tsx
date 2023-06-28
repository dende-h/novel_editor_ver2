// src/pages/index.tsx
import { useState } from "react";
import { Box, Button, Center, Input, Spinner, VStack } from "@chakra-ui/react";
import { SentenceData, sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { SentenceList } from "./SentenceList";
import { isClientState } from "../../../globalState/atoms/isClientState";
import translate, { Parameters } from "deepl";

type Props = {
	id: string;
};

export const TranslateWordList = (props: Props) => {
	const { id } = props;
	const isClient = useRecoilValue(isClientState);
	const [sentence, setSentence] = useState("");
	const [sentences, setSentences] = useRecoilState<SentenceData[]>(sentenceListAtoms);

	const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSentence(e.target.value);
	};

	const handleAddSentence = async (sentence: string) => {
		const param: Parameters = {
			free_api: true,
			text: sentence,
			target_lang: "EN",
			auth_key: process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY
		};
		try {
			const translated = await translate(param)
				.then((result) => {
					return result.data.translations[0].text;
				})
				.catch((error) => {
					console.log(error);
					return "";
				});
			setSentences([...sentences, { id, original: sentence, translated, memo: "" }]);
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
						<Button
							colorScheme="teal"
							onClick={() => handleAddSentence(sentence)}
							isDisabled={sentence.trim().length === 0}
						>
							ワードを追加
						</Button>
						<SentenceList id={id} sentences={sentences} onRemove={handleRemoveSentence} onPlay={handlePlaySentence} />
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
