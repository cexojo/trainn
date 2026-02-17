import React, { useState, useEffect, useRef } from "react";
import { Box, TextField, Typography, CircularProgress } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";

interface EditableUserFieldProps {
  label: string;
  value: string;
  field: "username" | "email" | "firstName" | "lastName";
  userId: string;
  onUpdated: (val: string) => void;
  forceRefresh: () => void;
  lang: Lang;
  setNotification: (val: { type: "success" | "error"; message: string }) => void;
}

export default function EditableUserField({
  label,
  value,
  field,
  userId,
  onUpdated,
  forceRefresh,
  lang,
  setNotification,
}: EditableUserFieldProps) {
  const [editing, setEditing] = useState(false);
  const [temp, setTemp] = useState(value || "");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setTemp(value || "");
  }, [value]);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const doPatch = async () => {
    if (temp === value) {
      setEditing(false);
      return;
    }
    setLoading(true);
    const res = await fetch(`/api/update-user/${userId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: temp }),
    });
    setLoading(false);
    if (res.ok) {
      onUpdated(temp);
      setEditing(false);
      forceRefresh();
    } else {
      let msg = "";
      try {
        const out = await res.json();
        if (out && out.error === "email_taken") {
          msg = translations[lang].emailTakenError;
        } else if (out && out.error === "username_taken") {
          msg = translations[lang].usernameTakenError;
        }
      } catch {}
      if (!msg) {
        msg = lang === "es"
          ? "Error al actualizar el usuario. Inténtalo de nuevo o recarga la página."
          : "Error updating user. Please try again or reload the page.";
      }
      setNotification({ type: "error", message: msg });
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
      <strong>{label}:</strong>
      {editing ? (
        <TextField
          size="small"
          variant="standard"
          value={temp}
          disabled={loading}
          inputRef={inputRef}
          onChange={e => setTemp(e.target.value)}
          onBlur={doPatch}
          onKeyDown={e => {
            if (e.key === "Enter") {
              doPatch();
            } else if (e.key === "Escape") {
              setEditing(false);
              setTemp(value);
            }
          }}
          sx={{ ml: 1, minWidth: 140 }}
        />
      ) : (
        <Typography
          sx={{
            ml: 1,
            minWidth: 140,
            display: "inline-block",
            textDecoration: "underline dotted",
            cursor: "pointer",
            color: "#1976d2"
          }}
          onClick={() => setEditing(true)}
          tabIndex={0}
          role="button"
          title={translations[lang].editFieldTooltip}
        >
          {value || translations[lang].emptyValue}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}
