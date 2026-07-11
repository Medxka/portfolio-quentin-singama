import { PillButton } from "../ui/PillButton"

const LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "Process", href: "#process" },
  { label: "Parcours", href: "#parcours" },
]

/**
 * Nav — fixed top bar: wordmark left, mono anchors center, CTA right.
 * Espresso at 90% + blur keeps content legible while scrolling under it.
 */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-linen/10 bg-espresso/90 backdrop-blur-sm">
      <div className="shell flex h-16 flex-row items-center justify-between">
        <a
          href="#top"
          className="inline-flex items-center gap-2.5 font-sans font-bold tracking-tight text-linen"
        >
          <span
            aria-hidden
            className="h-2 w-2 rounded-[2px] bg-apricot"
          />
          Quentin Singama
        </a>

        <nav
          aria-label="Navigation principale"
          className="hidden items-center gap-8 md:flex"
        >
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-greige hover:text-linen"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <PillButton href="#contact" variant="solid">
          Me contacter
        </PillButton>
      </div>
    </header>
  )
}
