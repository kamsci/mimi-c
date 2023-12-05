import { useState, useEffect } from "react";
// Components 
import GameBoard, { GameButtonProps} from "./GameBoard";
// Lib Components
import Stack from '@mui/material/Stack';
import Divider from "@mui/material/Divider";
import GameStatusView from "./GameStatusView";
import { Box } from "@mui/material";


interface GameProps {
	buttons: GameButtonProps[];
}

enum GameStatus {
	START = 'START',
	PLAYING = 'PLAYING',
	GAME_OVER = 'GAME_OVER',
}

function Game({buttons}: GameProps) {
	const [colorPromptSequence, setColorPromptSequence] = useState<string[]>([]);
	const [colorInputSequence, setColorInputSequence] = useState<string[]>([]);
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.START);
	const [longestCorrectSequence, setLongestCorrectSequence] = useState<number>(0);

	// Evaluate color input sequence on change
	useEffect(() => {
		if (shouldCheckMatch(colorInputSequence, colorPromptSequence)) {
			// Check match after input sequence is the same length as prompt sequence
			if (isMatch(colorInputSequence, colorPromptSequence)) {
				// Update score
				setLongestCorrectSequence(colorInputSequence.length);
				// Set next color prompt
				const nextColor = getRandomButtonColor(buttons);
				setColorPromptSequence([...colorPromptSequence, nextColor]);
				// Reset input sequence
				setColorInputSequence([]);
			} else {
				setGameStatus(GameStatus.GAME_OVER);
			}
		}
	}, [colorInputSequence]);

	// Set color prompt sequence on game status change
	useEffect(() => {
		if (gameStatus === GameStatus.GAME_OVER) {
			setColorPromptSequence([]);
			setColorInputSequence([]);
		}
		if (gameStatus === GameStatus.PLAYING) {
			// Initialize first color prompt onload
			const nextColor = getRandomButtonColor(buttons);
			setColorPromptSequence((prev) => [...prev, nextColor]);
		}
	}, [gameStatus]);

	// Get game input from user
	function handleButtonClick(colorHex: string) {
		setColorInputSequence(prev => [...prev, colorHex]);
	}

	function changeGameStatus(status: GameStatus) {
		setGameStatus(status);
	}

	return (
		<Stack
			spacing={2}
			alignItems={'center'}
			divider={<Divider orientation="horizontal" flexItem />}
		>
			<p className="read-the-docs">
					Click on the box that matches the color prompt in order. Each time you match the sequence, the sequence will extend.
			</p>
			<Box sx={{height: '100px'}}>
				<GameStatusView 
					colorPromptSequence={colorPromptSequence}
					gameStatus={gameStatus} 
					score={longestCorrectSequence} 
					changeGameStatus={changeGameStatus} 
				/>
			</Box>
			<GameBoard buttons={buttons} handleButtonClick={handleButtonClick}/>
		</Stack>
	);
}

/*
 * Returns a random color from the list of buttons
*/
function getRandomButtonColor(buttons: GameButtonProps[]) {
	const randomIndex = Math.floor(Math.random() * buttons.length);
	return buttons[randomIndex].colorHex;
}

/*
 * Returns true if the input sequence matches the prompt sequence
*/
function isMatch(colorInputSequence: string[], colorPromptSequence: string[]) {
	return JSON.stringify(colorInputSequence) === JSON.stringify(colorPromptSequence);
}

/*
 * Returns true if the input sequence is greater than 0 and is the same length as the prompt sequence
*/
function shouldCheckMatch(colorInputSequence: string[], colorPromptSequence: string[]) {
	return colorInputSequence.length > 0 && colorInputSequence.length >= colorPromptSequence.length;
}

// function getScore(colorInputSequence: string[], colorPromptSequence: string[]) {
// 	let score = 0;
// 	for (let i = 0; i < colorInputSequence.length; i++) {
// 		if (colorInputSequence[i] === colorPromptSequence[i]) {
// 			score++;
// 		} else {
// 			break;
// 		}
// 	}
// 	return score;
// }

export default Game;
export { GameStatus };
export type {
	GameProps,
}