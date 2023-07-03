"use client";

import { Box, Input, Text } from "@chakra-ui/react";
import { useChat } from "ai/react";

export default function Chat() {
	const { messages, input, handleInputChange, handleSubmit } = useChat();

	return (
		<Box maxW="3xl" mx="auto" p={4}>
			<Box>
				{messages.map((m) => (
					<Box key={m.id}>
						<Text display="inline">{m.role === "user" ? "👤" : "🤖"}: </Text>
						<Text color={m.role === "user" ? "blue.500" : "current"} display="inline">
							{m.content}
						</Text>
					</Box>
				))}
			</Box>
			<Box mt={4}>
				<form onSubmit={handleSubmit}>
					<Input
						value={input}
						placeholder="Say something..."
						onChange={handleInputChange}
						bgColor="gray.50"
						color="gray.900"
					/>
				</form>
			</Box>
		</Box>
	);
}
