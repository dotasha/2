import React, { useState } from 'react';
import { AuthScreen } from './components/AuthScreen';
import { Dashboard } from './pages/Dashboard';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-[system-ui]">
      {!isAuthenticated ? (
        <AuthScreen onLogin={handleLogin} />
      ) : (
        <Dashboard />
      )}
    </div>
  );
}

export default App;