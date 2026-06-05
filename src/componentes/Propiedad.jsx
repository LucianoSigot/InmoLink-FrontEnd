import React from 'react'

const Propiedad = ({ propiedad }) => {
  // Validación para evitar errores si la data es nula
  if (!propiedad) return null; 

  const imagenUrl = (propiedad.fotos && propiedad.fotos.length > 0) 
    ? propiedad.fotos[0] 
    : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670";

  return (
    <div className="bg-white rounded-[2rem] luxury-shadow overflow-hidden group border border-gray-50 flex flex-col h-full transition-all hover:-translate-y-2">
      
      {/* IMAGEN */}
      <div className="relative h-64 w-full overflow-hidden">
        <img src={imagenUrl} alt={propiedad.titulo || 'Propiedad'} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4">
             <span className="bg-white/80 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                ${propiedad.precio ? propiedad.precio.toLocaleString() : '0'} / noche
             </span>
        </div>
      </div>

      {/* INFO */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2 truncate" title={propiedad.titulo}>
            {propiedad.titulo || 'Residencia Exclusiva'}
        </h3>
        
        <p className="text-gray-400 text-[10px] uppercase tracking-widest mb-6 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            {propiedad.ubicacion || 'Ubicación Premium'}
        </p>

        {/* ATRIBUTOS */}
        <div className="flex items-center justify-between mt-auto border-t border-gray-50 pt-4">
          <div className="flex flex-col items-center" title="Dormitorios">
            <span className="text-xs font-bold text-gray-900">{propiedad.habitaciones || 0}</span>
            <span className="text-[8px] uppercase tracking-tighter text-gray-400">Dorm.</span>
          </div>
          <div className="flex flex-col items-center" title="Ambientes">
            <span className="text-xs font-bold text-gray-900">{propiedad.ambientes || 0}</span>
            <span className="text-[8px] uppercase tracking-tighter text-gray-400">Amb.</span>
          </div>
          <div className="flex flex-col items-center" title="Superficie">
            <span className="text-xs font-bold text-gray-900">{propiedad.tamanio || 0}</span>
            <span className="text-[8px] uppercase tracking-tighter text-gray-400">m²</span>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Propiedad