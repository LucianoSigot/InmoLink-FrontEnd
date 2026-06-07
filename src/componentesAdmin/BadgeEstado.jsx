const colores = {
  pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
  activa: "bg-green-100 text-green-800 border-green-200",
  pausada: "bg-gray-100 text-gray-800 border-gray-200",
  rechazada: "bg-red-100 text-red-800 border-red-200",
};

const labels = {
  pendiente: "Pendiente",
  activa: "Activa",
  pausada: "Pausada",
  rechazada: "Rechazada",
  usuario: "Usuario",
  admin: "Admin",
};

export default function BadgeEstado({ estado }) {
  const color = colores[estado] || "bg-gray-100 text-gray-600 border-gray-200";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {labels[estado] || estado}
    </span>
  );
}
