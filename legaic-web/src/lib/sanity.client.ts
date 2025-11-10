// lib/sanity.client.ts

import { createClient } from 'next-sanity'

// Obtenemos las variables de entorno
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = '2023-05-03' // Usa una fecha reciente de Sanity API

export const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: false, // true en producción para caché, false en desarrollo para ver cambios al instante
})