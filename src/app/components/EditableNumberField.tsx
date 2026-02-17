import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

interface EditableNumberFieldProps {
  label: string;
  value: number;
  userId: string;
  onUpdated: (val: number) => void;
  forceRefresh: () => void;
  lang: Lang;
  setNotification: (obj: { type: "success" | "error"; message: string }) => void;
  field: string;
}

export default function EditableNumberField({
  label,
  value,
  userId,
  onUpdated,
  forceRefresh,
  lang,
  setNotification,
  field,
}: EditableNumberFieldProps) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value === null || value === undefined ? "" : value.toString());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTemp(value === null || value === undefined ? "" : value.toString());
  }, [value]);

  const doPatch = async () => {
    const parsed = parseFloat(temp);
    if (!isFinite(parsed)) {
      setEditing(false);
      return;
    }
    if (parsed === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: parsed }),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated(parsed);
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
        <TextField
          type="number"
          size="small"
          value={temp}
          onChange={e => setTemp(e.target.value)}
          onBlur={doPatch}
          onKeyDown={e => {
            if (e.key === "Enter") {
              doPatch();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTemp(value?.toString() ?? "");
            }
          }}
          autoFocus
          sx={{ width: 90 }}
          inputProps={{ min: 0, step: "0.01" }}
        />
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 90,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editAmountTooltip}
        >
          {value !== null && value !== undefined
            ? Number(value).toFixed(2)
            : translations[lang].emptyValue}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}
