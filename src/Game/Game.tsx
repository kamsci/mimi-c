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
	INACTIVE = 'INACTIVE',
	START = 'START',
	SHOWING = 'SHOWING',
	PLAYING = 'PLAYING',
	GAME_OVER = 'GAME_OVER',
}

function Game({buttons}: GameProps) {
	const [colorPromptSequence, setColorPromptSequence] = useState<string[]>([]);
	const [colorInputSequence, setColorInputSequence] = useState<string[]>([]);
	const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.INACTIVE);
	const [longestCorrectSequence, setLongestCorrectSequence] = useState<number>(0);
	const [gameTimer, setGameTimer] = useState<number>(0);

	/* On game status/game timer change:
	 *	If game status is START, reset score & set first color prompt
	 *	If game status is SHOWING sequence, reset game timer
	 *	If game status is PLAYING, set game timer to 0 and start timer
	 *	If game status is GAME_OVER, reset input & prompt sequences & game timer
	*/
	useEffect(() => {
		switch (gameStatus) {
			case GameStatus.START: 
				setLongestCorrectSequence(0);
				const nextColor = getRandomButtonColor(buttons);
				setColorPromptSequence((prev) => [...prev, nextColor]);
				break;
			case GameStatus.SHOWING:
				setGameTimer(0);
				break;
			case GameStatus.PLAYING: 
				const timer = setTimeout(() => {
					if (gameTimer > 4) {
						setGameStatus(GameStatus.GAME_OVER);
					} else {
						console.log(gameTimer);
						setGameTimer((prev) => prev + 1);
					}
				}, 1000);
				return () => {
					clearTimeout(timer);
				};
			case GameStatus.GAME_OVER:
				setColorPromptSequence([]);
				setColorInputSequence([]);
				setGameTimer(0);
				break;
			default:
				break;
		}
	}, [gameStatus, gameTimer]);

	/* On color input sequence change:
	 *	If input sequence is the same length as prompt sequence, check for full sequence match
	 *		If full sequence match, update score, set next color prompt, & reset input sequence
	 *		If NOT full sequence match, set game status to GAME_OVER
	 *	If input sequence is not the same length as prompt sequence, do nothing
	*/
	useEffect(() => {
		if (shouldCheckSequence(colorInputSequence, colorPromptSequence)) {
			if (isSequenceMatch(colorInputSequence, colorPromptSequence)) {
				setLongestCorrectSequence(colorInputSequence.length);
				const nextColor = getRandomButtonColor(buttons);
				setColorPromptSequence([...colorPromptSequence, nextColor]);
				setColorInputSequence([]);
			} else {
				setGameStatus(GameStatus.GAME_OVER);
			}
		}
	}, [colorInputSequence]);

	/* On game button click:
	 * 	If game status is PLAYING:
	 * 		1. Add color to input sequence
	 * 	 	2. Check that partial input sequence is matching prompt sequence
	 * 		3. If partial input sequence is matching prompt sequence, reset timer
	 * 		4. If partial input sequence is not matching prompt sequence, set game status to GAME_OVER
	*/
	function handleButtonClick(colorHex: string) {
		if (gameStatus === GameStatus.PLAYING) {
			const sequence = [...colorInputSequence, colorHex];
			if (isPartialMatch(sequence, colorPromptSequence)) {
				setColorInputSequence(sequence);
				setGameTimer(0);
			} else {
				setGameStatus(GameStatus.GAME_OVER);
			}
		}
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
function isSequenceMatch(colorInputSequence: string[], colorPromptSequence: string[]) {
	return JSON.stringify(colorInputSequence) === JSON.stringify(colorPromptSequence);
}

/*
 * Returns true if the input sequence matches the prompt sequence up to the input sequence length
*/
function isPartialMatch(colorInputSequence: string[], colorPromptSequence: string[]) {
	for (let i = 0; i < colorInputSequence.length; i++) {
		if (colorInputSequence[i] !== colorPromptSequence[i]) {
			return false;
		}
	}
	return true;
}

/*
 * Returns true if the input sequence is greater than 0 and is the same length as the prompt sequence
*/
function shouldCheckSequence(colorInputSequence: string[], colorPromptSequence: string[]) {
	return colorInputSequence.length > 0 && colorInputSequence.length >= colorPromptSequence.length;
}

export default Game;
export { GameStatus };
export type {
	GameProps,
}