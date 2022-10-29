import { Heading } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";

interface Props {
  result: number;
  min?: number;
  max?: number;
  workaround: number;
}

const getRandomInt = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
};

const DiceRoll: FC<Props> = ({ result, min = 1, max = 20, workaround }) => {
  const [current, setCurrent] = useState(getRandomInt(min, max));
  useEffect(() => {
    let ticks = 0;
    const timerId = window.setInterval(() => {
      setCurrent(getRandomInt(min, max));
      if (ticks === 10) {
        setCurrent(result);
        window.clearInterval(timerId);
      }
      ticks++;
    }, 100);
    return () => {
      window.clearInterval(timerId);
    };
  }, [workaround]);

  return (
    <Heading as="p" fontSize={"8xl"}>
      {current}
    </Heading>
  );
};

export default DiceRoll;
