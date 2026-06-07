import { useState, useEffect } from "react";

export default function ModalEditarPropiedad({ propiedadId, onGuardar, onCancelar }) {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/admin/properties/${propiedadId}`, { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setForm({
          titulo: data.titulo || "",
          descripcion: data.descripcion || "",
          tamanio: data.tamanio || "",
          ubicacion: data.ubicacion || "",
          precio: data.precio || "",
          habitaciones: data.habitaciones || "",
          ambientes: data.ambientes || "",
          estado: data.estado || "pendiente",
        });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [propiedadId]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onGuardar(propiedadId, {
      ...form,
      tamanio: Number(form.tamanio),
      precio: Number(form.precio),
      habitaciones: Number(form.habitaciones),
      ambientes: Number(form.ambientes),
    });
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
          <p className="text-red-500 text-center">Error al cargar la propiedad</p>
          <button onClick={onCancelar} className="mt-4 w-full px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">Cerrar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onCancelar} />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 rounded-t-2xl">
          <h3 className="text-lg font-bold text-gray-900">Editar Propiedad</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Título</label>
              <input name="titulo" value={form.titulo} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Descripción</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required rows={3} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 resize-none" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Ubicación</label>
              <input name="ubicacion" value={form.ubicacion} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Precio ($/mes)</label>
              <input name="precio" type="number" value={form.precio} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Tamaño (m²)</label>
              <input name="tamanio" type="number" value={form.tamanio} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Habitaciones</label>
              <input name="habitaciones" type="number" value={form.habitaciones} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Ambientes</label>
              <input name="ambientes" type="number" value={form.ambientes} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">Estado</label>
              <select name="estado" value={form.estado} onChange={handleChange} className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-black/10">
                <option value="pendiente">Pendiente</option>
                <option value="activa">Activa</option>
                <option value="pausada">Pausada</option>
                <option value="rechazada">Rechazada</option>
              </select>
            </div>
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
