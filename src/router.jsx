import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@/features/auth/pages/Login';
import Register from '@/features/auth/pages/Register';
import HomePage from '@/pages/Home';
import ProtectedRoute from '@/features/auth/ProtectedRoute';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔑 La ruta principal (/) es la PROTEGIDA */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <HomePage /> 
            </ProtectedRoute>
          } 
        />
        
        <Route path="/profile" element={<Navigate to="/" replace />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}