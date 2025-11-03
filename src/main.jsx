// src/main.jsx
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './router.jsx'; 
import './index.css';
import { AuthProvider } from './features/auth/context/AuthContext'; 

async function enableMocking() {
  const { worker } = await import('./blog/mocks/browser'); 
  await worker.start({ onUnhandledRequest: 'bypass' }); 
  console.log('✅ MSW Worker activado. Interceptando /api/contact...');
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <StrictMode> 
      <AuthProvider> 
        <AppRouter /> 
      </AuthProvider>
    </StrictMode>,
  );
});