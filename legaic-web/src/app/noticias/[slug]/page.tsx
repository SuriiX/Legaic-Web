// src/app/noticias/[slug]/page.tsx

import Image from 'next/image'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  "slug": slug.current
}`

interface Post {
  _id: string
  title: string
  slug: string
  mainImage?: SanityImageSource | null
  publishedAt: string
  body: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  const post = await client.fetch(query, { slug })
  return post as Post
}

export default async function PostPage(props: PageProps) {
  const { slug } = await props.params

  if (!slug) {
    return <div className="container py-24 text-center text-brand-slate">Cargando artículo…</div>
  }

  const post = await getPost(slug)

  if (!post) {
    return <div className="container py-24 text-center text-brand-slate">Artículo no encontrado.</div>
  }

  return (
    <article className="bg-gradient-to-b from-white via-brand-cloud to-brand-mist">
      <div className="container max-w-3xl py-16 md:py-24">
        <div className="text-center">
          <span className="badge-accent">Actualidad</span>
          <h1 className="mt-6 text-4xl font-semibold md:text-5xl">{post.title}</h1>
          <p className="mt-3 text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary/70">
            {new Date(post.publishedAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        </div>

        {post.mainImage && (
          <div className="relative mt-12 overflow-hidden rounded-3xl shadow-brand-soft">
            <Image
              src={urlFor(post.mainImage).width(1200).height(600).url()}
              alt={`Imagen para ${post.title}`}
              width={1200}
              height={600}
              priority
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-transparent to-transparent" />
          </div>
        )}

        <div className="prose prose-lg mx-auto mt-12 max-w-none rounded-3xl bg-white/85 p-10 shadow-brand-card backdrop-blur">
          <PortableText value={post.body} />
        </div>
      </div>
    </article>
  )
}

export const revalidate = 0
