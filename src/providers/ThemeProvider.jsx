// Provides global theme state (light/dark/system) and syncs it to Tailwind `dark` + localStorage.
import { useEffect, useMemo, useState } from "react";
import { STORAGE_KEY, ThemeContext } from "@/constants/themeConstants";

// If no theme is saved yet, fall back to the default ("system" by default).
const initialTheme = (defaultTheme) => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored || defaultTheme; // use saved theme if it exists, otherwise use default
};

function ThemeProvider({ children, defaultTheme = "system" }) {
  // Only read localStorage once (on mount) to set the initial theme.
  const [theme, setTheme] = useState(() => initialTheme(defaultTheme));

  // Runs whenever theme changes: updates <html> class + localStorage, and handles system mode.
  useEffect(() => {
    const root = document.documentElement; // the <html> element (Tailwind dark mode uses this)
    const mql = window.matchMedia("(prefers-color-scheme: dark)"); // watches OS dark-mode preference
    //mql = media query

    // `resolved` is the actual theme we apply ("light" or "dark"), even if theme is "system".
    const resolved =
      theme === "system" ? (mql.matches ? "dark" : "light") : theme;

    root.classList.toggle("dark", resolved === "dark"); // adds/removes the "dark" class on <html>
    localStorage.setItem(STORAGE_KEY, theme); // saves the user's choice for next refresh

    // If following the system, listen for OS theme changes and update immediately.
    if (theme === "system") {
      const onChange = (e) => root.classList.toggle("dark", e.matches);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange); // cleanup prevents duplicate listeners
    }
  }, [theme]); // dependency array: re-runs effect when theme changes

  // Keep the context value object stable unless `theme` changes (avoids extra re-renders).
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  // Makes `theme` and `setTheme` available to any child component via useTheme().
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeProvider };
