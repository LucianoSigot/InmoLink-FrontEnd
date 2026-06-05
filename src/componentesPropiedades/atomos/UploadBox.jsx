import React from 'react';

const UploadBox = ({ uploading, onChange, className = '' }) => {
    return (
        <label
            htmlFor="file-upload"
            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-xl cursor-pointer transition-colors
        ${uploading ? 'bg-gray-100 border-gray-300' : 'border-blue-300 bg-blue-50 hover:bg-blue-100'}
        ${className}
      `}
        >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                    <p className="text-sm text-gray-500 font-bold animate-pulse">Subiendo imagen...</p>
                ) : (
                    <>
                        <svg className="w-8 h-8 mb-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haz clic para subir</span></p>
                        <p className="text-xs text-gray-500">PNG, JPG (Máx. 5MB)</p>
                    </>
                )}
            </div>
            <input
                id="file-upload"
                type="file"
                className="hidden"
                accept="image/*"
                onChange={onChange}
                disabled={uploading}
            />
        </label>
    );
};

export default UploadBox;
