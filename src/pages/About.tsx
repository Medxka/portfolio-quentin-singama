import * as React from "react"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Label } from "@/src/components/ui/Label"
import { Tag } from "@/src/components/ui/Tag"

const EASE = [0.16, 1, 0.3, 1] as const

/* ── Cog SVG ── */
function Cog({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

/* ── Timeline entry ── */
function TimelineEntry({
  year, role, company, desc, tags, delay = 0, isLast = false
}: {
  year: string; role: string; company: string; desc: string; tags: string[]; delay?: number; isLast?: boolean
}) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: EASE }}
      className="relative flex gap-6"
    >
      {/* Timeline spine */}
      <div className="flex flex-col items-center flex-shrink-0 w-16">
        {/* Year pill */}
        <motion.div
          className="px-2 py-1 rounded-md bg-bg-el border border-border-color font-mono text-[10px] text-p5 tracking-wider z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.15, type: "spring", stiffness: 300 }}
        >
          {year}
        </motion.div>
        {/* Node */}
        <motion.div
          className="w-3 h-3 rounded-full bg-p5/40 border-2 border-p5 mt-3 z-10"
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.25, type: "spring", stiffness: 400 }}
        />
        {/* Connecting line */}
        {!isLast && (
          <motion.div
            className="w-[2px] flex-1 mt-1 bg-gradient-to-b from-p5/30 to-transparent"
            initial={{ height: 0, opacity: 0 }}
            animate={isInView ? { height: "100%", opacity: 1 } : {}}
            transition={{ delay: delay + 0.4, duration: 0.8 }}
          />
        )}
      </div>

      {/* Content card */}
      <motion.div
        className="pb-10 flex-1 group"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="p-5 rounded-xl bg-bg-card border border-border-color/50 group-hover:border-p5/30 transition-colors relative overflow-hidden">
          {/* top accent */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-p5/30 via-transparent to-c5/20" />
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-lg font-bold font-display text-t1">{role}</h3>
              <span className="text-sm text-c5 font-display">{company}</span>
            </div>
            <Cog className="w-4 h-4 text-p5/20 group-hover:text-p5/50 transition-colors" />
          </div>
          <p className="text-sm text-t2 leading-relaxed mt-3 mb-4">{desc}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(t => (
              <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-bg-el border border-border-color/30 text-t3 tracking-wider uppercase">
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ── Protocol Card ── */
function ProtocolCard({
  name, rank, desc, color, delay = 0, widthClass = "col-span-1"
}: {
  name: string; rank: string; desc: string; color: string; delay?: number; widthClass?: string
}) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-40px" })

  const rankPercent = rank === "INITIÉ" ? 25 : rank === "ADEPTE" ? 50 : rank === "MAÎTRE" ? 75 : rank === "ARCHIVISTE" ? 100 : 0;

  return (
    <motion.div
      ref={ref}
      className={`group relative p-4 lg:p-5 rounded-xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between min-h-[140px] ${widthClass}`}
      initial={{ opacity: 0, scale: 0.95, filter: "brightness(2)" }}
      animate={isInView ? { 
        opacity: [0, 1, 0.2, 1, 0.8, 1], 
        scale: 1, 
        filter: "brightness(1)",
        x: [ -2, 2, -1, 1, 0 ]
      } : {}}
      transition={{ 
        duration: 0.6, 
        delay: delay, 
        times: [0, 0.1, 0.2, 0.3, 0.4, 1],
        ease: "anticipate"
      }}
      whileHover={{ borderColor: color + "50" }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: `radial-gradient(circle at center, ${color}10, transparent 80%)` }} />
      
      {/* Header: Glyph + Name */}
      <div className="flex justify-between items-start mb-2 relative z-10 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-sm flex items-center justify-center border bg-bg-surf/50" style={{ borderColor: color + "40", color: color }}>
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
               <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M19.07 4.93L4.93 19.07" />
               <circle cx="12" cy="12" r="3" fill="currentColor" />
             </svg>
          </div>
          <span className="font-mono text-[11px] sm:text-xs text-t1 uppercase tracking-widest">{name}</span>
        </div>
        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded border tracking-wider whitespace-nowrap" style={{ borderColor: color + "30", color: color, backgroundColor: color + "10" }}>
          {rank}
        </span>
      </div>

      <p className="font-mono text-[10px] sm:text-[11px] text-t3/50 mt-1 mb-6 leading-relaxed relative z-10 flex-1">
        {desc}
      </p>

      {/* Animated scan line */}
      <div className="h-[2px] w-full bg-bg-el rounded-full overflow-hidden relative z-10 flex-shrink-0">
        <motion.div
          className="h-full rounded-full"
          style={{ background: color }}
          initial={{ width: 0, boxShadow: "none" }}
          animate={isInView ? { 
            width: `${rankPercent}%`,
            boxShadow: ["none", `0 0 16px 2px ${color}`, `0 0 4px ${color}`]
          } : {}}
          transition={{ 
            width: { duration: 1.2, delay: delay + 0.3, ease: "easeOut" },
            boxShadow: { duration: 0.6, delay: delay + 1.4, times: [0, 0.5, 1], ease: "linear" }
          }}
        />
      </div>
    </motion.div>
  )
}

/* ── Passion card ── */
function PassionCard({
  icon, title, desc, color, delay = 0
}: {
  icon: string; title: string; desc: string; color: string; delay?: number
}) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="p-5 rounded-2xl bg-bg-card border border-border-color/30 h-full relative overflow-hidden group cursor-default"
        whileHover={{ y: -4, borderColor: color + "40" }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {/* glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${color}08, transparent 70%)` }}
        />
        {/* icon */}
        <motion.div
          className="text-3xl mb-4"
          whileHover={{ rotate: [0, -10, 10, -5, 0], scale: 1.15 }}
          transition={{ duration: 0.5 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-base font-bold font-display text-t1 mb-2">{title}</h3>
        <p className="text-sm text-t2 leading-relaxed">{desc}</p>
      </motion.div>
    </Reveal>
  )
}

/* ── Circuit divider ── */
function Divider() {
  return (
    <div className="relative h-[1px] w-full my-2">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-color/40 to-transparent" />
      <motion.div
        className="absolute top-0 h-full w-20 bg-gradient-to-r from-transparent via-p5/50 to-transparent"
        animate={{ x: ["-80px", "calc(100vw + 80px)"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 6 }}
      />
    </div>
  )
}

/* ══════════════════════════════ */
/* PAGE                          */
/* ══════════════════════════════ */
export function About() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">

      {/* ── HERO - Personnel File / Dossier ── */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden pt-20 pb-16">
        {/* ambient */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[10%] left-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] bg-p5/10 rounded-full blur-[150px]" />
          <div className="absolute bottom-[15%] right-[10%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] bg-c5/6 rounded-full blur-[120px]" />
        </div>

        {/* decorative side elements */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden lg:flex flex-col gap-4 items-start">
          <div className="w-[1px] h-12 bg-gradient-to-b from-p5/50 to-transparent ml-[3px]" />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col gap-0.5"
          >
            <span className="font-mono text-[9px] text-p5 tracking-[0.2em] uppercase">Clearance</span>
            <span className="font-mono text-[10px] text-t1 font-bold tracking-wider">LEVEL IV</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col gap-0.5"
          >
            <span className="font-mono text-[9px] text-p5 tracking-[0.2em] uppercase">File</span>
            <span className="font-mono text-[10px] text-t1 font-bold tracking-wider">QS-2026-001</span>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.7, ease: EASE }}
            >
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Cog className="w-4 h-4 text-p5/50" />
                </motion.div>
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-p5/60">
                  Dossier Personnel - Classification Ouvert
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
              className="flex flex-col md:flex-row items-start md:items-end gap-6 md:gap-8 mb-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-t1 leading-[0.95]">
                Quentin <br className="hidden md:block" />
                <span
                  className="uppercase tracking-[0.1em] md:tracking-[0.15em]"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #06B6D4, #A78BFA)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 25px rgba(139, 92, 246, 0.4))",
                  }}
                >
                  Singama
                </span>
              </h1>

              {/* Photo avatar inline with title */}
              <div className="relative flex-shrink-0 mt-4 md:mt-0 md:mb-4 lg:mb-6">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-p5/40 shadow-[0_0_30px_rgba(139,92,246,0.15)] flex-shrink-0">
                  <img src="/portrait.jpg" alt="Quentin Singama" className="w-full h-full object-cover scale-[1.35] origin-[50%_30%]" />
                </div>
                <motion.div
                  className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-ok border-[3px] border-bg"
                  animate={{ opacity: [1, 0.3, 1], scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-xl md:text-2xl text-t2 max-w-2xl leading-relaxed mt-2 mb-8"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7, ease: EASE }}
            >
              UX/UI Designer basé à Bordeaux. J'explore, je prototype, je teste - 
              et je recommence jusqu'à ce que l'expérience soit juste.
            </motion.p>

            {/* Status row */}
            <motion.div
              className="flex flex-wrap gap-6 py-4 border-y border-border-color/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {[
                { label: "Status", value: "En recherche d'alternance", dot: true },
                { label: "Formation", value: "M1 UX/UI - ECV Bordeaux" },
                { label: "Poste actuel", value: "Graphic Designer - Happy Job" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  {item.dot && (
                    <motion.div
                      className="w-2 h-2 rounded-full bg-ok"
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <span className="font-mono text-[10px] text-t3 tracking-wider uppercase">{item.label}:</span>
                  <span className="text-sm text-t1 font-medium">{item.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <Divider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
            
            {/* Left Column: Editorial Quote */}
            <div className="lg:col-span-5 lg:pr-8">
              <Reveal>
                <Label className="mb-6 block">Data-Log // Doctrine</Label>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight text-t1 leading-[1.1]">
                  Concevoir sans faille. <br />
                  <span style={{ color: "#FF6B35" }}>Itérer</span> sans fin.
                </h2>
                <p className="text-lg text-t2 mt-8 max-w-xl leading-relaxed">
                  Le design n'est pas qu'une question d'esthétique. C'est un système rigoureux où chaque hypothèse doit être éprouvée au feu des tests utilisateurs jusqu'à l'obtention d'une interface purifiée de toute friction.
                </p>
              </Reveal>
            </div>

            {/* Right Column: Mechanicus Process Flow */}
            <div className="lg:col-span-7 relative mt-16 lg:mt-0 lg:pl-8">
              <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[#FF6B35]/50 via-p5/30 to-transparent z-0" />
              
              <div className="flex flex-col gap-10 relative z-10">
                {/* Step 1 */}
                <Reveal delay={0.1}>
                  <div className="flex gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-bg-card border border-[#FF6B35]/50 flex items-center justify-center flex-shrink-0 mt-1 ring-4 ring-bg-surf group-hover:border-[#FF6B35] transition-colors relative">
                      <div className="absolute inset-0 rounded-full bg-[#FF6B35]/20 animate-pulse" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#FF6B35] group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Cog className="w-4 h-4 text-t3 group-hover:text-[#FF6B35] transition-colors" />
                        <h3 className="text-lg font-bold font-display text-t1 uppercase tracking-wider">Discover</h3>
                      </div>
                      <p className="text-sm text-t2 mb-3">Auspex activé. Collecte de données primaires, entretiens utilisateurs et audits de l'existant.</p>
                      <div className="inline-flex">
                        <span className="font-mono text-[10px] text-[#FF6B35] bg-[#FF6B35]/10 px-2 py-0.5 rounded border border-[#FF6B35]/20">RESEARCH</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Step 2 */}
                <Reveal delay={0.2}>
                  <div className="flex gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-bg-card border border-p5/50 flex items-center justify-center flex-shrink-0 mt-1 ring-4 ring-bg-surf group-hover:border-p5 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-p5 group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Cog className="w-4 h-4 text-t3 group-hover:text-p5 transition-colors" />
                        <h3 className="text-lg font-bold font-display text-t1 uppercase tracking-wider">Define</h3>
                      </div>
                      <p className="text-sm text-t2 mb-3">Synthèse des logs. Identification des frictions et structuration de l'architecture de l'information.</p>
                      <div className="inline-flex">
                        <span className="font-mono text-[10px] text-p5 bg-p5/10 px-2 py-0.5 rounded border border-p5/20">STRATEGY</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Step 3 */}
                <Reveal delay={0.3}>
                  <div className="flex gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-bg-card border border-c5/50 flex items-center justify-center flex-shrink-0 mt-1 ring-4 ring-bg-surf group-hover:border-c5 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-c5 group-hover:scale-125 transition-transform" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Cog className="w-4 h-4 text-t3 group-hover:text-c5 transition-colors" />
                        <h3 className="text-lg font-bold font-display text-t1 uppercase tracking-wider">Design</h3>
                      </div>
                      <p className="text-sm text-t2 mb-3">Forge des interfaces. Création de filaires stricts, design systems et prototypes interactifs.</p>
                      <div className="inline-flex">
                        <span className="font-mono text-[10px] text-c5 bg-c5/10 px-2 py-0.5 rounded border border-c5/20">UI/UX</span>
                      </div>
                    </div>
                  </div>
                </Reveal>

                {/* Step 4 */}
                <Reveal delay={0.4}>
                  <div className="flex gap-6 group">
                    <div className="w-8 h-8 rounded-full bg-bg-card border border-border-color flex items-center justify-center flex-shrink-0 mt-1 ring-4 ring-bg-surf group-hover:border-t2 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-t3 group-hover:scale-125 transition-transform group-hover:bg-t2" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <Cog className="w-4 h-4 text-t3 group-hover:text-t2 transition-colors" />
                        <h3 className="text-lg font-bold font-display text-t1 uppercase tracking-wider">Test</h3>
                      </div>
                      <p className="text-sm text-t2 mb-3">Épreuve de vérité. Tests d'usabilité, itérations intensives et validation du design final.</p>
                      <div className="inline-flex">
                        <span className="font-mono text-[10px] text-t2 bg-bg-el px-2 py-0.5 rounded border border-border-color/30">ITERATION</span>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
              
              {/* Centered Mechanicus Disclaimer */}
              <Reveal delay={0.5}>
                <div className="mt-16 flex items-center justify-center gap-4 group cursor-default">
                  <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-t3/30" />
                  <span className="font-mono text-[10px] sm:text-[11px] text-t3 opacity-40 group-hover:opacity-70 transition-opacity duration-500 tracking-wider text-center">
                    // L'esthétique Mechanicus est un clin d'œil — le designer, lui, est bien réel.
                  </span>
                  <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-t3/30" />
                </div>
              </Reveal>
            </div>

          </div>
        </div>
      </section>

      {/* ── TIMELINE - Data-Log Mechanicus ── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Divider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              >
                <Cog className="w-4 h-4 text-p5/40" />
              </motion.div>
              <Label>Data-Log // Expériences</Label>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12">
              Parcours professionnel
            </h2>
          </Reveal>

          <div className="flex flex-col">
            <TimelineEntry
              year="2026"
              role="Graphic Designer (Stagiaire - 2 mois)"
              company="Happy Job - Bordeaux"
              desc="Production visuelle pour le réseau d'agences. Campagnes saisonnières de recrutement (concept carte à jouer), gestion des assets créatifs, coordination multi-agences."
              tags={["Illustrator", "Photoshop", "InDesign", "Direction artistique"]}
              delay={0}
            />
            <TimelineEntry
              year="2022-2025"
              role="Diplôme Concepteur UI"
              company="EGS"
              desc="Formation de 3 ans en design aboutissant à l'obtention de mon diplôme Concepteur UI en 2025. Apprentissage intensif des fondamentaux : UX Research, prototypage et design systems."
              tags={["UI Design", "Figma", "Prototypage", "Design Systems"]}
              delay={0.1}
            />
            <TimelineEntry
              year="2023-2024"
              role="Alternant Art Direction"
              company="EVA - Bordeaux"
              desc="Art direction pour les réseaux sociaux. Création de contenu vidéo et graphique, stratégie visuelle pour les campagnes social media."
              tags={["Social Media", "Vidéo", "Motion", "Stratégie visuelle"]}
              delay={0.2}
            />
            <TimelineEntry
              year="2022"
              role="Stagiaire Identité Visuelle"
              company="Yumie - Bordeaux"
              desc="Conception d'identités visuelles et de supports print. Travail sur la cohérence graphique de marques, déclinaisons logo, papeterie et signalétique."
              tags={["Branding", "Print", "Logo", "Charte graphique"]}
              delay={0.3}
              isLast
            />
          </div>
        </div>
      </section>

      {/* ── SKILLS - Tech-Priest Knowledge ── */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <Divider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-2 block">Savoirs techniques</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12">
              Compétences & outils
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-4 mt-8">
            {/* Design skills */}
            <ProtocolCard name="UX Research" rank="MAÎTRE" desc="Entretiens · Tests usabilité · Analyse comportementale" color="#8B5CF6" delay={0.0} widthClass="md:col-span-12 lg:col-span-5" />
            <ProtocolCard name="UI Design" rank="ARCHIVISTE" desc="Design systems · Interfaces Hi-Fi · Maquettage responsive" color="#8B5CF6" delay={0.1} widthClass="md:col-span-6 lg:col-span-7" />
            <ProtocolCard name="Prototypage" rank="MAÎTRE" desc="Micro-interactions · Parcours fluides · Tests utilisateurs" color="#8B5CF6" delay={0.2} widthClass="md:col-span-6 lg:col-span-4" />
            <ProtocolCard name="Design Systems" rank="ADEPTE" desc="Tokens · Bibliothèques de composants · Documentation" color="#8B5CF6" delay={0.3} widthClass="md:col-span-12 lg:col-span-8" />
            <ProtocolCard name="UX Audit" rank="MAÎTRE" desc="Études heuristiques · Analyse de frictions · Optimisations" color="#8B5CF6" delay={0.4} widthClass="md:col-span-6" />
            <ProtocolCard name="Design Graphique" rank="ARCHIVISTE" desc="Direction artistique · Identité visuelle · Typographie" color="#8B5CF6" delay={0.5} widthClass="md:col-span-6" />
            
            {/* Separation log */}
            <div className="md:col-span-12 sm:col-span-2 col-span-1 h-[1px] w-full bg-gradient-to-r from-transparent via-border-color/30 to-transparent my-4 relative">
               <div className="absolute left-1/2 -translate-x-1/2 -top-2 bg-bg-surf px-2 text-[9px] font-mono text-t3/50 tracking-[0.2em] uppercase">SYSTEM_LOAD // TOOLS</div>
            </div>

            {/* Tools */}
            <ProtocolCard name="Figma" rank="ARCHIVISTE" desc="Wireframes · Composants · Auto-layout · Variables" color="#06B6D4" delay={0.6} widthClass="md:col-span-12 lg:col-span-8" />
            <ProtocolCard name="Illustrator" rank="MAÎTRE" desc="Graphisme vectoriel · Création de logos · Illustration" color="#06B6D4" delay={0.7} widthClass="md:col-span-6 lg:col-span-4" />
            <ProtocolCard name="Photoshop" rank="MAÎTRE" desc="Retouche photo · Photomontage · Compositing digital" color="#06B6D4" delay={0.8} widthClass="md:col-span-6 lg:col-span-5" />
            <ProtocolCard name="InDesign" rank="ADEPTE" desc="Mise en page complexe · Web-to-print · Édition" color="#06B6D4" delay={0.9} widthClass="md:col-span-6 lg:col-span-4" />
            <ProtocolCard name="Framer" rank="ADEPTE" desc="Intégration et animation de maquettes interactives" color="#06B6D4" delay={1.0} widthClass="md:col-span-12 lg:col-span-3" />
            <ProtocolCard name="After Effects" rank="INITIÉ" desc="Motion design élémentaire · Animations UI simples" color="#06B6D4" delay={1.1} widthClass="md:col-span-12" />
          </div>
        </div>
      </section>

      {/* ── PASSIONS - Beyond the Forge ── */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <Divider />
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-2 block">Au-delà du design</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4">
              Centres d'intérêt
            </h2>
            <p className="text-lg text-t2 max-w-2xl mb-12 leading-relaxed">
              Mes passions au quotidien. Des univers riches et des loisirs dans lesquels 
              j'aime m'investir quand je ne suis pas derrière un écran de travail.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-8">
            {/* 1. Warhammer 40K (Wide) */}
            <Reveal delay={0} className="md:col-span-12 lg:col-span-8">
              <div className="group relative p-6 md:p-8 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#8B5CF6]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                  <motion.div className="text-[#8B5CF6]" whileHover={{ rotate: 180 }} transition={{ duration: 4, ease: "linear", repeat: Infinity }}>
                    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round"/>
                       <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#8B5CF6] px-2 py-1 bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 rounded uppercase tracking-wider whitespace-nowrap">
                    LORE DEPTH : MAX
                  </span>
                </div>
                <div className="relative z-10 max-w-xl">
                  <h3 className="text-xl md:text-2xl font-bold font-display text-t1 mb-2 group-hover:text-[#8B5CF6] transition-colors">Warhammer 40K</h3>
                  <p className="text-sm text-t2 leading-relaxed">Adeptus Mechanicus, Dark Angels, et l'immense lore du 41e millénaire. Je suis fasciné par la noirceur et la démesure de cet univers.</p>
                </div>
              </div>
            </Reveal>

            {/* 2. Anime & Manga */}
            <Reveal delay={0.1} className="md:col-span-6 lg:col-span-4">
              <div className="group relative p-6 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#E91E63]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(233, 30, 99, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-2">
                  <motion.div className="text-[#E91E63]" whileHover={{ scale: 1.1, rotate: 15 }} transition={{ duration: 0.3 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                       <circle cx="12" cy="12" r="3" />
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#E91E63] px-2 py-1 bg-[#E91E63]/10 border border-[#E91E63]/20 rounded uppercase tracking-[0.1em] whitespace-nowrap">
                    STATUS : WEEB_ON
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-display text-t1 mb-2 group-hover:text-[#E91E63] transition-colors">Anime, Manga & VN</h3>
                  <p className="text-sm text-t2 leading-relaxed">Fate/TYPE-MOON, Umineko, Jujutsu Kaisen. Grand amateur de récits épiques et dramatiques.</p>
                </div>
              </div>
            </Reveal>

            {/* 3. TikTok */}
            <Reveal delay={0.2} className="md:col-span-6 lg:col-span-4">
              <div className="group relative p-6 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#06B6D4]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(6, 182, 212, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                  <motion.div className="text-[#06B6D4]" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <path d="M12 20V10" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
                       <path d="M12 2a10 10 0 0110 10" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 4"/>
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#06B6D4] px-2 py-1 bg-[#06B6D4]/10 border border-[#06B6D4]/20 rounded uppercase tracking-wider whitespace-nowrap">
                    21K ABONNÉS
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-display text-t1 mb-2 group-hover:text-[#06B6D4] transition-colors">TikTok</h3>
                  <p className="text-sm text-t2 leading-relaxed">Je partage ma passion pour l'univers de Warhammer 40K et vulgarise son lore auprès de ma communauté.</p>
                </div>
              </div>
            </Reveal>

            {/* 4. Photographie */}
            <Reveal delay={0.3} className="md:col-span-6 lg:col-span-4">
              <div className="group relative p-6 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#F59E0B]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(245, 158, 11, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                  <motion.div className="text-[#F59E0B]" whileHover={{ scale: 0.85 }} transition={{ duration: 0.3, type: "spring" }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <circle cx="12" cy="12" r="10" />
                       <path d="M14.31 8l5.74 9.94M9.69 8h11.48M7.38 12l5.74-9.94M9.69 16L3.95 6.06M14.31 16H2.83M16.62 12l-5.74 9.94" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#F59E0B] px-2 py-1 bg-[#F59E0B]/10 border border-[#F59E0B]/20 rounded uppercase tracking-wider whitespace-nowrap">
                    FUJIFILM X-T20
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-display text-t1 mb-2 group-hover:text-[#F59E0B] transition-colors">Photographie</h3>
                  <p className="text-sm text-t2 leading-relaxed">Équipé de mon appareil. J'aime me balader pour figer l'instant, jouer avec les cadres et la lumière naturelle.</p>
                </div>
              </div>
            </Reveal>

            {/* 5. PC Gaming */}
            <Reveal delay={0.4} className="md:col-span-6 lg:col-span-6">
              <div className="group relative p-6 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#10B981]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(16, 185, 129, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                  <motion.div className="text-[#10B981]" whileHover={{ y: [-2, 2, -2] }} transition={{ duration: 0.4, repeat: Infinity }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <rect x="3" y="3" width="7" height="7" rx="1" />
                       <rect x="14" y="3" width="7" height="7" rx="1" />
                       <rect x="14" y="14" width="7" height="7" rx="1" />
                       <rect x="3" y="14" width="7" height="7" rx="1" />
                       <path d="M10 6h4M10 17.5h4M6.5 10v4M17.5 10v4" strokeLinecap="round" />
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#10B981] px-2 py-1 bg-[#10B981]/10 border border-[#10B981]/20 rounded uppercase tracking-wider whitespace-nowrap">
                    RANK IV
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-display text-t1 mb-2 group-hover:text-[#10B981] transition-colors">PC Gaming</h3>
                  <p className="text-sm text-t2 leading-relaxed">Dévoreur de RPGs et de jeux purement narratifs, toujours à la recherche d'aventures immersives et marquantes.</p>
                </div>
              </div>
            </Reveal>

            {/* 6. Univers Narratifs */}
            <Reveal delay={0.5} className="md:col-span-12 lg:col-span-6">
              <div className="group relative p-6 rounded-2xl bg-bg-card border border-border-color/30 overflow-hidden flex flex-col justify-between h-full min-h-[220px] transition-colors hover:border-[#A78BFA]/50">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" style={{ background: "radial-gradient(circle at top right, rgba(167, 139, 250, 0.15), transparent 70%)" }} />
                <div className="flex justify-between items-start mb-6 relative z-10 gap-4">
                  <motion.div className="text-[#A78BFA]" whileHover={{ scale: 1.1, rotate: -15 }} transition={{ duration: 0.3 }}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                       <circle cx="12" cy="12" r="3" />
                       <path d="M12 9V3M12 21v-6M9 12H3M21 12h-6m-4.24-4.24L4.88 4.88m14.24 14.24l-3.88-3.88m-6.36 0l-3.88 3.88M19.12 4.88l-3.88 3.88" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </motion.div>
                  <span className="font-mono text-[10px] text-[#A78BFA] px-2 py-1 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded uppercase tracking-wider whitespace-nowrap">
                    SYSTEM : COMPLEX
                  </span>
                </div>
                <div className="relative z-10">
                  <h3 className="text-lg font-bold font-display text-t1 mb-2 group-hover:text-[#A78BFA] transition-colors">Univers Narratifs</h3>
                  <p className="text-sm text-t2 leading-relaxed">Game of Thrones, Shinza Bansho... J'adore plonger dans des œuvres denses, décortiquer leur mythologie et débattre de powerscaling.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA CONTACT ── */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <Divider />
        <div className="max-w-3xl mx-auto px-6 mt-12 text-center">
          <Reveal>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-8"
            >
              <Cog className="w-10 h-10 text-p5/20" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-t1 mb-6">
              Convaincu ? Parlons ensemble.
            </h2>
            <p className="text-lg text-t2 mb-10 leading-relaxed">
              Je suis activement en recherche d'une alternance UX/UI à Bordeaux.
              Si mon profil vous intéresse, établissons le contact.
            </p>
            <button
              onClick={() => document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative inline-flex items-center justify-center gap-3 rounded-full bg-p5 text-white px-10 py-4 text-lg font-medium transition-all hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] overflow-hidden"
            >
              <span className="relative z-10 font-display tracking-wide">Établir le contact</span>
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
              />
            </button>
          </Reveal>

          {/* Data footer */}
          <Reveal delay={0.2}>
            <div className="flex justify-center gap-8 mt-16 pt-8 border-t border-border-color/20">
              {[
                { label: "Localisation", value: "Bordeaux, FR" },
                { label: "Disponibilité", value: "Septembre 2026" },
                { label: "Dossier", value: "QS-2026-001" },
              ].map(item => (
                <div key={item.label} className="text-center">
                  <span className="font-mono text-[9px] text-t3/50 tracking-[0.2em] uppercase block mb-1">{item.label}</span>
                  <span className="font-mono text-[11px] text-t2">{item.value}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
