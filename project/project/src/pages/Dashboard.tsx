import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { HomePanel } from '../components/panels/HomePanel';
import { ToolsPanel } from '../components/panels/ToolsPanel';
import { ProfilePanel } from '../components/panels/ProfilePanel';
import { SettingsPanel } from '../components/panels/SettingsPanel';
import { Terminal } from '../components/Terminal';
import { Notification } from '../components/Notification';

type Panel = 'home' | 'tools' | 'profile' | 'settings';

export const Dashboard: React.FC = () => {
  const [activePanel, setActivePanel] = useState<Panel>('home');
  const [notifications, setNotifications] = useState<string[]>([]);
  const [showTerminal, setShowTerminal] = useState(false);

  // Function to add a notification
  const addNotification = (message: string) => {
    setNotifications(prev => [...prev, message]);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n !== message));
    }, 5000);
  };

  useEffect(() => {
    // Add some fake notifications after login
    const messages = [
      "Connection established to Roblox servers",
      "User data successfully retrieved",
      "Bypassing security protocols...",
      "Access granted to premium features"
    ];
    
    let delay = 1000;
    messages.forEach(message => {
      setTimeout(() => {
        addNotification(message);
      }, delay);
      delay += 2500;
    });
  }, []);

  const renderPanel = () => {
    switch (activePanel) {
      case 'home':
        return <HomePanel onAddNotification={addNotification} />;
      case 'tools':
        return <ToolsPanel onAddNotification={addNotification} />;
      case 'profile':
        return <ProfilePanel onAddNotification={addNotification} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <HomePanel onAddNotification={addNotification} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-black to-gray-800">
      <Header 
        toggleTerminal={() => setShowTerminal(prev => !prev)}
        terminalOpen={showTerminal}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          activePanel={activePanel}
          onChangePanel={setActivePanel}
        />
        
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            {renderPanel()}
          </div>
        </main>
      </div>
      
      {showTerminal && (
        <Terminal onClose={() => setShowTerminal(false)} />
      )}
      
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        {notifications.map((message, index) => (
          <Notification key={index} message={message} />
        ))}
      </div>
    </div>
  );
};