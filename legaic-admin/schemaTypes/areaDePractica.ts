// schemaTypes/areaDePractica.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'areaDePractica',
  title: 'Área de Práctica',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      description: 'El nombre del área de práctica (ej. "Derecho Civil")',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'La URL para esta área (ej. "derecho-civil"). Haz clic en "Generate".',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagen Principal',
      type: 'image',
      description: 'Una imagen destacada para esta área de práctica.',
      options: {
        hotspot: true, // Permite al editor recortar la imagen de forma inteligente
      },
    }),
    defineField({
      name: 'summary',
      title: 'Resumen Breve',
      type: 'text',
      description: 'Un resumen corto que aparecerá en las tarjetas o vistas previas.',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: 'Contenido Principal',
      type: 'array', // Esto activa el editor de texto enriquecido (Rich Text)
      description: 'El contenido detallado de la página de servicio.',
      of: [
        {
          type: 'block', // El tipo básico para párrafos
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
            ],
          },
        },
        {
          type: 'image', // Permite insertar imágenes dentro del contenido
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Sin título',
        media: media,
      }
    },
  },
})