import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Configuración del Sitio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nombre del Despacho',
      type: 'string',
      description: 'Se usa como logo textual en la cabecera si no hay imagen.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'navigation',
      title: 'Menú principal',
      type: 'array',
      description: 'Enlaces que aparecen en la cabecera.',
      of: [
        {
          type: 'object',
          name: 'navigationItem',
          fields: [
            defineField({
              name: 'label',
              title: 'Etiqueta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'contactCtaLabel',
      title: 'Texto del botón de contacto',
      type: 'string',
      initialValue: 'Consúltenos',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email de contacto',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Teléfono de contacto',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'footerLinks',
      title: 'Enlaces del pie de página',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'footerLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Etiqueta',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociales',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({
              name: 'label',
              title: 'Nombre de la red',
              type: 'string',
            }),
            defineField({
              name: 'href',
              title: 'URL',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
})
