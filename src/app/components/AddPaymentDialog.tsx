import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, Box, TextField, Typography, Button } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

interface AddPaymentDialogProps {
  open: boolean;
  onClose: () => void;
  userId: string;
  onCreated: (payment: any) => void;
  lang: Lang;
}

export default function AddPaymentDialog({ open, onClose, userId, onCreated, lang }: AddPaymentDialogProps) {
  const [dueDate, setDueDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState<string | null>(null);

  const handleCreate = async () => {
    setLoading(true);
    setErrMsg(null);
    const res = await fetch(`/api/payment/${userId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dueDate,
        amount: parseFloat(amount),
      }),
    });
    setLoading(false);
    if (res.ok) {
      const body = await res.json();
      onCreated(body.payment);
      setAmount("");
    } else {
      let msg = lang === "es" ? "Fallo al añadir el pago" : "Failed to add payment";
      try {
        const b = await res.json();
        if (b && b.error) msg = msg + ": " + b.error;
      } catch {}
      setErrMsg(msg);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{translations[lang].addPaymentDialogTitle}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
          <TextField
            type="date"
            label={translations[lang].addPaymentDialogDate}
            value={dueDate}
            onChange={e => setDueDate(e.target.value)}
            size="small"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            type="number"
            label={translations[lang].addPaymentDialogAmount}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            size="small"
            inputProps={{ min: 0, step: "0.01" }}
          />
          {errMsg && <Typography color="error">{errMsg}</Typography>}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button variant="text" onClick={onClose}>
            {translations[lang].addPaymentDialogCancel}
          </Button>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{ ml: 1 }}
            disabled={loading || !amount || !dueDate}
          >
            {translations[lang].addPaymentDialogAdd}
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
