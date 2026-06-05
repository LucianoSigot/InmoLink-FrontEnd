import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../componentes/Navbar';
import { getMyReservations, getHostReservations, updateReservationStatus } from '../servicios/reservation.service';

export default function Reserva() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('viajes');
  const [trips, setTrips] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    try {
      const [myTrips, myRequests] = await Promise.all([
        getMyReservations().catch(() => []),
        getHostReservations().catch(() => [])
      ]);
      setTrips(myTrips);
      setRequests(myRequests);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onUpdateStatus = async (id, status) => {
    try {
      await updateReservationStatus(id, status);
      await loadData();
      
      const msg = status === 'activa' ? 'Reserva Aceptada' : 'Reserva Rechazada';
      const notification = document.createElement('div');
      notification.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] font-bold text-sm uppercase tracking-widest animate-bounce";
      notification.innerText = `${msg} ✨`;
      document.body.appendChild(notification);
      setTimeout(() => notification.remove(), 3000);
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (iso) => new Date(iso).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfcfb]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  const pendingCount = requests.filter(r => r.estado === 'pendiente').length;

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Navbar />

      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div>
            <h1 className="text-5xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-2">Gestión de Reservas</h1>
            <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold">Controla tus estancias y aprobaciones</p>
          </div>

          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setActiveTab('viajes')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'viajes' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Mis Viajes
            </button>
            <button 
              onClick={() => setActiveTab('solicitudes')}
              className={`px-8 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all relative ${activeTab === 'solicitudes' ? 'bg-white text-black shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Solicitudes Recibidas
              {pendingCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[8px]">
                  {pendingCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          {activeTab === 'viajes' ? (
            <div className="space-y-10">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2 uppercase tracking-widest text-[12px]">Estancias Próximas</h2>
                <div className="grid gap-4">
                  {trips.filter(r => new Date(r.fechaFin) >= new Date()).length > 0 ? 
                    trips.filter(r => new Date(r.fechaFin) >= new Date()).map(res => (
                      <div key={res._id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition-all">
                        <div className="flex items-center gap-6">
                          <img src={res.propiedadId?.fotos?.[0] || "https://via.placeholder.com/150"} className="w-20 h-20 rounded-2xl object-cover" alt="Casa" />
                          <div>
                            <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">{res.propiedadId?.titulo}</h3>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">{formatDate(res.fechaInicio)} — {formatDate(res.fechaFin)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-widest">Inversión</span>
                            <span className="text-lg font-bold">${res.precioTotal}</span>
                          </div>
                          <span className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                            res.estado === 'activa' ? 'bg-green-50 text-green-700' : 
                            res.estado === 'pendiente' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-400'
                          }`}>
                            {res.estado === 'activa' ? 'Confirmada' : res.estado === 'pendiente' ? 'Pendiente' : res.estado}
                          </span>
                        </div>
                      </div>
                    )) : <p className="text-center py-10 text-gray-400 italic">No tienes viajes planeados.</p>
                  }
                </div>
              </section>

              <section className="opacity-60">
                <h2 className="text-xl font-bold text-gray-500 mb-6 border-b border-gray-100 pb-2 uppercase tracking-widest text-[12px]">Historial de Viajes</h2>
                <div className="grid gap-4 text-sm">
                  {trips.filter(r => new Date(r.fechaFin) < new Date()).map(res => (
                    <div key={res._id} className="bg-gray-50/50 p-4 rounded-2xl flex justify-between items-center border border-gray-100">
                      <span className="font-bold text-gray-600">{res.propiedadId?.titulo}</span>
                      <span className="text-gray-400">{formatDate(res.fechaInicio)}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          ) : (
            <div className="space-y-8">
              <section>
                <h2 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2 uppercase tracking-widest text-[12px]">Solicitudes por Aprobar</h2>
                <div className="grid gap-6">
                  {requests.filter(r => r.estado === 'pendiente').length > 0 ? 
                    requests.filter(r => r.estado === 'pendiente').map(res => (
                      <div key={res._id} className="bg-white p-8 rounded-[2.5rem] shadow-lg border border-blue-50 flex flex-col md:flex-row items-center justify-between gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center gap-6">
                          <div className="h-16 w-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl uppercase shadow-inner">
                            {res.inquilinoId?.name?.[0] || 'U'}
                          </div>
                          <div>
                            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">Nuevo Interesado</span>
                            <h3 className="font-['Cormorant_Garamond'] text-3xl font-bold">{res.inquilinoId?.name}</h3>
                            <p className="text-gray-500 text-sm">Quiere reservar: <span className="font-bold text-gray-900">{res.propiedadId?.titulo}</span></p>
                            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mt-2">
                              {formatDate(res.fechaInicio)} — {formatDate(res.fechaFin)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => onUpdateStatus(res._id, 'rechazada')}
                            className="px-6 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          >
                            Rechazar
                          </button>
                          <button 
                            onClick={() => onUpdateStatus(res._id, 'activa')}
                            className="px-10 py-4 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-gray-800 shadow-xl transform hover:-translate-y-1 transition-all"
                          >
                            Aceptar Alquiler
                          </button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-gray-100">
                        <p className="text-gray-400 font-serif italic text-xl">No hay solicitudes pendientes de aprobación.</p>
                      </div>
                    )
                  }
                </div>
              </section>

              <section className="pt-10">
                <h2 className="text-xl font-bold text-gray-400 mb-6 border-b border-gray-50 pb-2 uppercase tracking-widest text-[12px]">Gestiones Finalizadas</h2>
                <div className="grid gap-4 opacity-70">
                  {requests.filter(r => r.estado !== 'pendiente').map(res => (
                    <div key={res._id} className="bg-white p-5 rounded-3xl border border-gray-50 flex justify-between items-center">
                      <div>
                        <span className="block text-[10px] font-bold uppercase text-gray-300">Inquilino</span>
                        <span className="font-bold text-gray-700">{res.inquilinoId?.name}</span>
                      </div>
                      <span className={`px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-widest ${
                        res.estado === 'activa' ? 'bg-green-50 text-green-600 border border-green-100' : 'bg-gray-50 text-gray-400 border border-gray-100'
                      }`}>
                        {res.estado === 'activa' ? 'Aceptada' : 'Rechazada'}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
