import React from 'react';
import { useAuth } from '../../auth/context/AuthContext';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const navigate = useNavigate();


  const logoUrl = '/img/logo.png';
  const backgroundImageURL = '/img/imagebg.png'; 

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        Cargando datos de usuario...
      </div>
    );
  }

  // Si no está autenticado o el usuario es null (por un error de token), redirigir
  if (!isAuthenticated || !user) {
    return null; 
  }


  const nombreUsuario = user.name || 'N/A';
  const nombreUser = user.user_name || 'N/A';
  const telefonoUsuario = user.phone || 'N/A';
  const rolUsuario = user.role?.name || 'User';
  const paisUsuario = user.country?.name || 'N/A';
  const idUsuario = user.id || 'N/A';



  return (
    // Outer Container: Fondo con imagen y animación
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

      {/* Overlay adicional opcional */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* Elementos de fondo animados (partículas flotantes) */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>

      {/* Contenido Principal: Tarjeta de Perfil de Usuario (Estilo Discord) */}
      <div className="relative z-10 bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl border border-gray-700/50 flex flex-col md:flex-row">
        
        {/* Columna Izquierda (Header/Logo) - Fondo más oscuro */}
        <div className="bg-gray-800 text-white p-8 flex flex-col items-center justify-center md:w-1/3 border-r border-gray-700">
          <img 
            src={logoUrl} 
            alt="Logo de RP SOFT System" 
            className="w-32 h-32 object-contain transition-transform duration-300 hover:scale-[1.05] mb-4"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/128x128/2c2f33/ffffff?text=LOGO';
            }}
          />
          <h2 className="text-2xl font-bold text-indigo-400">¡Hola, {nombreUsuario}!</h2>
          <p className="text-gray-400 text-sm mt-1">
            {/* Estilo del rol con el color de acento de Discord */}
            <span className="inline-block px-2 py-0.5 text-xs font-semibold rounded-full bg-violet-600/30 text-violet-300 border border-violet-500/50">
              {rolUsuario}
            </span>
          </p>

          {/* Botón de Cerrar Sesión */}
          <button
            onClick={handleLogout}
            className="mt-8 w-full py-2 px-4 rounded-md text-sm font-medium text-white 
                       bg-red-600 hover:bg-red-500 transition-colors duration-200 shadow-md"
          >
            Cerrar Sesión
          </button>

        </div>
{/* Columna Derecha (Información Personal) - Fondo #36393F */}
        <div className="p-8 md:w-2/3 bg-[#36393F] rounded-r-xl">
          <h3 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-700 text-white">
            Información de la Cuenta
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
            
            {/* Los DetailBox usan colores oscuros */}
            <DetailBox label="NOMBRE COMPLETO" value={nombreUsuario} />
            <DetailBox label="NOMBRE DE USUARIO" value={nombreUser} />
            
            <DetailBox label="EMAIL" value={user.email || 'N/A'} />
            <DetailBox label="TELÉFONO" value={telefonoUsuario} />
            
            <DetailBox label="ROL DEL USUARIO" value={rolUsuario} />
            <DetailBox label="PAÍS" value={paisUsuario} />
            
            <DetailBox label="ID DE USUARIO" value={idUsuario} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente DetailBox ajustado para el tema oscuro
const DetailBox = ({ label, value }) => (
  <div className="flex flex-col">
    {/* El label (título) es gris claro */}
    <label className="text-xs font-semibold uppercase text-gray-400 mb-1">{label}</label>
    {/* El valor principal es blanco */}
    <p className="text-white font-medium pb-1 truncate">{value}</p>
  </div>
);

export default Home;