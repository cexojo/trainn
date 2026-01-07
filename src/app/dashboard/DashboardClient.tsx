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
import { FrontendError } from '@/utils/errors';
import { translations, Lang } from '../i18n';

const lang: Lang = "es";

const xThemeComponents = {
  ...chartsCustomizations,
  ...dataGridCustomizations,
  ...datePickersCustomizations,
  ...treeViewCustomizations,
};

export default function DashboardClient(props: { disableCustomTheme?: boolean }) {
  const [currentSection, setCurrentSection] = React.useState<string | null>(null);
  // Hoisted training selection state for navbar
  const [selectedBlock, setSelectedBlock] = React.useState<any | null>(null);
  const [selectedWeek, setSelectedWeek] = React.useState<any | null>(null);
  const [selectedDay, setSelectedDay] = React.useState<number | null>(null);

  // Default section logic: for athlete show "training", admin stays as null (Inicio)
  const [userRole, setUserRole] = React.useState<"admin" | "athlete" | null>(null);
  React.useEffect(() => {
    if (userRole === "athlete" && !currentSection) {
      setCurrentSection("training");
    }
  }, [userRole, currentSection]);

  React.useEffect(() => {
    fetch("/api/get-user-id")
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          // Not logged in or unauthorized: redirect to root
          window.location.replace("/");
          return Promise.reject(new Error("Unauthorized"));
        }
        return res.json();
      })
      .then(data => {
        if (data.role === "admin") setUserRole("admin");
        else setUserRole("athlete");
      })
      .catch(() => { /* Swallow error - redirect already triggered if unauthorized */ });
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
        <AppNavbar
          setSection={section => setCurrentSection(section)}
          userRole={userRole}
          currentSection={currentSection}
          blockWeekLabel={
            userRole === "athlete" && currentSection === "training" && selectedBlock && selectedWeek && selectedDay !== null
              ? translations[lang].blockWeekDayLabel(selectedBlock.blockNumber ?? "", selectedWeek.weekNumber ?? "", (selectedDay as number) + 1)
              : userRole === "athlete" && currentSection === "training" && selectedBlock && selectedWeek
              ? translations[lang].blockWeekLabel(selectedBlock.blockNumber ?? "", selectedWeek.weekNumber ?? "")
              : undefined
          }
        />
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
            {/* Pass selection state to training panel for lifting */}
            <MainGrid
              section={currentSection}
              userRole={userRole}
              selectedBlock={selectedBlock}
              setSelectedBlock={setSelectedBlock}
              selectedWeek={selectedWeek}
              setSelectedWeek={setSelectedWeek}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
            />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
