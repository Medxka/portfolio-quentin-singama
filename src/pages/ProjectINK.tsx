import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Tag } from "@/src/components/ui/Tag"
import { Label } from "@/src/components/ui/Label"

/* ── INK color tokens ── */
const INK = {
  red: "#AB0600",
  redDark: "#7A0400",
  black: "#000000",
  kniWhite: "#FFFFFF",
  kniGray: "#333333",
}

/* ── Glitch text effect ── */
function GlitchDivider() {
  return (
    <div className="relative h-[2px] w-full my-4 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${INK.red}60, transparent)` }} />
      <motion.div
        className="absolute top-0 h-full w-24"
        style={{ background: `linear-gradient(to right, transparent, ${INK.red}, transparent)` }}
        animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
      {/* Glitch flicker */}
      <motion.div
        className="absolute inset-0"
        style={{ backgroundColor: INK.red }}
        animate={{ opacity: [0, 0, 0.8, 0, 0, 0, 0.5, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 5 }}
      />
    </div>
  )
}

/* ── Timeline event ── */
function TimelineEvent({ year, title, desc, delay = 0 }: { year: string; title: string; desc: string; delay?: number }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-3 h-3 rounded-full border-2 flex-shrink-0"
          style={{ borderColor: INK.red, backgroundColor: isInView ? INK.red : "transparent" }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 300 }}
        />
        <motion.div
          className="w-[1px] flex-1 mt-1"
          style={{ backgroundColor: INK.red + "30" }}
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ delay: delay + 0.3, duration: 0.5 }}
        />
      </div>

      {/* Content */}
      <div className="pb-8">
        <span className="font-mono text-[11px] tracking-[0.15em] block mb-1" style={{ color: INK.red }}>
          {year}
        </span>
        <h4 className="text-base md:text-lg font-bold font-display text-t1 mb-2">{title}</h4>
        <p className="text-sm text-t2 leading-relaxed whitespace-pre-line">{desc}</p>
      </div>
    </motion.div>
  )
}

/* ── Data-log code block ── */
function DataLog({ children }: { children: string }) {
  return (
    <div className="relative rounded-xl overflow-hidden border" style={{ borderColor: INK.red + "25" }}>
      {/* Top bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b" style={{ borderColor: INK.red + "20", backgroundColor: INK.red + "08" }}>
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: INK.red }} />
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase" style={{ color: INK.red + "80" }}>DATA-LOG</span>
        <motion.div
          className="ml-auto w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: INK.red }}
          animate={{ opacity: [1, 0.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      {/* Code content */}
      <pre className="p-5 md:p-6 font-mono text-[11px] md:text-xs leading-relaxed text-t2 overflow-x-auto bg-bg-card/50">
        {children}
      </pre>
    </div>
  )
}

/* ── Color swatch ── */
function Swatch({ color, name, hex }: { color: string; name: string; hex: string }) {
  return (
    <motion.div
      className="flex items-center gap-3 group"
      whileHover={{ x: 4 }}
      transition={{ type: "spring", stiffness: 400 }}
    >
      <div
        className="w-8 h-8 rounded-lg border border-white/10 shadow-lg group-hover:scale-110 transition-transform"
        style={{ backgroundColor: color }}
      />
      <div>
        <span className="text-sm font-medium text-t1 block">{name}</span>
        <span className="text-[10px] font-mono text-t3">{hex}</span>
      </div>
    </motion.div>
  )
}

