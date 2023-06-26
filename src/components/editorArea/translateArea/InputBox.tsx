// src/components/InputBox.tsx
import { Box, Button, Input } from "@chakra-ui/react";
import { FC, useState } from "react";

type InputBoxProps = {
  onAdd: (text: string) => void;
};

export const InputBox: FC<InputBoxProps> = ({ onAdd }) => {
  const [inputText, setInputText] = useState("");

  const handleAddClick = () => {
    if (inputText.trim() === "") return; // prevent adding empty text
    onAdd(inputText);
    setInputText(""); // clear input box after adding
  };

  return (
    <Box>
      <Input
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        minW={"328px"}
      />
      <Button onClick={handleAddClick}>Add</Button>
    </Box>
  );
};
