import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditarUsuario() {
  const navigate = useNavigate();
  // Estado temporal para la previsualización de la imagen
  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [direccion, setDireccion] = useState("");
  const [telefono, setTelefono] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [email, setEmail] = useState("");
  const [esUsuarioGoogle, setEsUsuarioGoogle] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Obtener datos del usuario al cargar
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/perfil', {
          method: 'GET',
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setNombre(data.name || "");
          setEmail(data.email || "");
          setDescripcion(data.descripcion || "");
          setDireccion(data.direccion || "");
          setTelefono(data.telefono || "");
          setImagePreview(data.foto || "https://via.placeholder.com/150");
          setEsUsuarioGoogle(data.esUsuarioGoogle || false);
        }
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error);
      } finally {
        setCargando(false);
      }
    };

    fetchUserData();
  }, []);
  const [uploading, setUploading] = useState(false);

  // Función para subir imagen a Supabase
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Preview local inmediato
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Subir a Supabase
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('http://localhost:4000/api/upload-profile-image', {
        method: 'POST',
        credentials: 'include',
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        setImagePreview(data.url); // URL de Supabase
        console.log('Imagen subida exitosamente:', data.url);
      } else {
        const errorData = await response.json();
        alert('Error al subir la imagen: ' + (errorData.message || 'Error desconocido'));
        // Revertir al preview anterior si falla
        setImagePreview(imagePreview);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al subir la imagen');
      setImagePreview(imagePreview);
    } finally {
      setUploading(false);
    }
  };

  const manejarSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
    try {
      const response = await fetch('http://localhost:4000/api/perfil', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: nombre,
          email: esUsuarioGoogle ? undefined : email,
          password: esUsuarioGoogle ? undefined : contraseña,
          descripcion,
          direccion,
          telefono,
          foto: imagePreview,
        }),
      });
      const data = await response.json();
      navigate('/perfil');
      console.log(data);
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* TARJETA PRINCIPAL */}
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-xl overflow-hidden relative">
        {/* 1. BOTÓN DE VOLVER (Esquina superior izquierda como en el dibujo) */}
        <button
          onClick={() => navigate(-1)} // Vuelve atrás
          className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        <div className="p-8 pt-16"> {/* Padding top extra para el botón de volver */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Editar Perfil</h2>
          <form onSubmit={manejarSubmit}
            className="space-y-5"
          >
            {/* 2. CÍRCULO "SUBIR" (Foto de Perfil) */}
            <div className="flex flex-col items-center justify-center mb-6">
              <div className="relative group cursor-pointer">
                {/* La Imagen */}
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100 shadow-sm"
                />
                {/* Overlay "Subir" (Aparece al pasar el mouse o siempre visible) */}
                <label htmlFor="avatar-upload" className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer">
                  {uploading ? 'Subiendo...' : 'Subir'}
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                  disabled={uploading}
                />
                {/* Indicador de carga */}
                {uploading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded-full">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-2">Toca para cambiar foto</p>
            </div>
            {/* 3. LOS CAMPOS DEL FORMULARIO */}
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Cambiar Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Cambiar Descripción</label>
              <textarea
                rows="3"
                placeholder="Cuéntanos sobre ti..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none"
              ></textarea>
            </div>
            {/* --- NUEVOS CAMPOS --- */}
            {/* Dirección */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Dirección</label>
              <input
                type="text"
                placeholder="Calle, Número, Ciudad"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Número de Teléfono</label>
              <input
                type="tel"
                placeholder="+54 9 11 ..."
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* --- SEGURIDAD --- */}
            {/* Solo mostrar Email y Contraseña si NO es usuario de Google */}
            {!esUsuarioGoogle && (
              <>
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Email</label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
                {/* Contraseña */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Nueva Contraseña (opcional)</label>
                  <input
                    type="password"
                    placeholder="Dejar vacío para no cambiar"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </>
            )}

            {/* Mensaje informativo para usuarios de Google */}
            {esUsuarioGoogle && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <p className="text-sm text-blue-800">
                  <strong>Cuenta de Google:</strong> El email y la contraseña se gestionan a través de tu cuenta de Google.
                </p>
              </div>
            )}
            {/* BOTÓN GUARDAR (Necesario para confirmar) */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all mt-4"
            >
              Guardar Cambios
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}