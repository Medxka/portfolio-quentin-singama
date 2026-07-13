import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { ContactCTA } from "../ui/ContactCTA"

/**
 * Intro — "Disponibilité" : portrait à gauche, fiche alternance à droite
 * (le candidat publie sa propre annonce). Grille label / valeur en mono.
 */
const INFO = [
  { label: "Poste", value: "UX/UI Designer · Product Design" },
  { label: "Contrat", value: "Alternance M2 · 4 j entreprise / 1 j école" },
  { label: "Début", value: "Septembre 2026 · 12 mois" },
  { label: "En attendant", value: "Stages courts ouverts (avr. → août 2026)" },
  { label: "Localisation", value: "Bordeaux · Remote · Hybride" },
]

export function Intro() {
  return (
    <section id="intro" className="section-pad">
      <div className="shell">
        <Reveal>
          <Kicker className="inline-flex items-center gap-3 text-taupe-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-apricot opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-apricot" />
            </span>
            Disponibilité
          </Kicker>
        </Reveal>

        <div className="mt-10 grid gap-x-14 gap-y-12 md:grid-cols-12 md:items-start">
          {/* Portrait */}
          <div className="md:col-span-4">
            <Reveal delay={0.08}>
              <figure className="relative max-w-[300px]">
                <div
                  aria-hidden
                  className="absolute -inset-6 -z-10 rounded-[45%] bg-apricot/25 blur-3xl"
                />
                <img
                  src="/portrait.jpg"
                  alt="Quentin Singama, UX/UI Designer à Bordeaux"
                  className="aspect-[4/5] w-full rounded-2xl object-cover shadow-xl ring-1 ring-espresso/5"
                />
                <figcaption className="mt-3 font-mono text-mono-label uppercase text-taupe-2">
                  Quentin · Bordeaux
                </figcaption>
              </figure>
            </Reveal>
          </div>

          {/* Fiche alternance */}
          <div className="md:col-span-8">
            <Reveal delay={0.12}>
              <h2 className="max-w-[18ch] text-h3 text-espresso">
                Alternance UX/UI Designer{" "}
                <span className="text-sienna">· septembre 2026</span>
              </h2>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-6 max-w-[54ch] text-pbody text-taupe">
                Master 2 Design &amp; UX/UI à l'ECV Bordeaux. Je recherche une
                entreprise pour une alternance d'un an, orientée Product Design
                / UX-UI. Disponible aussi pour des stages courts d'ici
                septembre.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <dl className="mt-9 border-b border-espresso/10">
                {INFO.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-1 gap-1 border-t border-espresso/10 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="font-mono text-mono-label uppercase text-taupe-2">
                      {row.label}
                    </dt>
                    <dd className="font-sans text-psmall text-espresso">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.3}>
          <div id="contact" className="scroll-mt-28">
            <ContactCTA className="mt-14 max-w-2xl" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
