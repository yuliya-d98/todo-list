import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';
import AppHeader from '../components/AppHeader';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const theme = createTheme();

const PageContainer = () => {
  return (
    <ThemeProvider theme={theme}>
      <AppHeader />
      <Box component="main" maxWidth="sm" sx={{ p: 3 }}>
        <Toolbar />
        <Typography>
          <Outlet />
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default PageContainer;
