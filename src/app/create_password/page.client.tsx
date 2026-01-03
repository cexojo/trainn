"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Box, Typography, TextField, Button, CircularProgress, Alert } from "@mui/material";
import AppTheme from "@/app/theme/AppTheme";
import { CssBaseline } from "@mui/material";

function validatePassword(password: string) {
  // At least 6, one upper, one lower, one number
  return (
    password.length >= 6 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /\d/.test(password)
  );
}

export default function CreatePasswordPage() {
  const params = useSearchParams();
  const userId = params.get("userId");
  const router = useRouter();

  React.useEffect(() => {
    if (!userId) {
      router.replace("/");
    }
  }, [userId, router]);

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const valid = validatePassword(password);
  const match = password === confirm;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!userId) {
      setError("Ha ocurrido un error. Inténtalo de nuevo o contacta soporte."); // generic error
      return;
    }
    if (!valid) {
      setError("La contraseña no cumple los requisitos.");
      return;
    }
    if (!match) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });
      if (res.ok) {
        setSuccess(true);
        setPassword("");
        setConfirm("");
      } else {
        setError("Ha ocurrido un error. Inténtalo de nuevo o contacta soporte.");
      }
    } catch {
      setError("Ha ocurrido un error. Inténtalo de nuevo o contacta soporte.");
    }
    setLoading(false);
  };

  if (!userId) {
    return null;
  }

  return (
    <AppTheme>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          color: "text.primary",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Box
          component="form"
          onSubmit={handleSave}
          sx={{
            width: "100%",
            maxWidth: 380,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 6,
            p: 4,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, textAlign: "center" }}>
            Crear contraseña
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">Contraseña guardada correctamente.</Alert>}
          <TextField
            type="password"
            label="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6, autoComplete: "new-password" }}
            helperText="Mínimo 6 caracteres, mayúsculas, minúsculas y números"
            error={password.length > 0 && !valid}
          />
          <TextField
            type="password"
            label="Repite la contraseña"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6, autoComplete: "new-password" }}
            error={confirm.length > 0 && !match}
            helperText={
              confirm.length > 0 && !match ? "Las contraseñas no coinciden" : ""
            }
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 1 }}
            disabled={
              loading ||
              !password ||
              !confirm ||
              !valid ||
              !match
            }
            startIcon={loading ? <CircularProgress size={18} color="inherit" /> : undefined}
          >
            Guardar contraseña
          </Button>
        </Box>
      </Box>
    </AppTheme>
  );
}
