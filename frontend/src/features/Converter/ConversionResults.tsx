import React, { useContext, useState } from "react";
import { Typography, Box, Paper, Button, Snackbar, Alert } from "@mui/material";
import { AuthContext } from "../../context";
import { useTranslation } from "react-i18next";
import api from "../../services/api";

// Funkcija formatuoti skaičių su tūkstančių skyrikliais ir fiksuotu kiekiu skaičių po kablelio
const formatNumber = (num: number, decimals = 2) => {
  return new Intl.NumberFormat("lt-LT", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};

// Valiutų simboliai
const currencySymbols: Record<string, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  JPY: "¥",
  CHF: "CHF",
  // Galite pridėti daugiau simbolių pagal poreikį
};

interface Props {
  amount: number;
  from: string;
  to: string;
  result: number;
}

const ConversionResult: React.FC<Props> = ({ amount, from, to, result }) => {
  const { user, token } = useContext(AuthContext);
  const { t } = useTranslation();
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const fromSymbol = currencySymbols[from] || from;
  const toSymbol = currencySymbols[to] || to;

  // Apskaičiuojamas valiutos kursas
  const rate = result / amount;

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSaveToHistory = async () => {
    if (!token) {
      setSnackbar({
        open: true,
        message:
          t("converter.loginToSave") ||
          "Prisijunkite, kad galėtumėte išsaugoti istoriją",
        severity: "error",
      });
      return;
    }

    setSaving(true);

    try {
      // Sukuriame konversijos duomenų objektą
      const conversionData = {
        fromCurrency: from,
        toCurrency: to,
        amount,
        result,
        rate,
        date: new Date(),
      };

      // Išsiunčiame į serverį
      const response = await api.post("/conversions", conversionData);

      console.log("Saving conversion to history:", {
        from,
        to,
        amount,
        result,
      });

      setSnackbar({
        open: true,
        message:
          t("converter.savedSuccess") ||
          "Konversija sėkmingai išsaugota istorijoje",
        severity: "success",
      });
    } catch (error) {
      console.error("Error saving conversion:", error);
      setSnackbar({
        open: true,
        message: t("converter.saveError") || "Klaida išsaugant konversiją",
        severity: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ p: 3, mt: 3, bgcolor: "background.paper", borderRadius: 2 }}
      >
        <Typography variant="h6" align="center" gutterBottom>
          {formatNumber(amount)} {fromSymbol} = {formatNumber(result)}{" "}
          {toSymbol}
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          {t("converter.rate") || "Valiutos kursas"}: 1 {from} ={" "}
          {formatNumber(rate, 4)} {to}
        </Typography>

        {user && (
          <Box display="flex" justifyContent="center" mt={2}>
            <Button
              variant="outlined"
              size="small"
              onClick={handleSaveToHistory}
              disabled={saving}
            >
              {saving
                ? t("common.saving") || "Saugoma..."
                : t("converter.saveToHistory") || "Išsaugoti į istoriją"}
            </Button>
          </Box>
        )}
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default ConversionResult;
