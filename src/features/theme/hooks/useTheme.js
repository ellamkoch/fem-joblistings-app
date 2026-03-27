// Custom hook for accessing global theme state that lets any component read and update the theme from Context
//imports
import { useContext } from "react";
import { ThemeContext } from "@/features/theme/context/themeConstants";

function useTheme() {
  const ctx = useContext(ThemeContext); //gets whatever value is inside ThemeContext.Provider
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  //error above is if this hook is used outside of ThemeProvider, provide this error.
  return ctx; //returns {theme, resolvedTheme, setTheme}
}

export { useTheme };
