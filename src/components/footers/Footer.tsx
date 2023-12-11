import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { pagesPath } from "../../lib/$path";

export const Footer = memo(() => {
	//ライトテーマとダークテーマの背景色の切替
	const footerBgColor = useColorModeValue("gray.300", "gray.700");

	//固定のfooter
	return (
		<>
			<Box width={"full"} bgColor={footerBgColor} h={"43px"}>
				<Flex justify="center">
					<Link href={pagesPath.contact.$url()} passHref>
						<Box mr={4}>
							<Heading as="h4" fontSize="sm">
								Contact
							</Heading>
						</Box>
					</Link>
					<Link href={pagesPath.policy.$url()} passHref>
						<Box mr={4}>
							<Heading as="h4" fontSize="sm">
								Policy
							</Heading>
						</Box>
					</Link>
					<Link href={pagesPath.developer.$url()} passHref>
						<Box mr={4}>
							<Heading as="h4" fontSize="sm">
								Developer
							</Heading>
						</Box>
					</Link>
				</Flex>
				<Center>©2023 dende-h ver.2.7.2</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
