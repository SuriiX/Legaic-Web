// src/app/quienes-somos/page.tsx

// Eliminamos 'import React' que ya no es necesario para los estilos
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ (sin cambios) ---
const query = groq`*[_type == "abogado"]{
  _id,
  name,
  position,
  profileImage,
  "slug": slug.current
}`

// --- Definición de Tipos (sin cambios) ---
interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: any
}

// --- Función para Obtener Datos (sin cambios) ---
async function getAbogados() {
  const abogados = await client.fetch(query)
  return abogados as Abogado[]
}

// --- Componente de la Página (Actualizado con Tailwind) ---
export default async function QuienesSomosPage() {
  const abogados = await getAbogados()

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">
        Nuestro Equipo
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Conoce al equipo de Legaic Abogados.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {abogados && abogados.length > 0 ? (
          abogados.map((abogado) => (
            <Link
              key={abogado._id}
              href={`/abogados/${abogado.slug}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {abogado.profileImage && (
                <div className="overflow-hidden">
                  <Image
                    src={urlFor(abogado.profileImage).width(400).height(400).url()}
                    alt={`Foto de ${abogado.name}`}
                    width={400}
                    height={400}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {abogado.name}
                </h3>
                {abogado.position && (
                  <p className="text-blue-800 font-medium">{abogado.position}</p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <p>No se encontraron perfiles de abogados.</p>
        )}
      </div>
    </main>
  )
}

// --- Configuración de Revalidación ---
export const revalidate = 0