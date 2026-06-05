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
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[100] transition-all">
      <div className="bg-white rounded-[2.5rem] luxury-shadow p-12 w-full max-w-md border border-gray-50 transform transition-all scale-100">
        <p className="text-gray-900 mb-8 text-center text-3xl font-['Cormorant_Garamond'] font-bold leading-tight">
          {cargando ? "Procesando su solicitud..." : mensaje}
        </p>
        
        {/* Campo de contraseña solo para eliminar Y solo para usuarios no-Google */}
        {tipo === 'eliminar' && !esUsuarioGoogle && (
          <div className="mb-8">
            <label className="block text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-3 text-center">
              Confirmación de Seguridad
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black/5 outline-none transition-all text-center font-bold text-sm"
              placeholder="Ingrese su contraseña"
              disabled={cargando}
            />
          </div>
        )}
        
        <div className="flex flex-col space-y-4">
          <button
            onClick={handleConfirm}
            disabled={isDisabled}
            className={`w-full py-4 text-white rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all luxury-shadow
                        ${isDisabled 
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                            : 'bg-black hover:bg-gray-800 transform hover:-translate-y-0.5'}`}
          >
            {cargando ? "Por favor espere..." : "Confirmar Acción"}
          </button>
          
          <button
            onClick={onClose}
            disabled={cargando}
            className={`w-full py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all border border-transparent
                        ${cargando 
                            ? 'text-gray-300 cursor-not-allowed' 
                            : 'text-gray-400 hover:text-black hover:bg-gray-50'}`}
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};