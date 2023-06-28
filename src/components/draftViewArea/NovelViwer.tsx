/* eslint-disable no-useless-escape */
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
	text: string;
};

const rubyRegex = /[｜|]([^《｜|]+)《([^》]+)》/g;
const boutenRegex = /《《([^》]+)》》/g;

function addRubyTags(text: string) {
	return text.replace(rubyRegex, "<ruby>$1<rt>$2</rt></ruby>");
}

function addBoutenTags(text: string) {
	return text.replace(boutenRegex, (match, p1) => {
		const boutenText = p1
			.split("")
			.map((char) => `｜${char}《・》`)
			.join("");
		return boutenText;
	});
}

function addLinkTags(text: string) {
	const linkRegex = /\[([^\]]+)\]\((http[^\)]+)\)/g;
	const escapedText = text
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#x27;")
		.replace(/\//g, "&#x2F;");
	return escapedText.replace(linkRegex, function (match, p1, p2) {
		const rubyText = addRubyTags(p1);
		return `<a href="${p2}" style="text-decoration: underline; color: blue;">${rubyText}</a>`;
	});
}

function addBrTags(text: string) {
	return text.replace(/\r?\n/g, "<br>");
}

export const NovelViewer: FC<Props> = ({ text }) => {
	const aText = addLinkTags(text);
	const boutenText = addBoutenTags(aText);
	const rubyText = addRubyTags(boutenText);
	const brText = addBrTags(rubyText);

	return (
		<Box
			className="ruby-text"
			dangerouslySetInnerHTML={{ __html: brText }}
			fontSize={{ base: "12px", md: "16px", lg: "18px" }}
			fontFamily={"Noto Serif JP"}
			lineHeight={"1.5em"}
			margin="10px"
		/>
	);
};
