// src/app/quienes-somos/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "abogado"]{
  _id,
  name,
  position,
  profileImage,
  "slug": slug.current
}`

interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: SanityImageSource | null
}

async function getAbogados() {
  const abogados = await client.fetch(query)
  return abogados as Abogado[]
}

export default async function QuienesSomosPage() {
  const abogados = await getAbogados()

  return (
    <main className="container py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="badge-accent">Nuestro equipo</span>
        <h1 className="mt-6 text-4xl font-semibold md:text-5xl">Expertos que acompañan cada decisión</h1>
        <p className="mt-4 text-base text-brand-slate/80">
          Conoce al equipo multidisciplinar que ha convertido a Legaic en referencia en derecho civil, familia e inmobiliario.
        </p>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {abogados && abogados.length > 0 ? (
          abogados.map((abogado) => (
            <Link
              key={abogado._id}
              href={`/abogados/${abogado.slug}`}
              className="card-surface group flex h-full flex-col overflow-hidden"
            >
              {abogado.profileImage && (
                <div className="relative h-72 overflow-hidden">
                  <Image
                    src={urlFor(abogado.profileImage).width(400).height(500).url()}
                    alt={`Foto de ${abogado.name}`}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-brand-night/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              )}
              <div className="flex flex-1 flex-col gap-3 p-8">
                <h3 className="text-2xl font-semibold text-brand-navy">{abogado.name}</h3>
                {abogado.position && (
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-brand-primary">
                    {abogado.position}
                  </p>
                )}
                <span className="mt-auto inline-flex items-center text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors group-hover:text-brand-accent">
                  Ver perfil
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-full text-center text-brand-slate/70">No se encontraron perfiles de abogados.</p>
        )}
      </div>
    </main>
  )
}

export const revalidate = 0
