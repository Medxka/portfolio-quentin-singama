import { PillButton } from "../ui/PillButton"

const LINKS = [
  { label: "Projets", href: "#projets" },
  { label: "Process", href: "#process" },
  { label: "Parcours", href: "#parcours" },
]

/**
 * Nav — design & animation repris d'effortel.com :
 * barre fixe espresso + backdrop-blur(30px), overflow-hidden ; au chargement
 * les items "tombent" en place depuis le haut (translateY -170% → 0) en
 * cascade, et le hairline du bas se dessine (scaleX 0 → 1 depuis la gauche).
 * Liens = pills outline (comme les .button_nav d'effortel). Entrée en CSS pur
 * (keyframes + fill both) : se joue toujours au montage, sans dépendre de JS.
 */
const NAV_CSS = `
@keyframes nav-drop {
  from { transform: translateY(-170%); }
  to { transform: translateY(0); }
}
@keyframes nav-line {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
.nav-drop {
  animation: nav-drop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
}
.nav-drop-0 { animation-delay: 0.15s; }
.nav-drop-1 { animation-delay: 0.24s; }
.nav-drop-2 { animation-delay: 0.33s; }
.nav-line {
  transform-origin: left center;
  animation: nav-line 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}
@media (prefers-reduced-motion: reduce) {
  .nav-drop,
  .nav-line {
    animation: none;
  }
}
`

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-espresso/85 backdrop-blur-[30px]">
      <style>{NAV_CSS}</style>

      <nav
        aria-label="Navigation principale"
        className="shell flex h-16 items-center justify-between gap-4"
      >
        <a
          href="#top"
          className="nav-drop nav-drop-0 inline-flex items-center gap-2.5 font-sans font-bold tracking-tight text-linen"
        >
          <span aria-hidden className="h-2 w-2 rounded-[2px] bg-apricot" />
          Quentin Singama
        </a>

        <div className="nav-drop nav-drop-1 hidden items-center gap-2 md:flex">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-[0.63em] border border-linen/20 px-4 py-2 font-mono text-mono-label uppercase text-greige transition-[color,border-color,background-color] duration-300 ease-[var(--ease-out-expo)] hover:border-linen/45 hover:bg-linen/[0.06] hover:text-linen"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="nav-drop nav-drop-2">
          <PillButton href="#contact" variant="solid">
            Me contacter
          </PillButton>
        </div>
      </nav>

      {/* hairline du bas qui se dessine depuis la gauche (.nav__spr) */}
      <span
        aria-hidden
        className="nav-line absolute inset-x-0 bottom-0 h-px bg-linen/12"
      />
    </header>
  )
}
