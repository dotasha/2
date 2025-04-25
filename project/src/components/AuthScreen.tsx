import React, { useState } from 'react';
import { Shield, Unlock, Lock, AlertTriangle } from 'lucide-react';

interface AuthScreenProps {
  onLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <div className="w-full max-w-md p-8 space-y-8 bg-gray-800/60 backdrop-blur-lg rounded-xl border border-purple-500/20 shadow-2xl">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-16 w-16 text-purple-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-white mb-2">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
              RobloxPwn
            </span>
          </h2>
          <p className="text-sm text-gray-400">Advanced Roblox Security Bypass System v3.4.2</p>
          
          <div className="flex items-center justify-center mt-4 mb-6">
            <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30 flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              ONLINE
            </span>
            <span className="ml-2 px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
              {Math.floor(Math.random() * 5000) + 2000} USERS
            </span>
          </div>
        </div>
        
        {error && (
          <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-md flex items-center text-sm text-red-300">
            <AlertTriangle className="h-4 w-4 mr-2 flex-shrink-0" />
            {error}
          </div>
        )}
        
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="text-sm font-medium text-gray-300 block mb-2">
              Username
            </label>
            <div className="relative">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="off"
                required
                className="w-full px-4 py-3 pl-10 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Unlock className="h-5 w-5 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="off"
                required
                className="w-full px-4 py-3 pl-10 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Lock className="h-5 w-5 text-gray-500 absolute left-3 top-3.5" />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white
                ${isLoading ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'}
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  AUTHENTICATING...
                </>
              ) : (
                'ACCESS SYSTEM'
              )}
            </button>
          </div>
        </form>
        
        <div className="text-xs text-gray-500 text-center mt-6">
          <div className="mb-2 text-gray-400">CONNECTION SECURE | BYPASSING DETECTION</div>
          <div className="flex justify-center space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-150"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};