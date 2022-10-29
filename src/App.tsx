import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import AddCharButton from "./AddCharButton";
import CharDisplay from "./charDisplay";
import { Char } from "./interface";

const MAX_TRAP_DMG = 20;
const MAX_HP = [50, 45, 100];

const rollTrapDmg = () => Math.round(Math.random() * MAX_TRAP_DMG) + 1;

function App() {
  const [count, setCount] = useState(0);
  const [chars, setChars] = useState<{ [name: string]: Char }>({
    Bob: { name: "Bob", hp: 200, maxHp: 350 },
  });

  const looseHP = (target: string) => () => {
    const targetChar = chars[target];
    if (!targetChar) throw new Error("Not found: " + target);

    const newHP = targetChar.hp - rollTrapDmg();
    const withNewHP = { ...targetChar, hp: newHP };
    const newChars = { ...chars, [target]: withNewHP };

    setChars(newChars);
  };

  return (
    <HStack justifyContent={"space-evenly"} gap={16} p={16}>
      {Object.values(chars).map(({ name, hp, maxHp }, index) => (
        <CharDisplay name={name} hp={hp} maxHp={maxHp} onRoll={looseHP(name)} />
      ))}
      <AddCharButton
        addChar={(newChar) => setChars({ ...chars, [newChar.name]: newChar })}
      />
    </HStack>
  );
}

export default App;
