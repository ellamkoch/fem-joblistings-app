// This file defines the Shared theme context + storage key (used by ThemeProvider/useTheme) to save the theme in localStorage.
//theme itself lives in ThemeProvider

import { createContext } from "react";// using Context as its a way to share state w/ react

const ThemeContext = createContext(null);//creates a shared container that may hold theme data
const STORAGE_KEY = 'theme'; // string constant that avoids hardcoding theme

export { ThemeContext, STORAGE_KEY };
