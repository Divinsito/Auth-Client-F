import React, { useState } from 'react';

// RESTAURANDO IMPORTS ORIGINALES: Se eliminan los mocks y se activan los imports de tu proyecto.
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


// NOTA: Las implementaciones mock (simuladas) de useNavigate y useAuth han sido eliminadas.
// El componente ahora depende de la existencia de 'useAuth' y 'useNavigate' en tu proyecto.
// -------------------------------------------------------------------------


const Login = () => {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Login error caught by component:', err);
    }
  };

  // Ruta local de la imagen de logo proporcionada por el usuario
  const logoUrl = '/img/logo.png';
  const backgroundImageURL = '/img/imagebg.png';


  return (
    // Outer Container: Fondo con imagen y animación
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

      {/* Overlay adicional opcional (puedes ajustar la opacidad) */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>

      {/* Elementos de fondo animados (partículas flotantes) */}
      {/* NOTA: Las animaciones (@keyframes) deben estar definidas en tu CSS/Tailwind config para que esto funcione. */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>


      {/* Login Card: ESTILO ORIGINAL (Grises y verdes/índigo) - Elevada sobre el fondo animado */}
      <div className="relative z-10 flex bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-4xl p-6 md:p-10 border border-gray-700/50">

        {/* -------------------- LEFT COLUMN: LOGIN FORM -------------------- */}
        <div className="flex flex-col flex-1 p-4 md:pr-10 border-r border-gray-700/50">
          
          {/* Title and Subtitle */}
          <h2 className="text-3xl font-bold mb-2 text-white">
            ¡Bienvenido de nuevo!
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            Nos alegra mucho verte otra vez.
          </p>

          {/* Error Message */}
          {error && (
            <p className="text-red-400 bg-red-900/30 p-3 rounded-md mb-6 text-sm border border-red-500/50">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label htmlFor="email-input" className="block text-xs font-bold uppercase text-gray-300 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email-input"
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleChange}
                required
                className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm 
                           focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                placeholder="ejemplo@correo.com"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password-input" className="block text-xs font-bold uppercase text-gray-300 mb-2">
                Contraseña <span className="text-red-500">*</span>
              </label>
              <input
                id="password-input"
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm 
                           focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500"
                disabled={loading}
              />
            </div>

            {/* Submit Button: Se mantiene el estilo del botón original */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-md text-base font-medium text-white 
                         bg-indigo-600 hover:bg-indigo-500 transition-transform duration-150 
                         active:scale-[0.99] shadow-lg shadow-indigo-700/30 
                         disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Ingresando...</span>
                </div>
              ) : 'Ingresar'}
            </button>
          </form>

          {/* Registration Link */}
          <p className="mt-8 text-sm text-gray-400">
            ¿Necesitas una cuenta?
            <a
              href="/register"
              className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors"
            >
              Regístrate
            </a>
          </p>
        </div>

        {/* -------------------- RIGHT COLUMN: IMAGE PLACEHOLDER -------------------- */}
        <div className="hidden md:flex flex-col items-center justify-center p-4 md:pl-10 text-center flex-1">
          
          <h3 className="text-xl font-semibold text-white mb-6">
            RP SOFT System
          </h3>

          <img 
            src={logoUrl} 
            alt="Logo de RP SOFT System" 
            className="w-48 h-48 object-contain transition-transform duration-300 hover:scale-[1.05] mx-auto"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = 'https://placehold.co/400x400/313338/ffffff?text=Logo+Unavailable+in+Preview';
            }}
          />
          
        </div>

      </div>
    </div>
  );
};

export default Login;
