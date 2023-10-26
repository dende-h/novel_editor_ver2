/* eslint-disable no-useless-escape */

export const useTextToHTML = () => {
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

	function textToHtml(text: string, imageUrl?: string, title?: string) {
		const aText = addLinkTags(text);
		const boutenText = addBoutenTags(aText);
		const rubyText = addRubyTags(boutenText);
		let brText = addBrTags(rubyText);

		if (imageUrl) {
			if (title) {
				brText = `<div><img src="${imageUrl}" alt="coverImage" /></div><h3>${title}</h3><br>` + brText;
			} else {
				brText = `<div><img src="${imageUrl}" alt="coverImage" /></div>` + brText;
			}
		}

		return brText;
	}

	return { textToHtml };
};
