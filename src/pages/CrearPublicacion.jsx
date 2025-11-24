import React, { useState } from 'react';
import Navbar from '../componentes/Navbar';
import { useNavigate } from 'react-router-dom';
import FormularioPropiedad from '../componentesPropiedades/organismos/FormularioPropiedad';

const CrearPublicacion = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreate = async (formData) => {
    setLoading(true);
    setError('');

    //para el token
    const token = localStorage.getItem('token');

    if (!token) {
      setError("No estás autenticado. Por favor inicia sesión nuevamente.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },

        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || 'Error al crear la publicación');
      }

      //creacion exitosa
      navigate('/perfil/alquilo');

    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">

        {/* boton volver */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm text-gray-600 hover:bg-gray-200 transition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Crear Nueva Publicación</h1>
        </div>

        {/* tarjeta del Formulario */}
        <div className="bg-white w-full max-w-4xl mx-auto rounded-3xl shadow-xl overflow-hidden p-6 md:p-10">

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r shadow-sm">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <FormularioPropiedad onSubmit={handleCreate} loading={loading} />

        </div>
      </div>
    </div>
  );
};

export default CrearPublicacion;