// src/features/Profile/ChangePasswordButton.tsx

import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ChangePasswordButton: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outlined" onClick={() => navigate("/change-password")}>
      Keisti slaptažodį
    </Button>
  );
};

export default ChangePasswordButton;
