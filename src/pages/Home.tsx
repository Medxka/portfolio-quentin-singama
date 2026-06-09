import * as React from "react"
import { Link } from "react-router-dom"
import Lenis from "lenis"
import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react"

/* ═══════════════════════════════════════════════════════════
   HOME V2 — système Robin Noguier
   Fond continu qui prend la couleur de chaque study,
   visuels inclinés flottants, nom en remplissage liquide.
   Patches DA + perf/a11y appliqués (reviews croisées).
   ═══════════════════════════════════════════════════════════ */

type Visual =
  | { kind: "img"; src: string; w: number; h: number; alt: string }
  | { kind: "crop"; src: string; ratio: string; alt: string }
  | { kind: "quote"; text: string; cite: string }
  | { kind: "grid"; srcs: string[] }

type Project = {
  id: string
  href: string
  title: string[]
  desc: string
  bg: string
  accent: string
  theme: "light" | "dark"
  tilt: string
  visual: Visual
  thumb?: { kind: "img"; src: string; w: number; h: number } | { kind: "stat"; big: string; lines: string }
}

const PROJECTS: Project[] = [
  {
    id: "musthane",
    href: "/musthane",
    title: ["Musthane"],
    desc: "Refondre la navigation d'un industriel B2B : 100+ produits, 4 logiques contradictoires, une seule évidence à la fin.",
    bg: "#DCE5EC",
    accent: "#1e3a5f",
    theme: "light",
    tilt: "-3deg",
    visual: { kind: "img", src: "/work/musthane-hero.webp", w: 1500, h: 1125, alt: "Refonte navigation Musthane sur MacBook" },
    thumb: { kind: "img", src: "/work/musthane-thumb.webp", w: 440, h: 956 },
  },
  {
    id: "research",
    href: "/research",
    title: ["Concerts"],
    desc: "Comment les 18-25 ans découvrent leurs concerts ? Sept entretiens, quatre insights, un brief retourné.",
    bg: "#1C2D3F",
    accent: "#8FB8E8",
    theme: "dark",
    tilt: "2.5deg",
    visual: {
      kind: "quote",
      text: "« Je sais qu'il y a un concert quelque part. Je sais pas où. Mais je sais. »",
      cite: "Léa, 21 ans — entretien n°4",
    },
    thumb: { kind: "stat", big: "7", lines: "entretiens menés · 4 insights majeurs" },
  },
  {
    id: "ink",
    href: "/ink",
    title: ["INK"],
    desc: "Une marque de résistance née en 48h de hackathon. Deux identités opposées, un univers complet. 2ᵉ place.",
    bg: "#120E0E",
    accent: "#E33125",
    theme: "dark",
    tilt: "-2.5deg",
    visual: { kind: "img", src: "/work/ink-hero.webp", w: 1440, h: 937, alt: "INK, identité dystopique rouge et noir" },
    thumb: { kind: "img", src: "/work/ink-thumb.webp", w: 460, h: 258 },
  },
  {
    id: "lina",
    href: "/lina",
    title: ["LINA"],
    desc: "Repenser la découverte en librairie indépendante. Refonte desktop et système d'icônes, en trois jours.",
    bg: "#E9E7F4",
    accent: "#4338CA",
    theme: "light",
    tilt: "3deg",
    visual: { kind: "crop", src: "/work/lina-hero.webp", ratio: "4 / 3", alt: "Refonte desktop LINA" },
    thumb: { kind: "img", src: "/work/lina-thumb.webp", w: 460, h: 276 },
  },
  {
    id: "happyjob",
    href: "/about",
    title: ["Happy", "Job"],
    desc: "Deux mois de stage en graphic design : campagnes de recrutement saisonnières pour un réseau d'agences.",
    bg: "#F4E9D8",
    accent: "#C2410C",
    theme: "light",
    tilt: "-2deg",
    visual: { kind: "grid", srcs: ["/work/hj-1.webp", "/work/hj-2.webp", "/work/hj-3.webp", "/work/hj-4.webp"] },
  },
]

