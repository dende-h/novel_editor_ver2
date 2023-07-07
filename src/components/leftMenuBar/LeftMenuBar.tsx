/* eslint-disable react/jsx-key */
import { Box, IconButton, Tooltip, VStack } from "@chakra-ui/react";
import { memo } from "react";
import { AiFillEdit, AiFillIdcard, AiFillMail } from "react-icons/ai";
import { ImBlog } from "react-icons/im";
import { IoLibrarySharp } from "react-icons/io5";
import { HiLibrary } from "react-icons/hi";
import { BiHelpCircle } from "react-icons/bi";
import { TbBookDownload, TbDeviceDesktopAnalytics } from "react-icons/tb";
import { ColorSwitchButton } from "../headers/ColorSwitchButton";
import Link from "next/link";
import { TimerPopover } from "./Timer/TimerPopover";
import { MdBackup } from "react-icons/md";

export const LeftMenuBar = memo(() => {
	const menuIcons = [
		<AiFillEdit />,
		<AiFillIdcard />,
		<IoLibrarySharp />,
		<HiLibrary />,
		<ImBlog />,
		<AiFillMail />,
		<MdBackup />,
		<BiHelpCircle />,
		<TbBookDownload />,
		<TbDeviceDesktopAnalytics />
	];
	const tooltipLabels = [
		"原稿一覧・執筆",
		"プロフィール・実績・投稿",
		"原稿の縦読み閲覧",
		"Lit:Bite",
		"創作支援ブログ",
		"お問い合わせフォーム",
		"バックアップと復元",
		"Re:teratureの使い方",
		"電子書籍に出力(EPUB)",
		"自動校正ツール"
	];
	const path = [
		"/",
		"/profile",
		"/drafts",
		"https://next-novel-site.vercel.app/",
		"https://notion-blog-nextjs-nine.vercel.app/",
		"/contact",
		"/backup",
		"https://perpetual-hemisphere-7a3.notion.site/How-to-use-Write-Novel-Now-a746fd05c74a42cda7bd15fb2886b580",
		"/epubgen",
		"textlint"
	];

	return (
		<>
			<VStack
				bgColor={"blackAlpha.800"}
				position={"relative"}
				zIndex={4}
				w={"55px"}
				h={"100%"}
				display={{ base: "none", lg: "block" }}
				textAlign={"center"}
				spacing={6}
				paddingY={8}
			>
				{menuIcons.map((item, index) => {
					return (
						<Box key={index}>
							<Tooltip label={tooltipLabels[index]} placement={"right-end"}>
								<Link href={path[index]} passHref>
									<IconButton
										aria-label="menuList"
										icon={item}
										variant="ghost"
										colorScheme={"twitter"}
										fontSize="24px"
										boxSize={10}
									/>
								</Link>
							</Tooltip>
						</Box>
					);
				})}
				<ColorSwitchButton
					aria-label={"dark-sw"}
					boxSize={10}
					borderRadius={"full"}
					variant="ghost"
					colorScheme={"teal"}
				/>
				<Tooltip label={"ポモドーロタイマー"} placement={"right-end"}>
					<TimerPopover />
				</Tooltip>
			</VStack>
		</>
	);
});

LeftMenuBar.displayName = "RightMenuBar";
