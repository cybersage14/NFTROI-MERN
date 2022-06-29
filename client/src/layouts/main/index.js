/* eslint-disable */
import { useLocation, Outlet } from 'react-router-dom';
import MainTopNavbar from './MainTopNavbar';
import MainBottomNavbar from './MainBottomNavbar';

// ----------------------------------------------------------------------

export default function MainLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === '/';

  return (
    <>
      <MainTopNavbar />
      {/* <MainNavbar /> */}
      <div>
        <Outlet />
      </div>
      <MainBottomNavbar />
    </>
  );
}
