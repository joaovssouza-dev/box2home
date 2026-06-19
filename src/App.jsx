import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import GestorDashboard from './pages/Gestor/Dashboard';
import RouteView from './pages/Motorista/RouteView';
import NotFound from './pages/NotFound';

function PrivateRoute({ children, allowedRole }) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--text-secondary)'
      }}>
        Carregando...
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;

  if (allowedRole && profile?.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
}

function AppRoutes() {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        color: 'var(--text-secondary)',
        fontSize: 16
      }}>
        Carregando...
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />

      <Route path="/" element={
        <PrivateRoute>
          {profile?.role === 'gestor' ? <GestorDashboard /> : <RouteView />}
        </PrivateRoute>
      } />

      <Route path="/gestor" element={
        <PrivateRoute allowedRole="gestor">
          <GestorDashboard />
        </PrivateRoute>
      } />

      <Route path="/motorista" element={
        <PrivateRoute allowedRole="motorista">
          <RouteView />
        </PrivateRoute>
      } />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}