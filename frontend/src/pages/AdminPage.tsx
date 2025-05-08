// src/pages/AdminPage.tsx
import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context";
import { Box, Typography } from "@mui/material";
import UserList from "../features/Admin/UserList";
import StatsBox from "../features/Admin/StatsBox";
import { useTranslation } from "react-i18next";

const AdminPage: React.FC = () => {
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  if (!user || user.role !== "admin") {
    return (
      <>
        <Navbar />
        <Typography align="center" mt={5}>
          {t("admin.onlyAdmins")}
        </Typography>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" mb={3}>
          {t("admin.title")}
        </Typography>
        <Box display="flex" gap={3} mb={4}>
          <StatsBox title={t("admin.users")} value={12} />
          <StatsBox title={t("admin.records")} value={58} />
        </Box>
        <UserList />
      </Box>
      <Footer />
    </>
  );
};

export default AdminPage;
