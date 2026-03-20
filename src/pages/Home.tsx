import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useScroll, AnimatePresence, animate } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Label } from "@/src/components/ui/Label"
import { Button } from "@/src/components/ui/Button"
import { ProjectCard } from "@/src/components/ui/ProjectCard"
import { Tag } from "@/src/components/ui/Tag"
import { HeroCanvas } from "@/src/components/HeroCanvas"

/* ── stagger config ── */
const STAGGER = 0.12
const EASE = [0.16, 1, 0.3, 1] as const

/* ── Dossier Terminal Header ── */
function TerminalHeader({ label, refId, statusText, statusColor, isHovered }: {
  label: string; refId: string; statusText: string; statusColor: string; isHovered: boolean;
}) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 relative z-10" style={{ backgroundColor: "#111111" }}>
      {/* 3 dots */}
      <div className="flex items-center gap-1.5">
        <div className="w-2 h-2 rounded-full bg-t3/30" />
        <div className="w-2 h-2 rounded-full bg-t3/30" />
        <div className="w-2 h-2 rounded-full bg-t3/30" />
      </div>
      {/* Label */}
      <span className="font-mono text-[9px] text-t3/50 tracking-[0.15em] uppercase ml-2 flex-1 truncate">
        // {label} — DOSSIER {refId}
      </span>
      {/* Status badge */}
      <motion.span
        className="font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded-sm whitespace-nowrap"
        style={{ borderColor: statusColor + "60", color: statusColor, backgroundColor: statusColor + "10" }}
        animate={!isHovered ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {statusText}
      </motion.span>
    </div>
  )
}

/* ── Dossier Footer ── */
function DossierFooter({ text, accentColor }: { text: string; accentColor: string }) {
  return (
    <div className="px-4 py-2.5 relative z-10" style={{ borderTop: `1px solid ${accentColor}20` }}>
      <span className="font-mono text-[8px] text-t3/40 tracking-[0.12em] uppercase">{text}</span>
    </div>
  )
}

/* ── Scanline overlay ── */
function Scanline({ accentColor, isHovered }: { accentColor: string; isHovered: boolean }) {
  return (
    <motion.div
      className="absolute left-0 right-0 h-[2px] z-20 pointer-events-none"
      style={{ background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }}
      animate={{ top: ["0%", "100%"] }}
      transition={{ duration: isHovered ? 1.5 : 4, repeat: Infinity, ease: "linear" }}
    />
  )
}

/* ── Scramble status text hook ── */
function useScrambleText(defaultText: string, hoverText: string, isHovered: boolean) {
  const [display, setDisplay] = React.useState(defaultText)
  const chars = "░▒▓█§#%&/\\"

  React.useEffect(() => {
    if (!isHovered) {
      setDisplay(defaultText)
      return
    }
    let step = 0
    const target = hoverText
    const maxSteps = target.length + 4
    const interval = setInterval(() => {
      if (step >= maxSteps) {
        clearInterval(interval)
        setDisplay(target)
        return
      }
      setDisplay(
        target.split("").map((c, i) => {
          if (i < step - 2) return c
          if (c === " ") return " "
          return chars[Math.floor(Math.random() * chars.length)]
        }).join("")
      )
      step++
    }, 40)
    return () => clearInterval(interval)
  }, [isHovered, defaultText, hoverText])

  return display
}


/* ── Scroll To Top Mechanicus ── */
function ScrollToTopButton() {
  const { scrollY } = useScroll()
  const [visible, setVisible] = React.useState(false)

  React.useEffect(() => {
    return scrollY.on("change", (latest) => {
      if (latest > 500) setVisible(true)
      else setVisible(false)
    })
  }, [scrollY])

  const handleScrollToTop = () => {
    animate(window.scrollY, 0, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => window.scrollTo(0, latest)
    })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={handleScrollToTop}
          className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-1 px-3 py-3 border transition-all duration-300 group"
          style={{
            backgroundColor: "#0D0D14",
            borderColor: "rgba(139,92,246,0.25)",
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
          }}
          whileHover={{
            borderColor: "rgba(139,92,246,0.6)",
            boxShadow: "0 0 20px rgba(139,92,246,0.2)",
          }}
        >
          {/* Scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, transparent 45%, rgba(139,92,246,0.06) 50%, transparent 55%)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-p5 relative z-10 group-hover:-translate-y-0.5 transition-transform" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 15l7-7 7 7" strokeLinecap="square" strokeLinejoin="miter"/>
          </svg>
          <span className="font-mono text-[7px] text-p5/50 tracking-[0.2em] uppercase relative z-10">TOP</span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

/* ── Mechanicus Scramble Stat ── */
function ScrambleStat({ value, delay = 0, className }: { value: string, delay?: number, className?: string }) {
  const [displayValue, setDisplayValue] = React.useState(value.replace(/[0-9]/g, "0"))
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  React.useEffect(() => {
    if (!isInView) return
    
    let iterations = 0
    const maxIterations = 20
    const chars = "0123456789§#%&/\\"
    
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        if (iterations >= maxIterations) {
          clearInterval(interval)
          setDisplayValue(value)
          return
        }
        
        setDisplayValue(value.split("").map((c) => {
          if (c === "+" || c === " ") return c
          return chars[Math.floor(Math.random() * chars.length)]
        }).join(""))
        
        iterations++
      }, 50)
      
      return () => clearInterval(interval)
    }, delay * 1000)
    
    return () => clearTimeout(startDelay)
  }, [isInView, value, delay])

  return <span ref={ref} className={className}>{displayValue}</span>
}

