// src/AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react'; 
// Asegúrate de que los alias de importación (@/) sean válidos en tu configuración de Vite/JS
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import HomePage from '@/features/profile/pages/Home';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import { useAuth } from '@/features/auth/context/AuthContext';

import Posts from "@/blog/pages/Posts.jsx";          
import PostDetail from "@/blog/pages/PostDetail.jsx";// ¡Importación estática!sx"));
export default function AppRouter() {
    const { isAuthenticated, loading } = useAuth();
    
    // Si aún está cargando la autenticación, no redirigir
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#2C2F33] text-white">Cargando aplicación...</div>;
    }

  return (
    <BrowserRouter>
      <Suspense 
        fallback={<div className="min-h-screen flex items-center justify-center bg-[#2C2F33] text-white">Cargando módulo...</div>}
      > 
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas Protegidas */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <HomePage /> 
              </ProtectedRoute>
            } 
          />
          
          {/* RUTAS DEL BLOG SIMULADO (Protegidas) */}
          <Route 
            path="/blog" 
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/blog/:id" 
            element={
              <ProtectedRoute>
                <PostDetail />
              </ProtectedRoute>
            } 
          />
          
          {/* Redirección de la raíz (/) */}
          <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
          />

          {/* Redireccionar cualquier otra ruta a la principal */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}