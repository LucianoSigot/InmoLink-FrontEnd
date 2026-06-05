import React from 'react';
import SectionTitle from '../atomos/SectionTitle';
import GrupoServicios from './GrupoServicios';

const SelectorServicios = ({ servicios, handleServiceChange }) => {
    const formatLabel = (str) => str.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    return (
        <div>
            <SectionTitle>Servicios y Comodidades</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.keys(servicios).map((categoria) => (
                    <GrupoServicios
                        key={categoria}
                        categoria={categoria}
                        servicios={servicios[categoria]}
                        handleServiceChange={handleServiceChange}
                        formatLabel={formatLabel}
                    />
                ))}
            </div>
        </div>
    );
};

export default SelectorServicios;
