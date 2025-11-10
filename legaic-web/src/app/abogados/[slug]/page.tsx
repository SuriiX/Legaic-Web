// src/app/abogados/[slug]/page.tsx

import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "abogado" && slug.current == $slug][0]{
  _id,
  name,
  position,
  profileImage,
  bio,
  "slug": slug.current
}`

interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: SanityImageSource | null
  bio: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getAbogado(slug: string) {
  const abogado = await client.fetch(query, { slug })
  return abogado as Abogado
}

export default async function AbogadoPage(props: PageProps) {
  const { slug } = await props.params

  if (!slug) {
    return <div className="container py-24 text-center text-brand-slate">Cargando perfil…</div>
  }

  const abogado = await getAbogado(slug)

  if (!abogado) {
    return <div className="container py-24 text-center text-brand-slate">Perfil de abogado no encontrado.</div>
  }

  return (
    <article className="bg-gradient-to-b from-white via-brand-cloud to-brand-mist">
      <div className="container max-w-4xl py-16 md:py-24">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start">
          {abogado.profileImage && (
            <div className="relative h-80 w-72 overflow-hidden rounded-3xl shadow-brand-soft">
              <Image
                src={urlFor(abogado.profileImage).width(500).height(600).url()}
                alt={`Foto de perfil de ${abogado.name}`}
                width={500}
                height={600}
                priority
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-transparent to-transparent" />
            </div>
          )}

          <div className="text-center md:text-left">
            <span className="badge-accent">Abogado</span>
            <h1 className="mt-6 text-4xl font-semibold md:text-5xl text-brand-navy">{abogado.name}</h1>
            {abogado.position && (
              <p className="mt-2 text-sm font-semibold uppercase tracking-[0.3em] text-brand-primary/80">
                {abogado.position}
              </p>
            )}
          </div>
        </div>

        <div className="prose prose-lg mx-auto mt-16 max-w-none rounded-3xl bg-white/85 p-10 shadow-brand-card backdrop-blur">
          <PortableText value={abogado.bio} />
        </div>
      </div>
    </article>
  )
}

export const revalidate = 0
