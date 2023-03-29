import { Box, Center, useColorModeValue } from "@chakra-ui/react";
import { memo } from "react";

export const Footer = memo(() => {
	//ライトテーマとダークテーマの背景色の切替
	const footerBgColor = useColorModeValue("gray.300", "gray.700");

	//固定のfooter
	return (
		<>
			<Box width={"full"} bgColor={footerBgColor} h={"25px"}>
				<Center>©2022 dende-h</Center>
			</Box>
		</>
	);
});

Footer.displayName = "Footer";
