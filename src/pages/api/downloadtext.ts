import { NextApiRequest, NextApiResponse } from "next";

const downloadHandler = (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const fileName = decodeURIComponent(req.query.title as string);
		const text = decodeURIComponent(req.query.text as string);

		res.setHeader("Content-Disposition", `attachment; filename=${fileName}.txt`);
		res.setHeader("Content-Type", "text/plain");
		res.status(200).send(text);
	} catch (error) {
		console.error(error);
		res.status(500).send("An error occurred while processing your request");
	}
};

export default downloadHandler;
