// src/app/contacto/page.tsx

import React from 'react'

export default function ContactoPage() {
  return (
    <main className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* --- Encabezado --- */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Contacta con Nosotros
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Estamos aquí para ayudarte. Envíanos tu consulta o visítanos en nuestra oficina en Barcelona.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          {/* --- Columna 1: Formulario (Diseño) --- */}
          {/* Nota: Este es solo el diseño HTML. Para que funcione, 
            necesitaría 'React Hook Form' y una API Route para enviar el email.
            Por ahora, es un prototipo visual.
          */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Envíanos tu Consulta</h2>
            
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Teléfono (Opcional)</label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-900 transition-colors disabled:bg-gray-400"
                  // Deshabilitamos el botón por ahora
                  disabled 
                >
                  Enviar Mensaje (Próximamente)
                </button>
              </div>
            </form>
          </div>

          {/* --- Columna 2: Información de Contacto --- */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nuestra Oficina</h3>
              <p className="text-gray-600">
                Dirección de Ejemplo,
                <br />
                08001 Barcelona, España
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Email</h3>
              <a href="mailto:info@legaic.es" className="text-lg text-blue-700 hover:underline">
                info@legaic.es
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Teléfono</h3>
              <a href="tel:+34000000000" className="text-lg text-blue-700 hover:underline">
                +34 (000) 000 000
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Horario</h3>
              <p className="text-gray-600">
                Lunes a Jueves: 9:00 - 18:00
                <br />
                Viernes: 9:00 - 15:00
              </p>
            </div>

          </div>

        </div>
      </div>
    </main>
  )
}