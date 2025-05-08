// src/pages/NotFoundPage.tsx

import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Box textAlign="center" mt={5}>
        <Typography variant="h3">404</Typography>
        <Typography variant="h5">{t("notFound")}</Typography>
      </Box>
      <Footer />
    </>
  );
};

export default NotFoundPage;
