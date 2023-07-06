/* eslint-disable @typescript-eslint/no-var-requires */
import { ChangeEventHandler, useEffect, useState } from "react";
import {
	Box,
	Button,
	Textarea,
	Stack,
	Text,
	useMediaQuery,
	VStack,
	HStack,
	Select,
	FormLabel,
	FormControl,
	useColorModeValue,
	Heading
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { draftObjectArray, drafts } from "../globalState/atoms/drafts";
import { NovelViewer } from "../components/draftViewArea/NovelViwer";
import { TextlintKernel } from "@textlint/kernel";
import assert from "assert";

const Textlint = () => {
	const draftsData = useRecoilValue<draftObjectArray>(drafts);
	const [text, setText] = useState("検査対象が選択されていません");
	const [result, setResult] = useState([]);

	const [isLargerThanMD] = useMediaQuery("(min-width: 48em)"); // This corresponds to 'md' breakpoint
	const [selectValue, setSelectValue] = useState(null);
	const onChangeSelect: ChangeEventHandler<HTMLSelectElement> = (e) => {
		setSelectValue(e.target.value);
	};
	console.log(selectValue);
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
		console.log(text);
	}, [selectValue]);

	const handleCheckText = async () => {
		try {
			const response = await fetch("/api/lint", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text })
			});
			if (response.status === 500) {
				const data = await response.json();
				console.error("Server error:", data.error);
				return;
			}
			if (response.status === 200) {
				console.log("Success");
			}
			const data = await response.json();
			if (data && data.result && Array.isArray(data.result.messages)) {
				setResult(data.result.messages);
			} else {
				setResult([]);
			}
		} catch (error) {
			console.error(error);
			setResult([]);
		}
	};
	const boxBg = useColorModeValue("gray.50", "gray.800");
	const borderBg = useColorModeValue("gray.300", "gray.600");
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
				isDisabled={text === "検査対象が選択されていません"}
			>
				自動校正検査を実行する
			</Button>
			<Box mt="6" p="2" bg={boxBg} borderRadius="md" maxH={"400px"} overflowY={"scroll"}>
				<NovelViewer text={text} />
			</Box>
			<Box mt="6" p="4" bg={boxBg} borderRadius="md" maxH={"400px"} overflowY={"scroll"}>
				{result.length < 1 ? (
					<Text>校正指摘合計数：0箇所</Text>
				) : (
					<>
						<Text mb="4">校正指摘合計数：{result.length}箇所</Text>
						{result.map((item, index) => {
							let fixText = item.fix ? item.fix.text : "修正提案なし";
							if (fixText === " ") fixText = "半角スペースに修正";
							else if (fixText === "　") fixText = "全角スペースに修正";
							return (
								<Box key={index} border="1px solid" borderColor={borderBg} p="4" borderRadius="md" mb="2" bg={boxBg}>
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
		</Box>
	);
};

export default Textlint;
