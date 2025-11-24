import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar';
import { useNavigate } from 'react-router-dom';
import Propiedad from '../componentes/Propiedad';

const HomeInmoLink = () => {
  const navigate = useNavigate();

  // 1. ESTADO: Almacenamos las propiedades que vienen del Backend
  const [propiedades, setPropiedades] = useState([]);

  // 2. ESTADO: Almacenamos los valores de los filtros que escribe el usuario
  // Esto debe coincidir con la estructura que espera tu Controlador
  const [filtros, setFiltros] = useState({
    precio: { min: '', max: '' },
    metrosCuadrados: { min: '', max: '' },
    habitaciones: '',
    ambientes: '',
    ordenPrecio: 'asc' // Valor por defecto según tu backend
  });

  // Función para manejar cambios en inputs simples (Habitaciones, Ambientes, Select)
  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  // Función para manejar cambios en objetos anidados (Precio y M2)
  const handleNestedChange = (e, categoria, campo) => {
    setFiltros({
      ...filtros,
      [categoria]: {
        ...filtros[categoria],
        [campo]: e.target.value
      }
    });
  };

  // 3. FUNCIÓN PRINCIPAL: Enviar los datos al Backend
  const aplicarFiltros = async () => {
    try {
      // Preparamos el JSON limpio. Si el usuario dejó campos vacíos, enviamos undefined
      // para que el backend no reciba strings vacíos o ceros no deseados.
      const payload = {
        filtros: {
          precio: {
            min: filtros.precio.min || undefined,
            max: filtros.precio.max || undefined
          },
          metrosCuadrados: {
            min: filtros.metrosCuadrados.min || undefined,
            max: filtros.metrosCuadrados.max || undefined
          },
          // Convertimos a Number si existe valor, sino undefined
          habitaciones: filtros.habitaciones ? Number(filtros.habitaciones) : undefined,
          ambientes: filtros.ambientes ? Number(filtros.ambientes) : undefined,
          ordenPrecio: filtros.ordenPrecio
        }
      };

      console.log("Enviando filtros:", payload);

      const response = await fetch('http://localhost:4000/filtros/properties/filtrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        setPropiedades(data.propiedades); // Guardamos las propiedades recibidas
      } else {
        console.error("Error del servidor:", data.msg);
      }

    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  // 4. USE EFFECT: Cargar propiedades al iniciar la página (sin filtros o con los default)
  useEffect(() => {
    aplicarFiltros();
  }, []); // El array vacío hace que se ejecute solo una vez al montar el componente

  
  // Función para ir al detalle
  const manejarRuta = (id) => {
    // Ajuste: Pasamos el ID si tu ruta de detalle lo soporta
    navigate(`/anuncio/${id}`); 
  }

  return (
    <div className='min-h-screen bg-gray-100'> 
      
      <Navbar>
        <div className="flex w-full max-w-xl mx-auto">
            <input
            type="text"
            className="w-full py-2 px-4 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Buscar propiedades, zonas..."
            />
            <button
            type="button"
            className="px-4 py-2 text-white bg-blue-600 rounded-r-md hover:bg-blue-700 border border-blue-600"
            >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            </button>
        </div>
      </Navbar>

      <div className="container mx-auto p-4 md:p-8">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">
          Inmuebles en Alquiler
        </h1>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* === SIDEBAR (FILTROS) === */}
          <aside className="w-full md:w-1/4 md:min-w-[250px]">
            
            <h2 className="font-bold text-lg mb-4 text-gray-900">Tu búsqueda</h2>
            
            <div className="mb-6">
               <span className="inline-block bg-white border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 mb-2 mr-2 shadow-sm">
                 Alquiler <button className="ml-1 text-gray-400 hover:text-red-500">✕</button>
               </span>
            </div>

             <div className="mb-6">
              <h3 className="font-bold text-gray-800 mb-4">Filtros</h3>
              <hr className="border-gray-200 mb-4" />

              {/* Dormitorios */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Dormitorios</label>
                <input 
                  type="number" 
                  name="habitaciones"
                  value={filtros.habitaciones}
                  onChange={handleChange}
                  placeholder="Cantidad exacta" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Precio (Rango) */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Precio</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={filtros.precio.min}
                    onChange={(e) => handleNestedChange(e, 'precio', 'min')}
                    placeholder="Mín" 
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="number" 
                    value={filtros.precio.max}
                    onChange={(e) => handleNestedChange(e, 'precio', 'max')}
                    placeholder="Máx" 
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

               {/* Ordenar por Precio */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Orden de precio</label>
                <select 
                  name="ordenPrecio"
                  value={filtros.ordenPrecio}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="asc">Precio: Menor a Mayor</option>
                  <option value="desc">Precio: Mayor a Menor</option>
                </select>
              </div>

              {/* Metros Cuadrados */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Metros Cuadrados (m²)</label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={filtros.metrosCuadrados.min}
                    onChange={(e) => handleNestedChange(e, 'metrosCuadrados', 'min')}
                    placeholder="Mín" 
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                  <input 
                    type="number" 
                    value={filtros.metrosCuadrados.max}
                    onChange={(e) => handleNestedChange(e, 'metrosCuadrados', 'max')}
                    placeholder="Máx" 
                    className="w-1/2 border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Ambientes */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-1">Ambientes</label>
                <input 
                  type="number" 
                  name="ambientes"
                  value={filtros.ambientes}
                  onChange={handleChange}
                  placeholder="Cantidad exacta" 
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                />
              </div>
              
              {/* Botón Aplicar */}
              <button 
                onClick={aplicarFiltros}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition text-sm font-medium"
              >
                Aplicar Filtros
              </button>
            </div>
            <hr className="border-gray-200 mb-4" />
          </aside>


          {/* === RESULTADOS === */}
          <main className="w-full md:w-3/4">
            
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-gray-200">
               <span className="text-sm text-gray-600 font-medium">
                 {propiedades.length} resultados
               </span>             
            </div>

            {/* Grilla de Propiedades Dinámica */}
            {propiedades.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {propiedades.map((prop) => (
                  <div 
                    key={prop._id} // Nota: MongoDB usa _id, no id
                    onClick={() => manejarRuta(prop._id)} 
                    className="cursor-pointer transform transition-transform hover:-translate-y-1"
                  >
                    {/* Pasamos 'prop' directamente. Asegúrate que tu componente Propiedad 
                        sepa leer las keys de mongo (ej: prop.precio, prop.titulo) */}
                    <Propiedad propiedad={prop} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 text-gray-500">
                No se encontraron propiedades con estos filtros.
              </div>
            )}

          </main>

        </div>
      </div>
    </div>
  )
}

export default HomeInmoLink;