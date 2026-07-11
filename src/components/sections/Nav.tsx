import * as React from "react"
import { PillButton } from "../ui/PillButton"
import { PROJECTS, SKILLS, TIMELINE } from "../../content"

type MenuId = "projets" | "process" | "parcours"

const MENUS: { id: MenuId; label: string; href: string }[] = [
  { id: "projets", label: "Projets", href: "#projets" },
  { id: "process", label: "Process", href: "#process" },
  { id: "parcours", label: "Parcours", href: "#parcours" },
]

/**
 * Nav — design & animation repris d'effortel.com :
 * - barre fixe espresso + backdrop-blur(30px), overflow-hidden ; les items
 *   "tombent" en place depuis le haut (translateY -170% → 0) en cascade.
 * - liens = texte + "+" ; cliquer ouvre un méga-menu (le "+" tourne en "×",
 *   les autres "+" s'estompent). Overlay flou + panneau glassy dont le contenu
 *   monte de 24px en fondu (.nav__overlay / .floating__nav-modules).
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
.nav-drop { animation: nav-drop 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
.nav-drop-0 { animation-delay: 0.15s; }
.nav-drop-1 { animation-delay: 0.24s; }
.nav-drop-2 { animation-delay: 0.33s; }
.nav-line {
  transform-origin: left center;
  animation: nav-line 0.9s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
}

/* Bouton de menu : texte + "+" */
.mega-plus {
  position: relative;
  display: inline-block;
  width: 0.72em;
  height: 0.62em;
  margin-left: 0.65em;
  color: var(--color-apricot);
  transition: transform 0.28s ease-out, opacity 0.28s ease-out;
}
.mega-plus::before,
.mega-plus::after {
  content: "";
  position: absolute;
  background: currentColor;
  border-radius: 1px;
}
.mega-plus::before { left: 0; right: 0; top: 50%; height: 1.4px; transform: translateY(-50%); }
.mega-plus::after { top: 0; bottom: 0; left: 50%; width: 1.4px; transform: translateX(-50%); }
.mega-btn[data-active="true"] .mega-plus { transform: rotate(45deg); }
.mega-btn[data-dim="true"] .mega-plus { opacity: 0.3; }

