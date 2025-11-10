// src/components/Footer.tsx

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-brand-night text-brand-cloud/90">
      <div className="border-t border-white/5 bg-gradient-to-b from-brand-night via-brand-night/95 to-black/60 py-16">
        <div className="container grid grid-cols-1 gap-12 md:grid-cols-3">
          <div className="space-y-4">
            <h3 className="text-2xl font-semibold tracking-[0.25em] uppercase text-white">Legaic</h3>
            <p className="max-w-xs text-sm text-brand-cloud/70">
              © {new Date().getFullYear()} Legaic Abogados. Boutique jurídica con más de 40 años de experiencia en Barcelona.
            </p>
            <span className="badge-accent">Barcelona, España</span>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-cloud">Enlaces</h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <Link href="/quienes-somos" className="transition-colors hover:text-white">
                  Quiénes Somos
                </Link>
              </li>
              <li>
                <Link href="/#areas-de-practica" className="transition-colors hover:text-white">
                  Áreas de Práctica
                </Link>
              </li>
              <li>
                <Link href="/noticias" className="transition-colors hover:text-white">
                  Noticias
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="transition-colors hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-cloud">Contacto</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="mailto:info@legaic.es" className="transition-colors hover:text-white">
                  info@legaic.es
                </a>
              </li>
              <li>
                <a href="tel:+34000000000" className="transition-colors hover:text-white">
                  +34 (000) 000 000
                </a>
              </li>
              <li className="text-brand-cloud/70">
                Lunes - Jueves: 9:00 a 18:00
                <br />
                Viernes: 9:00 a 15:00
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
