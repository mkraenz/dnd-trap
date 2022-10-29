import { Button, Text, VStack } from "@chakra-ui/react";
import { FC } from "react";

interface Character {
  name: string;
  hp: number;
  maxHp: number;
  onRoll: () => void;
}

const charDisplay: FC<Character> = ({ name, hp, maxHp, onRoll }) => {
  return (
    <VStack>
      <Text>Name: {name}</Text>
      <Text>
        HP: {hp} / {maxHp}
      </Text>
      <Button colorScheme="blue" onClick={onRoll}>
        Roll
      </Button>
    </VStack>
  );
};

export default charDisplay;
