import { useState, useEffect } from "react";
// Lib Components
import { Box } from "@mui/material";

interface GamePromptProps {
  colorSequence: string[];
}

const startingColor = 'none';

function GamePrompt({colorSequence}: GamePromptProps) {
  const [colorHex, setColorHex] = useState<string>(startingColor);

  useEffect(() => {
    // Create timers for each color in sequence
    const timers: any[] = [];
    colorSequence.forEach((color, index) => {
      // Time
      const time = 1000 * index;
      // Set between color
      timers.push(setTimeout(() => {
        setColorHex(startingColor);
      }, time));
      // Set new color after every 1 second * index
       timers.push(setTimeout(() => {
        setColorHex(color);
      }, time + 500));
    });
    // Clear timers on unmount
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