import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path";

// ⚠️ El dominio de tu backend.
const TARGET_DOMAIN = 'https://reflexoperu-v3.marketingmedico.vip';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  resolve: {
    alias: {
      // Alias para que '@/features/' funcione correctamente
      "@": path.resolve(__dirname, "src"), 
    },
  },
  
  server: {
    proxy: {
      '/api': {
        target: TARGET_DOMAIN,
        changeOrigin: true,
        secure: true, // Debe ser true porque el target es HTTPS
        
        // 🔑 REESCRITURA CRÍTICA: La ruta de tu frontend /api se convierte en /backend/public/api en el backend
        rewrite: (path) => path.replace(/^\/api/, '/backend/public/api'),
        
        // ✅ CORRECCIÓN FINAL: Deshabilita la reescritura del dominio de la cookie.
        // Esto permite que el navegador acepte la cookie para localhost aunque venga de un dominio diferente.
        cookieDomainRewrite: false, 
      },
    },
  },
});