import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Target, Clock, Keyboard } from "lucide-react";

/**
 * Props for the ResultsModal component
 * @interface ResultsModalProps
 * @property {boolean} isOpen - Whether the modal is currently open
 * @property {() => void} onClose - Callback to close the modal
 * @property {() => void} onPlayAgain - Callback to start a new game
 * @property {number} finalWpm - Final WPM score
 * @property {number} finalAccuracy - Final accuracy percentage
 * @property {number} totalCharacters - Total characters typed
 * @property {number} correctCharacters - Total correct characters typed
 */
interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlayAgain: () => void;
  finalWpm: number;
  finalAccuracy: number;
  totalCharacters: number;
  correctCharacters: number;
}

/**
 * ResultsModal component displays final game statistics when the typing test completes
 * Shows comprehensive results with visual icons and performance feedback
 */
export default function ResultsModal({
  isOpen,
  onClose,
  onPlayAgain,
  finalWpm,
  finalAccuracy,
  totalCharacters,
  correctCharacters,
}: ResultsModalProps) {
  // Determine performance message based on WPM
  const getPerformanceMessage = () => {
    if (finalWpm >= 70) return { message: "Excellent typing speed! 🚀", color: "text-chart-1" };
    if (finalWpm >= 50) return { message: "Great job! Keep practicing 👍", color: "text-primary" };
    if (finalWpm >= 30) return { message: "Good progress! Room to improve 📈", color: "text-chart-3" };
    return { message: "Keep practicing, you'll get there! 💪", color: "text-muted-foreground" };
  };

  const performance = getPerformanceMessage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md" data-testid="results-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Trophy className="w-6 h-6 text-primary" />
            Typing Test Complete!
          </DialogTitle>
        </DialogHeader>

        {/* Performance Message */}
        <div className={`text-center py-2 ${performance.color} font-medium`}>
          {performance.message}
        </div>

        {/* Main Statistics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium text-muted-foreground">Speed</span>
              </div>
              <div className="text-3xl font-bold text-primary" data-testid="final-wpm">
                {Math.round(finalWpm)}
              </div>
              <div className="text-sm text-muted-foreground">WPM</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Target className="w-4 h-4 text-chart-1" />
                <span className="text-sm font-medium text-muted-foreground">Accuracy</span>
              </div>
              <div className="text-3xl font-bold text-chart-1" data-testid="final-accuracy">
                {Math.round(finalAccuracy)}%
              </div>
              <div className="text-sm text-muted-foreground">Accurate</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Statistics */}
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Keyboard className="w-4 h-4" />
              Total Characters
            </span>
            <span className="font-medium" data-testid="total-characters">{totalCharacters}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground flex items-center gap-2">
              <Target className="w-4 h-4" />
              Correct Characters
            </span>
            <span className="font-medium text-chart-1" data-testid="correct-characters">{correctCharacters}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              Incorrect Characters
            </span>
            <span className="font-medium text-destructive" data-testid="incorrect-characters">
              {totalCharacters - correctCharacters}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
            data-testid="button-close-results"
          >
            Close
          </Button>
          <Button 
            onClick={onPlayAgain} 
            className="flex-1"
            data-testid="button-play-again"
          >
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}