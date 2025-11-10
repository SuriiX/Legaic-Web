// src/lib/sanity.client.ts

import { createClient } from 'next-sanity'

// ¡¡ASEGÚRATE DE QUE ESTOS VALORES ESTÉN AQUÍ!!
const projectId = '7jbtqdm3' // Reemplaza esto
const dataset = 'production' // O el dataset que uses
const apiVersion = '2023-05-03' 

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, 
})