import React from 'react';
import SubSectionTitle from '../atomos/SubSectionTitle';
import Checkbox from '../atomos/Checkbox';

const GrupoServicios = ({ categoria, servicios, handleServiceChange, formatLabel }) => {
    return (
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
            <SubSectionTitle>{categoria}</SubSectionTitle>
            <div className="space-y-2">
                {Object.keys(servicios).map((servicio) => (
                    <Checkbox
                        key={servicio}
                        label={formatLabel(servicio)}
                        checked={servicios[servicio]}
                        onChange={() => handleServiceChange(categoria, servicio)}
                    />
                ))}
            </div>
        </div>
    );
};

export default GrupoServicios;
