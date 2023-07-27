import { Box, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";
import { useRecoilValue } from "recoil";
import { isSelected } from "../../globalState/atoms/isSelected";
import { DrawerLeftArea } from "../draftListArea/DrawerLeftArea";
import { ColorSwitchButton } from "./ColorSwitchButton";
import { HeaderMenu } from "./HeaderMenu";

//ヘッダーコンポーネント
export const Header = memo(() => {
	const headerBgColor = useColorModeValue("gray.300", "gray.700");
	const isSelect = useRecoilValue<boolean>(isSelected); //小説がセレクト状態かどうかのフラグ
	const router = useRouter(); //path判定用にuseRouterを利用
	// const { i18n } = useTranslation();

	// const changeLanguage = (lng) => {
	// 	i18n.changeLanguage(lng);
	// };
	return (
		<>
			<Flex
				as="header"
				w={"auto"}
				h={"40px"}
				p={1.5}
				position={"relative"}
				zIndex={2}
				align="center"
				justify="space-between"
				bgColor={headerBgColor}
			>
				{/* <Box w={"auto"} bgColor={headerBgColor} h={"40px"} p={1.5} position={"relative"} zIndex={2}> */}
				<Box display={{ base: "block", lg: "none" }}>
					{/* 特定のパス以外はドロワーメニューを表示させない */}
					{(router.pathname === "/" || router.pathname === "/profile") && (
						<DrawerLeftArea colorScheme={isSelect ? "orange" : "gray"} />
					)}
				</Box>
				<Box>
					<Link href={"/"} passHref>
						<Heading
							as={"h1"}
							ml={{ lg: "20px" }}
							fontSize={{ base: "xl", lg: "2xl" }}
							fontWeight={"light"}
							_hover={{ opacity: 0.8, cursor: "pointer" }}
							fontFamily={"heading"}
							fontStyle={"oblique"}
							textAlign="left"
						>
							Re:terature
						</Heading>
					</Link>
				</Box>

				<Flex>
					<ColorSwitchButton
						bg={headerBgColor}
						aria-label={"darkTheme"}
						mr={1}
						boxSize={7}
						borderRadius={"full"}
						_hover={{ bg: "gray.500", color: "gray.200" }}
						my={"auto"}
					/>
					{/* <Select
						_hover={{ bg: "gray.500", color: "gray.200" }}
						fontWeight="bold"
						borderRadius="md"
						border={"none"}
						bg={headerBgColor}
						w={{ base: "85px", md: "97px" }}
						mr={1}
						size={{ base: "xs", md: "sm" }}
						onChange={(e) => {
							changeLanguage(e.target.value);
						}}
					>
						<option color={selectValueColor} value={"ja"}>
							lang/Ja
						</option>
						<option color={selectValueColor} value={"en"}>
							lang/En
						</option>
					</Select> */}
					<HeaderMenu />
				</Flex>

				{/* </Box> */}
			</Flex>
		</>
	);
});

Header.displayName = "Header";
