// src/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legaic Abogados - Boutique legal en Barcelona',
  description: 'Despacho jurídico especializado en derecho civil, familia e inmobiliario.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${inter.className} flex min-h-screen flex-col bg-brand-cloud`}> 
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
