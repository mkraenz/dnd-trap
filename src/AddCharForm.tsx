import {
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { ChangeEvent, FC } from "react";
import { Char } from "./interface";

interface Props {
  char: Char;
  onNameChange: (name: string) => void;
  onHpChange: (hp: number) => void;
  onMaxhpChange: (maxhp: number) => void;
  onResistanceChange: (resistance: boolean) => void;
}

const insecurelySanitizeNumberInput = (e: ChangeEvent<HTMLInputElement>) => {
  const val = Number.parseInt(
    e.currentTarget.value.replace("-", "").replace("+", "")
  );
  return Number.isFinite(val) ? val : 0;
};

const AddCharForm: FC<Props> = ({
  char,
  onNameChange,
  onHpChange,
  onMaxhpChange,
  onResistanceChange,
}) => {
  return (
    <>
      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="name" fontWeight={"normal"}>
            Name
          </FormLabel>
          <Input
            id="name"
            placeholder="Jehlun Dhihor"
            value={char.name}
            onChange={(e) => onNameChange(e.currentTarget.value)}
          />
        </FormControl>
      </Flex>
      <HStack mt="2%">
        <FormControl>
          <FormLabel htmlFor="hp" fontWeight={"normal"}>
            Current HP
          </FormLabel>
          <Input
            type="number"
            id="hp"
            placeholder="12"
            value={char.hp}
            onChange={(e) => onHpChange(insecurelySanitizeNumberInput(e))}
          />
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="max-hp" fontWeight={"normal"}>
            Max HP
          </FormLabel>
          <Input
            id="max-hp"
            type="number"
            placeholder="25"
            value={char.maxHp}
            onChange={(e) => onMaxhpChange(insecurelySanitizeNumberInput(e))}
          />
        </FormControl>
      </HStack>
      <Flex>
        <FormControl mt="4%">
          <Checkbox
            id="resistance"
            isChecked={char.resistance}
            onChange={(e) => onResistanceChange(e.currentTarget.checked)}
          >
            Resistance
          </Checkbox>
        </FormControl>
      </Flex>
    </>
  );
};

export default AddCharForm;
