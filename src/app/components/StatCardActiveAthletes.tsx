"use client";
import StatCard from "./StatCard";
import { useEffect, useState } from "react";

type APIAthleteData = { month: string, activeAthletes: number }[];

import { translations } from '@/app/i18n';

export default function StatCardActiveAthletes() {
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const lang = "es"; // Replace with your language context logic if available

  useEffect(() => {
    fetch(`/api/active-athletes?lang=${lang}`, {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) throw new Error("Not authorized or failed to fetch");
        return res.json();
      })
      .then((apiData: any[]) => {
        setData(apiData.map(d => d.activeAthletes));
        // Use the new localized label
        setLabels(apiData.map(d => d.monthLabel));
      })
      .catch(() => {
        setData([]);
        setLabels([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const value = data.length ? data[data.length - 1].toLocaleString() : "-";
  // Calculate trend direction and percent change
  let trend: "up" | "down" | "neutral" = "neutral";
  let trendValue = "-";
  if (data.length >= 2) {
    const prev = data[data.length - 2];
    const curr = data[data.length - 1];
    const percent = prev === 0 ? (curr === 0 ? 0 : 100) : ((curr - prev) / prev) * 100;
    if (prev === 0) {
      trendValue = curr === 0 ? "+0%" : "+100%";
      trend = curr > 0 ? "up" : "neutral";
    } else {
      const sign = percent > 0 ? "+" : percent < 0 ? "" : "+";
      trendValue = `${sign}${Math.round(percent)}%`;
      trend = percent > 0 ? "up" : percent < 0 ? "down" : "neutral";
    }
  }

  return (
    <StatCard
      title={translations[lang].activeAthletesTitle}
      value={loading ? "..." : value}
      interval={translations[lang].activeAthletesInterval}
      trend={trend}
      data={data}
      labels={labels}
      trendValue={trendValue}
    />
  );
}
