import { useMemo } from "react";

/**
 * Props for the TypingDisplay component
 * @interface TypingDisplayProps
 * @property {string} text - The sample text to display for typing
 * @property {string} userInput - Current user input to compare against the text
 * @property {number} currentIndex - Current cursor position in the text
 */
interface TypingDisplayProps {
  text: string;
  userInput: string;
  currentIndex: number;
}

/**
 * TypingDisplay component renders the sample text with character-by-character highlighting
 * - Green highlighting for correctly typed characters
 * - Red highlighting for incorrectly typed characters  
 * - Blue cursor for the current typing position
 * - Gray for untyped characters
 */
export default function TypingDisplay({ text, userInput, currentIndex }: TypingDisplayProps) {
  // Memoize the rendered characters for performance
  const renderedCharacters = useMemo(() => {
    return text.split('').map((char, index) => {
      let className = "transition-colors duration-200 ";
      
      if (index < userInput.length) {
        // Character has been typed - check if correct or incorrect
        if (userInput[index] === char) {
          className += "text-typing-correct bg-typing-correct/10"; // Green for correct
        } else {
          className += "text-typing-incorrect bg-typing-incorrect/20"; // Red for incorrect
        }
      } else if (index === currentIndex) {
        // Current cursor position
        className += "text-typing-current bg-typing-current/20 animate-pulse"; // Blue cursor with pulse
      } else {
        // Untyped characters
        className += "text-typing-untyped"; // Default gray
      }
      
      // Handle space characters with visible indicator
      const displayChar = char === ' ' ? '\u00A0' : char; // Non-breaking space for visibility
      
      return (
        <span key={index} className={className}>
          {displayChar}
        </span>
      );
    });
  }, [text, userInput, currentIndex]);

  return (
    <div 
      className="font-mono text-lg leading-relaxed p-6 rounded-md bg-card border border-card-border focus-within:ring-2 focus-within:ring-primary/20 min-h-32 flex items-center"
      data-testid="typing-display"
    >
      <div className="w-full">
        {renderedCharacters}
      </div>
    </div>
  );
}