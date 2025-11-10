import Image from 'next/image'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from 'sanity'

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
  profileImage?: SanityImageSource
  bio?: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getAbogado(slug: string) {
  return client.fetch<Abogado | null>(query, { slug })
}

export default async function AbogadoPage({ params }: PageProps) {
  const { slug } = params

  if (!slug) {
    notFound()
  }

  const abogado = await getAbogado(slug)

  if (!abogado) {
    notFound()
  }

  return (
    <article className="container mx-auto px-6 py-12 md:py-20 max-w-4xl">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {abogado.profileImage ? (
          <div className="flex-shrink-0 overflow-hidden rounded-lg shadow-lg">
            <Image
              src={urlFor(abogado.profileImage).width(400).height(400).url()}
              alt={`Foto de perfil de ${abogado.name}`}
              width={400}
              height={400}
              className="h-80 w-80 object-cover"
              priority
            />
          </div>
        ) : null}

        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">{abogado.name}</h1>
          {abogado.position ? (
            <p className="text-xl text-blue-800 font-semibold mt-2">{abogado.position}</p>
          ) : null}
        </div>
      </div>

      <hr className="my-8 md:my-12" />

      <div className="prose prose-lg max-w-none">
        <PortableText value={abogado.bio || []} />
      </div>
    </article>
  )
}

export const revalidate = 0
