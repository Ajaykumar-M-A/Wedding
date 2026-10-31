import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import TemplatesPage from './pages/TemplatesPage';
import CreatePage from './pages/CreatePage';
import EditPage from './pages/EditPage';
import DashboardPage from './pages/DashboardPage';
import GuestViewPage from './pages/GuestViewPage';
import RSVPPage from './pages/RSVPPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import './styles/global.css';

function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div className="spinner" />
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />
      <main style={{ paddingTop: '70px', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/invitation/:token" element={<GuestViewPage />} />
          <Route path="/invitation/:token/rsvp" element={<RSVPPage />} />
          <Route path="/create" element={<PrivateRoute><CreatePage /></PrivateRoute>} />
          <Route path="/edit/:id" element={<PrivateRoute><EditPage /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><DashboardPage /></PrivateRoute>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#13132a',
            color: '#f5f0e8',
            border: '1px solid rgba(201,169,110,0.2)',
            borderRadius: '12px',
          },
          success: { iconTheme: { primary: '#c9a96e', secondary: '#fff' } },
        }}
      />
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}
