"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Modal
} from "@mui/material";
import MeasurementsTable from "./MeasurementsTable";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import { translations, Lang } from "@/app/i18n";
import Snackbar from "@mui/material/Snackbar";
import TablePagination from "@mui/material/TablePagination";

import { useLang, useTranslations } from "../contexts/LangContext";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

import { LineChart } from '@mui/x-charts/LineChart';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';

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

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  // Snackbar for error/success states
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false, message: "", severity: "success"
  });

  // Chart dialog
  const [openGraph, setOpenGraph] = useState(false);
  const [graphField, setGraphField] = useState<string | null>(null);

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
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {
            setFormData((f: any) => ({ ...f, date: new Date().toISOString().slice(0, 10) }));
            setOpen(true);
          }}
        >
          {t.measurementsAdd}
        </Button>
      </Box>
      <MeasurementsTable
        measurements={measurements.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
        loading={loading}
        columns={columns.filter((col) => col.id !== "actions")}
        t={t}
      />
      <TablePagination
        component="div"
        count={measurements.length}
        page={page}
        onPageChange={(_, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={e => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        labelRowsPerPage=""
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} ${t.of} ${count !== -1 ? count : `more than ${to}`}`
        }
        rowsPerPageOptions={[5, 10, 25, 50]}
        sx={{ px: 2, py: 1 }}
      />

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
                {formLoading ? t.measurementsSaving : t.measurementsAdd}
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
      <Dialog open={openGraph && !!graphField} onClose={() => setOpenGraph(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {graphField && columns.find(c => c.id === graphField)?.label}
        </DialogTitle>
        <Box sx={{ px: 3, pb: 3 }}>
          {graphField && (() => {
            // Prepare data
            const ms = measurements
              .filter(m => m[graphField] !== undefined && m[graphField] !== null && m.date)
              .map(m => ({ date: m.date, value: Number(m[graphField]) }))
              .filter(d => !isNaN(d.value))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

            if (ms.length === 0) return <Typography>No data for this measurement.</Typography>;

            // Prepare dataset for OSS LineChart (array of points sorted by date)
            const dataset = ms.map(d => ({
              date: new Date(d.date),
              value: d.value,
            }));

            return (
              <Box sx={{
                background: "#fafbfd",
                boxShadow: 2,
                borderRadius: 2,
                px: 1,
                py: 0.5,
                cursor: "pointer",
                "& .MuiChartsAxis-tickLabel": { fill: "#424242" },
                "& .MuiChartsLegend-root": { display: "none" }
              }}>
                <LineChart
                  height={360}
                  series={[
                    {
                      data: dataset.map(d => d.value),
                      label: columns.find(c => c.id === graphField)?.label || "",
                      color: "#1565c0",
                      showMark: true,
                      baseline: 0,
                    }
                  ]}
                  xAxis={[
                    {
                      scaleType: "time",
                      data: dataset.map(d => d.date),
                      valueFormatter: (date: Date) => {
                        if (!(date instanceof Date)) date = new Date(date);
                        if (!date || isNaN(date.getTime())) return "";
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear();
                        return `${day}/${month}/${year}`;
                      },
                    }
                  ]}
                  yAxis={[
                    {
                      label: columns.find(c => c.id === graphField)?.label || "",
                      scaleType: "linear",
                    }
                  ]}
                  grid={{ vertical: true, horizontal: true }}
                  onClick={() => setOpenGraph(false)}
                />
              </Box>
            );
          })()}
        </Box>
      </Dialog>
    </Box>
  );
}
