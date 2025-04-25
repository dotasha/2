import React from 'react';
import { Home, PenTool as Tool, User, Settings, LogOut } from 'lucide-react';

interface SidebarProps {
  activePanel: string;
  onChangePanel: (panel: 'home' | 'tools' | 'profile' | 'settings') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activePanel, onChangePanel }) => {
  const navItems = [
    { id: 'home', label: 'Dashboard', icon: Home },
    { id: 'tools', label: 'Hack Tools', icon: Tool },
    { id: 'profile', label: 'User Finder', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="hidden md:flex md:flex-col w-64 bg-gray-900/80 backdrop-blur-lg border-r border-purple-500/20">
      <div className="h-full flex flex-col justify-between py-6">
        <nav className="px-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePanel === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onChangePanel(item.id as any)}
                className={`
                  w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-700/40 to-blue-700/20 text-white border border-purple-500/30' 
                    : 'text-gray-300 hover:bg-gray-800/60 hover:text-white'}
                `}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-purple-400' : 'text-gray-400'}`} />
                {item.label}
                {isActive && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-purple-400"></span>
                )}
              </button>
            );
          })}
        </nav>
        
        <div className="px-8 mt-auto">
          <button className="w-full flex items-center px-4 py-3 text-gray-400 hover:text-white rounded-lg text-sm font-medium transition-colors hover:bg-red-900/20 border border-transparent hover:border-red-500/30">
            <LogOut className="mr-3 h-5 w-5 text-red-400" />
            Logout
          </button>
          
          <div className="mt-6 pt-6 border-t border-gray-700/50">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center">
                <span className="text-xs font-bold">RP</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-white">HackerPro</p>
                <p className="text-xs text-gray-400">Premium License</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};