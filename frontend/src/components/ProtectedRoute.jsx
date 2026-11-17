import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { PageLoader } from './Ui';

// Only logged in users can access protected routes
export const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader label="Checking session..." />;
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

// Redirect logged in users away from login page to dashboard
export const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <PageLoader label="Loading..." />;
  if (user) return <Navigate to="/dashboard" replace />;

  return children;
};
