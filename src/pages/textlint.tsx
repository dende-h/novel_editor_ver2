/* eslint-disable @typescript-eslint/no-var-requires */
import { ChangeEventHandler, useEffect, useState } from "react";
import { Box, Button, Text, Select, FormControl, useColorModeValue, Heading, Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { NovelLintViewer } from "../components/textlint/NovelLintViewer";
import Seo from "../components/util/Seo";
import { useToastTemplate } from "../hooks/useToastTemplate";
import { useLocale } from "../hooks/useLocale";

const Textlint = () => {
	const { t } = useLocale();
	const draftsData = useRecoilValue<draftObjectArray>(drafts);
	const [text, setText] = useState(t.textlint.noSelection);
	const [result, setResult] = useState([]);
	const [selectValue, setSelectValue] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	const textLintUrl = "https://text-lint-novel.vercel.app/api/lint";
	const { praimaryErrorToast, praimaryInfoToast } = useToastTemplate();

	const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
		setSelectValue(e.target.value);
	};

	useEffect(() => {
		setText(
			draftsData.find((draft) => {
				return draft.id === selectValue;
			})?.body
				? draftsData.find((draft) => {
						return draft.id === selectValue;
				  })?.body
				: t.textlint.noSelection
		);
	}, [selectValue]);

	const handleCheckText = async () => {
		setIsLoading(true);
		try {
			const response = await fetch(textLintUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text })
			});
			if (response.status === 500) {
				const data = await response.json();
				praimaryErrorToast(t.textlint.serverErrorRetry);
				setIsLoading(false);
				return;
			}
			if (response.status === 504) {
				const data = await response.json();
				praimaryErrorToast(t.textlint.timeoutRetry);
				setIsLoading(false);
				return;
			}
			if (response.status === 200) {
				praimaryInfoToast("Success");
			}
			const data = await response.json();
			if (data && data.result && Array.isArray(data.result.messages)) {
				setResult(data.result.messages);
			} else {
				setResult([]);
			}
		} catch (error) {
			praimaryErrorToast(t.textlint.serverErrorRetry);
			setIsLoading(false);
			setResult([]);
		}
		setIsLoading(false);
	};

	const boxBg = useColorModeValue("gray.50", "gray.800");

	return (
		<>
			<Seo
				pageTitle={t.textlint.autoCorrectionTool}
				pageDescription={t.textlint.detectProofreadingPoints}
				pagePath="https://novel-editor-ver2.vercel.app/textlint"
				pageImg={null}
				pageImgWidth="1200"
				pageImgHeight="630"
			/>
			<Box p={{ base: "4", md: "6" }} h={"90vh"} w={"100%"} overflowY={"scroll"}>
				<Heading as="h1" size="lg" textAlign={"center"} mb={6}>
					{t.textlint.autoCorrectionTool}
				</Heading>
				<FormControl>
					<Select
						onChange={onChangeSelect}
						placeholder={t.textlint.selectTitle}
						size="lg"
						variant="filled"
						shadow="md"
						_hover={{ shadow: "lg" }}
						_focus={{ outline: "none", shadow: "lg" }}
					>
						{draftsData.map((draft) => {
							return (
								<option key={draft.id} value={draft.id}>
									{draft.title}
								</option>
							);
						})}
					</Select>
				</FormControl>
				<Button
					onClick={handleCheckText}
					colorScheme="teal"
					variant="solid"
					mt="4"
					w={"100%"}
					isDisabled={text === t.textlint.noSelection || isLoading}
					isLoading={isLoading}
				>
					{t.textlint.executeAutoProofreading}
				</Button>
				<Box
					mt="6"
					p="2"
					bg={boxBg}
					borderRadius="md"
					maxH={"400px"}
					overflowY={"scroll"}
					display={{ base: "block", lg: "none" }}
				>
					<NovelLintViewer text={text} result={result} />
				</Box>
				<Box
					mt="6"
					p="4"
					bg={boxBg}
					borderRadius="md"
					display={{ base: "block", lg: "none" }}
					fontSize={{ base: "14px", md: "16px" }}
				>
					{result.length < 1 ? (
						<Text>{t.textlint.totalProofreadingPointsZero}</Text>
					) : (
						<>
							<Text mb="4" color={"red"}>
								{t.textlint.totalProofreadingPoints}
								{result.length}
								{t.textlint.numberOfPlaces}
							</Text>
							{result.map((item, index) => {
								let fixText = item.fix ? item.fix.text : t.textlint.noCorrectionProposal;
								if (fixText === " ") fixText = t.textlint.correctToHalfSpace;
								else if (fixText === "　") fixText = t.textlint.correctToFullSpace;
								return (
									<Box key={index} border="1px solid" borderColor={"red.500"} p="4" borderRadius="md" mb="2" bg={boxBg}>
										<Text>
											{t.textlint.proofreadingPoints}
											{item.loc.start.line}
											{t.textlint.line}
											{item.loc.start.column}
											{t.textlint.character}
										</Text>
										<Text>
											{t.textlint.indicationReason}
											{item.message}
										</Text>
										<Text>
											{t.textlint.correctionProposal}
											{fixText}
										</Text>
									</Box>
								);
							})}
						</>
					)}
				</Box>
				<Flex h={"100%"} display={{ base: "none", lg: "flex" }} flexDirection={"row"} justifyContent={"space-between"}>
					<Box mt="6" p="2" bg={boxBg} borderRadius="md" maxH={"100%"} overflowY={"scroll"} w={"49%"}>
						<NovelLintViewer text={text} result={result} />
					</Box>
					<Box
						mt="6"
						p="4"
						bg={boxBg}
						borderRadius="md"
						maxH={"100%"}
						overflowY={"scroll"}
						w={"49%"}
						ml={"2%"}
						fontSize={{ base: "14px", md: "16px" }}
					>
						{result.length < 1 ? (
							<Text>{t.textlint.totalProofreadingPointsZero}</Text>
						) : (
							<>
								<Text mb="4" color={"red"}>
									{t.textlint.totalProofreadingPoints}
									{result.length}
									{t.textlint.numberOfPlaces}
								</Text>
								{result.map((item, index) => {
									let fixText = item.fix ? item.fix.text : t.textlint.noCorrectionProposal;
									if (fixText === " ") fixText = t.textlint.correctToHalfSpace;
									else if (fixText === "　") fixText = t.textlint.correctToFullSpace;
									return (
										<Box
											key={index}
											border="1px solid"
											borderColor={"red.500"}
											p="4"
											borderRadius="md"
											mb="2"
											bg={boxBg}
										>
											<Text>
												{t.textlint.proofreadingPoints}
												{item.loc.start.line}
												{t.textlint.line}
												{item.loc.start.column}
												{t.textlint.character}
											</Text>
											<Text>
												{t.textlint.indicationReason}
												{item.message}
											</Text>
											<Text>
												{t.textlint.correctionProposal}
												{fixText}
											</Text>
										</Box>
									);
								})}
							</>
						)}
					</Box>
				</Flex>
			</Box>
		</>
	);
};
export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
export default Textlint;