const SECTION_BG = ["#F4F2EE", ...PROJECTS.map((p) => p.bg), "#141414"]

/* ─────────────────────────── Root (stateless) ─────────────────────────── */

export function Home() {
  const reduce = useReducedMotion()

  // Scroll inertiel — Lenis gère son propre rAF
  React.useEffect(() => {
    if (reduce) {
      window.scrollTo(0, 0)
      return
    }
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    lenis.scrollTo(0, { immediate: true })
    return () => lenis.destroy()
  }, [reduce])

  return (
    <div className="v2-root">
      <BgLayer colors={SECTION_BG} />
      <V2Cursor />
      <V2Nav />

      <Intro />

      {PROJECTS.map((p, i) => (
        <React.Fragment key={p.id}>
          <ProjectSection p={p} index={i} />
        </React.Fragment>
      ))}

      <ContactFooter idx={SECTION_BG.length - 1} />
    </div>
  )
}

/* ──────────── Calque de fond + dots (seul composant à re-render) ──────────── */

function BgLayer({ colors }: { colors: string[] }) {
  const [active, setActive] = React.useState(0)

  React.useEffect(() => {
    // Bande centrale du viewport : fiable quelle que soit la hauteur des sections
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.getAttribute("data-idx")))
        })
      },
      { rootMargin: "-45% 0% -45% 0%", threshold: 0 }
    )
    document.querySelectorAll("[data-idx]").forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div aria-hidden className="v2-bg" style={{ backgroundColor: colors[active] }} />
      <div className="fixed right-6 top-1/2 z-[90] hidden -translate-y-1/2 flex-col gap-2.5 mix-blend-difference lg:flex">
        {colors.map((_, i) => (
          <span
            key={i}
            className="w-[5px] rounded-full bg-white transition-all duration-500"
            style={{ height: i === active ? 24 : 5, opacity: i === active ? 1 : 0.4 }}
          />
        ))}
      </div>
    </>
  )
}

/* ─────────────────────────── Intro ─────────────────────────── */

function Intro() {
  return (
    <section data-idx={0} className="relative flex min-h-screen flex-col justify-center px-[6vw]">
      <h1 className="v2-name" aria-label="Quentin Singama">
        <span className="outline" aria-hidden="true">
          Quentin
          <br />
          Singama
        </span>
        <span className="fill" aria-hidden="true">
          Quentin
          <br />
          Singama
        </span>
      </h1>

      <div className="v2-late mt-11 flex flex-wrap items-end justify-between gap-6">
        <p className="max-w-[400px] text-[17px] leading-relaxed lg:text-[19px]">
          UX/UI Designer à Bordeaux. Je démêle le complexe, jusqu'à l'évidence.
        </p>
        <p className="text-right text-sm text-[#6d6862]">
          <strong className="block font-medium text-[#141414]">Disponible en alternance</strong>
          septembre 2026 · M2 ECV
        </p>
      </div>

      <p className="v2-later absolute bottom-8 left-[6vw] text-[13px] text-[#6d6862]">
        Scroll — cinq projets
      </p>
    </section>
  )
}

/* ──────────────────────── Section projet ──────────────────────── */

