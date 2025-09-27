import { useState } from "react";
import ResultsModal from '../ResultsModal';
import { Button } from "@/components/ui/button";

export default function ResultsModalExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    console.log('Results modal closed');
  };

  const handlePlayAgain = () => {
    setIsOpen(false);
    console.log('Play again triggered');
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Show Results Modal
      </Button>
      <ResultsModal
        isOpen={isOpen}
        onClose={handleClose}
        onPlayAgain={handlePlayAgain}
        finalWpm={67}
        finalAccuracy={94.5}
        totalCharacters={145}
        correctCharacters={137}
      />
    </div>
  );
}