import { IconButton, IconButtonProps, Tooltip, useColorMode } from "@chakra-ui/react";
import { memo } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

//ダークモード切替ボタンコンポーネント
export const ColorSwitchButton: React.FC<IconButtonProps> = memo((props) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const tooltipLabel = colorMode === "light" ? "Switch to dark mode" : "Switch to light mode";
	return (
		<Tooltip label={tooltipLabel} placement={"right-end"}>
			<IconButton {...props} icon={colorMode === "light" ? <FaMoon /> : <FaSun />} onClick={toggleColorMode} />
		</Tooltip>
	);
});

ColorSwitchButton.displayName = "ColorSwitchButton";
