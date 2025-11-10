import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { client } from '@/lib/sanity.client'
import { siteSettingsQuery, type SiteSettings } from '@/lib/sanity.queries'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legaic Abogados - Despacho en Barcelona',
  description: 'Migración a Next.js y Sanity',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await client.fetch<SiteSettings | null>(siteSettingsQuery)

  return (
    <html lang="es">
      <body className={inter.className}>
        <Header settings={settings ?? undefined} />

        <main>{children}</main>

        <Footer settings={settings ?? undefined} />
      </body>
    </html>
  )
}