/* ── Warp-in text effect (hero data readouts) ── */
function WarpText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [display, setDisplay] = React.useState("░░░░░░░░░")
  const ref = React.useRef(null)
  const chars = "░▒▓█§#%&/\\"

  React.useEffect(() => {
    const startDelay = setTimeout(() => {
      let step = 0
      const maxSteps = text.length + 6
      const iv = setInterval(() => {
        if (step >= maxSteps) {
          clearInterval(iv)
          setDisplay(text)
          return
        }
        setDisplay(
          text.split("").map((c, i) => {
            if (i < step - 3) return c
            if (c === " " || c === "·") return c
            return chars[Math.floor(Math.random() * chars.length)]
          }).join("")
        )
        step++
      }, 45)
      return () => clearInterval(iv)
    }, delay * 1000)
    return () => clearTimeout(startDelay)
  }, [text, delay])

  return <span ref={ref} className="font-mono text-[10px] text-t3 tracking-wider">{display}</span>
}

/* ═══════════════════════════════════════ */
/* INK — CLASSIFIED DOSSIER TERMINAL      */
/* ═══════════════════════════════════════ */
function InkDossierCard() {
  const [hovered, setHovered] = React.useState(false)
  const statusText = useScrambleText("[████████] CLASSIFIÉ", "[ACCÈS ACCORDÉ]", hovered)

  return (
    <Link to="/ink" className="block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="noise-overlay flex flex-col overflow-hidden rounded-xl border transition-all duration-500"
        style={{
          backgroundColor: "#0A0A0A",
          borderColor: hovered ? "rgba(171,6,0,0.8)" : "rgba(171,6,0,0.3)",
          boxShadow: hovered ? "0 0 30px rgba(171,6,0,0.3), inset 0 0 60px rgba(171,6,0,0.02)" : "none",
          backgroundImage: "radial-gradient(rgba(171,6,0,0.03) 1px, transparent 1px)",
          backgroundSize: "6px 6px",
        }}
      >
        {/* Terminal Header */}
        <div className="flex items-center gap-2 px-4 py-2.5 relative z-10" style={{ backgroundColor: "#111111" }}>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#AB0600" }} />
            <div className="w-2 h-2 rounded-full bg-t3/30" />
            <div className="w-2 h-2 rounded-full bg-t3/30" />
          </div>
          <span className="font-mono text-[9px] text-t3/50 tracking-[0.15em] uppercase ml-2 flex-1">
            // D.I.B. TERMINAL — ACCÈS RESTREINT
          </span>
          <motion.span
            className="font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded-sm"
            style={{ borderColor: "#AB060060", color: "#AB0600", backgroundColor: "#AB060010" }}
            animate={!hovered ? { opacity: [1, 0.4, 1] } : { opacity: 1 }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            CRYPTÉ
          </motion.span>
        </div>

        {/* Body — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 flex-1 relative">
          {/* Scanline */}
          <Scanline accentColor="#AB0600" isHovered={hovered} />

          {/* Left 55% — Mockup */}
          <div className="md:col-span-7 relative overflow-hidden p-4 md:p-6">
            <motion.div
              className="relative rounded-xl overflow-hidden"
              style={{
                transform: "rotate(-1deg)",
                boxShadow: hovered
                  ? "0 0 40px rgba(171,6,0,0.25), 0 0 80px rgba(171,6,0,0.1)"
                  : "0 0 20px rgba(171,6,0,0.1)",
              }}
            >
              <img
                src="/ink-cover-card.png"
                alt="INK — Interface clandestine rouge et noir"
                className="w-full h-auto"
              />
              {/* Edge glow */}
              <div className="absolute inset-0 pointer-events-none" style={{
                boxShadow: "inset 0 0 30px rgba(171,6,0,0.15)",
                border: "1px solid rgba(171,6,0,0.15)",
                borderRadius: "12px",
              }} />
            </motion.div>
          </div>

          {/* Right 45% — Dossier content */}
          <div className="md:col-span-5 p-5 md:p-6 flex flex-col relative z-10">
            <div className="font-mono text-[10px] text-t3/50 tracking-[0.12em] uppercase mb-4 space-y-1">
              <div>REF : <span className="text-t3">INK-3113-ALPHA</span></div>
              <div>STATUT : <span style={{ color: "#AB0600" }}>{statusText}</span></div>
              <div>ACCÈS : <span className="text-t3">NIVEAU IV REQUIS</span></div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {["BRANDING", "UI DESIGN", "STORYTELLING", "HACKATHON"].map(tag => (
                <span key={tag} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 border rounded-sm"
                  style={{ borderColor: "#AB060030", color: "#AB060099" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display text-t1 mb-3 leading-tight">
              INK —<br />Une marque de résistance<br />née en 48h.
            </h3>

            <p className="font-mono text-[11px] text-t2/70 leading-relaxed mb-4">
              Hackathon créatif · Thème "A Journey"<br />
              Thème imposé : Print.<br />
              Deux identités. Un univers dystopique.<br />
              2ème place.
            </p>

            {/* OUVRIR LE DOSSIER — always in DOM, fades in/out */}
            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em] mt-auto transition-all duration-300"
              style={{ color: "#AB0600", opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(5px)" }}
            >
              OUVRIR LE DOSSIER →
            </span>
          </div>
        </div>

        {/* Badge — bottom left */}
        <div className="absolute bottom-10 left-4 z-20">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.12em] border rounded-sm"
            style={{ borderColor: "#AB060050", color: "#AB0600", backgroundColor: "#AB060010", transform: "rotate(-2deg)" }}
          >
            ✦ 2ÈME PLACE
          </span>
        </div>

        {/* Footer */}
        <DossierFooter text="// GROUPE 13 · ECV BORDEAUX · 48H · 11 MEMBRES · 3113 APR. J.C." accentColor="#AB0600" />
      </motion.div>
    </Link>
  )
}

/* ═══════════════════════════════════════ */
/* LINA — ARCHIVED DOSSIER                */
/* ═══════════════════════════════════════ */
function LinaDossierCard() {
  const [hovered, setHovered] = React.useState(false)
  const INDIGO = "#4F46E5"
  const statusText = useScrambleText("[ARCHIVÉ — LIVRÉ]", "[ACCÈS ACCORDÉ]", hovered)

  return (
    <Link to="/lina" className="block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="noise-overlay flex flex-col overflow-hidden rounded-xl border transition-all duration-500"
        style={{
          backgroundColor: "#0D0D14",
          borderColor: hovered ? INDIGO + "CC" : INDIGO + "30",
          boxShadow: hovered ? `0 0 30px ${INDIGO}30, inset 0 0 60px ${INDIGO}03` : "none",
        }}
      >
        <TerminalHeader label="LINA" refId="LINA-2025-UX" statusText={statusText} statusColor={INDIGO} isHovered={hovered} />

        {/* Body — asymmetric layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-0 flex-1 relative">
          <Scanline accentColor={INDIGO} isHovered={hovered} />

          {/* Left — Mockup */}
          <div className="md:col-span-7 relative overflow-hidden p-4 md:p-6">
            <div className="relative rounded-xl overflow-hidden max-h-[350px]"
              style={{ boxShadow: hovered ? `0 0 30px ${INDIGO}25` : `0 0 15px ${INDIGO}10` }}
            >
              <img
                src="/lina-desktop.png"
                alt="Refonte desktop LINA"
                className="w-full h-auto"
              />
              {/* Dark gradient edges */}
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to right, #0D0D14 0%, transparent 15%, transparent 85%, #0D0D14 100%)" }}
              />
              <div className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 60%, #0D0D14 100%)" }}
              />
            </div>
          </div>

          {/* Right — Dossier content */}
          <div className="md:col-span-5 p-5 md:p-6 flex flex-col relative z-10">
            <div className="font-mono text-[10px] text-t3/50 tracking-[0.12em] uppercase mb-4 space-y-1">
              <div>REF : <span className="text-t3">LINA-2025-UX</span></div>
              <div>STATUT : <span style={{ color: INDIGO }}>{statusText}</span></div>
              <div>TYPE : <span className="text-t3">UX/UI REDESIGN</span></div>
            </div>

            <div className="flex flex-wrap gap-1.5 mb-5">
              {["UX/UI DESIGN", "ICON SYSTEM"].map(tag => (
                <span key={tag} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 border rounded-sm"
                  style={{ borderColor: INDIGO + "30", color: INDIGO + "99" }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-xl md:text-2xl font-bold font-display text-t1 mb-3 leading-tight">
              LINA — Repenser la<br />découverte en librairie<br />indépendante
            </h3>

            <p className="font-mono text-[11px] text-t2/70 leading-relaxed mb-4">
              Refonte UX/UI · Système d'icônes<br />
              Workshop 3 jours · En duo<br />
              ECV Bordeaux
            </p>

            <span
              className="font-mono text-[10px] uppercase tracking-[0.15em] mt-auto transition-all duration-300"
              style={{ color: INDIGO, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(5px)" }}
            >
              OUVRIR LE DOSSIER →
            </span>
          </div>
        </div>

        {/* Status badge — top right corner */}
        <div className="absolute top-12 right-4 z-20">
          <span className="font-mono text-[8px] uppercase tracking-[0.12em] px-2 py-0.5 border rounded-sm"
            style={{ borderColor: INDIGO + "40", color: INDIGO, backgroundColor: INDIGO + "10" }}
          >
            ARCHIVÉ
          </span>
        </div>

        <DossierFooter text="// UX/UI DESIGN · ICON SYSTEM · WORKSHOP 3 JOURS · EN DUO · ECV BORDEAUX" accentColor={INDIGO} />
      </motion.div>
    </Link>
  )
}

/* ═══════════════════════════════════════ */
/* RESEARCH — DATA ANALYSIS TERMINAL      */
/* ═══════════════════════════════════════ */
function ResearchDossierCard() {
  const [hovered, setHovered] = React.useState(false)
  const CYAN = "#06B6D4"
  const statusText = useScrambleText("[EN ANALYSE ···]", "[ACCÈS ACCORDÉ]", hovered)

  return (
    <Link to="/research" className="block" onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="noise-overlay flex flex-col overflow-hidden rounded-xl border transition-all duration-500 h-full"
        style={{
          backgroundColor: "#0D0D14",
          borderColor: hovered ? CYAN + "CC" : CYAN + "20",
          boxShadow: hovered ? `0 0 25px ${CYAN}25` : "none",
        }}
      >
        <TerminalHeader label="UX RESEARCH" refId="RES-2025-UX" statusText={statusText} statusColor={CYAN} isHovered={hovered} />

        {/* Cover visual */}
        <div className="relative overflow-hidden h-[180px] md:h-[220px]">
          <Scanline accentColor={CYAN} isHovered={hovered} />
          <div className="w-full h-full relative" style={{ backgroundColor: "#0A1015" }}>
            {/* Data-grid visual */}
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(${CYAN}08 1px, transparent 1px)`,
              backgroundSize: "8px 8px",
            }} />
            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="font-mono text-[48px] leading-none mb-2" style={{ color: CYAN + "20" }}>🎧</div>
                <div className="font-mono text-[9px] tracking-[0.25em] uppercase" style={{ color: CYAN + "40" }}>7 INTERVIEWS · ANALYSE QUALITATIVE</div>
              </div>
            </div>
            {/* Floating data tags */}
            <div className="absolute top-3 left-3 px-2 py-0.5 border rounded-sm" style={{ borderColor: CYAN + "20", backgroundColor: CYAN + "06" }}>
              <span className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: CYAN + "50" }}>SEQ_SCORE::4.7/7</span>
            </div>
            <div className="absolute bottom-3 right-3 px-2 py-0.5 border rounded-sm" style={{ borderColor: CYAN + "20", backgroundColor: CYAN + "06" }}>
              <span className="font-mono text-[7px] tracking-[0.15em] uppercase" style={{ color: CYAN + "50" }}>18-25_ANS</span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D14] via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1 relative z-10">
          <div className="font-mono text-[10px] text-t3/50 tracking-[0.12em] uppercase mb-3 space-y-0.5">
            <div>REF : <span className="text-t3">RES-2025-UX</span></div>
            <div>STATUT : <span style={{ color: CYAN }}>{statusText}</span></div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 border rounded-sm"
              style={{ borderColor: CYAN + "30", color: CYAN + "99" }}>UX RESEARCH</span>
          </div>

          <h3 className="text-lg font-bold font-display text-t1 mb-2 leading-tight">
            Découverte de concerts chez les étudiants
          </h3>

          <p className="font-mono text-[11px] text-t2/70 leading-relaxed mb-3">
            Étude qualitative · 7 interviews<br />Analyse thématique · Personas
          </p>

          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] mt-auto transition-all duration-300"
            style={{ color: CYAN, opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(5px)" }}
          >
            OUVRIR LE DOSSIER →
          </span>
        </div>

        <DossierFooter text="// UX RESEARCH · 7 INTERVIEWS · PERSONAS · ECV BORDEAUX" accentColor={CYAN} />
      </motion.div>
    </Link>
  )
}

/* ═══════════════════════════════════════ */
/* MUSTHANE — AUDIT REPORT                */
/* ═══════════════════════════════════════ */
function MusthaneDossierCard() {
  const AMBER = "#F59E0B"

  return (
    <div className="block cursor-not-allowed">
      <div
        className="noise-overlay flex flex-col overflow-hidden rounded-xl border transition-all duration-500 h-full relative"
        style={{
          backgroundColor: "#0D0D14",
          borderColor: AMBER + "15",
          opacity: 0.6,
        }}
      >
        <TerminalHeader label="MUSTHANE" refId="MUST-2025-AUD" statusText="[EN CONSTRUCTION]" statusColor={AMBER} isHovered={false} />

        {/* Mockup */}
        <div className="relative overflow-hidden h-[180px] md:h-[220px]">
          <Scanline accentColor={AMBER} isHovered={false} />
          <div className="w-full h-full" style={{ backgroundColor: "#111118" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="font-mono text-[40px] block mb-2" style={{ color: AMBER + "20" }}>⚙</span>
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: AMBER + "40" }}>DOSSIER EN COURS DE COMPILATION</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-5 flex flex-col flex-1 relative z-10">
          <div className="font-mono text-[10px] text-t3/50 tracking-[0.12em] uppercase mb-3 space-y-0.5">
            <div>REF : <span className="text-t3">MUST-2025-AUD</span></div>
            <div>STATUT : <span style={{ color: AMBER + "60" }}>[EN CONSTRUCTION]</span></div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {["UX AUDIT", "SEO"].map(tag => (
              <span key={tag} className="font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 border rounded-sm"
                style={{ borderColor: AMBER + "15", color: AMBER + "40" }}>
                {tag}
              </span>
            ))}
          </div>

          <h3 className="text-lg font-bold font-display text-t3/60 mb-2 leading-tight">
            Audit UX & SEO — site industriel Musthane
          </h3>

          <p className="font-mono text-[11px] text-t3/50 leading-relaxed mb-3">
            Évaluation heuristique · Arborescence<br />Recommandations priorisées
          </p>

          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] mt-auto"
            style={{ color: AMBER + "30" }}
          >
            BIENTÔT DISPONIBLE
          </span>
        </div>

        <DossierFooter text="// UX AUDIT · SEO · ÉVALUATION HEURISTIQUE · ECV BORDEAUX" accentColor={AMBER} />

        {/* Locked overlay scanline */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(245,158,11,0.02) 3px, rgba(245,158,11,0.02) 4px)"
        }} />
      </div>
    </div>
  )
}


export function Home() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">
      <ScrollToTopButton />

      {/* HERO SECTION - Mechanicus Noosphere */}
      <section className="relative min-h-screen flex items-center overflow-hidden">

        {/* ── Particle canvas background ── */}
        <HeroCanvas />

        {/* ── Ambient color blurs ── */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
          <div className="absolute top-[15%] right-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-p5/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-[20%] left-[10%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-c5/8 rounded-full blur-[140px]" />
        </div>

        {/* ── Side data readouts (desktop) — warp scramble ── */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-6 items-start">
          {/* Vertical line */}
          <div className="w-[1px] h-16 bg-gradient-to-b from-p5/30 to-transparent ml-[3px]" />
          {[
            { label: "LOCATION", value: "44.8378° N" },
            { label: "STATUS", value: "AVAILABLE" },
            { label: "STACK", value: "FIGMA · FRAMER" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.6, ease: EASE }}
              className="flex flex-col gap-0.5"
            >
              <span className="font-mono text-[9px] text-p5/40 tracking-[0.2em] uppercase">{item.label}</span>
              <WarpText text={item.value} delay={1.4 + i * 0.2} />
            </motion.div>
          ))}
          <div className="w-[1px] h-8 bg-gradient-to-b from-transparent to-c5/20 ml-[3px]" />
        </div>

        {/* ── Right edge decorations (desktop) ── */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col items-end gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex flex-col items-end gap-1"
          >
            <span className="font-mono text-[9px] text-p5/30 tracking-[0.2em]">M1 UX/UI</span>
            <span className="font-mono text-[9px] text-t3/40 tracking-wider">ECV BORDEAUX</span>
          </motion.div>
          {/* decorative bracket */}
          <div className="w-3 h-12 border-r border-t border-b border-border-color/30 rounded-r-sm" />
          <motion.span
            className="font-mono text-[9px] text-c5/30 tracking-[0.15em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            2026
          </motion.span>
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-32 pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left side text & CTAs */}
            <div className="lg:col-span-7">
              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.7, ease: EASE }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="h-[1px] w-8 bg-c5/50" />
                  <span className="font-display text-[11px] uppercase tracking-[0.15em] text-c5 font-semibold">
                    UX/UI Designer · Bordeaux
                  </span>
                </div>
              </motion.div>

              {/* Name - staggered reveal */}
              <h1 className="font-bold font-display leading-[0.88] tracking-tighter mb-10">
                {/* QUENTIN */}
                <span className="block overflow-hidden">
                  <motion.span
                    className="block text-6xl md:text-8xl lg:text-[8.5rem] text-t1"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: STAGGER * 1, duration: 0.9, ease: EASE }}
                  >
                    Quentin
                  </motion.span>
                </span>

                {/* SINGAMA */}
                <span className="block overflow-hidden relative">
                  <motion.span
                    className="block text-5xl md:text-7xl lg:text-[7rem] uppercase tracking-[0.12em] md:tracking-[0.18em] lg:tracking-[0.22em]"
                    style={{
                      background: "linear-gradient(135deg, #8B5CF6 0%, #06B6D4 50%, #A78BFA 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 30px rgba(139, 92, 246, 0.3))",
                    }}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: STAGGER * 2, duration: 0.9, ease: EASE }}
                  >
                    Singama
                  </motion.span>

                  {/* data-scan line */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-p5/80 to-transparent z-20 pointer-events-none"
                    initial={{ left: "-5%" }}
                    animate={{ left: "105%" }}
                    transition={{ delay: 0.9, duration: 0.8, ease: "easeInOut" }}
                  />

                  {/* subtle underline that draws in */}
                  <motion.div
                    className="absolute bottom-1 left-0 h-[1px] bg-gradient-to-r from-p5/50 via-c5/30 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ delay: 1.2, duration: 0.8, ease: EASE }}
                  />
                </span>
              </h1>

              {/* Description */}
              <motion.p
                className="text-lg md:text-xl text-t2 max-w-2xl leading-relaxed mb-12"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER * 4, duration: 0.7, ease: EASE }}
              >
                Je conçois des expériences digitales centrées utilisateur,
                du research au prototype final.
              </motion.p>

              {/* CTAs - Mechanicus themed */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 lg:gap-6"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: STAGGER * 5, duration: 0.7, ease: EASE }}
              >
                {/* Primary: "Accéder aux archives" */}
                <button
                  onClick={() => document.getElementById("projets")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative inline-flex items-center justify-center gap-3 bg-p5 text-white px-8 py-4 text-xs md:text-sm tracking-widest uppercase font-mono font-bold transition-all hover:bg-p5/90 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] overflow-hidden"
                  style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}
                >
                  {/* animated icon */}
                  <span className="relative w-5 h-5 flex items-center justify-center z-10">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                      <path d="M2 6a2 2 0 012-2h3.172a2 2 0 011.414.586l.828.828A2 2 0 0010.828 6H16a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                    <motion.span
                      className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-none bg-c5"
                      animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </span>
                  <span className="relative z-10">Accéder aux archives</span>
                  
                  {/* Sweep effect */}
                  <motion.div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                </button>

                {/* Secondary: "Établir le contact" */}
                <button
                  onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
                  className="group relative inline-flex items-center justify-center gap-3 text-t1 px-8 py-4 text-xs md:text-sm tracking-widest uppercase font-mono border-none font-bold transition-all hover:text-c5"
                >
                  <div 
                    className="absolute inset-0 bg-border-color/60 transition-colors group-hover:bg-c5/50 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    style={{ clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)" }}
                  >
                    <div 
                      className="absolute inset-[1px] bg-bg transition-colors group-hover:bg-bg-surf"
                      style={{ clipPath: "polygon(13px 0, 100% 0, 100% calc(100% - 13px), calc(100% - 13px) 100%, 0 100%, 0 13px)" }}
                    />
                  </div>
                  
                  {/* animated icon */}
                  <span className="relative w-5 h-5 flex items-center justify-center z-10 text-t3 group-hover:text-c5 transition-colors">
                    <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                      <path d="M5.636 14.364a5 5 0 010-7.072M14.364 7.292a5 5 0 010 7.072M3.515 16.485a8 8 0 010-11.314M16.485 5.172a8 8 0 010 11.314M10 12a2 2 0 100-4 2 2 0 000 4z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square"/>
                    </svg>
                  </span>
                  <span className="relative z-10">Établir le contact</span>
                </button>
              </motion.div>
            </div>

            {/* Right side Visual Element (Mechanicus Hologram) */}
            <div className="hidden lg:flex lg:col-span-5 relative w-full items-center justify-center pl-10 items-end">
              <motion.div 
                className="relative w-full max-w-[400px] aspect-square flex items-center justify-center pointer-events-none opacity-80"
                initial={{ opacity: 0, scale: 0.9, filter: "brightness(0.5)" }}
                animate={{ opacity: 0.8, scale: 1, filter: "brightness(1)" }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
              >
                {/* Outer rotating dashed ring */}
                <motion.div
                  className="absolute inset-[5%] rounded-full border-[1px] border-dashed border-p5/30"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                />
                
                {/* Thick counter-rotating ring */}
                <motion.div
                  className="absolute inset-[20%] rounded-full border-[3px] border-transparent border-t-c5/40 border-b-c5/40"
                  animate={{ rotate: -360 }}
                  transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                />

                {/* Inner precise scale */}
                <motion.div
                  className="absolute inset-[30%] rounded-full border-[1px] border-dotted border-p5/50"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                />

                {/* Central Mechanism */}
                <motion.div
                  className="relative w-[50%] h-[50%] flex items-center justify-center text-p5"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                >
                  <svg viewBox="0 0 100 100" fill="none" className="w-full h-full drop-shadow-[0_0_15px_rgba(139,92,246,0.6)]">
                    <path d="M50 5 L55 20 L75 15 L70 30 L90 35 L80 50 L90 65 L70 70 L75 85 L55 80 L50 95 L45 80 L25 85 L30 70 L10 65 L20 50 L10 35 L30 30 L25 15 L45 20 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="miter" />
                    <circle cx="50" cy="50" r="15" stroke="currentColor" strokeWidth="2" className="text-c5" />
                    <circle cx="50" cy="50" r="6" fill="currentColor" className="text-c5/90" />
                  </svg>
                </motion.div>

                {/* Crosshairs & Overlay lines */}
                <div className="absolute inset-[15%] flex items-center justify-center">
                  <div className="w-[120%] h-[1px] bg-gradient-to-r from-transparent via-c5/50 to-transparent absolute" />
                  <div className="h-[120%] w-[1px] bg-gradient-to-b from-transparent via-p5/50 to-transparent absolute" />
                  {/* scanning sweep line */}
                  <motion.div
                    className="absolute w-full h-[2px] bg-c5 shadow-[0_0_8px_#06B6D4]"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
                
                {/* Data floating tags */}
                <div className="absolute top-[10%] right-[5%] bg-bg/80 border border-c5/30 px-2 py-1 backdrop-blur-sm">
                  <span className="font-mono text-[8px] text-c5 uppercase tracking-wider">SYNC_ID::904-A</span>
                </div>
                <div className="absolute bottom-[10%] left-[5%] bg-bg/80 border border-p5/30 px-2 py-1 backdrop-blur-sm">
                  <span className="font-mono text-[8px] text-p5 uppercase tracking-wider">COGITATOR_ACTIVE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── Scroll indicator - Mechanicus style ── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <span className="font-mono text-[9px] text-t3/60 tracking-[0.25em] uppercase">Scroll</span>
          <div className="relative w-[1px] h-8 bg-border-color/30 overflow-hidden">
            <motion.div
              className="absolute top-0 w-full h-3 bg-gradient-to-b from-p5/60 to-transparent"
              animate={{ y: ["-12px", "32px"] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        {/* ── Bottom fade + circuit transition ── */}
        <div className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none">
          {/* gradient fade to bg-surf */}
          <div className="h-40 bg-gradient-to-b from-transparent via-bg/60 to-bg-surf" />
          {/* circuit divider line */}
          <div className="relative h-[1px] w-full bg-border-color/20">
            {/* pulse */}
            <motion.div
              className="absolute top-0 h-full w-32 bg-gradient-to-r from-transparent via-p5/50 to-transparent"
              animate={{ x: ["-128px", "calc(100vw + 128px)"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
            />
            {/* circuit nodes */}
            <div className="absolute top-1/2 -translate-y-1/2 left-[15%] w-1 h-1 rounded-full bg-p5/30" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[35%] w-1.5 h-1.5 rounded-full bg-c5/20" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-2 h-2 rounded-full bg-p5/15 ring-1 ring-p5/10" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[65%] w-1.5 h-1.5 rounded-full bg-c5/20" />
            <div className="absolute top-1/2 -translate-y-1/2 left-[85%] w-1 h-1 rounded-full bg-p5/30" />
          </div>
        </div>
      </section>

      {/* ═══ PROJETS SECTION - Archives Mechanicus ═══ */}
      <section id="projets" className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#0A0A0F" }}>
        <div className="max-w-7xl mx-auto px-6">
          <Reveal className="mb-16 md:mb-24">
            <div className="flex items-center gap-3 mb-4">
              <motion.svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-p5/40" xmlns="http://www.w3.org/2000/svg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </motion.svg>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-p5/50">Archives // Projets</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-t1">
              Ce sur quoi j'ai travaillé
            </h2>
            {/* circuit line under title */}
            <div className="relative h-[1px] w-full mt-8">
              <div className="absolute inset-0 bg-gradient-to-r from-p5/20 via-border-color/30 to-transparent" />
              <motion.div
                className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-p5/50 to-transparent"
                animate={{ x: ["-80px", "calc(100% + 80px)"] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
              />
              <div className="absolute top-1/2 -translate-y-1/2 left-[25%] w-1.5 h-1.5 rounded-full bg-p5/30" />
              <div className="absolute top-1/2 -translate-y-1/2 left-[50%] w-1 h-1 rounded-full bg-c5/20" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* ═══ INK — CLASSIFIED DOSSIER TERMINAL ═══ */}
            <Reveal className="md:col-span-2">
              <InkDossierCard />
            </Reveal>

            {/* ═══ LINA — ARCHIVED DOSSIER ═══ */}
            <Reveal className="md:col-span-2" delay={0.1}>
              <LinaDossierCard />
            </Reveal>

            {/* ═══ RESEARCH — DATA ANALYSIS TERMINAL ═══ */}
            <Reveal delay={0.15}>
              <ResearchDossierCard />
            </Reveal>

            {/* ═══ MUSTHANE — AUDIT REPORT ═══ */}
            <Reveal delay={0.2}>
              <MusthaneDossierCard />
            </Reveal>

            {/* Graphic Design */}
            <Reveal delay={0.3} className="md:col-span-2">
              <motion.div
                className="group rounded-2xl border border-border-color bg-bg-card overflow-hidden transition-all duration-300 hover:border-p5/30 relative"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* top accent */}
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-p5/20 to-transparent" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-1 p-4 bg-bg-el">
                  <img src="/happy-job-1.jpg" alt="Campagne Happy Job 1" className="w-full aspect-[2/3] object-cover rounded-lg" />
                  <img src="/happy-job-2.jpg" alt="Campagne Happy Job 2" className="w-full aspect-[2/3] object-cover rounded-lg" />
                  <img src="/happy-job-3.jpg" alt="Campagne Happy Job 3" className="w-full aspect-[2/3] object-cover rounded-lg" />
                  <img src="/happy-job-4.jpg" alt="Campagne Happy Job 4" className="w-full aspect-[2/3] object-cover rounded-lg" />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag>GRAPHIC DESIGN</Tag>
                    <span className="font-mono text-[9px] text-t3/40 tracking-wider">REF: HJ-2025</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-t1 mb-3">Campagnes visuelles - Happy Job Bordeaux</h3>
                  <p className="text-t2 text-sm md:text-base leading-relaxed">
                    Concept carte à jouer pour les campagnes saisonnières de recrutement - Industrie, Restauration, Agriculture.
                  </p>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ ABOUT + STATS — Mechanicus Data-Log ═══ */}
      <section className="py-24 md:py-32 relative overflow-hidden" style={{ backgroundColor: "#0A0A0F" }}>
        {/* Animated divider at top */}
        <div className="absolute top-0 left-0 right-0">
          <div className="relative h-[2px] w-full overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-p5/30 to-transparent" />
            <motion.div
              className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-p5 to-transparent"
              animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left — About content */}
            <Reveal className="lg:col-span-7 order-2 lg:order-1">
              <div className="flex items-center gap-3 mb-6">
                <motion.svg viewBox="0 0 24 24" fill="none" className="w-4 h-4 text-p5/40" xmlns="http://www.w3.org/2000/svg"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </motion.svg>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-p5/50">// OPÉRATEUR — DOSSIER PERSONNEL</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-8">
                Designer qui pense{" "}
                <span className="text-gradient">utilisateur</span>
              </h2>

              <div className="p-5 rounded-xl border mb-8" style={{ borderColor: "rgba(139,92,246,0.12)", backgroundColor: "#0D0D14" }}>
                <p className="text-base text-t2 leading-relaxed">
                  Étudiant en Master 1 Design & UX/UI à l'ECV Bordeaux, je travaille actuellement chez Happy Job comme graphic designer. Mon approche : <span className="text-t1 font-semibold">comprendre les vrais besoins des utilisateurs</span> avant de dessiner le moindre écran. Mobile-first, research-driven, orienté résultats.
                </p>
              </div>

              {/* Skills - Mechanicus tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {["UX Research", "UI Design", "Figma", "Prototypage", "Framer", "UX Audit", "Print"].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] border rounded-sm text-t2 hover:text-t1 hover:border-p5/40 transition-all cursor-default"
                    style={{ borderColor: "rgba(139,92,246,0.15)", backgroundColor: "rgba(139,92,246,0.04)" }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Stats inline */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { value: "3", label: "Case studies", color: "text-p5", mono: "PROJ" },
                  { value: "7", label: "Interviews UX", color: "text-c5", mono: "RSRCH" },
                  { value: "4", label: "Ans d'XP design", color: "text-gold", mono: "EXP" },
                ].map((stat, i) => (
                  <div key={stat.mono} className="p-4 rounded-lg border text-center" style={{ borderColor: "rgba(139,92,246,0.1)", backgroundColor: "#0D0D14" }}>
                    <span className="font-mono text-[8px] text-t3/40 tracking-[0.2em] block mb-2">{stat.mono}</span>
                    <ScrambleStat value={stat.value} delay={i * 0.1} className={`text-3xl md:text-4xl font-bold font-display ${stat.color} block mb-1`} />
                    <span className="text-t3 font-mono text-[9px] uppercase tracking-wider">{stat.label}</span>
                  </div>
                ))}
              </div>

              {/* CTA — angular like footer */}
              <Link to="/about"
                className="group inline-flex items-center gap-3 px-6 py-3 text-sm font-mono font-bold uppercase tracking-[0.1em] text-t1 border transition-all duration-300 hover:border-p5/50 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)]"
                style={{ borderColor: "rgba(139,92,246,0.2)", clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%)" }}
              >
                ACCÉDER AU DOSSIER COMPLET →
              </Link>
            </Reveal>

            {/* Right — Photo with Mechanicus frame */}
            <Reveal delay={0.2} className="lg:col-span-5 order-1 lg:order-2">
              <div className="relative flex justify-center">
                {/* Outer decorative ring */}
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                >
                  <div className="w-[280px] h-[280px] md:w-[320px] md:h-[320px] rounded-full border border-dashed border-p5/10" />
                </motion.div>

                {/* Photo circle */}
                <div className="relative w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-2 border-border-color/50 shadow-2xl">
                  <img
                    src="/portrait.jpg"
                    alt="Quentin Singama, UX/UI Designer"
                    className="w-full h-full object-cover scale-[1.2] origin-[50%_30%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/40 to-transparent" />
                </div>

                {/* Status dot */}
                <motion.div
                  className="absolute bottom-[10%] right-[10%] md:bottom-[12%] md:right-[12%] w-4 h-4 md:w-5 md:h-5 rounded-full bg-ok border-4 border-bg z-10"
                  animate={{ opacity: [1, 0.4, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Side data */}
                <div className="absolute -right-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-1">
                  <span className="font-mono text-[8px] text-p5/30 tracking-[0.2em]">STATUS</span>
                  <span className="font-mono text-[9px] text-t3">ONLINE</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  )
}
