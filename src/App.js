import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Layout
import MainLayout from './components/layout/MainLayout';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Etudiants from './pages/Etudiants';
import Chambres from './pages/Chambres';
import Affectations from './pages/Affectations';
import Cles from './pages/Cles';
import Rapports from './pages/Rapports';
import Admin from './pages/Admin';

/**
 * Route protégée demandant l'authentification
 */
const PrivateRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return <LoadingSpinner fullscreen />;
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Route publique */}
          <Route path="/login" element={<Login />} />

          {/* Routes protégées */}
          <Route path="/" element={
            <PrivateRoute>
              <MainLayout><Dashboard /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/etudiants" element={
            <PrivateRoute>
              <MainLayout><Etudiants /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/chambres" element={
            <PrivateRoute>
              <MainLayout><Chambres /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/affectations" element={
            <PrivateRoute>
              <MainLayout><Affectations /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/cles" element={
            <PrivateRoute>
              <MainLayout><Cles /></MainLayout>
            </PrivateRoute>
          } />

          <Route path="/rapports" element={
            <PrivateRoute>
              <MainLayout><Rapports /></MainLayout>
            </PrivateRoute>
          } />

          {/* Route Admin uniquement */}
          <Route path="/admin" element={
            <PrivateRoute adminOnly>
              <MainLayout><Admin /></MainLayout>
            </PrivateRoute>
          } />

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Toast notifications container */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
