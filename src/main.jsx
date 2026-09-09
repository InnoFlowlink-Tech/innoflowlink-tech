import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { normalizePath } from './pages.js';

const root = document.getElementById('root');
const app = <StrictMode><App pagePath={normalizePath(window.location.pathname)} /></StrictMode>;
if (root.hasChildNodes()) hydrateRoot(root, app);
else createRoot(root).render(app);
