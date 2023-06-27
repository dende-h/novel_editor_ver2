import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// Add CORS headers
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "POST");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
	if (req.method === "POST") {
		const { text } = req.body;
		console.log("Received API request with text: ", text); // ここにconsole.logを追加しました
		try {
			const response = await axios.post(
				"https://api-free.deepl.com/v2/translate",
				`text=${encodeURIComponent(text)}&target_lang=EN`,
				{
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						Authorization: `DeepL-Auth-Key ${process.env.DEEPL_AUTH_KEY}` // Change '[yourAuthKey]' to your actual DeepL API key
					}
				}
			);

			const translatedText = response.data.translations[0].text;
			console.log("Received translation from DeepL: ", translatedText); // ここにconsole.logを追加しました
			res.status(200).json({ translated: translatedText });
		} catch (error) {
			console.error("Error during DeepL request: ", error); // ここにconsole.logを追加しました
			res.status(500).json({ statusCode: 500, message: error.message, stack: error.stack });
		}
	} else {
		// Handle any other HTTP method
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