/* Overlay + panneau */
.mega-root {
  position: fixed;
  inset: 0;
  z-index: 40;
  pointer-events: none;
}
.mega-root[data-open="true"] { pointer-events: auto; }
.mega-overlay {
  position: absolute;
  inset: 0;
  background: oklch(0.16 0.014 55 / 0.6);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  opacity: 0;
  transition: opacity 0.4s ease-in-out;
}
.mega-root[data-open="true"] .mega-overlay { opacity: 1; }
.mega-wrap {
  position: absolute;
  top: 4.75rem;
  left: 50%;
  width: min(1080px, 92vw);
  transform: translate(-50%, 24px);
  opacity: 0;
  transition: opacity 0.45s ease-out,
    transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.mega-root[data-open="true"] .mega-wrap { transform: translate(-50%, 0); opacity: 1; }
.mega-panel { display: none; }
.mega-panel[data-active="true"] { display: block; }

@media (prefers-reduced-motion: reduce) {
  .nav-drop,
  .nav-line { animation: none; }
  .mega-overlay,
  .mega-wrap,
  .mega-plus { transition: none; }
}
`

/* ── Panneaux ─────────────────────────────────────────────── */

function Tile({
  num,
  title,
  sub,
  href,
  onNav,
}: {
  num?: string
  title: string
  sub: string
  href: string
  onNav: () => void
  key?: React.Key | null
}) {
  return (
    <a
      href={href}
      onClick={onNav}
      className="group flex flex-col gap-2 rounded-2xl border border-linen/10 bg-linen/[0.03] p-4 transition-colors duration-300 hover:border-linen/20 hover:bg-linen/[0.06]"
    >
      {num && (
        <span className="font-mono text-mono-label text-apricot">{num}</span>
      )}
      <span className="font-sans text-h5 text-linen">{title}</span>
      <span className="text-psmall text-greige">{sub}</span>
    </a>
  )
}

function ProjetsPanel({ onNav }: { onNav: () => void }) {
  const [featured, ...rest] = PROJECTS
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <a
        href="#projets"
        onClick={onNav}
        className="group flex flex-col overflow-hidden rounded-2xl border border-linen/10 bg-linen/[0.03] transition-colors duration-300 hover:border-linen/20 hover:bg-linen/[0.06]"
      >
        {featured.image && (
          <div className="overflow-hidden">
            <img
              src={featured.image}
              alt={featured.imageAlt}
              loading="lazy"
              className="h-44 w-full object-cover transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-105"
            />
          </div>
        )}
        <div className="flex flex-col gap-1.5 p-5">
          <span className="font-mono text-mono-label text-apricot">
            {featured.num} · Projet phare
          </span>
          <span className="font-sans text-h4 text-linen">{featured.title}</span>
          <span className="text-psmall text-greige">{featured.desc}</span>
        </div>
      </a>

      <div className="grid grid-cols-2 gap-3">
        {rest.map((p) => (
          <Tile
            key={p.id}
            num={p.num}
            title={p.title}
            sub={p.role}
            href="#projets"
            onNav={onNav}
          />
        ))}
      </div>
    </div>
  )
}

function ProcessPanel({ onNav }: { onNav: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
      {SKILLS.map((s, i) => (
        <Tile
          key={s.name}
          num={String(i + 1).padStart(2, "0")}
          title={s.name}
          sub={s.desc}
          href="#process"
          onNav={onNav}
        />
      ))}
    </div>
  )
}

function ParcoursPanel({ onNav }: { onNav: () => void }) {
  return (
    <div className="flex flex-col gap-2">
      {TIMELINE.map((t) => (
        <a
          key={t.year + t.role}
          href="#parcours"
          onClick={onNav}
          className="grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 rounded-2xl border border-linen/10 bg-linen/[0.03] p-4 transition-colors duration-300 hover:border-linen/20 hover:bg-linen/[0.06] md:grid-cols-[6rem_1fr_1.4fr]"
        >
          <span className="font-mono text-psmall text-apricot">{t.year}</span>
          <span className="font-sans text-h5 text-linen">{t.role}</span>
          <span className="col-span-2 text-psmall text-greige md:col-span-1">
            {t.company}
          </span>
        </a>
      ))}
    </div>
  )
}

/* ── Nav ──────────────────────────────────────────────────── */

export function Nav() {
  const [open, setOpen] = React.useState<MenuId | null>(null)

  // Escape ferme le menu.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Verrou du scroll pendant l'ouverture.
  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  const toggle = (id: MenuId) => setOpen((cur) => (cur === id ? null : id))
  const close = () => setOpen(null)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-espresso/85 backdrop-blur-[30px]">
        <style>{NAV_CSS}</style>

        <nav
          aria-label="Navigation principale"
          className="shell relative flex h-16 items-center justify-between gap-4"
        >
          <a
            href="#top"
            onClick={close}
            className="nav-drop nav-drop-0 inline-flex items-center gap-2.5 font-sans font-bold tracking-tight text-linen"
          >
            <span aria-hidden className="h-2 w-2 rounded-[2px] bg-apricot" />
            Quentin Singama
          </a>

          {/* liens centrés dead-center (.dropdown__wrapper d'effortel) */}
          <div className="absolute left-1/2 hidden -translate-x-1/2 md:block">
            <div className="nav-drop nav-drop-1 flex items-center gap-10">
              {MENUS.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => toggle(m.id)}
                  aria-expanded={open === m.id}
                  data-active={open === m.id}
                  data-dim={open !== null && open !== m.id}
                  className="mega-btn inline-flex items-center font-mono text-mono-label uppercase tracking-[0.04em] text-greige transition-colors duration-300 hover:text-linen data-[active=true]:text-linen"
                >
                  {m.label}
                  <span className="mega-plus" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <div className="nav-drop nav-drop-2">
            <PillButton href="#contact" variant="solid">
              Me contacter
            </PillButton>
          </div>
        </nav>

        <span
          aria-hidden
          className="nav-line absolute inset-x-0 bottom-0 h-px bg-linen/12"
        />
      </header>

      {/* Méga-menu : overlay flou + panneau glassy (.nav__overlay / modules) */}
      <div className="mega-root" data-open={open !== null} onClick={close}>
        <div className="mega-overlay" aria-hidden />
        <div
          className="mega-wrap"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navigation"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="max-h-[72vh] overflow-auto rounded-3xl border border-linen/10 bg-espresso-2/90 p-5 shadow-2xl backdrop-blur-2xl">
            <div className="mega-panel" data-active={open === "projets"}>
              <ProjetsPanel onNav={close} />
            </div>
            <div className="mega-panel" data-active={open === "process"}>
              <ProcessPanel onNav={close} />
            </div>
            <div className="mega-panel" data-active={open === "parcours"}>
              <ParcoursPanel onNav={close} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
