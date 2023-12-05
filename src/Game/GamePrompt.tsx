import { useState, useEffect } from "react";
import { GameStatus } from "./Game";
// Lib Components
import { Box } from "@mui/material";

interface GamePromptProps {
  colorSequence: string[];
  changeGameStatus: (gameStatus: GameStatus) => void;
}

const startingColor = 'none';

function GamePrompt({colorSequence, changeGameStatus}: GamePromptProps) {
  const [colorHex, setColorHex] = useState<string>(startingColor);

  /* On color sequence change:
    * Change game status to SHOWING
    * Create list of timers
    * For each color in sequence:
    * 	Add 2 timers to flash next color
    * Add last timer to change game status to PLAYING after all colors are shown
    * Finally, clear all timers on unmount
    */
  useEffect(() => {
    changeGameStatus(GameStatus.SHOWING);
    const timers: any[] = [];

    colorSequence.forEach((color, index) => {
      const time = 1000 * index;

      timers.push(setTimeout(() => {
        setColorHex(startingColor);
      }, time));

      timers.push(setTimeout(() => {
        setColorHex(color);
      }, time + 500));
    });

    timers.push(setTimeout(() => {
      changeGameStatus(GameStatus.PLAYING);
    } , 1000 * colorSequence.length));

    return () => {
      timers.forEach((timer) => {
        clearTimeout(timer);
      });
    };
  }, [colorSequence]);

  return (
    <Box sx={{
      width: 100,
      height: 100,
      borderRadius: 1,
      bgcolor: colorHex,
    }}/>
  )
}

export default GamePrompt;
export type {
  GamePromptProps,
}