"use client";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";

import { translations } from '@/app/i18n';

export default function StatCardFutureRevenue() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const lang = "es"; // Replace with current language context if available

  useEffect(() => {
    fetch(`/api/future-revenue?lang=${lang}`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authorized or failed to fetch");
        return res.json();
      })
      .then((apiData: any[]) => {
        setData(apiData.map(d => d.futureRevenue));
        setLabels(apiData.map(d => d.monthLabel));
      })
      .catch(() => {
        setData([]);
        setLabels([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const total = data.reduce((acc, cur) => acc + cur, 0);
  const value = total.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  let trend: "up" | "down" | "neutral" = "neutral";
  let trendValue: string | undefined = undefined;
  if (data.length >= 2) {
    const prev = data[data.length - 2];
    const curr = data[data.length - 1];
    if (curr > prev) trend = "up";
    else if (curr < prev) trend = "down";

    if (prev === 0) {
      trendValue = curr === 0 ? "+0%" : "+100%";
    } else {
      const percent = ((curr - prev) / Math.abs(prev)) * 100;
      const sign = percent > 0 ? "+" : percent < 0 ? "" : "+";
      trendValue = `${sign}${Math.round(percent)}%`;
    }
  }

  return (
    <StatCard
      title={translations[lang].futureRevenueTitle}
      value={loading ? "..." : value}
      interval={translations[lang].futureRevenueInterval}
      trend={trend}
      data={data}
      labels={labels}
      trendValue={trendValue}
    />
  );
}
