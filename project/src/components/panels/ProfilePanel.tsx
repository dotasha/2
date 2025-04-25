import React, { useState } from 'react';
import { Search, User, Users, Shield, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface ProfilePanelProps {
  onAddNotification: (message: string) => void;
}

export const ProfilePanel: React.FC<ProfilePanelProps> = ({ onAddNotification }) => {
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<null | {
    username: string;
    displayName: string;
    id: string;
    joinDate: string;
    robux: number;
    premium: boolean;
    friends: number;
    lastOnline: string;
  }>(null);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (username.toLowerCase() === 'admin' || username.toLowerCase() === 'roblox') {
        onAddNotification('Access denied: Account protected');
        return;
      }
      
      // Generate fake profile data
      setProfile({
        username: username,
        displayName: username.charAt(0).toUpperCase() + username.slice(1),
        id: Math.floor(Math.random() * 1000000000).toString(),
        joinDate: new Date(Date.now() - Math.random() * 31536000000 * 5).toLocaleDateString(),
        robux: Math.floor(Math.random() * 10000),
        premium: Math.random() > 0.7,
        friends: Math.floor(Math.random() * 500),
        lastOnline: Math.random() > 0.3 ? 'Online Now' : `${Math.floor(Math.random() * 24)} hours ago`,
      });
      
      onAddNotification(`User "${username}" found and analyzed`);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">User Finder</h1>
        <span className="px-3 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30 flex items-center">
          <Users className="h-3 w-3 mr-1" />
          USER EXPLORER
        </span>
      </div>
      
      <form onSubmit={handleSearch} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label htmlFor="username" className="block text-sm font-medium text-gray-400 mb-2">
              Enter Roblox Username
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 bg-gray-900/70 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Username to find"
              />
            </div>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              disabled={isLoading || !username}
              className={`py-3 px-6 rounded-lg font-medium flex items-center ${
                isLoading || !username
                  ? 'bg-gray-700 cursor-not-allowed text-gray-400'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } transition`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Find User
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      {profile && (
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile Image */}
            <div className="flex-shrink-0 w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-blue-500/30 flex items-center justify-center">
              <User className="h-12 w-12 text-blue-400" />
            </div>
            
            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-wrap justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {profile.displayName}
                    {profile.premium && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                        Premium
                      </span>
                    )}
                  </h2>
                  <p className="text-gray-400">@{profile.username}</p>
                </div>
                
                <div className="mt-2 md:mt-0 px-3 py-1 bg-gray-900/50 border border-gray-700 rounded-lg">
                  <p className="text-xs font-medium text-gray-400">
                    User ID: <span className="text-gray-300">{profile.id}</span>
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    JOIN DATE
                  </p>
                  <p className="text-sm text-gray-300">{profile.joinDate}</p>
                </div>
                
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Database className="h-3 w-3 mr-1" />
                    ROBUX
                  </p>
                  <p className="text-sm text-gray-300">R$ {profile.robux.toLocaleString()}</p>
                </div>
                
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Users className="h-3 w-3 mr-1" />
                    FRIENDS
                  </p>
                  <p className="text-sm text-gray-300">{profile.friends}</p>
                </div>
                
                <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-700">
                  <p className="text-xs text-gray-500 mb-1 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    LAST ONLINE
                  </p>
                  <p className={`text-sm ${profile.lastOnline === 'Online Now' ? 'text-green-400' : 'text-gray-300'}`}>
                    {profile.lastOnline}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => onAddNotification(`Attempting to access ${profile.username}'s inventory...`)}
                  className="py-2 px-4 bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/30 rounded-lg text-sm font-medium text-blue-300 transition"
                >
                  View Inventory
                </button>
                
                <button
                  onClick={() => onAddNotification(`Password hack attempt for ${profile.username} initiated`)}
                  className="py-2 px-4 bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/30 rounded-lg text-sm font-medium text-purple-300 transition"
                >
                  Hack Password
                </button>
                
                <button
                  onClick={() => onAddNotification(`Robux transfer process for ${profile.username} blocked by security system`)}
                  className="py-2 px-4 bg-red-600/30 hover:bg-red-600/50 border border-red-500/30 rounded-lg text-sm font-medium text-red-300 transition"
                >
                  Transfer Robux
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-white">Security Analysis</h3>
              <span className="text-xs text-gray-400">Vulnerability scanner v2.1</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">2FA Status</h4>
                  <p className="text-xs text-gray-400 mt-1">Two-factor authentication is {Math.random() > 0.5 ? 'enabled' : 'disabled'} for this account.</p>
                </div>
              </div>
              
              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Pin Vulnerability</h4>
                  <p className="text-xs text-gray-400 mt-1">Account PIN can possibly be reset using email access.</p>
                </div>
              </div>
              
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start">
                <Shield className="h-5 w-5 text-blue-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Login History</h4>
                  <p className="text-xs text-gray-400 mt-1">Last login was from {Math.random() > 0.5 ? 'a new device' : 'a recognized device'}.</p>
                </div>
              </div>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start">
                <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                <div className="ml-3">
                  <h4 className="text-sm font-medium text-white">Email Security</h4>
                  <p className="text-xs text-gray-400 mt-1">Email address may be vulnerable to phishing attempts.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Database: React.FC<{ className?: string }> = (props) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      {...props}
    >
      <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
      <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
    </svg>
  );
};