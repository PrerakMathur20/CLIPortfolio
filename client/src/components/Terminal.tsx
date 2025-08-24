import React, { useState, useRef, useEffect } from 'react';
import { useTerminal } from '../hooks/useTerminal';

interface TerminalProps {
  onPathChange: (path: string) => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onPathChange }) => {
  const { state, executeCommand, getSuggestions, navigateHistory, getHistoryCommand } = useTerminal();
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onPathChange(state.currentPath);
  }, [state.currentPath, onPathChange]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [state.output]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    if (value.trim()) {
      // Remove 'hello' and 'whoami' from suggestions always
      const newSuggestions = getSuggestions(value).filter(s => s !== 'hello' && s !== 'iamshreya');
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(input);
      setInput('');
      setSuggestions([]);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      navigateHistory('up');
      const historyCommand = getHistoryCommand(state.historyIndex - 1);
      if (historyCommand) {
        setInput(historyCommand);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      navigateHistory('down');
      if (state.historyIndex >= state.history.length) {
        setInput('');
      } else {
        const historyCommand = getHistoryCommand(state.historyIndex);
        setInput(historyCommand);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) {
        const parts = input.trim().split(' ');
        if (parts.length === 1) {
          setInput(suggestions[0] + ' ');
        } else {
          parts[parts.length - 1] = suggestions[0];
          setInput(parts.join(' ') + ' ');
        }
        setSuggestions([]);
      }
    }
  };

  return (
    <div className="w-full h-full bg-black border-r md:border-r border-b md:border-b-0 border-matrix-green/30 p-4 md:p-6 flex flex-col font-mono">
      <div className="text-matrix-green text-sm mb-4">
        <div className="mb-2">Welcome to Prerak's Portfolio Terminal</div>
        <div className="text-gray-400">Type 'help' for available commands</div>
      </div>
      
      {/* Terminal Output */}
      <div 
        ref={outputRef}
        className="flex-1 overflow-y-auto text-sm text-matrix-green space-y-1 mb-4 scrollbar-thin scrollbar-thumb-matrix-green scrollbar-track-transparent"
        data-testid="terminal-output"
      >
        {state.output.map((line, index) => (
          <div 
            key={index} 
            className={`${line.isCommand ? 'text-matrix-green' : line.isError ? 'text-red-400' : 'text-gray-300'}`}
          >
            {line.text}
          </div>
        ))}
      </div>
      
      {/* Terminal Input */}
      <div className="flex items-center text-matrix-green text-sm">
        <span className="mr-2 whitespace-nowrap">
          prerak@portfolio:~<span className="text-blue-400">{state.currentPath}</span>$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="bg-transparent outline-none flex-1 text-matrix-green caret-matrix-green"
          autoComplete="off"
          data-testid="terminal-input"
        />
      </div>

      {/* Command Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-2 text-xs text-gray-400" data-testid="terminal-suggestions">
          Suggestions: {suggestions.join(', ')}
        </div>
      )}
    </div>
  );
};
