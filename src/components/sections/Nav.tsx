import * as React from "react"
import {
  Plus,
  ArrowRight,
  Compass,
  Search,
  Sparkles,
  BookOpen,
  Palette,
  PenTool,
  MousePointerClick,
  Boxes,
  ScanSearch,
  Briefcase,
  Clapperboard,
  GraduationCap,
  type LucideIcon,
} from "lucide-react"
import { PillButton } from "../ui/PillButton"
import { PROJECTS, SKILLS, TIMELINE } from "../../content"

type MenuId = "projets" | "process" | "parcours"

/** Icônes Lucide par contenu (projets par id, compétences/parcours par ordre). */
const PROJECT_ICONS: Record<string, LucideIcon> = {
  musthane: Compass,
  research: Search,
  ink: Sparkles,
  lina: BookOpen,
  happyjob: Palette,
}
const SKILL_ICONS: LucideIcon[] = [
  Search,
  PenTool,
  MousePointerClick,
  Boxes,
  ScanSearch,
  Palette,
]
const TIMELINE_ICONS: LucideIcon[] = [
  Briefcase,
  Clapperboard,
  GraduationCap,
  PenTool,
]

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

/* Bouton de menu : texte + "+" (icône Lucide Plus qui tourne en "×") */
.mega-plus {
  margin-left: 0.55em;
  color: var(--color-apricot);
  transition: transform 0.28s ease-out, opacity 0.28s ease-out;
}
.mega-btn[data-active="true"] .mega-plus { transform: rotate(45deg); }
.mega-btn[data-dim="true"] .mega-plus { opacity: 0.3; }

/* Tuile au hover : swap vertical icône → flèche (l'icône sort par le haut,
   la flèche monte depuis le bas). Roll propre, pas de bloc qui balaye. */
