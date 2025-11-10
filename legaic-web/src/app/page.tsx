import Image from 'next/image'
import Link from 'next/link'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import {
  homePageQuery,
  type HomePagePayload,
  type LawyerSummary,
  type PracticeAreaSummary,
  type PostSummary,
} from '@/lib/sanity.queries'

function pickAreas(data: HomePagePayload): PracticeAreaSummary[] {
  if (data.home?.featuredPracticeAreas?.length) {
    return data.home.featuredPracticeAreas
  }
  return data.allPracticeAreas ?? []
}

function pickLawyers(data: HomePagePayload): LawyerSummary[] {
  if (data.home?.featuredLawyers?.length) {
    return data.home.featuredLawyers
  }
  return (data.allLawyers ?? []).slice(0, 3)
}

function pickPosts(data: HomePagePayload): PostSummary[] {
  if (data.home?.featuredPosts?.length) {
    return data.home.featuredPosts
  }
  return data.latestPosts ?? []
}

export default async function Home() {
  const data = await client.fetch<HomePagePayload>(homePageQuery)
  const hero = data.home
  const practiceAreas = pickAreas(data)
  const lawyers = pickLawyers(data)
  const posts = pickPosts(data)

  return (
    <main>
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
                {hero?.heroTitle || 'Tu boutique legal en Barcelona'}
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                {hero?.heroSubtitle ||
                  'Con más de 40 años de experiencia, ofrecemos un servicio legal experto y cercano en derecho civil, familia e inmobiliario.'}
              </p>
              <Link
                href={hero?.heroCtaLink || '/contacto'}
                className="inline-flex items-center bg-blue-800 text-white px-8 py-3 rounded-md text-lg font-medium hover:bg-blue-900 transition-colors"
              >
                {hero?.heroCtaLabel || 'Contacta con Nosotros'}
              </Link>
            </div>

            {hero?.heroImage ? (
              <div className="relative h-72 md:h-[420px] w-full overflow-hidden rounded-2xl shadow-xl">
                <Image
                  src={urlFor(hero.heroImage).width(900).height(700).fit('crop').url()}
                  alt={hero.heroTitle || 'Legaic Abogados'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {hero?.practiceAreasTitle || 'Áreas de Práctica'}
              </h2>
              {hero?.practiceAreasDescription ? (
                <p className="text-gray-600 mt-2 max-w-2xl">{hero.practiceAreasDescription}</p>
              ) : null}
            </div>
            <Link
              href="/areas-de-practica"
              className="text-blue-800 font-medium hover:text-blue-900 transition-colors"
            >
              Ver todas las áreas
            </Link>
          </div>

          {practiceAreas.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {practiceAreas.map((area) => (
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
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{area.title}</h3>
                    {area.summary ? <p className="text-gray-600 text-sm">{area.summary}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No se encontraron áreas de práctica.</p>
          )}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {hero?.teamSectionTitle || 'Nuestro Equipo'}
              </h2>
              {hero?.teamSectionDescription ? (
                <p className="text-gray-600 mt-2 max-w-2xl">{hero.teamSectionDescription}</p>
              ) : (
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Conoce al equipo de profesionales que acompaña a nuestros clientes en cada etapa del proceso.
                </p>
              )}
            </div>
            <Link
              href="/quienes-somos"
              className="text-blue-800 font-medium hover:text-blue-900 transition-colors"
            >
              Ver todos los abogados
            </Link>
          </div>

          {lawyers.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {lawyers.map((lawyer) => (
                <Link
                  key={lawyer._id}
                  href={`/abogados/${lawyer.slug}`}
                  className="group bg-gray-50 rounded-lg overflow-hidden shadow-inner hover:shadow-lg transition-shadow"
                >
                  {lawyer.profileImage ? (
                    <div className="relative h-64 w-full overflow-hidden">
                      <Image
                        src={urlFor(lawyer.profileImage).width(500).height(500).url()}
                        alt={lawyer.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800">{lawyer.name}</h3>
                    {lawyer.position ? (
                      <p className="text-blue-800 font-medium mt-2">{lawyer.position}</p>
                    ) : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No se encontraron abogados.</p>
          )}
        </div>
      </section>

      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800">
                {hero?.newsSectionTitle || 'Noticias y Artículos'}
              </h2>
              {hero?.newsSectionDescription ? (
                <p className="text-gray-600 mt-2 max-w-2xl">{hero.newsSectionDescription}</p>
              ) : (
                <p className="text-gray-600 mt-2 max-w-2xl">
                  Actualidad jurídica y novedades del despacho.
                </p>
              )}
            </div>
            <Link
              href="/noticias"
              className="text-blue-800 font-medium hover:text-blue-900 transition-colors"
            >
              Ver todas las noticias
            </Link>
          </div>

          {posts.length ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Link
                  key={post._id}
                  href={`/noticias/${post.slug}`}
                  className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >
                  {post.mainImage ? (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image
                        src={urlFor(post.mainImage).width(600).height(400).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : null}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-800">
                      {post.title}
                    </h3>
                    {post.publishedAt ? (
                      <p className="text-sm text-gray-500">
                        {new Date(post.publishedAt).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </p>
                    ) : null}
                    {post.summary ? <p className="text-gray-600 text-sm">{post.summary}</p> : null}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No se encontraron noticias.</p>
          )}
        </div>
      </section>
    </main>
  )
}

export const revalidate = 0
