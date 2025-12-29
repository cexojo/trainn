"use client";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import StatCard from "./StatCard";
import { translations } from "@/app/i18n";

export default function StatCardUnpaidRevenue() {
  const [value, setValue] = useState<string>("...");
  const [numericValue, setNumericValue] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const lang = "es"; // Replace with dynamic lang if available

  useEffect(() => {
    fetch(`/api/unpaid-payments?lang=${lang}`, { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        setValue(data.unpaid.toLocaleString("es-ES", { style: "currency", currency: "EUR" }));
        setNumericValue(typeof data.unpaid === "number" ? data.unpaid : null);
      })
      .catch(() => {
        setValue("-");
        setNumericValue(null);
      })
      .finally(() => setLoading(false));
  }, []);

  // Blinking border style for overdue
  const blinkingBorder = {
    border: "2px solid red",
    borderRadius: 8,
    animation: "blinking-border 1s steps(2, start) infinite",
    boxSizing: "border-box"
  };

  // Only show value as main number, no chart, no trend
  return (
    <>
      <style>{`
      @keyframes blinking-border {
        0% { border-color: red; }
        50% { border-color: transparent; }
        100% { border-color: red; }
      }
      `}</style>
      <Box
        sx={
          !loading && numericValue !== null && numericValue > 0
            ? blinkingBorder
            : { border: "2px solid #efefef", borderRadius: 8, boxSizing: "border-box" }
        }
      >
        <StatCard
          title={translations[lang].unpaidRevenueTitle || "Unpaid revenue"}
          value={loading ? "..." : value}
          interval={translations[lang].unpaidRevenueLabel || "Total overdue (unpaid) revenue"}
          trend="neutral"
          data={[]}
          labels={[]}
          trendValue={undefined}
          showTrendChip={false}
        />
      </Box>
    </>
  );
}
