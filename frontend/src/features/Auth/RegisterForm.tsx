// src/features/Auth/RegisterForm.tsx
import React, { useState, useContext } from "react";
import { TextField, Button, Paper, Typography, Box } from "@mui/material";
import { AuthContext } from "../../context";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const RegisterForm: React.FC = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    country: "",
    phone: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Bazinė validacija
    if (form.password.length < 6) {
      setError(
        t("register.password_too_short") ||
          "Slaptažodis per trumpas (min. 6 simboliai)"
      );
      return;
    }

    if (!form.email.includes("@")) {
      setError(t("register.invalid_email") || "Neteisingas el. pašto formatas");
      return;
    }

    try {
      console.log("Submitting registration form:", {
        ...form,
        password: "***",
      });
      console.log("API URL:", import.meta.env.VITE_API_URL);

      const res = await api.post("/auth/register", form);

      console.log("Registration successful:", res.data);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);
      dispatch({ type: "LOGIN", payload: res.data });
      navigate("/converter");
    } catch (err: any) {
      console.error("Registration error:", err);

      if (err.response) {
        console.error("Server response:", err.response.data);
        console.error("Status code:", err.response.status);

        // Specifiniai klaidų pranešimai pagal statusą
        if (err.response.status === 409) {
          setError(
            t("register.email_exists") || "Toks el. paštas jau egzistuoja"
          );
        } else if (err.response.status === 400) {
          setError(
            err.response.data.message ||
              t("register.validation_error") ||
              "Validacijos klaida"
          );
        } else {
          setError(
            err.response.data.message ||
              t("register.error") ||
              "Registracijos klaida"
          );
        }
      } else if (err.request) {
        // Užklausa išsiųsta, bet negautas atsakymas
        console.error("No response received:", err.request);
        setError(
          t("register.no_response") || "Serveris neatsakė, bandykite vėliau"
        );
      } else {
        // Kažkas nutiko ruošiant užklausą
        console.error("Error message:", err.message);
        setError(t("register.network_error") || "Tinklo klaida");
      }
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h6" mb={2}>
        {t("register.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="name"
          label={t("register.name")}
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          name="surname"
          label={t("register.surname")}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="country"
          label={t("register.country")}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="phone"
          label={t("register.phone")}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="email"
          label={t("register.email")}
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        <TextField
          name="password"
          type="password"
          label={t("register.password")}
          fullWidth
          margin="normal"
          onChange={handleChange}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Box mt={2}>
          <Button type="submit" variant="contained" fullWidth>
            {t("register.button")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default RegisterForm;
