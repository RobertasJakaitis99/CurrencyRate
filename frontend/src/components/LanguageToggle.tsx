import React, { useContext, MouseEvent } from "react";
import { UIContext } from "../context";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import i18n from "../i18n";

const LanguageToggle: React.FC = () => {
  const { language, dispatch } = useContext(UIContext);

  const handleChange = (
    event: MouseEvent<HTMLElement>,
    newLang: "lt" | "en" | null
  ) => {
    if (newLang) {
      dispatch({ type: "SET_LANGUAGE", payload: newLang });
      i18n.changeLanguage(newLang); // <- būtina, kad veiktų i18n
      localStorage.setItem("language", newLang); // <- išsaugoti
    }
  };

  return (
    <ToggleButtonGroup
      value={language}
      exclusive
      onChange={handleChange}
      size="small"
      color="primary"
    >
      <ToggleButton value="lt">LT</ToggleButton>
      <ToggleButton value="en">EN</ToggleButton>
    </ToggleButtonGroup>
  );
};

export default LanguageToggle;
