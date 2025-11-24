import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../imagenes/logo.jpeg'

function Navbar({children}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
 

  return (
    <nav className='bg-slate-200 shadow-md w-full relative z-50'>

        <div className='container mx-auto px-6 py-3 flex items-center justify-between'>
            
            <div className="flex items-center space-x-6">
                <Link to="/">
                    <img src={logo} alt="InmoLink Logo" className="h-12 w-12 object-cover rounded-2xl"/>
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
            <div className='hidden md:flex items-center space-x-4 relative'>
              {children}
            </div>
            <div className='hidden md:flex items-center'>
                <Link to="/perfil" className="flex items-center space-x-2 pl-2 pr-4 py-1 rounded-full hover:bg-slate-300 transition-colors">
                  <img 
                    className="h-9 w-9 rounded-full object-cover border border-gray-400" 
                    src="https://via.placeholder.com/150" 
                    alt="Avatar" 
                  />
                  <span className="font-medium text-gray-700">Mi Perfil</span>
                </Link>
            </div>

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

        {isMenuOpen && (
          <div className='md:hidden absolute top-0 left-0 w-full bg-slate-100 shadow-lg z-50 pb-6'>
            
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-300 mb-2">
                <div className="flex items-center">
                    <img src={logo} alt="Logo" className="h-10 w-10 object-cover rounded-xl mr-2"/>
                    <span className="font-bold text-blue-600 text-sm">inmolink</span>
                </div>
                <button 
                    onClick={toggleMenu}
                    className="text-gray-500 hover:text-gray-800 focus:outline-none"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            <div className='flex flex-col px-6 space-y-4'>
                <Link to="/" onClick={toggleMenu} className='text-gray-800 font-semibold text-lg py-2 border-b border-gray-200'>
                    Home
                </Link>
                <Link to="/contacto" onClick={toggleMenu} className='text-gray-800 font-semibold text-lg py-2 border-b border-gray-200'>
                    Contacto
                </Link>
                <div className='hidden md:flex items-center space-x-4 relative'>
                  {children}
                </div>
                <Link to="/perfil" onClick={toggleMenu} className="flex items-center space-x-3 py-4">
                    <img 
                    className="h-10 w-10 rounded-full object-cover border-2 border-gray-400" 
                    src="https://via.placeholder.com/150" 
                    alt="Avatar" 
                    />
                    <span className="font-bold text-gray-800 text-lg">Mi Perfil</span>
                </Link>
            </div>
          </div>
        )}
    </nav>
  )
}
export default Navbar