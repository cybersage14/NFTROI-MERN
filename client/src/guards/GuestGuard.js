import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
// hooks
// routes
import { PATH_PAGE } from '../routes/paths';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
  children: PropTypes.node
};

export default function GuestGuard({ children }) {
  const isAuth = window.localStorage.getItem('auth') === 'true' ? true : false
  if (!isAuth) {
    return <Navigate to={PATH_PAGE.comingSoon} />;
  }

  return <>{children}</>;
}
