import React, { useState } from 'react';
import Input from '../../componentes/Input'; 
import Boton from '../../componentes/Boton';
import { supabase } from '../../supabase/client'; 

const FormularioPropiedad = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    ubicacion: '',
    precio: '',
    habitaciones: 1,
    servicios: {
        basicos: { wifi: false, agua_caliente: false, aire_acondicionado: false, calefaccion: false, articulos_higiene: false },
        cocina: { cocina: false, microondas: false, heladera: false, horno: false, cafetera: false, utensilios_basicos: false },
        seguridad: { botiquin: false, detector_humo: false, detector_monoxido: false, extintor: false, caja_fuerte: false },
        estacionamiento: { estacionamiento_gratis: false, estacionamiento_paga: false, estacionamiento_cubierto: false },
        entretenimiento: { televisor: false, streaming: false, parlantes: false, juegos_mesa: false },
        accesibilidad: { rampa_acceso: false, ascensor: false, pasillos_anchos: false, banio_adaptado: false }
    },
    fotos: [] 
  });

  // Estado para saber si se está subiendo una foto
  const [uploading, setUploading] = useState(false);

  const formatLabel = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceChange = (categoria, servicio) => {
    setFormData((prev) => ({
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

  //para subir fotos a supabase
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

        setFormData((prev) => ({
            ...prev,
            fotos: [...prev.fotos, data.publicUrl]
        }));

    } catch (error) {
        console.error('Error subiendo imagen:', error.message);
        alert('Error al subir la imagen. Verifica tu conexión o configuración.');
    } finally {
        setUploading(false);
    }
  };

  const handleRemoveFoto = (index) => {
    setFormData((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      
      {/* DATOS PRINCIPALES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <Input name="titulo" required value={formData.titulo} onChange={handleChange} placeholder="Ej: Departamento de Lujo" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ubicación</label>
            <Input name="ubicacion" required value={formData.ubicacion} onChange={handleChange} placeholder="Ej: Av. Principal 123" />
          </div>
          <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
                  <Input type="number" name="precio" required min="0" value={formData.precio} onChange={handleChange} />
              </div>
              <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Habitaciones</label>
                  <Input type="number" name="habitaciones" required min="1" value={formData.habitaciones} onChange={handleChange} />
              </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="h-full flex flex-col">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea 
              name="descripcion" required rows="8" value={formData.descripcion} onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none flex-grow"
              placeholder="Describe las cualidades de tu propiedad..."
            ></textarea>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* SERVICIOS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Servicios y Comodidades</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/*recorre el objeto con map*/}
            {Object.keys(formData.servicios).map((categoria) => (
                <div key={categoria} className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <h4 className="font-bold text-blue-600 mb-3 capitalize border-b border-gray-200 pb-2">{categoria}</h4>
                    <div className="space-y-2">
                        {Object.keys(formData.servicios[categoria]).map((servicio) => (
                            <label key={servicio} className="flex items-center space-x-2 cursor-pointer hover:bg-gray-100 p-1 rounded transition">
                                <input 
                                    type="checkbox" 
                                    checked={formData.servicios[categoria][servicio]}
                                    onChange={() => handleServiceChange(categoria, servicio)}
                                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                />
                                <span className="text-gray-700 text-sm select-none">{formatLabel(servicio)}</span>
                            </label>
                        ))}
                    </div>
                </div>
            ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* PARA SUBIR FOTOS */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Galería de Fotos</h3>
        
        <div className="mb-6">
            <label 
                htmlFor="file-upload"
                className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors
                    ${uploading ? 'bg-gray-100 border-gray-300' : 'border-blue-300 bg-blue-50 hover:bg-blue-100'}
                `}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploading ? (
                        <p className="text-sm text-gray-500 font-bold animate-pulse">Subiendo imagen...</p>
                    ) : (
                        <>
                            <svg className="w-8 h-8 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span></p>
                            <p className="text-xs text-gray-500">PNG, JPG (Máx. 5MB)</p>
                        </>
                    )}
                </div>
                <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileUpload}
                    disabled={uploading}
                />
            </label>
        </div>

        {/* VISTA PREVIA */}
        {formData.fotos.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                {formData.fotos.map((foto, index) => (
                    <div key={index} className="relative group border rounded-lg overflow-hidden h-32 bg-gray-100 shadow-sm">
                        <img src={foto} alt={`Foto ${index}`} className="w-full h-full object-cover" />
                        <button
                            type="button"
                            onClick={() => handleRemoveFoto(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition shadow-md z-10"
                            title="Eliminar foto"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        ) : (
            <p className="text-center text-sm text-gray-400 italic">No hay fotos cargadas aún.</p>
        )}
      </div>

      <div className="flex justify-end pt-6">
        <div className="w-full md:w-1/3">
            <Boton type="submit" disabled={loading || uploading}>
            {loading ? 'Guardando...' : 'Publicar Propiedad'}
            </Boton>
        </div>
      </div>
    </form>
  );
};

export default FormularioPropiedad;