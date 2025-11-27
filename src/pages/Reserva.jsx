import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';

function ReservaPage() {
  const navigate = useNavigate();

  const [reservasActivas, setReservasActivas]=useState([])
  const [historial, setHistorial]=useState([])
  const [loading, setLoading]=useState(true)
  const [error, setError]=useState(null)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        // A. Obtener token (Asumimos que lo guardaste como 'token' al hacer login)
        const token = localStorage.getItem('token');
        
        if (!token) {
           navigate('/login'); // Si no hay login, mandar afuera
           return;
        }

        // B. Petición con FETCH
        // Ajusta el puerto (4000, 3000, 8080) según tu backend
        const response = await fetch('http://localhost:4000/reservation', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Importante: Enviar el token
          }
        });

        // C. Validación Manual (Fetch no lanza error en 404 o 500, hay que revisar .ok)
        if (!response.ok) {
            // Si el token expiró o hay error, lanzamos una excepción
            if (response.status === 401 || response.status === 403) {
                localStorage.removeItem('token'); // Limpiamos token viejo
                navigate('/login');
                return;
            }
            throw new Error('Error al obtener las reservas');
        }

        // D. Convertir a JSON
        const todasLasReservas = await response.json();

        // E. Lógica de separación (Activas vs Historial)
        const hoy = new Date();
        const activas = [];
        const pasadas = [];

        todasLasReservas.forEach(reserva => {
          const fechaFin = new Date(reserva.fechaFin);
          // Si la fecha ya pasó, va al historial
          if (fechaFin < hoy) {
            pasadas.push(reserva);
          } else {
            activas.push(reserva);
          }
        });

        setReservasActivas(activas);
        setHistorial(pasadas);

      } catch (err) {
        console.error("Error:", err);
        setError("Hubo un problema cargando tus reservas.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservas();
  }, [navigate]);

  // Función para fechas bonitas (ej: "12 nov")
  const formatearFecha = (fechaISO) => {
    if (!fechaISO) return '';
    return new Date(fechaISO).toLocaleDateString('es-ES', {
      day: 'numeric', month: 'short'
    });
  };

  if (loading) return(
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">Cargando tus reservas...</p>
    </div>
  )
  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
        <p className="text-red-500 text-lg">{error}</p>
        <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded-lg">Reintentar</button>
    </div>
  );

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
                reservasActivas.map((reserva) => (
                  <div key={reserva.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-4">
                      {/* Placeholder de imagen */}
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-500">
                        🏠
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {reserva.propiedadId?.titulo || "Propiedad no encontrada"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {formatearFecha(reserva.fechaInicio)}-{formatearFecha(reserva.fechaFin)}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                      {reserva.estado ? (reserva.estado.charAt(0).toUpperCase()+ reserva.estado.slice(1)):"Desconocido"}
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
              Historial de casas reservadas
            </h2>
            
            <div className="space-y-4">
              {historial.length > 0 ? (
                historial.map((reserva) => (
                  <div key={reserva._id} className="flex items-center justify-between bg-gray-50 p-4 rounded-xl border border-gray-100 opacity-75 hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 bg-gray-200 rounded-lg flex items-center justify-center text-2xl grayscale">
                        📅
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-700">
                            {reserva.propiedadId?.titulo || "Propiedad eliminada"}
                        </h3>
                        <p className="text-sm text-gray-500">
                            {formatearFecha(reserva.fechaInicio)} - {formatearFecha(reserva.fechaFin)}
                        </p>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-bold text-gray-500 bg-gray-200 rounded-full border border-gray-300">
                      Finalizada
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center py-4 text-sm">Aún no tienes historial.</p>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ReservaPage;