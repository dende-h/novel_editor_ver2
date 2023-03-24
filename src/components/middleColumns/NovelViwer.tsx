import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
	text: string;
};

const rubyRegex = /[｜|]([^《｜|]+)《([^》]+)》/g;

function addRubyTags(text: string) {
	return text.replace(rubyRegex, "<ruby>$1<rt>$2</rt></ruby>");
}

function addBrTags(text: string) {
	return text.replace(/\r?\n/g, "<br>");
}

const css = {
	writingMode: "vertical-rl",
	textOrientation: "upright"
};
export const NovelViewer: FC<Props> = ({ text }) => {
	const rubyText = addRubyTags(text);
	const brText = addBrTags(rubyText);

	return (
		<Box
			sx={css}
			className="ruby-text"
			dangerouslySetInnerHTML={{ __html: brText }}
			fontSize={{ base: "14px", md: "16px", lg: "18px" }}
			fontFamily={"Noto Serif JP"}
			lineHeight="1.5em"
			margin="10px"
		/>
	);
};
