import { HStack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddCharButton from "./AddCharButton";
import CharDisplay from "./charDisplay";
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

const rollD20 = () => Math.random() * 20 + 1;

const savingThrowFail = (saveBonus: number) => saveBonus + rollD20() < TRAP_DC;

const getDmg = (hasResistance: boolean, consSaveBonus: number) => {
  if (savingThrowFail(consSaveBonus)) {
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

  useEffect(() => {
    localStorage.setItem("chars", JSON.stringify(chars));
  }, [chars]);

  const looseHP = (targetKey: string) => () => {
    const target = chars[targetKey];
    if (!target) throw new Error("Not found: " + target);

    const newHP = target.hp - getDmg(target.resistance, target.consSave);
    const withNewHP = { ...target, hp: newHP };
    const newChars = { ...chars, [targetKey]: withNewHP };

    setChars(newChars);
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
    </VStack>
  );
}

export default App;
