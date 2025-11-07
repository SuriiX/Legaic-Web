// schemaTypes/abogado.ts

import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'abogado',
  title: 'Abogado',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nombre del Abogado',
      type: 'string',
      description: 'Nombre y Apellido (ej. "Marc Raich")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      description: 'La URL para el perfil de este abogado (ej. "marc-raich").',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Cargo',
      type: 'string',
      description: 'El cargo o rol en la firma (ej. "Socio Fundador", "Abogado Titular").',
    }),
    defineField({
      name: 'profileImage',
      title: 'Imagen de Perfil',
      type: 'image',
      options: {
        hotspot: true, // Ideal para fotos de retrato
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biografía',
      type: 'array', // Editor de texto enriquecido
      description: 'La descripción profesional, trayectoria y experiencia.',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'profileImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Sin nombre',
        subtitle: subtitle || 'Sin cargo',
        media: media,
      }
    },
  },
})