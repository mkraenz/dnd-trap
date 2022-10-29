import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddCharButton from "./AddCharButton";
import CharDisplay from "./charDisplay";
import DiceRoll from "./DiceRoll";
import { Char } from "./interface";

const MAX_TRAP_DMG = 20;
const MAX_HP = [50, 45, 100];
const TRAP_DC = 10;

const defaultChars = {
  Bob: { name: "Bob", hp: 200, maxHp: 350, resistance: true, consSave: 10 },
  Alice: {
    name: "Alice",
    hp: 231,
    maxHp: 273,
    resistance: false,
    consSave: 0,
  },
  Carl: { name: "Carl", hp: 129, maxHp: 140, resistance: true, consSave: 2 },
};

const rollD20 = () => Math.round(Math.random() * 20 + 1);

const savingThrowFail = (saveBonus: number, roll: number) =>
  saveBonus + roll < TRAP_DC;

const getDmg = (
  hasResistance: boolean,
  consSaveBonus: number,
  roll: number
) => {
  if (savingThrowFail(consSaveBonus, roll)) {
    return Math.round(MAX_TRAP_DMG * (hasResistance ? 0.5 : 1));
  } else {
    return 0;
  }
};

function App() {
  const [chars, setChars] = useState<{ [name: string]: Char }>(
    localStorage.getItem("chars")
      ? JSON.parse(localStorage.getItem("chars") || "")
      : {}
  );
  const [diceRollWorkaround, setDiceRollWorkaround] = useState(0);
  const [diceRollResult, setDiceRollResult] = useState(0);

  useEffect(() => {
    localStorage.setItem("chars", JSON.stringify(chars));
  }, [chars]);

  const looseHP = (targetKey: string) => () => {
    const target = chars[targetKey];
    if (!target) throw new Error("Not found: " + target);

    const roll = rollD20();
    const newHP = target.hp - getDmg(target.resistance, target.consSave, roll);
    const withNewHP = { ...target, hp: newHP };
    const newChars = { ...chars, [targetKey]: withNewHP };

    setChars(newChars);
    setDiceRollResult(roll);
    setDiceRollWorkaround(diceRollWorkaround + 1);
  };

  return (
    <VStack pt={16} minW={"100vw"} alignItems="center">
      <AddCharButton
        addChar={(newChar) => setChars({ ...chars, [newChar.name]: newChar })}
      />
      <HStack justifyContent={"space-evenly"} gap={16} p={16} minW="100vw">
        {Object.values(chars).map((char, index) => (
          <CharDisplay {...char} onRoll={looseHP(char.name)} key={char.name} />
        ))}
      </HStack>
      <DiceRoll result={diceRollResult} workaround={diceRollWorkaround} />
    </VStack>
  );
}

export default App;
