
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

console.log("ZenSleep: Initializing application...");

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("ZenSleep: Root element not found!");
} else {
  try {
    const root = createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
    console.log("ZenSleep: Application rendered successfully.");
  } catch (error) {
    console.error("ZenSleep: Rendering failed:", error);
    rootElement.innerHTML = `<div style="padding: 20px; color: red;">Failed to load ZenSleep. Please check console.</div>`;
  }
}
