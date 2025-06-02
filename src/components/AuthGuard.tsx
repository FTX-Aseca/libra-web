import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getAuthToken } from '../utils/auth';

interface AuthGuardProps {
  // No specific props needed for this basic guard, but can be extended
}

const AuthGuard: React.FC<AuthGuardProps> = () => {
  const token = getAuthToken();
  const location = useLocation();

  if (!token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />; // Render the children routes if token exists
};

export default AuthGuard; 