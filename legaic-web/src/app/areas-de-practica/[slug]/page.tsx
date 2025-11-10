// src/app/areas-de-practica/[slug]/page.tsx

import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import imageUrlBuilder from '@sanity/image-url'

// --- Configuración de Imagen ---
const builder = imageUrlBuilder(client)
function urlFor(source: any) {
  return builder.image(source)
}

// --- Consulta GROQ ---
// Esta consulta espera un parámetro llamado $slug
const query = groq`*[_type == "areaDePractica" && slug.current == $slug][0]{
  _id,
  title,
  mainImage,
  "slug": slug.current,
  content
}`

// --- Definición de Tipos (TypeScript) ---
interface AreaDePractica {
  _id: string
  title: string
  slug: string
  mainImage?: any
  content: any[]
}

// Definición de Props para la página
interface PageProps {
  params: {
    slug: string
  }
}

// --- Función para Obtener Datos ---
// Esta función RECIBE el slug y se lo PASA a client.fetch
async function getArea(slug: string) {
  // Pasamos el slug como un objeto de parámetros.
  // Esto soluciona el error "param $slug referenced, but not provided"
  const area = await client.fetch(query, { slug })
  return area as AreaDePractica
}

// --- Componente de la Página ---
// 
// ==========================================================
// AQUÍ ESTÁN LAS CORRECCIONES:
// 1. Cambiamos ({ params }: PageProps) por (props: PageProps)
// 2. Usamos 'await props.params' para desenvolver la Promesa
// ==========================================================
//
export default async function AreaDePracticaPage(props: PageProps) {
  
  // 1. "Esperamos" la promesa de los params y extraemos el slug
  const { slug } = await props.params

  // 2. Manejo de seguridad por si el slug no viniera
  if (!slug) {
    return <div>Cargando...</div>
  }

  // 3. Pasamos el slug (que ahora sí tiene valor) a la función
  const area = await getArea(slug)

  // 4. Manejo de "No Encontrado"
  if (!area) {
    return <div>Área no encontrada</div>
  }

  // 5. Renderizar la página
  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{area.title}</h1>
      <hr />

      {area.mainImage && (
        <Image
          src={urlFor(area.mainImage).width(800).height(400).url()}
          alt={`Imagen para ${area.title}`}
          width={800}
          height={400}
          priority // Cargar esta imagen con prioridad
          style={{ objectFit: 'cover' }}
        />
      )}

      <div style={{ marginTop: '2rem' }}>
        <PortableText value={area.content} />
      </div>
    </article>
  )
}

// --- Configuración de Revalidación ---
// Forzar Server-Side Rendering (SSR) para ver cambios al instante
export const revalidate = 0