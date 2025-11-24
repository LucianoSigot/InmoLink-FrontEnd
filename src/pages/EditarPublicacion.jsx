import React from 'react'
import Navbar from '../componentes/Navbar'
import { useNavigate } from 'react-router-dom';

const EditarPublicacion = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto p-4 md:p-8">
        
        {/* ENCABEZADO: Botón Volver */}
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Editar Publicación</h1>
        </div>

        {/* TARJETA DE EDICIÓN */}
        <div className="bg-white w-full max-w-5xl mx-auto rounded-3xl shadow-xl overflow-hidden p-6 md:p-10">
          
          {/* 1. GALERÍA DE FOTOS (Estática por ahora) */}
          <div className="mb-10">
            <label className="block text-lg font-bold text-gray-700 mb-4">Fotos de la propiedad</label>
            <div className="h-64 bg-gray-50 border-4 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors cursor-pointer group">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2 text-gray-300 group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
               </svg>
               <span className="font-medium">Gestionar Fotos (Click para editar)</span>
            </div>
          </div>

          <form className="space-y-8">
            
            {/* 2. GRID DE DATOS PRINCIPALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* COLUMNA IZQUIERDA */}
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Título del anuncio</label>
                  <input 
                    type="text" 
                    defaultValue="Casa moderna en el centro" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Precio por noche</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input 
                      type="number" 
                      defaultValue="50"
                      className="w-full pl-8 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Fechas Disponibles */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Desde</label>
                    <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 mb-1 ml-1 uppercase">Hasta</label>
                    <input type="date" className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:border-blue-500 outline-none" />
                  </div>
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="space-y-6">
                {/* Descripción */}
                <div className="h-full flex flex-col">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Descripción</label>
                  <textarea 
                    rows="8"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none flex-grow"
                    defaultValue="Disfruta de una estancia inolvidable en esta casa moderna totalmente equipada..."
                  ></textarea>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* 3. SERVICIOS (Checkboxes de solo lectura o editables según lógica) */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-4">Servicios (No editables)</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-200">
                {["Wifi", "Cocina", "Estacionamiento", "TV", "Aire Acondicionado", "Calefacción"].map((servicio, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    {/* Checkbox deshabilitado pero marcado */}
                    <input 
                      type="checkbox" 
                      checked 
                      readOnly 
                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300 cursor-not-allowed" 
                    />
                    <span className="text-gray-600">{servicio}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2 ml-1">* Para modificar los servicios contacta al soporte.</p>
            </div>

            {/* 4. BOTONES DE ACCIÓN */}
            <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">
              
              {/* Eliminar (Rojo y secundario) */}
              <button 
                type="button"
                className="w-full md:w-1/3 py-4 px-6 rounded-2xl border-2 border-red-100 text-red-600 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2"
              >
                Eliminar Propiedad
              </button>

              {/* Guardar (Azul y principal) */}
              <button 
                type="button" // Cambiar a submit
                className="w-full md:w-2/3 bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-2xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                Guardar Cambios
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarPublicacion

