"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Tabs, Tab, CircularProgress, TextField, Select, MenuItem, Menu } from "@mui/material";
import { translations, type Lang } from "@/app/i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useRef } from "react";

function EditableUserField({ label, value, field, userId, onUpdated, lang }: {
  label: string,
  value: string,
  field: "name" | "username" | "email",
  userId: string,
  onUpdated: (val: string) => void,
  lang: Lang,
}) {
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
    } else {
      // optionally show error
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
          {value}
        </Typography>
      )}
      {loading && <CircularProgress size={18} />}
    </Box>
  );
}

function TrainingTab({ userId, lang }: { userId: string, lang: Lang }) {
  const [blocks, setBlocks] = useState<any[]>([]);
  const [blockId, setBlockId] = useState<string | undefined>();
  const [weekId, setWeekId] = useState<string | undefined>();
  const [weeks, setWeeks] = useState<any[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<any | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<any | null>(null);
  const [exerciseDefs, setExerciseDefs] = useState<any[]>([]);
  const [trainingDays, setTrainingDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch training data on load or when block or week changes
  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    const params = new URLSearchParams({ userId });
    if (weekId) params.append("weekId", weekId);
    fetch(`/api/training-data?${params.toString()}`)
      .then(r => r.json())
      .then(res => {
        setBlocks(res.blocks || []);
        setExerciseDefs(res.exerciseDefs || []);
        setTrainingDays(res.trainingDays || []);
        setSelectedBlock(res.selectedBlock || null);
        setSelectedWeek(res.selectedWeek || null);
        setWeeks(res.selectedBlock?.weeks || []);
        setLoading(false);
      });
  }, [userId, blockId, weekId]);

  // Ensure default block/week selection
  useEffect(() => {
    if (blocks.length && !blockId) setBlockId(blocks[blocks.length - 1].id);
  }, [blocks, blockId]);
  useEffect(() => {
    if (weeks.length && !weekId) setWeekId(weeks[weeks.length - 1].id);
  }, [weeks, weekId]);

  // Flatten all exercises with their associated day label for table rendering
  const dayLabelByNumber: Record<string, string> = {};
  trainingDays.forEach((d: any) => {
    dayLabelByNumber[d.dayNumber] = d.dayLabel;
  });
  const allExercises: any[] = exerciseDefs.map((ex: any) => ({
    ...ex,
    dayLabel: dayLabelByNumber[ex.trainingDay?.dayNumber ?? ""] ?? "",
    dayNumber: ex.trainingDay?.dayNumber ?? ""
  }));

  // Sort by dayNumber, exerciseNumber, seriesNumber
  // Ensure proper sorting: day (asc), day exercise (asc), seriesNumber (asc)
  allExercises.sort((a, b) => {
    const dayA = Number(a.dayNumber) || 0;
    const dayB = Number(b.dayNumber) || 0;
    if (dayA !== dayB) return dayA - dayB;
    const exA = Number(a.exerciseNumber) || 0;
    const exB = Number(b.exerciseNumber) || 0;
    if (exA !== exB) return exA - exB;
    const seriesA = Number(a.seriesNumber) || 0;
    const seriesB = Number(b.seriesNumber) || 0;
    return seriesA - seriesB;
  });

  // Only include training days for the selected week (if found)
  const trainingDayIdsInSelectedWeek = trainingDays
    .filter((d: any) =>
      selectedWeek && d.date
        ? new Date(d.date).getTime() >= new Date(selectedWeek.weekStart).getTime() &&
          new Date(d.date).getTime() <= new Date(selectedWeek.weekEnd).getTime()
        : true
    )
    .map((d: any) => d.id);

  // Show all series for the selected week (no requirement for user-provided values)
  const filteredExercises = allExercises.filter(
    ex => trainingDayIdsInSelectedWeek.includes(ex.trainingDay?.id)
  );

  // Group by dayNumber for rendering
  const exercisesByDay: Record<string, any[]> = {};
  filteredExercises.forEach(ex => {
    if (!exercisesByDay[ex.dayNumber]) exercisesByDay[ex.dayNumber] = [];
    exercisesByDay[ex.dayNumber].push(ex);
  });

  // Debug rendering if no results
  const debugInfo = (
    <pre style={{ fontSize: "11px", background: "#eee", color: "#a33", padding: 8, margin: 4, maxHeight: 240, overflow: "auto" }}>
      {JSON.stringify({ filteredExercises, exercisesByDay }, null, 2)}
    </pre>
  );
  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <strong>Block:</strong>
        <Select
          size="small"
          value={blockId || ""}
          onChange={e => {
            setBlockId(e.target.value);
            setWeekId(undefined);
          }}
          sx={{ minWidth: 100 }}
        >
          {blocks.map((b: any) => (
            <MenuItem key={b.id} value={b.id}>
              {`#${b.blockNumber}`}
            </MenuItem>
          ))}
        </Select>
        <strong>Week:</strong>
        <Select
          size="small"
          value={weekId || ""}
          onChange={e => setWeekId(e.target.value)}
          sx={{ minWidth: 100 }}
        >
          {weeks.map((w: any) => (
            <MenuItem key={w.id} value={w.id}>
              {`#${w.weekNumber}`}
            </MenuItem>
          ))}
        </Select>
      </Box>
      {loading ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        Object.entries(exercisesByDay)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([dayNumber, dayExercises], i) => (
            <Box key={dayNumber} sx={{ mb: 4 }}>
              <Typography variant="caption" sx={{ mb: 0.5, mt: 2, pl: 1, fontWeight: 600, color: "#555", fontSize: 13 }}>
                {`${translations[lang].day} ${dayExercises[0]?.dayNumber ?? dayNumber}`}
              </Typography>
              {dayExercises.length === 0 ? (
                <Box sx={{ color: "#a33" }}>Ningún ejercicio para este día. {debugInfo}</Box>
              ) : (
                <Box sx={{ width: "100%", overflowX: "auto" }}>
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableExercise}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableSeries}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableDS}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableWeight}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableReps}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableRIR}</th>
                        <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableProgress}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(() => {
                        // Merge cells for consecutive series with the same exercise id
                        const mergedRows = [];
                        let lastExerciseId = null;
                        let groupStartIdx = 0;
                        for (let idx = 0; idx < dayExercises.length; ++idx) {
                          const ex = dayExercises[idx];
                          const isFirst = idx === 0 || dayExercises[idx].exercise?.id !== dayExercises[idx - 1].exercise?.id;
                          const isLast = idx === dayExercises.length - 1 || dayExercises[idx].exercise?.id !== dayExercises[idx + 1].exercise?.id;
                          if (isFirst) groupStartIdx = idx;
                          let rowspan = 1;
                          if (isFirst) {
                            // compute rowspan for this exercise group
                            for (let j = idx + 1; j < dayExercises.length; ++j) {
                              if (dayExercises[j].exercise?.id !== ex.exercise?.id) break;
                              rowspan++;
                            }
                          }
                          mergedRows.push(
                            <tr key={ex.id + "-" + idx} style={{ borderBottom: "1px solid #eee" }}>
                              {isFirst ? (
                                <td rowSpan={rowspan} style={{ padding: "4px 8px", verticalAlign: "middle", fontWeight: 500 }}>{ex.exercise?.name ?? ""}</td>
                              ) : null}
                              <td style={{ padding: "4px 8px" }}>{ex.seriesNumber ?? ""}</td>
                              <td style={{ padding: "4px 8px", color: "#e67300", fontWeight: ex.isDropset ? 700 : 400 }}>
                                {ex.isDropset ? "DS" : ""}
                              </td>
                              <td style={{ padding: "4px 8px" }}>{ex.effectiveWeight ?? "-"}</td>
                              <td style={{ padding: "4px 8px" }}>
                                {ex.effectiveReps ?? "-"}
                                {(ex.minReps !== undefined || ex.maxReps !== undefined) && (() => {
                                  function renderRange(
                                    min: number | string | null | undefined,
                                    max: number | string | null | undefined
                                  ) {
                                    const isEmpty = (v: number | string | null | undefined) =>
                                      v === undefined || v === null || v === "";
                                    if (isEmpty(min) && isEmpty(max)) return "";
                                    if (!isEmpty(min) && isEmpty(max)) return `Min. ${min}`;
                                    if (isEmpty(min) && !isEmpty(max)) return `Max. ${max}`;
                                    if (!isEmpty(min) && !isEmpty(max) && min === max) return min;
                                    return `${min}-${max}`;
                                  }
                                  const range = renderRange(ex.minReps, ex.maxReps);
                                  return range
                                    ? <span style={{ color: "#888", fontSize: 12, marginLeft: 4 }}>{range}</span>
                                    : null;
                                })()}
                              </td>
                              <td style={{ padding: "4px 8px" }}>
                                {ex.effectiveRir ?? "-"}
                                {(ex.minRir !== undefined || ex.maxRir !== undefined) && (() => {
                                  function renderRange(
                                    min: number | string | null | undefined,
                                    max: number | string | null | undefined
                                  ) {
                                    const isEmpty = (v: number | string | null | undefined) =>
                                      v === undefined || v === null || v === "";
                                    if (isEmpty(min) && isEmpty(max)) return "";
                                    if (!isEmpty(min) && isEmpty(max)) return `Min. ${min}`;
                                    if (isEmpty(min) && !isEmpty(max)) return `Max ${max}`;
                                    if (!isEmpty(min) && !isEmpty(max) && min === max) return min;
                                    return `${min}-${max}`;
                                  }
                                  const range = renderRange(ex.minRir, ex.maxRir);
                                  return range
                                    ? <span style={{ color: "#888", fontSize: 12, marginLeft: 4 }}>{range}</span>
                                    : null;
                                })()}
                              </td>
                              <td style={{ padding: "4px 8px" }}>{ex.progress ?? ""}</td>
                            </tr>
                          );
                        }
                        return mergedRows;
                      })()}
                    </tbody>
                  </table>
                </Box>
              )}
            </Box>
          ))
      )}
    </Box>
  );
}

