/* eslint-disable */
import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
// material
import { Box, Link, Container, Typography } from '@mui/material';
// components
import Logo from '../../components/Logo';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';
import MainTopNavbar from './MainTopNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainTopNavbar />
      <div>
        <Outlet />
      </div>
    </>
  );
}
