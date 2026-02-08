"use client";
import React, { useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Dialog, DialogTitle
} from "@mui/material";
import { LineChart } from "@mui/x-charts/LineChart";


export default function MeasurementsTable({
  measurements,
  loading,
  columns,
  t,
  enableChart = false
}: {
  measurements: any[];
  loading: boolean;
  columns: { id: string; label: string }[];
  t: any;
  enableChart?: boolean;
}) {
  const [openGraph, setOpenGraph] = useState(false);
  const [graphField, setGraphField] = useState<string | null>(null);

  // Click handler for table header
  function handleHeaderClick(colId: string) {
    if (!enableChart) return;
    // Only allow graph for numeric fields (skip date)
    if (colId !== "date") {
      setGraphField(colId);
      setOpenGraph(true);
    }
  }

  function renderChart() {
    if (!graphField) return null;
    // Prepare data
    const ms = measurements
      .filter(m => m[graphField] !== undefined && m[graphField] !== null && m.date)
      .map(m => ({ date: m.date, value: Number(m[graphField]) }))
      .filter(d => !isNaN(d.value))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    if (ms.length === 0) {
      return <Typography sx={{ p: 2 }}>No data for this measurement.</Typography>;
    }

    const dataset = ms.map(d => ({
      date: new Date(d.date),
      value: d.value
    }));

    return (
      <Box sx={{
        background: "#000000",
        boxShadow: 2,
        borderRadius: 2,
        px: 1,
        py: 0.5,
        cursor: "pointer",
        "& .MuiChartsAxis-tickLabel": { fill: "#a3a3a3" },
        "& .MuiChartsLegend-root": { display: "none" }
      }}>
        <LineChart
          height={360}
          series={[
            {
              data: dataset.map(d => d.value),
              label: columns.find(c => c.id === graphField)?.label || "",
              color: "#1565c0",
              showMark: true,
              baseline: 0,
            }
          ]}
          xAxis={[
            {
              scaleType: "time",
              data: dataset.map(d => d.date),
              valueFormatter: (date: Date) => {
                if (!(date instanceof Date)) date = new Date(date);
                if (!date || isNaN(date.getTime())) return "";
                // Always use translations (already injected in t)
                const months = t.measurementsChartMonthsShort;
                const month =
                  Array.isArray(months) && months[date.getMonth()]
                    ? months[date.getMonth()]
                    : "";
                const year = String(date.getFullYear()).slice(-2);
                return `${month}'${year}`;
              },
            }
          ]}
          yAxis={[
            {
              label: columns.find(c => c.id === graphField)?.label || "",
              scaleType: "linear",
            }
          ]}
          grid={{ vertical: true, horizontal: true }}
          onClick={() => setOpenGraph(false)}
        />
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col.id}
                  sx={{
                    cursor: enableChart && col.id !== "date" ? "pointer" : "default",
                    textDecoration: enableChart && col.id !== "date" ? "underline dashed #bdbdbd" : undefined,
                    padding: "4px 8px"
                  }}
                  onClick={() => handleHeaderClick(col.id)}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ padding: "4px 8px" }}>{t.measurementsLoading}</TableCell>
              </TableRow>
            ) : measurements.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} sx={{ padding: "4px 8px" }}>{t.measurementsEmpty}</TableCell>
              </TableRow>
            ) : (
              measurements.map((m: any) => (
                <TableRow key={m.id}>
                  <TableCell sx={{ padding: "4px 8px" }}>
                    {m.date ? (() => {
                      const d = new Date(m.date);
                      if (isNaN(d.getTime())) return "";
                      const day = String(d.getDate()).padStart(2, '0');
                      const month = String(d.getMonth() + 1).padStart(2, '0');
                      const year = d.getFullYear();
                      return `${day}/${month}/${year}`;
                    })() : ""}
                  </TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.weight}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.neck}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.arm}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.waist}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.abdomen}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.hip}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.thigh}</TableCell>
                  <TableCell sx={{ padding: "4px 8px" }}>{m.calfMuscle}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openGraph && !!graphField} onClose={() => setOpenGraph(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          {graphField && columns.find(c => c.id === graphField)?.label}
        </DialogTitle>
        <Box sx={{ px: 3, pb: 3 }}>
          {renderChart()}
        </Box>
      </Dialog>
    </>
  );
}
