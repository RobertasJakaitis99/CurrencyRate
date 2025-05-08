// src/theme/index.ts

import { createTheme } from "@mui/material";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            background: { default: "#f4f6f8" },
            primary: { main: "#1976d2" },
            secondary: { main: "#424242" },
          }
        : {
            background: { default: "#121212" },
            primary: { main: "#90caf9" },
            secondary: { main: "#eeeeee" },
          }),
    },
  });
