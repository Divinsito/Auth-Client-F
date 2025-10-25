
import imageBg from '/img/imagebg.png'; 

export default function ErrorMsg({ message }) {
    
    const backgroundImageURL = imageBg; // Usamos la URL resuelta
    
  return (
    // Outer Container: Fondo con imagen y animación (IDÉNTICO AL LOGIN)
    <div 
        className="animate-bg-shift flex justify-center items-center min-h-screen p-4 overflow-hidden relative"
        style={{ 
            fontFamily: 'Inter, sans-serif',
            // Usamos la URL resuelta para el background
            background: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${backgroundImageURL}') no-repeat center center`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundBlendMode: 'multiply', 
        }}
    >

      {/* Overlay y Partículas de Fondo */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Usamos las mismas partículas flotantes del Login */}
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>


      {/* Tarjeta de Error Central (Estilo Discord Dark) */}
      <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden p-8 w-full max-w-lg border border-red-600/50 flex flex-col items-center">
        
        <h2 className="text-xl font-bold mb-4 text-red-400">
            ❌ Ocurrió un Error
        </h2>
        
        {/* Mensaje de Error */}
        <p className="text-center text-red-300 bg-gray-700/50 border border-red-700/50 p-4 rounded-md shadow-inner font-medium text-base w-full">
            {message}
        </p>
        
        {/* Enlace de recuperación */}
        <p className="mt-4 text-sm text-gray-400">
            <a href="/blog" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Inténtalo de nuevo volviendo a la lista
            </a>
        </p>

      </div>
    </div>
  );
}