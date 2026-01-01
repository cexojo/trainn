"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef, GridRowParams } from "@mui/x-data-grid";
import { Box, Typography, Button, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, Tabs, Tab, CircularProgress, TextField, Select, MenuItem } from "@mui/material";
import Grid from "@mui/material/Grid";
import { translations, type Lang } from "../../i18n";
import DeleteIcon from "@mui/icons-material/Delete";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Cancel";
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
              <Box sx={{ width: "100%", overflowX: "auto" }}>
                <table style={{ borderCollapse: "collapse", width: "100%" }}>
                  <thead>
                    <tr>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableExercise ?? "Exercise"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableSeries ?? "Series"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableDS ?? "DS"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableWeight ?? "Weight"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableReps ?? "Reps"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableRIR ?? "RIR"}</th>
                      <th style={{ borderBottom: "1px solid #ccc", padding: "4px 8px" }}>{translations[lang].trainingTableProgress ?? "Progress"}</th>
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
                              {(ex.minReps !== undefined || ex.maxReps !== undefined) && (
                                <span style={{ color: "#888", fontSize: 12, marginLeft: 4 }}>
                                  {` (${ex.minReps ?? "-"}-${ex.maxReps ?? "-"})`}
                                </span>
                              )}
                            </td>
                            <td style={{ padding: "4px 8px" }}>
                              {ex.effectiveRir ?? "-"}
                              {(ex.minRir !== undefined || ex.maxRir !== undefined) && (
                                <span style={{ color: "#888", fontSize: 12, marginLeft: 4 }}>
                                  {` (${ex.minRir ?? "-"}-${ex.maxRir ?? "-"})`}
                                </span>
                              )}
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
            </Box>
          ))
      )}
    </Box>
  );
}

export default function UserTable({ lang }: { lang: Lang }) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<any | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "payments" | "training">("info");
  const [searchTerm, setSearchTerm] = useState("");
  const [quickFilter, setQuickFilter] = useState<"active" | "all" | "due" | "nofuture" | "noplan">("active");

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

      if (quickFilter === "noplan") {
        return u.noPlan === true;
      }

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
            <MenuItem value="noplan">Sin planificación</MenuItem>
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
              <Tab value="training" label={translations[lang].trainingTab ?? "Training"} />
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

            {/* Training Tab */}
            {modalTab === "training" && selected && (
              <TrainingTab userId={selected.id} lang={lang} />
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
