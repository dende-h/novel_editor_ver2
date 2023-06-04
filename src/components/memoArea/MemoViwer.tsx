/* eslint-disable no-useless-escape */
import { Box } from "@chakra-ui/react";
import { FC } from "react";

type Props = {
	text: string;
};

const rubyRegex = /[｜|]([^《｜|]+)《([^》]+)》/g;

function addRubyTags(text: string) {
	return text.replace(rubyRegex, "<ruby>$1<rt>$2</rt></ruby>");
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

export const MemoViewer: FC<Props> = ({ text }) => {
	const aText = addLinkTags(text);
	const rubyText = addRubyTags(aText);
	const brText = addBrTags(rubyText);

	return (
		<Box
			className="ruby-text"
			dangerouslySetInnerHTML={{ __html: brText }}
			fontSize={"12px"}
			fontFamily={"Noto Serif JP"}
			lineHeight={"1em"}
			wordBreak={"break-all"}
		/>
	);
};
