import GameControls from '../GameControls';

export default function GameControlsExample() {
  const handleReset = () => {
    console.log('Reset game triggered');
  };

  return (
    <GameControls
      onReset={handleReset}
      gameActive={true}
      gameCompleted={false}
      timeLeft={32}
    />
  );
}