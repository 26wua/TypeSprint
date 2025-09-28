import { useState, useEffect, useRef, useCallback, KeyboardEvent } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import TypingDisplay from "./TypingDisplay";
import TypingInput from "./TypingInput";
import StatisticsPanel from "./StatisticsPanel";
import GameControls from "./GameControls";
import ResultsModal from "./ResultsModal";

/**
 * Sample sentences optimized for 60-second typing challenges
 * Each sentence is carefully chosen to be completable within the time limit
 */
const SAMPLE_SENTENCES = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Programming languages like JavaScript and Python make development easier for beginners.",
  "Coffee shops around the world serve millions of cups every single morning.",
  "Mountain hiking requires proper equipment, good weather, and strong determination.",
  "Digital technology continues to transform how we communicate and work together.",
  "Fresh vegetables from the garden taste much better than store-bought produce.",
  "Learning to type faster takes consistent practice and proper finger positioning.",
  "Ocean waves crash against the rocky shore while seabirds circle overhead.",
  "Modern smartphones have become essential tools for daily communication and productivity.",
  "Reading books regularly helps expand vocabulary and improve writing skills significantly."
];

/**
 * Game state interface for managing typing test progress
 */
interface GameState {
  isActive: boolean;
  isCompleted: boolean;
  startTime: number | null;
  timeLeft: number;
  currentSentence: string;
  userInput: string;
  currentIndex: number;
}

/**
 * Main TypingGame component that orchestrates the entire typing test experience
 * Manages game state, timer, statistics calculation, and user interactions
 */
