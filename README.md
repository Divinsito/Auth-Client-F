# Auth-Client-F

Proyecto cliente ligero usando React + Vite: interfaz con autenticación (context + hook), página de perfil y un blog simulado (API mock). Este README recoge lo esencial: qué trae el proyecto y cómo arrancarlo rápido.

## Qué trae el proyecto
- Stack: React + Vite, Tailwind (estilos), router (react-router).
- Autenticación con contexto y hook:
  - Contexto: [`AuthContext`](src/features/auth/context/AuthContext.jsx)
  - Hook: [`useAuth`](src/features/auth/hooks/useAuth.js)
  - Ruta protegida: [`ProtectedRoute`](src/features/auth/ProtectedRoute.jsx)
- Página principal de perfil: [`Home`](src/features/profile/pages/Home.jsx)
- Blog simulado y UI:
  - API mock: [`mockBlogApi`](src/assets/blog/api/mockBlogApi.js)
  - Páginas: [`Posts`](src/assets/pages/Posts.jsx), [`PostDetail`](src/assets/pages/PostDetail.jsx)
  - Componentes: [`PostCard`](src/assets/components/PostCard.jsx), [`Loader`](src/assets/components/Loader.jsx), [`ErrorMsg`](src/assets/components/ErrorMsg.jsx)
- Componentes globales: [`Navbar`](src/components/Navbar.jsx)
- Entrada y router: [src/main.jsx](src/main.jsx), [src/router.jsx](src/router.jsx)
- Archivos de configuración y despliegue: [package.json](package.json), [vite.config.js](vite.config.js), [vercel.json](vercel.json)
- Recursos públicos: carpeta [public/img](public/img)

## Requisitos
- Node.js >= 16
- npm o yarn

## Inicio rápido
Instala dependencias y levanta en modo desarrollo:
```sh
npm install
npm run dev
```