import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verPropiedades } from "../servicios/propiedad.service";
import Propiedad from "../componentes/Propiedad";
import Navbar from "../componentes/Navbar";

export const MisCasas = () => {
    const navigate = useNavigate();
    const [propiedades, setPropiedades] = useState([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        const cargarPropiedades = async () => {
            try {
                const data = await verPropiedades();
                setPropiedades(data);
            } catch (error) {
                console.error("Error al cargar propiedades:", error);
            } finally {
                setCargando(false);
            }
        };
        cargarPropiedades();

    }, []);

    const manejarRuta = (id) => {
        navigate(`/perfil/alquiler/${id}`);
    };

    return (
        <div className="min-h-screen bg-[#fdfcfb]">
            <Navbar />
            
            <div className="container mx-auto px-6 md:px-12 py-12">
                
                {/* ENCABEZADO */}
                <div className="flex items-center justify-between mb-16">
                    <div className="flex items-center">
                        <button
                            onClick={() => navigate(-1)}
                            className="p-3 bg-white luxury-shadow rounded-full text-gray-400 hover:text-black transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                        </button>
                        <h1 className="text-4xl md:text-5xl font-['Cormorant_Garamond'] font-bold text-gray-900 ml-8">Mi Portafolio</h1>
                    </div>
                    
                    <button
                        onClick={() => navigate('/publicar')}
                        className="bg-black text-white px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-800 transition-all transform hover:-translate-y-0.5 luxury-shadow"
                    >
                        + Nueva Propiedad
                    </button>
                </div>

                {cargando ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
                    </div>
                ) : propiedades.length === 0 ? (
                    <div className="text-center py-24 bg-white rounded-[3rem] luxury-shadow border border-gray-50 max-w-4xl mx-auto">
                        <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                        </div>
                        <h3 className="text-2xl font-['Cormorant_Garamond'] text-gray-900 mb-2">Su portafolio está vacío</h3>
                        <p className="text-gray-400 text-xs font-light tracking-widest uppercase mb-8">Comience a publicar sus activos inmobiliarios hoy mismo</p>
                        <button
                            onClick={() => navigate('/publicar')}
                            className="px-10 py-4 gold-gradient text-black rounded-full text-[10px] font-bold uppercase tracking-widest hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                        >
                            Publicar Residencia
                        </button>
                    </div>
                ) : (
                    <div className="space-y-10">
                        <div className="flex items-center gap-4">
                            <span className="h-px bg-gray-100 flex-1"></span>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-300">Galería de Activos</span>
                            <span className="h-px bg-gray-100 flex-1"></span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                            {propiedades.map((prop) => (
                                <div
                                    key={prop._id}
                                    className="cursor-pointer"
                                    onClick={() => manejarRuta(prop._id)}
                                >
                                    <Propiedad propiedad={prop} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MisCasas;