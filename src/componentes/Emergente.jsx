import { useState } from "react";
export const Emergente = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  mensaje,
  onClink2,
  tipo = 'confirmacion',
  cargando = false,
  esUsuarioGoogle = false 
}) => {
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (tipo === 'eliminar' && !esUsuarioGoogle) {
        onConfirm(password); 
    } else {
        onConfirm(); 
    }
  };

  // Para usuarios de Google, no pedir contraseña
  const isDisabled = (tipo === 'eliminar' && !esUsuarioGoogle && password.trim() === '') || cargando;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-96">
        <p className="text-gray-800 mb-4 text-center text-lg font-medium">
          {cargando ? "Procesando..." : mensaje}
        </p>
        
        {/* Campo de contraseña solo para eliminar Y solo para usuarios no-Google */}
        {tipo === 'eliminar' && !esUsuarioGoogle && (
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
              disabled={cargando}
            />
          </div>
        )}
        
        <div className="flex justify-center space-x-6">
          <button
            onClick={onClose}
            disabled={cargando}
            className={`px-8 py-3 border-2 rounded-xl font-semibold transition-all 
                        ${cargando 
                            ? 'text-gray-400 border-gray-200 cursor-not-allowed' 
                            : 'text-gray-700 border-gray-300 hover:bg-gray-50'}`}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            onClick2={onClink2}
            disabled={isDisabled}
            className={`px-8 py-3 text-white rounded-xl font-semibold transition-all 
                        ${isDisabled 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-red-500 hover:bg-red-600'}`}
          >
            {cargando ? "Procesando..." : "Confirmar"}
          </button>
        </div>
      </div>
    </div>
  );
};