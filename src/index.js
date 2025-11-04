import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Supprimer les erreurs ResizeObserver (warnings non bloquants)
const originalError = console.error;
console.error = (...args) => {
  if (
    typeof args[0] === 'string' &&
    args[0].includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return;
  }
  originalError.apply(console, args);
};

// Supprimer les erreurs ResizeObserver dans window.onerror
const originalOnerror = window.onerror;
window.onerror = (message, source, lineno, colno, error) => {
  if (
    typeof message === 'string' &&
    message.includes('ResizeObserver loop completed with undelivered notifications')
  ) {
    return true; // Empêche l'affichage de l'erreur
  }
  if (originalOnerror) {
    return originalOnerror(message, source, lineno, colno, error);
  }
  return false;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

