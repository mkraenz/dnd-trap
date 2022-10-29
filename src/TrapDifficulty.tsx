import { Button, Text, useDisclosure } from "@chakra-ui/react";
import { FC } from "react";

interface Props {
  dc: number;
}

const TrapDifficulty: FC<Props> = ({ dc }) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Button onClick={onToggle}>
        {isOpen ? "Hide" : "Show"} Trap Difficulty (DC)
      </Button>
      <Text hidden={!isOpen}>Trap difficulty: {dc}</Text>
    </>
  );
};

export default TrapDifficulty;
