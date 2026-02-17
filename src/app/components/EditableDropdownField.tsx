import React, { useState, useEffect } from "react";
import { Box, Typography, CircularProgress, Select, MenuItem } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

interface Option {
  value: string;
  label: string;
}

interface EditableDropdownFieldProps {
  label: string;
  value: string;
  options: Option[];
  userId: string;
  onUpdated: (val: string) => void;
  forceRefresh: () => void;
  lang: Lang;
  setNotification: (obj: { type: "success" | "error"; message: string }) => void;
  field: string;
}

export default function EditableDropdownField({
  label,
  value,
  options,
  userId,
  onUpdated,
  forceRefresh,
  lang,
  setNotification,
  field
}: EditableDropdownFieldProps) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTemp(value || "");
  }, [value]);

  const doPatch = async (incoming: string) => {
    if (incoming === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: incoming }),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated(incoming);
      setEditing(false);
      forceRefresh();
      setNotification({ type: "success", message: lang === "es" ? "Campo actualizado correctamente" : "Field updated successfully" });
    } else {
      setNotification({ type: "error", message: lang === "es" ? "Error al actualizar el campo" : "Failed to update field" });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <strong>{label}:</strong>
      {editing ? (
        <Select
          size="small"
          value={temp}
          onChange={e => {
            setTemp(e.target.value);
            doPatch(e.target.value);
          }}
          onBlur={() => setEditing(false)}
          sx={{ ml: 1, minWidth: 120 }}
          autoFocus
        >
          {options.map(opt => (
            <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
          ))}
        </Select>
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 120,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editFrequencyTooltip}
        >
          {(options.find(o => o.value === value)?.label ?? translations[lang].emptyValue)}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}
