// src/components/Footer.tsx

import React from 'react'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Columna 1: Logo e Info */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">LEGAIC</h3>
          <p className="text-sm">
            © {new Date().getFullYear()} Legaic Abogados. Todos los derechos reservados.
          </p>
          <p className="text-sm mt-2">Barcelona, España</p>
        </div>

        {/* Columna 2: Enlaces Rápidos */}
        <div>
          <h4 className="text-white font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/quienes-somos" className="hover:text-white">Quiénes Somos</Link></li>
            <li><Link href="/" className="hover:text-white">Áreas de Práctica</Link></li>
            <li><Link href="/noticias" className="hover:text-white">Noticias</Link></li>
            <li><Link href="/contacto" className="hover:text-white">Contacto</Link></li>
          </ul>
        </div>

        {/* Columna 3: Contacto */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacto</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="mailto:info@legaic.es" className="hover:text-white">info@legaic.es</a></li>
            <li><a href="tel:+34000000000" className="hover:text-white">+34 (000) 000 000</a></li>
          </ul>
        </div>

      </div>
    </footer>
  )
}