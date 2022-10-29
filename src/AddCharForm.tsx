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
  onConsSaveChange: (consSave: number) => void;
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
  onConsSaveChange,
}) => {
  return (
    <>
      <Flex>
        <FormControl>
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
      <Flex mt="4%">
        <FormControl maxW="50%">
          <FormLabel htmlFor="cons-save" fontWeight={"normal"}>
            Cons save
          </FormLabel>
          <Input
            id="cons-save"
            type="number"
            placeholder="10"
            value={char.consSave}
            onChange={(e) => onConsSaveChange(insecurelySanitizeNumberInput(e))}
          />
        </FormControl>
      </Flex>
      <Flex mt="4%">
        <FormControl>
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
