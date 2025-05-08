import React, { useContext } from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { AuthContext } from "../context";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import Clock from "./Clock";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  return (
    <AppBar position="static" color="default" elevation={1}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={2}>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {t("navbar.title")}
          </Typography>
          <Clock />
          {/* Pridėta tiesioginė navigacija į konverterį */}
          <Button
            component={Link}
            to="/converter"
            color="primary"
            sx={{ ml: 2 }}
          >
            {t("navbar.converter") || "Konverteris"}
          </Button>
          {user && (
            <Button component={Link} to="/history" color="primary">
              {t("navbar.history") || "Istorija"}
            </Button>
          )}
        </Box>
        <Box display="flex" alignItems="center" gap={2}>
          <ThemeToggle />
          <LanguageToggle />
          {user ? (
            <>
              <Typography>{user.email}</Typography>
              {user.role === "admin" && (
                <Button variant="outlined" component={Link} to="/admin">
                  {t("navbar.admin") || "Admin"}
                </Button>
              )}
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleLogout}
              >
                {t("navbar.logout")}
              </Button>
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/profile"
              >
                {t("navbar.profile")}
              </Button>
            </>
          ) : (
            <>
              <Button variant="outlined" component={Link} to="/login">
                {t("navbar.login")}
              </Button>
              <Button variant="contained" component={Link} to="/register">
                {t("navbar.register")}
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
