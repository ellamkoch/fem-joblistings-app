/* Boots the React app and mounts the global providers used across the UI. */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";

import "@styles/index.css";

import App from '@/App.jsx';

import { DEFAULT_THEME } from '@/features/theme/context/themeConstants';
import { ThemeProvider } from '@/features/theme/providers/ThemeProvider';
import { AuthProvider } from '@/features/auth/providers/AuthProvider';

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
