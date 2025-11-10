import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import type { PracticeAreaSummary } from '@/lib/sanity.queries'

const query = groq`*[_type == "areaDePractica"] | order(title asc){
  _id,
  title,
  "slug": slug.current,
  mainImage,
  summary
}`

export default async function AreasDePracticaPage() {
  const areas = await client.fetch<PracticeAreaSummary[]>(query)

  return (
    <main className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-6">
        <header className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">Áreas de Práctica</h1>
          <p className="text-lg text-gray-600">
            Descubre los ámbitos legales en los que asesoramos a nuestros clientes.
          </p>
        </header>

        {areas.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {areas.map((area) => (
              <Link
                key={area._id}
                href={`/areas-de-practica/${area.slug}`}
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {area.mainImage ? (
                  <Image
                    src={urlFor(area.mainImage).width(600).height(400).url()}
                    alt={area.title}
                    width={600}
                    height={400}
                    className="w-full h-48 object-cover"
                  />
                ) : null}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{area.title}</h2>
                  {area.summary ? <p className="text-gray-600 text-sm">{area.summary}</p> : null}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">No se encontraron áreas de práctica.</p>
        )}
      </div>
    </main>
  )
}

export const revalidate = 0
