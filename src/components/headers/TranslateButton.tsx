import { Box, IconButton, IconButtonProps, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
import { memo } from "react";
import { MdTranslate } from "react-icons/md";
import { useLocale } from "../../hooks/useLocale";

//言語切替ボタンコンポーネント
export const TranslateButton: React.FC<IconButtonProps> = memo((props) => {
	const { locale } = useLocale();
	const tooltipLabel = locale === "ja" ? "Switch to English" : "Switch to Japanese";
	return (
		<Box my={"auto"}>
			<Tooltip label={tooltipLabel} placement={"right-end"}>
				<Link href={locale === "ja" ? "/en/" : "/ja/"} passHref>
					<IconButton {...props} icon={<MdTranslate />} />
				</Link>
			</Tooltip>
		</Box>
	);
});

TranslateButton.displayName = "TranslateButton";
