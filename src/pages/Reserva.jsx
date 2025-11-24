import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

function ReservaPage() {
  const navigate = useNavigate();

  // Datos falsos para visualizar la lista
  const reservasActivas = [
    { id: 1, titulo: 'Casa de Playa', fecha: '12 Feb - 18 Feb', estado: 'Confirmada' },
    { id: 2, titulo: 'Cabaña en el Bosque', fecha: '20 Mar - 25 Mar', estado: 'Pendiente' },
  ];

  const historial = [
    { id: 3, titulo: 'Departamento Centro', fecha: '10 Ene - 15 Ene', estado: 'Finalizada' },
    { id: 4, titulo: 'Loft Industrial', fecha: '05 Dic - 08 Dic', estado: 'Finalizada' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-4 md:p-8">
        
        {/* --- ENCABEZADO (Botón Volver y Título) --- */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          
          <h1 className="text-2xl font-bold text-gray-800">Mis Reservas</h1>
          
          {/* Espacio vacío para equilibrar el flex header o poner un icono */}
          <div className="w-10"></div> 
        </div>

        <div className="w-full max-w-4xl mx-auto space-y-10">

          {/* === SECCIÓN 1: RESERVAS ACTIVAS === */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 md:p-8">
            <h2 className="text-xl font-bold text-blue-600 mb-4 border-b border-gray-100 pb-2">
              Listado de casas reservadas
            </h2>
            
            <div className="space-y-4">
              {reservasActivas.length > 0 ? (
                reservasActivas.map((item) => (
                  <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      {/* Placeholder de imagen */}
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                        🏠
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">{item.titulo}</h3>
                        <p className="text-sm text-gray-500">{item.fecha}</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                      {item.estado}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4">No tienes reservas activas.</p>
              )}
            </div>
          </div>

          {/* === SECCIÓN 2: HISTORIAL === */}
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-6 md:p-8 opacity-90">
            <h2 className="text-xl font-bold text-gray-600 mb-4 border-b border-gray-100 pb-2">
              Historial de alquileres
            </h2>
            <p className="text-xs text-gray-400 mb-4 -mt-2">
              Solo propiedades confirmadas y finalizadas
            </p>

            <div className="space-y-4">
              {historial.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 opacity-75 hover:opacity-100 transition-opacity">
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                      📅
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-700">{item.titulo}</h3>
                      <p className="text-sm text-gray-500">{item.fecha}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-bold text-gray-600 bg-gray-200 rounded-full">
                    {item.estado}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReservaPage;