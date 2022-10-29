import { HStack } from "@chakra-ui/react";
import { useState } from "react";
import AddCharButton from "./AddCharButton";
import CharDisplay from "./charDisplay";
import { Char } from "./interface";

const MAX_TRAP_DMG = 20;
const MAX_HP = [50, 45, 100];

const getDmg = (hasResistance: boolean, consSaveValue?: 0) =>
  Math.round(MAX_TRAP_DMG * (hasResistance ? 0.5 : 1));

function App() {
  const [chars, setChars] = useState<{ [name: string]: Char }>({
    Bob: { name: "Bob", hp: 200, maxHp: 350, resistance: true },
    Alice: { name: "Alice", hp: 231, maxHp: 273, resistance: false },
    Carl: { name: "Carl", hp: 129, maxHp: 140, resistance: true },
  });

  const looseHP = (targetKey: string) => () => {
    const target = chars[targetKey];
    if (!target) throw new Error("Not found: " + target);

    const newHP = target.hp - getDmg(target.resistance);
    const withNewHP = { ...target, hp: newHP };
    const newChars = { ...chars, [targetKey]: withNewHP };

    setChars(newChars);
  };

  return (
    <HStack justifyContent={"space-evenly"} gap={16} p={16}>
      {Object.values(chars).map(({ name, hp, maxHp, resistance }, index) => (
        <CharDisplay
          name={name}
          hp={hp}
          maxHp={maxHp}
          resistance={resistance}
          onRoll={looseHP(name)}
        />
      ))}
      <AddCharButton
        addChar={(newChar) => setChars({ ...chars, [newChar.name]: newChar })}
      />
    </HStack>
  );
}

export default App;
