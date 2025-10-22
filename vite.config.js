// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from "path";

// ⚠️ URL del backend que usaremos para el proxy en desarrollo
const DEV_TARGET_DOMAIN = 'https://reflexoperu-v3.marketingmedico.vip';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // 🔑 CLAVE para Vercel (Punto 1): Asegura que los CSS/JS/Assets se carguen correctamente
  base: './', 
  
  resolve: {
    alias: {
      // Alias para que '@/features/' funcione correctamente
      "@": path.resolve(__dirname, "src"), 
    },
  },
  
  server: {
    proxy: {
      '/api': {
        target: DEV_TARGET_DOMAIN,
        changeOrigin: true,
        secure: true, // El target es HTTPS
        
        // Reescritura: /api/* -> /backend/public/api/*
        rewrite: (path) => path.replace(/^\/api/, '/backend/public/api'),
        
        cookieDomainRewrite: false, // Permite cookies en localhost
      },
    },
  },
});