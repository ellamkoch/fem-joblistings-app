import { useId } from 'react';

import { useTheme } from '@/hooks/useTheme';
import { THEME_OPTIONS } from '@/contexts/themeConstants';
import { NativeSelect, NativeSelectOption } from '@/components/ui/native-select';

function ThemeSelect() {
  const { theme, setTheme } = useTheme();
  const selectId = useId();

  return (
    <div className="flex items-center gap-3 rounded-full bg-card px-3 py-2 text-sm shadow-md backdrop-blur-sm">
      <label
        htmlFor={selectId}
        className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground"
      >
        Theme
      </label>
      <NativeSelect
        id={selectId}
        aria-label="Choose color theme"
        value={theme}
        onChange={(event) => setTheme(event.target.value)}
        className="min-w-32 rounded-full border-border bg-background text-foreground"
      >
        {THEME_OPTIONS.map((option) => (
          <NativeSelectOption key={option.value} value={option.value}>
            {option.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
    </div>
  );
}

export default ThemeSelect;
