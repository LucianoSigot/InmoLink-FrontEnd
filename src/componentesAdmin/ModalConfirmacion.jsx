export default function ModalConfirmacion({ titulo, mensaje, onConfirmar, onCancelar, textoConfirmar = "Confirmar", variante = "danger" }) {
  const colores = {
    danger: "bg-red-600 hover:bg-red-700",
    warning: "bg-yellow-600 hover:bg-yellow-700",
    success: "bg-green-600 hover:bg-green-700",
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{titulo}</h3>
        <p className="text-sm text-gray-600 mb-6">{mensaje}</p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancelar}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors ${colores[variante]}`}
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
}
