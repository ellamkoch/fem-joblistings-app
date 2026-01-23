// This file is where the React app starts, loads global styles, and wraps the app in providers (ThemeProvider).
//react imports
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
//style imports

import "@styles/index.css";

//app import
import App from '@/App.jsx';

import { ThemeProvider } from '@/providers/ThemeProviderhemeProvider';

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a root and render the App component inside StrictMode
// Wrap the app in theme provider so all components can access theme context (light/dark/contrast mode)
createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider defaultTheme=''>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
