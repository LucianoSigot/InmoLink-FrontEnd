import React, { useState } from 'react';

export default function ModalPago({ total, userCards = [], onConfirm, onClose }) {
  const [method, setMethod] = useState(userCards.length > 0 ? 'saved' : 'new');
  const [selectedCard, setSelectedCard] = useState(userCards[0]?._id || '');
  const [cardData, setCardData] = useState({ name: '', number: '', expiry: '', cvc: '' });
  const [processing, setProcessing] = useState(false);

  const handlePay = async (e) => {
    e.preventDefault();
    setProcessing(true);
    // Simulamos un delay de procesamiento
    setTimeout(() => {
      onConfirm(method === 'saved' ? selectedCard : cardData);
      setProcessing(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in duration-300">
        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
          <h3 className="font-['Cormorant_Garamond'] text-2xl font-bold">Finalizar Reserva</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handlePay} className="p-8 space-y-6">
          <div className="bg-gray-50 p-6 rounded-3xl mb-4">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Total a Invertir</span>
            <span className="text-3xl font-['Cormorant_Garamond'] font-bold text-gray-900">${total}</span>
          </div>

          <div className="flex gap-4 mb-6">
            {userCards.length > 0 && (
              <button 
                type="button"
                onClick={() => setMethod('saved')}
                className={`flex-1 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${method === 'saved' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}
              >
                Tarjetas Guardadas
              </button>
            )}
            <button 
              type="button"
              onClick={() => setMethod('new')}
              className={`flex-1 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest border transition-all ${method === 'new' ? 'bg-black text-white border-black' : 'bg-white text-gray-400 border-gray-100'}`}
            >
              Nueva Tarjeta
            </button>
          </div>

          {method === 'saved' ? (
            <div className="space-y-3">
              {userCards.map(card => (
                <label key={card._id} className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedCard === card._id ? 'border-black bg-gray-50' : 'border-gray-100'}`}>
                  <div className="flex items-center gap-4">
                    <input type="radio" checked={selectedCard === card._id} onChange={() => setSelectedCard(card._id)} className="accent-black" />
                    <div>
                      <span className="block text-sm font-bold">{card.brand} **** {card.numeroFinal}</span>
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">{card.nombreTitular}</span>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Titular de la tarjeta</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all text-sm" placeholder="Como figura en la tarjeta" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value})} />
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Número de tarjeta</label>
                <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all text-sm" placeholder="0000 0000 0000 0000" value={cardData.number} onChange={e => setCardData({...cardData, number: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">Vencimiento</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all text-sm" placeholder="MM/YY" value={cardData.expiry} onChange={e => setCardData({...cardData, expiry: e.target.value})} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-2 block">CVV</label>
                  <input required type="text" className="w-full px-4 py-3 rounded-xl border border-gray-100 focus:border-black outline-none transition-all text-sm" placeholder="123" value={cardData.cvc} onChange={e => setCardData({...cardData, cvc: e.target.value})} />
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-black text-white font-bold text-[10px] uppercase tracking-[0.2em] py-5 rounded-full hover:bg-gray-800 transition-all disabled:opacity-50"
          >
            {processing ? 'Procesando Pago...' : 'Confirmar Inversión'}
          </button>
        </form>
      </div>
    </div>
  );
}
