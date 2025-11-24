
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import { verPropiedades, obtenerPropiedad } from '../servicios/propiedad.service'

export default function Alquilo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadIndividual, setPropiedadIndividual] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        if (id) {
            const data = await obtenerPropiedad(id);
            setPropiedadIndividual(data);
        } else {
            const data = await verPropiedades();
            setPropiedades(data);
        }
      } catch (error) {
        console.error("Error al cargar datos:", error);
      } finally {
        setCargando(false);
      }
    };
    cargarDatos();
  }, [id]);

  // Mostrar loading mientras carga
  if (cargando) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Cargando tus propiedades...</p>
      </div>
    );
  }

  // Mostrar mensaje si no hay propiedades (y no se buscó una específica)
  if (!id && propiedades.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto px-4 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600 mb-4"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex items-center justify-center h-64">
            <p className="text-lg text-gray-600">No tienes propiedades publicadas aún.</p>
          </div>
        </div>
      </div>
    );
  }

  const propiedad = propiedadIndividual || (propiedades.length > 0 ? propiedades[propiedades.length - 1] : null); 
  
  if (!propiedad) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Propiedad no encontrada.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* ENCABEZADO DE NAVEGACIÓN */}
      <div className="container mx-auto px-4 pt-6 pb-4 flex justify-between items-center">
        {/* Botón Volver */}
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/anuncio/editar-publicacion", { state: { propiedadId: propiedad?._id } })}
            className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-sm hover:bg-blue-50 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            Editar
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">

        {/* IMÁGENES PRINCIPALES */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-4 h-64 md:h-[400px] rounded-3xl overflow-hidden mb-8 shadow-lg">
          <div className="md:col-span-2 md:row-span-2 relative group cursor-pointer">
            <img
              src={propiedad?.fotos?.[0] || "https://via.placeholder.com/800x600?text=Sin+Imagen"}
              alt="Casa Principal"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* === COLUMNA IZQUIERDA (Información Dinámica) === */}
          <div className="lg:col-span-2 space-y-8">

            {/* Título y Ubicación */}
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{propiedad?.titulo || 'Sin título'}</h1>
                  <p className="text-gray-500 flex items-center gap-1">
                    📍 {propiedad?.ubicacion || 'Sin ubicación'}
                  </p>
                </div>
                {/* Puntuación */}
                <div className="flex items-center gap-1 bg-blue-50 px-3 py-1 rounded-lg">
                  <span className="text-yellow-500">★</span>
                  <span className="font-bold text-blue-700">{propiedad?.valoracionPromedio || '0.0'}</span>
                  <span className="text-gray-400 text-sm">(0 reseñas)</span>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Acerca de este lugar</h3>
              <p className="text-gray-600 leading-relaxed">
                {propiedad?.descripcion || 'Sin descripción'}
              </p>
            </div>

            {/* Servicios */}
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">¿Qué ofrece este lugar?</h3>
              <div className="grid grid-cols-2 gap-4">
                {propiedad?.servicios && Object.entries(propiedad.servicios).map(([categoria, servicios]) => (
                  Object.entries(servicios).map(([servicio, activo]) => {
                    if (activo) {
                      // Formatear nombre: 'aire_acondicionado' -> 'Aire Acondicionado'
                      const nombreFormateado = servicio
                        .replace(/_/g, ' ')
                        .replace(/\b\w/g, l => l.toUpperCase());

                      return (
                        <div key={servicio} className="flex items-center gap-3 text-gray-600">
                          <div className="h-2 w-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <span className="capitalize">{nombreFormateado}</span>
                        </div>
                      );
                    }
                    return null;
                  })
                ))}
              </div>
            </div>

            {/* Mapa (Imagen Estática) */}
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-4">¿Dónde vas a estar?</h3>
              <div className="w-full h-64 bg-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <img src="https://via.placeholder.com/800x400?text=Mapa+Google" alt="Mapa" className="absolute inset-0 w-full h-full object-cover opacity-60" />
                <button className="relative z-10 bg-white px-4 py-2 rounded-full shadow-md font-medium text-blue-600 hover:bg-blue-50 transition-colors">
                  Ver en Google Maps
                </button>
              </div>
            </div>

            {/* Comentarios Estáticos */}
            <div className="bg-white p-6 rounded-3xl shadow-md">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Comentarios</h3>
              <div className="space-y-6">
                <p className="text-gray-500 text-center">Aún no hay comentarios para esta propiedad.</p>
              </div>
            </div>
          </div>

          {/* === COLUMNA DERECHA (Tarjeta de Reserva) === */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-3xl shadow-xl border border-gray-100 sticky top-4">

              {/* Precio */}
              <div className="flex justify-between items-end mb-6">
                <div>
                  <span className="text-3xl font-bold text-gray-900">${propiedad?.precio || '0'}</span>
                  <span className="text-gray-500"> / noche</span>
                </div>
              </div>

              {/* Selector de Fechas (Inputs sin lógica) */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="p-3 border-r border-gray-300 hover:bg-gray-50 cursor-pointer">
                    <label className="block text-xs font-bold text-gray-700 uppercase cursor-pointer">Llegada</label>
                    <div className="text-sm text-gray-400">Agrega fecha</div>
                  </div>
                  <div className="p-3 hover:bg-gray-50 cursor-pointer">
                    <label className="block text-xs font-bold text-gray-700 uppercase cursor-pointer">Salida</label>
                    <div className="text-sm text-gray-400">Agrega fecha</div>
                  </div>
                </div>
                <div className="p-3 hover:bg-gray-50 cursor-pointer">
                  <label className="block text-xs font-bold text-gray-700 uppercase cursor-pointer">Huéspedes</label>
                  <div className="text-sm text-gray-600">1 huésped</div>
                </div>
              </div>

              {/* Botón Reservar */}
              <button className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all mb-4">
                Reservar
              </button>

              <p className="text-center text-xs text-gray-400 mb-4">No se te cobrará todavía</p>

              {/* Desglose de Precios (Visual) */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span className="underline decoration-dotted">${propiedad?.precio || '0'} x 5 noches</span>
                  <span>${(propiedad?.precio || 0) * 5}</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted">Tarifa de limpieza</span>
                  <span>$30</span>
                </div>
                <div className="flex justify-between">
                  <span className="underline decoration-dotted">Comisión de servicio</span>
                  <span>$40</span>
                </div>
                <hr className="border-gray-200 my-4" />
                <div className="flex justify-between font-bold text-lg text-gray-800">
                  <span>Total</span>
                  <span>${(propiedad?.precio || 0) * 5 + 70}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
