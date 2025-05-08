import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  onClose: () => void;
  initial: {
    id: string;
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  };
  onSave: (amount: number) => void;
}

const EditHistoryModal: React.FC<Props> = ({
  open,
  onClose,
  initial,
  onSave,
}) => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(initial.amount);

  useEffect(() => {
    setAmount(initial.amount);
  }, [initial]);

  const handleSave = () => {
    if (amount <= 0 || isNaN(amount)) return;
    onSave(amount);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{t("history.editTitle")}</DialogTitle>
      <DialogContent>
        <TextField
          label={t("history.amount")}
          type="number"
          required
          inputProps={{ min: 0.01, step: 0.01 }}
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          fullWidth
          margin="normal"
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{t("common.cancel")}</Button>
        <Button onClick={handleSave} variant="contained">
          {t("common.save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditHistoryModal;
