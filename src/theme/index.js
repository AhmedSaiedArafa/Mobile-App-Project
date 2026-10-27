import React, { createContext, useContext, useMemo, useState } from 'react';
import { useColorScheme } from 'react-native';
import { vars } from 'nativewind';
import { palettes, toCssVars } from './palette';

export { palettes };

// Pre-built NativeWind variable sets; the active one is applied at the app root and in every Modal.
const themeVars = { light: vars(toCssVars(palettes.light)), dark: vars(toCssVars(palettes.dark)) };

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const system = useColorScheme();
  const [override, setOverride] = useState(null);
  const mode = override ?? (system === 'dark' ? 'dark' : 'light');

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      colors: palettes[mode],
      themeVars: themeVars[mode],
      toggleTheme: () => setOverride(mode === 'dark' ? 'light' : 'dark'),
    }),
    [mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
