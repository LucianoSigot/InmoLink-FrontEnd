import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { verPropiedades } from "../servicios/propiedad.service";
import Propiedad from "../componentes/Propiedad";
import Navbar from "../componentes/Navbar";

export const misCasas = () => {
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
        navigate(`/perfil/alquilo/${id}`);
    };

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
        </div>
            
            <div className="container mx-auto p-4 md:p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Propiedades en Alquiler</h1>

                {cargando ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                ) : propiedades.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg shadow">
                        <p className="text-gray-500 text-lg">No tienes propiedades publicadas aún.</p>
                        <button
                            onClick={() => navigate('/crear-publicacion')}
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Publicar mi primera propiedad
                        </button>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-700 mb-4">Galería de Propiedades</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {propiedades.map((prop) => (
                                <div
                                    key={prop._id}
                                    className="cursor-pointer transform transition-transform hover:-translate-y-1"
                                    onClick={() => manejarRuta(prop._id)}
                                >
                                    <Propiedad
                                        propiedad={{
                                            ...prop,
                                            imagenUrl: prop.fotos && prop.fotos.length > 0 ? prop.fotos[0] : undefined,
                                            precio: `$${prop.precio}`,
                                            habitaciones: prop.habitaciones,
                                            banios: 0,
                                            superficie: 0
                                        }}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default misCasas;