import React from 'react';
import Input from '../../componentes/Input';
import Label from '../atomos/Label';
import TextArea from '../atomos/TextArea';

const DatosPrincipales = ({ formData, handleChange }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
                <div>
                    <Label>Título</Label>
                    <Input
                        name="titulo"
                        required
                        value={formData.titulo}
                        onChange={handleChange}
                        placeholder="Ej: Departamento de Lujo"
                    />
                </div>
                <div>
                    <Label>Ubicación</Label>
                    <Input
                        name="ubicacion"
                        required
                        value={formData.ubicacion}
                        onChange={handleChange}
                        placeholder="Ej: Av. Principal 123"
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <Label>Precio</Label>
                        <Input
                            type="number"
                            name="precio"
                            required
                            min="0"
                            value={formData.precio}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Habitaciones</Label>
                        <Input
                            type="number"
                            name="habitaciones"
                            required
                            min="1"
                            value={formData.habitaciones}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Label>Tamaño (m<sup>2</sup>)</Label>
                        <Input
                            type="number"
                            name="tamanio"
                            required
                            min="1"
                            value={formData.tamanio}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-4">
                <div className="h-full flex flex-col">
                    <Label>Descripción</Label>
                    <TextArea
                        name="descripcion"
                        required
                        rows="8"
                        value={formData.descripcion}
                        onChange={handleChange}
                        placeholder="Describe las cualidades de tu propiedad..."
                    />
                </div>
            </div>
        </div>
    );
};

export default DatosPrincipales;
