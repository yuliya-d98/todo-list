import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

const theme = createTheme();

const PageContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <Box component="main" maxWidth="sm" sx={{ p: 3, mx: 'auto' }}>
        <Toolbar />
        <Outlet />
      </Box>
    </ThemeProvider>
  );
};

export default PageContainer;
