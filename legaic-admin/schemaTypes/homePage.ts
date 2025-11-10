import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Página de Inicio',
  type: 'document',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Título principal',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Descripción del héroe',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Texto del botón principal',
      type: 'string',
      initialValue: 'Contacta con Nosotros',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Enlace del botón principal',
      type: 'string',
      initialValue: '/contacto',
    }),
    defineField({
      name: 'heroImage',
      title: 'Imagen del héroe',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'practiceAreasTitle',
      title: 'Título de áreas destacadas',
      type: 'string',
      initialValue: 'Áreas de Práctica',
    }),
    defineField({
      name: 'practiceAreasDescription',
      title: 'Descripción de áreas destacadas',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'featuredPracticeAreas',
      title: 'Áreas destacadas',
      description: 'Selecciona las áreas que aparecerán en portada. Si se deja vacío, se mostrarán todas.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'areaDePractica' }],
        },
      ],
    }),
    defineField({
      name: 'teamSectionTitle',
      title: 'Título de equipo destacado',
      type: 'string',
      initialValue: 'Nuestro Equipo',
    }),
    defineField({
      name: 'teamSectionDescription',
      title: 'Descripción de equipo destacado',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredLawyers',
      title: 'Abogados destacados',
      description: 'Selecciona los abogados que aparecerán en la portada.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'abogado' }],
        },
      ],
    }),
    defineField({
      name: 'newsSectionTitle',
      title: 'Título de noticias',
      type: 'string',
      initialValue: 'Noticias y Artículos',
    }),
    defineField({
      name: 'newsSectionDescription',
      title: 'Descripción de noticias',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Noticias destacadas',
      description: 'Selecciona las noticias que aparecerán en portada. Si se deja vacío, se mostrarán las más recientes.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    }),
  ],
})
