// src/components/Header.tsx

import Link from 'next/link'
import React from 'react'

// Definimos nuestros enlaces de navegación
const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Áreas de Práctica', href: '/' }, // Lo enlazamos a la Home por ahora
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Noticias', href: '/noticias' },
  { name: 'Contacto', href: '/contacto' }, // Crearemos esta página después
]

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
        
        {/* --- 1. Logo (placeholder) --- */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          LEGAIC
        </Link>

        {/* --- 2. Enlaces de Navegación (Desktop) --- */}
        <div className="hidden lg:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* --- 3. Botón de "Consúltanos" (Desktop) --- */}
        <div className="hidden lg:block">
          <Link
            href="/contacto"
            className="bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-900 transition-colors"
          >
            Consúltenos
          </Link>
        </div>

        {/* --- 4. Botón de Menú (Móvil) --- */}
        {/* (La lógica para abrir/cerrar el menú la añadiremos después) */}
        <div className="lg:hidden">
          <button className="text-gray-700 p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

      </nav>
    </header>
  )
}