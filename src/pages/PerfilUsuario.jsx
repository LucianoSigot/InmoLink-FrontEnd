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
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      {/* BARRA LATERAL */}
      <aside className="bg-white w-full md:w-64 shadow-lg flex flex-col p-6 md:min-h-screen">
        {error && (
          <div className="text-red-600 font-bold p-4 bg-red-100 rounded-lg text-center my-4 mx-auto max-w-lg">
            {error}
          </div>
        )}
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
            className="w-full py-3 px-4 bg-white border-2 border-gray-300 rounded-xl font-semibold text-gray-700 hover:bg-blue-50 hover:border-blue-500 hover:text-blue-600 transition-all cursor-pointer">
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
            className="w-full py-3 px-4 bg-gray-800 text-white rounded-xl font-semibold text-center hover:bg-gray-900 transition-all cursor-pointer"
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
            {userData?.foto ? (
              <img src={userData.foto} alt={userData.name} className="w-full h-full object-cover" />
            ) : (
              <span className="text-gray-500 text-4xl">{userData.name.charAt(0).toUpperCase()}</span>
            )}
          </div>

          {/* Nombre */}
          <h2 className="text-2xl font-bold text-gray-800 bg-white px-6 py-2 rounded-full shadow-sm mb-6">
            {userData?.name || 'Usuario'}
          </h2>

          {/* Descripción */}
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Datos personales</h3>
            <p className="text-gray-600">
              <strong>Email:</strong> {userData.email}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Descripcion:</strong> {userData.descripcion}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Telefono:</strong> {userData.telefono}
            </p>
            <p className="text-gray-600 mt-2">
              <strong>Direccion:</strong> {userData.direccion}
            </p>

            <p className="text-gray-600 mt-2">
              <strong>Tipo de cuenta:</strong> {esUsuarioGoogle ? 'Google' : 'Email/Password'}
            </p>
          </div>
        </div>

        {/* SECCIÓN MEDIA */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 max-w-5xl mx-auto">

          {/* Reserva */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full relative group cursor-pointer"
            onClick={() => manejarRuta('reserva')}
            role="button"
            tabIndex={0}>
            <h3 className="text-xl font-bold text-center mb-4 border-b pb-2 mx-10">Reserva</h3>
            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[150px]">
              <span className="text-gray-500 font-medium">Casas Reservadas</span>
            </div>
          </div>

          {/* Alquilo */}
          <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col h-full relative group cursor-pointer"
            // --- CORRECCIÓN AQUÍ: Se quitó la barra inicial '/' ---
            onClick={() => manejarRuta('mis-casas')}
            role="button"
            tabIndex={0}>
            <h3 className="text-xl font-bold text-center mb-4 border-b pb-2 mx-10">Alquilo</h3>
            <div className="flex-1 bg-gray-100 rounded-xl p-4 flex items-center justify-center min-h-[150px]">
              <span className="text-gray-500 font-medium">Mis Alquileres</span>
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