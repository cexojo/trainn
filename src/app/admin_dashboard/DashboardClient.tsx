"use client";
import * as React from 'react';
import type {} from '@mui/x-date-pickers/themeAugmentation';
import type {} from '@mui/x-charts/themeAugmentation';
import type {} from '@mui/x-data-grid-pro/themeAugmentation';
import type {} from '@mui/x-tree-view/themeAugmentation';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../components/AppNavbar';
import Header from '../components/Header';
import MainGrid from '../components/MainGrid';
import SideMenu from '../components/SideMenu';
import AppTheme from '../theme/AppTheme';
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from '../theme/customizations';

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function DashboardClient(props: { disableCustomTheme?: boolean }) {
  const [currentSection, setCurrentSection] = React.useState<string | null>(null);
  const [userRole, setUserRole] = React.useState<"admin" | "athlete" | null>(null);

  React.useEffect(() => {
    fetch("/api/get-user-id")
      .then(res => res.json())
      .then(data => {
        if (data.role === "admin") setUserRole("admin");
        else setUserRole("athlete");
      })
      .catch(() => setUserRole("athlete"));
  }, []);

  if (!userRole) {
    // Optionally show a loader while the role is not determined.
    return null;
  }

  return (
    <AppTheme themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: 'flex' }}>
        <SideMenu setSection={section => setCurrentSection(section)} role={userRole} />
        <AppNavbar setSection={section => setCurrentSection(section)} />
        {/* Main content */}
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header showBreadcrumbs={false} showSearchAndAlerts={false} />
            <MainGrid section={currentSection} />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
