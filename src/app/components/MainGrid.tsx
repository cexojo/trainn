import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import StatCardUnpaidRevenue from './StatCardUnpaidRevenue';
import StatCardActiveAthletes from './StatCardActiveAthletes';
import StatCardMonthlyRevenue from './StatCardMonthlyRevenue';
import CustomizedTreeView from './CustomizedTreeView';
import StatCardFutureRevenue from './StatCardFutureRevenue';
import { StatCardProps } from './StatCard';
import { translations } from '@/app/i18n';

const data: StatCardProps[] = [
  {
    title: 'Users',
    value: '14k',
    interval: 'Last 30 days',
    trend: 'up',
    data: [
      200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380,
      360, 400, 380, 420, 400, 640, 340, 460, 440, 480, 460, 600, 880, 920,
    ],
  },
  {
    title: 'Conversions',
    value: '325',
    interval: 'Last 30 days',
    trend: 'down',
    data: [
      1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820,
      780, 800, 760, 380, 740, 660, 620, 840, 500, 520, 480, 400, 360, 300, 220,
    ],
  },
  {
    title: 'Event count',
    value: '200k',
    interval: 'Last 30 days',
    trend: 'neutral',
    data: [
      500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530,
      520, 410, 530, 520, 610, 530, 520, 610, 530, 420, 510, 430, 520, 510,
    ],
  },
];

import Button from "@mui/material/Button";
import UserTable from "../menu/users/UserTable";
import { useState } from "react";

export default function MainGrid({ section }: { section?: string | null }) {
  const lang = "es"; // Replace with current language context if available

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Grid
        container
        spacing={2}
        columns={12}
        sx={{ mb: (theme) => theme.spacing(2) }}
      >
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardActiveAthletes />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardMonthlyRevenue />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardFutureRevenue />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardUnpaidRevenue />
        </Grid>
      </Grid>
      {section === "athletes" && (
        <Box sx={{ mt: 3, mb: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {translations[lang].athletes}
          </Typography>
          <UserTable lang={lang} />
        </Box>
      )}
    </Box>
  );
}
