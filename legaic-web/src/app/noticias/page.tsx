// src/app/noticias/page.tsx

import Link from 'next/link'
import Image from 'next/image'
import { groq } from 'next-sanity'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'

const query = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  summary,
  mainImage,
  publishedAt,
  "slug": slug.current
}`

interface Post {
  _id: string
  title: string
  slug: string
  summary?: string
  mainImage?: SanityImageSource | null
  publishedAt: string
}

async function getPosts() {
  const posts = await client.fetch(query)
  return posts as Post[]
}

export default async function NoticiasPage() {
  const posts = await getPosts()

  return (
    <main className="container max-w-4xl py-16 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <span className="badge-accent">Actualidad</span>
        <h1 className="mt-6 text-4xl font-semibold md:text-5xl">Noticias y artículos</h1>
        <p className="mt-4 text-base text-brand-slate/80">
          Análisis de casos, jurisprudencia relevante y novedades que impactan a nuestros clientes.
        </p>
      </div>

      <div className="mt-16 space-y-8">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post._id}
              href={`/noticias/${post.slug}`}
              className="card-surface group flex flex-col overflow-hidden md:flex-row"
            >
              {post.mainImage && (
                <div className="relative w-full md:w-72">
                  <Image
                    src={urlFor(post.mainImage).width(480).height(360).url()}
                    alt={`Imagen para ${post.title}`}
                    width={480}
                    height={360}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-night/70 via-brand-night/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
              )}
              <div className="flex flex-1 flex-col justify-between gap-4 p-8">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-brand-primary/70">
                    {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                  <h3 className="text-2xl font-semibold text-brand-navy transition-colors group-hover:text-brand-accent">
                    {post.title}
                  </h3>
                  {post.summary && <p className="text-sm text-brand-slate/80">{post.summary}</p>}
                </div>
                <span className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.22em] text-brand-primary transition-colors group-hover:text-brand-accent">
                  Leer artículo
                </span>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-brand-slate/70">No se encontraron noticias.</p>
        )}
      </div>
    </main>
  )
}

export const revalidate = 0
