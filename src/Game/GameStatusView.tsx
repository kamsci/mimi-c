
import { GameStatus } from "./Game";
// Lib Components
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
// Components
import GamePrompt from "./GamePrompt";
import GameStats from "./GameStats";

interface GameStatusViewProps {
    colorPromptSequence: string[];
    gameStatus: GameStatus;
    score: number;
    changeGameStatus: (gameStatus: GameStatus) => void;
}

function GameStatusView({
    colorPromptSequence,
    gameStatus, 
    score, 
    changeGameStatus
}: GameStatusViewProps) {

    const setStatusPlay = () => { 
        changeGameStatus(GameStatus.PLAYING);
    }

    switch (gameStatus) {
        case GameStatus.START:
            return <Button onClick={setStatusPlay}>Start</Button>;
        case GameStatus.PLAYING:
            return <GamePrompt colorSequence={colorPromptSequence}/>;
        case GameStatus.GAME_OVER:
            return (
                <Stack spacing={1} alignItems={'center'}>
                <GameStats score={score} />
                <Button onClick={setStatusPlay}>Restart?</Button>
                </Stack>
            );
    }
}

export default GameStatusView;
