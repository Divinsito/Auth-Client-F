import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router.jsx';
import './index.css'; // Asegúrate de importar tu CSS base (donde está Tailwind)
import { AuthProvider } from './features/auth/context/AuthContext'; // Importar el Provider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>,
);