import { NextApiRequest, NextApiResponse } from "next";

const downloadHandler = (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const fileName = req.query.title as string;
		const text = req.query.text as string;
		const encodedTitle = encodeURIComponent(fileName);
		res.setHeader("Content-Disposition", `attachment; filename=${encodedTitle}.txt`);
		res.setHeader("Content-Type", "text/plain");
		res.status(200).send(text);
	} catch (error) {
		console.error("Error in downloadText:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export default downloadHandler;
