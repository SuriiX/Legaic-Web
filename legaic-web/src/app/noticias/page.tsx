import Image from 'next/image'
import Link from 'next/link'
import { groq } from 'next-sanity'

import { client } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.image'
import type { PostSummary } from '@/lib/sanity.queries'

const query = groq`*[_type == "post"] | order(publishedAt desc){
  _id,
  title,
  summary,
  mainImage,
  publishedAt,
  "slug": slug.current
}`

export default async function NoticiasPage() {
  const posts = await client.fetch<PostSummary[]>(query)

  return (
    <main className="container mx-auto px-4 py-12 md:py-20 max-w-4xl">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 text-center">Noticias y Artículos</h1>
      <p className="text-lg text-gray-600 text-center max-w-3xl mx-auto mb-12">
        Artículos y actualidad del despacho.
      </p>

      {posts.length ? (
        <div className="space-y-8">
          {posts.map((post) => (
            <Link
              key={post._id}
              href={`/noticias/${post.slug}`}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
            >
              {post.mainImage ? (
                <div className="flex-shrink-0 w-full md:w-64">
                  <Image
                    src={urlFor(post.mainImage).width(300).height(200).url()}
                    alt={`Imagen para ${post.title}`}
                    width={300}
                    height={200}
                    className="w-full h-48 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ) : null}
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-800">{post.title}</h3>
                {post.publishedAt ? (
                  <p className="text-sm text-gray-500 mb-3">
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
    </main>
  )
}

export const revalidate = 0
