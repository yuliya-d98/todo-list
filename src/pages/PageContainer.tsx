import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';
import { memo } from 'react';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

// https://mui.com/system/getting-started/usage/#responsive-values
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true; // not removes the `xs` breakpoint
    sm: true;
    md: true;
    lg: true;
    xl: true;
    custom450: true; // adds the `tablet` breakpoint
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      custom450: 450,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
});

const PageContainer = memo(() => {
  const styles = {
    p: {
      sx: 0,
      custom450: 3,
    },
    mx: 'auto',
  };

  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <Box component="main" maxWidth="sm" sx={styles}>
        <Toolbar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
});

export default PageContainer;
