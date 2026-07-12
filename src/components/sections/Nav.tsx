import * as React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
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
  type LucideIcon,
} from "lucide-react"
import { PillButton } from "../ui/PillButton"
import { PROJECTS, SKILLS } from "../../content"

type MenuId = "projets" | "process"

/** Icônes Lucide par contenu (projets par id, compétences par ordre). */
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

const MENUS: { id: MenuId; label: string; href: string }[] = [
  { id: "projets", label: "Projets", href: "#projets" },
  { id: "process", label: "Savoir-faire", href: "#process" },
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
  background-color: color-mix(in oklch, var(--color-apricot) 14%, transparent);
}
.tile-badge { transition: background-color 0.3s ease; }

/* Accordéon Projets : l'item survolé s'agrandit et révèle son image,
   les autres se réduisent (spine vertical). */
.acc-item {
  flex: 1 1 0%;
  min-width: 0;
  transition: flex-grow 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.acc-item[data-active="true"] { flex-grow: 3.4; }
.acc-img,
.acc-grad {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.acc-img {
  object-fit: cover;
  opacity: 0.22;
  filter: brightness(0.7) saturate(0.85);
  transform: scale(1.06);
  transition: opacity 0.55s ease, filter 0.55s ease,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}
.acc-item[data-active="true"] .acc-img {
  opacity: 1;
  filter: brightness(0.85) saturate(1);
  transform: scale(1);
}
.acc-grad {
  background: linear-gradient(135deg, oklch(0.42 0.09 60), oklch(0.28 0.05 38));
  opacity: 0.4;
  transition: opacity 0.55s ease;
}
.acc-item[data-active="true"] .acc-grad { opacity: 0.9; }
.acc-veil {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    oklch(0.18 0.015 55 / 0.92) 6%,
    oklch(0.18 0.015 55 / 0.35) 52%,
    transparent 88%
  );
}
.acc-vlabel {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  writing-mode: vertical-rl;
  transform: translateX(-50%) rotate(180deg);
  white-space: nowrap;
  font-family: var(--font-mono);
  font-size: 0.82rem;
  letter-spacing: 0.03em;
  color: var(--color-linen);
  transition: opacity 0.35s ease 0.1s;
}
.acc-item[data-active="true"] .acc-vlabel { opacity: 0; pointer-events: none; }
/* largeur FIXE : le contenu ne se recompose pas quand l'item rétrécit,
   il est simplement clippé (overflow hidden) et fondu. */
.acc-content {
  position: absolute;
  left: 0;
  bottom: 0;
  width: clamp(15rem, 30vw, 24rem);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1.5rem;
  opacity: 0;
  transition: opacity 0.3s ease;
}
.acc-item[data-active="true"] .acc-content { opacity: 1; }

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
  .tile-arrow,
  .acc-item,
  .acc-img,
  .acc-grad,
  .acc-vlabel,
  .acc-content { transition: none; }
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
            c === " " || c === "-"
              ? c
              : i < it
                ? text[i]
                : chars[Math.floor(Math.random() * chars.length)]
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
    <span className="tile-badge relative inline-flex h-9 w-9 shrink-0 overflow-hidden rounded-xl bg-linen/[0.06]">
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
      className="mega-tile group flex flex-col gap-3 rounded-2xl bg-linen/[0.03] p-4 transition-colors duration-300 hover:bg-linen/[0.07]"
    >
      <IconBadge Icon={Icon} />
      <span className="font-sans text-h5 text-linen">{title}</span>
      <span className="text-psmall text-greige">{sub}</span>
    </a>
  )
}

