import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  PaletteMode,
  responsiveFontSizes,
  useMediaQuery,
} from "@mui/material";
import getCustomTheme from "../utils/themes/customTheme";
import { DARK_SCHEME_QUERY } from "../utils/constants";
import getDefaultTheme from "../utils/themes/defaultTheme";

interface ThemeContextType {
  themeMode: string;
  setThemeMode: React.Dispatch<React.SetStateAction<PaletteMode>>;
  showCustomTheme: boolean;
  setShowCustomTheme: React.Dispatch<React.SetStateAction<boolean>>;
  toggleThemeMode: () => void;
  toggleCustomTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

const useThemeContext = () => useContext(ThemeContext);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const isDarkOS = useMediaQuery(DARK_SCHEME_QUERY);
  const defaultThemeMode = isDarkOS ? "dark" : "light";
  const [themeMode, setThemeMode] = useState<PaletteMode>(defaultThemeMode);
  const [showCustomTheme, setShowCustomTheme] = useState<boolean>(false);
  let customTheme = createTheme(getCustomTheme(themeMode));
  customTheme = responsiveFontSizes(customTheme);
  let defaultTheme = createTheme(getDefaultTheme(themeMode));
  defaultTheme = responsiveFontSizes(defaultTheme);
  const THEME_VARIANT_KEY = "theme-variant";
  const THEME_MODE_KEY = "theme-mode";

  useEffect(() => {
    const storedMode = localStorage.getItem(THEME_MODE_KEY);
    const storedVariant = localStorage.getItem(THEME_VARIANT_KEY);
    setThemeMode(storedMode ? JSON.parse(storedMode) : defaultThemeMode);
    setShowCustomTheme(storedVariant ? JSON.parse(storedVariant) : false);
  }, []);

  const toggleThemeMode = () => {
    setThemeMode((prev) => {
      const newState = prev === "dark" ? "light" : "dark";
      localStorage.setItem(THEME_MODE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => {
      const newState = !prev;
      localStorage.setItem(THEME_VARIANT_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        toggleThemeMode,
        showCustomTheme,
        setShowCustomTheme,
        toggleCustomTheme,
      }}
    >
      <MuiThemeProvider theme={showCustomTheme ? customTheme : defaultTheme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, ThemeContext, useThemeContext };
