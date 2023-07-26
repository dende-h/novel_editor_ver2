import { Box, Text, useColorModeValue, Flex } from "@chakra-ui/react";
import format from "date-fns/format";
import Image from "next/image";
import { useRouter } from "next/router";
import { FeatchData, NovelId } from "../../pages/published";

type Props = {
	novel: FeatchData;
	commentNovelId: NovelId[];
};

const NovelCard = (props: Props) => {
	const { novel, commentNovelId } = props;
	const imageUrl = novel.image_url ? novel.image_url : "/android-chrome-256x256.png";
	const backgroundCardFooterColor = useColorModeValue("gray.50", "gray.600");
	const router = useRouter();

	return (
		<Box
			w={{ base: "350px", md: "400px" }}
			h={"130px"}
			borderWidth={1}
			borderRadius="md"
			boxShadow="md"
			transition="all 0.5s"
			_hover={{ boxShadow: "2xl", transform: "translateY(-4px)", cursor: "pointer" }}
			mb={"4"}
			position="relative"
			onClick={() => {
				router.push(`https://next-novel-site.vercel.app/novels/${novel.id}`);
			}}
			display="flex"
			flexDirection="row"
			overflow="hidden"
		>
			<Box w={"30%"} h="100%" overflow="hidden" position="relative">
				<Image src={imageUrl} alt={novel.title} fill style={{ objectFit: "contain" }} priority />
			</Box>

			<Box w={"70%"} h="100%" p="2" backgroundColor={backgroundCardFooterColor}>
				<Text fontSize={"sm"} fontWeight="bold" lineHeight="shorter" height="3.5rem" overflow="hidden">
					{novel.title}
				</Text>

				<Flex>
					<Text fontSize={"sm"} my={"auto"} mr={3}>
						いいね：{novel.good_mark}件
					</Text>

					<Text fontSize={"sm"} my={"auto"} mr={3}>
						コメント
						{
							commentNovelId.filter((novelId) => {
								return novelId.novel_id === novel.id;
							}).length
						}
						件
					</Text>
				</Flex>
				<Text fontSize={"sm"} overflow="hidden">
					更新：{format(new Date(novel.last_edit_time), "yyyy/MM/dd-HH:mm")}
				</Text>
			</Box>
		</Box>
	);
};

export default NovelCard;