function ProjectSection({ p, index }: { p: Project; index: number }) {
  const ref = React.useRef<HTMLElement>(null)
  const reduce = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [70, -70])

  const ink = p.theme === "dark" ? "#EDE8E1" : "#141414"
  const muted = p.theme === "dark" ? "rgba(237,232,225,0.72)" : "rgba(20,20,20,0.78)"
  // Vignette inclinée à l'opposé du visuel principal (jamais de parallèles)
  const thumbTilt = p.tilt.startsWith("-") ? "2.5deg" : "-2.5deg"

  return (
    <section
      ref={ref}
      data-idx={index + 1}
      className="relative grid min-h-screen grid-cols-1 items-stretch px-5 lg:grid-cols-[minmax(340px,42%)_1fr] lg:pl-[6vw] lg:pr-0"
    >
      {/* Colonne gauche : texte en haut, vignette en bas — jamais de collision */}
      <div className="z-10 flex flex-col justify-between gap-10 pt-[15vh] pb-[9vh]">
        <div>
          <h2
            className="v2-serif"
            style={{
              color: p.accent,
              fontSize: "clamp(50px, 7.2vw, 122px)",
              lineHeight: 0.97,
              fontWeight: 640,
              letterSpacing: "-0.015em",
            }}
          >
            {p.title.map((line, li) => (
              <span key={line} className="block overflow-hidden pb-[0.06em]">
                <motion.span
                  className="block"
                  initial={reduce ? false : { y: "112%" }}
                  whileInView={{ y: "0%" }}
                  viewport={{ once: true, margin: "-12%" }}
                  transition={{ duration: 0.9, delay: li * 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="mt-6 max-w-[390px] text-[15.5px] leading-relaxed lg:text-[17px]" style={{ color: muted }}>
              {p.desc}
            </p>

            <Link
              to={p.href}
              data-cursor
              className="group mt-8 inline-flex items-center gap-2 border-b pb-1 text-[15px] font-medium"
              style={{ color: ink, borderColor: ink }}
            >
              Voir le case study <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        {/* Vignette secondaire — dans le flux, flottante */}
        {p.thumb && (
          <div
            className="v2-bob hidden w-[clamp(140px,13vw,210px)] lg:block"
            style={{ "--tilt": thumbTilt, animationDelay: "-3.2s", border: `3px solid ${p.accent}`, boxShadow: "0 22px 44px -18px rgba(0,0,0,0.35)" } as React.CSSProperties}
          >
            {p.thumb.kind === "img" ? (
              <img src={p.thumb.src} alt="" width={p.thumb.w} height={p.thumb.h} loading="lazy" decoding="async" className="block h-auto w-full" />
            ) : (
              <div className="bg-[#EDE8E1] px-4 py-4 text-[13px] leading-relaxed text-[#15202C]">
                <strong className="v2-serif block text-[30px] leading-none" style={{ fontWeight: 640 }}>
                  {p.thumb.big}
                </strong>
                {p.thumb.lines}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Colonne droite : visuel flottant incliné, cliquable (curseur « Voir → ») */}
      <div className="relative flex items-center justify-center py-8 lg:block lg:py-0">
        <div className="w-full lg:absolute lg:right-[3.5vw] lg:top-1/2 lg:w-auto lg:-translate-y-1/2">
          <motion.div style={{ y }}>
            <Link to={p.href} tabIndex={-1} aria-hidden="true" data-cursor className="block">
              <div className="v2-bob" style={{ "--tilt": p.tilt } as React.CSSProperties}>
                <ProjectVisual v={p.visual} eager={index === 0} />
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Visuels projets ──────────────────────── */

const VISUAL_SHADOW = "0 55px 100px -40px rgba(0,0,0,0.45)"

function ProjectVisual({ v, eager }: { v: Visual; eager?: boolean }) {
  if (v.kind === "img") {
    return (
      <img
        src={v.src}
        alt={v.alt}
        width={v.w}
        height={v.h}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "low" : undefined}
        decoding="async"
        className="block h-auto w-full lg:h-auto lg:max-h-[74vh] lg:w-auto lg:max-w-[50vw]"
        style={{ boxShadow: VISUAL_SHADOW }}
      />
    )
  }

  if (v.kind === "crop") {
    return (
      <div
        className="w-full overflow-hidden lg:w-[min(48vw,860px)]"
        style={{ aspectRatio: v.ratio, boxShadow: VISUAL_SHADOW }}
      >
        <img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      </div>
    )
  }

  if (v.kind === "quote") {
    return (
      <div
        className="flex w-full flex-col justify-center bg-[#121C26] p-[8%] lg:w-[min(48vw,860px)]"
        style={{ aspectRatio: "16 / 10.5", boxShadow: VISUAL_SHADOW }}
      >
        <blockquote
          className="v2-serif max-w-[21ch] text-[#EDE8E1]"
          style={{ fontSize: "clamp(19px, 2.5vw, 37px)", lineHeight: 1.2, fontWeight: 560 }}
        >
          {v.text}
        </blockquote>
        <cite className="mt-6 text-[13.5px] not-italic text-[#8fa3b8]">{v.cite}</cite>
      </div>
    )
  }

  return (
    <div
      className="grid w-full grid-cols-4 overflow-hidden lg:w-[min(48vw,860px)]"
      style={{ aspectRatio: "16 / 10.5", boxShadow: VISUAL_SHADOW }}
    >
      {v.srcs.map((s) => (
        <img key={s} src={s} alt="" width={700} height={989} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ))}
    </div>
  )
}

/* ─────────────────────────── Footer ─────────────────────────── */

function ContactFooter({ idx }: { idx: number }) {
  return (
    <footer data-idx={idx} className="relative flex min-h-[92vh] flex-col justify-center px-[6vw] text-[#F4F2EE]">
      <p className="max-w-[620px] text-[20px] leading-snug lg:text-[28px]">
        Une alternance, un stage court, ou juste envie de parler design — j'écoute.
      </p>
      <a
        href="mailto:quentinsingama974@gmail.com"
        data-cursor
        className="v2-serif mt-9 inline-block w-fit border-b-[3px] border-transparent break-all italic transition-colors duration-300 hover:border-[#F4F2EE]"
        style={{ fontSize: "clamp(20px, 4.4vw, 70px)", fontWeight: 600, letterSpacing: "-0.015em" }}
      >
        quentinsingama974@gmail.com
      </a>
      <div className="absolute bottom-9 left-[6vw] right-[6vw] flex flex-wrap justify-between gap-4 text-sm text-[#8d8880]">
        <span>
          <a href="https://www.linkedin.com/in/quentin-singama-1b36b31b9/" target="_blank" rel="noopener noreferrer" className="mr-6 transition-colors hover:text-[#F4F2EE]">
            LinkedIn
          </a>
          <Link to="/about" className="transition-colors hover:text-[#F4F2EE]">
            About
          </Link>
        </span>
        <span>Bordeaux · 2026</span>
      </div>
    </footer>
  )
}

/* ──────────────────────── Chrome (nav, curseur) ──────────────────────── */

function V2Nav() {
  const reduce = useReducedMotion()
  return (
    <nav className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between px-5 py-5 text-[13px] uppercase tracking-[0.1em] text-white mix-blend-difference lg:px-10 lg:py-6">
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })}
        className="font-medium"
      >
        Quentin Singama
      </button>
      <Link to="/about" className="opacity-80 transition-opacity hover:opacity-100">
        About
      </Link>
    </nav>
  )
}

function V2Cursor() {
  const reduce = useReducedMotion()
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)
  const sx = useSpring(mx, { stiffness: 380, damping: 32 })
  const sy = useSpring(my, { stiffness: 380, damping: 32 })
  const [on, setOn] = React.useState(false)

  React.useEffect(() => {
    if (reduce) return
    const move = (e: MouseEvent) => {
      mx.set(e.clientX)
      my.set(e.clientY)
    }
    const over = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-cursor]")) setOn(true)
    }
    const out = (e: MouseEvent) => {
      if ((e.target as Element).closest?.("[data-cursor]")) setOn(false)
    }
    window.addEventListener("mousemove", move, { passive: true })
    document.addEventListener("mouseover", over)
    document.addEventListener("mouseout", out)
    return () => {
      window.removeEventListener("mousemove", move)
      document.removeEventListener("mouseover", over)
      document.removeEventListener("mouseout", out)
    }
  }, [mx, my, reduce])

  if (reduce) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden h-[92px] w-[92px] items-center justify-center rounded-full bg-white text-[14px] font-medium text-black mix-blend-difference lg:flex"
      style={{ x: sx, y: sy, marginLeft: -46, marginTop: -46 }}
      animate={{ scale: on ? 1 : 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      Voir →
    </motion.div>
  )
}
