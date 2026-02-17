import React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Button, TextField, FormControl, InputLabel, Select, MenuItem, Alert } from "@mui/material";
import { translations } from "@/app/i18n";
import type { Lang } from "@/app/i18n";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export default function FollowUpActivityPanel({ lang = "es" }: { lang?: Lang }) {
  const [measurement, setMeasurement] = React.useState<"d" | "w" | "m">("w");
  const [units, setUnits] = React.useState(1);

  const [results, setResults] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [pagination, setPagination] = React.useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });

  const fetchResults = React.useCallback(() => {
    setLoading(true);
    setError(null);
    fetch("/api/follow-up/active-athletes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ measurement, units: Number(units) }),
    })
      .then(async res => {
        if (!res.ok) throw new Error((await res.json()).error || "Error");
        return res.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [measurement, units]);

  // Locale map for proper date formatting
  const localeMap = { en: "en-GB", es: "es-ES" };
  const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" } as const;

  // Table columns for inactivity mode
  const columnsInactivity: GridColDef[] = [
    { field: "firstName", headerName: translations[lang].athleteFirstName, flex: 1, minWidth: 120 },
    { field: "lastName", headerName: translations[lang].athleteLastName, flex: 1, minWidth: 120 },
    { field: "email", headerName: translations[lang].email, flex: 1.2, minWidth: 160 },
    { 
      field: "lastActivityDate", 
      headerName: translations[lang].lastActivityDate, 
      minWidth: 150, 
      flex: 1,
      renderCell: (params: any) => {
        const value = params.value;
        if (value) {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            // Use user-selected language to determine locale
            return date.toLocaleDateString(localeMap[lang] || "en-GB", dateOptions);
          }
        }
        if (typeof params.row?.daysSinceLastActivity === "number" && params.row.daysSinceLastActivity > 0) {
          return "";
        }
        return translations[lang].neverLabel;
      }
    },
    { field: "daysSinceLastActivity", headerName: translations[lang].daysSinceLastActivity, minWidth: 130, type: "number", flex: 1 },
  ];

  const paginatedRows = React.useMemo(() =>
    results.slice(pagination.page * pagination.pageSize, (pagination.page + 1) * pagination.pageSize)
      .map((r, idx) => ({ ...r, id: r.id || idx })), [results, pagination]);

  React.useEffect(() => {
    setPagination(p => ({ ...p, page: 0 }));
  }, [measurement, units]);

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "end" }}>
        <FormControl size="small" sx={{ minWidth: 140 }}>
          <InputLabel id="measure-type-label">
            {translations[lang].periodUnitLabel}
          </InputLabel>
          <Select
            labelId="measure-type-label"
            value={measurement}
            label={translations[lang].periodUnitLabel}
            onChange={e => setMeasurement(e.target.value as "d" | "w" | "m")}
          >
            <MenuItem value="d">{translations[lang].daysLabel}</MenuItem>
            <MenuItem value="w">{translations[lang].weeksLabel}</MenuItem>
            <MenuItem value="m">{translations[lang].monthsLabel}</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label={translations[lang].unitsLabel}
          type="number"
          size="small"
          value={units}
          inputProps={{ min: 1 }}
          onChange={e => setUnits(Number(e.target.value))}
          sx={{ minWidth: 100 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={fetchResults}
          size="medium"
          sx={{ height: 40 }}
        >
          {translations[lang].searchButton}
        </Button>
      </Box>

      <Alert severity="info" sx={{ mb: 2 }}>
        {translations[lang].followUpInfoBox}
      </Alert>

      {error && (<Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>)}

      <ThemeProvider
        theme={createTheme(
          {
            palette: {
              mode: 'dark',
              background: {
                default: '#0a0a0a',
                paper: '#171717'
              }
            }
          },
          translations[lang].dataGridLocale,
          translations[lang].pickersLocale,
          translations[lang].coreLocale
        )}
      >
        <DataGrid
          rows={paginatedRows}
          columns={columnsInactivity}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          autoHeight
          disableRowSelectionOnClick
          sx={{ backgroundColor: "background.paper" }}
        />
      </ThemeProvider>
    </Box>
  );
}
