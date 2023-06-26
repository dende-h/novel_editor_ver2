// src/pages/index.tsx
import { useEffect, useState } from "react";
import {
	Box,
	Button,
	Center,
	Input,
	Spinner,
	VStack,
	Heading,
	Text,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel
} from "@chakra-ui/react";
import { sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";
import { useRecoilState } from "recoil";
import { SentenceList } from "./SentenceList";

type SentenceData = {
	original: string;
	translated: string;
};

export default function TranslateDrawer() {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {
		if (typeof window !== undefined) {
			setIsClient(true);
		}
	}, []);
	const [sentence, setSentence] = useState("");
	const [sentences, setSentences] = useRecoilState<SentenceData[]>(sentenceListAtoms);

	const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSentence(e.target.value);
	};

	const handleAddSentence = async () => {
		const translated = await translate(sentence); // translate is your API call function.
		setSentences([...sentences, { original: sentence, translated }]);
		setSentence("");
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
				<Box bg="gray.200" borderRadius="md">
					<Accordion defaultIndex={[]} allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex="1" textAlign="left">
										<Heading as="h2" size="md" color="teal.500">
											About This App
										</Heading>
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel pb={4}>
								<Text as="h3" size="md" fontWeight="semibold">
									Short Diary
								</Text>
								<Text>Condense daily events into single sentences.</Text>
								<Text as="h3" size="md" fontWeight="semibold">
									Translation
								</Text>
								<Text>Let AI translate and save them as original phrases.</Text>
								<Text as="h3" size="md" fontWeight="semibold">
									Practice
								</Text>
								<Text>Listen and practice pronunciation.</Text>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</Box>
				{isClient ? (
					<>
						<Input value={sentence} onChange={handleSentenceChange} placeholder="Enter a sentence" size="md" />
						<Button colorScheme="teal" onClick={handleAddSentence}>
							Add Sentence
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
}

async function translate(text: string): Promise<string> {
	const res = await fetch("/api/translate", {
		method: "POST",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({ text })
	});
	const data = await res.json();
	return data.translated;
}
