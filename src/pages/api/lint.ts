import { TextlintKernel } from "@textlint/kernel";
import TextPlugin from "@textlint/textlint-plugin-text";
import { TextlintKernelPlugin } from "@textlint/kernel";
const kernel = new TextlintKernel();

export default async function handler(req, res) {
	const text = req.body.text;

	const options = {
		ext: ".txt",
		filePath: "<input>",
		plugins: [{ pluginId: "text", plugin: TextPlugin } as TextlintKernelPlugin]
	};

	try {
		const results = await kernel.lintText(text, options);
		res.status(200).json(results);
	} catch (error) {
		console.error(error); // エラーログを出力
		res.status(500).json({ error: error.toString(), stack: error.stack }); // エラーメッセージとスタックトレースを返す
	}
}
