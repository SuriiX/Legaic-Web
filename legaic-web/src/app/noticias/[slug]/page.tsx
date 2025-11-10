import Image from 'next/image'
import { notFound } from 'next/navigation'
import { groq } from 'next-sanity'
import { PortableText } from '@portabletext/react'
import type { SanityImageSource } from '@sanity/image-url'
import type { PortableTextBlock } from 'sanity'

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
  mainImage?: SanityImageSource
  publishedAt?: string
  body?: PortableTextBlock[]
}

interface PageProps {
  params: {
    slug: string
  }
}

async function getPost(slug: string) {
  return client.fetch<Post | null>(query, { slug })
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = params

  if (!slug) {
    notFound()
  }

  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="container mx-auto px-6 py-12 md:py-20 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{post.title}</h1>
        {post.publishedAt ? (
          <p className="text-gray-500">
            Publicado el{' '}
            {new Date(post.publishedAt).toLocaleDateString('es-ES', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
        ) : null}
      </header>

      {post.mainImage ? (
        <div className="mb-10 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={post.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      ) : null}

      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body || []} />
      </div>
    </article>
  )
}

export const revalidate = 0
