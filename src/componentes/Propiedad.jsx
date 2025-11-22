import React from 'react'

const Propiedad = ({ propiedad }) => {
  const { 
    imagenUrl = "https://via.placeholder.com/600x400.png?text=Imagen+No+Disponible", 
    titulo = "Propiedad sin título", 
    precio = "$0", 
    habitaciones = 0, 
    banios = 0, 
    superficie = 0 
  } = propiedad || {};

  return (
  
    <div className="bg-white rounded-lg overflow-hidden min-h-[350px] flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300">
        <img 
          src={imagenUrl} 
          alt={titulo} 
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/600x400.png?text=Imagen+No+Disponible';
          }}
        />
        <div className='p-4 flex flex-col flex-grow justify-between'>
            <div>
              <h3 className='text-xl font-bold text-gray-800 truncate'>
                  {titulo}
              </h3>
              <p className='text-2xl font-semibold text-blue-600 mt-2'>
                  {precio}
              </p>
            </div>
            
            <div className='flex justify-between text-gray-700 mt-4 text-sm'>
                <span className='flex items-center space-x-1'>
                    <span role="img" aria-label="dormitorio">🛏️</span> 
                    <span>{habitaciones} hab.</span>
                </span>
                <span className='flex items-center space-x-1'>
                    <span role="img" aria-label="baño">🛁</span> 
                    <span>{banios} baños</span>
                </span>
                <span className='flex items-center space-x-1'>
                    <span role="img" aria-label="superficie">📏</span> 
                    <span>{superficie} m²</span>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Propiedad