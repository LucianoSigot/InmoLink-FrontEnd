import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserProfile } from '../servicios/auth.service'
import logo from '../imagenes/logo.jpeg' // <--- Importamos tu logo aquí

function Navbar({ children, styles, showBackButton }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);

  // Cargamos la foto del usuario al montar el componente
  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const data = await getUserProfile();
        if (data && data.foto) {
          setFotoPerfil(data.foto);
        }
      } catch (error) {
        console.error("Error al cargar la foto de perfil en el Navbar", error);
      }
    };
    cargarDatosUsuario();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Imagen por defecto si no hay foto de perfil (Avatar)
  const imagenAvatar = fotoPerfil || "https://via.placeholder.com/150";

  return (
    <nav className={`bg-slate-200 shadow-md w-full relative z-50 ${styles}`}>
      <div className='container mx-auto px-6 py-3 flex items-center justify-between'>

        {/* SECCIÓN IZQUIERDA: LOGO + ENLACES */}
        <div className="flex items-center space-x-6">
          {/* BOTÓN DE FLECHA ATRÁS (si showBackButton es true) */}
          {showBackButton && (
            <button
              onClick={() => navigate(-1)}
              className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
          )}

          {/* LOGO DE LA PÁGINA */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="InmoLink Logo"
              className="h-12 w-12 object-cover rounded-2xl"
            />
            {/* Mantenemos el texto solo en desktop si te gusta, si no, puedes borrar este span */}
            <span className="font-bold text-blue-600 text-lg md:hidden lg:block">InmoLink</span>
          </Link>

          <div className='hidden md:flex items-center space-x-6'>
            <Link to="/" className='text-gray-700 hover:text-blue-600 font-medium'>
              Home
            </Link>
            <Link to="/contacto" className="text-gray-700 hover:text-blue-600 font-medium">
              Contacto
            </Link>
            <Link to="/publicar" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition font-medium shadow-md">
              + Publicar
            </Link>
          </div>
        </div>

        {/* SECCIÓN CENTRAL: CHILDREN (BARRA DE BÚSQUEDA) */}
        <div className='hidden md:flex items-center space-x-4 relative'>
          {children}
        </div>


        {/* SECCIÓN DERECHA: PERFIL DE USUARIO */}
        <div className='hidden md:flex items-center'>
          <Link to="/perfil" className="flex items-center space-x-2 pl-2 pr-4 py-1 rounded-full hover:bg-slate-300 transition-colors">
            <img
              className="h-9 w-9 rounded-full object-cover border border-gray-400"
              src={imagenAvatar}
              alt="Avatar"
            />
            <span className="font-medium text-gray-700">Mi Perfil</span>
          </Link>
        </div>

        {/* BOTÓN MENÚ MÓVIL (HAMBURGUESA) */}
        <div className='md:hidden'>
          {!isMenuOpen && (
            <button
              onClick={toggleMenu}
              className='text-gray-600 p-2 rounded-md hover:bg-slate-300 focus:outline-none'
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL */}
      {isMenuOpen && (
        <div className='md:hidden absolute top-0 left-0 w-full bg-slate-100 shadow-lg z-50 pb-6'>
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 mb-2">
            <div className="flex items-center">
              {/* LOGO EN MÓVIL */}
              <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded-xl mr-2" />
              <span className="font-bold text-blue-600 text-sm">inmolink</span>
            </div>
            <button onClick={toggleMenu} className="text-gray-500 hover:text-gray-800 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className='flex flex-col px-6 space-y-4'>
            <Link to="/" onClick={toggleMenu} className='text-gray-800 font-semibold text-lg py-2 border-b border-gray-200'>Home</Link>
            <Link to="/contacto" onClick={toggleMenu} className='text-gray-800 font-semibold text-lg py-2 border-b border-gray-200'>Contacto</Link>
            <div className='hidden md:flex items-center space-x-4 relative'>{children}</div>
            <Link to="/perfil" onClick={toggleMenu} className="flex items-center space-x-3 py-4">
              <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-400" src={imagenAvatar} alt="Avatar" />
              <span className="font-bold text-gray-800 text-lg">Mi Perfil</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
export default Navbar