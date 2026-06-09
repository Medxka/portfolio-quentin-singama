import * as React from "react"
import { Link } from "react-router-dom"
import Lenis from "lenis"
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react"

/* ═══════════════════════════════════════════════════════════
   HOME V2.1 — slider scroll-driven (système Robin complet)
   La page se fige : le scroll fait défiler les visuels,
   le fond et le texte suivent en continu.
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
  ry: string // rotation perspective Y (carte de biais)
  visual: Visual
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
    ry: "-7deg",
    visual: { kind: "img", src: "/work/musthane-hero.webp", w: 1500, h: 1125, alt: "Refonte navigation Musthane sur MacBook" },
  },
  {
    id: "research",
    href: "/research",
    title: ["Concerts"],
    desc: "Comment les 18-25 ans découvrent leurs concerts ? Sept entretiens, quatre insights, un brief retourné.",
    bg: "#1C2D3F",
    accent: "#8FB8E8",
    theme: "dark",
    ry: "7deg",
    visual: {
      kind: "quote",
      text: "« Je sais qu'il y a un concert quelque part. Je sais pas où. Mais je sais. »",
      cite: "Léa, 21 ans — entretien n°4",
    },
  },
  {
    id: "ink",
    href: "/ink",
    title: ["INK"],
    desc: "Une marque de résistance née en 48h de hackathon. Deux identités opposées, un univers complet. 2ᵉ place.",
    bg: "#120E0E",
    accent: "#E33125",
    theme: "dark",
    ry: "-7deg",
    visual: { kind: "img", src: "/work/ink-hero.webp", w: 1440, h: 937, alt: "INK, identité dystopique rouge et noir" },
  },
  {
    id: "lina",
    href: "/lina",
    title: ["LINA"],
    desc: "Repenser la découverte en librairie indépendante. Refonte desktop et système d'icônes, en trois jours.",
    bg: "#E9E7F4",
    accent: "#4338CA",
    theme: "light",
    ry: "7deg",
    visual: { kind: "crop", src: "/work/lina-hero.webp", ratio: "4 / 3", alt: "Refonte desktop LINA" },
  },
  {
    id: "happyjob",
    href: "/about",
    title: ["Happy", "Job"],
    desc: "Deux mois de stage en graphic design : campagnes de recrutement saisonnières pour un réseau d'agences.",
    bg: "#F4E9D8",
    accent: "#C2410C",
    theme: "light",
    ry: "-7deg",
    visual: { kind: "grid", srcs: ["/work/hj-1.webp", "/work/hj-2.webp", "/work/hj-3.webp", "/work/hj-4.webp"] },
  },
]

const N = PROJECTS.length

/* ─────────────────────────── Root ─────────────────────────── */

export function Home() {
  const reduce = useReducedMotion()

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
      <V2Cursor />
      <V2Nav />
      <Intro />
      <WorkSlider />
      <ContactFooter />
    </div>
  )
}

/* ─────────────────────────── Intro ─────────────────────────── */

/* Nappes picturales chaudes — drift idle + parallax au scroll (vitesses étagées) */
const BLOBS = [
  {
    size: "58vw",
    style: { top: "-18%", left: "-14%" },
    color: "rgba(232,193,143,0.55)", // ambre
    speed: -0.18,
    delay: "0s",
    duration: "17s",
  },
  {
    size: "48vw",
    style: { top: "26%", right: "-16%" },
    color: "rgba(226,160,122,0.45)", // terracotta
    speed: -0.38,
    delay: "-7s",
    duration: "21s",
  },
  {
    size: "40vw",
    style: { bottom: "-24%", left: "16%" },
    color: "rgba(235,189,170,0.5)", // rosé
    speed: -0.6,
    delay: "-12s",
    duration: "14s",
  },
  {
    size: "30vw",
    style: { top: "8%", left: "38%" },
    color: "rgba(220,229,236,0.6)", // souffle bleu pâle (annonce Musthane)
    speed: -0.28,
    delay: "-4s",
    duration: "19s",
  },
] as const

