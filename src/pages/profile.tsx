import { Box } from "@chakra-ui/react";
import Head from "next/head";
import TwoColumnTemplate from "../components/templates/TwoColumnTemplate";

export default function Profile() {
	return (
		<>
			<Head>
				<title>ユーザーページ</title>
				<meta
					name="description"
					content="短い小説を繰り返し書いて、小説のトレーニングをすることを目的とした小説ライターアプリです。"
				/>
			</Head>
			<Box>
				<TwoColumnTemplate />
			</Box>
		</>
	);
}
export const getStaticProps = async () => {
	return {
		props: {
			data: "This is static data"
		}
	};
};
