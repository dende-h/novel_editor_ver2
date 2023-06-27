import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === "POST") {
		const { text } = req.body;
		console.log("Received API request with text: ", text);
		try {
			const baseUrl = "https://api-free.deepl.com/v2/translate";
			const postData = `text=${encodeURIComponent(text)}&target_lang=EN}`;
			const response = await axios.post(baseUrl, postData, {
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					Authorization: `DeepL-Auth-Key ${process.env.NEXT_PUBLIC_DEEPL_AUTH_KEY}`
				}
			});

			const translatedText = response.data.translations[0].text;
			console.log("Received translation from DeepL: ", translatedText);
			res.status(200).json({ translated: translatedText });
		} catch (error) {
			console.error("Error during DeepL request: ", error);
			res.status(500).json({ statusCode: 500, message: error.message, stack: error.stack });
		}
	} else {
		// Handle any other HTTP method
		res.setHeader("Allow", ["POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