function Intro() {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()

  return (
    <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-[#F4F2EE] px-[6vw]">
      {/* Fond organique */}
      <div className="absolute inset-0" aria-hidden>
        {BLOBS.map((b, i) => (
          <React.Fragment key={i}>
            <BlobLayer b={b} scrollY={scrollY} reduce={!!reduce} />
          </React.Fragment>
        ))}
      </div>

      <h1 className="v2-name relative" aria-label="Quentin Singama">
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

      <div className="v2-late relative mt-11 flex flex-wrap items-end justify-between gap-6">
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

function BlobLayer({
  b,
  scrollY,
  reduce,
}: {
  b: (typeof BLOBS)[number]
  scrollY: MotionValue<number>
  reduce: boolean
}) {
  // Chaque nappe glisse à sa propre vitesse quand on quitte le hero
  const y = useTransform(scrollY, [0, 1000], reduce ? [0, 0] : [0, 1000 * b.speed])

  return (
    <motion.div style={{ y }} className="absolute inset-0">
      <div
        className="v2-blob"
        style={{
          ...b.style,
          width: b.size,
          height: b.size,
          background: `radial-gradient(closest-side, ${b.color}, transparent 72%)`,
          animationDelay: b.delay,
          animationDuration: b.duration,
        }}
      />
    </motion.div>
  )
}

/* ──────────────── Slider scroll-driven (sticky) ──────────────── */

function WorkSlider() {
  const trackRef = React.useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const [bounds, setBounds] = React.useState({ top: 0, len: 1 })

  // Mesure manuelle du track : fiable quel que soit le contexte (Lenis, overflow…)
  React.useLayoutEffect(() => {
    const measure = () => {
      const el = trackRef.current
      if (!el) return
      const top = el.getBoundingClientRect().top + window.scrollY
      setBounds({ top, len: Math.max(1, el.offsetHeight - window.innerHeight) })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const scrollYProgress = useTransform(
    scrollY,
    [bounds.top, bounds.top + bounds.len],
    [0, 1],
    { clamp: true }
  )

  // Fond continu : interpolation de couleur pilotée par le scroll
  const stops = [0, ...PROJECTS.map((_, i) => (i + 0.5) / N), 1]
  const colors = ["#F4F2EE", ...PROJECTS.map((p) => p.bg), "#141414"]
  const bg = useTransform(scrollYProgress, stops, colors)

  return (
    <div ref={trackRef} style={{ height: `${N * 120}vh` }}>
      <motion.section
        aria-label="Projets sélectionnés"
        className="sticky top-0 h-screen overflow-hidden"
        style={{ backgroundColor: bg }}
      >
        {PROJECTS.map((p, i) => (
          <React.Fragment key={p.id}>
            <Slide p={p} i={i} progress={scrollYProgress} />
          </React.Fragment>
        ))}
        <SliderDots progress={scrollYProgress} />
      </motion.section>
    </div>
  )
}

function Slide({ p, i, progress }: { p: Project; i: number; progress: MotionValue<number> }) {
  const reduce = useReducedMotion()
  const c = (i + 0.5) / N
  const span = 1 / N

  // Le visuel traverse l'écran en continu (film strip vertical)
  const imgY = useTransform(
    progress,
    [c - span, c, c + span],
    reduce ? ["0vh", "0vh", "0vh"] : ["112vh", "0vh", "-112vh"]
  )
  // Le texte apparaît/disparaît autour du centre du segment
  const txtOpacity = useTransform(
    progress,
    [c - span * 0.42, c - span * 0.16, c + span * 0.16, c + span * 0.42],
    [0, 1, 1, 0]
  )
  const txtY = useTransform(
    progress,
    [c - span * 0.42, c, c + span * 0.42],
    reduce ? [0, 0, 0] : [38, 0, -38]
  )
  // Crossfade des visuels en mode réduit
  const imgOpacity = useTransform(
    progress,
    [c - span * 0.5, c - span * 0.2, c + span * 0.2, c + span * 0.5],
    reduce ? [0, 1, 1, 0] : [1, 1, 1, 1]
  )

  // Seule la slide proche du centre capte les clics
  const [interactive, setInteractive] = React.useState(i === 0)
  useMotionValueEvent(txtOpacity, "change", (v) => {
    const next = v > 0.5
    setInteractive((prev) => (prev === next ? prev : next))
  })

  const ink = p.theme === "dark" ? "#EDE8E1" : "#141414"
  const muted = p.theme === "dark" ? "rgba(237,232,225,0.72)" : "rgba(20,20,20,0.78)"

  return (
    <div
      className="absolute inset-0 grid grid-cols-1 grid-rows-[auto_1fr] lg:grid-cols-[minmax(340px,42%)_1fr] lg:grid-rows-1"
      style={{ pointerEvents: interactive ? "auto" : "none" }}
    >
      {/* Texte */}
      <motion.div
        style={{ opacity: txtOpacity, y: txtY }}
        className="z-10 self-end px-5 pb-2 lg:self-center lg:pl-[6vw] lg:pr-0 lg:pb-0"
      >
        <h2
          className="v2-serif"
          style={{
            color: p.accent,
            fontSize: "clamp(46px, 7.2vw, 122px)",
            lineHeight: 0.97,
            fontWeight: 640,
            letterSpacing: "-0.015em",
          }}
        >
          {p.title.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="mt-5 max-w-[390px] text-[15px] leading-relaxed lg:mt-6 lg:text-[17px]" style={{ color: muted }}>
          {p.desc}
        </p>

        <Link
          to={p.href}
          data-cursor
          className="v2-cta mt-7 lg:mt-9"
          style={{ color: ink, "--cta-accent": p.accent } as React.CSSProperties}
        >
          <span className="v2-cta-circle">
            <span className="v2-cta-arrow" aria-hidden>
              →
            </span>
          </span>
          <span className="v2-cta-label">Voir le case study</span>
        </Link>
      </motion.div>

      {/* Visuel — traverse l'écran au scroll */}
      <div className="relative">
        <motion.div
          style={{ y: imgY, opacity: imgOpacity }}
          className="absolute inset-x-5 top-1/2 -translate-y-1/2 lg:inset-x-auto lg:right-[4vw] lg:w-auto"
        >
          <Link to={p.href} tabIndex={-1} aria-hidden="true" data-cursor className="block">
            <div className="v2-bob">
              <div className="v2-tilt3d" style={{ "--ry": p.ry, "--rx": "1.5deg" } as React.CSSProperties}>
                <ProjectVisual v={p.visual} eager={i === 0} />
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

function SliderDots({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = React.useState(0)
  useMotionValueEvent(progress, "change", (v) => {
    const idx = Math.min(N - 1, Math.max(0, Math.floor(v * N)))
    setActive((prev) => (prev === idx ? prev : idx))
  })

  return (
    <div className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-2.5 mix-blend-difference lg:flex">
      {PROJECTS.map((p, i) => (
        <span
          key={p.id}
          className="w-[5px] rounded-full bg-white transition-all duration-500"
          style={{ height: i === active ? 24 : 5, opacity: i === active ? 1 : 0.4 }}
        />
      ))}
    </div>
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
        className="mx-auto block h-auto w-full max-w-[92vw] lg:mx-0 lg:max-h-[72vh] lg:w-auto lg:max-w-[48vw]"
        style={{ boxShadow: VISUAL_SHADOW }}
      />
    )
  }

  if (v.kind === "crop") {
    return (
      <div
        className="mx-auto w-full max-w-[92vw] overflow-hidden lg:mx-0 lg:w-[min(46vw,840px)] lg:max-w-none"
        style={{ aspectRatio: v.ratio, boxShadow: VISUAL_SHADOW }}
      >
        <img src={v.src} alt={v.alt} loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
      </div>
    )
  }

  if (v.kind === "quote") {
    return (
      <div
        className="mx-auto flex w-full max-w-[92vw] flex-col justify-center bg-[#121C26] p-[8%] lg:mx-0 lg:w-[min(46vw,840px)] lg:max-w-none"
        style={{ aspectRatio: "16 / 10.5", boxShadow: VISUAL_SHADOW }}
      >
        <blockquote
          className="v2-serif max-w-[21ch] text-[#EDE8E1]"
          style={{ fontSize: "clamp(17px, 2.5vw, 37px)", lineHeight: 1.2, fontWeight: 560 }}
        >
          {v.text}
        </blockquote>
        <cite className="mt-6 text-[13.5px] not-italic text-[#8fa3b8]">{v.cite}</cite>
      </div>
    )
  }

  return (
    <div
      className="mx-auto grid w-full max-w-[92vw] grid-cols-4 overflow-hidden lg:mx-0 lg:w-[min(46vw,840px)] lg:max-w-none"
      style={{ aspectRatio: "16 / 10.5", boxShadow: VISUAL_SHADOW }}
    >
      {v.srcs.map((s) => (
        <img key={s} src={s} alt="" width={700} height={989} loading="lazy" decoding="async" className="h-full w-full object-cover" />
      ))}
    </div>
  )
}

/* ─────────────────────────── Footer ─────────────────────────── */

function ContactFooter() {
  return (
    <footer className="relative flex min-h-[92vh] flex-col justify-center bg-[#141414] px-[6vw] text-[#F4F2EE]">
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
