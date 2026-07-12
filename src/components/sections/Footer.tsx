import { Mail, Linkedin, MapPin } from "lucide-react"
import { Reveal } from "../ui/Reveal"
import { DotGrid } from "../ui/DotGrid"
import { CONTACT } from "../../content"

const NAV_LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "Process", href: "#process" },
  { label: "Parcours", href: "#parcours" },
  { label: "Contact", href: "#contact" },
]

/**
 * Footer — espresso closing block: link columns, ghost giant wordmark,
 * mono colophon line. DotGrid texture breathes underneath.
 */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-linen/10 bg-espresso pt-20 pb-10">
      <DotGrid baseAlpha={0.06} />

      <div className="shell relative z-10">
        {/* Link columns */}
        <Reveal>
          <div className="grid gap-12 md:grid-cols-3">
            <nav aria-label="Navigation de pied de page">
              <h2 className="mb-4 font-mono text-mono-label uppercase text-greige">
                Navigation
              </h2>
              <ul className="space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-psmall text-linen transition-colors duration-300 hover:text-apricot"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div>
              <h2 className="mb-4 font-mono text-mono-label uppercase text-greige">
                Contact
              </h2>
              <ul className="space-y-3">
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="group inline-flex items-center gap-2.5 text-psmall text-linen transition-colors duration-300 hover:text-apricot"
                  >
                    <Mail
                      size={15}
                      strokeWidth={1.75}
                      className="text-greige transition-colors duration-300 group-hover:text-apricot"
                      aria-hidden
                    />
                    {CONTACT.email}
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 text-psmall text-linen transition-colors duration-300 hover:text-apricot"
                  >
                    <Linkedin
                      size={15}
                      strokeWidth={1.75}
                      className="text-greige transition-colors duration-300 group-hover:text-apricot"
                      aria-hidden
                    />
                    LinkedIn
                  </a>
                </li>
                <li className="inline-flex items-center gap-2.5 text-psmall text-greige">
                  <MapPin size={15} strokeWidth={1.75} aria-hidden />
                  {CONTACT.location}
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 font-mono text-mono-label uppercase text-greige">
                Statut
              </h2>
              <ul className="space-y-3">
                <li className="text-psmall text-greige">{CONTACT.status}</li>
                <li className="text-psmall text-greige">{CONTACT.formation}</li>
              </ul>
            </div>
          </div>
        </Reveal>

        {/* Ghost wordmark */}
        <Reveal delay={0.08}>
          <p
            aria-hidden
            className="mt-16 mb-8 select-none truncate text-display leading-none text-linen/15"
          >
            Quentin Singama
          </p>
        </Reveal>

        {/* Colophon */}
        <Reveal delay={0.16}>
          <div className="flex flex-col gap-3 font-mono text-mono-label uppercase text-greige sm:flex-row sm:justify-between">
            <span>© 2026 — Design &amp; code Quentin Singama</span>
            <span>Bordeaux, France</span>
          </div>
        </Reveal>
      </div>
    </footer>
  )
}
