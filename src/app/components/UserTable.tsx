"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Tabs, Tab, CircularProgress, TextField, Select, MenuItem, Menu, Switch, FormControl, InputLabel, Popover } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import NotificationSnackbar from "./NotificationSnackbar";
import MeasurementsTable from "./MeasurementsTable";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EuroIcon from "@mui/icons-material/Euro";
import MuscleGroupBadges from "./MuscleGroupBadges";
import StatCard from "./StatCard";
import SlidingStatCard from "./SlidingStatCard";
import BlockPerformanceStats from "./BlockPerformanceStats";
import AddPaymentDialog from "./AddPaymentDialog";
import TrainingTab from "./TrainingTab";
import EditableDropdownField from "./EditableDropdownField";
import EditableNumberField from "./EditableNumberField";
import EditableUserField from "./EditableUserField";
import MeasurementsTab from "./MeasurementsTab";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRef } from "react";








export default function UserTable({
  lang,
  crearAtletaButton,
  refreshKey,
  usersProp = [],
}: {
  lang: Lang,
  crearAtletaButton?: React.ReactNode,
  refreshKey?: number,
  usersProp?: any[],
}) {
  // Payments tab dialog state must be at top level for hooks rules
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [showOnlyPendingPayments, setShowOnlyPendingPayments] = useState(false);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "payments" | "measurements" | "blocks">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<"active" | "all" | "hidden" | "due" | "nofuture" | "noplan" | "nopassword">("active");
  const [internalRefreshKey, setInternalRefreshKey] = useState(0);

  // Context menu state
  const [contextMenuAnchor, setContextMenuAnchor] = useState<{mouseX: number, mouseY: number} | null>(null);
  const [contextMenuRow, setContextMenuRow] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [pendingWelcomeUser, setPendingWelcomeUser] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  // Confirmation dialog state for hiding/unhiding users
  const [confirmationDialog, setConfirmationDialog] = useState<{ open: boolean; message: string; user: any | null }>({
    open: false,
    message: "",
    user: null,
  });
  // Import logAdminError
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logAdminError = require("@/app/utils/logAdminError").logAdminError;

  useEffect(() => {
    // If usersProp is defined (even if empty array), always use it, never fetch.
    if (usersProp !== undefined) {
      setUsers(usersProp);
      setLoading(false);
      return;
    }
    setLoading(true);
    fetch("/api/athletes")
      .then(r => r.json())
      .then(d => {
        setUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey, internalRefreshKey, usersProp]);

  // Column definitions
  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: translations[lang].manageUsersTableName,
      flex: 1,
      minWidth: 160,
      sortable: false,
      valueGetter: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const hasFirst = !!row.firstName;
        const hasLast = !!row.lastName;
        if (!hasFirst && !hasLast) return translations[lang].emptyValue;
        return [row.firstName, row.lastName].filter(Boolean).join(" ");
      },
      renderCell: (params: any) => {
        const row = params?.row;
        if (!row) return translations[lang].emptyValue;
        const hasFirst = !!row.firstName;
        const hasLast = !!row.lastName;
        if (!hasFirst && !hasLast) return translations[lang].emptyValue;
        return [row.firstName, row.lastName].filter(Boolean).join(" ");
      },
    },
    { field: "username", headerName: translations[lang].manageUsersModalUsername, flex: 1, minWidth: 130, sortable: false },
    { field: "email", headerName: translations[lang].manageUsersTableEmail, flex: 1.5, minWidth: 210, sortable: false },
    {
      field: "status",
      headerName: translations[lang].manageUsersTableStatus,
      type: "string",
      minWidth: 150,
      sortable: false,
      valueGetter: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const now = new Date();
        const hasOverdueUnpaid = Array.isArray(row.payments)
          ? row.payments.some(
              (p: any) => !p.isPayed && new Date(p.dueDate) <= now
            )
          : false;
        if (hasOverdueUnpaid) return translations[lang].paymentsTableUnpaid;
        if (row.hidden) return translations[lang].hideUser;
        return translations[lang].paymentsTablePaid;
      },
      renderCell: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const now = new Date();
        const hasOverdueUnpaid = Array.isArray(row.payments)
          ? row.payments.some(
              (p: any) => !p.isPayed && new Date(p.dueDate) <= now
            )
          : false;
        if (hasOverdueUnpaid)
          return (
            <Tooltip title={translations[lang].paymentsTableUnpaid}>
              <EuroIcon sx={{ color: "#E53935" }} />
            </Tooltip>
          );
        if (row.hidden)
          return (
            <Tooltip title={translations[lang].hiddenUserStatus}>
              <VisibilityOffIcon />
            </Tooltip>
          );
        return (
          <Tooltip title={translations[lang].paymentsTablePaid}>
            <EuroIcon sx={{ color: "#23b802" }} />
          </Tooltip>
        );
      }
    }
  ];

  const athletes = useMemo(() => users.filter((u: any) => u.role === "athlete"), [users]);
  const filteredUsers = useMemo(() => {
    const term = searchTerm.toLowerCase();
    const now = new Date();
    return athletes.filter((u: any) => {
      // At least one overdue/unpaid
      const hasOverdueUnpaid = Array.isArray(u.payments)
        ? u.payments.some((p: any) => !p.isPayed && new Date(p.dueDate) <= now)
        : false;
      // Has at least one future payment
      const hasFuturePayment = Array.isArray(u.payments)
        ? u.payments.some((p: any) => new Date(p.dueDate) > now)
        : false;
      const matchesSearch =
        u.name?.toLowerCase().includes(term) ||
        (u.username ?? "").toLowerCase().includes(term) ||
        (u.email ?? "").toLowerCase().includes(term);

      // Hidden: show only hidden users
      if (quickFilter === "hidden") {
        return u.hidden === true && matchesSearch;
      }

      // Noplan: SIN planificación, only active users
      if (quickFilter === "noplan") {
        return u.noPlan === true && u.hidden !== true && matchesSearch;
      }

      // Due: Pagos pendientes, only active users
      if (quickFilter === "due") {
        return hasOverdueUnpaid && u.hidden !== true && matchesSearch;
      }

      // Nofuture: Sin pagos futuros, only active users
      if (quickFilter === "nofuture") {
        return !hasFuturePayment && u.hidden !== true && matchesSearch;
      }

      // Usuarios sin contraseña: users who have not set a password (hasPassword === false)
      if (quickFilter === "nopassword") {
        return (u.hasPassword === false) && matchesSearch;
      }

      // Active: show only not hidden
      if (quickFilter === "active") {
        return u.hidden !== true && matchesSearch;
      }

      // All
      return matchesSearch;
    });
  }, [athletes, searchTerm, quickFilter]);
  // Sync selected user with latest users after refresh
  React.useEffect(() => {
    if (selected && Array.isArray(users) && users.length) {
      const fresh = users.find(u => u.id === selected.id);
      if (fresh) setSelected(fresh);
    }
  }, [users]);

  const handleHideUser = async (user: any) => {
    setActionLoading(true);
    const updatedUser = { ...user, hidden: !user.hidden };
    const nowISO = new Date().toISOString();
    const isHiding = updatedUser.hidden;
    const res = await fetch(`/api/update-user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hidden: updatedUser.hidden,
        hidingDate: isHiding ? nowISO : null
      }),
    });
    if (res.ok) {
      setUsers((prevUsers: any[]) =>
        prevUsers.map((u: any) =>
          u.id === user.id
            ? { ...updatedUser, hidingDate: isHiding ? nowISO : null }
            : u
        )
      );
    }
    setActionLoading(false);
  };

  // Future payment dialog state
  const [futurePaymentDialog, setFuturePaymentDialog] = useState<{
    open: boolean,
    userId: string | null,
    athleteName: string,
    amount: number,
    dueDate: string, // yyyy-mm-dd
    paymentId: string | null
  }>({
    open: false,
    userId: null,
    athleteName: "",
    amount: 0,
    dueDate: "",
    paymentId: null
  });

  // Helper: get next payment due date based on freq
  function getNextPaymentDate(curr: string, freq: string) {
    try {
      const date = new Date(curr);
      if (freq === "monthly") date.setMonth(date.getMonth() + 1);
      else if (freq === "quarterly") date.setMonth(date.getMonth() + 3);
      else if (freq === "yearly") date.setFullYear(date.getFullYear() + 1);
      // Format YYYY-MM-DD for datestring input
      return date.toISOString().slice(0, 10);
    } catch {
      return curr;
    }
  }

  // Payment/user info modal dialog
  const handleRowClick = (params: GridRowParams) => setSelected(params.row);

  // Payment Edit Dialog state for editing a payment row
  const [editingPayment, setEditingPayment] = useState<any | null>(null);

  const placeholder = translations[lang].searchUserTablePlaceholder;

  return (
    <Box sx={{ width: "100%", background: "background.paper" }}>
      <Box sx={{ mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            alignItems: { sm: "center" }
          }}
        >
          <TextField
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder={placeholder}
            variant="outlined"
            size="small"
            sx={{
              width: { xs: "100%", sm: 300 }
            }}
            inputProps={{
              'aria-label': placeholder
            }}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              width: { xs: "100%", sm: "auto" },
              gap: 2,
              alignItems: { sm: "center" },
              mt: { xs: 2, sm: 0 }
            }}
          >
            <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
              <Select
                value={quickFilter}
                onChange={e => setQuickFilter(e.target.value as any)}
                size="small"
                sx={{
                  minWidth: { xs: "100%", sm: 160 }
                }}
                fullWidth={true}
              >
                <MenuItem value="active">{translations[lang].manageUsersQuickFilterAllActive}</MenuItem>
                <MenuItem value="all">{translations[lang].manageUsersQuickFilterAll}</MenuItem>
                <MenuItem value="hidden">{translations[lang].manageUsersQuickFilterHidden}</MenuItem>
                <MenuItem value="due">{translations[lang].manageUsersQuickFilterDue}</MenuItem>
                <MenuItem value="nofuture">{translations[lang].manageUsersQuickFilterNoFuture}</MenuItem>
                <MenuItem value="noplan">{translations[lang].manageUsersQuickFilterNoPlan}</MenuItem>
                <MenuItem value="nopassword">{translations[lang].manageUsersQuickFilterNoPassword}</MenuItem>
              </Select>
            </Box>
            <Box sx={{
              width: { xs: "100%", sm: "auto" },
              mt: { xs: 2, sm: 0 }
            }}>
              {crearAtletaButton}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{ height: 600, width: "100%" }}
        onContextMenu={e => {
          // Only trigger for rows, not headers etc.
          const target = e.target as HTMLElement;
          const rowNode = target.closest('[data-id]');
          if (rowNode) {
            e.preventDefault();
            const rowId = rowNode.getAttribute('data-id');
            const rowData = filteredUsers.find(u => u.id === rowId);
            setContextMenuAnchor({ mouseX: e.clientX + 2, mouseY: e.clientY - 6 });
            setContextMenuRow(rowData || null);
          }
        }}
      >
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={row => row.id}
          loading={loading}
          disableColumnMenu={true}
          pageSizeOptions={[10, 25, 50]}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
          }}
          onRowClick={handleRowClick}
          sx={{
            background: "background.paper",
            cursor: "pointer",
          }}
        />
        {/* Context Menu for right-clicking a row */}
        <Menu
          open={!!contextMenuAnchor}
          onClose={() => setContextMenuAnchor(null)}
          anchorReference="anchorPosition"
          anchorPosition={
            contextMenuAnchor
              ? { top: contextMenuAnchor.mouseY, left: contextMenuAnchor.mouseX }
              : undefined
          }
          onClick={() => setContextMenuAnchor(null)}
        >
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              setContextMenuAnchor(null);
              // Show confirmation dialog instead of immediate action
              if (contextMenuRow) {
                setConfirmationDialog({
                  open: true,
                  user: contextMenuRow,
                  message: contextMenuRow.hidden
                    ? translations[lang].hideUserDialogUnhideMsg
                    : translations[lang].hideUserDialogHideMsg
                });
              }
            }}
          >
            {contextMenuRow?.hidden
              ? translations[lang].unhideUser
              : translations[lang].hideUser}
          </MenuItem>
          <MenuItem
            onClick={e => {
              e.stopPropagation();
              setContextMenuAnchor(null);
              if (contextMenuRow) setPendingWelcomeUser(contextMenuRow);
            }}
          >
            {translations[lang].sendWelcomeEmail}
          </MenuItem>
        </Menu>
        <Dialog
          open={!!selected}
          maxWidth={false}
          fullWidth
          onClose={() => setSelected(null)}
          PaperProps={{
            sx: {
              width: '50vw',
              height: '50vh',
              maxWidth: 'none',
              maxHeight: 'none',
            }
          }}
        >
          <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            👤 {(selected?.firstName || "") + " " + (selected?.lastName || "")}
          </DialogTitle>
          <DialogContent sx={{ height: 'calc(50vh - 64px)', overflowY: 'auto' }}>
            <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
              <Tab value="info" label={translations[lang].infoTab} />
              <Tab value="payments" label={translations[lang].paymentsTab} />
              <Tab value="measurements" label={translations[lang].measurementsTab} />
              <Tab value="blocks" label={translations[lang].blocksTab} />
            </Tabs>
            {modalTab === "info" && selected && (
              <Box sx={{ mt: 2 }}>
                {/* Editable Username */}
                <EditableUserField
                  label={translations[lang].manageUsersModalUsername}
                  value={selected.username}
                  field="username"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, username: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable Email */}
                <EditableUserField
                  label={translations[lang].manageUsersModalEmail}
                  value={selected.email}
                  field="email"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, email: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable First Name */}
                <EditableUserField
                  label={translations[lang].manageUsersModalFirstName}
                  value={selected.firstName}
                  field="firstName"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, firstName: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                {/* Editable Last Name */}
                <EditableUserField
                  label={translations[lang].manageUsersModalLastName}
                  value={selected.lastName}
                  field="lastName"
                  userId={selected.id}
                  onUpdated={(newVal) => setSelected({ ...selected, lastName: newVal })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                />
                <EditableDropdownField
                  label={translations[lang].sexLabel}
                  value={selected.sex || ""}
                  options={[
                    { value: "MALE", label: translations[lang].sexMale },
                    { value: "FEMALE", label: translations[lang].sexFemale }
                  ]}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, sex: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="sex"
                />
                <EditableNumberField
                  label={translations[lang].subscriptionAmountLabel}
                  value={selected.subscriptionAmount}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, subscriptionAmount: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="subscriptionAmount"
                />
                <EditableDropdownField
                  label={translations[lang].subscriptionFrequencyLabel}
                  value={selected.subscriptionFrequency || ""}
                  options={[
                    { value: "monthly", label: translations[lang].subscriptionFrequencyMonthly },
                    { value: "quarterly", label: translations[lang].subscriptionFrequencyQuarterly },
                    { value: "yearly", label: translations[lang].subscriptionFrequencyYearly }
                  ]}
                  userId={selected.id}
                  onUpdated={val => setSelected({ ...selected, subscriptionFrequency: val })}
                  forceRefresh={() => setInternalRefreshKey(k => k + 1)}
                  lang={lang}
                  setNotification={setNotification}
                  field="subscriptionFrequency"
                />                
                <Typography>
                  <strong>{translations[lang].manageUsersModalLastLogin}:</strong>{" "}
                  {selected.lastOKLogin
                    ? new Date(selected.lastOKLogin).toLocaleString(lang === "es" ? "es-ES" : "en-GB")
                    : translations[lang].emptyValue}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersTableStatus}:</strong> {selected.hidden ? translations[lang].hideUser : translations[lang].paymentsTablePaid}
                </Typography>
              </Box>
            )}
            {modalTab === "payments" && selected && (
              <Box sx={{ mt: 2 }}>
                {/* Payment edit dialog state */}
                {/*
                  Add state for editing a payment.
                  When a payment row is clicked, set `editingPayment`.
                  Show a dialog to edit fields and delete payment, refetching after changes.
                */}
                {/* --- Add this state at component top level --- */}
                {/* const [editingPayment, setEditingPayment] = useState<any | null>(null); */}
                {/* <PaymentEditDialog ... /> */}
                <Box sx={{
                  display: "flex", alignItems: "center", gap: 1, mb: 1
                }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => setShowAddPayment(true)}
                  >
                    {translations[lang].addPaymentButton}
                  </Button>
                  <label style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: 10, cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={showOnlyPendingPayments}
                      onChange={e => setShowOnlyPendingPayments(e.target.checked)}
                      style={{ marginRight: 4 }}
                    />
                    {translations[lang].addPaymentDialogShowOnlyPending}
                  </label>
                </Box>
                <AddPaymentDialog
                  open={showAddPayment}
                  onClose={() => setShowAddPayment(false)}
                  userId={selected.id}
                  onCreated={(payment) => {
                    setShowAddPayment(false);
                    setSelected((sel: any) => ({
                      ...sel,
                      payments: [payment, ...(sel.payments || [])]
                    }));
                    setNotification({ type: "success", message: translations[lang].paymentAdded });
                  }}
                  lang={lang}
                />
              {!selected.payments || selected.payments.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  {translations[lang].manageUsersAddPaymentNone}
                </Typography>
              ) : (
                <Box sx={{ width: '100%', minWidth: 360 }}>
                  <DataGrid
                    rows={
                      showOnlyPendingPayments
                        ? selected.payments.filter((p: any) => !p.isPayed)
                        : selected.payments
                    }
                    columns={[
                      {
                        field: 'dueDate',
                        headerName: translations[lang].paymentsTableDate,
                        width: 100,
                        minWidth: 80,
                        maxWidth: 120,
                        flex: 0,
                        renderCell: (params: any) =>
                          params.row && params.row.dueDate
                            ? new Date(params.row.dueDate).toLocaleDateString(lang === 'es' ? 'es-ES' : 'en-GB')
                            : translations[lang].emptyValue,
                        sortable: false,
                      },
                      {
                        field: 'amount',
                        headerName: translations[lang].paymentsTableAmount,
                        renderCell: (params: any) =>
                          typeof params.value === 'number'
                            ? params.value.toLocaleString(lang === "es" ? "es-ES" : "en-GB", {
                                style: "currency",
                                currency: "EUR",
                                minimumFractionDigits: 2
                              })
                            : params.value,
                        flex: 1,
                        minWidth: 80,
                        sortable: false,
                      },
                      {
                        field: 'isPayed',
                        headerName: translations[lang].paymentsTablePaid,
                        width: 120,
                        minWidth: 120,
                        maxWidth: 120,
                        flex: 0,
                        sortable: false,
                        renderCell: (params: any) => (
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
                            <Tooltip
                              title={
                                Boolean(params.value)
                                  ? translations[lang].paymentsTablePaid
                                  : translations[lang].paymentsTableUnpaid
                              }
                            >
                              <Switch
                                checked={Boolean(params.value)}
                                size="small"
                                color={Boolean(params.value) ? "success" : "error"}
                                inputProps={{
                                  "aria-label": Boolean(params.value)
                                    ? translations[lang].paymentsTablePaid
                                    : translations[lang].paymentsTableUnpaid
                                }}
                                sx={{
                                  mx: 'auto',
                                  display: 'inline-flex',
                                  '& .MuiSwitch-track': {
                                    minWidth: 28,
                                    borderRadius: 13,
                                  },
                                  ...(Boolean(params.value)
                                    ? {}
                                    : {
                                        '& .MuiSwitch-thumb': {
                                          backgroundColor: '#E53935'
                                        },
                                        '& .Mui-checked': {},
                                        '& .MuiSwitch-switchBase:not(.Mui-checked) .MuiSwitch-track':
                                          { backgroundColor: '#F4C7C3' }
                                      })
                                }}
                                onChange={async (e) => {
                                  const newValue = e.target.checked;
                                  await fetch(`/api/payment/${params.row.id}`, {
                                    method: "PATCH",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ isPayed: newValue }),
                                  });
                                  setSelected((sel: any) => ({
                                    ...sel,
                                    payments: sel.payments.map((p: any) =>
                                      p.id === params.row.id ? { ...p, isPayed: newValue } : p
                                    )
                                  }));
                                  // Only show future payment dialog on marking paid -- but only for latest unpaid payment
                                  if (newValue && selected && Array.isArray(selected.payments)) {
                                    // Find all unpaid (not paid yet)
                                    const unpaid = selected.payments.filter(
                                      (p: any) => !p.isPayed
                                    );
                                    if (unpaid.length > 0) {
                                      // Find the latest unpaid by dueDate (chronologically largest)
                                      const sortedUnpaid = unpaid.slice().sort((a: any, b: any) =>
                                        new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
                                      );
                                      const latestUnpaid = sortedUnpaid[sortedUnpaid.length - 1];
                                      if (latestUnpaid && latestUnpaid.id === params.row.id) {
                                        // Show dialog only if this is the latest unpaid
                                        const user = selected;
                                        let freq = "monthly";
                                        let defaultAmount = 0;
                                        if (user && user.subscriptionFrequency) {
                                          freq = user.subscriptionFrequency;
                                        }
                                        // Prefer user default amount, else from payment row
                                        if (user && user.subscriptionAmount != null) {
                                          defaultAmount = user.subscriptionAmount;
                                        } else if (typeof params.row.amount === "number") {
                                          defaultAmount = params.row.amount;
                                        }
                                        // Use user's full name (or username/email fallback)
                                        let athleteName = user
                                          ? [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || user.email || ""
                                          : "";
                                        // Determine next payment due date
                                        let baseDate = params.row.dueDate;
                                        let nextDueDate = baseDate;
                                        if (baseDate && typeof baseDate === "string") {
                                          nextDueDate = getNextPaymentDate(baseDate, freq);
                                        }
                                        setFuturePaymentDialog({
                                          open: true,
                                          userId: user?.id || null,
                                          athleteName,
                                          amount: defaultAmount,
                                          dueDate: nextDueDate,
                                          paymentId: params.row.id
                                        });
                                      }
                                    }
                                  }
                                }}
                              />
                            </Tooltip>
                          </Box>
                        ),
                      },
                    ]}
                    pageSizeOptions={[6]}
                    initialState={{
                      pagination: { paginationModel: { pageSize: 6, page: 0 } }
                    }}
                    getRowId={row => row.id}
                    hideFooterSelectedRowCount
                    autoHeight
                    disableColumnMenu
                    sx={{
                      '& .MuiDataGrid-root, .MuiDataGrid-cell, .MuiDataGrid-columnHeader': {
                        fontSize: '0.9em',
                        padding: '4px 8px'
                      }
                    }}
                    onRowClick={(params) => {
                      setEditingPayment(params.row);
                    }}
                  />
                  {/* Payment Edit Dialog (Modal) renders below */}
                  <Dialog
                    open={!!editingPayment}
                    onClose={() => setEditingPayment(null)}
                  >
                    <DialogTitle>
                      {translations[lang].paymentsTableDate} / {translations[lang].paymentsTableAmount}
                    </DialogTitle>
                    <DialogContent>
                      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, minWidth: 260 }}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                          <DatePicker
                            label={translations[lang].paymentsTableDate}
                            value={editingPayment?.dueDate ? new Date(editingPayment.dueDate) : null}
                            onChange={(d) =>
                              setEditingPayment((p: any) => ({
                                ...p,
                                dueDate: d instanceof Date && !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : ""
                              }))
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true }
                            }}
                            format="dd/MM/yyyy"
                          />
                        </LocalizationProvider>
                        <TextField
                          label={translations[lang].paymentsTableAmount}
                          type="number"
                          size="small"
                          value={editingPayment?.amount ?? ""}
                          onChange={e =>
                            setEditingPayment((p: any) => ({
                              ...p,
                              amount: Number(e.target.value)
                            }))
                          }
                          inputProps={{ min: 0, step: "0.01" }}
                          id="edit-payment-amount"
                        />
                        <Box sx={{ display: "flex", gap: 1, mt: 2, justifyContent: "flex-end" }}>
                          <Button
                            color="inherit"
                            onClick={() => setEditingPayment(null)}
                            startIcon={<CancelIcon />}
                          >
                            {translations[lang].cancel}
                          </Button>
                          <Button
                            color="error"
                            onClick={async () => {
                              // Delete payment
                              await fetch(`/api/payment/${editingPayment.id}`, { method: "DELETE" });
                              setEditingPayment(null);
                              // Refresh by refetching user payments
                              setInternalRefreshKey(k => k + 1);
                            }}
                            startIcon={<DeleteIcon />}
                          >
                            {translations[lang].delete}
                          </Button>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={async () => {
                              // Extract latest values directly from UI (to ensure no race condition from setState)
                              const dueDateInput = (document.querySelector('#edit-payment-dueDate') as HTMLInputElement | null)?.value || editingPayment.dueDate;
                              const amountInput = parseFloat((document.querySelector('#edit-payment-amount') as HTMLInputElement | null)?.value || editingPayment.amount);

                              await fetch(`/api/payment/${editingPayment.id}`, {
                                method: "PATCH",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  dueDate: dueDateInput,
                                  amount: amountInput,
                                  isPayed: editingPayment.isPayed
                                })
                              });
                              setEditingPayment(null);
                              setInternalRefreshKey(k => k + 1);
                            }}
                            startIcon={<CheckCircleIcon />}
                          >
                            {"Aceptar"}
                          </Button>
                        </Box>
                      </Box>
                    </DialogContent>
                  </Dialog>
                </Box>
              )}
            </Box>
            )}
            {modalTab === "measurements" && selected && (
              <MeasurementsTab userId={selected.id} lang={lang} />
            )}
            {modalTab === "blocks" && selected && (
              <TrainingTab userId={selected.id} lang={lang} />
            )}
          </DialogContent>
        </Dialog>
        {(loading || actionLoading) && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: "100%", height: "100%", top: 0, left: 0, background: "rgba(255,255,255,0.5)", zIndex: 1999 }}>
            <CircularProgress />
          </Box>
        )}
        <Dialog
          open={!!pendingWelcomeUser}
          onClose={() => setPendingWelcomeUser(null)}
        >
          <DialogTitle>{translations[lang].sendWelcomeEmail}</DialogTitle>
          <DialogContent>
            <Typography>
              {pendingWelcomeUser &&
                translations[lang].sendWelcomeEmailConfirm(
                  pendingWelcomeUser.name || pendingWelcomeUser.username || "",
                  pendingWelcomeUser.email || ""
                )}
            </Typography>
          </DialogContent>
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, m: 2 }}>
            <Button onClick={() => setPendingWelcomeUser(null)} color="inherit">
              {translations[lang].actionsConfirmNo}
            </Button>
            <Button
              color="primary"
              variant="contained"
              disabled={actionLoading}
              onClick={async () => {
                if (!pendingWelcomeUser) return;
                setActionLoading(true);
                try {
                  const res = await fetch("/api/send-welcome-email", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: pendingWelcomeUser.id })
                  });
                  if (res.ok) {
                    setNotification({ type: "success", message: translations[lang].sendWelcomeEmailSuccess });
                  } else {
                    logAdminError(res, "Send welcome email API error");
                    setNotification({ type: "error", message: translations[lang].sendWelcomeEmailError });
                  }
                } catch (err) {
                  logAdminError(err, "Send welcome email exception");
                  setNotification({ type: "error", message: translations[lang].sendWelcomeEmailError });
                }
                setActionLoading(false);
                setPendingWelcomeUser(null);
              }}
              autoFocus
            >
              {translations[lang].actionsConfirmYes}
            </Button>
          </Box>
        </Dialog>
        {/* Confirmation Dialog for Hide/Unhide */}
        <Dialog
          open={confirmationDialog.open}
          onClose={() => setConfirmationDialog({ ...confirmationDialog, open: false })}
        >
          <DialogTitle>{translations[lang].hideUserDialogTitle}</DialogTitle>
          <DialogContent>
            <Typography>{confirmationDialog.message}</Typography>
            <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button
                onClick={() => setConfirmationDialog({ ...confirmationDialog, open: false })}
                color="inherit"
              >
                {translations[lang].hideUserDialogCancel}
              </Button>
              <Button
                color="primary"
                variant="contained"
                onClick={async () => {
                  setConfirmationDialog({ ...confirmationDialog, open: false });
                  if (confirmationDialog.user) await handleHideUser(confirmationDialog.user);
                }}
              >
                {translations[lang].hideUserDialogConfirm}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

        {/* Notification Snackbar */}
        <NotificationSnackbar
          notification={notification}
          onClose={() => setNotification(null)}
        />

        {/* Future Payment Dialog */}
        <Dialog open={futurePaymentDialog.open} onClose={() => setFuturePaymentDialog(d => ({ ...d, open: false }))}>
          <DialogTitle>{translations[lang].futurePaymentDialogTitle}</DialogTitle>
          <DialogContent>
            <Typography sx={{ mb: 2 }}>
              {translations[lang].futurePaymentDialogMessage(futurePaymentDialog.athleteName)}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label={translations[lang].futurePaymentDialogAmount}
                type="number"
                size="small"
                value={futurePaymentDialog.amount}
                onChange={e =>
                  setFuturePaymentDialog(d => ({ ...d, amount: Number(e.target.value) }))
                }
                inputProps={{ min: 0, step: "0.01" }}
              />
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                adapterLocale={translations[lang].pickersLocale?.locale || undefined}
                localeText={translations[lang].pickersLocale?.components?.MuiLocalizationProvider?.defaultProps?.localeText}
              >
                          <DatePicker
                            label={translations[lang].paymentsTableDate}
                            value={editingPayment?.dueDate ? new Date(editingPayment.dueDate) : null}
                            onChange={(d) =>
                              setEditingPayment((p: any) => ({
                                ...p,
                                dueDate: d instanceof Date && !isNaN(d.getTime()) ? d.toISOString().slice(0, 10) : ""
                              }))
                            }
                            slotProps={{
                              textField: { size: "small", fullWidth: true, id: "edit-payment-dueDate" }
                            }}
                            format="dd/MM/yyyy"
                          />
              </LocalizationProvider>
            </Box>
            <Box sx={{ display: "flex", mt: 3, gap: 2, justifyContent: "flex-end" }}>
              <Button
                variant="text"
                onClick={() => setFuturePaymentDialog(d => ({ ...d, open: false }))}
              >
                {translations[lang].futurePaymentDialogNo}
              </Button>
              <Button
                variant="contained"
                onClick={async () => {
                  // POST create new payment
                  if (!futurePaymentDialog.userId || !futurePaymentDialog.dueDate || !futurePaymentDialog.amount) {
                    setFuturePaymentDialog(d => ({ ...d, open: false }));
                    return;
                  }
                  const res = await fetch(`/api/payment/${futurePaymentDialog.userId}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      dueDate: futurePaymentDialog.dueDate,
                      amount: futurePaymentDialog.amount
                    }),
                  });
                  setFuturePaymentDialog(d => ({ ...d, open: false }));
                  if (res.ok) {
                    const body = await res.json();
                    setSelected((sel: any) => ({
                      ...sel,
                      payments: [body.payment, ...(sel.payments || [])]
                    }));
                    setNotification({ type: "success", message: translations[lang].paymentAdded });
                  } else {
                    setNotification({ type: "error", message: translations[lang].manageUsersAddPaymentFail });
                  }
                }}
              >
                {translations[lang].futurePaymentDialogYes}
              </Button>
            </Box>
          </DialogContent>
        </Dialog>

      </Box>
    </Box>
  );
}
