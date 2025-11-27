import React from 'react'

const Propiedad = ({ propiedad }) => {
  // Validación para evitar errores si la data es nula
  if (!propiedad) return null; 

  const imagenUrl = (propiedad.fotos && propiedad.fotos.length > 0) 
    ? propiedad.fotos[0] 
    : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full">
      
      {/* IMAGEN */}
      <div className="relative h-56 w-full">
        <img src={imagenUrl} alt={propiedad.titulo || 'Propiedad'} className="w-full h-full object-cover" />
      </div>

      {/* INFO */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate" title={propiedad.titulo}>
            {propiedad.titulo || 'Sin título'}
        </h3>
        <p className="text-xl font-bold text-blue-600 mb-4">
            ${propiedad.precio ? propiedad.precio.toLocaleString() : '0'}
        </p>

        {/* ATRIBUTOS */}
        <div className="flex items-center justify-between mt-auto text-gray-600 text-sm">
          <div className="flex items-center gap-2" title="Habitaciones">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="font-medium">{propiedad.habitaciones || 0} hab.</span>
          </div>
          <div className="flex items-center gap-2" title="Ambientes">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
            <span className="font-medium">{propiedad.hambientes || 0} amb.</span>
          </div>
          <div className="flex items-center gap-2" title="Metros Cuadrados">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
            <span className="font-medium">{propiedad.tamanio || 0} m²</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Propiedad