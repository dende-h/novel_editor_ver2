import { promises as fs } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { Epub } from "epub-gen";

export default async function handler(req, res) {
	if (req.method !== "POST") {
		return res.status(405).end(); // Method Not Allowed
	}

	const { title, author, publisher, content } = req.body;

	const options = {
		title,
		author,
		publisher,
		content
	};

	const outputPath = join(tmpdir(), `${title.replace(/ /g, "_")}.epub`);

	try {
		await new Epub(options, outputPath).promise;
		const file = await fs.readFile(outputPath);
		res.setHeader("Content-Disposition", "attachment; filename=book.epub");
		res.setHeader("Content-Type", "application/epub+zip");
		res.send(file);
	} catch (error) {
		console.error(error); // Log the error for debugging
		res.status(500).send(`Failed to generate Ebook: ${error.message}`); // Send back more specific error message
	}
}
