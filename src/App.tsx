import { HStack, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import AddCharButton from "./AddCharButton";
import CharDisplay from "./charDisplay";
import DiceRoll from "./DiceRoll";
import useDiceRollWorkaround from "./diceRollWorkaround.hook";
import { Char } from "./interface";
import TrapDifficulty from "./TrapDifficulty";

const MAX_TRAP_DMG = 20;
const MAX_HP = [50, 45, 100];
/** DC =  */
const INIT_TRAP_DC = 10;

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

const rollD20 = () => Math.floor(Math.random() * 20 + 1);

const savingThrowFail = (saveBonus: number, roll: number, dc: number) =>
  saveBonus + roll < dc;

const getDmg = (
  hasResistance: boolean,
  consSaveBonus: number,
  roll: number,
  dc: number
) => {
  if (savingThrowFail(consSaveBonus, roll, dc)) {
    return Math.round(MAX_TRAP_DMG * (hasResistance ? 0.5 : 1));
  } else {
    return 0;
  }
};

function App() {
  const [trap, setTrap] = useState({ dc: INIT_TRAP_DC, checkCount: 0 });
  const [chars, setChars] = useState<{ [name: string]: Char }>(
    localStorage.getItem("chars")
      ? JSON.parse(localStorage.getItem("chars") || "")
      : {}
  );
  useEffect(() => {
    localStorage.setItem("chars", JSON.stringify(chars));
  }, [chars]);

  const { diceRollResult, diceRollWorkaround, setResult } =
    useDiceRollWorkaround();

  const looseHP = (targetKey: string) => () => {
    const target = chars[targetKey];
    if (!target) throw new Error("Not found: " + target);

    const roll = rollD20();
    const newHP =
      target.hp - getDmg(target.resistance, target.consSave, roll, trap.dc);
    const withNewHP = { ...target, hp: newHP };
    const newChars = { ...chars, [targetKey]: withNewHP };

    setChars(newChars);
    incrementTrapCount();
    setResult(roll);
  };

  const incrementTrapDC = () => setTrap({ ...trap, dc: trap.dc + 1 });
  const incrementTrapCount = () => {
    setTrap({ ...trap, checkCount: trap.checkCount + 1 });
    if (trap.checkCount % 3 === 0 && trap.checkCount > 0) {
      incrementTrapDC();
    }
  };

  return (
    <VStack pt={16} minW={"100vw"} alignItems="center">
      <HStack>
        <AddCharButton
          addChar={(newChar) => setChars({ ...chars, [newChar.name]: newChar })}
        />
        <TrapDifficulty dc={trap.dc} />
      </HStack>
      <Wrap
        justify={"space-evenly"}
        justifyContent={"center"}
        p={16}
        minW="100vw"
        spacing="10%"
      >
        {Object.values(chars).map((char, index) => (
          <WrapItem key={char.name}>
            <CharDisplay {...char} onRoll={looseHP(char.name)} />
          </WrapItem>
        ))}
      </Wrap>
      <DiceRoll result={diceRollResult} workaround={diceRollWorkaround} />
    </VStack>
  );
}

export default App;
