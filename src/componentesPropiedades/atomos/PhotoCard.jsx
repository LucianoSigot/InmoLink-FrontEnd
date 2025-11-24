import React from 'react';

const PhotoCard = ({ src, onRemove, index, className = '' }) => {
    return (
        <div className={`relative group border rounded-lg overflow-hidden h-32 bg-gray-100 shadow-sm ${className}`}>
            <img src={src} alt={`Foto ${index}`} className="w-full h-full object-cover" />
            <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-80 hover:opacity-100 transition shadow-md z-10"
                title="Eliminar foto"
            >
                ×
            </button>
        </div>
    );
};

export default PhotoCard;
