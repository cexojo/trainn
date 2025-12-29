import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import type { ThemeOptions } from '@mui/material/styles';
import { inputsCustomizations } from './customizations/inputs';
import { dataDisplayCustomizations } from './customizations/dataDisplay';
import { feedbackCustomizations } from './customizations/feedback';
import { navigationCustomizations } from './customizations/navigations';
import { surfacesCustomizations } from './customizations/surfaces';
import { colorSchemes, typography, shadows, shape } from './themePrimitives';

interface AppThemeProps {
  children: React.ReactNode;
  /**
   * This is for the docs site. You can ignore it or remove it.
   */
  disableCustomTheme?: boolean;
  themeComponents?: ThemeOptions['components'];
  defaultColorScheme?: "light" | "dark";
}

export default function AppTheme(props: AppThemeProps) {
  const { children, disableCustomTheme, themeComponents, defaultColorScheme } = props;
  const theme = React.useMemo(() => {
    return createTheme(
      disableCustomTheme
        ? {}
        : {
            cssVariables: {
              colorSchemeSelector: 'data-mui-color-scheme',
              cssVarPrefix: 'template',
            },
            colorSchemes,
            defaultColorScheme: defaultColorScheme || "dark",
            palette: { mode: (defaultColorScheme || "dark") },
            typography,
            shadows,
            shape,
            components: {
              ...inputsCustomizations,
              ...dataDisplayCustomizations,
              ...feedbackCustomizations,
              ...navigationCustomizations,
              ...surfacesCustomizations,
              ...themeComponents,
            },
          }
    );
  }, [disableCustomTheme, themeComponents, defaultColorScheme]);
  if (disableCustomTheme) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
