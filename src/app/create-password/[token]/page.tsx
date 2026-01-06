"use client";
import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Box, Typography, TextField, Button, CircularProgress, Alert, Snackbar } from "@mui/material";
import AppTheme from "@/app/theme/AppTheme";
import Dialog from "@mui/material/Dialog";
import { CssBaseline } from "@mui/material";
import { translations } from "@/app/i18n";

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
  const lang = "es";

  const { token } = useParams();
  const tokenString = Array.isArray(token) ? token[0] : token;
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const [success, setSuccess] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState<string | null>(null);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  // User info for display
  const [userInfo, setUserInfo] = useState<{ firstName: string; email: string } | null>(null);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [userInfoError, setUserInfoError] = useState<string | null>(null);

  React.useEffect(() => {
    if (!tokenString) return;
    setUserInfoLoading(true);
    setUserInfoError(null);
    fetch(`/api/set-password?passwordRefreshToken=${encodeURIComponent(tokenString)}`)
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setUserInfo(data);
        } else {
          const { error } = await res.json();
          setUserInfoError(error || "No se pudo cargar el usuario.");
        }
      })
      .catch(() => setUserInfoError("No se pudo cargar el usuario."))
      .finally(() => setUserInfoLoading(false));
  }, [tokenString]);

  const valid = validatePassword(password);
  const match = password === confirm;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    // setSuccess(false);

    if (!tokenString) {
      setSnackbarMsg(translations[lang].passwordSnackbarInvalidOrExpired);
      setSnackbarOpen(true);
      return;
    }
    if (!valid) {
      setSnackbarMsg(translations[lang].passwordSnackbarRequirements);
      setSnackbarOpen(true);
      return;
    }
    if (!match) {
      setSnackbarMsg(translations[lang].passwordSnackbarMismatch);
      setSnackbarOpen(true);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/set-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passwordRefreshToken: tokenString, password }),
      });
      if (res.ok) {
        setShowSuccessDialog(true);
        return;
      } else {
        setSnackbarMsg(translations[lang].passwordSnackbarError);
        setSnackbarOpen(true);
      }
    } catch {
      setSnackbarMsg(translations[lang].passwordSnackbarError);
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  // Show loading spinner while fetching user info (prevents form flash)
  if (userInfoLoading) {
    return (
      <AppTheme>
        <CssBaseline />
        <Box
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.default"
          color="text.primary"
        >
          <CircularProgress />
        </Box>
      </AppTheme>
    );
  }

  if (!tokenString) {
    return (
      <AppTheme>
        <CssBaseline />
        <Box
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.default"
          color="text.primary"
        >
          <Alert severity="error">{translations[lang].passwordInvalidOrExpired}</Alert>
        </Box>
      </AppTheme>
    );
  }

  if (userInfoError) {
    return (
      <AppTheme>
        <CssBaseline />
        <Box
          minHeight="100vh"
          display="flex"
          justifyContent="center"
          alignItems="center"
          bgcolor="background.default"
          color="text.primary"
        >
          <Alert severity="error">{userInfoError === "No se pudo cargar el usuario." ? translations[lang].passwordInvalidOrExpired : userInfoError}</Alert>
        </Box>
      </AppTheme>
    );
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
            {translations[lang].passwordTitle}
          </Typography>
          {/* Snackbar for password reset errors */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={5000}
            onClose={() => setSnackbarOpen(false)}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            {snackbarMsg ? (
              <Alert severity="error" sx={{ width: "100%" }} onClose={() => setSnackbarOpen(false)}>
                {snackbarMsg}
              </Alert>
            ) : undefined}
          </Snackbar>
          {/* Show user firstName (email) below the title */}
          {userInfoLoading ? (
            <Typography variant="body2" sx={{ textAlign: "center", mb: 1 }} color="text.secondary">
              {translations[lang].passwordLoadingUser}
            </Typography>
          ) : userInfo ? (
            <Typography variant="subtitle1" sx={{ textAlign: "center", mb: 1 }}>
              {userInfo.firstName} ({userInfo.email})
            </Typography>
          ) : null}
          <TextField
            type="password"
            label={translations[lang].passwordLabel}
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6, autoComplete: "new-password" }}
            helperText={translations[lang].passwordHelperText}
            error={password.length > 0 && !valid}
          />
          <TextField
            type="password"
            label={translations[lang].passwordRepeatLabel}
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            required
            fullWidth
            inputProps={{ minLength: 6, autoComplete: "new-password" }}
            error={confirm.length > 0 && !match}
            helperText={
              confirm.length > 0 && !match
                ? translations[lang].passwordHelperTextMismatch
                : ""
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
            {translations[lang].passwordButton}
          </Button>
        </Box>
        {/* Success Dialog: Inform user password is set, offer link to root */}
        <Dialog
          open={showSuccessDialog}
          onClose={() => setShowSuccessDialog(false)}
          aria-labelledby="success-dialog-title"
        >
          <Box sx={{ p: 3, minWidth: 280, textAlign: "center" }}>
            <Typography id="success-dialog-title" variant="h6" sx={{ mb: 2 }}>
              {/* Hardcoded for now, should be in translations: */}
              Contraseña cambiada con éxito
            </Typography>
            <Typography sx={{ mb: 3 }}>
              Ya puedes iniciar sesión con la nueva contraseña.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setShowSuccessDialog(false);
                router.push("/");
              }}
              autoFocus
            >
              Ir al inicio
            </Button>
          </Box>
        </Dialog>
      </Box>
    </AppTheme>
  );
}
