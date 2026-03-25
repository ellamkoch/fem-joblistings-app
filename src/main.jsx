// main.jsx
// Boots the React app and mounts the global providers used across the UI.
//react imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
//style imports

import "@styles/index.css";

//app import
import App from '@/App.jsx';

import { ThemeProvider } from '@/providers/ThemeProvider';
import { AuthProvider } from '@/auth/AuthProvider';

const rootElement = document.getElementById('root');

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme='dark'>
          <App />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
