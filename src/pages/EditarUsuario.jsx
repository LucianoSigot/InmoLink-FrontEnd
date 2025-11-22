import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EditarUsuario() {
  const navigate = useNavigate();
  // Estado temporal para la previsualización de la imagen
  const [imagePreview, setImagePreview] = useState("https://via.placeholder.com/150");

  // Función simple para simular la carga de imagen (solo visual)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
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
          <form 
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
                  Subir
                </label>
                <input 
                  id="avatar-upload" 
                  type="file" 
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* Descripción */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Cambiar Descripción</label>
              <textarea 
                rows="3"
                placeholder="Cuéntanos sobre ti..." 
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
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* Teléfono */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Número de Teléfono</label>
              <input 
                type="tel" 
                placeholder="+54 9 11 ..." 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* --- SEGURIDAD --- */}
            {/* Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Nueva Contraseña</label>
              <input 
                required
                type="password" 
                placeholder="********" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">Confirmar Contraseña</label>
              <input
                required
                type="password" 
                placeholder="********" 
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            {/* BOTÓN GUARDAR (Necesario para confirmar) */}
            <button 
              type="button" // Cambiar a "submit" cuando tengas la lógica
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