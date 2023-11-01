// src/pages/index.tsx
import { useEffect, useState } from "react";
import { Box, Button, Center, Input, Select, Spinner, VStack } from "@chakra-ui/react";
import { SentenceData, sentenceListAtoms } from "../../../globalState/atoms/sentenceListAtoms";
import { useRecoilState, useRecoilValue } from "recoil";
import { SentenceList } from "./SentenceList";
import { isClientState } from "../../../globalState/atoms/isClientState";
import translate, { DeeplLanguages, Parameters } from "deepl";
import { useLocale } from "../../../hooks/useLocale";

type Props = {
	id: string;
};

type SelectLang = {
	value: DeeplLanguages;
	lang: string;
}[];

export const TranslateWordList = (props: Props) => {
	const { t } = useLocale();
	const { id } = props;
	const isClient = useRecoilValue(isClientState);
	const [sentence, setSentence] = useState("");
	const [sentences, setSentences] = useRecoilState<SentenceData[]>(sentenceListAtoms);
	const [selectValue, setSelectValue] = useState<DeeplLanguages | "">("");
	useEffect(() => {
		if (sentences === null) {
			setSentences([]);
		}
	}, []);

	const handleSentenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSentence(e.target.value);
	};

	const handleAddSentence = async (sentence: string, target_lang: DeeplLanguages) => {
		const param: Parameters = {
			free_api: true,
			text: sentence,
			target_lang,
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
		setSentences(sentences?.filter((_, i) => i !== index));
	};

	const handlePlaySentence = (index: number) => {
		const sentence = sentences[index].translated; // Get the translated sentence.
		const utterance = new SpeechSynthesisUtterance(sentence);
		utterance.lang = "en-US"; // Set the language to English.
		speechSynthesis.speak(utterance);
	};

	const targetLangs: SelectLang = [
		{ value: "BG", lang: t.translate.langlist.BG },
		{ value: "CS", lang: t.translate.langlist.CS },
		{ value: "DA", lang: t.translate.langlist.DA },
		{ value: "DE", lang: t.translate.langlist.DE },
		{ value: "EL", lang: t.translate.langlist.EL },
		{ value: "EN-GB", lang: t.translate.langlist.ENGB },
		{ value: "EN-US", lang: t.translate.langlist.ENUS },
		{ value: "ES", lang: t.translate.langlist.ES },
		{ value: "ET", lang: t.translate.langlist.ET },
		{ value: "FI", lang: t.translate.langlist.FI },
		{ value: "FR", lang: t.translate.langlist.FR },
		{ value: "HU", lang: t.translate.langlist.HU },
		{ value: "IT", lang: t.translate.langlist.IT },
		{ value: "JA", lang: t.translate.langlist.JA },
		{ value: "LT", lang: t.translate.langlist.LT },
		{ value: "LV", lang: t.translate.langlist.LV },
		{ value: "NL", lang: t.translate.langlist.NL },
		{ value: "PL", lang: t.translate.langlist.PL },
		{ value: "PT-BR", lang: t.translate.langlist.PTBR },
		{ value: "PT-PT", lang: t.translate.langlist.PTPT },
		{ value: "RO", lang: t.translate.langlist.RO },
		{ value: "RU", lang: t.translate.langlist.RU },
		{ value: "SK", lang: t.translate.langlist.SK },
		{ value: "SL", lang: t.translate.langlist.SL },
		{ value: "SV", lang: t.translate.langlist.SV },
		{ value: "ZH", lang: t.translate.langlist.ZH }
	];

	return (
		<Box p={4} bg="gray.50" minH="100vh">
			<VStack spacing={4} maxW="800px" m="auto">
				{isClient ? (
					<>
						<Select
							onChange={(e) => setSelectValue(e.target.value as DeeplLanguages)}
							placeholder={t.translate.langSelect}
						>
							{targetLangs.map((item, index) => (
								<option key={index} value={item.value}>
									{item.lang}
								</option>
							))}
						</Select>
						<Input
							value={sentence}
							onChange={handleSentenceChange}
							placeholder={t.translate.enterword}
							size="md"
							maxLength={70}
						/>
						<Button
							colorScheme="teal"
							onClick={() => handleAddSentence(sentence, selectValue as DeeplLanguages)}
							isDisabled={sentence.trim().length === 0 || selectValue === ""}
						>
							{t.translate.add}
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
