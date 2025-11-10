// src/app/noticias/[slug]/page.tsx

import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ ---
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  "slug": slug.current
}`

// --- Definición de Tipos ---
interface Post {
  _id: string
  title: string
  slug: string
  mainImage?: any
  publishedAt: string
  body: any[]
}

interface PageProps {
  params: {
    slug: string
  }
}

// --- Función para Obtener Datos ---
async function getPost(slug: string) {
  const post = await client.fetch(query, { slug })
  return post as Post
}

// --- Componente de la Página ---
export default async function PostPage(props: PageProps) {
  const { slug } = await props.params

  if (!slug) {
    return <div>Cargando...</div>
  }

  const post = await getPost(slug)

  if (!post) {
    return <div>Artículo no encontrado</div>
  }

  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{post.title}</h1>
      <p style={{ color: '#777', fontSize: '0.9rem' }}>
        Publicado el: {new Date(post.publishedAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {post.mainImage && (
        <Image
          src={urlFor(post.mainImage).width(800).height(400).url()}
          alt={`Imagen para ${post.title}`}
          width={800}
          height={400}
          priority
          style={{ objectFit: 'cover', margin: '2rem 0' }}
        />
      )}

      {/* Aquí renderizamos el 'body' del artículo */}
      <div style={{ lineHeight: '1.7' }}>
        <PortableText value={post.body} />
      </div>
    </article>
  )
}

export const revalidate = 0