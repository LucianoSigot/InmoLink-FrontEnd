import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getUserProfile } from '../servicios/auth.service'
import logo from '../imagenes/logo.jpeg'

function Navbar({ children, styles, showBackButton }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const [userRol, setUserRol] = useState(null);

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const data = await getUserProfile();
        if (data && data.foto) {
          setFotoPerfil(data.foto);
        }
        if (data && data.rol) {
          setUserRol(data.rol);
        }
      } catch (error) {
        console.error("Error al cargar la foto de perfil en el Navbar", error);
      }
    };
    cargarDatosUsuario();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const imagenAvatar = fotoPerfil || "https://via.placeholder.com/150";

  return (
    <>
      <nav className={`bg-white/90 backdrop-blur-md border-b border-gray-100 w-full sticky top-0 z-50 ${styles}`}>
        <div className='container mx-auto px-6 py-4 flex items-center justify-between'>
          
          <div className="flex items-center space-x-8">
            {showBackButton && (
              <button
                onClick={() => navigate(-1)}
                className="p-2 bg-white rounded-full luxury-shadow hover:bg-gray-50 transition-colors text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}

            <Link to="/" className="flex items-center gap-3 group">
              <div className="h-10 w-10 bg-black rounded-lg flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105">
                  <img src={logo} alt="Logo" className="h-full w-full object-cover opacity-90" />
              </div>
              <span className="font-['Cormorant_Garamond'] font-bold text-2xl tracking-tighter text-gray-900">INMOLINK</span>
            </Link>

            <div className='hidden xl:flex items-center space-x-8'>
              <Link to="/" className='text-gray-500 hover:text-black font-medium transition-colors text-sm uppercase tracking-widest'>Home</Link>
              <Link to="/perfil/reserva" className='text-gray-500 hover:text-black font-medium transition-colors text-sm uppercase tracking-widest'>Mis Reservas</Link>
              <Link to="/contacto" className="text-gray-500 hover:text-black font-medium transition-colors text-sm uppercase tracking-widest">Contacto</Link>
              {userRol === "admin" && (
                <Link to="/admin" className="text-red-600 hover:text-red-700 font-medium transition-colors text-sm uppercase tracking-widest">Admin</Link>
              )}
            </div>
          </div>

          <div className='hidden lg:flex items-center flex-1 max-w-md px-4'>
            {children}
          </div>

          <div className='hidden md:flex items-center space-x-6'>
            <Link to="/publicar" className="text-sm font-bold uppercase tracking-widest px-6 py-2.5 rounded-full gold-gradient text-black hover:shadow-lg transition-all transform hover:-translate-y-0.5">
              + Publicar
            </Link>
            
            <Link to="/perfil" className="flex items-center space-x-3 p-1 pr-3 rounded-full hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
              <img className="h-8 w-8 rounded-full object-cover border border-gray-200" src={imagenAvatar} alt="Avatar" />
              <span className="text-sm font-semibold text-gray-800">Mi Perfil</span>
            </Link>
          </div>

          <div className='md:hidden'>
            <button onClick={toggleMenu} className='text-gray-600 p-2 rounded-md hover:bg-gray-100 focus:outline-none'>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY MENÚ MÓVIL */}
      <div className={`md:hidden fixed inset-0 z-[100] transition-all duration-300 ${isMenuOpen ? 'visible' : 'invisible'}`}>
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={closeMenu}
        />
        
        <div className={`absolute top-0 right-0 w-[80%] h-full bg-white shadow-2xl transition-transform duration-300 ease-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-50">
            <span className="font-['Cormorant_Garamond'] font-bold text-xl tracking-tight">Menú Principal</span>
            <button onClick={closeMenu} className="text-gray-400 p-2 hover:text-black transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-8 space-y-8 overflow-y-auto h-[calc(100%-80px)]">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Buscador</span>
              <div className="scale-95 origin-left">
                {children}
              </div>
            </div>

            <nav className="flex flex-col space-y-6">
              <Link to="/" onClick={closeMenu} className="text-3xl font-['Cormorant_Garamond'] text-gray-900 border-b border-gray-50 pb-2">Home</Link>
              <Link to="/perfil/reserva" onClick={closeMenu} className="text-3xl font-['Cormorant_Garamond'] text-gray-900 border-b border-gray-50 pb-2">Mis Reservas</Link>
              <Link to="/contacto" onClick={closeMenu} className="text-3xl font-['Cormorant_Garamond'] text-gray-900 border-b border-gray-50 pb-2">Contacto</Link>
              {userRol === "admin" && (
                <Link to="/admin" onClick={closeMenu} className="text-3xl font-['Cormorant_Garamond'] text-red-600 border-b border-gray-50 pb-2">Admin</Link>
              )}
              <Link to="/publicar" onClick={closeMenu} className="text-3xl font-['Cormorant_Garamond'] text-amber-600 border-b border-gray-50 pb-2">+ Publicar</Link>
            </nav>

            <div className="pt-10">
              <Link to="/perfil" onClick={closeMenu} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-3xl border border-gray-100">
                <img className="h-14 w-14 rounded-full object-cover border-2 border-white shadow-sm" src={imagenAvatar} alt="Avatar" />
                <div>
                  <span className="block text-sm font-bold text-gray-900">Mi Perfil</span>
                  <span className="text-xs text-gray-400 uppercase tracking-widest">Ver mi actividad</span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Navbar
