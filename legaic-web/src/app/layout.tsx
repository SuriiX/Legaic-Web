// src/app/layout.tsx

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css' // Aquí se importan los estilos de Tailwind

// 1. Importar los nuevos componentes
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Legaic Abogados - Despacho en Barcelona',
  description: 'Migración a Next.js y Sanity',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        
        {/* 2. Añadir el Header aquí */}
        <Header />

        {}
        <main>
          {children}
        </main>

        {/* 3. Añadir el Footer aquí */}
        <Footer />

      </body>
    </html>
  )
}