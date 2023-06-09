import { NextApiRequest, NextApiResponse } from "next";

const downloadText = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { title, text } = req.query;
		if (typeof title !== "string" || typeof text !== "string") {
			res.status(400).json({ message: "Invalid query parameters" });
			return;
		}

		const encodedTitle = encodeURIComponent(title);
		res.setHeader("Content-Type", "text/plain");
		res.setHeader("Content-Disposition", `attachment; filename="${encodedTitle}.txt"`);
		res.send(text);
	} catch (error) {
		console.error("Error in downloadText:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export default downloadText;
