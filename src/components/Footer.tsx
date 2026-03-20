import * as React from "react"
import { motion, useInView } from "motion/react"
import { Reveal } from "./ui/Reveal"

/* ── Animated divider (reused from portfolio) ── */
function FooterDivider() {
  return (
    <div className="relative h-[2px] w-full overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-p5/40 to-transparent" />
      <motion.div
        className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-p5 to-transparent"
        animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  )
}

/* ── Contact data line ── */
function DataLine({ label, value, href, delay }: { label: string; value: string; href?: string; delay: number }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-20px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex gap-4 items-baseline"
    >
      <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-t3/40 w-28 shrink-0">{label}</span>
      {href ? (
        <a
          href={href}
          target={href.startsWith("mailto") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="font-mono text-sm text-t1 hover:text-p4 transition-colors truncate"
        >
          {value}
        </a>
      ) : (
        <span className="font-mono text-sm text-t1">{value}</span>
      )}
    </motion.div>
  )
}

export function Footer() {
  const titleRef = React.useRef(null)
  const titleInView = useInView(titleRef, { once: true, margin: "-80px" })
  const title = "ÉTABLIR LE\nCONTACT."
  const [displayed, setDisplayed] = React.useState("")

  React.useEffect(() => {
    if (!titleInView) return
    let i = 0
    setDisplayed("")
    const iv = setInterval(() => {
      i++
      setDisplayed(title.slice(0, i))
      if (i >= title.length) clearInterval(iv)
    }, 50)
    return () => clearInterval(iv)
  }, [titleInView])

  return (
    <footer id="footer" className="relative overflow-hidden noise-overlay" style={{ backgroundColor: "#0A0A0F" }}>
      {/* Top divider */}
      <FooterDivider />

      {/* Terminal header */}
      <div className="flex items-center gap-3 px-4 md:px-8 py-2.5 border-b font-mono text-[10px] tracking-wider"
        style={{ borderColor: "rgba(139,92,246,0.12)" }}
      >
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-p5" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        </div>
        <span className="text-t3/40 uppercase hidden md:inline">// TRANSMISSION OUVERTE — EN ATTENTE DE RÉPONSE</span>
        <motion.span
          className="ml-auto px-2 py-0.5 border rounded-sm text-[9px] uppercase tracking-[0.15em]"
          style={{ borderColor: "rgba(139,92,246,0.4)", color: "var(--p4)" }}
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          SIGNAL ACTIF
        </motion.span>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">

          {/* Left 60% — Title + subtitle */}
          <div className="lg:col-span-7">
            <Reveal>
              <div ref={titleRef} className="mb-8">
                <h2 className="font-bold font-display text-t1 leading-[0.95] tracking-[-0.03em] whitespace-pre-line"
                  style={{ fontSize: "clamp(60px, 10vw, 120px)" }}
                >
                  {displayed}
                  {displayed.length < title.length && (
                    <motion.span
                      className="inline-block w-[3px] h-[0.8em] ml-1 align-baseline"
                      style={{ backgroundColor: "var(--p5)" }}
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    />
                  )}
                </h2>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-base md:text-lg text-t2 max-w-md leading-relaxed mb-10">
                Disponible pour une alternance UX/UI à Bordeaux à partir de <span className="text-t1 font-semibold">septembre 2026</span>.
              </p>
            </Reveal>

            {/* CTA Button — angular Mechanicus style */}
            <Reveal delay={0.3}>
              <motion.a
                href="mailto:quentinsingama974@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 font-mono text-sm font-bold uppercase tracking-[0.1em] text-white transition-all duration-300 relative group"
                style={{
                  backgroundColor: "var(--p5)",
                  clipPath: "polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)",
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Hover scan line */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1 }}
                />
                <span className="relative z-10">INITIER LA TRANSMISSION →</span>
              </motion.a>
            </Reveal>
          </div>

          {/* Right 40% — Contact data terminal */}
          <div className="lg:col-span-5">
            <div className="p-6 rounded-xl border relative overflow-hidden"
              style={{ borderColor: "rgba(139,92,246,0.12)", backgroundColor: "#0D0D14" }}
            >
              {/* Section: Coordonnées */}
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-5" style={{ color: "rgba(139,92,246,0.5)" }}>
                // COORDONNÉES
              </span>
              <div className="space-y-3 mb-8">
                <DataLine label="EMAIL" value="quentinsingama974@gmail.com" href="mailto:quentinsingama974@gmail.com" delay={0.1} />
                <DataLine label="LINKEDIN" value="linkedin.com/in/quentin-singama" href="https://www.linkedin.com/in/quentin-singama-1b36b31b9/" delay={0.15} />
                <DataLine label="BEHANCE" value="behance.net/medaka" href="https://www.behance.net/medaka" delay={0.2} />
                <DataLine label="TIKTOK" value="@aeterna_imperium" href="https://tiktok.com/@aeterna_imperium" delay={0.25} />
                <DataLine label="LOCALISATION" value="Bordeaux, FR" delay={0.3} />
              </div>

              {/* Section: Statut */}
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase block mb-5" style={{ color: "rgba(139,92,246,0.5)" }}>
                // STATUT
              </span>
              <div className="space-y-3">
                <DataLine label="DISPONIBILITÉ" value="Septembre 2026" delay={0.35} />
                <DataLine label="DOSSIER" value="QS-2026-001" delay={0.4} />
                <DataLine label="CLEARANCE" value="LEVEL IV" delay={0.45} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom copyright line */}
      <div className="border-t px-6 md:px-8 py-4" style={{ borderColor: "rgba(139,92,246,0.1)" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
          <span className="font-mono text-[10px] text-t3/40 tracking-wider">
            © 2026 Quentin Singama
          </span>
          <div className="hidden md:block flex-1 mx-6 h-[1px]" style={{ background: "linear-gradient(to right, rgba(139,92,246,0.1), rgba(139,92,246,0.05), transparent)" }} />
          <span className="font-mono text-[10px] text-t3/40 tracking-wider">
            QS-2026-001 // OMNIMESSIE APPROUVÉ ☕
          </span>
        </div>
      </div>

      {/* Decorative glow */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full blur-[150px] translate-x-1/3 translate-y-1/3 pointer-events-none"
        style={{ backgroundColor: "rgba(139,92,246,0.06)" }}
      />
    </footer>
  )
}
