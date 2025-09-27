import TypingGame from "@/components/TypingGame";

/**
 * Main page component for the WPM Typing Game
 * This page serves as the entry point for the typing game application
 */
export default function TypingGamePage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto">
        {/* App Title and Description */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">WPM Typing Game</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Test and improve your typing speed with our 60-second challenge. 
            Get real-time feedback on your words per minute, accuracy, and progress.
          </p>
        </div>

        {/* Main Game Component */}
        <TypingGame />

        {/* Footer with Instructions */}
        <div className="mt-12 text-center space-y-4">
          <h3 className="text-lg font-semibold">How to Play</h3>
          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto text-sm text-muted-foreground">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center mx-auto font-bold">1</div>
              <p><strong>Start Typing</strong></p>
              <p>Click in the text area and begin typing the displayed sentence</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center mx-auto font-bold">2</div>
              <p><strong>Watch Your Progress</strong></p>
              <p>Green letters are correct, red are incorrect. Monitor your WPM and accuracy</p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-primary rounded-full text-primary-foreground flex items-center justify-center mx-auto font-bold">3</div>
              <p><strong>Complete & Review</strong></p>
              <p>Finish the sentence or wait for the 60-second timer to see your results</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}