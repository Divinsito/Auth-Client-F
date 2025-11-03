// src/blog/pages/PostDetail.jsx
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../api/mockBlogApi.js"; 
import Loader from "../components/Loader.jsx";     
import ErrorMsg from "../components/ErrorMsg.jsx";   

import imageBg from '/img/imagebg.png'; 

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Usamos la URL resuelta por la importación de JS
  const backgroundImageURL = imageBg; 

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    getPostById(id)
      .then((res) => setPost(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />; 
  if (error) return <ErrorMsg message={error} />;
  if (!post) return <ErrorMsg message="Post no cargado. Intente de nuevo." />;

  return (
    // Outer Container: Fondo con imagen y animación (usando la URL importada)
    <div 
         className="animate-bg-shift flex justify-center items-center min-h-screen p-4 overflow-hidden relative"
         style={{ 
            fontFamily: 'Inter, sans-serif',
            // Usamos la URL resuelta
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${backgroundImageURL}') no-repeat center center`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'multiply', 
          }}
          >

      {/* Overlay y Partículas de Fondo */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>

      {/* Contenedor Principal del Post */}
      <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl p-8 md:p-10 border border-gray-700/50">

        {/* Título del Post */}
        <h1 className="text-4xl font-extrabold mb-4 pb-2 border-b border-gray-700 text-white">
          {post.title}
        </h1>
        
        {/* Cuerpo del Post */}
        <p className="text-lg text-gray-300 whitespace-pre-wrap leading-relaxed">
          {post.body}
        </p>

        {/* Metadatos y Enlace para Volver */}
        <div className="mt-10 pt-4 border-t border-gray-700 flex justify-between items-center text-sm">
            <span className="text-gray-500">Post ID: {post.id} (Datos simulados)</span>
            <a href="/blog" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                ← Volver a la lista
            </a>
        </div>
      </div>
    </div>
  );
}