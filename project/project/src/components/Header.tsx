import React from 'react';
import { BellRing, Terminal as TerminalIcon, Shield, Menu } from 'lucide-react';

interface HeaderProps {
  toggleTerminal: () => void;
  terminalOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ toggleTerminal, terminalOpen }) => {
  return (
    <header className="bg-gray-900/80 backdrop-blur-lg border-b border-purple-500/20 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shield className="h-8 w-8 text-purple-500 mr-2" />
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                RobloxPwn
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full hover:bg-gray-800 transition-colors"
              aria-label="Notifications"
            >
              <BellRing className="h-5 w-5 text-gray-300" />
            </button>
            
            <button 
              className={`p-2 rounded-full transition-colors flex items-center ${terminalOpen ? 'bg-purple-700/50 text-purple-300' : 'hover:bg-gray-800 text-gray-300'}`}
              onClick={toggleTerminal}
              aria-label="Terminal"
            >
              <TerminalIcon className="h-5 w-5" />
            </button>
            
            <div className="relative">
              <button className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-bold">RP</span>
              </button>
              <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};