// ThemeContextProvider.jsx
import { createContext, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getAppTheme from "../../theme/Index"; // عدّل المسار حسب مكان الملف

export const ThemeContextCustom = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = getAppTheme(mode);

  return (
    <ThemeContextCustom.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContextCustom.Provider>
  );
};

export default ThemeContextProvider;
