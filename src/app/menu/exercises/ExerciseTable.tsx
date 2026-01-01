"use client";
import React, { useState, useEffect, useMemo } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, Tooltip, TextField, MenuItem, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { translations, type Lang } from "../../i18n";

type ExerciseGroup = {
  id: string;
  name: string;
};

type Exercise = {
  id: string;
  name: string;
  exerciseGroup: ExerciseGroup;
  recommendedMinReps?: number | null;
  recommendedMaxReps?: number | null;
};

export default function ExerciseTable({ lang }: { lang: Lang }) {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [groups, setGroups] = useState<ExerciseGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    groupId: "",
    recommendedMinReps: "",
    recommendedMaxReps: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [rowUpdateError, setRowUpdateError] = useState<string | null>(null);
  
  // SEARCH AND FILTER STATES
  const [searchTerm, setSearchTerm] = useState("");
  const [groupFilter, setGroupFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("/api/exercises")
      .then(r => r.json())
      .then(data => {
        const exercisesWithGroupName = (data.exercises || []).map(
          (e: any) => ({ ...e, groupName: e.exerciseGroup?.name || "" })
        );
        setExercises(exercisesWithGroupName);
      })
      .catch(() => setExercises([]))
      .finally(() => setLoading(false));
    fetch("/api/exercise-groups")
      .then(r => r.json())
      .then(data => setGroups(data.groups))
      .catch(() => setGroups([]));
  }, []);

  const handleOpenAddForm = () => {
    setForm({ name: "", groupId: "", recommendedMinReps: "", recommendedMaxReps: "" });
    setError(null);
    setShowAddForm(true);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddExercise = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.groupId) {
      setError("Group is required.");
      return;
    }
    const payload = {
      name: form.name.trim(),
      exerciseGroupId: form.groupId,
      recommendedMinReps: form.recommendedMinReps ? Number(form.recommendedMinReps) : null,
      recommendedMaxReps: form.recommendedMaxReps ? Number(form.recommendedMaxReps) : null,
    };
    const res = await fetch("/api/exercises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const newExercise = await res.json();
      setExercises(prev => [
        ...prev, 
        { ...newExercise, groupName: newExercise.exerciseGroup?.name || "" }
      ]);
      setShowAddForm(false);
    } else {
      setError((await res.json()).error || "Failed to add exercise.");
    }
  };

  const columns: GridColDef[] = [
    { 
      field: "name", 
      headerName: "Nombre",
      flex: 1,
      minWidth: 160,
      sortable: true,
      disableColumnMenu: true
    },
    { 
      field: "groupName",
      headerName: "Grupo",
      flex: 1,
      minWidth: 120,
      sortable: false,
      disableColumnMenu: true
    },
    {
      field: "recommendedMinReps",
      headerName: "Reps mínimas",
      type: "number",
      flex: 0.5,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      editable: true,
      renderCell: (params) => (
        params.value === undefined || params.value === null || params.value === ''
          ? <span>-</span>
          : <span>{params.value}</span>
      ),
      valueParser: (value) => {
        if (value === '' || value === undefined || value === null) return null;
        const intVal = Number(value);
        if (!Number.isInteger(intVal) || intVal < 0) return null;
        return intVal;
      }
    },
    {
      field: "recommendedMaxReps",
      headerName: "Reps máximas",
      type: "number",
      flex: 0.5,
      minWidth: 100,
      sortable: false,
      disableColumnMenu: true,
      editable: true,
      renderCell: (params) => (
        params.value === undefined || params.value === null || params.value === ''
          ? <span>-</span>
          : <span>{params.value}</span>
      ),
      valueParser: (value) => {
        if (value === '' || value === undefined || value === null) return null;
        const intVal = Number(value);
        if (!Number.isInteger(intVal) || intVal < 0) return null;
        return intVal;
      }
    },
  ];

  // Filtered and sorted exercises
  const filteredExercises = useMemo(() => {
    let data = exercises;
    if (searchTerm.trim())
      data = data.filter(ex =>
        ex.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    if (groupFilter)
      data = data.filter(ex =>
        ex.exerciseGroup?.id === groupFilter
      );
    // Default sort: by name ascending
    data = data.slice().sort((a, b) =>
      (a.name || "").localeCompare(b.name || "")
    );
    return data;
  }, [exercises, searchTerm, groupFilter]);

  return (
    <Box sx={{ width: "100%", background: "background.paper" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 2, flexWrap: "wrap" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexWrap: "wrap" }}>
          <TextField
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nombre de ejercicio"
            variant="outlined"
            size="small"
            sx={{ width: 270 }}
            inputProps={{ 'aria-label': "Buscar por nombre de ejercicio" }}
          />
          <TextField
            select
            size="small"
            label="Grupo"
            value={groupFilter}
            onChange={e => setGroupFilter(e.target.value)}
            sx={{ minWidth: 150 }}
          >
            <MenuItem value="">Todos los grupos</MenuItem>
            {(groups ?? []).map(g => (
              <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
            ))}
          </TextField>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddForm}>
            Añadir ejercicio
          </Button>
        </Box>
      </Box>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={filteredExercises}
          columns={columns}
          getRowId={row => row.id}
          loading={loading}
          pageSizeOptions={[10, 25, 50]}
          processRowUpdate={async (newRow, oldRow) => {
            const min = newRow.recommendedMinReps;
            const max = newRow.recommendedMaxReps;
            if (
              min !== null && min !== undefined &&
              max !== null && max !== undefined &&
              min > max
            ) {
              throw new Error("Las repeticiones mínimas no pueden ser mayores que las máximas.");
            }
            // Determine what changed
            const updates: Record<string, any> = { id: newRow.id };
            let changed = false;
            if (min !== oldRow.recommendedMinReps) {
              updates.recommendedMinReps = min;
              changed = true;
            }
            if (max !== oldRow.recommendedMaxReps) {
              updates.recommendedMaxReps = max;
              changed = true;
            }
            if (changed) {
              const res = await fetch(`/api/exercises/${newRow.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updates),
              });
              if (res.ok) {
                const updated = await res.json();
                setExercises(prev => prev.map(e => e.id === newRow.id ? updated : e));
                return updated;
              } else {
                let customMessage = "The range of repetitions must be valid";
                try {
                  const err = await res.json();
                  if (typeof err.error === "string" && err.error.length < 120) {
                    customMessage = err.error;
                  }
                } catch {}
                throw new Error(customMessage);
              }
            }
            return newRow;
          }}
          onProcessRowUpdateError={(error) => {
            if (error?.message) {
              setRowUpdateError(error.message);
            } else {
              setRowUpdateError("Error actualizando repeticiones");
            }
          }}
          initialState={{
            pagination: { paginationModel: { pageSize: 10, page: 0 } },
            sorting: { sortModel: [{ field: "name", sort: "asc" }] },
          }}
          sx={{
            background: "background.paper",
            cursor: "pointer",
          }}
        />
      </Box>
      <Dialog open={showAddForm} maxWidth="xs" fullWidth onClose={() => setShowAddForm(false)}>
        <DialogTitle>Añadir ejercicio</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddExercise}>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <TextField
                label="Nombre"
                name="name"
                required
                value={form.name}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                label="Grupo"
                name="groupId"
                select
                required
                value={form.groupId}
                onChange={handleFormChange}
                fullWidth
                disabled={(groups ?? []).length === 0}
              >
                {(groups ?? []).map(g => (
                  <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
                ))}
              </TextField>
              <TextField
                label="Repeticiones mínimas recomendadas"
                name="recommendedMinReps"
                type="number"
                value={form.recommendedMinReps}
                onChange={handleFormChange}
                fullWidth
              />
              <TextField
                label="Repeticiones máximas recomendadas"
                name="recommendedMaxReps"
                type="number"
                value={form.recommendedMaxReps}
                onChange={handleFormChange}
                fullWidth
              />
              {error && <Typography color="error">{error}</Typography>}
              <Stack direction="row" spacing={2}>
                <Button type="submit" variant="contained" color="success">
                  Guardar
                </Button>
                <Button onClick={() => setShowAddForm(false)}>
                  Cancelar
                </Button>
              </Stack>
            </Stack>
          </form>
        </DialogContent>
      </Dialog>
    {/* Snackbar for min > max warning */}
    {rowUpdateError && (
      <Box sx={{ position: "fixed", bottom: 24, left: 0, width: "100%", zIndex: 1301 }}>
        <Box
          sx={{
            maxWidth: 420,
            margin: "0 auto",
            bgcolor: "#fff3cd",
            color: "#856404",
            border: "1px solid #ffeeba",
            borderRadius: 2,
            p: 2,
            textAlign: "center",
            boxShadow: 2,
          }}
          onClick={() => setRowUpdateError(null)}
        >
          {rowUpdateError}
        </Box>
      </Box>
    )}
    </Box>
  );
}
