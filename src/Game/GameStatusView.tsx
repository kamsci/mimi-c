
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
        changeGameStatus(GameStatus.START);
    }

    switch (gameStatus) {
        case GameStatus.INACTIVE:
            return <Button sx={{border: '1px solid #ddd'}} onClick={setStatusPlay}>Start</Button>;
        case GameStatus.GAME_OVER:
            return (
                <Stack spacing={1} alignItems={'center'}>
                <GameStats score={score} />
                <Button sx={{border: '1px solid #ddd'}} onClick={setStatusPlay}>New Game?</Button>
                </Stack>
            );
        default:
            return <GamePrompt colorSequence={colorPromptSequence} changeGameStatus={changeGameStatus} />;
    }
}

export default GameStatusView;
