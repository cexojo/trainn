import React from "react";
import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import { Box, Button, TextField, Alert } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import { translations } from "@/app/i18n";
import type { Lang } from "@/app/i18n";
import { createTheme, ThemeProvider } from "@mui/material/styles";

/**
 * Shows panel for block completion follow-up (last block % progress table)
 */
export default function FollowUpBlocksPanel({ lang = "es" }: { lang?: Lang }) {
  const [threshold, setThreshold] = React.useState(70);
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
    fetch("/api/follow-up/block-completion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ threshold: Number(threshold) }),
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
  }, [threshold]);

  const columnsBlockCompletion: GridColDef[] = [
    { field: "firstName", headerName: translations[lang].athleteFirstName, flex: 1, minWidth: 120 },
    { field: "lastName", headerName: translations[lang].athleteLastName, flex: 1, minWidth: 120 },
    { field: "email", headerName: translations[lang].email, flex: 1.2, minWidth: 160 },
    {
      field: "blockNumber",
      headerName: translations[lang].blockNumberLabel,
      minWidth: 100,
      flex: 0.6,
      type: "number",
      align: "right",
      headerAlign: "right",
      renderCell: (params: any) => params.value,
    },
    {
      field: "blockCreatedAt",
      headerName: translations[lang].blockCreatedAtLabel,
      minWidth: 120,
      flex: 1,
      renderCell: (params: any) => {
        if (!params.value) return "";
        const date = new Date(params.value);
        if (!isNaN(date.getTime())) {
          return date.toLocaleDateString("es-ES");
        }
        return "";
      },
    },
    {
      field: "completionPercent",
      headerName: translations[lang].blockCompletionPercentLabel,
      minWidth: 140,
      flex: 1,
      renderCell: (params: any) => (
        <Box sx={{ width: "100%", pr: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box sx={{ width: "80%", minWidth: 50 }}>
              <LinearProgress
                variant="determinate"
                value={Number(params.value) > 100 ? 100 : Number(params.value)}
                color={Number(params.value) >= 100
                  ? "success"
                  : Number(params.value) >= 80
                  ? "primary"
                  : "warning"}
                sx={{
                  height: 8,
                  borderRadius: 5,
                  backgroundColor: "#222",
                }}
              />
            </Box>
            <Box sx={{ minWidth: 25, fontWeight: 600, color: "#fff" }}>
              {params.value}%
            </Box>
          </Box>
        </Box>
      ),
      sortable: true,
      align: "left",
      headerAlign: "left",
    }
  ];

  const paginatedRows = React.useMemo(() =>
    results.slice(pagination.page * pagination.pageSize, (pagination.page + 1) * pagination.pageSize)
      .map((r, idx) => ({ ...r, id: r.id || idx })), [results, pagination]);

  React.useEffect(() => {
    setPagination(p => ({ ...p, page: 0 }));
  }, [threshold]);

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <TextField
          label={translations[lang].blockCompletionThreshold}
          type="number"
          size="small"
          sx={{
            minWidth: 140,
            '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button': {
              WebkitAppearance: 'none',
              margin: 0
            },
            '& input[type=number]': {
              MozAppearance: 'textfield'
            }
          }}
          value={threshold}
          inputProps={{ min: 0, max: 100 }}
          onChange={e => setThreshold(Number(e.target.value))}
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
        {translations[lang].blockCompletionInfo}
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
          columns={columnsBlockCompletion}
          loading={loading}
          pageSizeOptions={[5, 10, 20]}
          paginationModel={pagination}
          onPaginationModelChange={setPagination}
          autoHeight
          disableRowSelectionOnClick
          sx={{ backgroundColor: "background.paper" }}
          initialState={{
            sorting: {
              sortModel: [
                { field: "completionPercent", sort: "desc" }
              ]
            }
          }}
        />
      </ThemeProvider>
    </Box>
  );
}