export default function TypingGame() {
  // Core game state
  const [gameState, setGameState] = useState<GameState>({
    isActive: false,
    isCompleted: false,
    startTime: null,
    timeLeft: 60,
    currentSentence: SAMPLE_SENTENCES[0],
    userInput: "",
    currentIndex: 0,
  });

  // UI state
  const [showResults, setShowResults] = useState(false);

  // Refs for managing input focus and timer
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Calculate Words Per Minute (WPM) based on correct characters
   * WPM = (correct characters ÷ 5) ÷ minutes elapsed
   */
  const calculateWPM = useCallback((correctChars: number, timeElapsed: number): number => {
    if (timeElapsed === 0) return 0;
    const minutes = timeElapsed / 60;
    return (correctChars / 5) / minutes;
  }, []);

  /**
   * Calculate accuracy percentage
   * Accuracy = (correct characters ÷ total typed) × 100
   */
  const calculateAccuracy = useCallback((correctChars: number, totalChars: number): number => {
    if (totalChars === 0) return 100;
    return (correctChars / totalChars) * 100;
  }, []);

  /**
   * Count correct characters by comparing user input with target sentence
   */
  const countCorrectCharacters = useCallback((input: string, target: string): number => {
    let correct = 0;
    for (let i = 0; i < Math.min(input.length, target.length); i++) {
      if (input[i] === target[i]) {
        correct++;
      }
    }
    return correct;
  }, []);

  /**
   * Get current typing statistics
   */
  const getCurrentStats = useCallback(() => {
    const correctChars = countCorrectCharacters(gameState.userInput, gameState.currentSentence);
    const timeElapsed = gameState.startTime ? (60 - gameState.timeLeft) : 0;
    const wpm = calculateWPM(correctChars, timeElapsed);
    const accuracy = calculateAccuracy(correctChars, gameState.userInput.length);

    return {
      wpm,
      accuracy,
      correctChars,
      totalChars: gameState.userInput.length,
      timeElapsed,
    };
  }, [gameState, countCorrectCharacters, calculateWPM, calculateAccuracy]);

  /**
   * Start the game timer and update every second
   */
  const startTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setGameState(prev => {
        const newTimeLeft = prev.timeLeft - 1;
        
        if (newTimeLeft <= 0) {
          // Game completed due to time limit
          return {
            ...prev,
            isActive: false,
            isCompleted: true,
            timeLeft: 0,
          };
        }
        
        return {
          ...prev,
          timeLeft: newTimeLeft,
        };
      });
    }, 1000);
  }, []);

  /**
   * Stop the timer
   */
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  /**
   * Reset the game to initial state
   */
  const resetGame = useCallback(() => {
    stopTimer();
    
    // Select a random sentence
    const randomSentence = SAMPLE_SENTENCES[Math.floor(Math.random() * SAMPLE_SENTENCES.length)];
    
    setGameState({
      isActive: false,
      isCompleted: false,
      startTime: null,
      timeLeft: 60,
      currentSentence: randomSentence,
      userInput: "",
      currentIndex: 0,
    });
    
    setShowResults(false);
    
    // Focus input after short delay to ensure component is ready
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, [stopTimer]);

  /**
   * Handle input changes and game state updates
   */
  const handleInputChange = useCallback((value: string) => {
    // Don't allow input if game is not active or completed
    if (gameState.isCompleted) return;

    // Start game on first keypress
    if (!gameState.isActive && value.length > 0) {
      setGameState(prev => ({
        ...prev,
        isActive: true,
        startTime: Date.now(),
        userInput: value,
        currentIndex: value.length,
      }));
      startTimer();
      return;
    }

    // Don't allow input beyond the sentence length
    if (value.length > gameState.currentSentence.length) {
      return;
    }

    // Check if sentence is completed
    const isCompleted = value === gameState.currentSentence;
    
    setGameState(prev => ({
      ...prev,
      userInput: value,
      currentIndex: value.length,
      isCompleted,
      isActive: !isCompleted,
    }));

    // Stop timer if sentence is completed
    if (isCompleted) {
      stopTimer();
    }
  }, [gameState.isActive, gameState.isCompleted, gameState.currentSentence, startTimer, stopTimer]);

  /**
   * Handle special key events (like backspace prevention beyond current position)
   */
  const handleKeyDown = useCallback((event: KeyboardEvent<HTMLTextAreaElement>) => {
    // Allow backspace and other control keys
    if (event.key === 'Backspace' || event.key === 'Delete' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      return;
    }

    // Prevent input if game is completed
    if (gameState.isCompleted) {
      event.preventDefault();
    }
  }, [gameState.isCompleted]);

  /**
   * Show results modal when game completes
   */
  useEffect(() => {
    if (gameState.isCompleted) {
      setShowResults(true);
    }
  }, [gameState.isCompleted]);

  /**
   * Cleanup timer on component unmount
   */
  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  // Get current statistics for display
  const stats = getCurrentStats();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6" data-testid="typing-game">
      {/* Game Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            60-Second Typing Challenge
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Type the sentence below as quickly and accurately as possible
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Typing Display Area */}
          <TypingDisplay
            text={gameState.currentSentence}
            userInput={gameState.userInput}
            currentIndex={gameState.currentIndex}
          />

          {/* Hidden Input Area */}
          <TypingInput
            ref={inputRef}
            value={gameState.userInput}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={gameState.isCompleted}
            placeholder="Start typing here..."
          />

          {/* Statistics Panel */}
          <StatisticsPanel
            wpm={stats.wpm}
            accuracy={stats.accuracy}
            charactersTyped={stats.totalChars}
            timeLeft={gameState.timeLeft}
          />

          {/* Game Controls */}
          <GameControls
            onReset={resetGame}
            gameActive={gameState.isActive}
            gameCompleted={gameState.isCompleted}
            timeLeft={gameState.timeLeft}
          />
        </CardContent>
      </Card>

      {/* Results Modal */}
      <ResultsModal
        isOpen={showResults}
        onClose={() => setShowResults(false)}
        onPlayAgain={resetGame}
        finalWpm={stats.wpm}
        finalAccuracy={stats.accuracy}
        totalCharacters={stats.totalChars}
        correctCharacters={stats.correctChars}
      />
    </div>
  );
}