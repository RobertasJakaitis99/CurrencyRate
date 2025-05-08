// src/components/Footer.tsx

import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      sx={{ textAlign: "center", py: 2, mt: 5, bgcolor: "background.paper" }}
    >
      <Typography variant="body2" color="textSecondary">
        © {new Date().getFullYear()} Valiutų Konverteris. Visos teisės saugomos.
      </Typography>
    </Box>
  );
};

export default Footer;
