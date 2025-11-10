import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import type { LawyerSummary } from '@/lib/sanity.queries'

const query = groq`*[_type == "abogado"] | order(name asc){
  _id,
  name,
  position,
  profileImage,
  "slug": slug.current
}`

export default async function QuienesSomosPage() {
  const abogados = await client.fetch<LawyerSummary[]>(query)

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-6xl">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">Nuestro Equipo</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Conoce al equipo de Legaic Abogados.
      </p>

      {abogados.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {abogados.map((abogado) => (
            <Link
              key={abogado._id}
              href={`/abogados/${abogado.slug}`}
              className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {abogado.profileImage ? (
                <div className="overflow-hidden">
                  <Image
                    src={urlFor(abogado.profileImage).width(400).height(400).url()}
                    alt={`Foto de ${abogado.name}`}
                    width={400}
                    height={400}
                    className="w-full h-72 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : null}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">{abogado.name}</h3>
                {abogado.position ? <p className="text-blue-800 font-medium">{abogado.position}</p> : null}
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No se encontraron perfiles de abogados.</p>
      )}
    </main>
  )
}

export const revalidate = 0
