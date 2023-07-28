/* eslint-disable @typescript-eslint/explicit-function-return-type */

import React from "react";
import { useLocale } from "../hooks/useLocale";
import { JaDeveloper } from "../components/developer/JaDeveloper";
import { EnDeveloper } from "../components/developer/EnDeveloper";

const Developer: React.FC = () => {
	const { locale } = useLocale();

	return (
		<>
			{locale === "ja" && <JaDeveloper />}
			{locale === "en" && <EnDeveloper />}
		</>
	);
};

export default Developer;

export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
