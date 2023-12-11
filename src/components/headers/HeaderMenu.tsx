import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, Button, MenuList, MenuItem, useColorModeValue } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { useLocale } from "../../hooks/useLocale";
import { pagesPath } from "../../lib/$path";

export const HeaderMenu = memo(() => {
	const { t } = useLocale();
	const headerMenuHoverColor = useColorModeValue("gray.500", "gray.700");
	const headerBgColor = useColorModeValue("gray.300", "gray.700");

	return (
		<Menu>
			{({ isOpen }) => (
				<>
					<MenuButton
						as={Button}
						rightIcon={isOpen ? <ChevronUpIcon boxSize={4} /> : <ChevronDownIcon boxSize={4} />}
						bg={headerBgColor}
						borderRadius="md"
						_hover={{ bg: "gray.500", color: "white" }}
						_active={{ bg: "gray.500", color: "white" }}
						size={{ base: "xs", md: "sm" }}
						my={"auto"}
					>
						{isOpen ? "Close" : "Menu"}
					</MenuButton>
					<MenuList
						bgColor={"gray.800"}
						color="white"
						borderRadius="md"
						boxShadow="md"
						p={2}
						_focus={{ outline: "none" }}
					>
						<Link href={pagesPath.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.manuscriptList}
							</MenuItem>
						</Link>
						<Link href={pagesPath.profile.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.profileAndAchievements}
							</MenuItem>
						</Link>
						<Link href={pagesPath.published.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.verticalReading}
							</MenuItem>
						</Link>
						<Link href={"https://next-novel-site.vercel.app/"} passHref target="_blank" rel="noopener noreferrer">
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.litBite}
							</MenuItem>
						</Link>
						<Link
							href={"https://notion-blog-nextjs-nine.vercel.app/"}
							passHref
							target="_blank"
							rel="noopener noreferrer"
						>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.creativeSupportBlog}
							</MenuItem>
						</Link>

						<Link href={pagesPath.contact.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.contactForm}
							</MenuItem>
						</Link>
						<Link href={pagesPath.backup.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.backupAndRestore}
							</MenuItem>
						</Link>
						<Link
							href={
								"https://perpetual-hemisphere-7a3.notion.site/How-to-use-Write-Novel-Now-a746fd05c74a42cda7bd15fb2886b580"
							}
							passHref
							target="_blank"
							rel="noopener noreferrer"
						>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.howToUse}
							</MenuItem>
						</Link>
						<Link href={pagesPath.epubgen.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.exportToEPUB}
							</MenuItem>
						</Link>
						<Link href={pagesPath.textlint.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.autoCorrectionTool}
							</MenuItem>
						</Link>
						<Link href={pagesPath.developer.$url()} passHref>
							<MenuItem bgColor={"gray.800"} _hover={{ bgColor: headerMenuHoverColor }}>
								{t.headerMenu.developerIntro}
							</MenuItem>
						</Link>
					</MenuList>
				</>
			)}
		</Menu>
	);
});
HeaderMenu.displayName = "HeaderMenu";
