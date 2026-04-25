import { createContext, useContext } from 'react';








export const ThemeContext = createContext({
  darkMode: true,
  setDarkMode: (_: boolean) => {},
});








export const useTheme = () => useContext(ThemeContext);















