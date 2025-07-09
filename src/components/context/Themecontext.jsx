import { createContext, useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import getAppTheme from "../../theme/Index";

export const ThemeContextCustom = createContext(null);

const ThemeContextProvider = ({ children }) => {
  const [mode, setMode] = useState("system");

  // لتطبيق ثيم الجهاز إذا كان system
  const getPreferredMode = () => {
    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      return isDark ? "dark" : "light";
    }
    return mode;
  };

  // تحديث الثيم حسب وضع system او الوضع المختار
  const theme = getAppTheme(getPreferredMode());

  // لو بدك تخزن في localStorage وتقرأ من هناك عند التحميل
  useEffect(() => {
    const savedMode = localStorage.getItem("themeMode");
    if (savedMode) setMode(savedMode);
  }, []);

  // دالة تبديل الثيم مع إمكانية تحديد الوضع مباشرة
  const toggleTheme = (newMode) => {
    if (newMode) {
      setMode(newMode);
      localStorage.setItem("themeMode", newMode);
    } else {
      // تبديل بين الحالات الثلاثة لو ما في newMode
      const modes = ["light", "dark", "system"];
      const currentIndex = modes.indexOf(mode);
      const nextIndex = (currentIndex + 1) % modes.length;
      setMode(modes[nextIndex]);
      localStorage.setItem("themeMode", modes[nextIndex]);
    }
  };

  return (
    <ThemeContextCustom.Provider value={{ toggleTheme, mode, setMode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContextCustom.Provider>
  );
};

export default ThemeContextProvider;
