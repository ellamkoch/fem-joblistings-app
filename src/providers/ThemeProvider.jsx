// Provides global theme state and syncs it to root theme classes + localStorage.
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_THEME,
  isTheme,
  STORAGE_KEY,
  ThemeContext,
  THEME_CLASS_NAMES,
} from "@/constants/themeConstants";

const initialTheme = (defaultTheme) => {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const stored = localStorage.getItem(STORAGE_KEY);
  return isTheme(stored) ? stored : defaultTheme;
};

function resolveTheme(theme, matchesDarkPreference) {
  if (theme === "system") {
    return matchesDarkPreference ? "dark" : "light";
  }

  return theme;
}

function applyThemeClass(theme) {
  const root = document.documentElement;

  root.classList.remove(...THEME_CLASS_NAMES);

  if (theme !== "light") {
    root.classList.add(theme);
  }
}

function ThemeProvider({ children, defaultTheme = DEFAULT_THEME }) {
  const [theme, setThemeState] = useState(() => initialTheme(defaultTheme));

  const setTheme = useCallback(
    (nextTheme) => {
      setThemeState((currentTheme) => {
        if (!isTheme(nextTheme)) {
          return currentTheme;
        }

        return nextTheme;
      });
    },
    [],
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const applyResolvedTheme = () => {
      const resolvedTheme = resolveTheme(theme, mediaQuery.matches);

      if (typeof document !== "undefined") {
        applyThemeClass(resolvedTheme);
      }
    };

    applyResolvedTheme();

    const handleChange = () => {
      if (theme === "system") {
        applyResolvedTheme();
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, theme);
    }

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [theme]);

  const resolvedTheme = useMemo(() => {
    if (typeof document !== "undefined") {
      return resolveTheme(
        theme,
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      );
    }

    if (theme === "system") {
      return "light";
    }

    return theme;
  }, [theme]);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [resolvedTheme, setTheme, theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export { ThemeProvider };
