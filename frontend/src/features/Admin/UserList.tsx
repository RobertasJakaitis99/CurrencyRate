// src/features/Admin/UserList.tsx
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context";
import { getAllUsers } from "../../services/adminService";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

interface UserRow {
  _id: string;
  email: string;
  name?: string;
  role: "user" | "admin";
}

const UserList: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [rows, setRows] = useState<UserRow[]>([]);

  useEffect(() => {
    if (token) {
      getAllUsers(token).then(setRows);
    }
  }, [token]);

  const columns: GridColDef[] = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "email", headerName: "El. paštas", width: 200 },
    { field: "name", headerName: "Vardas", width: 150 },
    { field: "role", headerName: "Rolė", width: 100 },
  ];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" mb={2}>
        Vartotojų sąrašas
      </Typography>
      <DataGrid
        rows={rows}
        getRowId={(row) => row._id}
        columns={columns}
        autoHeight
      />
    </Box>
  );
};

export default UserList;
