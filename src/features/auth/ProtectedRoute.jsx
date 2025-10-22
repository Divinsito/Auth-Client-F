import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from "./context/AuthContext"; 

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); 

  if (loading) {
    return <div>Verificando sesión...</div>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;