import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../componentes/Navbar'
import { verPropiedades, obtenerPropiedad } from '../servicios/propiedad.service'
import { getUserProfile } from '../servicios/auth.service'
import { createReservation, getReservationsByProperty } from '../servicios/reservation.service'
import Mapa from '../componentesPropiedades/moleculas/Mapa'
import CalendarioReserva from '../componentesPropiedades/moleculas/CalendarioReserva'
import ModalPago from '../componentesPropiedades/moleculas/ModalPago'

export default function Alquilo() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [data, setData] = useState(null);
  const [occupiedDates, setOccupiedDates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [reserving, setReserving] = useState(false);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [showPayment, setShowPayment] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const currentUser = await getUserProfile();
        setUser(currentUser);

        if (id) {
          const [propertyData, reservations] = await Promise.all([
            obtenerPropiedad(id),
            getReservationsByProperty(id)
          ]);
          setData(propertyData);
          // Solo bloqueamos las fechas que están 'activa' (aprobadas)
          setOccupiedDates(reservations.filter(r => r.estado === 'activa'));
        } else {
          const list = await verPropiedades();
          setItems(list);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
    </div>
  );

  const item = data || (items.length > 0 ? items[items.length - 1] : null);

  if (!item) return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <p className="text-lg">No se encontró la propiedad.</p>
    </div>
  );

  const nights = (() => {
    if (!startDate || !endDate) return 0;
    const diff = Math.abs(new Date(endDate) - new Date(startDate));
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  })();

  const subtotal = nights * (item?.precio || 0);
  const fees = 70;
  const total = subtotal + fees;

  const onDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
    setStatus({ type: '', text: '' });
  };

  const handleBookingStart = () => {
    if (!startDate || !endDate) {
      setStatus({ type: 'error', text: 'Selecciona las fechas en el calendario' });
      return;
    }
    setShowPayment(true);
  };

  const onConfirmPayment = async (paymentData) => {
    try {
      setShowPayment(false);
      setReserving(true);
      await createReservation({
        propiedadId: item._id,
        fechaInicio: startDate,
        fechaFin: endDate,
        precioTotal: total
      });

      setStatus({ type: 'success', text: '¡Reserva solicitada con éxito! Esperando aprobación del dueño.' });
      
      // Notificación de éxito elegante
      const notification = document.createElement('div');
      notification.className = "fixed bottom-10 left-1/2 -translate-x-1/2 bg-black text-white px-8 py-4 rounded-2xl shadow-2xl z-[200] font-bold text-sm uppercase tracking-widest animate-bounce";
      notification.innerText = "¡Pago procesado y reserva enviada! ✨";
      document.body.appendChild(notification);

      setTimeout(() => {
        notification.remove();
        navigate('/perfil/reserva');
      }, 3000);
      
    } catch (err) {
      setStatus({ type: 'error', text: err.message });
      setReserving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfcfb]">
      <Navbar />

      <div className="container mx-auto px-6 pt-10 pb-6 flex justify-between items-center">
        <button onClick={() => navigate(-1)} className="p-3 bg-white rounded-full shadow-sm hover:bg-gray-50 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        {user && String(item?.propietarioId) === String(user.id) && (
          <button
            onClick={() => navigate("/anuncio/editar-publicacion", { state: { propiedadId: item?._id } })}
            className="bg-white text-black px-6 py-2.5 rounded-full shadow-sm hover:bg-gray-50 font-bold text-[10px] uppercase tracking-widest transition-all"
          >
            Editar Residencia
          </button>
        )}
      </div>

      <div className="container mx-auto px-6 pb-20">
        <div className="h-[70vh] rounded-[3rem] overflow-hidden mb-12 shadow-xl">
          <img
            src={item?.fotos?.[0] || "https://via.placeholder.com/1200x800"}
            className="w-full h-full object-cover"
            alt="Propiedad"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
              <h1 className="text-5xl md:text-6xl font-['Cormorant_Garamond'] text-gray-900 mb-4">{item.titulo}</h1>
              <p className="text-gray-400 font-light tracking-widest text-[10px] uppercase flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {item.ubicacion}
              </p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
              <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-6">Descripción</h3>
              <p className="text-gray-500 leading-relaxed italic text-lg">{item.descripcion}</p>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
              <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-8 uppercase tracking-widest text-sm">Disponibilidad</h3>
              <CalendarioReserva 
                startDate={startDate} 
                endDate={endDate} 
                onDateChange={onDateChange} 
                occupiedDates={occupiedDates}
              />
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-50">
              <h3 className="text-2xl font-['Cormorant_Garamond'] font-bold text-gray-900 mb-8 uppercase tracking-widest text-sm">Ubicación Exacta</h3>
              <Mapa coordenadas={item.coordenadas} interactive={false} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50 sticky top-28">
              <div className="text-center mb-10">
                <span className="text-4xl font-['Cormorant_Garamond'] font-bold">${item.precio}</span>
                <span className="text-gray-400 text-[10px] uppercase tracking-widest ml-2"> / noche</span>
              </div>

              {status.text && (
                <div className={`mb-6 p-4 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-center ${status.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {status.text}
                </div>
              )}

              <button
                onClick={handleBookingStart}
                disabled={reserving || !startDate || !endDate}
                className="w-full bg-black text-white font-bold text-[10px] uppercase tracking-[0.2em] py-5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-30"
              >
                {reserving ? 'Procesando...' : 'Confirmar Reserva'}
              </button>

              <div className="mt-8 pt-8 border-t border-gray-50 space-y-4 text-[10px] font-bold uppercase tracking-widest">
                {nights > 0 ? (
                  <>
                    <div className="flex justify-between">
                      <span>{nights} noches seleccionadas</span>
                      <span className="text-gray-900">${subtotal}</span>
                    </div>
                    <div className="flex justify-between text-black text-xs pt-4 border-t border-gray-50">
                      <span>Inversión Total</span>
                      <span className="font-bold">${total}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-center lowercase italic font-light">Selecciona tus fechas en el calendario para calcular el total</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <ModalPago 
          total={total} 
          userCards={user?.tarjetas || []} 
          onClose={() => setShowPayment(false)}
          onConfirm={onConfirmPayment}
        />
      )}
    </div>
  );
}
