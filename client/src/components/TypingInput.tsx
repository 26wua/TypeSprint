import { forwardRef, KeyboardEvent } from "react";

/**
 * Props for the TypingInput component
 * @interface TypingInputProps
 * @property {string} value - Current input value
 * @property {(value: string) => void} onChange - Callback when input changes
 * @property {(event: KeyboardEvent<HTMLTextAreaElement>) => void} onKeyDown - Callback for key events
 * @property {boolean} disabled - Whether input is disabled
 * @property {string} placeholder - Placeholder text to show
 */
interface TypingInputProps {
  value: string;
  onChange: (value: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
  placeholder: string;
}

/**
 * TypingInput component provides an invisible text input that captures user typing
 * The actual visual feedback is provided by the TypingDisplay component
 * This component focuses on capturing keystrokes and managing input state
 */
const TypingInput = forwardRef<HTMLTextAreaElement, TypingInputProps>(
  ({ value, onChange, onKeyDown, disabled, placeholder }, ref) => {
    return (
      <div className="relative">
        {/* Instructions for the user */}
        <div className="text-center mb-4">
          <p className="text-muted-foreground text-sm">
            {disabled 
              ? "Click 'Start Game' to begin typing" 
              : "Start typing to begin the 60-second challenge!"
            }
          </p>
        </div>

        {/* Hidden textarea that captures all keystrokes */}
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full h-12 opacity-0 absolute top-8 left-0 resize-none border-none outline-none bg-transparent text-transparent caret-transparent"
          data-testid="typing-input"
          autoFocus={!disabled}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />

        {/* Visual focus indicator */}
        {!disabled && (
          <div className="absolute top-8 left-0 right-0 h-12 border-2 border-primary/20 rounded-md pointer-events-none">
            <div className="absolute inset-0 bg-primary/5 rounded-md"></div>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2 w-0.5 h-6 bg-primary animate-pulse"></div>
          </div>
        )}
      </div>
    );
  }
);

TypingInput.displayName = "TypingInput";

export default TypingInput;