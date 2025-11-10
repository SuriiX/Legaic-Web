// src/app/page.tsx

import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.image'

// 1. Consulta GROQ
const query = groq`*[_type == "areaDePractica"]{
  _id,
  title,
  "slug": slug.current,
  mainImage,
  summary
}`

// 2. Interfaz
interface Area {
  _id: string
  title: string
  slug: string
  mainImage?: any
  summary?: string
}

// 3. Función de Fetch
async function getAreasDePractica() {
  const areas: Area[] = await client.fetch(query)
  return areas
}

// 4. Componente de Página (con Tailwind)
export default async function Home() {
  const areas = await getAreasDePractica()

  return (
    <main>
      
      {/* --- Hero Section --- */}
      <section className="bg-white py-24 md:py-32">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            Tu boutique legal en Barcelona
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Ofrecemos un servicio legal experto y
            cercano en derecho civil, familia e inmobiliario.
          </p>
          <Link
            href="/contacto"
            className="bg-blue-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-900 transition-colors"
          >
            Contacta con Nosotros
          </Link>
        </div>
      </section>

      {/* --- Sección de Áreas de Práctica --- */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Áreas de Práctica
          </h2>

          {areas && areas.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {areas.map((area) => (
                <Link
                  key={area._id}
                  href={`/areas-de-practica/${area.slug}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {area.mainImage && (
                    <Image
                      src={urlFor(area.mainImage).width(600).height(400).url()}
                      alt={`Imagen para ${area.title}`}
                      width={600}
                      height={400}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      {area.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{area.summary}</p>
                  </div>
                </Link>
              ))}

            </div>
          ) : (
            <p className="text-center text-gray-500">
              No se encontraron áreas de práctica.
            </p>
          )}
        </div>
      </section>
    </main>
  )
}

export const revalidate = 0