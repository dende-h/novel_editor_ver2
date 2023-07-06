/* eslint-disable @typescript-eslint/no-var-requires */
import { TextlintKernel } from "@textlint/kernel";
import TextPlugin from "@textlint/textlint-plugin-text";
import GeneralNovelStyle from "textlint-rule-general-novel-style-ja";

const kernel = new TextlintKernel();

const options = {
	filePath: "/path/to/file.txt",
	ext: ".txt",
	plugins: [
		{
			pluginId: "text",
			plugin: TextPlugin
		}
	],
	rules: [
		{
			ruleId: "general-novel-style-ja",
			rule: GeneralNovelStyle
		}
	]
};
export default async function handler(req, res) {
	try {
		const text = req.body.text;
		const result = await kernel.lintText(text, options);
		res.status(200).json({ result });
	} catch (error) {
		console.error(error); // サーバーサイドのコンソールにエラー詳細を表示
		res.status(500).json({ error: error.toString() }); // クライアントにエラー詳細を返す
	}
}
