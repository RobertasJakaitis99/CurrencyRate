// src/features/Auth/LoginForm.tsx
import React, { useState, useContext } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import api from "../../services/api";
import { useTranslation } from "react-i18next";

const LoginForm: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      dispatch({ type: "LOGIN", payload: { user, token } });
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);

      if (err.response) {
        console.error("Server response:", err.response.data);
        console.error("Status code:", err.response.status);

        if (err.response.status === 401) {
          setError(
            t("login.invalid_credentials") || "Neteisingi prisijungimo duomenys"
          );
        } else {
          setError(
            err.response.data.message ||
              t("login.error") ||
              "Prisijungimo klaida"
          );
        }
      } else if (err.request) {
        // Užklausa išsiųsta, bet negautas atsakymas
        console.error("No response received:", err.request);
        setError(
          t("login.server_error") || "Serveris neatsakė, bandykite vėliau"
        );
      } else {
        // Kažkas nutiko ruošiant užklausą
        console.error("Error message:", err.message);
        setError(t("login.network_error") || "Tinklo klaida");
      }
    }
  };

  return (
    <Box
      component={Paper}
      sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}
      elevation={3}
    >
      <Typography variant="h5" mb={3}>
        {t("login.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("login.email")}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label={t("login.password")}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && (
          <Typography color="error" variant="body2" mt={1}>
            {error}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          {t("login.button")}
        </Button>
      </form>
    </Box>
  );
};

export default LoginForm;