export default function UserTable({
  lang,
  crearAtletaButton,
  refreshKey
}: {
  lang: Lang,
  crearAtletaButton?: React.ReactNode,
  refreshKey?: number
}) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "payments" | "training">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<"active" | "all" | "inactive" | "due" | "nofuture" | "noplan">("active");

  // Context menu state
  const [contextMenuAnchor, setContextMenuAnchor] = useState<{mouseX: number, mouseY: number} | null>(null);
  const [contextMenuRow, setContextMenuRow] = useState<any | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [pendingWelcomeUser, setPendingWelcomeUser] = useState<any | null>(null);
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null);
  // Import logAdminError
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const logAdminError = require("@/app/utils/logAdminError").logAdminError;

  useEffect(() => {
    setLoading(true);
    fetch("/api/get-user-management-info")
      .then(r => r.json())
      .then(d => {
        setUsers(Array.isArray(d) ? d : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [refreshKey]);

  // Column definitions
  const columns: GridColDef[] = [
    { field: "name", headerName: translations[lang].manageUsersTableName, flex: 1, minWidth: 160, sortable: false },
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
              <CancelIcon color="error" />
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
            <CheckCircleIcon color="success" />
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

      // Inactivo: show only hidden users
      if (quickFilter === "inactive") {
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

      // Active: show only not hidden
      if (quickFilter === "active") {
        return u.hidden !== true && matchesSearch;
      }

      // All
      return matchesSearch;
    });
  }, [athletes, searchTerm, quickFilter]);

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

  // Payment/user info modal dialog
  const handleRowClick = (params: GridRowParams) => setSelected(params.row);

  const searchPlaceholders: Record<string, string> = {
    en: "Search by name, username, or email",
    es: "Buscar por nombre, usuario o email",
  };
  const placeholder = searchPlaceholders[lang] ?? "Search...";

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
                <MenuItem value="inactive">{translations[lang].manageUsersQuickFilterInactive}</MenuItem>
                <MenuItem value="due">{translations[lang].manageUsersQuickFilterDue}</MenuItem>
                <MenuItem value="nofuture">{translations[lang].manageUsersQuickFilterNoFuture}</MenuItem>
                <MenuItem value="noplan">Sin planificación</MenuItem>
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
            onClick={async (e) => {
              e.stopPropagation();
              setContextMenuAnchor(null);
              // Defer API call to next microtask so menu closes before heavy work.
              if (contextMenuRow) {
                await handleHideUser(contextMenuRow);
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
          <DialogTitle>
            👤 {selected?.name ?? ""}
          </DialogTitle>
          <DialogContent sx={{ height: 'calc(50vh - 64px)', overflowY: 'auto' }}>
            <Tabs value={modalTab} onChange={(_, v) => setModalTab(v)}>
              <Tab value="info" label={translations[lang].infoTab} />
              <Tab value="payments" label={translations[lang].paymentsTab} />
              <Tab value="training" label={translations[lang].trainingTab} />
            </Tabs>
            {modalTab === "info" && selected && (
              <Box sx={{ mt: 2 }}>
                {/* Editable Username */}
                <EditableUserField
                  label={translations[lang].manageUsersModalUsername}
                  value={selected.username}
                  field="username"
                  userId={selected.id}
                  onUpdated={(newVal) =>
                    setSelected({ ...selected, username: newVal })
                  }
                  lang={lang}
                />
                {/* Editable Email */}
                <EditableUserField
                  label={translations[lang].manageUsersModalEmail}
                  value={selected.email}
                  field="email"
                  userId={selected.id}
                  onUpdated={(newVal) =>
                    setSelected({ ...selected, email: newVal })
                  }
                  lang={lang}
                />
                {/* Editable Name */}
                <EditableUserField
                  label={translations[lang].manageUsersModalName}
                  value={selected.name}
                  field="name"
                  userId={selected.id}
                  onUpdated={(newVal) =>
                    setSelected({ ...selected, name: newVal })
                  }
                  lang={lang}
                />
                <Typography>
                  <strong>{translations[lang].manageUsersModalLastLogin}:</strong>{" "}
                  {selected.lastOKLogin
                    ? new Date(selected.lastOKLogin).toLocaleString(lang === "es" ? "es-ES" : "en-GB")
                    : <span style={{color: "#888"}}>---</span>}
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
                    {translations[lang].manageUsersAddPaymentNone}
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

            {/* Training Tab */}
            {modalTab === "training" && selected && (
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
        {/* Notification Snackbar */}
        {notification && (
          <Box sx={{
            position: "fixed",
            bottom: 32,
            left: 0,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            zIndex: 16000,
          }}>
            <Box sx={{
              bgcolor: notification.type === "success" ? "#1AAF4B" : "#E53935",
              color: "#fff",
              px: 3,
              py: 1.2,
              borderRadius: 2,
              boxShadow: 3,
              fontWeight: 500,
              fontSize: 16,
              textAlign: "center",
              mx: "auto",
              minWidth: 240,
            }}>
              {notification.message}
              <IconButton
                size="small"
                sx={{ color: "#fff", ml: 2 }}
                onClick={() => setNotification(null)}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
