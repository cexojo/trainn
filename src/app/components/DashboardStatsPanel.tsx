import Box from '@mui/material/Box';
import StatCardActiveAthletes from './StatCardActiveAthletes';
import StatCardMonthlyRevenue from './StatCardMonthlyRevenue';
import StatCardFutureRevenue from './StatCardFutureRevenue';
import StatCardUnpaidRevenue from './StatCardUnpaidRevenue';

/**
 * Panel with key business stats: active athletes, current revenue, future revenue, pending revenue.
 * Display only on dashboard initial load (section is null/undefined).
 */
export default function DashboardStatsPanel() {
  return (
    <Box
      display="flex"
      gap={0}
      sx={{
        mb: (theme) => theme.spacing(2),
        flexWrap: 'wrap',
        justifyContent: { xs: 'center', md: 'flex-start' }
      }}
    >
      <Box sx={{ flex: '1 1 25%', minWidth: 240, boxSizing: 'border-box', p: 1 }}>
        <StatCardActiveAthletes />
      </Box>
      <Box sx={{ flex: '1 1 25%', minWidth: 240, boxSizing: 'border-box', p: 1 }}>
        <StatCardMonthlyRevenue />
      </Box>
      <Box sx={{ flex: '1 1 25%', minWidth: 240, boxSizing: 'border-box', p: 1 }}>
        <StatCardFutureRevenue />
      </Box>
      <Box sx={{ flex: '1 1 25%', minWidth: 240, boxSizing: 'border-box', p: 1 }}>
        <StatCardUnpaidRevenue />
      </Box>
    </Box>
  );
}
