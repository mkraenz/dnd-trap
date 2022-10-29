import { Button, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";
import { Char } from "./interface";

interface Character extends Char {
  onRoll: () => void;
}

const charDisplay: FC<Character> = ({
  name,
  hp,
  maxHp,
  resistance,
  onRoll,
}) => {
  return (
    <VStack alignItems={"flex-start"}>
      <Text>{name}</Text>
      <Text>
        {hp} / {maxHp}
      </Text>
      <Text>{resistance ? "has resistance" : "no resistance"}</Text>
      <Button colorScheme="blue" onClick={onRoll}>
        Roll
      </Button>
    </VStack>
  );
};

export default charDisplay;
