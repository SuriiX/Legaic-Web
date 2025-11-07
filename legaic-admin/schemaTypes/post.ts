// schemaTypes/post.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Noticia / Artículo',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      description: 'El título del artículo (ej. "La mediación obligatoria...")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'La URL para este artículo (ej. "la-mediacion-obligatoria").',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Fecha de Publicación',
      type: 'datetime', // Un campo de fecha y hora
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Resumen Breve',
      type: 'text',
      description: 'Un resumen corto que aparecerá en las tarjetas de la lista de noticias.',
      rows: 4,
    }),
    defineField({
      name: 'body',
      title: 'Contenido del Artículo',
      type: 'array', // Editor de texto enriquecido
      of: [
        {
          type: 'block', // Párrafos, títulos, citas
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Título 2', value: 'h2' },
            { title: 'Título 3', value: 'h3' },
            { title: 'Cita', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
              { title: 'Subrayado', value: 'underline' },
            ],
            // También puedes permitir enlaces dentro del texto
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image', // Permitir imágenes dentro del artículo
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin título',
        subtitle: subtitle ? new Date(subtitle).toLocaleDateString('es-ES') : 'Sin fecha',
        media: media,
      }
    },
  },
})