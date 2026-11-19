import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
  const { esAutenticado, cargando } = useAuth();

  if (cargando) {
    return <div>Cargando...</div>;
  }

  if (!esAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};