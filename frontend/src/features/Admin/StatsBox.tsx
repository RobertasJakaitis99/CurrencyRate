// src/features/Admin/StatsBox.tsx

import React from "react";
import { Paper, Typography } from "@mui/material";

interface Props {
  title: string;
  value: number;
}

const StatsBox: React.FC<Props> = ({ title, value }) => {
  return (
    <Paper sx={{ p: 3, width: 200, textAlign: "center" }}>
      <Typography variant="subtitle1" color="textSecondary">
        {title}
      </Typography>
      <Typography variant="h4">{value}</Typography>
    </Paper>
  );
};

export default StatsBox;
