import { useState, useEffect } from "react";

export default function ModalEditarUsuario({ usuarioId, onGuardar, onCancelar }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/admin/users/${usuarioId}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        const u = data.user;
        setForm({
          name: u.name || "",
          email: u.email || "",
          telefono: u.telefono || "",
          direccion: u.direccion || "",
          descripcion: u.descripcion || "",
          rol: u.rol || "usuario",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [usuarioId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onGuardar(usuarioId, form);
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4">
          <p className="text-gray-500 text-center">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
        <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-lg mx-4">
          <p className="text-red-500 text-center">Error al cargar el usuario</p>
          <button onClick={onCancelar} className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-900">Editar Usuario</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Nombre</label>
            <input name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Email</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Dirección</label>
            <input name="direccion" value={form.direccion} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Descripción</label>
            <textarea name="descripcion" value={form.descripcion} onChange={handleChange} rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Rol</label>
            <select name="rol" value={form.rol} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10">
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button type="button" onClick={onCancelar} className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50">
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
