import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogTitle, DialogContent, TextField, Button } from "@mui/material";
import MeasurementsTable from "./MeasurementsTable";
import { translations, type Lang } from "@/app/i18n";

interface MeasurementsTabProps {
  userId: string;
  lang: Lang;
}

export default function MeasurementsTab({ userId, lang }: MeasurementsTabProps) {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[lang];

  const columns = [
    { id: "date", label: t.measurementsColumnDate },
    { id: "weight", label: t.measurementsColumnWeight },
    { id: "neck", label: t.measurementsColumnNeck },
    { id: "arm", label: t.measurementsColumnArm },
    { id: "waist", label: t.measurementsColumnWaist },
    { id: "abdomen", label: t.measurementsColumnAbdomen },
    { id: "hip", label: t.measurementsColumnHip },
    { id: "thigh", label: t.measurementsColumnThigh },
    { id: "calfMuscle", label: t.measurementsColumnCalfMuscle }
  ];

  useEffect(() => {
    let active = true;
    async function fetchUserMeasurements() {
      setLoading(true);
      try {
        const res = await fetch(`/api/measurements?userId=${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (active) setMeasurements(Array.isArray(data) ? data : []);
        } else if (active) {
          setMeasurements([]);
        }
      } catch {
        if (active) setMeasurements([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchUserMeasurements();
    return () => { active = false };
  }, [userId]);

  // --- New: Modal/Edit Logic ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMeasurement, setEditingMeasurement] = useState<any | null>(null);
  const [formData, setFormData] = useState<any | null>(null);

  function handleOpenEdit(measurement: any) {
    setEditingMeasurement(measurement);
    // Format date as YYYY-MM-DD if possible
    let date = "";
    if (measurement.date) {
      const d = new Date(measurement.date);
      if (!isNaN(d.getTime())) {
        date = d.toISOString().slice(0, 10);
      }
    }
    setFormData({ ...measurement, date });
    setModalOpen(true);
  }
  function handleOpenAdd() {
    setEditingMeasurement(null);
    setFormData({
      date: "",
      weight: "",
      neck: "", arm: "", waist: "", abdomen: "", hip: "", thigh: "", calfMuscle: ""
    });
    setModalOpen(true);
  }
  async function handleDelete() {
    if (!editingMeasurement) return;
    await fetch(`/api/measurements/${editingMeasurement.id}`, { method: "DELETE" });
    setModalOpen(false);
    setEditingMeasurement(null);
    setFormData(null);
    // Refresh
    setLoading(true);
    const res = await fetch(`/api/measurements?userId=${userId}`);
    setMeasurements(res.ok ? await res.json() : []);
    setLoading(false);
  }
  async function handleSave() {
    // PATCH if editing, POST if adding
    const numFields = ["weight", "neck", "arm", "waist", "abdomen", "hip", "thigh", "calfMuscle"];
    const body = { ...formData };

    // Convert all numFields to number or null
    numFields.forEach((k) => {
      if (body[k] === "" || body[k] == null) {
        body[k] = null;
      } else {
        // Allow comma or dot for decimals, always send as number
        const val = typeof body[k] === "string" ? body[k].replace(",", ".") : body[k];
        const n = Number(val);
        body[k] = isNaN(n) ? null : n;
      }
    });

    let ok = false;
    if (editingMeasurement) {
      const resp = await fetch(`/api/measurements/${editingMeasurement.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      ok = resp.ok;
    } else {
      const resp = await fetch(`/api/measurements`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, userId }),
      });
      ok = resp.ok;
    }
    setModalOpen(false);
    setEditingMeasurement(null);
    setFormData(null);
    // Refresh
    setLoading(true);
    const res = await fetch(`/api/measurements?userId=${userId}`);
    setMeasurements(res.ok ? await res.json() : []);
    setLoading(false);
  }

  return (
    <Box sx={{ pt: 2 }}>
      <Box mb={2} textAlign="right">
        <button onClick={handleOpenAdd} style={{
          padding: "6px 14px",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: 4,
          fontWeight: 500,
          cursor: "pointer"
        }}>{t.measurementsAdd ?? "Add Measurement"}</button>
      </Box>
      <MeasurementsTable
        measurements={measurements}
        loading={loading}
        columns={columns}
        t={t}
        enableChart={true}
        onRowClick={handleOpenEdit}
      />
      {/* Measurement Modal */}
      <Dialog open={modalOpen} onClose={() => { setModalOpen(false); setEditingMeasurement(null); setFormData(null); }} maxWidth="xs" fullWidth>
        <DialogTitle>
          {editingMeasurement ? (t.measurementsEditTitle ?? "Edit Measurement") : (t.measurementsAddTitle ?? "New Measurement")}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                label={t.measurementsColumnDate}
                type="date"
                size="small"
                value={formData?.date || ""}
                onChange={e => setFormData((f: any) => ({ ...f, date: e.target.value }))}
                required
                InputLabelProps={{ shrink: true }}
                sx={{ width: 1 }}
              />
              {["weight", "neck", "arm", "waist", "abdomen", "hip", "thigh", "calfMuscle"].map(k => (
                <TextField
                  key={k}
                  label={(t as any)["measurementsColumn" + k.charAt(0).toUpperCase() + k.slice(1)]}
                  type="text"
                  inputMode="decimal"
                  size="small"
                  value={formData?.[k] ?? ""}
                  onChange={e => setFormData((f: any) => ({ ...f, [k]: e.target.value }))}
                  onBlur={e => {
                    let raw = e.target.value;
                    if (raw === "" || raw == null) {
                      setFormData((f: any) => ({ ...f, [k]: "" }));
                      return;
                    }
                    raw = raw.replace(",", ".").trim();
                    // Remove trailing . or , if present
                    raw = raw.replace(/[.,]$/, "");
                    let n = Number(raw);
                    // Accept null/empty if invalid or negative
                    if (isNaN(n) || n < 0) {
                      setFormData((f: any) => ({ ...f, [k]: "" }));
                    } else {
                      // Only keep up to one decimal (no rounding to int!)
                      n = Math.floor(n * 10) / 10;
                      setFormData((f: any) => ({ ...f, [k]: String(n) }));
                    }
                  }}
                  sx={{ width: 1 }}
                />
              ))}
              <Box display="flex" gap={2} justifyContent="flex-end">
                {editingMeasurement && (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={handleDelete}
                  >{t.measurementsDelete ?? "Delete"}</Button>
                )}
                <Button
                  onClick={() => { setModalOpen(false); setEditingMeasurement(null); setFormData(null); }}
                  color="inherit"
                  variant="outlined"
                >{t.measurementsModalCancel ?? "Cancel"}</Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                >{editingMeasurement ? (t.measurementsSave ?? "Update") : (t.measurementsModalAdd ?? "Add")}</Button>
              </Box>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
