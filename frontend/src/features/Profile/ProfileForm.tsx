// src/features/Profile/ProfileForm.tsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { getUserProfile, updateUserProfile } from "../../services/userService";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import ChangePasswordButton from "./ChangePasswordButton";
import { useTranslation } from "react-i18next";

const ProfileForm: React.FC = () => {
  const { token } = useContext(AuthContext);
  const { t } = useTranslation();
  const [form, setForm] = useState({
    name: "",
    surname: "",
    country: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    if (token) {
      getUserProfile(token).then(setForm);
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token) await updateUserProfile(form, token);
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mt: 5 }}>
      <Typography variant="h6" mb={2}>
        {t("profile.title")}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label={t("profile.name")}
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("profile.surname")}
          name="surname"
          value={form.surname}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("profile.country")}
          name="country"
          value={form.country}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("profile.phone")}
          name="phone"
          value={form.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label={t("profile.email")}
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          disabled
        />
        <Box mt={2}>
          <Button type="submit" variant="contained">
            {t("profile.save")}
          </Button>
        </Box>
      </form>
      <Box mt={3}>
        <ChangePasswordButton />
      </Box>
    </Paper>
  );
};

export default ProfileForm;
