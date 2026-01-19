"use client";
import React, { useEffect, useState } from "react";
import {
  Box, Typography, Button, Modal, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { translations, Lang } from "@/app/i18n";

const columns = [
  { id: "date", label: "Fecha" },
  { id: "weight", label: "Peso" },
  { id: "neck", label: "Cuello" },
  { id: "arm", label: "Brazo" },
  { id: "waist", label: "Cintura" },
  { id: "abdomen", label: "Abdomen" },
  { id: "hip", label: "Cadera" },
  { id: "thigh", label: "Muslo" },
  { id: "calfMuscle", label: "Gemelo" },
  { id: "actions", label: "" }
];

export default function MeasurementsPage() {
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

  // Helper to get 'elena_auth_token' from cookies
  function getCookie(name: string) {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? match[2] : null;
  }

  // Expose fetchMeasurements externally for refresh after add
  async function fetchMeasurements() {
    try {
      // Get token, decode to extract user id
      const token = getCookie("elena_auth_token");
      let userId = null;
      if (token) {
        try {
          // Decode JWT on client-side (header.payload.signature), get 2nd part
          const payload = JSON.parse(atob(token.split(".")[1]));
          userId = payload.id;
        } catch {}
      }
      if (!userId) {
        setMeasurements([]);
        setLoading(false);
        return;
      }
      const res = await fetch(`/api/measurements/${userId}`);
      const data = await res.json();
      setMeasurements(data);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMeasurements();
  }, []);
  // Language detection: fallback to "es" if not found
  const lang: Lang = (typeof navigator !== 'undefined' && navigator.language?.startsWith("es")) ? "es" : "en";
  const t = translations[lang];

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
                <TableCell colSpan={columns.length}>{lang === "es" ? "Cargando…" : "Loading…"}</TableCell>
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
                        if (!window.confirm(lang === "es"
                          ? "¿Eliminar esta medición?"
                          : "Delete this measurement?"))
                          return;
                        try {
                          const res = await fetch("/api/measurements", {
                            method: "DELETE",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ id: m.id })
                          });
                          if (!res.ok) {
                            const r = await res.json();
                            alert(r.error || "Error deleting");
                          } else {
                            fetchMeasurements();
                          }
                        } catch {
                          alert("Error deleting");
                        }
                      }}
                    >
                      {lang === "es" ? "Borrar" : "Delete"}
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
                const token = getCookie("elena_auth_token");
                let userId = null;
                if (token) {
                  try {
                    const payload = JSON.parse(atob(token.split(".")[1]));
                    userId = payload.id;
                  } catch {}
                }
                if (!userId) {
                  setFormError("No user id");
                  setFormLoading(false);
                  return;
                }
                const body = {
                  userId,
                  date: formData.date,
                  weight: parseFloat(formData.weight),
                  neck: parseFloat(formData.neck),
                  arm: parseFloat(formData.arm),
                  waist: parseFloat(formData.waist),
                  abdomen: parseFloat(formData.abdomen),
                  hip: parseFloat(formData.hip),
                  thigh: parseFloat(formData.thigh),
                  calfMuscle: parseFloat(formData.calfMuscle),
                };
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
                // Refresh measurements list
                fetchMeasurements();
              } catch (err: any) {
                setFormError("Error saving measurement");
                setFormLoading(false);
              }
            }}
          >
            <Box mb={2}>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData((f: any) => ({ ...f, date: e.target.value }))}
                required
                style={{ width: "100%", padding: "8px", marginBottom: 8, borderRadius: 4, border: "1px solid #ccc" }}
              />
              <Box display="flex" flexDirection="column" gap={1}>
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
                  <input
                    key={input.id}
                    type="number"
                    inputMode="decimal"
                    step="any"
                    min="0"
                    placeholder={input.label}
                    value={formData[input.id] || ""}
                    onChange={(e) =>
                      setFormData((f: any) => ({ ...f, [input.id]: e.target.value }))
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "8px",
                      borderRadius: 4,
                      border: "1px solid #ccc",
                      fontSize: 16,
                    }}
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
    </Box>
  );
}
