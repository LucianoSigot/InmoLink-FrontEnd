import React, { useState, useEffect } from 'react';
import { Emergente } from '../componentes/Emergente';
import { useNavigate } from 'react-router-dom';
import { deleteCuenta, logoutCuenta, getUserProfile } from '../servicios/auth.service';

export default function PerfilUsuario() {
  const [showEmergente, setShowEmergente] = useState(false);
  const [accionActual, setAccionActual] = useState('');
  const [error, setError] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const navigate = useNavigate();

  // Obtener datos del usuario al cargar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile();
        if (data) {
          setUserData(data);
        } else {
          // Si no hay datos, redirigir al login
          navigate('/login');
        }
      } catch (err) {
        console.error('Error al obtener perfil:', err);
        setError('Error al cargar el perfil del usuario');
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const esUsuarioGoogle = userData?.esUsuarioGoogle || false;

  const manejarAccion = (accion) => {
    setError(null);
    setAccionActual(accion);
    setShowEmergente(true); // Abre el modal
  };

  const confirmarAccion = (password) => {
    setError(null);
    setCargando(true); // Iniciar carga

    if (accionActual === "eliminar") {
      const passwordParaEnviar = esUsuarioGoogle ? null : password;
      manejarEliminar(passwordParaEnviar);
    }
    else if (accionActual === "cerrarSesion") {
      manejarlogout();
    }
  };

  const cancelarAccion = () => {
    if (!cargando) { // Solo permitir cancelar si no está cargando
      setShowEmergente(false);
      setAccionActual('');
      setError(null);
    }
  };

  const manejarRuta = (tipo) => {
    // Esta función agrega '/perfil/' automáticamente
    navigate(`/perfil/${tipo}`);
  };

  const manejarEliminar = async (password) => {
    try {
      const respuesta = await deleteCuenta(password);

      if (respuesta.ok) {
        setShowEmergente(false);
        setAccionActual('');
        setCargando(false);
        navigate("/login");
        return;
      }

      const errorData = await respuesta.json();
      setError(errorData.message || "Error al eliminar la cuenta, contraseña incorrecta.");
      setAccionActual('eliminar'); // Mantener la acción actual
      setCargando(false);

    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
      setShowEmergente(false);
      setAccionActual('');
      setCargando(false);
    }
  }

  const manejarlogout = async () => {
    try {
      const respuesta = await logoutCuenta();

      if (respuesta.ok) {
        setShowEmergente(false);
        setAccionActual('');
        setCargando(false);
        navigate("/login");
        return;
      }

      setError("Hubo un problema al intentar cerrar la sesión.");
      setAccionActual('cerrarSesion'); // Mantener la acción actual
      setCargando(false);

    } catch (err) {
      setError(err.message || "Error de conexión con el servidor");
      setShowEmergente(false);
      setAccionActual('');
      setCargando(false);
    }
  }

  if (loadingProfile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcfb] flex flex-col md:flex-row">

      {/* BARRA LATERAL */}
      <aside className="bg-white w-full md:w-80 luxury-shadow flex flex-col p-10 md:min-h-screen z-10 border-r border-gray-50">
        {error && (
          <div className="text-red-600 text-[10px] font-bold uppercase tracking-widest p-4 bg-red-50 rounded-2xl text-center mb-8">
            {error}
          </div>
        )}
        {/* Botón de Volver */}
        <button className="mb-12 self-start p-3 bg-white luxury-shadow rounded-full transition-all hover:bg-gray-50 text-gray-400 hover:text-black"
          onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {/* Menú de Botones */}
        <div className="flex flex-col space-y-6 w-full">
            <h4 className="text-[10px] font-bold text-gray-300 uppercase tracking-[0.3em] mb-2">Mi Cuenta</h4>
          <button
            onClick={() => manejarRuta('editar')}
            className="w-full py-4 px-6 text-left rounded-2xl font-bold text-[10px] uppercase tracking-widest text-gray-500 hover:text-black hover:bg-gray-50 transition-all">
            Editar Perfil
          </button>

          <button
            onClick={() => manejarAccion('eliminar')}
            className="w-full py-4 px-6 text-left rounded-2xl font-bold text-[10px] uppercase tracking-widest text-gray-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            Eliminar Cuenta
          </button>

          <div className="pt-8">
            <button
                onClick={() => manejarAccion('cerrarSesion')}
                className="w-full py-4 px-6 bg-black text-white rounded-full font-bold text-[10px] uppercase tracking-widest text-center hover:bg-gray-800 transition-all luxury-shadow transform hover:-translate-y-0.5"
            >
                Cerrar sesión
            </button>
          </div>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-8 md:p-20 overflow-y-auto">

        {/* SECCIÓN SUPERIOR */}
        <div className="flex flex-col items-center mb-20">
          {/* Imagen Circular */}
          <div className="h-40 w-40 rounded-full border-8 border-white luxury-shadow overflow-hidden mb-8 bg-gray-50 flex items-center justify-center group relative">
            {userData?.foto ? (
              <img src={userData.foto} alt={userData.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
            ) : (
              <span className="text-gray-200 text-6xl font-['Cormorant_Garamond']">{userData.name.charAt(0).toUpperCase()}</span>
            )}
          </div>

          {/* Nombre */}
          <h2 className="text-5xl md:text-6xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-4">
            {userData?.name || 'Usuario'}
          </h2>
          <p className="text-gray-400 text-[10px] uppercase tracking-[0.3em] font-bold">{esUsuarioGoogle ? 'Premium Guest • Google' : 'Miembro Exclusivo'}</p>

          {/* Descripción */}
          <div className="w-full max-w-3xl bg-white rounded-[2.5rem] luxury-shadow p-12 mt-16 border border-gray-50">
            <h3 className="text-2xl font-['Cormorant_Garamond'] text-gray-900 mb-8 border-b border-gray-50 pb-4">Detalles de Perfil</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Dirección de Email</p>
                        <p className="text-sm font-medium text-gray-700">{userData.email}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Teléfono</p>
                        <p className="text-sm font-medium text-gray-700">{userData.telefono || 'No especificado'}</p>
                    </div>
                </div>
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Residencia</p>
                        <p className="text-sm font-medium text-gray-700">{userData.direccion || 'No especificada'}</p>
                    </div>
                    <div>
                        <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-1">Descripción</p>
                        <p className="text-sm font-medium text-gray-700 italic">"{userData.descripcion || 'Sin descripción disponible.'}"</p>
                    </div>
                </div>
            </div>
          </div>
        </div>

        {/* SECCIÓN MEDIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">

          {/* Reserva */}
          <div className="bg-white rounded-[2.5rem] luxury-shadow p-10 flex flex-col h-full group cursor-pointer transition-all hover:-translate-y-2 border border-gray-50"
            onClick={() => manejarRuta('reserva')}
            role="button"
            tabIndex={0}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900">Mis Reservas</h3>
                <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
            </div>
            <div className="flex-1 bg-[#fdfcfb] rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] border border-gray-50">
              <span className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mb-2">Próximas Estancias</span>
              <span className="text-gray-400 text-xs font-light">Gestione sus futuras visitas</span>
            </div>
          </div>

          {/* Alquilo */}
          <div className="bg-white rounded-[2.5rem] luxury-shadow p-10 flex flex-col h-full group cursor-pointer transition-all hover:-translate-y-2 border border-gray-50"
            onClick={() => manejarRuta('mis-casas')}
            role="button"
            tabIndex={0}>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900">Mis Propiedades</h3>
                <div className="h-10 w-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                </div>
            </div>
            <div className="flex-1 bg-[#fdfcfb] rounded-[2rem] p-8 flex flex-col items-center justify-center min-h-[180px] border border-gray-50">
              <span className="text-gray-300 text-[10px] font-bold uppercase tracking-widest mb-2">Mi Portafolio</span>
              <span className="text-gray-400 text-xs font-light">Administre sus activos inmobiliarios</span>
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
            ? esUsuarioGoogle
              ? "¿Estás seguro de que quieres eliminar tu cuenta de Google?"
              : "¿Estás seguro de que quieres eliminar tu cuenta? Requiere contraseña."
            : "¿Estás seguro de que quieres cerrar sesión?"
        }
        tipo={accionActual === 'eliminar' ? 'eliminar' : 'confirmacion'}
        cargando={cargando}
      />
    </div>
  );
}