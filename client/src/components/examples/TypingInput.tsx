import { useState, useRef } from "react";
import TypingInput from '../TypingInput';

export default function TypingInputExample() {
  const [value, setValue] = useState("");
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    console.log('Key pressed:', event.key);
  };

  return (
    <div className="space-y-4">
      <button 
        onClick={() => setDisabled(!disabled)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
      >
        {disabled ? 'Enable' : 'Disable'} Input
      </button>
      <TypingInput
        ref={inputRef}
        value={value}
        onChange={setValue}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Start typing here..."
      />
      <p className="text-sm text-muted-foreground">
        Current input: "{value}"
      </p>
    </div>
  );
}