// pages/api/lint.js

import { createLinter, loadTextlintrc } from "textlint";

export default async function handler(req, res) {
	// Ensure this is a POST request
	if (req.method !== "POST") {
		res.statusCode = 405;
		res.end("Method Not Allowed");
		return;
	}

	try {
		// Get the text from the request body
		const { text } = req.body;

		// Load the TextLint configuration
		const descriptor = await loadTextlintrc();

		// Create a new linter with the loaded configuration
		const linter = createLinter({ descriptor });

		// Lint the text
		const result = await linter.lintText(text, "virtual.md"); // Add a virtual file path

		// Return the linting result
		res.statusCode = 200;
		res.json(result);
	} catch (error) {
		console.error(error);
		res.statusCode = 500;
		res.end("Internal Server Error");
	}
}
