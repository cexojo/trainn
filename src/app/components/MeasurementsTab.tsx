import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import MeasurementsTable from "./MeasurementsTable";
import { translations, type Lang } from "@/app/i18n";

interface MeasurementsTabProps {
  userId: string;
  lang: Lang;
}

export default function MeasurementsTab({ userId, lang }: MeasurementsTabProps) {
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const t = translations[lang];

  const columns = [
    { id: "date", label: t.measurementsColumnDate },
    { id: "weight", label: t.measurementsColumnWeight },
    { id: "neck", label: t.measurementsColumnNeck },
    { id: "arm", label: t.measurementsColumnArm },
    { id: "waist", label: t.measurementsColumnWaist },
    { id: "abdomen", label: t.measurementsColumnAbdomen },
    { id: "hip", label: t.measurementsColumnHip },
    { id: "thigh", label: t.measurementsColumnThigh },
    { id: "calfMuscle", label: t.measurementsColumnCalfMuscle }
  ];

  useEffect(() => {
    let active = true;
    async function fetchUserMeasurements() {
      setLoading(true);
      try {
        const res = await fetch(`/api/measurements/${userId}`);
        if (res.ok) {
          const data = await res.json();
          if (active) setMeasurements(Array.isArray(data) ? data : []);
        } else if (active) {
          setMeasurements([]);
        }
      } catch {
        if (active) setMeasurements([]);
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchUserMeasurements();
    return () => { active = false };
  }, [userId]);

  return (
    <Box sx={{ pt: 2 }}>
      <MeasurementsTable
        measurements={measurements}
        loading={loading}
        columns={columns}
        t={t}
        enableChart={true}
      />
    </Box>
  );
}