.tile-icon,
.tile-arrow {
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease;
}
.tile-arrow { opacity: 0; transform: translateY(115%); }
.mega-tile:hover .tile-icon { opacity: 0; transform: translateY(-115%); }
.mega-tile:hover .tile-arrow { opacity: 1; transform: translateY(0); }
.mega-tile:hover .tile-badge {
  border-color: color-mix(in oklch, var(--color-apricot) 45%, transparent);
  background-color: color-mix(in oklch, var(--color-apricot) 10%, transparent);
}
.tile-badge { transition: border-color 0.3s ease, background-color 0.3s ease; }

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
/* Corps du panneau : la hauteur s'anime au changement de menu (JS mesure). */
.mega-body {
  overflow: hidden;
  transition: height 0.42s cubic-bezier(0.16, 1, 0.3, 1);
}
@keyframes mega-in {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.mega-panel { display: none; }
.mega-panel[data-active="true"] {
  display: block;
  animation: mega-in 0.42s cubic-bezier(0.16, 1, 0.3, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .nav-drop,
  .nav-line { animation: none; }
  .mega-body { transition: none; }
  .mega-panel[data-active="true"] { animation: none; }
  .mega-overlay,
  .mega-wrap,
  .mega-plus,
  .tile-icon,
  .tile-arrow { transition: none; }
}
`

/* Effet scramble/decode sur le texte des liens (façon effortel). */
function useScramble(text: string) {
  const [out, setOut] = React.useState(text)
  const timer = React.useRef<number | null>(null)

  const run = React.useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%$/"
    let it = 0
    if (timer.current) window.clearInterval(timer.current)
    timer.current = window.setInterval(() => {
      setOut(
        text
          .split("")
          .map((c, i) =>
            i < it ? text[i] : chars[Math.floor(Math.random() * chars.length)]
          )
          .join("")
      )
      if (it >= text.length) {
        if (timer.current) window.clearInterval(timer.current)
        setOut(text)
      }
      it += 0.5
    }, 35)
  }, [text])

  React.useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current)
    },
    []
  )

  return { out, run }
}

function NavLink({
  menu,
  active,
  dim,
  onOpen,
  onNavigate,
}: {
  menu: { id: MenuId; label: string; href: string }
  active: boolean
  dim: boolean
  onOpen: (id: MenuId) => void
  onNavigate: (href: string) => void
  key?: React.Key | null
}) {
  const { out, run } = useScramble(menu.label)
  return (
    <button
      type="button"
      onMouseEnter={() => {
        run()
        onOpen(menu.id)
      }}
      onFocus={() => run()}
      onClick={() => onNavigate(menu.href)}
      aria-expanded={active}
      data-active={active}
      data-dim={dim}
      className="mega-btn inline-flex items-center font-mono text-mono-label uppercase tracking-[0.04em] text-greige transition-colors duration-300 hover:text-linen data-[active=true]:text-linen"
    >
      {out}
      <Plus className="mega-plus" size={14} strokeWidth={2} aria-hidden />
    </button>
  )
}

/* ── Panneaux ─────────────────────────────────────────────── */

function IconBadge({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="tile-badge relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-linen/10 bg-linen/[0.04]">
      <span className="tile-icon absolute inset-0 grid place-items-center text-apricot">
        <Icon size={17} strokeWidth={1.75} aria-hidden />
      </span>
      <span className="tile-arrow absolute inset-0 grid place-items-center text-apricot">
        <ArrowRight size={17} strokeWidth={2} aria-hidden />
      </span>
    </span>
  )
}

function Tile({
  Icon,
  title,
  sub,
  href,
  onNav,
}: {
  Icon: LucideIcon
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
      className="mega-tile group flex flex-col gap-3 rounded-2xl border border-linen/10 bg-linen/[0.03] p-4 transition-colors duration-300 hover:border-linen/20 hover:bg-linen/[0.06]"
    >
      <IconBadge Icon={Icon} />
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
          <span className="mb-1 inline-flex items-center gap-2 font-mono text-mono-label text-apricot">
            <Compass size={15} strokeWidth={1.75} aria-hidden />
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
            Icon={PROJECT_ICONS[p.id] ?? Sparkles}
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
          Icon={SKILL_ICONS[i] ?? Boxes}
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
      {TIMELINE.map((t, i) => {
        const Icon = TIMELINE_ICONS[i] ?? Briefcase
        return (
          <a
            key={t.year + t.role}
            href="#parcours"
            onClick={onNav}
            className="mega-tile group flex items-center gap-4 rounded-2xl border border-linen/10 bg-linen/[0.03] p-4 transition-colors duration-300 hover:border-linen/20 hover:bg-linen/[0.06]"
          >
            <IconBadge Icon={Icon} />
            <div className="flex flex-1 flex-col gap-0.5 md:grid md:grid-cols-[5rem_1fr_1.5fr] md:items-center md:gap-5">
              <span className="font-mono text-psmall text-apricot">{t.year}</span>
              <span className="font-sans text-h5 text-linen">{t.role}</span>
              <span className="text-psmall text-greige">{t.company}</span>
            </div>
          </a>
        )
      })}
    </div>
  )
}

/* ── Nav ──────────────────────────────────────────────────── */

export function Nav() {
  const [open, setOpen] = React.useState<MenuId | null>(null)
  // `shown` retarde le démontage du contenu pour qu'il fade avec le panneau
  // au lieu de disparaître d'un coup à la fermeture.
  const [shown, setShown] = React.useState<MenuId | null>(null)
  React.useEffect(() => {
    if (open) {
      setShown(open)
      return
    }
    const t = window.setTimeout(() => setShown(null), 480)
    return () => window.clearTimeout(t)
  }, [open])

  // Anime la hauteur du panneau au changement de menu (instantané à
  // l'ouverture depuis fermé, le fade du panneau masque le saut).
  const bodyRef = React.useRef<HTMLDivElement>(null)
  const innerRef = React.useRef<HTMLDivElement>(null)
  const prevShown = React.useRef<MenuId | null>(null)
  React.useLayoutEffect(() => {
    const body = bodyRef.current
    const inner = innerRef.current
    if (body && inner && shown) {
      const openingFromClosed = prevShown.current === null
      if (openingFromClosed) body.style.transition = "none"
      body.style.height = `${inner.offsetHeight}px`
      if (openingFromClosed) {
        void body.offsetHeight
        body.style.transition = ""
      }
    }
    prevShown.current = shown
  }, [shown])

  // Escape ferme le menu.
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  // Hover-intent : ouvre au survol, ferme avec un léger délai (le curseur
  // peut traverser le vide entre la barre et le panneau sans refermer).
  const closeTimer = React.useRef<number | null>(null)
  const cancelClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current)
  }
  const openNow = (id: MenuId) => {
    cancelClose()
    setOpen(id)
  }
  const scheduleClose = () => {
    cancelClose()
    closeTimer.current = window.setTimeout(() => setOpen(null), 160)
  }
  const close = () => {
    cancelClose()
    setOpen(null)
  }
  const navigateTo = (href: string) => {
    close()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

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
          <div
            className="absolute left-1/2 hidden -translate-x-1/2 md:block"
            onMouseLeave={scheduleClose}
          >
            <div className="nav-drop nav-drop-1 flex items-center gap-10">
              {MENUS.map((m) => (
                <NavLink
                  key={m.id}
                  menu={m}
                  active={open === m.id}
                  dim={open !== null && open !== m.id}
                  onOpen={openNow}
                  onNavigate={navigateTo}
                />
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
          onMouseEnter={cancelClose}
          onMouseLeave={scheduleClose}
        >
          <div
            ref={bodyRef}
            className="mega-body rounded-3xl border border-linen/10 bg-espresso-2/90 shadow-2xl backdrop-blur-2xl"
          >
            <div ref={innerRef} className="max-h-[72vh] overflow-auto p-5">
              <div className="mega-panel" data-active={shown === "projets"}>
                <ProjetsPanel onNav={close} />
              </div>
              <div className="mega-panel" data-active={shown === "process"}>
                <ProcessPanel onNav={close} />
              </div>
              <div className="mega-panel" data-active={shown === "parcours"}>
                <ParcoursPanel onNav={close} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
