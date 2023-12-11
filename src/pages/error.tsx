import Head from "next/head";
import Link from "next/link";
import { Box, Heading, VStack, Text } from "@chakra-ui/react";
import { useLocale } from "../hooks/useLocale";
import { pagesPath } from "../lib/$path";

export default function Error() {
	const { t } = useLocale();
	return (
		<>
			<Head>
				<title>Error</title>
			</Head>

			<Box textAlign="center" marginTop={"50px"} h={"90vh"}>
				<VStack spacing={4}>
					<Heading as="h1" fontSize="3xl" mb="4">
						Error!
					</Heading>
					<Text>{t.errorPage.error}</Text>
					<Text>{t.errorPage.afterShortTime}</Text>
					<Box>
						<Link href={pagesPath.$url()} color="blue.500">
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
