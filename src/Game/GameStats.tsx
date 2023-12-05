interface GameStatsProps {
	score: number;
}

function GameStats({score}: GameStatsProps) {
  return (
    <div>
      <p>Longest Streak: {score}</p>
    </div>
  );
}

export default GameStats;