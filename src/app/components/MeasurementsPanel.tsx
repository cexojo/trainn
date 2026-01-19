"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Modal, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { translations, Lang } from "@/app/i18n";
import Snackbar from "@mui/material/Snackbar";

import { useLang, useTranslations } from "../contexts/LangContext";

export default function MeasurementsPanel() {
  const lang = useLang();
  const t = useTranslations();

  const columns = [
    { id: "date", label: t.measurementsColumnDate },
    { id: "weight", label: t.measurementsColumnWeight },
    { id: "neck", label: t.measurementsColumnNeck },
    { id: "arm", label: t.measurementsColumnArm },
    { id: "waist", label: t.measurementsColumnWaist },
    { id: "abdomen", label: t.measurementsColumnAbdomen },
    { id: "hip", label: t.measurementsColumnHip },
    { id: "thigh", label: t.measurementsColumnThigh },
    { id: "calfMuscle", label: t.measurementsColumnCalfMuscle },
    { id: "actions", label: "" }
  ];
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const defaultFormData = {
    date: "",
    weight: "",
    neck: "",
    arm: "",
    waist: "",
    abdomen: "",
    hip: "",
    thigh: "",
    calfMuscle: "",
  };
  const [formData, setFormData] = useState<any>(defaultFormData);

  // Snackbar for error/success states
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success"
  });

  function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  async function fetchMeasurements() {
    try {
      const res = await fetch("/api/measurements");
      if (res.ok) {
        const data = await res.json();
        setMeasurements(data);
      } else {
        setMeasurements([]);
      }
    } catch (err) {
      setMeasurements([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeasurements();
  }, []);


  return (
    <Box sx={{ p: 2 }}>
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
        <Typography variant="h4">{t.measurementsTitle}</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
          {t.measurementsAdd}
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.id}>{col.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length}>{t.measurementsLoading}</TableCell>
              </TableRow>
            ) : measurements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length}>{t.measurementsEmpty}</TableCell>
              </TableRow>
            ) : (
              measurements.map((m) => (
                <TableRow key={m.id}>
                  <TableCell>{m.date ? m.date.slice(0,10) : ""}</TableCell>
                  <TableCell>{m.weight}</TableCell>
                  <TableCell>{m.neck}</TableCell>
                  <TableCell>{m.arm}</TableCell>
                  <TableCell>{m.waist}</TableCell>
                  <TableCell>{m.abdomen}</TableCell>
                  <TableCell>{m.hip}</TableCell>
                  <TableCell>{m.thigh}</TableCell>
                  <TableCell>{m.calfMuscle}</TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      color="error"
                      variant="outlined"
                      onClick={async () => {
                        if (!window.confirm(t.measurementsDeleteConfirm)) return;
                        try {
                          const res = await fetch("/api/measurements", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: m.id })
                          });
                          if (!res.ok) {
                            const r = await res.json();
                            setSnackbar({ open: true, message: r.error || t.measurementsDeleteError, severity: "error" });
                          } else {
                            fetchMeasurements();
                            setSnackbar({ open: true, message: t.measurementsDeleted, severity: "success" });
                          }
                        } catch {
                          setSnackbar({ open: true, message: t.measurementsDeleteError, severity: "error" });
                        }
                      }}
                    >
                      {t.measurementsDelete}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          bgcolor: "background.paper", borderRadius: 2, boxShadow: 24, p: 4, minWidth: 340
        }}>
          <Typography variant="h6" mb={2}>{t.measurementsModalTitle}</Typography>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setFormError("");
              setFormLoading(true);
              try {
                // Only include fields that have values
                const body: Record<string, any> = {
                  date: formData.date,
                };
                [
                  "weight",
                  "neck",
                  "arm",
                  "waist",
                  "abdomen",
                  "hip",
                  "thigh",
                  "calfMuscle"
                ].forEach((key) => {
                  if (formData[key] !== "" && formData[key] !== null && formData[key] !== undefined) {
                    body[key] = parseFloat(formData[key]);
                  }
                });
                const res = await fetch("/api/measurements", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(body),
                });
                if (!res.ok) {
                  const r = await res.json();
                  setFormError(r.error || "Error creating measurement");
                  setFormLoading(false);
                  return;
                }
                setOpen(false);
                setFormError("");
                setFormLoading(false);
                setFormData(defaultFormData);
                fetchMeasurements();
              } catch (err: any) {
                setFormError(t.measurementsSaveError);
                setFormLoading(false);
              }
            }}
          >
            <Box mb={2}>
              <TextField
                type="date"
                label={t.measurementsColumnDate}
                variant="outlined"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => setFormData((f: any) => ({ ...f, date: e.target.value }))}
                required
                sx={{ mb: 2 }}
              />
              <Box display="flex" flexDirection="column" gap={2}>
                {[
                  { id: "weight", label: t.measurementsColumnWeight },
                  { id: "neck", label: t.measurementsColumnNeck },
                  { id: "arm", label: t.measurementsColumnArm },
                  { id: "waist", label: t.measurementsColumnWaist },
                  { id: "abdomen", label: t.measurementsColumnAbdomen },
                  { id: "hip", label: t.measurementsColumnHip },
                  { id: "thigh", label: t.measurementsColumnThigh },
                  { id: "calfMuscle", label: t.measurementsColumnCalfMuscle }
                ].map((input) => (
                  <TextField
                    key={input.id}
                    type="number"
                    label={input.label}
                    inputProps={{
                      inputMode: "decimal",
                      step: "0.1",
                      min: 0,
                      pattern: "[0-9]*[.,]?[0-9]*" // allows dot/comma decimals for compatibility
                    }}
                    fullWidth
                    variant="outlined"
                    value={formData[input.id] || ""}
                    onChange={(e) =>
                      setFormData((f: any) => ({ ...f, [input.id]: e.target.value }))
                    }
                  />
                ))}
              </Box>
            </Box>
            {formError && (
              <Typography color="error" variant="body2" mb={1}>
                {formError}
              </Typography>
            )}
            <Box mt={2} textAlign="right" display="flex" justifyContent="flex-end" gap={1}>
              <Button onClick={() => { setOpen(false); setFormError(""); }} disabled={formLoading}>
                {t.measurementsModalCancel}
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formLoading}
              >
                {formLoading ? (lang === "es" ? "Guardando…" : "Saving…") : t.measurementsAdd}
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    <Snackbar
      open={snackbar.open}
      autoHideDuration={4000}
      onClose={() => setSnackbar(s => ({ ...s, open: false }))}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Box>
        <Typography
          sx={{
            color: snackbar.severity === "error" ? "#fff" : "inherit",
            bgcolor: snackbar.severity === "error" ? "#d32f2f" : "#43a047",
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 500,
          }}
        >
          {snackbar.message}
        </Typography>
      </Box>
    </Snackbar>
    </Box>
  );
}
