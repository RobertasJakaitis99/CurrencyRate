// src/features/Profile/PasswordChangeForm.tsx
import React, { useState, useContext } from "react";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { changePassword } from "../../services/userService";
import { AuthContext } from "../../context";
import { useTranslation } from "react-i18next";

const PasswordChangeForm: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { t } = useTranslation();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) {
      try {
        await changePassword(form, token);
        setMessage(t("password.success"));
      } catch {
        setMessage(t("password.error"));
      }
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 5 }}>
      <Typography variant="h6" mb={2}>
        {t("password.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          name="currentPassword"
          type="password"
          label={t("password.current")}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        <TextField
          name="newPassword"
          type="password"
          label={t("password.new")}
          fullWidth
          margin="normal"
          onChange={handleChange}
        />
        {message && <Typography color="primary">{message}</Typography>}
        <Box mt={2}>
          <Button type="submit" variant="contained">
            {t("password.button")}
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default PasswordChangeForm;
