import { Avatar, Button, HStack, Text, VStack } from "@chakra-ui/react";
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
  consSave,
  onRoll,
}) => {
  return (
    <VStack alignItems={"flex-start"}>
      <HStack>
        <Avatar name={name} size="sm" />
        <Text>{name}</Text>
      </HStack>
      <Text>
        {hp} / {maxHp}
      </Text>
      <Text>{resistance ? "has resistance" : "no resistance"}</Text>
      <Text>Cons save: {consSave}</Text>
      <Button colorScheme="blue" onClick={onRoll}>
        Roll
      </Button>
    </VStack>
  );
};

export default charDisplay;
