// src/app/contacto/page.tsx

export default function ContactoPage() {
  return (
    <main className="bg-gradient-to-b from-white via-brand-cloud to-brand-mist py-16 md:py-24">
      <div className="container max-w-5xl">
        <div className="mx-auto max-w-3xl text-center">
          <span className="badge-accent">Estamos a tu lado</span>
          <h1 className="mt-6 text-4xl font-semibold md:text-5xl">Contacta con nuestro despacho</h1>
          <p className="mt-4 text-base text-brand-slate/80">
            Resolvemos tus consultas con la cercanía y agilidad que nos caracteriza. Déjanos tus datos y te responderemos en la mayor brevedad.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[1.1fr_0.9fr]">
          <div className="card-surface">
            <div className="border-b border-brand-mist/60 px-8 pb-6 pt-8">
              <h2 className="text-2xl font-semibold text-brand-navy">Envíanos tu consulta</h2>
              <p className="mt-2 text-sm text-brand-slate/70">Formulario de contacto disponible próximamente.</p>
            </div>
            <form action="#" method="POST" className="space-y-6 px-8 py-8">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-[0.25em] text-brand-slate/70">
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="mt-2 w-full rounded-xl border border-brand-mist bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-[0.25em] text-brand-slate/70">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="mt-2 w-full rounded-xl border border-brand-mist bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold uppercase tracking-[0.25em] text-brand-slate/70">
                  Teléfono (opcional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-2 w-full rounded-xl border border-brand-mist bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-[0.25em] text-brand-slate/70">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-xl border border-brand-mist bg-white px-4 py-3 text-sm shadow-sm focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/30"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full cursor-not-allowed rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold uppercase tracking-[0.25em] text-brand-night opacity-60"
                disabled
              >
                Enviar mensaje (próximamente)
              </button>
            </form>
          </div>

          <div className="card-surface flex flex-col gap-8 p-8">
            <div>
              <h3 className="text-xl font-semibold text-brand-navy">Nuestra oficina</h3>
              <p className="mt-3 text-sm text-brand-slate/80">
                Dirección de ejemplo
                <br />08001 Barcelona, España
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-navy">Email</h3>
              <a href="mailto:info@legaic.es" className="mt-2 inline-flex text-sm font-semibold text-brand-primary hover:text-brand-accent">
                info@legaic.es
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-navy">Teléfono</h3>
              <a href="tel:+34000000000" className="mt-2 inline-flex text-sm font-semibold text-brand-primary hover:text-brand-accent">
                +34 (000) 000 000
              </a>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-brand-navy">Horario</h3>
              <p className="mt-3 text-sm text-brand-slate/80">
                Lunes a jueves: 9:00 - 18:00
                <br />Viernes: 9:00 - 15:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
