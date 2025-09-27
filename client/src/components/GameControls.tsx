import { Button } from "@/components/ui/button";
import { RotateCcw, Play, Pause } from "lucide-react";

/**
 * Props for the GameControls component
 * @interface GameControlsProps
 * @property {() => void} onReset - Callback function to reset the game
 * @property {boolean} gameActive - Whether the game is currently active/running
 * @property {boolean} gameCompleted - Whether the game has been completed
 * @property {number} timeLeft - Time remaining in seconds
 */
interface GameControlsProps {
  onReset: () => void;
  gameActive: boolean;
  gameCompleted: boolean;
  timeLeft: number;
}

/**
 * GameControls component provides the main control interface for the typing game
 * - Reset button to restart the game
 * - Game status indicators
 * - Timer display with visual urgency indicators
 */
export default function GameControls({ 
  onReset, 
  gameActive, 
  gameCompleted, 
  timeLeft 
}: GameControlsProps) {
  // Determine timer display style based on remaining time
  const getTimerStyle = () => {
    if (timeLeft <= 10 && gameActive) {
      return "text-destructive animate-pulse"; // Red and pulsing for urgency
    }
    if (gameActive) {
      return "text-primary"; // Blue for active game
    }
    return "text-muted-foreground"; // Gray for inactive
  };

  // Get appropriate button text and icon based on game state
  const getResetButtonContent = () => {
    if (gameCompleted) {
      return (
        <>
          <Play className="w-4 h-4" />
          Play Again
        </>
      );
    }
    if (gameActive) {
      return (
        <>
          <RotateCcw className="w-4 h-4" />
          Restart
        </>
      );
    }
    return (
      <>
        <Play className="w-4 h-4" />
        Start Game
      </>
    );
  };

  return (
    <div className="flex items-center justify-between p-4" data-testid="game-controls">
      {/* Timer Display */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-muted-foreground">Time:</span>
        <div className={`text-3xl font-bold ${getTimerStyle()}`} data-testid="timer-display">
          {timeLeft}s
        </div>
      </div>

      {/* Game Status Indicator */}
      <div className="flex items-center gap-2">
        {gameActive && !gameCompleted && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            Game Active
          </div>
        )}
        {gameCompleted && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-chart-1 rounded-full"></div>
            Complete!
          </div>
        )}
        {!gameActive && !gameCompleted && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 bg-muted-foreground/50 rounded-full"></div>
            Ready to Start
          </div>
        )}
      </div>

      {/* Reset/Start Button */}
      <Button 
        onClick={onReset} 
        variant="default"
        data-testid="button-reset"
        className="gap-2"
      >
        {getResetButtonContent()}
      </Button>
    </div>
  );
}