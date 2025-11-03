# Auth-Client-F

Proyecto cliente ligero usando React + Vite: interfaz con autenticación (context + hook), página de perfil, un blog simulado (API mock), y un **Módulo de Contacto Avanzado** con Resiliencia en el cliente.

## Qué trae el proyecto

* Stack: React + Vite, Tailwind (estilos), **Zod** (validación), **React Hook Form**, React Router, **MSW** (Mock Service Worker).

* Autenticación con contexto y hook:

  * Contexto: [`AuthContext`](https://www.google.com/search?q=src/features/auth/context/AuthContext.jsx)

  * Hook: [`useAuth`](https://www.google.com/search?q=src/features/auth/hooks/useAuth.js)

  * Ruta protegida: [`ProtectedRoute`](https://www.google.com/search?q=src/features/auth/ProtectedRoute.jsx)

* Página principal de perfil: [`Home`](https://www.google.com/search?q=src/features/profile/pages/Home.jsx)

* Blog simulado y UI:

  * API mock: [`mockBlogApi`](https://www.google.com/search?q=src/assets/blog/api/mockBlogApi.js)

  * Páginas: [`Posts`](https://www.google.com/search?q=src/assets/pages/Posts.jsx), [`PostDetail`](https://www.google.com/search?q=src/assets/pages/PostDetail.jsx)

  * Componentes: [`PostCard`](https://www.google.com/search?q=src/assets/components/PostCard.jsx), [`Loader`](https://www.google.com/search?q=src/assets/components/Loader.jsx), [`ErrorMsg`](https://www.google.com/search?q=src/assets/components/ErrorMsg.jsx)

* Componentes globales: [`Navbar`](https://www.google.com/search?q=src/components/Navbar.jsx)

* Entrada y router: [src/main.jsx](https://www.google.com/search?q=src/main.jsx), [src/router.jsx](https://www.google.com/search?q=src/router.jsx)

* Archivos de configuración y despliegue: [package.json](https://www.google.com/search?q=package.json), [vite.config.js](https://www.google.com/search?q=vite.config.js), [vercel.json](https://www.google.com/search?q=vercel.json)

* Recursos públicos: carpeta [public/img](https://www.google.com/search?q=public/img)

## 🎯 Módulo de Contacto (Funcionalidad Avanzada)

Implementación de un formulario con enfoque en UX, Resiliencia y Observabilidad.

| Característica | Archivos Clave | Descripción | 
 | :----- | :----- | :----- | 
| **Validación & UX** | \[`Contact.tsx`\], \[`TextField.tsx`\], \[`TextArea.tsx`\] | Validación declarativa (Zod) y componentes accesibles (labels, errores, contador de caracteres). | 
| **Mocking & Fallos** | \[`handlers.ts`\] | MSW intercepta `/api/contact` y simula latencia (600ms) con un 20% de tasa de fallo (Status 503). | 
| **Resiliencia & Retry** | \[`contactApi.ts`\] | Implementa reintentos (retry) con backoff exponencial e Idempotency-Key. | 
| **Offline-First** | \[`offlineQueue.ts`\], \[`contactApi.ts`\] | Encola envíos fallidos por red en `localStorage` y los sincroniza automáticamente al detectar el evento `online`. | 
| **Observabilidad** | \[`StatsPanel.tsx`\], \[`metrics.ts`\] | Muestra métricas en **tiempo real** (OKs, fallos, latencia promedio y cola offline) usando eventos del navegador. | 
| **Notificaciones** | \[`Contact.tsx`\] | Uso de alertas flotantes temporales (modal) para feedback de éxito/error/cola. | 

## Requisitos

* Node.js >= 16

* npm o yarn

* **MSW** instalado (`npm install -D msw`)

## Inicio rápido

Instala dependencias y levanta en modo desarrollo. El mock de contacto estará activo automáticamente.

## 🔌 Cómo conectar al servicio de email real

El mocking está activo solo en modo desarrollo (`import.meta.env.DEV`) gracias a MSW.

Para conectar el formulario de contacto a un backend real (Email Service):

1. **Desactivar MSW:** En `src/main.jsx`, comenta o elimina el bloque de código que llama a `enableMocking()`.

2. **Configurar Endpoint:** En \[`src/blog/api/contactApi.ts`\], ajusta la `baseURL` de Axios a la URL pública del servicio de backend (ej: `baseURL: 'https://api.tuservicio.com/api'`).