function ProjetsPanel({ onNav }: { onNav: () => void }) {
  const [hovered, setHovered] = React.useState<string | null>(null)
  const activeId = hovered ?? PROJECTS[0].id
  return (
    <div
      className="flex h-[clamp(300px,42vh,360px)] gap-2"
      onMouseLeave={() => setHovered(null)}
    >
      {PROJECTS.map((p) => {
        const active = p.id === activeId
        const Icon = PROJECT_ICONS[p.id] ?? Sparkles
        return (
          <a
            key={p.id}
            href="#projets"
            onClick={onNav}
            onMouseEnter={() => setHovered(p.id)}
            onFocus={() => setHovered(p.id)}
            data-active={active}
            aria-label={`${p.title} — ${p.role}`}
            className="acc-item relative block overflow-hidden rounded-2xl bg-espresso-3"
          >
            {p.image ? (
              <img
                src={p.image}
                alt={p.imageAlt}
                loading="lazy"
                className="acc-img"
              />
            ) : (
              <div className="acc-grad" aria-hidden />
            )}
            <div className="acc-veil" aria-hidden />

            {/* spine vertical (item réduit) */}
            <span className="acc-vlabel" aria-hidden>
              <span className="text-apricot">{p.num}</span>
              {" "}
              {p.title}
            </span>

            {/* contenu (item actif) */}
            <div className="acc-content">
              <span className="inline-flex items-center gap-2 font-mono text-mono-label text-apricot">
                <Icon size={14} strokeWidth={1.75} aria-hidden />
                {p.num}
              </span>
              <span className="mt-2 whitespace-nowrap font-sans text-h4 text-linen">
                {p.title}
              </span>
              <span className="mt-1 whitespace-nowrap font-mono text-mono-label uppercase text-apricot-bright">
                {p.role}
              </span>
              <span className="mt-2.5 max-w-[32ch] text-psmall text-linen/80">
                {p.desc}
              </span>
              <span className="mt-4 inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-mono-label uppercase text-linen">
                Voir le projet
                <ArrowRight size={14} strokeWidth={2} aria-hidden />
              </span>
            </div>
          </a>
        )
      })}
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

/* Lien de page (À propos) : même effet scramble, mais navigue au lieu
   d'ouvrir un méga-menu. */
function NavPageLink({
  label,
  to,
  onHover,
}: {
  label: string
  to: string
  onHover: () => void
}) {
  const { out, run } = useScramble(label)
  return (
    <Link
      to={to}
      onMouseEnter={() => {
        run()
        onHover()
      }}
      onFocus={() => run()}
      className="mega-btn inline-flex items-center font-mono text-mono-label uppercase tracking-[0.04em] text-greige transition-colors duration-300 hover:text-linen"
    >
      {out}
    </Link>
  )
}

/* ── Nav ──────────────────────────────────────────────────── */

export function Nav() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
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
  const openNow = (id: MenuId | null) => {
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
  // Ancre de section : sur l'accueil on scrolle, sinon on y navigue (le
  // routeur gère le scroll vers l'ancre via le hash de l'URL).
  const navigateTo = (href: string) => {
    close()
    if (pathname === "/") {
      const el = document.querySelector(href)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    } else {
      navigate(`/${href}`)
    }
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 overflow-hidden bg-espresso/85 backdrop-blur-[30px]">
        <style>{NAV_CSS}</style>

        <nav
          aria-label="Navigation principale"
          className="shell relative flex h-16 items-center justify-between gap-4"
        >
          <Link
            to="/"
            onClick={() => {
              close()
              if (pathname === "/")
                window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="nav-drop nav-drop-0 inline-flex items-center gap-2.5 font-sans font-bold tracking-tight text-linen"
          >
            <span aria-hidden className="h-2 w-2 rounded-[2px] bg-apricot" />
            Quentin Singama
          </Link>

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
              <NavPageLink
                label="À propos"
                to="/about"
                onHover={() => openNow(null)}
              />
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
            className="mega-body rounded-3xl bg-espresso-2/90 shadow-2xl ring-1 ring-linen/[0.04] backdrop-blur-2xl"
          >
            <div ref={innerRef} className="max-h-[72vh] overflow-auto p-5">
              <div className="mega-panel" data-active={shown === "projets"}>
                <ProjetsPanel onNav={close} />
              </div>
              <div className="mega-panel" data-active={shown === "process"}>
                <ProcessPanel onNav={close} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
