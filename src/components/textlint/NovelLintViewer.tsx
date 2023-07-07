/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
	text: string;
	result?: Array<any>;
};

function convertGlobalPosToLocalPos(text: string, globalStartPos: number, globalEndPos: number) {
	const lines = text.split("\n");

	let currentGlobalPos = 0;
	for (let i = 0; i < lines.length; i++) {
		const line = lines[i];

		if (currentGlobalPos + line.length >= globalStartPos) {
			const localStartPos = globalStartPos - currentGlobalPos;
			const localEndPos = Math.min(globalEndPos - currentGlobalPos, line.length);

			return { line: i + 1, start: localStartPos, end: localEndPos };
		}

		currentGlobalPos += line.length + 1; // 1 for newline
	}

	return null;
}

function addErrorHighlight(line: string, ranges: Array<{ start: number; end: number }>) {
	ranges.sort((a, b) => a.start - b.start);

	let highlightedLine = "";
	let currentIndex = 0;

	for (const { start, end } of ranges) {
		highlightedLine +=
			line.substring(currentIndex, start) + "<span style='color: red;'>" + line.substring(start, end) + "</span>";
		currentIndex = end;
	}

	highlightedLine += line.substring(currentIndex);

	return highlightedLine;
}

export const NovelLintViewer: FC<Props> = ({ text, result }) => {
	const lines = text.split("\n");
	const errorRangesPerLine = new Map<number, Array<{ start: number; end: number }>>();

	if (result && Array.isArray(result) && result.length > 0) {
		for (const item of result) {
			const { range } = item;
			if (Array.isArray(range) && range.length === 2) {
				const [globalStartPos, globalEndPos] = range;
				const localPos = convertGlobalPosToLocalPos(text, globalStartPos, globalEndPos);

				if (localPos !== null) {
					const { line, start, end } = localPos;
					if (!errorRangesPerLine.has(line)) {
						errorRangesPerLine.set(line, []);
					}
					errorRangesPerLine.get(line).push({ start, end });
				}
			}
		}
	}

	const markedLines = lines.map((line, index) => {
		if (errorRangesPerLine.has(index + 1)) {
			return `<span style='text-decoration: underline;'><strong style='color: blue;'>${
				index + 1
			}:</strong> ${addErrorHighlight(line, errorRangesPerLine.get(index + 1))}</span>`;
		} else {
			return `<strong style='color: blue;'>${index + 1}:</strong> ${line}`;
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
