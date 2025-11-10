// src/app/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "areaDePractica"]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  summary
}`

interface Area {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource | null
  summary?: string
}

async function getAreasDePractica() {
  const areas: Area[] = await client.fetch(query)
  return areas
}

export default async function Home() {
  const areas = await getAreasDePractica()

  return (
    <main className="space-y-24 pb-24">
      <section className="relative overflow-hidden bg-brand-hero text-white">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/globe.svg"
            alt="Trama decorativa"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="relative container py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center justify-center rounded-full border border-white/30 px-4 py-1 text-xs font-medium uppercase tracking-[0.25em] text-white/80">
              Boutique legal en Barcelona
            </span>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Tu aliado jurídico en derecho civil, familia e inmobiliario
            </h1>
            <p className="mt-6 text-lg text-white/80 md:text-xl">
              Más de cuatro décadas acompañando a empresas y particulares con soluciones jurídicas de alto nivel y un trato humano cercano.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contacto"
                className="inline-flex items-center rounded-full bg-brand-accent px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night transition-colors duration-300 hover:bg-brand-accentDark hover:text-white"
              >
                Contacta con nosotros
              </Link>
              <Link
                href="/#areas-de-practica"
                className="inline-flex items-center rounded-full border border-white/50 px-8 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-white transition hover:bg-white/10"
              >
                Conoce nuestras áreas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="areas-de-practica" className="container">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-accent">Especialidades</span>
          <h2 className="mt-6 text-3xl font-semibold md:text-4xl">
            Áreas de práctica
          </h2>
          <p className="mt-4 text-base text-brand-slate/80">
            Un equipo multidisciplinar para ofrecerte asesoramiento integral con la excelencia y cercanía que caracteriza a Legaic.
          </p>
        </div>

        {areas && areas.length > 0 ? (
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => (
              <Link
                key={area._id}
                href={`/areas-de-practica/${area.slug}`}
                className="card-surface group flex h-full flex-col overflow-hidden"
              >
                {area.mainImage && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(area.mainImage).width(600).height(400).url()}
                      alt={`Imagen para ${area.title}`}
                      width={600}
                      height={400}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-brand-night/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-4 p-8">
                  <h3 className="text-2xl font-semibold text-brand-navy">{area.title}</h3>
                  {area.summary && (
                    <p className="text-sm text-brand-slate/80">{area.summary}</p>
                  )}
                  <span className="mt-auto inline-flex items-center text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors group-hover:text-brand-accent">
                    Ver detalle
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-12 text-center text-brand-slate/70">
            No se encontraron áreas de práctica por el momento.
          </p>
        )}
      </section>
    </main>
  )
}

export const revalidate = 0