/* ── Main page ── */
export function ProjectINK() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* ── Timeline data ── */
  const timelineEvents = [
    { year: "2038", title: "PREMIER BLACKOUT NUMÉRIQUE", desc: "Une cyberattaque mondiale d'origine inconnue paralyse les réseaux pendant 72h. 2,4 milliards de personnes sans communication. Les gouvernements commencent à centraliser le contrôle des flux d'information." },
    { year: "2047", title: "GUERRE DES SEMI-CONDUCTEURS", desc: "Conflits armés en Asie du Sud-Est pour le contrôle des ressources nécessaires à la production de puces. 18 nations impliquées. 340 millions de déplacés. La presse papier est jugée \"vecteur de propagande décentralisée non contrôlable\"." },
    { year: "2050", title: "LE BLACKOUT IMPÉRIAL", desc: "Effondrement simultané de 94% des infrastructures numériques mondiales. Cause officielle : surcharge systémique. Cause réelle : jamais établie. 4 ans de chaos géopolitique s'ensuivent." },
    { year: "2054", title: "TRAITÉ DE GENÈVE NUMÉRIQUE", desc: "Signature par 187 nations d'un accord de \"stabilisation informationnelle\". Création du Conseil Provisoire de Régulation Mondiale. Premier embryon du futur 13e Ordre." },
    { year: "2078", title: "NAISSANCE DU 13E ORDRE", desc: "Le Conseil Provisoire se transforme en autorité permanente. Premier Édit : \"Toute information non validée par le Conseil est une menace à la stabilité collective.\"" },
    { year: "2089", title: "FONDATION DE K.N.I.", desc: "Kinetic Nutrition Inc. est créée sous mandat du 13e Ordre. Mission officielle : nutrition optimisée pour la population mondiale. Mission réelle : surveiller les comportements de consommation et identifier les dissidents via leurs habitudes alimentaires." },
    { year: "2094", title: "LOI D'ÉPURATION — PHASE 1", desc: "Interdiction de toute presse physique. Justification : \"Le papier imprimé est un vecteur de désinformation non traçable.\" Peine : rééducation mémorielle de 6 mois." },
    { year: "2100", title: "LOI D'ÉPURATION — PHASE FINALE", desc: "Extension à tout objet imprimé : tickets, étiquettes, emballages, photographies, affiches. Le Print devient le bien le plus illégal — et donc le plus précieux — du monde. Naissance du marché noir." },
    { year: "2134", title: "FONDATION DE L'I.N.K.", desc: "Un collectif de 12 chercheurs développe la technologie de récupération temporelle. Objectif : voyager dans le passé pour extraire des prints avant leur destruction et les ramener dans le présent. Financement : vente aux enchères aux ultra-riches nostalgiques. Usage des fonds : financer la résistance sur le front." },
    { year: "3113", title: "AUJOURD'HUI", desc: "L'I.N.K. opère depuis 979 ans. 200k crédits récoltés. 99% d'authenticité. 1M d'années parcourues. Le 13e Ordre ne sait pas encore qu'ils existent." },
  ]

  return (
    <div className="w-full" style={{ backgroundColor: "#0A0A0A" }}>

      {/* ═══════════════════════════════════════ */}
      {/* 1. HERO                                 */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: INK.black }}>
        {/* Red ambient glow */}
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: heroOpacity }}>
          <div className="absolute top-[20%] right-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[180px]"
            style={{ backgroundColor: INK.red + "10" }}
          />
          <div className="absolute bottom-[15%] left-[10%] w-[25vw] h-[25vw] max-w-[350px] max-h-[350px] rounded-full blur-[120px]"
            style={{ backgroundColor: INK.red + "08" }}
          />
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          {/* INK Logo SVG */}
          <Reveal>
            <div className="flex justify-center mb-8">
              <motion.svg
                viewBox="0 0 200 80"
                fill="none"
                className="w-48 md:w-64 h-auto"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* 4-branch star */}
                <path
                  d="M30 10 L34 30 L50 20 L40 34 L60 38 L40 42 L50 56 L34 46 L30 66 L26 46 L10 56 L20 42 L0 38 L20 34 L10 20 L26 30 Z"
                  fill="white"
                />
                {/* I */}
                <path d="M80 18 L80 58 L90 58 L90 18 Z" fill="white" />
                {/* N */}
                <path d="M100 18 L100 58 L110 58 L110 34 L130 58 L140 58 L140 18 L130 18 L130 42 L110 18 Z" fill="white" />
                {/* K */}
                <path d="M150 18 L150 58 L160 58 L160 42 L175 58 L188 58 L170 38 L186 18 L174 18 L160 34 L160 18 Z" fill="white" />
              </motion.svg>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white mb-4">
              INK — <span style={{ color: INK.red }}>Illicit Network Keepers</span>
            </h1>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="text-base md:text-lg text-t2 mb-10 max-w-2xl mx-auto">
              Hackathon créatif · Thème : "A Journey" · Thème imposé : Print · 48h · 2ème place
            </p>
          </Reveal>

          {/* Meta row */}
          <Reveal delay={0.35}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y max-w-3xl mx-auto"
              style={{ borderColor: INK.red + "25" }}
            >
              {[
                { label: "Rôle", value: "Storytelling & UI Design" },
                { label: "Durée", value: "48h" },
                { label: "Équipe", value: "Groupe 13 · 11 personnes" },
                { label: "École", value: "ECV Bordeaux" },
              ].map(item => (
                <div key={item.label}>
                  <Label className="mb-2 block" style={{ color: INK.red }}>{item.label}</Label>
                  <p className="font-medium text-t1 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0A0A0A] pointer-events-none z-10" />
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. LE BRIEF — DATA-LOG                  */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GlitchDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// MISSION_BRIEF</Label>
            <DataLog>{`// MISSION_BRIEF_REÇU — 09:00
SUJET    : A JOURNEY
THÈME    : PRINT ___
GROUPE   : 13
DURÉE    : 48H
OBJECTIF : CRÉER UNE MARQUE COMPLÈTE`}</DataLog>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-lg text-t2 leading-relaxed mt-10 max-w-3xl">
              Un hackathon créatif. Un thème : "A Journey". Un thème imposé : le Print.
              48h pour créer une marque, raconter une histoire, designer un site.
              On aurait pu faire une marque d'impression classique.{" "}
              <span className="text-t1 font-semibold">On a choisi de construire un univers.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. CHRONOLOGIE DU 13E ORDRE             */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <GlitchDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// CHRONOLOGIE — DATA-LOG HISTORIQUE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4 max-w-3xl">
              La chute du{" "}
              <span style={{ color: INK.red }}>monde libre</span>
            </h2>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Comment le Print est devenu le bien le plus illégal — et le plus précieux — de l'humanité.
            </p>
          </Reveal>

          {/* Timeline */}
          <div className="flex flex-col">
            {timelineEvents.map((ev, i) => (
              <div key={ev.year}>
                <TimelineEvent
                  year={ev.year}
                  title={ev.title}
                  desc={ev.desc}
                  delay={i * 0.08}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4. LES DEUX IDENTITÉS                   */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GlitchDivider />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// DOUBLE IDENTITÉ</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Deux faces d'une même{" "}
              <span style={{ color: INK.red }}>résistance</span>
            </h2>
          </Reveal>

          {/* Two columns */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 relative">
            {/* Vertical red separator (desktop) */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 z-10">
              <div className="w-full h-full" style={{ background: `linear-gradient(to bottom, transparent, ${INK.red}, transparent)` }} />
            </div>

            {/* LEFT — KNI */}
            <Reveal>
              <div className="p-6 md:p-10 rounded-2xl lg:rounded-r-none border border-border-color/30 lg:mr-4" style={{ backgroundColor: "#F5F5F5" }}>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: INK.kniGray }}>K.N.I. // KINETIC NUTRITION INC.</span>
                </div>

                {/* KNI Logo placeholder */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: INK.kniGray }}>
                  <span className="text-white font-bold font-display text-lg tracking-wider">KNI</span>
                </div>

                <p className="text-lg font-display font-bold mb-6" style={{ color: INK.kniGray }}>
                  "Approuvé par le 13e Ordre. Mangez en 10 secondes. Vivez 100%."
                </p>

                {/* KNI Palette */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-gray-300" style={{ backgroundColor: INK.kniWhite }} />
                    <span className="text-xs font-mono" style={{ color: INK.kniGray }}>Blanc #FFFFFF</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: INK.kniGray }} />
                    <span className="text-xs font-mono" style={{ color: INK.kniGray }}>Anthracite #333333</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: INK.black }} />
                    <span className="text-xs font-mono" style={{ color: INK.kniGray }}>Noir #000000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-gray-300 to-gray-500" />
                    <span className="text-xs font-mono" style={{ color: INK.kniGray }}>Texture métal</span>
                  </div>
                </div>

                <p className="text-xs font-mono" style={{ color: INK.kniGray + "80" }}>
                  Typos : PP Watch Medium / Extralight + Circular Std
                </p>
              </div>
            </Reveal>

            {/* RIGHT — INK */}
            <Reveal delay={0.15}>
              <div className="p-6 md:p-10 rounded-2xl lg:rounded-l-none border lg:ml-4 mt-4 lg:mt-0"
                style={{ backgroundColor: INK.black, borderColor: INK.red + "25" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>I.N.K. // ILLICIT NETWORK KEEPERS</span>
                </div>

                {/* INK Logo */}
                <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 border" style={{ borderColor: INK.red + "40" }}>
                  <svg viewBox="0 0 40 40" className="w-8 h-8" fill="white">
                    <path d="M20 2 L23 16 L35 10 L28 20 L42 22 L28 26 L35 36 L23 28 L20 42 L17 28 L5 36 L12 26 L-2 22 L12 20 L5 10 L17 16 Z"
                      transform="translate(2, 0) scale(0.9)"
                    />
                  </svg>
                </div>

                <p className="text-lg font-display font-bold text-white mb-6">
                  "Vous avez trouvé ce que le 13e Ordre cherche à{" "}
                  <span style={{ color: INK.red }}>effacer</span>."
                </p>

                {/* INK Palette */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded border border-white/20" style={{ backgroundColor: INK.black }} />
                    <span className="text-xs font-mono text-t3">Noir #000000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded" style={{ backgroundColor: INK.red }} />
                    <span className="text-xs font-mono text-t3">Rouge #AB0600</span>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <div className="w-full h-6 rounded" style={{ background: `linear-gradient(to right, ${INK.red}, ${INK.black})` }} />
                    <span className="text-xs font-mono text-t3 whitespace-nowrap">Dégradé</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* D.I.B. Alert */}
          <Reveal delay={0.25}>
            <motion.div
              className="mt-10 p-5 md:p-6 rounded-xl border relative overflow-hidden"
              style={{ borderColor: INK.red + "40", backgroundColor: INK.red + "06" }}
              animate={{ borderColor: [INK.red + "20", INK.red + "50", INK.red + "20"] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {/* Scanning line */}
              <motion.div
                className="absolute top-0 bottom-0 w-[200%] bg-gradient-to-r from-transparent via-red-500/5 to-transparent"
                animate={{ left: ["-100%", "100%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <pre className="font-mono text-[11px] md:text-xs leading-relaxed relative z-10" style={{ color: INK.red }}>
{`// D.I.B. ALERT — BUREAU D'INTÉGRITÉ NUMÉRIQUE
Détention de Print : effacement mémoriel immédiat.
Toute transaction non déclarée sera tracée.
Soyez vigilant. Soyez conformes.`}
              </pre>
            </motion.div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4.5. IDENTITÉ VISUELLE                  */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <GlitchDivider />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// IDENTITÉ VISUELLE — SYSTÈME GRAPHIQUE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Nuanciers & <span style={{ color: INK.red }}>typographie</span>
            </h2>
          </Reveal>

          {/* Nuanciers row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border bg-bg-card" style={{ borderColor: INK.red + "15" }}>
                <img src="/ink-nuancier-ink.png" alt="Nuancier INK — Noir, Rouge Résistance, Dégradé" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// NUANCIER INK</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card">
                <img src="/ink-nuancier-kni.png" alt="Nuancier KNI — palette gouvernementale" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// NUANCIER KNI</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card">
                <img src="/ink-nuancier-typo.png" alt="Nuancier typographique" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// NUANCIER TYPO</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Typography + Contexte + Covers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card">
                <img src="/ink-typo-utilisee.png" alt="Typographies utilisées" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// TYPOGRAPHIES UTILISÉES</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card">
                <img src="/ink-contexte.png" alt="Contexte narratif — 13e Ordre" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// CONTEXTE — 13E ORDRE</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* File covers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border bg-bg-card" style={{ borderColor: INK.red + "15" }}>
                <img src="/ink-cover-13ordre.png" alt="File cover — 13e Ordre" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// COVER — 13E ORDRE</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card">
                <img src="/ink-cover-kni.png" alt="File cover — KNI" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// COVER — KNI</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border bg-bg-card" style={{ borderColor: INK.red + "15" }}>
                <img src="/ink-cover-ink.png" alt="File cover — INK" className="w-full h-auto" />
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// COVER — INK</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 5. MOODBOARD                            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <GlitchDivider />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// RÉFÉRENCES VISUELLES — DATA-LOG MOODBOARD</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Inspirations &{" "}
              <span style={{ color: INK.red }}>références</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border shadow-2xl"
              style={{ borderColor: INK.red + "20" }}
            >
              <img
                src="/ink-sommaire.png"
                alt="Moodboard INK — références visuelles dystopiques"
                className="w-full h-auto hover:scale-[1.02] transition-transform duration-700"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. LES DEUX SITES — MOCKUPS             */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GlitchDivider />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// INTERFACES — DOUBLE STANDARD</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Façade & <span style={{ color: INK.red }}>clandestinité</span>
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* KNI Site mockup */}
            <Reveal>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card group">
                <div className="overflow-hidden">
                  <img
                    src="/ink-maquette-kni.png"
                    alt="Site KNI — façade gouvernementale"
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-t3">// FAÇADE GOUVERNEMENTALE</span>
                  <p className="text-sm text-t2 mt-2">
                    Interface froide, épurée. Capsules nutritives en grille. Tout semble normal.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* INK Site mockup */}
            <Reveal delay={0.15}>
              <div className="rounded-2xl overflow-hidden border bg-bg-card group"
                style={{ borderColor: INK.red + "25" }}
              >
                <div className="overflow-hidden">
                  <img
                    src="/ink-maquette.png"
                    alt="Site INK — interface clandestine"
                    className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700"
                  />
                </div>
                <div className="p-5">
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// INTERFACE CLANDESTINE</span>
                  <p className="text-sm text-t2 mt-2">
                    Prints aux enchères. Prix en crédits. Le marché noir de la mémoire imprimée.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Extended: auction + product pages + home KNI */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border bg-bg-card group" style={{ borderColor: INK.red + "15" }}>
                <div className="overflow-hidden">
                  <img src="/ink-enchere-full.png" alt="INK — Plateforme de mise aux enchères" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// ENCHÈRES — FULL VIEW</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="rounded-2xl overflow-hidden border bg-bg-card group" style={{ borderColor: INK.red + "15" }}>
                <div className="overflow-hidden">
                  <img src="/ink-enchere.png" alt="INK — Connexion enchères" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// MODAL CONNEXION</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card group">
                <div className="overflow-hidden">
                  <img src="/ink-home-kni.png" alt="KNI — Page d'accueil" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// HOME KNI — ACCUEIL OFFICIEL</span>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Products row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border-color/30 bg-bg-card group">
                <div className="overflow-hidden">
                  <img src="/ink-produit-kni.png" alt="KNI — Produits nutritionnels" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-t3">// PRODUITS KNI — NUTRITION CINÉTIQUE</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="rounded-2xl overflow-hidden border bg-bg-card group" style={{ borderColor: INK.red + "15" }}>
                <div className="overflow-hidden">
                  <img src="/ink-produits-print.png" alt="INK — Collection de prints" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-700" />
                </div>
                <div className="p-4">
                  <span className="font-mono text-[9px] tracking-[0.15em] uppercase" style={{ color: INK.red }}>// COLLECTION PRINTS — RELIQUES</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 7. MON RÔLE                             */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>
        <GlitchDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: INK.red }}>// CONTRIBUTION</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6">
              Mon rôle dans le{" "}
              <span style={{ color: INK.red }}>Groupe 13</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg text-t2 leading-relaxed mb-10">
              Dans ce groupe de 11, je me suis occupé du <span className="text-t1 font-semibold">storytelling</span> — construire
              la chronologie du 13e Ordre, le narratif de l'I.N.K., la logique de l'univers — et de{" "}
              <span className="text-t1 font-semibold">l'UI du site INK</span> (interface clandestine rouge/noir).
              Le branding KNI et INK, le moodboard et les assets produits ont été réalisés en collaboration avec l'équipe.
            </p>
          </Reveal>

          {/* Team */}
          <Reveal delay={0.2}>
            <div className="p-6 rounded-xl border" style={{ borderColor: INK.red + "20", backgroundColor: INK.red + "05" }}>
              <span className="font-mono text-[10px] tracking-[0.15em] uppercase block mb-4" style={{ color: INK.red + "80" }}>
                // ÉQUIPE COMPLÈTE — GROUPE 13
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  "Félix Hieronimus", "Maxanne Paix", "Elie Robin", "Renée Ogoula",
                  "Quentin Singama", "Leane Gouti", "Yani Madebos", "Lucas Neveur",
                  "Remi Cassan", "Aida Pozzobon", "Margot Mroczkowski"
                ].map((name) => (
                  <motion.span
                    key={name}
                    className={`px-3 py-1.5 rounded-lg text-sm border ${
                      name === "Quentin Singama" ? "font-semibold" : "text-t2"
                    }`}
                    style={{
                      borderColor: name === "Quentin Singama" ? INK.red + "60" : "rgba(255,255,255,0.08)",
                      backgroundColor: name === "Quentin Singama" ? INK.red + "15" : "rgba(255,255,255,0.03)",
                      color: name === "Quentin Singama" ? INK.red : undefined,
                    }}
                    whileHover={{ y: -2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    {name}
                  </motion.span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 8. RÉSULTAT                             */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <GlitchDivider />
        <div className="max-w-5xl mx-auto px-6 mt-12 text-center">
          <Reveal>
            <Label className="mb-6 block" style={{ color: INK.red }}>// RÉSULTAT FINAL</Label>

            {/* Big result */}
            <motion.div
              className="mb-4"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-7xl md:text-9xl font-bold font-display tracking-tighter" style={{ color: INK.red }}>
                2ÈME
              </span>
            </motion.div>

            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-12"
              style={{ borderColor: INK.red + "40", backgroundColor: INK.red + "10" }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: INK.red }} />
              <span className="font-mono text-xs uppercase tracking-wider" style={{ color: INK.red }}>Hackathon créatif ECV Bordeaux</span>
            </motion.div>
          </Reveal>

          {/* Stats row */}
          <Reveal delay={0.15}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "48h", label: "de création" },
                { value: "2", label: "marques complètes" },
                { value: "1", label: "univers dystopique" },
                { value: "979", label: "ans d'histoire inventée" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="p-5 rounded-xl border bg-bg-card"
                  style={{ borderColor: INK.red + "15" }}
                  whileHover={{ y: -3, borderColor: INK.red + "40" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="text-2xl md:text-3xl font-bold font-display block mb-1" style={{ color: INK.red }}>
                    {stat.value}
                  </span>
                  <span className="text-xs text-t2 uppercase tracking-wider">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>

          {/* Back link */}
          <Reveal delay={0.25}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-t2 hover:text-t1 transition-colors font-display text-sm tracking-wide group mt-16"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Retour aux projets
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
