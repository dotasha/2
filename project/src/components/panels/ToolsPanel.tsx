import React, { useState } from 'react';
import { Lock, Shield, Database, Zap, FileCode, RefreshCw, Gift, Key } from 'lucide-react';

interface ToolsPanelProps {
  onAddNotification: (message: string) => void;
}

export const ToolsPanel: React.FC<ToolsPanelProps> = ({ onAddNotification }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Hack Tools</h1>
        <span className="px-3 py-1 text-xs font-medium bg-green-500/20 text-green-400 rounded-full border border-green-500/30 flex items-center">
          <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
          SYSTEMS ONLINE
        </span>
      </div>
      
      <p className="text-sm text-gray-400 bg-purple-600/10 border border-purple-500/20 p-4 rounded-lg">
        <span className="font-semibold text-purple-400">Access granted: </span>
        All hacking tools are available. Use them responsibly and avoid detection.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ToolCard 
          title="Robux Generator" 
          description="Generate unlimited Robux to your account"
          icon={Database}
          color="green"
          status="Active"
          onUse={() => onAddNotification("Robux Generator activated")}
        />
        
        <ToolCard 
          title="Password Cracker" 
          description="Bypass account passwords"
          icon={Key}
          color="red"
          status="Risky"
          onUse={() => onAddNotification("Password Cracker initialized")}
        />
        
        <ToolCard 
          title="Admin Panel Access" 
          description="Gain admin privileges in games"
          icon={Shield}
          color="purple"
          status="Limited"
          onUse={() => onAddNotification("Admin Panel access attempt initiated")}
        />
        
        <ToolCard 
          title="Item Unlocker" 
          description="Unlock all premium items for free"
          icon={Lock}
          color="blue"
          status="Active"
          onUse={() => onAddNotification("Item Unlocker searching database...")}
        />
        
        <ToolCard 
          title="Script Injector" 
          description="Run custom scripts in any game"
          icon={FileCode}
          color="yellow"
          status="Ready"
          onUse={() => onAddNotification("Script Injector loaded")}
        />
        
        <ToolCard 
          title="Anti-Ban System" 
          description="Prevent account termination"
          icon={Shield}
          color="green"
          status="Active"
          onUse={() => onAddNotification("Anti-Ban System enabled")}
        />
        
        <ToolCard 
          title="Free Gamepass" 
          description="Unlock all game passes"
          icon={Gift}
          color="purple"
          status="Beta"
          onUse={() => onAddNotification("Game Pass Unlocker scanning games")}
        />
        
        <ToolCard 
          title="Server Crasher" 
          description="Force disconnect all players"
          icon={Zap}
          color="red"
          status="Extreme Risk"
          onUse={() => onAddNotification("Server Crasher blocked: Too risky")}
        />
        
        <ToolCard 
          title="Account Recovery" 
          description="Restore banned accounts"
          icon={RefreshCw}
          color="blue"
          status="Limited"
          onUse={() => onAddNotification("Account Recovery tool activated")}
        />
      </div>
    </div>
  );
};

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.FC<{ className?: string }>;
  color: 'green' | 'red' | 'blue' | 'purple' | 'yellow';
  status: string;
  onUse: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  color, 
  status,
  onUse
}) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const colorClasses = {
    green: {
      card: "border-green-500/30 hover:border-green-500/50",
      bg: "bg-green-500/10",
      text: "text-green-400"
    },
    red: {
      card: "border-red-500/30 hover:border-red-500/50",
      bg: "bg-red-500/10",
      text: "text-red-400"
    },
    blue: {
      card: "border-blue-500/30 hover:border-blue-500/50",
      bg: "bg-blue-500/10",
      text: "text-blue-400"
    },
    purple: {
      card: "border-purple-500/30 hover:border-purple-500/50",
      bg: "bg-purple-500/10",
      text: "text-purple-400"
    },
    yellow: {
      card: "border-yellow-500/30 hover:border-yellow-500/50",
      bg: "bg-yellow-500/10",
      text: "text-yellow-400"
    }
  };
  
  const handleUse = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onUse();
    }, 1500);
  };
  
  return (
    <div className={`bg-gray-800/60 backdrop-blur-sm rounded-xl border ${colorClasses[color].card} p-5 transition hover:shadow-lg hover:bg-gray-800/80`}>
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-lg ${colorClasses[color].bg} ${colorClasses[color].text}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="ml-3">
          <h3 className="font-medium text-white">{title}</h3>
          <span className={`text-xs ${colorClasses[color].text}`}>{status}</span>
        </div>
      </div>
      
      <p className="text-sm text-gray-400 mb-4">{description}</p>
      
      <button 
        onClick={handleUse}
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-lg text-sm font-medium border transition
          ${isLoading 
            ? 'bg-gray-700 border-gray-600 text-gray-400 cursor-not-allowed' 
            : `bg-gray-700/50 hover:bg-gray-600/50 text-white border-${color}-500/30 hover:border-${color}-500/50`}
        `}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </div>
        ) : (
          'Use Tool'
        )}
      </button>
    </div>
  );
};