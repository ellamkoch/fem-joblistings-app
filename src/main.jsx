/**
 * Boots the React app and mounts the global providers used across the UI.
 *
 * Sets up the provider hierarchy in the following order:
 * 1. BrowserRouter - enables client-side routing
 * 2. AuthProvider - manages authentication state and persistence
 * 3. ThemeProvider - manages theme selection (light, dark, system)
 * 4. App - root application component
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import '@styles/index.css';

import App from '@/App.jsx';

import { DEFAULT_THEME } from '@/contexts/themeConstants';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/providers/AuthProvider';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme={DEFAULT_THEME}>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
