import translate, { Parameters } from "deepl";

const translateText = async (req, res) => {
	if (req.method === "POST") {
		const { text } = req.body;

		const params: Parameters = {
			free_api: true,
			text: text,
			target_lang: "EN",
			auth_key: process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY
		};

		try {
			const result = await translate(params);
			const translatedText = result.data.translations[0].text;
			res.status(200).json({ translated: translatedText });
		} catch (error) {
			console.log(error);
			res.status(500).json({ error: "An error occurred while translating the text." });
		}
	} else {
		res.status(405).json({ error: "This endpoint requires a POST request." });
	}
};

export default translateText;
