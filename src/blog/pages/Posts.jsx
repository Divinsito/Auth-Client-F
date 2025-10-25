// src/blog/pages/Posts.jsx
import { useEffect, useState } from "react";
import { getPosts } from "../api/mockBlogApi.js"; 
import PostCard from "../components/PostCard.jsx"; 
import Loader from "../components/Loader.jsx";     
import ErrorMsg from "../components/ErrorMsg.jsx";   

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Rutas de imágenes necesarias para el fondo (tomadas de Login.jsx)
  const backgroundImageURL = '/img/imagebg.png'; 
  

  if (loading) return <Loader />; // Asumiendo que Loader tiene el fondo aplicado
  if (error) return <ErrorMsg message={error} />;
  
  if (posts.length === 0) {
    // Si no hay posts, mostramos el mensaje dentro de un contenedor estilizado
    return (
        <div 
            className="animate-bg-shift flex justify-center items-center min-h-screen p-4 overflow-hidden relative"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${backgroundImageURL}') no-repeat center center`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundBlendMode: 'multiply', 
            }}
        >
            <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-xl p-8 border border-gray-700/50">
                <p className="text-center text-white text-lg">No hay posts disponibles.</p>
            </div>
        </div>
    );
}

  return (
    // Outer Container: Fondo con imagen y animación (IDÉNTICO AL LOGIN)
    <div 
         className="animate-bg-shift flex justify-center items-center min-h-screen p-4 overflow-hidden relative"
         style={{ 
            fontFamily: 'Inter, sans-serif',
            // Usando un overlay en el background para oscurecer la imagen y mantener el contraste
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${backgroundImageURL}') no-repeat center center`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'multiply', 
          }}
          >

      {/* Overlay y Partículas de Fondo (IDÉNTICO AL LOGIN) */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>

      {/* Contenedor Principal del Blog (similar al Login Card) */}
      <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-6xl p-8 md:p-10 border border-gray-700/50">

        {/* Título */}
        <h1 className="text-4xl font-extrabold mb-6 pb-2 border-b border-gray-700 text-white">
          Blog Posts
        </h1>

        {/* Grid de Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
        
        {/* Espacio para volver al perfil si es necesario */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center">
            <a href="/profile" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors text-sm">
                ← Volver al Perfil
            </a>
        </div>

      </div>
    </div>
  );
}