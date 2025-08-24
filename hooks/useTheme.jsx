import { createContext, useContext, useState } from "react";

export const lightTheme = {
  bg: "cornsilk",
  card: "#ffffff",
  text: "purple",
  textMuted: "#6b6b6b",
  accent: "purple",
  accentSoft: "#a488d9",
  border: "rgba(128,0,128,0.15)",
  inputBg: "#fff",
  progressTrack: "rgba(128,0,128,0.15)",
  progressFill: "purple",
  warn: "#F5A524",
  danger: "#EF4444",
  shadow: "rgba(0,0,0,0.08)",
};

export const darkTheme = {
  bg: "#2f2f2f",
  card: "#3a3a3a",
  text: "#f5f5f5",
  textMuted: "#cfcfcf",
  accent: "#c5a3ff",
  accentSoft: "#b898ff",
  border: "rgba(255,255,255,0.08)",
  inputBg: "#444",
  progressTrack: "rgba(255,255,255,0.15)",
  progressFill: "#c5a3ff",
  warn: "#F59E0B",
  danger: "#F87171",
  shadow: "rgba(0,0,0,0.35)",
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const theme = isDarkMode ? darkTheme : lightTheme;
  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, setIsDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);