"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Tabs, Tab, CircularProgress, TextField, Select, MenuItem } from "@mui/material";
import { translations, type Lang } from "../../i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

export default function UserTable({ lang }: { lang: Lang }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "payments">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<"active" | "all" | "due" | "nofuture">("active");

  useEffect(() => {
    setLoading(true);
    fetch("/api/get-user-management-info")
      .then(r => r.json())
      .then(d => {
        setUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Column definitions
  const columns: GridColDef[] = [
    { field: "name", headerName: translations[lang].manageUsersTableName, flex: 1, minWidth: 160 },
    { field: "username", headerName: translations[lang].manageUsersModalUsername, flex: 1, minWidth: 130 },
    { field: "email", headerName: translations[lang].manageUsersTableEmail, flex: 1.5, minWidth: 210 },
    {
      field: "status",
      headerName: translations[lang].manageUsersTableStatus,
      type: "string",
      minWidth: 150,
      valueGetter: (params: any) => {
        const row = params?.row;
        if (!row) return "";
        const now = new Date();
        const hasOverdueUnpaid = Array.isArray(row.payments)
          ? row.payments.some(
              (p: any) => !p.isPayed && new Date(p.dueDate) <= now
            )
          : false;
        if (hasOverdueUnpaid) return translations[lang].paymentsTableUnpaid ?? "Payments overdue";
        if (row.hidden) return translations[lang].hideUser;
        return translations[lang].paymentsTablePaid ?? "In good standing";
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
            <Tooltip title={translations[lang].paymentsTableUnpaid ?? "Payments overdue"}>
              <CancelIcon color="error" />
            </Tooltip>
          );
        if (row.hidden)
          return (
            <Tooltip title={translations[lang].hideUser}>
              <VisibilityOffIcon />
            </Tooltip>
          );
        return (
          <Tooltip title={translations[lang].paymentsTablePaid ?? "In good standing"}>
            <CheckCircleIcon color="success" />
          </Tooltip>
        );
      }
    },
    {
      field: "actions",
      headerName: translations[lang].manageUsersTableActions,
      sortable: false,
      filterable: false,
      minWidth: 150,
      align: "center",
      renderCell: ({ row }) => (
        <Tooltip title={row.hidden ? translations[lang].unhideUser : translations[lang].hideUser}>
          <IconButton
            size="small"
            onClick={e => {
              e.stopPropagation();
              handleHideUser(row);
            }}
          >
            {row.hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </IconButton>
        </Tooltip>
      )
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
      // Apply filters
      if (quickFilter === "due" && !hasOverdueUnpaid) return false;
      if (quickFilter === "nofuture" && hasFuturePayment) return false;
      if (quickFilter === "active" && u.hidden) return false;
      return matchesSearch;
    });
  }, [athletes, searchTerm, quickFilter]);

  const handleHideUser = async (user: any) => {
    const updatedUser = { ...user, hidden: !user.hidden };
    const res = await fetch(`/api/update-user/${user.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hidden: updatedUser.hidden }),
    });
    if (res.ok) {
      setUsers((prevUsers: any[]) =>
        prevUsers.map((u: any) => (u.id === user.id ? updatedUser : u))
      );
    }
  };

  // Payment/user info modal dialog
  const handleRowClick = (params: GridRowParams) => setSelected(params.row);

  const searchPlaceholders: Record<string, string> = {
    en: "Search by name, username, or email",
    es: "Buscar por nombre, usuario o email",
  };
  const placeholder = searchPlaceholders[lang] ?? "Search...";

  return (
    <Box sx={{ width: "100%", background: "background.paper" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2 }}>
        <TextField
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          placeholder={placeholder}
          variant="outlined"
          size="small"
          sx={{ width: 300 }}
          inputProps={{
            'aria-label': placeholder
          }}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 500 }}>
            {translations[lang].manageUsersQuickFilters}
          </Typography>
          <Select
            value={quickFilter}
            onChange={e => setQuickFilter(e.target.value as any)}
            size="small"
            sx={{ minWidth: 160 }}
          >
            <MenuItem value="active">{translations[lang].manageUsersQuickFilterAllActive}</MenuItem>
            <MenuItem value="all">{translations[lang].manageUsersQuickFilterAll}</MenuItem>
            <MenuItem value="due">{translations[lang].manageUsersQuickFilterDue}</MenuItem>
            <MenuItem value="nofuture">{translations[lang].manageUsersQuickFilterNoFuture}</MenuItem>
          </Select>
        </Box>
      </Box>
      <Box sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={filteredUsers}
          columns={columns}
          getRowId={row => row.id}
          loading={loading}
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
        <Dialog open={!!selected} maxWidth="md" fullWidth onClose={() => setSelected(null)}>
          <DialogTitle>
            👤 {selected?.name ?? ""}
          </DialogTitle>
          <DialogContent>
            <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
              <Tab value="info" label={translations[lang].infoTab} />
              <Tab value="payments" label={translations[lang].paymentsTab} />
            </Tabs>
            {modalTab === "info" && selected && (
              <Box sx={{ mt: 2 }}>
                <Typography>
                  <strong>{translations[lang].manageUsersModalUsername}:</strong> {selected.username}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersModalEmail}:</strong> {selected.email}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersModalLastVisitedWeek}:</strong> {selected.lastVisitedWeek ?? <span style={{color: "#888"}}>---</span>}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersModalRole}:</strong> {selected.role}
                </Typography>
                <Typography>
                  <strong>{translations[lang].manageUsersTableStatus}:</strong> {selected.hidden ? translations[lang].hideUser : translations[lang].paymentsTablePaid}
                </Typography>
              </Box>
            )}
            {modalTab === "payments" && selected && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1 }}>
                  {translations[lang].paymentsTablePaidHeader}
                </Typography>
                {!selected.payments || selected.payments.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    {translations[lang].manageUsersAddPaymentNone ?? "No payments found."}
                  </Typography>
                ) : (
                  <Box component="ul" sx={{ listStyle: "none", p: 0 }}>
                    {selected.payments.map((p: any) => (
                      <Box key={p.id} component="li" sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                        <Typography sx={{ minWidth: 100 }}>
                          {new Date(p.dueDate).toLocaleDateString(lang === "es" ? "es-ES" : "en-GB")}
                        </Typography>
                        <Typography sx={{ minWidth: 80 }}>
                          {typeof p.amount === "number" ? p.amount.toFixed(2) : p.amount}
                        </Typography>
                        <Box>
                          {p.isPayed ? (
                            <Tooltip title={translations[lang].paymentsTablePaid}>
                              <CheckCircleIcon color="success" />
                            </Tooltip>
                          ) : (
                            <Tooltip title={translations[lang].paymentsTableUnpaid}>
                              <CancelIcon color="error" />
                            </Tooltip>
                          )}
                        </Box>
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            )}
          </DialogContent>
        </Dialog>
        {loading && (
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", position: "absolute", width: "100%", height: "100%", top: 0, left: 0, background: "rgba(255,255,255,0.5)" }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
