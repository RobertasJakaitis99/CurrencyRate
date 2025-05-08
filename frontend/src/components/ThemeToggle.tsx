// src/components/ThemeToggle.tsx
import React, { useContext } from "react";
import { UIContext } from "../context";
import { Switch, Typography } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";

const ThemeToggle: React.FC = () => {
  const { theme, dispatch } = useContext(UIContext);

  const handleToggle = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
      <LightMode />
      <Switch checked={theme === "dark"} onChange={handleToggle} />
      <DarkMode />
    </div>
  );
};

export default ThemeToggle;
