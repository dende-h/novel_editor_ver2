import { NextApiRequest, NextApiResponse } from "next";

const downloadHandler = (req: NextApiRequest, res: NextApiResponse) => {
	const fileName = req.query.title as string;
	const text = req.query.text as string;

	res.setHeader("Content-Disposition", `attachment; filename=${fileName}.txt`);
	res.setHeader("Content-Type", "text/plain");
	res.status(200).send(text);
};

export default downloadHandler;
