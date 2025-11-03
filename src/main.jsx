// src/main.jsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
// Ya no necesitamos RouterProvider ni router de forma nombrada
import AppRouter from './router.jsx'; 
import './index.css';
// ⚠️ DESCOMENTAR Y VERIFICAR ESTA IMPORTACIÓN 
import { AuthProvider } from './features/auth/context/AuthContext'; 

// ----------------------------------------------
// 1. Inicialización de MSW Worker (solo en modo desarrollo)
// ----------------------------------------------

async function enableMocking() {
  if (import.meta.env.DEV) {
    // RUTA CORREGIDA: Asumiendo que el mock está en blog/mocks
    const { worker } = await import('./blog/mocks/browser'); 
    await worker.start({ onUnhandledRequest: 'bypass' }); 
    console.log('✅ MSW Worker activado. Interceptando /api/contact...');
  }
}

// ----------------------------------------------
// 2. Renderizado de la aplicación
// ----------------------------------------------

// Llama a la función de activación de MSW antes de renderizar React
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode> 
      {/* ✅ CORRECCIÓN: AppRouter DEBE estar envuelto por AuthProvider */}
      <AuthProvider> 
        <AppRouter /> 
      </AuthProvider>
    </StrictMode>,
  );
});