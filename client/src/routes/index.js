/* eslint-disable */
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
// components
import LoadingScreen from '../components/LoadingScreen';
import GuestGuard from '../guards/GuestGuard';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import Tools from '../pages/Tools';
import Battle from '../pages/Tools/Battle';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Main Routes
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/portfolio',
          element:
            // <GuestGuard>
            <Portfolio />
          // </GuestGuard>
        },
        {
          path: '/portfolio/:address',
          element:
            // <GuestGuard>
            <Portfolio />
          // </GuestGuard>
        },
        {
          path: '/nft/:address/:tokenId',
          element:
            <GuestGuard>
              <SingleAsset />
            </GuestGuard>
        },
        {
          path: '/collection/:address',
          element:
            // <GuestGuard>
            <Collection />
          // </GuestGuard>
        },
        {
          path: '/collections',
          element:
            // <GuestGuard>
            <Collections />
          // </GuestGuard>
        },
        {
          path: '/converter',
          element:
            // <GuestGuard>
            <Converter />
          // </GuestGuard>
        },
        // {
        //   path: '/portfolio/compare',
        //   element: <CompareWallet />
        // },
        {
          path: '/explore',
          element: <Explore />
        },
        {
          path: '/tools/:tab',
          element: <Tools />,
        },
        {
          path: '*',
          element: <Navigate to="/" />
        }
      ]
    }
  ]);
}

// IMPORT COMPONENTS
// Main
// const SinglePortfolio = Loadable(lazy(() => import('../pages/portfolio/SinglePortfolio')));
// const MergePortfolio = Loadable(lazy(() => import('../pages/portfolio/MergePortfolio')));
// const CompareWallet = Loadable(lazy(() => import('../pages/portfolio/CompareWallet')));
const ComingSoon = Loadable(lazy(() => import('../pages/Comingsoon')));
const Portfolio = Loadable(lazy(() => import('../pages/portfolio/Portfolio')));
const SingleAsset = Loadable(lazy(() => import('../pages/portfolio/SingleAsset')));
const Collection = Loadable(lazy(() => import('../pages/portfolio/Collection')));
const Collections = Loadable(lazy(() => import('../pages/portfolio/CollectionOverview')));
const Converter = Loadable(lazy(() => import('../pages/portfolio/Converter')));