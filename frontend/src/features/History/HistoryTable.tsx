// src/features/History/HistoryTable.tsx
import React, { useContext, useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, gridClasses } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { AuthContext } from "../../context";
import {
  getHistory,
  updateHistoryItem,
  deleteHistoryItem,
} from "../../services/historyService";
import EditHistoryModal from "./EditHistoryModal";
import { Box, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const HistoryTable: React.FC = () => {
  const { token } = useContext(AuthContext);
  const [rows, setRows] = useState([]);
  const [editRow, setEditRow] = useState<any | null>(null);

  const fetchData = async () => {
    if (!token) return;
    try {
      const data = await getHistory(token);
      setRows(data);
    } catch (error) {
      console.error("Klaida gaunant istoriją:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const handleDelete = async (id: string) => {
    if (!token) return;
    try {
      await deleteHistoryItem(id, token);
      fetchData();
    } catch (error) {
      console.error("Klaida trinant įrašą:", error);
    }
  };

  const handleSave = async (amount: number) => {
    if (editRow && token) {
      try {
        await updateHistoryItem(editRow._id, { amount }, token);
        setEditRow(null);
        fetchData();
      } catch (error) {
        console.error("Klaida atnaujinant įrašą:", error);
      }
    }
  };

  const columns: GridColDef[] = [
    { field: "fromCurrency", headerName: "Iš", width: 100 },
    { field: "toCurrency", headerName: "Į", width: 100 },
    { field: "amount", headerName: "Suma", width: 100 },
    { field: "result", headerName: "Rezultatas", width: 120 },
    { field: "rate", headerName: "Kursas", width: 100 },
    {
      field: "actions",
      type: "actions",
      headerName: "Veiksmai",
      width: 150,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Redaguoti"
          onClick={() => setEditRow(params.row)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Ištrinti"
          onClick={() => handleDelete(params.row._id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ height: 500, width: "100%", p: 3 }}>
      <Typography variant="h6" mb={2}>
        Konversijų istorija
      </Typography>
      <DataGrid rows={rows} getRowId={(row) => row._id} columns={columns} />
      {editRow && (
        <EditHistoryModal
          open={!!editRow}
          onClose={() => setEditRow(null)}
          initial={editRow}
          onSave={handleSave}
        />
      )}
    </Box>
  );
};

export default HistoryTable;
