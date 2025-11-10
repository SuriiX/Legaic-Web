// src/app/abogados/[slug]/page.tsx

import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ (sin cambios) ---
const query = groq`*[_type == "abogado" && slug.current == $slug][0]{
  _id,
  name,
  position,
  profileImage,
  bio,
  "slug": slug.current
}`

// --- Definición de Tipos (sin cambios) ---
interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: any
  bio: any[]
}

interface PageProps {
  params: {
    slug: string
  }
}

// --- Función para Obtener Datos (sin cambios) ---
async function getAbogado(slug: string) {
  const abogado = await client.fetch(query, { slug })
  return abogado as Abogado
}

// --- Componente de la Página (Actualizado con Tailwind) ---
export default async function AbogadoPage(props: PageProps) {
  const { slug } = await props.params

  if (!slug) {
    return <div>Cargando perfil...</div>
  }

  const abogado = await getAbogado(slug)

  if (!abogado) {
    return <div>Perfil de abogado no encontrado</div>
  }

  return (
    <article className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      
      {/* Usamos flex para poner la imagen al lado del texto */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        
        {/* Columna de Imagen */}
        {abogado.profileImage && (
          <div className="flex-shrink-0">
            <Image
              src={urlFor(abogado.profileImage).width(300).height(300).url()}
              alt={`Foto de perfil de ${abogado.name}`}
              width={300}
              height={300}
              priority
              className="rounded-lg shadow-lg object-cover"
            />
          </div>
        )}

        {/* Columna de Texto */}
        <div className="flex-grow text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
            {abogado.name}
          </h1>
          {abogado.position && (
            <h2 className="text-xl text-blue-800 font-semibold mt-1">
              {abogado.position}
            </h2>
          )}
        </div>
      </div>
      
      <hr className="my-8 md:my-12" />

      {/* Biografía con estilos de 'prose' */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={abogado.bio} />
      </div>

    </article>
  )
}

// --- Configuración de Revalidación ---
export const revalidate = 0