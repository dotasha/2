import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface TerminalProps {
  onClose: () => void;
}

export const Terminal: React.FC<TerminalProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [outputLines, setOutputLines] = useState<string[]>([
    'RobloxPwn Terminal v3.4.2',
    'Type "help" for available commands',
    '------------------------',
  ]);
  
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input when terminal opens
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // Auto scroll to bottom on new output
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [outputLines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    const newCommandHistory = [...commandHistory, input];
    setCommandHistory(newCommandHistory);
    
    // Process command
    const newOutput = [...outputLines, `$ ${input}`];
    
    // Handle different commands
    switch (input.toLowerCase()) {
      case 'help':
        newOutput.push(
          'Available commands:',
          '  help         - Show available commands',
          '  clear        - Clear terminal',
          '  scan         - Scan Roblox servers',
          '  hack <user>  - Attempt to hack user account',
          '  robux        - Generate Robux',
          '  status       - Show system status',
          '  exit         - Close terminal'
        );
        break;
      case 'clear':
        setOutputLines([
          'RobloxPwn Terminal v3.4.2',
          'Type "help" for available commands',
          '------------------------',
        ]);
        setInput('');
        return;
      case 'exit':
        onClose();
        return;
      case 'scan':
        newOutput.push(
          'Scanning Roblox servers...',
          'Server 1: [SECURE]',
          'Server 2: [VULNERABLE]',
          'Server 3: [SECURE]',
          'Server 4: [UNKNOWN]',
          'Scan complete. 1 vulnerable server found.'
        );
        break;
      case 'status':
        newOutput.push(
          'System Status:',
          '  Connection: ACTIVE',
          '  Bypass Level: MAXIMUM',
          '  Detection Risk: LOW',
          '  Server Load: 42%',
          '  Active Exploits: 3'
        );
        break;
      case 'robux':
        newOutput.push(
          'Initiating Robux generator...',
          '[██████████] 100%',
          'WARNING: Server security protocols detected!',
          'Generator paused. Try again later.'
        );
        break;
      default:
        if (input.toLowerCase().startsWith('hack ')) {
          const username = input.substring(5);
          newOutput.push(
            `Targeting user: ${username}`,
            'Bypassing authentication...',
            '[███████···] 70%',
            'ACCESS DENIED: Advanced security detected',
            'Try using specialized tools in the Hack Tools section'
          );
        } else {
          newOutput.push(`Command not recognized: ${input}`);
        }
    }
    
    setOutputLines(newOutput);
    setInput('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-1/3 bg-gray-900/90 backdrop-blur-md border-t border-purple-600/30 z-40 flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800">
        <div className="text-sm font-mono font-medium text-gray-300">
          Terminal
          <span className="ml-2 inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-800 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 p-4 font-mono text-sm text-green-400 overflow-y-auto"
      >
        {outputLines.map((line, index) => (
          <div key={index} className="mb-1">
            {line.startsWith('$') ? (
              <span className="text-purple-400">{line}</span>
            ) : line.includes('WARNING') || line.includes('DENIED') ? (
              <span className="text-red-400">{line}</span>
            ) : line.includes('[') && line.includes(']') && line.includes('%') ? (
              <span className="text-cyan-400">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
      </div>
      
      <form onSubmit={handleCommand} className="px-4 py-2 border-t border-gray-800 flex">
        <span className="text-green-500 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 bg-transparent outline-none text-green-400 font-mono"
          placeholder="Type a command..."
        />
      </form>
    </div>
  );
};