import { useState } from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import ThemeSelect from '@/components/layout/ThemeSelect';
import { DEFAULT_THEME, STORAGE_KEY } from '@/contexts/themeConstants';
import { ThemeProvider } from '@/providers/ThemeProvider';

function mockMatchMedia(matches = false) {
  let currentMatches = matches;
  const listeners = new Set();

  window.matchMedia = () => {
    const mediaQueryList = {
      get matches() {
        return currentMatches;
      },
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      addEventListener: (_eventName, listener) => listeners.add(listener),
      removeEventListener: (_eventName, listener) => listeners.delete(listener),
      addListener: (listener) => listeners.add(listener),
      removeListener: (listener) => listeners.delete(listener),
      dispatchEvent: () => true,
    };

    return mediaQueryList;
  };

  return {
    setMatches(nextValue) {
      currentMatches = nextValue;
      listeners.forEach((listener) => listener({ matches: currentMatches }));
    },
  };
}

function LocationDisplay() {
  const location = useLocation();

  return <p data-testid="location-display">{location.pathname}</p>;
}

function ShellCounter() {
  const [count, setCount] = useState(0);

  return (
    <button
      type="button"
      data-testid="shell-counter"
      onClick={() => setCount((value) => value + 1)}
    >
      {count}
    </button>
  );
}

function renderThemeTree(defaultTheme = DEFAULT_THEME) {
  return render(
    <MemoryRouter initialEntries={['/bookmarks']}>
      <ThemeProvider defaultTheme={defaultTheme}>
        <ShellCounter />
        <LocationDisplay />
        <ThemeSelect />
      </ThemeProvider>
    </MemoryRouter>,
  );
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.className = '';
    mockMatchMedia(false);
  });

  it('restores a valid stored theme on first render', () => {
    localStorage.setItem(STORAGE_KEY, 'contrast');

    renderThemeTree();

    expect(screen.getByLabelText(/choose color theme/i)).toHaveValue('contrast');
    expect(document.documentElement).toHaveClass('contrast');
    expect(document.documentElement).not.toHaveClass('dark');
  });

  it('falls back to the configured default when storage is invalid or missing', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid-theme');

    renderThemeTree('light');

    expect(screen.getByLabelText(/choose color theme/i)).toHaveValue('light');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('contrast');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('switches themes in place and persists updates without navigation', async () => {
    const user = userEvent.setup();

    renderThemeTree();

    const selector = screen.getByLabelText(/choose color theme/i);
    const location = screen.getByTestId('location-display');
    const shellCounter = screen.getByTestId('shell-counter');

    expect(location).toHaveTextContent('/bookmarks');
    expect(selector).toHaveValue('system');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('contrast');

    await user.click(shellCounter);
    expect(shellCounter).toHaveTextContent('1');

    await user.selectOptions(selector, 'contrast');

    expect(selector).toHaveValue('contrast');
    expect(location).toHaveTextContent('/bookmarks');
    expect(screen.getByTestId('shell-counter')).toHaveTextContent('1');
    expect(document.documentElement).toHaveClass('contrast');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('contrast');

    await user.selectOptions(selector, 'light');

    expect(selector).toHaveValue('light');
    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('contrast');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('light');
  });

  it('follows the system color preference and updates live when the OS changes', () => {
    const matchMediaController = mockMatchMedia(true);

    renderThemeTree();

    expect(screen.getByLabelText(/choose color theme/i)).toHaveValue('system');
    expect(document.documentElement).toHaveClass('dark');
    expect(localStorage.getItem(STORAGE_KEY)).toBe('system');

    act(() => {
      matchMediaController.setMatches(false);
    });

    expect(document.documentElement).not.toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('contrast');
  });

  it('renders all supported selector options', () => {
    renderThemeTree();

    const selector = screen.getByLabelText(/choose color theme/i);
    const optionValues = Array.from(selector.querySelectorAll('option')).map(
      (option) => option.value,
    );

    expect(optionValues).toEqual(['system', 'light', 'dark', 'contrast']);
  });
});
