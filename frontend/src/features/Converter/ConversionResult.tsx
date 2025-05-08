// src/features/Converter/ConversionResult.tsx
import React, { useContext } from "react";
import { Typography, Box, Paper, Button } from "@mui/material";
import { AuthContext } from "../../context";
import { useTranslation } from "react-i18next";

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
  const { user } = useContext(AuthContext);
  const { t } = useTranslation();

  const fromSymbol = currencySymbols[from] || from;
  const toSymbol = currencySymbols[to] || to;

  // Apskaičiuojamas valiutos kursas
  const rate = result / amount;

  return (
    <Paper
      elevation={2}
      sx={{ p: 3, mt: 3, bgcolor: "background.paper", borderRadius: 2 }}
    >
      <Typography variant="h6" align="center" gutterBottom>
        {formatNumber(amount)} {fromSymbol} = {formatNumber(result)} {toSymbol}
      </Typography>

      <Typography variant="body2" align="center" color="text.secondary">
        {t("converter.rate")}: 1 {from} = {formatNumber(rate, 4)} {to}
      </Typography>

      {user && (
        <Box display="flex" justifyContent="center" mt={2}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => {
              // Čia būtų logika, kuri išsaugo konversiją į istoriją
              console.log("Saving conversion to history:", {
                from,
                to,
                amount,
                result,
              });
              // Implementuoti API iškvietimą į jūsų backend
            }}
          >
            {t("converter.saveToHistory")}
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default ConversionResult;
