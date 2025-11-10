import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/lib/sanity.image'
import type { NavigationItem, SiteSettings } from '@/lib/sanity.queries'

const fallbackNav: NavigationItem[] = [
  { label: 'Inicio', href: '/' },
  { label: 'Áreas de Práctica', href: '/areas-de-practica' },
  { label: 'Quiénes Somos', href: '/quienes-somos' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
]

interface HeaderProps {
  settings?: SiteSettings
}

export default function Header({ settings }: HeaderProps) {
  const navItems = settings?.navigation?.length ? settings.navigation : fallbackNav
  const ctaLabel = settings?.contactCtaLabel || 'Consúltenos'
  const brandTitle = settings?.title || 'LEGAIC'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-4 lg:px-6 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-gray-800">
          {settings?.logo ? (
            <Image
              src={urlFor(settings.logo).width(120).height(48).fit('max').url()}
              alt={brandTitle}
              width={120}
              height={48}
              className="h-10 w-auto object-contain"
              priority
            />
          ) : (
            <span>{brandTitle}</span>
          )}
        </Link>

        <div className="hidden lg:flex space-x-8">
          {navItems.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-gray-600 hover:text-blue-700 font-medium transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden lg:block">
          <Link
            href="/contacto"
            className="bg-blue-800 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-blue-900 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>

        <div className="lg:hidden">
          <button className="text-gray-700 p-2" type="button" aria-label="Abrir menú">
            <svg
              className="w-6 h-6"
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
