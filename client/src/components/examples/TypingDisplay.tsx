import TypingDisplay from '../TypingDisplay';

export default function TypingDisplayExample() {
  const sampleText = "The quick brown fox jumps over the lazy dog. This is a sample sentence for testing.";
  const userInput = "The quick brown fox jumps";
  const currentIndex = 25;

  return (
    <TypingDisplay 
      text={sampleText} 
      userInput={userInput} 
      currentIndex={currentIndex} 
    />
  );
}