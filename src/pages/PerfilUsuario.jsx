// components/PerfilUsuario.jsx
import React, { useState } from 'react';
import Emergente from '../componentes/Emergente';
import { useNavigate } from 'react-router-dom';

export default function PerfilUsuario() {
  const [showEmergente, setShowEmergente] = useState(false);
  const [accionActual, setAccionActual] = useState('');
  const navigate = useNavigate();

  const manejarAccion = (accion) => {
    setAccionActual(accion);
    setShowEmergente(true);
  };
  const confirmarAccion = () => {
    console.log(`Acción confirmada: ${accionActual}`);
    setShowEmergente(false);
    setAccionActual('');
  };
  const cancelarAccion = () => {
    setShowEmergente(false);
    setAccionActual('');
  };
  const manejarRuta = (tipo) => {
    navigate(`/perfil/${tipo}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* BARRA LATERAL */}
      <aside className="bg-white w-full md:w-64 shadow-lg flex flex-col p-6 md:min-h-screen">
        
        {/* Botón de Volver */}
        <button className="mb-8 self-start p-2 hover:bg-gray-100 rounded-full transition-colors"
        
          onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Menú de Botones */}
        <div className="flex flex-col space-y-4 w-full">
          <button 
            onClick={() => manejarRuta('editar')}
            className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all">
            Editar
          </button>
          
          <button 
            onClick={() => manejarAccion('eliminar')}
            className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-red-50 hover:border-red-500 hover:text-red-600 transition-all"
          >
            Eliminar
          </button>
          
          <button 
            onClick={() => manejarAccion('cerrarSesion')}
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-xl font-semibold text-center hover:bg-gray-900 transition-all"
          >
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-10 overflow-y-auto">
        
        {/* SECCIÓN SUPERIOR */}
        <div className="flex flex-col items-center mb-12">
          {/* Imagen Circular */}
          <div className="h-32 w-32 rounded-full border-4 border-white shadow-lg overflow-hidden mb-4 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Imagen</span>
          </div>
          
          {/* Nombre */}
          <h2 className="text-2xl font-bold text-gray-800 bg-white px-6 py-2 rounded-full shadow-sm mb-6">
            Nombre de Usuario
          </h2>

          {/* Descripción */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Descripción</h3>
            <p className="text-gray-600">
              Aquí va la descripción del usuario...
            </p>
          </div>
        </div>

        {/* SECCIÓN MEDIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">
          
          {/* Reserva */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full relative group" 
            onClick={() => manejarRuta('reserva')}
            role="button"
            tabIndex={0}>
            <h3 className="text-xl font-bold text-center mb-4 border-b pb-2 mx-10">Reserva</h3>
            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[150px]">
               <span className="text-gray-500 font-medium">Casas Reservadas</span>
            </div>
          </div>

          {/* Alquilo */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full relative group"
            onClick={() => manejarRuta('alquilo')}
            role="button"
            tabIndex={0}>
            <h3 className="text-xl font-bold text-center mb-4 border-b pb-2 mx-10">Alquilo</h3>
            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[150px]">
               <span className="text-gray-500 font-medium">Mis Alquileres</span>
            </div>
          </div>
        </div>
        {/* SECCIÓN COMENTARIOS */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-md p-6 relative group">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Comentarios</h3>
            <div className="bg-gray-50 rounded-xl p-4 min-h-[100px] text-gray-600">
              <p>"Excelente atención, muy recomendable." - Cliente Feliz</p>
            </div>
            <div className="absolute right-6 bottom-6 text-gray-400 text-xl group-hover:translate-x-2 transition-transform">
               ➝
            </div>
          </div>
        </div>
      </main>
      {/* MODAL EMERGENTE */}
      <Emergente
        isOpen={showEmergente}
        onClose={cancelarAccion}
        onConfirm={confirmarAccion}
        mensaje={
          accionActual === 'eliminar' 
            ? "¿Estás seguro de que quieres eliminar tu cuenta?" 
            : "¿Estás seguro de que quieres cerrar sesión?"
        }
        tipo={accionActual === 'eliminar' ? 'eliminar' : 'confirmacion'}
      />
    </div>
  );
}