import React, { useState } from 'react';
import { Shield, Bell, Eye, Monitor, Moon, Sun, RefreshCw, Lock } from 'lucide-react';

export const SettingsPanel: React.FC = () => {
  const [settings, setSettings] = useState({
    theme: 'dark',
    notifications: true,
    hideUsername: false,
    antiDetection: true,
    autoUpdate: true,
    encryptData: true,
    autoLogout: false,
  });
  
  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <span className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-400 rounded-full border border-purple-500/30">
          Version 3.4.2
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center mb-6">
            <Monitor className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-medium text-white ml-2">Interface Settings</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-gray-300">Theme</h3>
                <p className="text-xs text-gray-400 mt-1">Choose the appearance of the application</p>
              </div>
              <div className="flex items-center">
                <button 
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                  className={`p-2 rounded-l-lg border border-r-0 transition ${
                    settings.theme === 'light' 
                      ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-400' 
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <Sun className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                  className={`p-2 rounded-r-lg border transition ${
                    settings.theme === 'dark' 
                      ? 'bg-blue-500/20 border-blue-500/30 text-blue-400' 
                      : 'bg-gray-700 border-gray-600 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  <Moon className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <ToggleSetting 
              label="Notifications"
              description="Enable or disable system notifications"
              icon={Bell}
              isActive={settings.notifications}
              onToggle={() => handleToggle('notifications')}
            />
            
            <ToggleSetting 
              label="Hide Username"
              description="Mask your username from other users"
              icon={Eye}
              isActive={settings.hideUsername}
              onToggle={() => handleToggle('hideUsername')}
            />
          </div>
        </div>
        
        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
          <div className="flex items-center mb-6">
            <Shield className="h-5 w-5 text-purple-400" />
            <h2 className="text-lg font-medium text-white ml-2">Security Settings</h2>
          </div>
          
          <div className="space-y-4">
            <ToggleSetting 
              label="Anti-Detection System"
              description="Prevent Roblox from detecting tool usage"
              icon={Shield}
              isActive={settings.antiDetection}
              onToggle={() => handleToggle('antiDetection')}
            />
            
            <ToggleSetting 
              label="Auto Update"
              description="Automatically update to latest version"
              icon={RefreshCw}
              isActive={settings.autoUpdate}
              onToggle={() => handleToggle('autoUpdate')}
            />
            
            <ToggleSetting 
              label="Encrypt Data"
              description="Encrypt all communications with the server"
              icon={Lock}
              isActive={settings.encryptData}
              onToggle={() => handleToggle('encryptData')}
            />
            
            <ToggleSetting 
              label="Auto Logout"
              description="Automatically logout after 30 minutes of inactivity"
              icon={Bell}
              isActive={settings.autoLogout}
              onToggle={() => handleToggle('autoLogout')}
            />
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700/50">
        <h2 className="text-lg font-medium text-white mb-4">Advanced Options</h2>
        
        <div className="space-y-4">
          <button className="w-full md:w-auto px-4 py-2 bg-purple-600/40 hover:bg-purple-600/60 border border-purple-500/30 rounded-lg text-sm font-medium text-purple-300 transition flex items-center justify-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Check for Updates
          </button>
          
          <div className="pt-4 border-t border-gray-700/50">
            <h3 className="text-sm font-medium text-gray-300 mb-2">System Information</h3>
            <div className="bg-gray-900/70 rounded-lg p-4 font-mono text-xs text-gray-400">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                <div>
                  <span className="text-gray-500">Version:</span> 3.4.2
                </div>
                <div>
                  <span className="text-gray-500">Release Date:</span> 2025-06-15
                </div>
                <div>
                  <span className="text-gray-500">License:</span> Premium
                </div>
                <div>
                  <span className="text-gray-500">Expiration:</span> 2026-06-15
                </div>
                <div>
                  <span className="text-gray-500">API Status:</span> <span className="text-green-400">Online</span>
                </div>
                <div>
                  <span className="text-gray-500">Security Level:</span> <span className="text-purple-400">Maximum</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-700/50">
            <p className="text-xs text-gray-500 italic">
              Note: This is a fictional application created for demonstration purposes only. It does not actually hack Roblox or provide any real functionality. Attempting to hack Roblox is against their Terms of Service and can result in account termination.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ToggleSettingProps {
  label: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  isActive: boolean;
  onToggle: () => void;
}

const ToggleSetting: React.FC<ToggleSettingProps> = ({ label, description, icon: Icon, isActive, onToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-start">
        <Icon className="h-5 w-5 text-gray-400 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-300">{label}</h3>
          <p className="text-xs text-gray-400 mt-1">{description}</p>
        </div>
      </div>
      <button 
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full border-2 transition ${
          isActive 
            ? 'bg-purple-600/50 border-purple-500/50' 
            : 'bg-gray-700 border-gray-600'
        }`}
      >
        <span 
          className={`inline-block h-4 w-4 transform rounded-full transition ${
            isActive ? 'translate-x-5 bg-purple-400' : 'translate-x-1 bg-gray-400'
          }`} 
        />
      </button>
    </div>
  );
};