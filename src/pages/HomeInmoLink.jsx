import React from 'react'
import Navbar from '../componentes/Navbar'
import { useNavigate } from 'react-router-dom';
import Propiedad from '../componentes/Propiedad'

// Datos de ejemplo
const mockPropiedades = [
  { id: 1, titulo: 'Casa moderna en el centro', precio: '$20.000', habitaciones: 3, banios: 2, superficie: 180, imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670' },
  { id: 2, titulo: 'Apartamento con vistas al mar', precio: '$45.000', habitaciones: 2, banios: 1, superficie: 90, imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670' },
  { id: 3, titulo: 'Chalet de lujo en la montaña', precio: '$15.000', habitaciones: 5, banios: 4, superficie: 350, imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670' },
  { id: 4, titulo: 'Piso céntrico reformado', precio: '$12.000', habitaciones: 2, banios: 2, superficie: 75, imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670' },
  { id: 5, titulo: 'Casa de campo con piscina', precio: '$32.000', habitaciones: 4, banios: 3, superficie: 220, imagenUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670' },
];

const HomeInmoLink = () => {
  const navigate = useNavigate();
  
  // Función para ir al detalle
  const manejarRuta = (id) => {
    // Podrías usar el ID aquí: navigate(`/anuncio/${id}`);
    navigate('/anuncio');
  }

  return (
    <div className='min-h-screen bg-gray-100'> 
      
      {/* NAVBAR CON BUSCADOR INTEGRADO */}
      <Navbar>
        <div className="flex w-full max-w-xl mx-auto"> {/* Centrado en desktop */}
            <input
            type="text"
            className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Buscar propiedades, zonas..."
            />
            <button
            type="button"
            className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 border border-blue-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </button>
        </div>
      </Navbar>

      {/* CONTENEDOR PRINCIPAL (LAYOUT DE 2 COLUMNAS) */}
      <div className="container mx-auto p-4 md:p-8">
        
        {/* Título Principal */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Inmuebles en Alquiler
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* === 1. SIDEBAR (FILTROS TIPO MERCADOLIBRE) === */}
          <aside className="w-full md:w-1/4 md:min-w-[250px]">
            
            {/* Título Filtros */}
            <h2 className="font-bold text-lg mb-4 text-gray-900">Tu búsqueda</h2>
            
            {/* Tags Activos (Ejemplo) */}
            <div className="mb-6">
               <span className="inline-block bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 mb-2 mr-2 shadow-sm">
                 Alquiler <button className="ml-1 text-gray-400 hover:text-red-500">✕</button>
               </span>
            </div>

            {/* Sección: Categorías */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Categorías</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button className="hover:text-blue-600 hover:font-medium">Casas (120)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">Departamentos (85)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">Quintas (12)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">Locales (30)</button></li>
              </ul>
            </div>

            {/* Sección: Ubicación */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Ubicación</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button className="hover:text-blue-600 hover:font-medium">Capital Federal (50)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">GBA Norte (40)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">Córdoba (20)</button></li>
                <li><button className="hover:text-text-blue-600 text-blue-500 text-xs font-medium mt-1">Mostrar más</button></li>
              </ul>
            </div>

            {/* Sección: Precio (Inputs) */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Precio</h3>
              <div className="flex items-center gap-2 mb-2">
                <input 
                  type="number" 
                  placeholder="Mínimo" 
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 outline-none bg-white shadow-sm"
                />
                <span className="text-gray-400">-</span>
                <input 
                  type="number" 
                  placeholder="Máximo" 
                  className="w-full p-2 text-sm border border-gray-300 rounded focus:border-blue-500 outline-none bg-white shadow-sm"
                />
              </div>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded-full text-xs font-semibold transition-colors">
                Applying
              </button>
            </div>

            {/* Sección: Características */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-2">Ambientes</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><button className="hover:text-blue-600 hover:font-medium">1 ambiente (10)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">2 ambientes (45)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">3 ambientes (20)</button></li>
                <li><button className="hover:text-blue-600 hover:font-medium">4 o más (15)</button></li>
              </ul>
            </div>

          </aside>


          {/* === 2. RESULTADOS (GRILLA DERECHA) === */}
          <main className="w-full md:w-3/4">
            
            {/* Barra superior de resultados (Ordenamiento) */}
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
               <span className="text-sm text-gray-600 font-medium">{mockPropiedades.length} resultados</span>
               <div className="text-sm text-gray-600">
                 Ordenar por: <span className="font-bold text-gray-800 cursor-pointer">Más relevantes ▼</span>
               </div>
            </div>

            {/* La Grilla de Propiedades */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockPropiedades.map((prop) => (
                // CORRECCIÓN IMPORTANTE: El onClick va AQUÍ, en el contenedor de cada carta individual
                <div 
                  key={prop.id}
                  onClick={() => manejarRuta(prop.id)} 
                  className="cursor-pointer transform transition-transform hover:-translate-y-1" // Efecto hover sutil
                >
                  <Propiedad propiedad={prop} />
                </div>
              ))}
            </div>

          </main>

        </div>
      </div>
    </div>
  )
}

export default HomeInmoLink