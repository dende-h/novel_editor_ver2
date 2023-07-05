import { useState } from "react";
import { Box, Button, Textarea, Stack, Text, useMediaQuery, VStack, HStack } from "@chakra-ui/react";

const Textlint = () => {
	const [text, setText] = useState("");
	const [result, setResult] = useState([]);

	const [isLargerThanMD] = useMediaQuery("(min-width: 48em)"); // This corresponds to 'md' breakpoint

	const handleTextChange = (event) => {
		setText(event.target.value);
	};

	const handleCheckText = async () => {
		try {
			const response = await fetch("/api/lint", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text })
			});

			const data = await response.json();

			if (Array.isArray(data.result.messages)) {
				setResult(data.result.messages);
			} else {
				setResult([]);
			}
		} catch (error) {
			console.error(error); // log the error
			setResult([]);
		}
	};

	return (
		<Box>
			<VStack spacing={4} alignItems="stretch" display={{ base: "block", lg: "none" }}>
				<Textarea value={text} onChange={handleTextChange} />
				<Button onClick={handleCheckText} colorScheme="teal" size="md" mb={4}>
					Check Text
				</Button>
				<Box>
					{Array.isArray(result) &&
						result.map((res, i) => (
							<Text key={i} color="red.500">
								{res.message}
							</Text>
						))}
				</Box>
			</VStack>
			<HStack spacing={4} alignItems="stretch" display={{ base: "none", lg: "block" }}>
				<Textarea value={text} onChange={handleTextChange} />
				<Button onClick={handleCheckText} colorScheme="teal" size="md" mb={4}>
					Check Text
				</Button>
				<Box>
					{Array.isArray(result) &&
						result.map((res, i) => (
							<Text key={i} color="red.500">
								{res.message}
							</Text>
						))}
				</Box>
			</HStack>
		</Box>
	);
};

export default Textlint;
