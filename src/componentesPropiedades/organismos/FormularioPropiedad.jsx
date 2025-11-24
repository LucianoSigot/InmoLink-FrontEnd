import React, { useState } from 'react';
import Boton from '../../componentes/Boton';
import { supabase } from '../../supabase/client';
import DatosPrincipales from '../moleculas/DatosPrincipales';
import SelectorServicios from '../moleculas/SelectorServicios';
import GaleriaFotos from '../moleculas/GaleriaFotos';

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

      <DatosPrincipales
        formData={formData}
        handleChange={handleChange}
      />

      <hr className="border-gray-200" />

      <SelectorServicios
        servicios={formData.servicios}
        handleServiceChange={handleServiceChange}
      />

      <hr className="border-gray-200" />

      <GaleriaFotos
        fotos={formData.fotos}
        onUpload={handleFileUpload}
        onRemove={handleRemoveFoto}
        uploading={uploading}
      />

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