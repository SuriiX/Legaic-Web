// src/app/quienes-somos/page.tsx

import React from 'react' // <-- 1. IMPORTANTE: Importar React
import { client } from '@/lib/sanity.client'
import { groq } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity.image'

// --- Consulta GROQ ---
const query = groq`*[_type == "abogado"]{
  _id,
  name,
  position,
  profileImage,
  "slug": slug.current
}`

// --- Definición de Tipos ---
interface Abogado {
  _id: string
  name: string
  slug: string
  position?: string
  profileImage?: any
}

// --- Función para Obtener Datos ---
async function getAbogados() {
  const abogados = await client.fetch(query)
  return abogados as Abogado[]
}

// --- Estilos CSS (Inline) ---
// 
// ==========================================================
// AQUÍ ESTÁ LA CORRECCIÓN:
// Añadimos 'as React.CSSProperties' para asegurar el tipo correcto
// ==========================================================
//
const styles = {
  page: { padding: '2rem', maxWidth: '1000px', margin: '0 auto' } as React.CSSProperties,
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  } as React.CSSProperties,
  card: {
    border: '1px solid #eee',
    borderRadius: '8px',
    padding: '1rem',
    textDecoration: 'none',
    color: 'black',
    transition: 'box-shadow 0.2s',
  } as React.CSSProperties,
  image: {
    width: '100%',
    height: '250px',
    objectFit: 'cover', // Esta propiedad causaba el error
    borderRadius: '4px',
  } as React.CSSProperties, // El 'as' soluciona el error de tipo
  name: { marginTop: '1rem', fontSize: '1.25rem' } as React.CSSProperties,
  position: { color: '#555', fontStyle: 'italic' } as React.CSSProperties,
}

// --- Componente de la Página ---
export default async function QuienesSomosPage() {
  
  const abogados = await getAbogados()

  return (
    <main style={styles.page}>
      <h1>Nuestro Equipo</h1>
      <p>Conoce al equipo de Legaic Abogados.</p>

      <div style={styles.grid}>
        {abogados && abogados.length > 0 ? (
          abogados.map((abogado) => (
            <Link
              key={abogado._id}
              href={`/abogados/${abogado.slug}`}
              style={styles.card}
            >
              {abogado.profileImage && (
                <Image
                  src={urlFor(abogado.profileImage).width(300).height(300).url()}
                  alt={`Foto de ${abogado.name}`}
                  width={300}
                  height={300}
                  style={styles.image}
                />
              )}
              <h3 style={styles.name}>{abogado.name}</h3>
              {abogado.position && (
                <p style={styles.position}>{abogado.position}</p>
              )}
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