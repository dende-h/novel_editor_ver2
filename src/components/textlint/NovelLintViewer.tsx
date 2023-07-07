/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
	text: string;
	result?: Array<any>;
};

export const NovelLintViewer: FC<Props> = ({ text, result }) => {
	const lines = text.split("\n");
	const lineErrorMap = new Map();

	if (result && Array.isArray(result) && result.length > 0) {
		for (const item of result) {
			const { line } = item;
			if (typeof line === "number") {
				lineErrorMap.set(line, true);
			}
		}
	}

	const markedLines = lines.map((line, index) => {
		if (lineErrorMap.has(index + 1)) {
			return `<p style='color: red;'>${line}</p>`;
		} else {
			return line;
		}
	});

	return (
		<Box
			className="ruby-text"
			dangerouslySetInnerHTML={{ __html: markedLines.join("<br>") }}
			fontSize={{ base: "12px", md: "16px", lg: "18px" }}
			fontFamily={"Noto Serif JP"}
			lineHeight={"1.5em"}
			margin="10px"
		/>
	);
};
