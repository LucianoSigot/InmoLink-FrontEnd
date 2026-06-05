import React from 'react'
import Navbar from '../componentes/Navbar';

const Contacto = () => {
  return (
    <div>
      <Navbar showBackButton={true} />
      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Ponte en Contacto
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            ¿Tienes alguna duda o propuesta? Escríbenos por tu plataforma favorita.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-items-center">

            <a
              href="https://www.instagram.com/facundoolivera52/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-xs transition-all duration-300 ease-out hover:-translate-y-4"
            >
              {/*Sombra cuando le das hover*/}
              <div className="h-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border border-gray-100 transition-shadow duration-300 group-hover:shadow-[0_20px_25px_-5px_rgba(236,72,153,0.4),0_10px_10px_-5px_rgba(236,72,153,0.2)]">

                <div className="w-36 h-36 mb-6 relative transition-transform duration-300 group-hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4406/4406253.png"
                    alt="Instagram 3D"
                    className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(236,72,153,0.3)]"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-pink-600 transition-colors">
                  Instagram
                </h3>
                <p className="text-gray-500 font-medium">Síguenos para novedades</p>

                <span className="mt-4 text-pink-500 font-semibold opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Ir al perfil &rarr;
                </span>
              </div>
            </a>

            <a
              href="https://www.facebook.com/facundo.olivera.5686"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-xs transition-all duration-300 ease-out hover:-translate-y-4"
            >
              <div className="h-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border border-gray-100 transition-shadow duration-300 group-hover:shadow-[0_20px_25px_-5px_rgba(59,130,246,0.4),0_10px_10px_-5px_rgba(59,130,246,0.2)]">

                <div className="w-36 h-36 mb-6 relative transition-transform duration-300 group-hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4406/4406234.png"
                    alt="Facebook 3D"
                    className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(59,130,246,0.3)]"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  Facebook
                </h3>
                <p className="text-gray-500 font-medium">Únete a la comunidad</p>

                <span className="mt-4 text-blue-500 font-semibold opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Visitar página &rarr;
                </span>
              </div>
            </a>

            <a
              href="https://web.whatsapp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block w-full max-w-xs transition-all duration-300 ease-out hover:-translate-y-4"
            >
              <div className="h-full bg-white rounded-3xl p-8 flex flex-col items-center text-center shadow-xl border border-gray-100 transition-shadow duration-300 group-hover:shadow-[0_20px_25px_-5px_rgba(34,197,94,0.4),0_10px_10px_-5px_rgba(34,197,94,0.2)]">

                <div className="w-36 h-36 mb-6 relative transition-transform duration-300 group-hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/4406/4406187.png"
                    alt="WhatsApp 3D"
                    className="w-full h-full object-contain drop-shadow-[0_15px_15px_rgba(34,197,94,0.3)]"
                  />
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                  WhatsApp
                </h3>
                <p className="text-gray-500 font-medium">Hablemos directamente</p>

                <span className="mt-4 text-green-500 font-semibold opacity-0 transform translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  Enviar mensaje &rarr;
                </span>
              </div>
            </a>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacto