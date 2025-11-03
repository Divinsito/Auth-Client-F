
import imageBg from '/img/imagebg.png'; 

export default function Loader() {
  
  const backgroundImageURL = imageBg; // Usamos la URL resuelta

  return (
    // Outer Container: Fondo con imagen y animación
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

      {/* Tarjeta de Carga Central */}
      <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden p-8 w-full max-w-sm border border-gray-700/50 flex flex-col items-center">
        
        {/* Spinner de Carga */}
        <svg className="animate-spin h-10 w-10 text-indigo-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>

        {/* Mensaje de Carga */}
        <p className="text-white text-lg font-semibold">Cargando contenido...</p>
        <p className="text-gray-400 text-sm mt-1">RP SOFT</p> 
      </div>
    </div>
  );
}