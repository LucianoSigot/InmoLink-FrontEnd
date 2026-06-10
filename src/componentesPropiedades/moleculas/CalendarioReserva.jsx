import React, { useState } from 'react';

const CalendarioReserva = ({ startDate, endDate, onDateChange, occupiedDates = [], onRangeError }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const toLocalDateString = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  const parseLocalDate = (dateStr) => {
    const clean = dateStr.split('T')[0];
    const [y, m, d] = clean.split('-').map(Number);
    return new Date(y, m - 1, d);
  };

  const isDateOccupied = (date) => {
    return occupiedDates.some(range => {
      const start = parseLocalDate(range.fechaInicio);
      const end = parseLocalDate(range.fechaFin);
      return date >= start && date <= end;
    });
  };

  const isPastDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const hasOccupiedInRange = (startStr, endStr) => {
    const rangeStart = parseLocalDate(startStr);
    const rangeEnd = parseLocalDate(endStr);
    const current = new Date(rangeStart);
    while (current <= rangeEnd) {
      if (isDateOccupied(current)) return true;
      current.setDate(current.getDate() + 1);
    }
    return false;
  };

  const isSelected = (date) => {
    if (!startDate) return false;
    const current = new Date(date).setHours(0,0,0,0);
    const start = parseLocalDate(startDate).setHours(0,0,0,0);
    if (!endDate) return current === start;
    const end = parseLocalDate(endDate).setHours(0,0,0,0);
    return current >= start && current <= end;
  };

  const handleDateClick = (day) => {
    const clickedDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    if (isDateOccupied(clickedDate) || isPastDate(clickedDate)) return;

    if (!startDate || (startDate && endDate)) {
      onDateChange(toLocalDateString(clickedDate), null);
    } else {
      const start = new Date(startDate);
      if (clickedDate < start) {
        onDateChange(toLocalDateString(clickedDate), null);
      } else {
        const endStr = toLocalDateString(clickedDate);
        if (hasOccupiedInRange(startDate, endStr)) {
          onRangeError && onRangeError();
          return;
        }
        onDateChange(startDate, endStr);
      }
    }
  };

  const nextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  const prevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));

  const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const totalDays = daysInMonth(year, month);
  const startDay = firstDayOfMonth(year, month);

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <button onClick={prevMonth} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <h4 className="font-['Cormorant_Garamond'] text-xl font-bold uppercase tracking-widest">
          {monthNames[month]} {year}
        </h4>
        <button onClick={nextMonth} className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map(d => (
          <div key={d} className="text-[10px] font-bold text-gray-300 text-center uppercase tracking-widest">{d}</div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {[...Array(startDay)].map((_, i) => <div key={`empty-${i}`} />)}
        {[...Array(totalDays)].map((_, i) => {
          const day = i + 1;
          const date = new Date(year, month, day);
          const occupied = isDateOccupied(date);
          const past = isPastDate(date);
          const disabled = occupied || past;
          const selected = isSelected(date);
          const isToday = new Date().setHours(0,0,0,0) === date.setHours(0,0,0,0);

          return (
            <button
              key={day}
              onClick={() => handleDateClick(day)}
              disabled={disabled}
              className={`
                relative h-10 w-full flex items-center justify-center rounded-xl text-xs font-bold transition-all
                ${occupied ? 'text-gray-400 bg-gray-100 cursor-not-allowed line-through' : ''}
                ${past && !occupied ? 'text-gray-300 bg-gray-50/50 cursor-not-allowed' : ''}
                ${!disabled ? 'hover:bg-gray-50 text-gray-700' : ''}
                ${selected ? '!bg-black !text-white shadow-lg scale-105 z-10' : ''}
                ${isToday && !selected ? 'border border-amber-200 text-amber-600' : ''}
              `}
            >
              {day}
              {occupied && <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-gray-400 rounded-full"></div>}
            </button>
          );
        })}
      </div>
      
      <div className="mt-6 flex gap-4 text-[9px] font-bold uppercase tracking-widest justify-center border-t border-gray-50 pt-4">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          <span className="text-gray-400">Ocupado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 bg-black rounded-full"></div>
          <span className="text-gray-400">Seleccionado</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 border border-gray-200 rounded-full"></div>
          <span className="text-gray-400">Libre</span>
        </div>
      </div>
    </div>
  );
};

export default CalendarioReserva;
