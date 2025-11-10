import Image from 'next/image'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from 'sanity'

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
  mainImage?: SanityImageSource
  content?: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getArea(slug: string) {
  return client.fetch<AreaDePractica | null>(query, { slug })
}

export default async function AreaDePracticaPage({ params }: PageProps) {
  const { slug } = params

  if (!slug) {
    notFound()
  }

  const area = await getArea(slug)

  if (!area) {
    notFound()
  }

  return (
    <article className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{area.title}</h1>
        <div className="h-1 w-20 bg-blue-800" />
      </header>

      {area.mainImage ? (
        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={urlFor(area.mainImage).width(1200).height(600).url()}
            alt={area.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none">
        <PortableText value={area.content || []} />
      </div>
    </article>
  )
}

export const revalidate = 0
