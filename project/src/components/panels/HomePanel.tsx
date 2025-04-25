import React, { useState, useEffect } from 'react';
import { Shield, Database, Users, AlertTriangle, Server, Lock } from 'lucide-react';

interface HomePanelProps {
  onAddNotification: (message: string) => void;
}

export const HomePanel: React.FC<HomePanelProps> = ({ onAddNotification }) => {
  const [stats, setStats] = useState({
    onlineUsers: 0,
    bypassesActive: 0,
    robuxGenerated: 0,
    hackSuccess: 0
  });
  
  // Animate stats on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        onlineUsers: prev.onlineUsers < 2458 ? prev.onlineUsers + 37 : 2458,
        bypassesActive: prev.bypassesActive < 143 ? prev.bypassesActive + 3 : 143,
        robuxGenerated: prev.robuxGenerated < 94500 ? prev.robuxGenerated + 1500 : 94500,
        hackSuccess: prev.hackSuccess < 87 ? prev.hackSuccess + 1 : 87
      }));
    }, 100);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center space-x-2">
          <span className="text-xs font-medium text-purple-400">Last Update: Just now</span>
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Online Users"
          value={stats.onlineUsers.toLocaleString()}
          icon={Users}
          color="blue"
        />
        <StatCard 
          title="Bypasses Active"
          value={stats.bypassesActive.toLocaleString()}
          icon={Shield}
          color="purple"
        />
        <StatCard 
          title="Robux Generated"
          value={stats.robuxGenerated.toLocaleString()}
          icon={Database}
          color="green"
        />
        <StatCard 
          title="Hack Success Rate"
          value={`${stats.hackSuccess}%`}
          icon={Server}
          color="red"
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2 bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-100 mb-4">Security Status</h3>
          <div className="space-y-4">
            <StatusBar 
              label="Roblox Firewall" 
              percentage={65} 
              status="Partially Bypassed"
              color="yellow"
            />
            <StatusBar 
              label="Account Protection" 
              percentage={42} 
              status="Vulnerability Found"
              color="red"
            />
            <StatusBar 
              label="Robux Generator" 
              percentage={92} 
              status="Operational"
              color="green"
            />
            <StatusBar 
              label="Admin Commands" 
              percentage={23} 
              status="Limited Access"
              color="red"
            />
          </div>
          
          <button 
            className="mt-6 bg-purple-600/50 hover:bg-purple-700/50 text-white px-4 py-2 rounded-lg text-sm font-medium transition border border-purple-500/30"
            onClick={() => onAddNotification("Security scan initiated")}
          >
            Run Security Scan
          </button>
        </div>
        
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 shadow-lg">
          <h3 className="text-lg font-medium text-gray-100 mb-4">System Alerts</h3>
          
          <div className="space-y-4">
            <Alert 
              message="Roblox security patch detected"
              type="warning"
              time="2 hours ago"
            />
            <Alert 
              message="New vulnerability found in game client"
              type="success"
              time="5 hours ago"
            />
            <Alert 
              message="Multiple failed login attempts detected"
              type="error"
              time="Yesterday"
            />
            <Alert 
              message="System updated to v3.4.2"
              type="info"
              time="2 days ago"
            />
          </div>
          
          <button 
            className="mt-4 w-full bg-gray-700/50 hover:bg-gray-600/50 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium transition border border-gray-600/30"
            onClick={() => onAddNotification("Alert system checked")}
          >
            Check All Alerts
          </button>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.FC<{ className?: string }>;
  color: 'blue' | 'purple' | 'green' | 'red';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    purple: "bg-purple-500/10 border-purple-500/30 text-purple-400",
    green: "bg-green-500/10 border-green-500/30 text-green-400",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
  };
  
  return (
    <div className={`p-6 rounded-xl border ${colorClasses[color]} bg-gray-800/50 backdrop-blur-sm`}>
      <div className="flex items-center">
        <div className={`rounded-full p-3 ${colorClasses[color]} bg-opacity-20`}>
          <Icon className="h-6 w-6" />
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-white mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

interface StatusBarProps {
  label: string;
  percentage: number;
  status: string;
  color: 'green' | 'yellow' | 'red';
}

const StatusBar: React.FC<StatusBarProps> = ({ label, percentage, status, color }) => {
  const barColor = {
    green: "bg-green-500",
    yellow: "bg-yellow-500",
    red: "bg-red-500",
  };
  
  const textColor = {
    green: "text-green-400",
    yellow: "text-yellow-400",
    red: "text-red-400",
  };
  
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-300">{label}</span>
        <span className={`text-sm ${textColor[color]}`}>{status}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div 
          className={`h-2.5 rounded-full ${barColor[color]}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

interface AlertProps {
  message: string;
  type: 'success' | 'warning' | 'error' | 'info';
  time: string;
}

const Alert: React.FC<AlertProps> = ({ message, type, time }) => {
  const typeClasses = {
    success: {
      bg: "bg-green-500/10",
      border: "border-green-500/30",
      text: "text-green-400",
      icon: Lock,
    },
    warning: {
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/30",
      text: "text-yellow-400",
      icon: AlertTriangle,
    },
    error: {
      bg: "bg-red-500/10",
      border: "border-red-500/30",
      text: "text-red-400",
      icon: Shield,
    },
    info: {
      bg: "bg-blue-500/10",
      border: "border-blue-500/30",
      text: "text-blue-400",
      icon: Server,
    }
  };
  
  const { bg, border, text, icon: Icon } = typeClasses[type];
  
  return (
    <div className={`p-3 rounded-lg ${bg} ${border} border flex items-start`}>
      <Icon className={`h-5 w-5 ${text} mt-0.5`} />
      <div className="ml-3">
        <p className="text-sm text-gray-200">{message}</p>
        <p className="text-xs text-gray-400 mt-1">{time}</p>
      </div>
    </div>
  );
};