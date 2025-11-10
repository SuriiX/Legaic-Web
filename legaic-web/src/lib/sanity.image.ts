

import imageUrlBuilder from '@sanity/image-url'
import { client } from './sanity.client' // Importa tu cliente

// Configura el constructor de URLs de imagen
const builder = imageUrlBuilder(client)

// Exporta la función para poder usarla en cualquier parte
export function urlFor(source: any) {
  return builder.image(source)
}