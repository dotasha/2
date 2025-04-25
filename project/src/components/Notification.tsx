import React, { useState, useEffect } from 'react';
import { Bell, X } from 'lucide-react';

interface NotificationProps {
  message: string;
}

export const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 4500);
    
    return () => clearTimeout(timer);
  }, []);
  
  if (!isVisible) return null;
  
  return (
    <div className="max-w-xs bg-gray-900 border border-purple-500/30 rounded-lg shadow-lg backdrop-blur-lg animate-slide-in">
      <div className="p-4 flex">
        <div className="flex-shrink-0">
          <Bell className="h-5 w-5 text-purple-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-gray-300">{message}</p>
        </div>
        <button 
          className="ml-4 text-gray-400 hover:text-gray-200"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};