import Image from 'next/image'
import Link from 'next/link'

import { urlFor } from '@/lib/sanity.image'
import type { FooterLink, SiteSettings } from '@/lib/sanity.queries'

const fallbackLinks: FooterLink[] = [
  { label: 'Quiénes Somos', href: '/quienes-somos' },
  { label: 'Áreas de Práctica', href: '/areas-de-practica' },
  { label: 'Noticias', href: '/noticias' },
  { label: 'Contacto', href: '/contacto' },
]

interface FooterProps {
  settings?: SiteSettings
}

export default function Footer({ settings }: FooterProps) {
  const footerLinks = settings?.footerLinks?.length ? settings.footerLinks : fallbackLinks
  const brandTitle = settings?.title || 'LEGAIC'
  const address = settings?.address || 'Barcelona, España'
  const email = settings?.contactEmail || 'info@legaic.es'
  const phone = settings?.contactPhone || '+34 (000) 000 000'

  return (
    <footer className="bg-gray-800 text-gray-400 py-12">
      <div className="container mx-auto px-4 lg:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            {settings?.logo ? (
              <Image
                src={urlFor(settings.logo).width(150).height(60).fit('max').url()}
                alt={brandTitle}
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
            ) : (
              <h3 className="text-xl font-bold text-white">{brandTitle}</h3>
            )}
          </div>
          <p className="text-sm">
            © {new Date().getFullYear()} {brandTitle}. Todos los derechos reservados.
          </p>
          <p className="text-sm mt-2 whitespace-pre-line">{address}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            {footerLinks.map((link) => (
              <li key={link.href + link.label}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="text-white font-semibold mb-2">Email</h4>
            <a href={`mailto:${email}`} className="hover:text-white text-sm">
              {email}
            </a>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-2">Teléfono</h4>
            <a href={`tel:${phone}`} className="hover:text-white text-sm">
              {phone}
            </a>
          </div>
          {settings?.socialLinks?.length ? (
            <div>
              <h4 className="text-white font-semibold mb-2">Síguenos</h4>
              <ul className="flex gap-4 text-sm">
                {settings.socialLinks.map((social) => (
                  <li key={(social.href || '') + (social.label || '')}>
                    {social.href ? (
                      <a href={social.href} className="hover:text-white" target="_blank" rel="noreferrer">
                        {social.label || social.href}
                      </a>
                    ) : (
                      <span>{social.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    </footer>
  )
}
