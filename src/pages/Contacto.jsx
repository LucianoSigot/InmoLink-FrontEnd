import React from 'react'
import { useNavigate } from 'react-router-dom';

const Contacto = () => {

  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

      
      {/* BARRA LATERAL */}
      <aside className="bg-white w-full md:w-64 shadow-lg flex flex-col p-6 md:min-h-screen">
        
        {/* Botón de Volver */}
        <button className="mb-8 self-start p-2 hover:bg-gray-100 rounded-full transition-colors"
        
          onClick={() => navigate(-1)}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>
        </aside>
    </div>

  )
}

export default Contacto