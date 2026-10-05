import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Preload fonts for Lumen Night Foundry
const fontLinks = [
  { href: 'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Geist:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet', crossOrigin: 'anonymous' as const },
];

if (typeof document !== 'undefined') {
  fontLinks.forEach(({ href, rel, crossOrigin }) => {
    const link = document.createElement('link');
    link.href = href;
    link.rel = rel;
    link.crossOrigin = crossOrigin;
    document.head.appendChild(link);
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);