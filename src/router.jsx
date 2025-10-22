// AppRouter.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import HomePage from '@/features/profile/pages/Home';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import { useAuth } from '@/features/auth/context/AuthContext'; // Asegúrate de que este import sea correcto

export default function AppRouter() {
    const { isAuthenticated, loading } = useAuth(); // Usamos el hook de auth
    
    // Si aún está cargando la autenticación, no redirigir
    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#2C2F33] text-white">Cargando aplicación...</div>;
    }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 1. La ruta principal PROTEGIDA es /profile */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <HomePage /> 
            </ProtectedRoute>
          } 
        />
        
        {/* 2. Redirección de la raíz (/) */}
        <Route 
            path="/" 
            element={isAuthenticated ? <Navigate to="/profile" replace /> : <Navigate to="/login" replace />} 
        />

        {/* 3. Redireccionar cualquier otra ruta a la principal */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}