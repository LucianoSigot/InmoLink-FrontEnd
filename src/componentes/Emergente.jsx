// components/Emergente.jsx
import React, { useState } from 'react';

const Emergente = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  mensaje,
  tipo = 'confirmacion'
}) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    setPassword('');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        <p className="text-gray-800 mb-4 text-center text-lg font-medium">{mensaje}</p>
        
        {/* Campo de contraseña solo para eliminar */}
        {tipo === 'eliminar' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirma tu contraseña:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder="Ingresa tu contraseña"
            />
          </div>
        )}
        
        <div className="flex justify-center space-x-6">
          <button
            onClick={onClose}
            className="px-8 py-3 text-gray-700 border-2 border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-8 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-all"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Emergente;