
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import { verPropiedades, obtenerPropiedad } from '../servicios/propiedad.service'
import { getUserProfile } from '../servicios/auth.service'
import { createReservation } from '../servicios/reservation.service'

export default function Alquilo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [propiedades, setPropiedades] = useState([]);
  const [propiedadIndividual, setPropiedadIndividual] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Estados para reserva
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [huespedes, setHuespedes] = useState(1);
  const [cargandoReserva, setCargandoReserva] = useState(false);
  const [mensajeReserva, setMensajeReserva] = useState({ tipo: '', texto: '' });

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        // Obtener usuario actual
        const user = await getUserProfile();
        setUsuarioActual(user);

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

  // Calcular noches y precio total
  const calcularNoches = () => {
    if (!fechaInicio || !fechaFin) return 0;
    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const diffTime = Math.abs(fin - inicio);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const noches = calcularNoches();
  const precioNoches = noches * (propiedad?.precio || 0);
  const tarifaLimpieza = 30;
  const comisionServicio = 40;
  const precioTotal = precioNoches + tarifaLimpieza + comisionServicio;

  // Funcion para manejar la reserva
  const handleReservar = async () => {
    // Validaciones
    if (!fechaInicio || !fechaFin) {
      setMensajeReserva({ tipo: 'error', texto: 'Por favor selecciona las fechas de llegada y salida' });
      return;
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (inicio < hoy) {
      setMensajeReserva({ tipo: 'error', texto: 'La fecha de inicio no puede ser anterior a hoy' });
      return;
    }

    if (fin <= inicio) {
      setMensajeReserva({ tipo: 'error', texto: 'La fecha de salida debe ser posterior a la fecha de llegada' });
      return;
    }

    try {
      setCargandoReserva(true);
      setMensajeReserva({ tipo: '', texto: '' });

      const reservaData = {
        propiedadId: propiedad._id,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
        precioTotal: precioTotal
      };

      await createReservation(reservaData);

      setMensajeReserva({ tipo: 'success', texto: '¡Reserva creada exitosamente!' });

      // Limpiar formulario
      setTimeout(() => {
        setFechaInicio('');
        setFechaFin('');
        setHuespedes(1);
        setMensajeReserva({ tipo: '', texto: '' });
        navigate('/perfil/reserva');
      }, 2000);

    } catch (error) {
      setMensajeReserva({ tipo: 'error', texto: error.message || 'Error al crear la reserva' });
    } finally {
      setCargandoReserva(false);
    }
  };

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
          {/* Mostrar botón de editar solo si la propiedad pertenece al usuario actual */}
          {usuarioActual && String(propiedad?.propietarioId) === String(usuarioActual.id) && (
            <button
              onClick={() => navigate("/anuncio/editar-publicacion", { state: { propiedadId: propiedad?._id } })}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full shadow-sm hover:bg-blue-50 font-medium transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Editar
            </button>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 pb-12">

        {/* IMÁGENES PRINCIPALES */}
        <div className="h-[600px] rounded-3xl overflow-hidden mb-8 shadow-lg hover:shadow-2xl transition-shadow duration-300">
          <div className="relative h-full w-full group overflow-hidden">
            <img
              src={(propiedad?.fotos && propiedad.fotos.length > 0)
                ? propiedad.fotos[0]
                : "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2670"}
              alt="Casa Principal"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
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

              {/* Selector de Fechas */}
              <div className="border border-gray-300 rounded-2xl overflow-hidden mb-4">
                <div className="grid grid-cols-2 border-b border-gray-300">
                  <div className="p-3 border-r border-gray-300">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Llegada</label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="text-sm text-gray-700 w-full border-none focus:outline-none"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div className="p-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Salida</label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="text-sm text-gray-700 w-full border-none focus:outline-none"
                      min={fechaInicio || new Date().toISOString().split('T')[0]}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Huéspedes</label>
                  <input
                    type="number"
                    value={huespedes}
                    onChange={(e) => setHuespedes(parseInt(e.target.value) || 1)}
                    min="1"
                    className="text-sm text-gray-700 w-full border-none focus:outline-none"
                  />
                </div>
              </div>

              {/* Mensajes */}
              {mensajeReserva.texto && (
                <div className={`mb-4 p-3 rounded-xl text-sm text-center ${mensajeReserva.tipo === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {mensajeReserva.texto}
                </div>
              )}

              {/* Botón Reservar */}
              <button
                onClick={handleReservar}
                disabled={cargandoReserva || !fechaInicio || !fechaFin}
                className={`w-full font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all mb-4 ${cargandoReserva || !fechaInicio || !fechaFin
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                {cargandoReserva ? 'Procesando...' : 'Reservar'}
              </button>

              <p className="text-center text-xs text-gray-400 mb-4">No se te cobrará todavía</p>

              {/* Desglose de Precios (Dinámico) */}
              <div className="space-y-3 text-sm text-gray-600">
                {noches > 0 && (
                  <>
                    <div className="flex justify-between">
                      <span className="underline decoration-dotted">${propiedad?.precio || '0'} x {noches} {noches === 1 ? 'noche' : 'noches'}</span>
                      <span>${precioNoches}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline decoration-dotted">Tarifa de limpieza</span>
                      <span>${tarifaLimpieza}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="underline decoration-dotted">Comisión de servicio</span>
                      <span>${comisionServicio}</span>
                    </div>
                    <hr className="border-gray-200 my-4" />
                    <div className="flex justify-between font-bold text-lg text-gray-800">
                      <span>Total</span>
                      <span>${precioTotal}</span>
                    </div>
                  </>
                )}
                {noches === 0 && (
                  <p className="text-center text-gray-400">Selecciona fechas para ver el precio</p>
                )}
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
