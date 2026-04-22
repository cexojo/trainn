import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
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
        const res = await fetch(`/api/measurements/${userId}`);
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
    setFormData({ ...measurement });
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
    const res = await fetch(`/api/measurements/${userId}`);
    setMeasurements(res.ok ? await res.json() : []);
    setLoading(false);
  }
  async function handleSave() {
    // PATCH if editing, POST if adding
    const body = { ...formData };
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
    const res = await fetch(`/api/measurements/${userId}`);
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
      {modalOpen && (
        <Box sx={{
          position: "fixed", zIndex: 9999, top: 0, left: 0, width: "100vw", height: "100vh",
          bgcolor: "rgba(0,0,0,0.22)", display: "flex", alignItems: "center", justifyContent: "center"
        }}>
          <Box sx={{
            background: "#fff", borderRadius: 3, boxShadow: 3, p: 3, minWidth: 340, maxWidth: 380
          }}>
            <h2 style={{ marginTop: 0, fontWeight: 600 }}>
              {editingMeasurement ? (t.measurementsEditTitle ?? "Edit Measurement") : (t.measurementsAddTitle ?? "New Measurement")}
            </h2>
            <form onSubmit={e => { e.preventDefault(); handleSave(); }}>
              <div>
                <label style={{ fontWeight: 500, display: "inline-block", width: 88 }}>{t.measurementsColumnDate}:</label>
                <input
                  type="date"
                  value={formData?.date || ""}
                  onChange={e => setFormData((f: any) => ({ ...f, date: e.target.value }))}
                  required
                  style={{ marginBottom: 10, width: 150 }}
                />
              </div>
              {["weight", "neck", "arm", "waist", "abdomen", "hip", "thigh", "calfMuscle"].map(k => (
                <div key={k}>
                  <label style={{ fontWeight: 500, display: "inline-block", width: 88 }}>{(t as any)["measurementsColumn" + k.charAt(0).toUpperCase() + k.slice(1)]}:</label>
                  <input
                    type="number"
                    step="any"
                    value={formData?.[k] ?? ""}
                    onChange={e => setFormData((f: any) => ({ ...f, [k]: e.target.value }))}
                    style={{ marginBottom: 10, width: 90 }}
                  />
                </div>
              ))}
              <Box mt={2} display="flex" gap={2} justifyContent="flex-end">
                {editingMeasurement && (
                  <button
                    type="button"
                    style={{
                      background: "#e53935", color: "#fff", border: "none", borderRadius: 3, padding: "7px 15px", fontWeight: 500, cursor: "pointer"
                    }}
                    onClick={handleDelete}
                  >{t.measurementsDelete ?? "Delete"}</button>
                )}
                <button
                  type="button"
                  style={{
                    background: "#eee", color: "#222", border: "none", borderRadius: 3, padding: "7px 15px", fontWeight: 500, cursor: "pointer"
                  }}
                  onClick={() => { setModalOpen(false); setEditingMeasurement(null); setFormData(null); }}
                >{t.measurementsModalCancel ?? "Cancel"}</button>
                <button
                  type="submit"
                  style={{
                    background: "#1976d2", color: "#fff", border: "none", borderRadius: 3, padding: "7px 15px", fontWeight: 500, cursor: "pointer"
                  }}
                >{editingMeasurement ? (t.measurementsSave ?? "Update") : (t.measurementsModalAdd ?? "Add")}</button>
              </Box>
            </form>
          </Box>
        </Box>
      )}
    </Box>
  );
}
