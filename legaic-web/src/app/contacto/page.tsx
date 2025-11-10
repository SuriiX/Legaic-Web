import { client } from '@/lib/sanity.client'
import { contactPageQuery, type ContactPagePayload } from '@/lib/sanity.queries'

export default async function ContactoPage() {
  const contact = await client.fetch<ContactPagePayload | null>(contactPageQuery)

  const title = contact?.title || 'Contacta con Nosotros'
  const subtitle =
    contact?.subtitle ||
    'Estamos aquí para ayudarte. Envíanos tu consulta o visítanos en nuestra oficina en Barcelona.'
  const formTitle = contact?.formTitle || 'Envíanos tu Consulta'
  const formDisclaimer = contact?.formDisclaimer
  const formCta = contact?.formCtaLabel || 'Enviar Mensaje'
  const formDisabled = contact?.formDisabled ?? true
  const email = contact?.email || 'info@legaic.es'
  const phone = contact?.phone || '+34 (000) 000 000'
  const address = contact?.address || 'Barcelona, España'
  const schedule = contact?.schedule || ['Lunes a Jueves: 9:00 - 18:00', 'Viernes: 9:00 - 15:00']

  return (
    <main className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">{title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50 p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">{formTitle}</h2>

            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Teléfono (Opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  required
                  rows={5}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>

              <div className="space-y-2">
                <button
                  type="submit"
                  className="w-full bg-blue-800 text-white px-6 py-3 rounded-md text-lg font-medium hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                  disabled={formDisabled}
                >
                  {formCta}
                </button>
                {formDisclaimer ? (
                  <p className="text-xs text-gray-500">{formDisclaimer}</p>
                ) : null}
                {formDisabled ? (
                  <p className="text-xs text-gray-500">El formulario estará disponible próximamente.</p>
                ) : null}
              </div>
            </form>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Nuestra Oficina</h3>
              <p className="text-gray-600 whitespace-pre-line">{address}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Email</h3>
              <a href={`mailto:${email}`} className="text-lg text-blue-700 hover:underline">
                {email}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Teléfono</h3>
              <a href={`tel:${phone}`} className="text-lg text-blue-700 hover:underline">
                {phone}
              </a>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Horario</h3>
              <ul className="text-gray-600 space-y-1">
                {schedule.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {contact?.mapEmbed ? (
              <div className="aspect-video overflow-hidden rounded-lg shadow-md">
                <div
                  className="h-full w-full"
                  dangerouslySetInnerHTML={{ __html: contact.mapEmbed }}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </main>
  )
}

export const revalidate = 0
