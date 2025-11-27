import React, { useState, useEffect } from 'react';
import Navbar from '../componentes/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
import Propiedad from '../componentes/Propiedad.jsx';

const HomeInmoLink = () => {
  const navigate = useNavigate();
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Estados para paginación
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  
  const [filtros, setFiltros] = useState({
    busqueda: '', 
    precio: { min: '', max: '' },
    metrosCuadrados: { min: '', max: '' },
    habitaciones: '',
    ambientes: '',
    ordenPrecio: 'asc'
  });

  const handleChange = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value });
  const handleNestedChange = (e, categoria, campo) => setFiltros({ ...filtros, [categoria]: { ...filtros[categoria], [campo]: e.target.value } });
  const handleKeyDown = (e) => { if (e.key === 'Enter') aplicarFiltros(1); };

  const aplicarFiltros = async (pagina = 1) => {
    setLoading(true);
    try {
      const payload = {
        filtros: {
          busqueda: filtros.busqueda,
          precio: { min: filtros.precio.min || undefined, max: filtros.precio.max || undefined },
          metrosCuadrados: { min: filtros.metrosCuadrados.min || undefined, max: filtros.metrosCuadrados.max || undefined },
          habitaciones: filtros.habitaciones ? Number(filtros.habitaciones) : undefined,
          ambientes: filtros.ambientes ? Number(filtros.ambientes) : undefined,
          ordenPrecio: filtros.ordenPrecio
        },
        pagina: pagina,
        limite: 21
      };
      const response = await fetch('http://localhost:4000/filtros/properties/filtrar', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (data.success) {
        setPropiedades(data.propiedades);
        setTotalPaginas(data.totalPaginas);
        setPaginaActual(data.pagina);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  useEffect(() => { aplicarFiltros(1); }, []);

  const manejarRuta = (propiedad) => {
    navigate(`/perfil/alquiler/${propiedad._id}`, { state: { propiedad } });
  }

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      aplicarFiltros(nuevaPagina);
    }
  };

  // --- LÓGICA ESTÉTICA PARA GENERAR NÚMEROS DE PÁGINA ---
  // Esto evita que se muestren 100 botones si hay 100 páginas.
  // Muestra: Primera, Última, Actual y sus vecinas.
  const obtenerNumerosPaginacion = () => {
    const delta = 1; // Cuántas páginas mostrar a los lados de la actual
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPaginas; i++) {
      if (i === 1 || i === totalPaginas || (i >= paginaActual - delta && i <= paginaActual + delta)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  };

  return (
    <div className='min-h-screen bg-gray-50 font-sans'> 
      <Navbar>
        <div className="flex w-full max-w-xl mx-auto">
            <input type="text" name="busqueda" value={filtros.busqueda} onChange={handleChange} onKeyDown={handleKeyDown} className="w-full py-2 px-4 border border-gray-200 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm" placeholder="Buscar por zona, título..." />
            <button type="button" onClick={() => aplicarFiltros(1)} className="px-6 py-2 text-white bg-blue-600 rounded-r-full hover:bg-blue-700 transition-colors shadow-sm font-medium">
              Buscar
            </button>
        </div>
      </Navbar>

      <div className="container mx-auto p-4 md:p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 tracking-tight">Inmuebles en Alquiler</h1>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* BARRA LATERAL (Filtros) */}
          <aside className="w-full md:w-1/4 md:min-w-[280px]">
             <div className="sticky top-4 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-bold text-xl text-gray-800 mb-6 flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                  Filtros
                </h3>
                
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Dormitorios</label>
                    <input type="number" name="habitaciones" value={filtros.habitaciones} onChange={handleChange} className="w-full border-gray-300 border p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all" placeholder="Ej: 2" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Precio</label>
                    <div className="flex gap-3">
                      <input type="number" value={filtros.precio.min} onChange={(e) => handleNestedChange(e, 'precio', 'min')} className="w-1/2 border-gray-300 border p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm" placeholder="Min" />
                      <input type="number" value={filtros.precio.max} onChange={(e) => handleNestedChange(e, 'precio', 'max')} className="w-1/2 border-gray-300 border p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm" placeholder="Max" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Metros (m²)</label>
                    <div className="flex gap-3">
                      <input type="number" value={filtros.metrosCuadrados.min} onChange={(e) => handleNestedChange(e, 'metrosCuadrados', 'min')} className="w-1/2 border-gray-300 border p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm" placeholder="Min" />
                      <input type="number" value={filtros.metrosCuadrados.max} onChange={(e) => handleNestedChange(e, 'metrosCuadrados', 'max')} className="w-1/2 border-gray-300 border p-2.5 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none text-sm" placeholder="Max" />
                    </div>
                  </div>

                  <div>
                     <label className="block text-sm font-semibold text-gray-700 mb-2">Orden</label>
                     <select name="ordenPrecio" value={filtros.ordenPrecio} onChange={handleChange} className="w-full border-gray-300 border p-2.5 rounded-xl bg-white focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none cursor-pointer">
                       <option value="asc">Menor Precio</option>
                       <option value="desc">Mayor Precio</option>
                     </select>
                  </div>
                </div>

                <button onClick={() => aplicarFiltros(1)} className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-md hover:shadow-lg transform transition-all active:scale-95">
                  {loading ? 'Filtrando...' : 'Aplicar Filtros'}
                </button>
             </div>
          </aside>

          {/* CONTENIDO PRINCIPAL */}
          <main className="w-full md:w-3/4">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
               <span className="text-gray-500 font-medium">
                 Mostrando <span className="text-gray-900 font-bold">{propiedades.length}</span> resultados
               </span>
               <span className="text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                 Página {paginaActual} de {totalPaginas}
               </span>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
              </div>
            ) : propiedades.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {propiedades.map((prop) => (
                    <div key={prop._id} onClick={() => manejarRuta(prop)} className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl rounded-2xl">
                      <Propiedad propiedad={prop} />
                    </div>
                  ))}
                </div>

                {/* --- PAGINACIÓN ESTÉTICA --- */}
                <div className="flex justify-center items-center mt-12 gap-2 select-none">
                  
                  {/* Botón Anterior */}
                  <button 
                    onClick={() => cambiarPagina(paginaActual - 1)} 
                    disabled={paginaActual === 1}
                    className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                      paginaActual === 1 
                        ? 'text-gray-300 cursor-not-allowed bg-transparent' 
                        : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md border border-transparent hover:border-gray-200 bg-white shadow-sm'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                  </button>

                  {/* Números Dinámicos */}
                  <div className="flex gap-2 bg-gray-100 p-1 rounded-full shadow-inner">
                    {obtenerNumerosPaginacion().map((num, index) => (
                      num === '...' ? (
                        <span key={index} className="h-8 w-8 flex items-center justify-center text-gray-400 font-bold">...</span>
                      ) : (
                        <button
                          key={index}
                          onClick={() => cambiarPagina(num)}
                          className={`h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold transition-all duration-200 ${
                            paginaActual === num 
                              ? 'bg-white text-blue-600 shadow-md scale-105' 
                              : 'text-gray-500 hover:bg-gray-200 hover:text-gray-800'
                          }`}
                        >
                          {num}
                        </button>
                      )
                    ))}
                  </div>

                  {/* Botón Siguiente */}
                  <button 
                    onClick={() => cambiarPagina(paginaActual + 1)} 
                    disabled={paginaActual === totalPaginas}
                    className={`h-10 w-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                      paginaActual === totalPaginas 
                        ? 'text-gray-300 cursor-not-allowed bg-transparent' 
                        : 'text-gray-600 hover:bg-white hover:text-blue-600 hover:shadow-md border border-transparent hover:border-gray-200 bg-white shadow-sm'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                {/* --------------------------- */}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500 bg-white rounded-2xl shadow-sm border border-gray-100">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-lg font-medium">No encontramos propiedades.</p>
                <p className="text-sm">Intenta ajustar tus filtros de búsqueda.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
export default HomeInmoLink;