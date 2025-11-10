// src/app/noticias/[slug]/page.tsx

import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ (sin cambios) ---
const query = groq`*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  publishedAt,
  body,
  "slug": slug.current
}`

// --- Definición de Tipos (sin cambios) ---
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

// --- Función para Obtener Datos (sin cambios) ---
async function getPost(slug: string) {
  const post = await client.fetch(query, { slug })
  return post as Post
}

// --- Componente de la Página (Actualizado con Tailwind) ---
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
    <article className="container mx-auto px-4 py-12 md:py-20 max-w-3xl">
      
      {/* --- Encabezado del Artículo --- */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        {post.title}
      </h1>
      <p className="text-gray-500 mb-8">
        Publicado el: {new Date(post.publishedAt).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {/* --- Imagen Principal --- */}
      {post.mainImage && (
        <div className="mb-8 overflow-hidden rounded-lg shadow-lg">
          <Image
            src={urlFor(post.mainImage).width(1200).height(600).url()}
            alt={`Imagen para ${post.title}`}
            width={1200}
            height={600}
            priority
            className="w-full h-auto object-cover"
          />
        </div>
      )}

      {/* --- Cuerpo del Artículo (con 'prose') --- */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>
    </article>
  )
}

export const revalidate = 0