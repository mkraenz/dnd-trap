import { useState } from "react";

/** this is a horrible workaroud to make imperative calls to DiceRoll */
export default function useDiceRollWorkaround() {
  const [diceRollWorkaround, setDiceRollWorkaround] = useState(0);
  const [diceRollResult, setDiceRollResult] = useState(0);

  const setResult = (result: number) => {
    setDiceRollResult(result);
    setDiceRollWorkaround(diceRollWorkaround + 1);
  };

  return { setResult, diceRollWorkaround, diceRollResult };
}
