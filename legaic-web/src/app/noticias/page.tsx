// src/app/noticias/page.tsx

import React from 'react'
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ ---
const query = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  summary,
  mainImage,
  publishedAt,
  "slug": slug.current
}`

// --- Definición de Tipos ---
interface Post {
  _id: string
  title: string
  slug: string
  summary?: string
  mainImage?: any
  publishedAt: string
}

// --- Función para Obtener Datos ---
async function getPosts() {
  const posts = await client.fetch(query)
  return posts as Post[]
}

// --- Estilos (temporales) ---
const styles = {
  page: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' } as React.CSSProperties,
  card: {
    display: 'flex',
    gap: '2rem',
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1rem',
    textDecoration: 'none',
    color: 'black',
    marginBottom: '1.5rem',
  } as React.CSSProperties,
  image: {
    width: '200px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '4px',
    flexShrink: 0,
  } as React.CSSProperties,
  content: { display: 'flex', flexDirection: 'column' } as React.CSSProperties,
  title: { marginTop: 0, fontSize: '1.5rem' },
  date: { color: '#777', fontSize: '0.9rem' },
  summary: { color: '#333' },
}

// --- Componente de la Página ---
export default async function NoticiasPage() {
  const posts = await getPosts()

  return (
    <main style={styles.page}>
      <h1>Noticias</h1>
      <p>Artículos y actualidad del despacho.</p>

      <div style={{ marginTop: '3rem' }}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link key={post._id} href={`/noticias/${post.slug}`} style={styles.card}>
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(200).height(150).url()}
                  alt={`Imagen para ${post.title}`}
                  width={200}
                  height={150}
                  style={styles.image}
                />
              )}
              <div style={styles.content}>
                <h3 style={styles.title}>{post.title}</h3>
                <p style={styles.date}>
                  {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </p>
                <p style={styles.summary}>{post.summary}</p>
              </div>
            </Link>
          ))
        ) : (
          <p>No se encontraron noticias.</p>
        )}
      </div>
    </main>
  )
}

export const revalidate = 0