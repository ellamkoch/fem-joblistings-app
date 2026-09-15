// Shared theme contract used by the provider, hook, and selector UI.

import { createContext } from 'react';

const ThemeContext = createContext(null);
const STORAGE_KEY = 'theme';
const DEFAULT_THEME = 'system';

const THEMES = ['light', 'dark', 'contrast', 'system'];

const THEME_OPTIONS = [
  { value: 'system', label: 'System' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'contrast', label: 'Contrast' },
];

const THEME_CLASS_NAMES = ['dark', 'contrast'];

function isTheme(value) {
  return THEMES.includes(value);
}

export {
  DEFAULT_THEME,
  isTheme,
  ThemeContext,
  STORAGE_KEY,
  THEMES,
  THEME_CLASS_NAMES,
  THEME_OPTIONS,
};
