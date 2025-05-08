// src/App.tsx
import React, { useContext, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider, UIProvider, UIContext } from "./context";
import AppRoutes from "./router";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./theme";
import i18n from "./i18n"; // <- svarbu

const AppInner: React.FC = () => {
  const { theme, language } = useContext(UIContext);

  // Keičiam i18n kalbą kai tik pasikeičia language iš context
  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return (
    <ThemeProvider theme={getTheme(theme)}>
      <CssBaseline />
      <BrowserRouter>
        <AppRoutes key={language} /> {/* Priverstinis atnaujinimas */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App: React.FC = () => (
  <AuthProvider>
    <UIProvider>
      <AppInner />
    </UIProvider>
  </AuthProvider>
);

export default App;
