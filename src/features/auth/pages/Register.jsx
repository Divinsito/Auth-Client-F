import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const { register, loading, errors } = useAuth();
  const navigate = useNavigate();

  // Rutas locales de las imágenes (tomadas del componente Login)
  const logoUrl = './src/img/logo.png';
  const backgroundImageURL = './src/img/imagebg.png'; 

  // Estado inicial con todos los campos requeridos por el backend
  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    // Valores por defecto no editables por el usuario:
    last_session: new Date().toISOString().slice(0, 10), 
    account_statement: true, 
    document_type_id: 1, 
    country_id: 179,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      alert('✅ ¡Registro exitoso! Por favor, inicia sesión.');
      navigate('/login');
    } catch (err) {
      console.error('Error de registro:', err);
      // La alerta ahora es menos prominente ya que el error se muestra en el componente
      // alert(`Error al registrar: ${errors?.message || 'Verifica tus datos'}`); 
    }
  };

  return (
    // Outer Container: Fondo con imagen y animación (Copiado del Login)
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

      {/* Overlay adicional y Elementos de fondo animados (Copiado del Login) */}
      <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute w-60 h-60 bg-blue-500/10 rounded-full blur-2xl animate-float-slow opacity-60" style={{ top: '10%', left: '15%' }}></div>
        <div className="absolute w-40 h-40 bg-purple-500/10 rounded-full blur-2xl animate-float-slow-delay opacity-50" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="absolute w-80 h-80 bg-indigo-500/10 rounded-full blur-2xl animate-float-fast opacity-70" style={{ top: '30%', right: '20%' }}></div>
        <div className="absolute w-52 h-52 bg-pink-500/10 rounded-full blur-2xl animate-float-fast-delay opacity-40" style={{ bottom: '10%', left: '25%' }}></div>
      </div>

      {/* Register Card: Adaptado para un formulario más largo */}
      {/* Se usa max-w-5xl y max-h-[90vh] con overflow-y-auto */}
      <div className="relative z-10 flex bg-gray-800 shadow-2xl rounded-lg overflow-hidden w-full max-w-5xl max-h-[90vh] p-6 md:p-10 border border-gray-700/50">

        {/* -------------------- LEFT COLUMN: REGISTER FORM -------------------- */}
        <div className="flex flex-col flex-1 p-4 md:pr-10 border-r border-gray-700/50 overflow-y-auto">
          
          {/* Title and Subtitle */}
          <h2 className="text-3xl font-bold mb-2 text-white">
            ¡Comienza tu viaje!
          </h2>
          <p className="text-gray-400 mb-8 text-sm">
            Crea tu cuenta en segundos.
          </p>

          {/* Error Message (Copiado del Login) */}
          {errors && (
            <div className="text-red-400 bg-red-900/30 p-3 rounded-md mb-6 text-sm border border-red-500/50" role="alert">
                <p className="font-bold">Error al registrar:</p>
                <p className="text-sm">{errors.message || JSON.stringify(errors)}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Grid for two columns (responsive) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Campo: Nombre */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Nombre:</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Tu nombre"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>

              {/* Campo: Apellido Paterno */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Apellido Paterno:</label>
                <input 
                  type="text" 
                  name="paternal_lastname" 
                  value={formData.paternal_lastname} 
                  onChange={handleChange} 
                  required 
                  placeholder="Tu apellido paterno"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>
              
              {/* Campo: Apellido Materno */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Apellido Materno:</label>
                <input 
                  type="text" 
                  name="maternal_lastname" 
                  value={formData.maternal_lastname} 
                  onChange={handleChange} 
                  required 
                  placeholder="Tu apellido materno"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>

              {/* Campo: Usuario */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Usuario (user_name):</label>
                <input 
                  type="text" 
                  name="user_name" 
                  value={formData.user_name} 
                  onChange={handleChange} 
                  required 
                  placeholder="Nombre de usuario único"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>

              {/* Campo: Documento */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Número de Documento:</label>
                <input 
                  type="text" 
                  name="document_number" 
                  value={formData.document_number} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ej: 12345678"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>

              {/* Campo: Teléfono */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Teléfono:</label>
                <input 
                  type="tel" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                  placeholder="Ej: 987654321"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>
              
              {/* Campo: Email */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Email:</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                  placeholder="ejemplo@correo.com"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>

              {/* Campo: Contraseña */}
              <div className="col-span-1">
                <label className="block text-xs font-bold uppercase text-gray-300 mb-2">Contraseña:</label>
                <input 
                  type="password" 
                  name="password" 
                  value={formData.password} 
                  onChange={handleChange} 
                  required 
                  placeholder="Mínimo 8 caracteres"
                  className="block w-full bg-gray-700 text-white border border-gray-600 rounded-md shadow-inner p-3 text-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors placeholder-gray-500" 
                />
              </div>
              
              {/* Nota: document_type_id y country_id no se incluyen ya que tienen valores fijos, 
                 pero podrías añadirlos con un <select> si el backend lo requiere. */}
            </div> {/* Fin grid */}

            <button
              type="submit"
              disabled={loading}
              // Estilos de botón copiados del Login
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
                    <span>Registrando...</span>
                </div>
              ) : 'Registrar Cuenta'}
            </button>
          </form>

          {/* Login Link (Copiado del Login) */}
          <p className="mt-6 text-sm text-gray-400">
            ¿Ya tienes una cuenta?
            <a
              href="/login"
              className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors"
            >
              Inicia Sesión
            </a>
          </p>
        </div>

        {/* -------------------- RIGHT COLUMN: IMAGE PLACEHOLDER (Copiado del Login) -------------------- */}
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

export default Register;