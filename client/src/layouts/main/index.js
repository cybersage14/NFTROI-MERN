/* eslint-disable */
import { useLocation, Outlet } from 'react-router-dom';
import MainTopNavbar from './MainTopNavbar';
import MainBottomNavbar from './MainBottomNavbar';
import { Box, Stack } from '@mui/material';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <Box minHeight="100vh" position="relative">
      <Stack sx={{ minHeight: 'inherit' }}>
        <MainTopNavbar />
        {/* <MainNavbar /> */}
        <Box flexGrow={1}>
          <Outlet />
        </Box>
      </Stack>
      <MainBottomNavbar
        sx={{
          position: 'absolute',
          bottom: 0,
          bgcolor: 'rgba(0, 0, 0, 0)',
          width: '100%',
          py: 6
        }}
      />
    </Box>
  );
}
