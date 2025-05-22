import { darkTheme, lightTheme } from '@tocode/ui';
import type { Theme } from '@tocode/ui';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance, useColorScheme } from 'react-native';

type ThemeContextData = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextData>({
  theme: lightTheme,
  toggleTheme: () => {
    return;
  },
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const system = useColorScheme();
  const [mode, setMode] = useState<'light' | 'dark'>(system || 'light');

  useEffect(() => {
    const sub = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) setMode(colorScheme);
    });
    return () => sub.remove();
  }, []);

  const theme = useMemo<Theme>(
    () => (mode === 'dark' ? darkTheme : lightTheme),
    [mode]
  );
  const toggleTheme = () => setMode((m) => (m === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
