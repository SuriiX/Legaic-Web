// src/components/Header.tsx

import Link from 'next/link'

const navLinks = [
  { name: 'Inicio', href: '/' },
  { name: 'Áreas de Práctica', href: '/#areas-de-practica' },
  { name: 'Quiénes Somos', href: '/quienes-somos' },
  { name: 'Noticias', href: '/noticias' },
  { name: 'Contacto', href: '/contacto' },
]

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand-night/95 text-white shadow-lg backdrop-blur">
      <nav className="container flex items-center justify-between py-4">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-[0.2em] uppercase text-white transition-transform hover:-translate-y-0.5"
        >
          Legaic
        </Link>

        <div className="hidden items-center space-x-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium uppercase tracking-[0.18em] text-white/80 transition-colors duration-300 hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/contacto"
            className="inline-flex items-center rounded-full bg-brand-accent px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-brand-night transition-colors duration-300 hover:bg-brand-accentDark hover:text-white"
          >
            Consúltenos
          </Link>
        </div>

        <div className="lg:hidden">
          <button
            type="button"
            className="inline-flex rounded-md bg-white/10 p-2 text-white transition hover:bg-white/20"
            aria-label="Abrir menú de navegación"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
