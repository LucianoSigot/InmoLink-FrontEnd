import React, { useState, useEffect } from 'react'
import Navbar from '../componentes/Navbar'
import { useNavigate, useLocation } from 'react-router-dom'
import { obtenerPropiedad, editarPropiedades } from '../servicios/propiedad.service'
import SelectorServicios from '../componentesPropiedades/moleculas/SelectorServicios'
import GaleriaFotos from '../componentesPropiedades/moleculas/GaleriaFotos'
import { supabase } from '../supabase/client'
import Mapa from '../componentesPropiedades/moleculas/Mapa'

const EditarPublicacion = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const propiedadId = location.state?.propiedadId;

  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const cargarPropiedad = async () => {
      if (!propiedadId) {
        setError('No se proporcionó ID de propiedad');
        setLoading(false);
        return;
      }

      try {
        const data = await obtenerPropiedad(propiedadId);
        setPropiedad(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    cargarPropiedad();
  }, [propiedadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropiedad(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (categoria, servicio) => {
    setPropiedad((prev) => ({
      ...prev,
      servicios: {
        ...prev.servicios,
        [categoria]: {
          ...prev.servicios[categoria],
          [servicio]: !prev.servicios[categoria][servicio]
        }
      }
    }));
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('propiedades')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('propiedades')
        .getPublicUrl(filePath);

      setPropiedad((prev) => ({
        ...prev,
        fotos: [...(prev.fotos || []), data.publicUrl]
      }));

    } catch (error) {
      console.error('Error subiendo imagen:', error.message);
      alert('Error al subir la imagen. Verifica tu conexión o configuración.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFoto = (index) => {
    setPropiedad((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const handleLocationChange = (e) => {
    setPropiedad((prev) => ({
      ...prev,
      coordenadas: { lat: e.latlng.lat, lng: e.latlng.lng }
    }));
  };

  const handleEditarPropiedad = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await editarPropiedades(propiedadId, propiedad);
      
      // --- CORRECCIÓN AQUÍ ---
      // Antes: navigate('/perfil/alquilo'); -> Esto te llevaba a la lista general.
      // Ahora: Te lleva al detalle específico de la propiedad recién editada.
      navigate(`/perfil/alquiler/${propiedadId}`);
      
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-lg">Cargando propiedad...</p>
      </div>
    );
  }

  if (error || !propiedad) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            <p className="font-bold">Error</p>
            <p>{error || 'No se pudo cargar la propiedad'}</p>
          </div>
          <button
            onClick={() => navigate('/perfil/mis-casas')} // Ajustado para volver a tu lista correcta
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      {/* CONTENEDOR PRINCIPAL */}
      <div className="container mx-auto p-4 md:p-8">

        {/* ENCABEZADO: Botón Volver */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-200 transition-colors text-gray-600"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <h1 className="text-2xl font-bold text-gray-800 ml-4">Editar Publicación</h1>
        </div>

        {/* TARJETA DE EDICIÓN */}
        <div className="bg-white w-full max-w-5xl mx-auto rounded-3xl shadow-xl overflow-hidden p-6 md:p-10">

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r shadow-sm">
              <p className="font-bold">Error</p>
              <p>{error}</p>
            </div>
          )}

          <form onSubmit={handleEditarPropiedad} className="space-y-8">

            {/* 1. GALERÍA DE FOTOS */}
            <GaleriaFotos
              fotos={propiedad.fotos || []}
              onUpload={handleFileUpload}
              onRemove={handleRemoveFoto}
              uploading={uploading}
            />

            {/* GRID DE DATOS PRINCIPALES */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* COLUMNA IZQUIERDA */}
              <div className="space-y-6">
                {/* Título */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Título del anuncio</label>
                  <input
                    type="text"
                    name="titulo"
                    value={propiedad.titulo || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                {/* Precio */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Precio por noche</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">$</span>
                    <input
                      type="number"
                      name="precio"
                      value={propiedad.precio || ''}
                      onChange={handleChange}
                      className="w-full pl-8 px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Ubicación */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Ubicación</label>
                  <input
                    type="text"
                    name="ubicacion"
                    value={propiedad.ubicacion || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>

                {/* Habitaciones */}
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Habitaciones</label>
                  <input
                    type="number"
                    name="habitaciones"
                    value={propiedad.habitaciones || 1}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                </div>
              </div>

              {/* COLUMNA DERECHA */}
              <div className="space-y-6">
                {/* Descripción */}
                <div className="h-full flex flex-col">
                  <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Descripción</label>
                  <textarea
                    name="descripcion"
                    value={propiedad.descripcion || ''}
                    onChange={handleChange}
                    rows="12"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none flex-grow"
                  ></textarea>
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />


            {/* 3. SERVICIOS */}
            {propiedad.servicios && (
              <SelectorServicios
                servicios={propiedad.servicios}
                handleServiceChange={handleServiceChange}
              />
            )}

            {/* mapa */}
            {propiedad.coordenadas && (
              <Mapa
                coordenadas={propiedad.coordenadas}
                handleLocationChange={handleLocationChange}
              />
            )}

            {/* BOTONES DE ACCIÓN */}
            <div className="flex flex-col-reverse md:flex-row gap-4 pt-6">

              {/* Cancelar */}
              <button
                type="button"
                onClick={() => navigate(-1)} // Mejor volver atrás que a una ruta fija
                className="w-full md:w-1/3 py-4 px-6 rounded-2xl border-2 border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
              >
                Cancelar
              </button>

              {/* Guardar */}
              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full md:w-2/3 bg-blue-600 text-white font-bold text-lg py-4 px-6 rounded-2xl hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading || uploading ? 'Guardando...' : 'Guardar Cambios'}
              </button>

            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default EditarPublicacion