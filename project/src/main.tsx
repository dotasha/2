import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

const root = createRoot(rootElement);

// Render without StrictMode in development for faster initial render
if (import.meta.env.DEV) {
  root.render(<App />);
} else {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}