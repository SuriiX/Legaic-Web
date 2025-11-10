// src/app/areas-de-practica/[slug]/page.tsx

import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "areaDePractica" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  "slug": slug.current,
  content
}`

interface AreaDePractica {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource | null
  content: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getArea(slug: string) {
  const area = await client.fetch(query, { slug })
  return area as AreaDePractica
}

export default async function AreaDePracticaPage(props: PageProps) {
  const { slug } = await props.params

  if (!slug) {
    return <div className="container py-24 text-center text-brand-slate">Cargando área de práctica…</div>
  }

  const area = await getArea(slug)

  if (!area) {
    return <div className="container py-24 text-center text-brand-slate">Área no encontrada.</div>
  }

  return (
    <article className="bg-gradient-to-b from-white via-brand-cloud to-brand-mist">
      <div className="container max-w-4xl py-16 md:py-24">
        <div className="text-center">
          <span className="badge-accent">Área de práctica</span>
          <h1 className="mt-6 text-4xl font-semibold md:text-5xl">{area.title}</h1>
        </div>

        {area.mainImage && (
          <div className="relative mt-12 overflow-hidden rounded-3xl shadow-brand-soft">
            <Image
              src={urlFor(area.mainImage).width(1200).height(600).url()}
              alt={`Imagen para ${area.title}`}
              width={1200}
              height={600}
              priority
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-transparent to-transparent" />
          </div>
        )}

        <div className="prose prose-lg mx-auto mt-12 max-w-none rounded-3xl bg-white/80 p-10 shadow-brand-card backdrop-blur">
          <PortableText value={area.content} />
        </div>
      </div>
    </article>
  )
}

export const revalidate = 0
