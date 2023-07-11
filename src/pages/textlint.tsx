/* eslint-disable @typescript-eslint/no-var-requires */
import { ChangeEventHandler, useEffect, useState } from "react";
import { Box, Button, Text, Select, FormControl, useColorModeValue, Heading, Flex } from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { NovelLintViewer } from "../components/textlint/NovelLintViewer";
import { useToastTemplate } from "../hooks/useToastTemplate";

const Textlint = () => {
	const draftsData = useRecoilValue<draftObjectArray>(drafts);
	const [text, setText] = useState("検査対象が選択されていません");
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
				: "検査対象が選択されていません"
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
				praimaryErrorToast("サーバーエラー：再試行してみてください");
				setIsLoading(false);
				return;
			}
			if (response.status === 504) {
				const data = await response.json();
				praimaryErrorToast("タイムアウト：再試行してみてください");
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
			praimaryErrorToast("サーバーエラー：再試行してみてください");
			setIsLoading(false);
			setResult([]);
		}
		setIsLoading(false);
	};

	const boxBg = useColorModeValue("gray.50", "gray.800");

	return (
		<Box p={{ base: "4", md: "6" }} h={"90vh"} w={"100%"} overflowY={"scroll"}>
			<Heading as="h1" size="lg" textAlign={"center"} mb={6}>
				自動校正ツール
			</Heading>
			<FormControl>
				<Select
					onChange={onChangeSelect}
					placeholder="タイトルを選択"
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
				isDisabled={text === "検査対象が選択されていません" || isLoading}
				isLoading={isLoading}
			>
				自動校正検査を実行する
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
					<Text>校正指摘合計数：0箇所</Text>
				) : (
					<>
						<Text mb="4" color={"red"}>
							校正指摘合計数：{result.length}箇所
						</Text>
						{result.map((item, index) => {
							let fixText = item.fix ? item.fix.text : "修正提案なし";
							if (fixText === " ") fixText = "半角スペースに修正";
							else if (fixText === "　") fixText = "全角スペースに修正";
							return (
								<Box key={index} border="1px solid" borderColor={"red.500"} p="4" borderRadius="md" mb="2" bg={boxBg}>
									<Text>
										校正箇所：{item.loc.start.line}行{item.loc.start.column}文字目
									</Text>
									<Text>指摘理由：{item.message}</Text>
									<Text>修正提案：{fixText}</Text>
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
						<Text>校正指摘合計数：0箇所</Text>
					) : (
						<>
							<Text mb="4" color={"red"}>
								校正指摘合計数：{result.length}箇所
							</Text>
							{result.map((item, index) => {
								let fixText = item.fix ? item.fix.text : "修正提案なし";
								if (fixText === " ") fixText = "半角スペースに修正";
								else if (fixText === "　") fixText = "全角スペースに修正";
								return (
									<Box key={index} border="1px solid" borderColor={"red.500"} p="4" borderRadius="md" mb="2" bg={boxBg}>
										<Text>
											校正箇所：{item.loc.start.line}行{item.loc.start.column}文字目
										</Text>
										<Text>指摘理由：{item.message}</Text>
										<Text>修正提案：{fixText}</Text>
									</Box>
								);
							})}
						</>
					)}
				</Box>
			</Flex>
		</Box>
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
