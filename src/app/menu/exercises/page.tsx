"use client";
import React, { useEffect, useState } from "react";
import { Box, Typography, Button, TextField, MenuItem, Stack, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { translations, type Lang } from "../../i18n";

type Exercise = {
  id: string;
  name: string;
  recommendedMinReps?: number | null;
  recommendedMaxReps?: number | null;
  exerciseGroup: {
    id: string;
    name: string;
  };
};

type ExerciseGroup = {
  id: string;
  name: string;
};

export default function ExercisesPage() {
  const lang: Lang = "es";
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [groups, setGroups] = useState<ExerciseGroup[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    groupId: "",
    recommendedMinReps: "",
    recommendedMaxReps: "",
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/exercises")
      .then(r => r.json())
      .then(data => setExercises(data.exercises))
      .catch(() => setExercises([]));
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
      setExercises(prev => [...prev, newExercise]);
      setShowAddForm(false);
    } else {
      setError((await res.json()).error || "Failed to add exercise.");
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Ejercicios
      </Typography>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={handleOpenAddForm} sx={{ mb: 2 }}>
        Añadir ejercicio
      </Button>
      {showAddForm && (
        <Paper sx={{ p: 2, mb: 2, maxWidth: 400 }}>
          <form onSubmit={handleAddExercise}>
            <Stack spacing={2}>
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
              >
                {groups.map(g => (
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
              <Button type="submit" variant="contained" color="success">
                Guardar
              </Button>
              <Button onClick={() => setShowAddForm(false)}>
                Cancelar
              </Button>
            </Stack>
          </form>
        </Paper>
      )}
      <Box>
        <Typography variant="h6" gutterBottom>Listado de ejercicios</Typography>
        {exercises.length === 0 && <Typography color="text.secondary">No hay ejercicios todavía.</Typography>}
        <Stack spacing={2}>
          {exercises.map(ex => (
            <Paper key={ex.id} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>
                <strong>{ex.name}</strong> - Grupo: <strong>{ex.exerciseGroup.name}</strong>
                {ex.recommendedMinReps != null && ` | Reps mínimas recomendadas: ${ex.recommendedMinReps}`}
                {ex.recommendedMaxReps != null && ` | Reps máximas recomendadas: ${ex.recommendedMaxReps}`}
              </span>
            </Paper>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
