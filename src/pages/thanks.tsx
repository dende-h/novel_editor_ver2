import Head from "next/head";
import Link from "next/link";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useLocale } from "../hooks/useLocale";

export default function Thanks() {
	const { t } = useLocale();
	return (
		<>
			<Head>
				<title>Thank you</title>
			</Head>

			<Box textAlign="center" marginTop={"50px"} h={"90vh"}>
				<VStack spacing={4}>
					<Heading as="h1" fontSize="3xl" mb="4">
						Thank you!
					</Heading>
					<Text>{t.thanksPage.thanks}</Text>
					<Text>{t.thanksPage.pleaseWait}</Text>
					<Box>
						<Link href="/" color="blue.500">
							Back to Home
						</Link>
					</Box>
				</VStack>
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
