import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';

const App = () => (
  <Routes>
    {/* Public Login Route */}
    <Route
      path="/login"
      element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      }
    />

    {/* Protected Support Ticket Dashboard */}
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
      }
    />

    {/* Redirect any unknown route to dashboard */}
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default App;
