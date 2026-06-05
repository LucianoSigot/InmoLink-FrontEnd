import React from 'react';
import SectionTitle from '../atomos/SectionTitle';
import UploadBox from '../atomos/UploadBox';
import PhotoCard from '../atomos/PhotoCard';

const GaleriaFotos = ({ fotos, onUpload, onRemove, uploading }) => {
    return (
        <div>
            <SectionTitle>Galería de Fotos</SectionTitle>

            <div className="mb-6">
                <UploadBox uploading={uploading} onChange={onUpload} />
            </div>

            {/* VISTA PREVIA */}
            {fotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in">
                    {fotos.map((foto, index) => (
                        <PhotoCard
                            key={index}
                            index={index}
                            src={foto}
                            onRemove={onRemove}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center text-sm text-gray-400 italic">No hay fotos cargadas aún.</p>
            )}
        </div>
    );
};

export default GaleriaFotos;
