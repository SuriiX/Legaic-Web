// src/app/abogados/[slug]/page.tsx

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
// Cambiamos el _type a "abogado" y pedimos los campos del abogado
const query = groq`*[_type == "abogado" && slug.current == $slug][0]{
  _id,
  name,
  position,
  profileImage,
  bio,
  "slug": slug.current
}`

// --- Definición de Tipos (TypeScript) ---
interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: any
  bio: any[]
}

// Definición de Props para la página
interface PageProps {
  params: {
    slug: string
  }
}

// --- Función para Obtener Datos ---
async function getAbogado(slug: string) {
  // Pasamos el slug como parámetro
  const abogado = await client.fetch(query, { slug })
  return abogado as Abogado
}

// --- Componente de la Página ---
export default async function AbogadoPage(props: PageProps) {
  
  // 1. "Esperamos" (await) la promesa de los params
  const { slug } = await props.params

  if (!slug) {
    return <div>Cargando perfil...</div>
  }

  // 2. Pasamos el slug a la función de fetch
  const abogado = await getAbogado(slug)

  if (!abogado) {
    return <div>Perfil de abogado no encontrado</div>
  }

  // 3. Renderizar la página de perfil
  return (
    <article style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      
      {abogado.profileImage && (
        <Image
          src={urlFor(abogado.profileImage).width(300).height(300).url()}
          alt={`Foto de perfil de ${abogado.name}`}
          width={300}
          height={300}
          priority
          style={{ objectFit: 'cover', borderRadius: '50%' }} // Estilo de foto de perfil
        />
      )}

      <h1 style={{ marginTop: '1rem' }}>{abogado.name}</h1>
      {abogado.position && (
        <h2 style={{ color: '#555', fontStyle: 'italic' }}>{abogado.position}</h2>
      )}
      
      <hr />

      <div style={{ marginTop: '2rem' }}>
        <PortableText value={abogado.bio} />
      </div>

    </article>
  )
}

// --- Configuración de Revalidación ---
export const revalidate = 0