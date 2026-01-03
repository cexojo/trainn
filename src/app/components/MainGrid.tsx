import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { translations } from '@/app/i18n';

import Button from "@mui/material/Button";
import DashboardStatsPanel from './DashboardStatsPanel';
import TrainingBlocksWizard from './TrainingBlocksWizard';
import UserTable from "@/app/components/UserTable";
import ExerciseTable from "@/app/admin_dashboard/ExerciseTable";
import ManageBlocks from "@/app/components/ManageBlocks";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress } from "@mui/material";

export default function MainGrid({ section }: { section?: string | null }) {
  const lang = "es"; // Replace with current language context if available

  // Modal state for creating athlete
  const [openCreate, setOpenCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    name: "",
    username: "",
    email: "",
    paymentFrequency: "quarterly",
    paymentAmount: ""
  });
  const [athletesRefreshKey, setAthletesRefreshKey] = useState(0);
  const [valid, setValid] = useState({
    email: true,
    username: true,
  });
  const [touched, setTouched] = useState({
    email: false,
    username: false,
  });

  // Helper to clear form
  const resetFields = () =>
    setFields({
      name: "",
      username: "",
      email: "",
      paymentFrequency: "quarterly",
      paymentAmount: ""
    });

  // Store ref for the Crear atleta button (to return focus)
  const createButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handler to create athlete
  const handleCreate = async () => {
    setCreateLoading(true);
    setCreateError(null);
    const payload = {
      ...fields,
      role: "athlete"
    };
    const res = await fetch("/api/create_user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    setCreateLoading(false);
    if (res.ok) {
      setOpenCreate(false);
      resetFields();
      setAthletesRefreshKey((k) => k + 1);
      // Focus the "Crear atleta" button after closing the dialog
      setTimeout(() => createButtonRef.current?.focus(), 0);
    } else {
      setCreateError((await res.json()).error || "Failed to create athlete.");
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {!section && <DashboardStatsPanel />}
      {section === "training-blocks" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "create-block" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuCreateBlock}
          </Typography>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "manage-blocks" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuManageBlocks}
          </Typography>
          <ManageBlocks />
        </Box>
      )}
      {section === "athletes" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].athletes}
          </Typography>
          <UserTable
            lang={lang}
            refreshKey={athletesRefreshKey}
            crearAtletaButton={
              <>
                <Button
                  ref={createButtonRef}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenCreate(true)}
                >
                  {translations[lang]?.createAthlete ?? "Crear atleta"}
                </Button>
                <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                  <DialogTitle>{translations[lang]?.createAthlete ?? "Crear atleta"}</DialogTitle>
                  <DialogContent sx={{ minWidth: 340 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={translations[lang]?.manageUsersModalName ?? "Name"}
                      type="text"
                      fullWidth
                      value={fields.name}
                      onChange={e => setFields({ ...fields, name: e.target.value })}
                      required
                    />
                    <TextField
                      margin="dense"
                      label={translations[lang]?.manageUsersModalUsername ?? "Username"}
                      type="text"
                      fullWidth
                      value={fields.username}
                      error={touched.username && !valid.username}
                      helperText={touched.username && !valid.username ? "El usuario ya existe" : ""}
                      onBlur={async () => {
                        setTouched(t => ({ ...t, username: true }));
                        if (fields.username) {
                          try {
                            const resp = await fetch(`/api/check-username-exists?username=${encodeURIComponent(fields.username)}`);
                            const res = await resp.json();
                            setValid(v => ({
                              ...v,
                              username: !res.exists,
                            }));
                          } catch {
                            setValid(v => ({ ...v, username: true }));
                          }
                        }
                      }}
                      onChange={e => {
                        const value = e.target.value;
                        setFields({ ...fields, username: value });
                        setTouched(t => ({ ...t, username: true }));
                        setValid(v => ({
                          ...v,
                          username: true,
                        }));
                      }}
                      required
                    />
                    <TextField
                      margin="dense"
                      label={translations[lang]?.manageUsersModalEmail ?? "Email"}
                      type="email"
                      fullWidth
                      value={fields.email}
                      error={touched.email && !valid.email}
                      helperText={touched.email && !valid.email ? "Introduce un email válido" : ""}
                      onBlur={() => setTouched(t => ({ ...t, email: true }))}
                      onChange={e => {
                        const value = e.target.value;
                        setFields({ ...fields, email: value });
                        setTouched(t => ({ ...t, email: true }));
                        setValid(v => ({
                          ...v,
                          email: !!value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
                        }));
                      }}
                      required
                    />
                    <TextField
                      margin="dense"
                      label="Frecuencia de pago"
                      select
                      fullWidth
                      value={fields.paymentFrequency}
                      onChange={e => setFields({ ...fields, paymentFrequency: e.target.value })}
                      SelectProps={{ native: true }}
                      sx={{ mt: 1 }}
                      required
                    >
                      <option value="monthly">Mensual</option>
                      <option value="quarterly">Trimestral</option>
                      <option value="yearly">Anual</option>
                    </TextField>
                    <TextField
                      margin="dense"
                      label="Importe de pago (€)"
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      fullWidth
                      value={fields.paymentAmount}
                      onChange={e => setFields({ ...fields, paymentAmount: e.target.value })}
                      required
                    />
                    {createError && (
                      <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                        {createError}
                      </Typography>
                    )}
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenCreate(false)} disabled={createLoading}>
                      {translations[lang]?.manageUsersAddPaymentCancel ?? "Cancel"}
                    </Button>
                    {fields.name &&
                      fields.username &&
                      valid.username &&
                      fields.email &&
                      valid.email &&
                      fields.paymentAmount &&
                      !isNaN(Number(fields.paymentAmount)) &&
                      Number(fields.paymentAmount) > 0 && (
                        <Button
                          variant="contained"
                          disabled={createLoading}
                          onClick={handleCreate}
                          color="primary"
                          startIcon={createLoading ? <CircularProgress size={18} color="inherit" /> : undefined}
                        >
                          {translations[lang]?.createAthlete ?? "Crear atleta"}
                        </Button>
                    )}
                  </DialogActions>
                </Dialog>
              </>
            }
          />
        </Box>
      )}
      {section === "exercises" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].exercises}
          </Typography>
          <ExerciseTable lang={lang} />
        </Box>
      )}
    </Box>
  );
}
