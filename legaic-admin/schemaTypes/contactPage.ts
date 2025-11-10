import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'contactPage',
  title: 'Página de Contacto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título principal',
      type: 'string',
      initialValue: 'Contacta con Nosotros',
    }),
    defineField({
      name: 'subtitle',
      title: 'Descripción',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'formTitle',
      title: 'Título del formulario',
      type: 'string',
      initialValue: 'Envíanos tu Consulta',
    }),
    defineField({
      name: 'formDisclaimer',
      title: 'Nota del formulario',
      type: 'text',
      rows: 3,
      description: 'Mensaje informativo que aparece junto al formulario (opcional).',
    }),
    defineField({
      name: 'formCtaLabel',
      title: 'Texto del botón del formulario',
      type: 'string',
      initialValue: 'Enviar Mensaje',
    }),
    defineField({
      name: 'formDisabled',
      title: 'Deshabilitar envío del formulario',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'schedule',
      title: 'Horario de atención',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'mapEmbed',
      title: 'Mapa (iframe o URL)',
      type: 'text',
      rows: 4,
    }),
  ],
})
