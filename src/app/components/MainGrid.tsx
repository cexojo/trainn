import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { translations } from '@/app/i18n';

import Button from "@mui/material/Button";
import DashboardStatsPanelAdmin from './DashboardStatsPanelAdmin';
import TrainingBlocksWizard from './TrainingBlocksWizard';
import UserTable from "@/app/components/UserTable";
import ExerciseTable from "@/app/dashboard/ExerciseTable";
import ManageBlocks from "@/app/components/ManageBlocks";
import TrainingPanel from "./TrainingPanel";
import MeasurementsPanel from "@/app/components/MeasurementsPanel";

import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, CircularProgress, Snackbar, Alert } from "@mui/material";

import { FrontendError } from "@/utils/errors";

export default function MainGrid({
  section,
  userRole,
  selectedBlock,
  setSelectedBlock,
  selectedWeek,
  setSelectedWeek,
  selectedDay,
  setSelectedDay
}: {
  section?: string | null,
  userRole?: "admin" | "athlete" | null,
  selectedBlock?: any,
  setSelectedBlock: (block: any) => void,
  selectedWeek?: any,
  setSelectedWeek: (week: any) => void,
  selectedDay?: number | null,
  setSelectedDay?: (dayIdx: number | null) => void
}) {
  const lang = "es"; // Replace with current language context if available

  // Modal state for creating athlete
  const [openCreate, setOpenCreate] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  // Error notification state (snackbar)
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  // Remove obsolete dialog-local error state
  // const [createError, setCreateError] = useState<string | null>(null);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    sex: "",
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
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      sex: "",
      paymentFrequency: "quarterly",
      paymentAmount: ""
    });

  // Store ref for the Crear atleta button (to return focus)
  const createButtonRef = React.useRef<HTMLButtonElement>(null);

  // Handler to create athlete
  const handleCreate = async () => {
    setCreateLoading(true);
    setSnackbarMessage(null);
    setSnackbarOpen(false);
    const payload = {
      ...fields,
      role: "athlete"
    };
    try {
      const res = await fetch("/api/create-user", {
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
        const errorMsg = (await res.json()).error;
        new FrontendError(errorMsg);
        setSnackbarMessage(errorMsg);
        setSnackbarOpen(true);
        throw new FrontendError(errorMsg);
      }
    } catch (err: any) {
      setCreateLoading(false);
      new FrontendError(translations[lang].networkOrClientError, err);
      setSnackbarMessage(translations[lang].networkOrClientError);
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: '100%' }}>
      {!section && userRole === 'admin' && <DashboardStatsPanelAdmin />}
      {section === "training-blocks" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "create-block" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuCreateBlock}
          </Typography>
          <TrainingBlocksWizard />
        </Box>
      )}
      {section === "manage-blocks" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].adminMenuManageBlocks}
          </Typography>
          <ManageBlocks />
        </Box>
      )}
      {section === "athletes" && userRole === 'admin' && (
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
                  {translations[lang]?.createAthlete}
                </Button>
                <Dialog open={openCreate} onClose={() => setOpenCreate(false)}>
                  <DialogTitle>{translations[lang]?.createAthlete}</DialogTitle>
                  <DialogContent sx={{ minWidth: 340 }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label={translations[lang]?.manageUsersModalFirstName}
                      type="text"
                      fullWidth
                      value={fields.firstName}
                      onChange={e => setFields({ ...fields, firstName: e.target.value })}
                      required
                    />
                    <TextField
                      margin="dense"
                      label={translations[lang]?.manageUsersModalLastName}
                      type="text"
                      fullWidth
                      value={fields.lastName}
                      onChange={e => setFields({ ...fields, lastName: e.target.value })}
                      required
                    />
                    <TextField
                      margin="dense"
                      label={translations[lang]?.manageUsersModalUsername}
                      type="text"
                      fullWidth
                      value={fields.username}
                      error={touched.username && !valid.username}
                      helperText={touched.username && !valid.username ? translations[lang]?.usernameTakenError : ""}
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
                      label={translations[lang].manageUsersModalEmail}
                      type="email"
                      fullWidth
                      value={fields.email}
                      error={touched.email && !valid.email}
                      helperText={touched.email && !valid.email ? translations[lang].invalidEmailError : ""}
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
                      label={translations[lang].sexLabel}
                      select
                      fullWidth
                      value={fields.sex}
                      onChange={e => setFields({ ...fields, sex: e.target.value })}
                      SelectProps={{ native: true }}
                      sx={{ mt: 1 }}
                    >
                      <option value=""></option>
                      <option value="MALE">{translations[lang].sexMale}</option>
                      <option value="FEMALE">{translations[lang].sexFemale}</option>
                    </TextField>
                    <TextField
                      margin="dense"
                      label={translations[lang]?.createUserFrequencyLabel}
                      select
                      fullWidth
                      value={fields.paymentFrequency}
                      onChange={e => setFields({ ...fields, paymentFrequency: e.target.value })}
                      SelectProps={{ native: true }}
                      sx={{ mt: 1 }}
                      required
                    >
                      <option value="monthly">{translations[lang]?.createUserFrequencyMonthly}</option>
                      <option value="quarterly">{translations[lang]?.createUserFrequencyQuarterly}</option>
                      <option value="yearly">{translations[lang]?.createUserFrequencyYearly}</option>
                    </TextField>
                    <TextField
                      margin="dense"
                      label={translations[lang]?.createUserPaymentAmountLabel}
                      type="number"
                      inputProps={{ min: 0, step: 0.01 }}
                      fullWidth
                      value={fields.paymentAmount}
                      onChange={e => setFields({ ...fields, paymentAmount: e.target.value })}
                      required
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenCreate(false)} disabled={createLoading}>
                      {translations[lang]?.manageUsersAddPaymentCancel}
                    </Button>
                    {fields.firstName &&
                      fields.lastName &&
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
                          {translations[lang]?.createAthlete}
                        </Button>
                    )}
                  </DialogActions>
                </Dialog>
              </>
            }
          />
        </Box>
      )}
      {section === "training" && userRole === 'athlete' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <TrainingPanel
            selectedBlock={selectedBlock}
            setSelectedBlock={setSelectedBlock}
            selectedWeek={selectedWeek}
            setSelectedWeek={setSelectedWeek}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
          />
        </Box>
      )}
      {section === "measurements" && userRole === 'athlete' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <MeasurementsPanel />
        </Box>
      )}
      {section === "exercises" && userRole === 'admin' && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].exercises}
          </Typography>
          <ExerciseTable lang={lang} />
        </Box>
      )}
    {/* Snackbar for error notifications */}
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={6000}
      onClose={() => setSnackbarOpen(false)}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity="error" variant="filled" onClose={() => setSnackbarOpen(false)}>
        {snackbarMessage}
      </Alert>
    </Snackbar>
    </Box>
  );
}
