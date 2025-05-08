// src/features/Converter/ConverterForm.tsx
import React, { useEffect, useState } from "react";
import {
  TextField,
  MenuItem,
  Button,
  Box,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import { getSymbols, convertCurrency } from "../../services/conversionService";
import ConversionResult from "./ConversionResult";
import { useTranslation } from "react-i18next";

interface SymbolsType {
  [key: string]: { description: string };
}

const ConverterForm: React.FC = () => {
  const [symbols, setSymbols] = useState<SymbolsType>({});
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("USD");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchSymbols = async () => {
      try {
        setLoading(true);
        const data = await getSymbols();

        // Patikrinti, ar data yra objektas ir turi symbols lauką
        if (data && typeof data === "object" && data.symbols) {
          setSymbols(data.symbols);
          setError(null);
        } else {
          console.error("Unexpected API response format:", data);
          setSymbols({});
          setError(
            "Nepavyko gauti valiutų sąrašo. Netinkamas API atsakymo formatas."
          );
        }
      } catch (err) {
        console.error("Error fetching symbols:", err);
        setSymbols({});
        setError("Nepavyko gauti valiutų sąrašo. Bandykite vėliau.");
      } finally {
        setLoading(false);
      }
    };

    fetchSymbols();
  }, []);

  const handleConvert = async () => {
    try {
      setLoading(true);
      const res = await convertCurrency(from, to, amount);

      // Patikrinti, ar result yra skaičius
      if (res && typeof res === "number") {
        setResult(res);
        setError(null);
      } else if (
        res &&
        typeof res === "object" &&
        res.result &&
        typeof res.result === "number"
      ) {
        // Kartais API gali grąžinti objektą su result lauku
        setResult(res.result);
        setError(null);
      } else {
        console.error("Unexpected conversion result format:", res);
        setResult(null);
        setError(
          "Nepavyko atlikti konversijos. Netinkamas API atsakymo formatas."
        );
      }
    } catch (err) {
      console.error("Error converting currency:", err);
      setResult(null);
      setError("Nepavyko atlikti konversijos. Bandykite vėliau.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 5 }}>
      <Typography variant="h5" mb={3}>
        {t("converter.title") || "Valiutų konverteris"}
      </Typography>

      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}

      {loading && Object.keys(symbols).length === 0 ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              select
              label={t("converter.from") || "Iš"}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              fullWidth
              disabled={Object.keys(symbols).length === 0}
            >
              {Object.keys(symbols).map((code) => (
                <MenuItem key={code} value={code}>
                  {code} - {symbols[code].description}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              select
              label={t("converter.to") || "Į"}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              fullWidth
              disabled={Object.keys(symbols).length === 0}
            >
              {Object.keys(symbols).map((code) => (
                <MenuItem key={code} value={code}>
                  {code} - {symbols[code].description}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <TextField
            label={t("converter.amount") || "Suma"}
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            fullWidth
            margin="normal"
            inputProps={{ min: 0.01, step: 0.01 }}
          />
          <Button
            onClick={handleConvert}
            variant="contained"
            fullWidth
            disabled={loading || Object.keys(symbols).length === 0}
            sx={{ mt: 2 }}
          >
            {loading ? (
              <CircularProgress size={24} />
            ) : (
              t("converter.button") || "Konvertuoti"
            )}
          </Button>

          {result !== null && !loading && (
            <ConversionResult
              amount={amount}
              from={from}
              to={to}
              result={result}
            />
          )}
        </>
      )}
    </Paper>
  );
};

export default ConverterForm;
