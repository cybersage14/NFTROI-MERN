/* eslint-disable */
import { NotificationContainer } from 'react-notifications';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// hooks
import useAuth from './hooks/useAuth';

// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';

// ----------------------------------------------------------------------
import 'react-notifications/lib/notifications.css';
import './App.css'

export default function App() {
  const { isInitialized } = useAuth();
   
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            {/* <Settings /> */}
            <ScrollToTop />
            <Router />
            <NotificationContainer />
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
