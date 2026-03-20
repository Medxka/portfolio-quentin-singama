import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Tag } from "@/src/components/ui/Tag"
import { Label } from "@/src/components/ui/Label"

/* ── LINA color tokens ── */
const LINA = {
  teal: "#2ABAB3",
  orange: "#E8654A",
  yellow: "#DDA448",
  cream: "#FDFDFD",
  sfBlue: "#203A7C",
  policierBlue: "#424076",
  romancePurple: "#8D6A9F",
}

/* ── Animated icon card ── */
function IconCard({ name, color, emoji, delay = 0 }: { name: string; color: string; emoji: string; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <motion.div
        className="flex flex-col items-center gap-3 group cursor-pointer"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        <motion.div
          className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl shadow-lg border border-white/10"
          style={{ backgroundColor: color }}
          whileHover={{ rotate: [0, -8, 8, -4, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {emoji}
        </motion.div>
        <span className="text-[11px] font-display uppercase tracking-wider text-t2 group-hover:text-t1 transition-colors">
          {name}
        </span>
      </motion.div>
    </Reveal>
  )
}

/* ── Journey step card ── */
function JourneyStep({ num, title, desc, delay = 0, color }: { num: string; title: string; desc: string; delay?: number; color: string }) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-5"
    >
      {/* Number circle */}
      <div className="flex flex-col items-center flex-shrink-0">
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold font-display border-2"
          style={{ borderColor: color, color: color }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: delay + 0.2, type: "spring", stiffness: 300 }}
        >
          {num}
        </motion.div>
        {/* Connecting line */}
        <motion.div
          className="w-[2px] flex-1 mt-2 rounded-full"
          style={{ backgroundColor: color + "30" }}
          initial={{ height: 0 }}
          animate={isInView ? { height: "100%" } : {}}
          transition={{ delay: delay + 0.4, duration: 0.6 }}
        />
      </div>

      {/* Content */}
      <div className="pb-10">
        <h4 className="text-lg font-bold font-display text-t1 mb-2">{title}</h4>
        <p className="text-sm text-t2 leading-relaxed">{desc}</p>
      </div>
    </motion.div>
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

/* ── Section divider with color bleed ── */
function ColorDivider({ color }: { color: string }) {
  return (
    <div className="relative h-[1px] w-full my-4">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${color}40, transparent)` }} />
      <motion.div
        className="absolute top-0 h-full w-20"
        style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }}
        animate={{ x: ["-80px", "calc(100vw + 80px)"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 5 }}
      />
    </div>
  )
}

export function ProjectLINA() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="w-full">

      {/* ═══════════════════════════════════════ */}
      {/* HERO - dark, LINA teal bleeds through  */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-end overflow-hidden pt-20 pb-16">
        {/* Teal ambient glow */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ opacity: heroOpacity }}
        >
          <div className="absolute top-[10%] right-[15%] w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[150px]"
            style={{ backgroundColor: LINA.teal + "12" }}
          />
          <div className="absolute bottom-[20%] left-[5%] w-[30vw] h-[30vw] max-w-[400px] max-h-[400px] rounded-full blur-[120px]"
            style={{ backgroundColor: LINA.orange + "08" }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
          <Reveal>
            <div className="flex flex-wrap gap-2 mb-8">
              <Tag>UX/UI Design</Tag>
              <Tag>Icon System</Tag>
              <Tag>Landing Page</Tag>
              <Tag>M1 ECV 2026</Tag>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight text-t1 mb-4 max-w-5xl leading-[0.95]">
              Repenser la{" "}
              <span style={{ color: LINA.teal }}>découverte</span>
              <br />en librairie indépendante
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="text-xl text-t2 max-w-2xl mb-10 leading-relaxed">
              Refonte UX/UI + système d'icônes + parcours pub → landing page
              pour les Librairies Indépendantes en Nouvelle-Aquitaine.
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y mb-8"
              style={{ borderColor: LINA.teal + "20" }}
            >
              {[
                { label: "Durée", value: "3 jours" },
                { label: "Rôle", value: "UX/UI Designer" },
                { label: "Équipe", value: "Duo" },
                { label: "Outils", value: "Figma, Illustrator" },
              ].map(item => (
                <div key={item.label}>
                  <Label className="mb-2 block">{item.label}</Label>
                  <p className="font-medium text-t1 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CONTEXTE - the 3 problems              */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <ColorDivider color={LINA.teal} />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: LINA.teal }}>LE CONTEXTE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Un site fonctionnel,<br />mais pas <span style={{ color: LINA.orange }}>inspirant</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Une étude menée sur 150 utilisateurs a révélé 3 problèmes majeurs
              sur les sites de regroupement de librairies indépendantes.
            </p>
          </Reveal>

          {/* 3 problem cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                num: "01",
                title: "Navigation orientée achat",
                desc: "Le site est construit pour ceux qui savent déjà ce qu'ils veulent - il ne favorise pas la découverte.",
                color: LINA.orange,
              },
              {
                num: "02",
                title: "Coups de cœur génériques",
                desc: "Les sélections sont trop similaires entre les différents sites régionaux. Aucune personnalité locale.",
                color: LINA.yellow,
              },
              {
                num: "03",
                title: "Prescription invisible",
                desc: "La recommandation des libraires - leur plus grande force - est noyée dans un site trop fonctionnel.",
                color: LINA.teal,
              },
            ].map((problem, i) => (
              <Reveal key={problem.num} delay={i * 0.1}>
                <motion.div
                  className="rounded-2xl border bg-bg-card p-6 h-full relative overflow-hidden group"
                  style={{ borderColor: problem.color + "15" }}
                  whileHover={{ y: -3, borderColor: problem.color + "40" }}
                  transition={{ duration: 0.3 }}
                >
                  {/* top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ backgroundColor: problem.color + "40" }} />
                  <span className="font-mono text-[10px] tracking-[0.2em] mb-4 block" style={{ color: problem.color + "80" }}>
                    {problem.num}
                  </span>
                  <h3 className="text-lg font-bold font-display text-t1 mb-3">{problem.title}</h3>
                  <p className="text-sm text-t2 leading-relaxed">{problem.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          {/* Blockquote */}
          <Reveal>
            <blockquote className="relative pl-6 py-4 max-w-3xl mx-auto"
              style={{ borderLeft: `3px solid ${LINA.orange}` }}
            >
              <p className="text-xl md:text-2xl font-display font-bold text-t1 leading-snug italic">
                "Comment mettre en avant le côté prescripteur des libraires
                tout en simplifiant la navigation entre genres ?"
              </p>
            </blockquote>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* SYSTÈME D'ICÔNES - colors emerge fully  */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <ColorDivider color={LINA.yellow} />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: LINA.yellow }}>SYSTÈME D'ICÔNES</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4 max-w-3xl">
              Des <span style={{ color: LINA.yellow }}>signes</span> pour guider la découverte
            </h2>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Remplacer la navigation textuelle par des icônes expressives et colorées.
              Chaque genre a sa couleur et son pictogramme - la navigation devient
              scannable en une seconde. Inspiré par Neurath (Isotype), Wyman (signe-guide)
              et Susan Kare (signe-émotion).
            </p>
          </Reveal>

          {/* Animated icon grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6 md:gap-8 mb-16">
            <IconCard name="Romance" color="#E91E63" emoji="💗" delay={0} />
            <IconCard name="Mecha" color="#F44336" emoji="🤖" delay={0.05} />
            <IconCard name="Sport" color="#FF9800" emoji="⚽" delay={0.1} />
            <IconCard name="Thriller" color={LINA.policierBlue} emoji="🔪" delay={0.15} />
            <IconCard name="Comédie" color="#00BCD4" emoji="🤡" delay={0.2} />
            <IconCard name="Manga" color="#795548" emoji="📖" delay={0.25} />
            <IconCard name="Sci-Fi" color={LINA.sfBlue} emoji="🚀" delay={0.3} />
            <IconCard name="Fantaisie" color="#4CAF50" emoji="⭐" delay={0.35} />
            <IconCard name="Aventure" color="#2196F3" emoji="⚔️" delay={0.4} />
            <IconCard name="Horreur" color="#37474F" emoji="💀" delay={0.45} />
            <IconCard name="Historique" color="#A1887F" emoji="🏰" delay={0.5} />
            <IconCard name="Jeunesse" color={LINA.yellow} emoji="🌟" delay={0.55} />
          </div>

          {/* Icon design image */}
          <Reveal>
            <div className="rounded-2xl overflow-hidden border border-border-color">
              <img
                src="/lina-icones.png"
                alt="Design d'icônes - LINA"
                className="w-full h-auto"
              />
            </div>
          </Reveal>

          {/* References */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { name: "Neurath", concept: "L'Isotype - le pictogramme universel" },
                { name: "Wyman", concept: "Le signe comme guide (Mexico '68)" },
                { name: "Kare", concept: "Le signe comme émotion (Macintosh)" },
              ].map((ref, i) => (
                <div key={ref.name} className="flex items-start gap-3 p-4 rounded-xl bg-bg-card border border-border-color/50">
                  <span className="font-mono text-[10px] text-p5/50 mt-1">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <span className="text-sm font-bold font-display text-t1">{ref.name}</span>
                    <p className="text-xs text-t2 mt-1">{ref.concept}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* REFONTE HOME - full color immersion     */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <ColorDivider color={LINA.teal} />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: LINA.teal }}>REFONTE DE LA HOME</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4 max-w-3xl">
              D'un catalogue à une expérience de{" "}
              <span style={{ color: LINA.teal }}>découverte</span>
            </h2>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              L'architecture a été repensée selon une logique de découverte, pas de catalogue.
              Des bandeaux colorés rythment le scroll. Les coups de cœur sont incarnés par
              de vrais libraires. Chaque sélection thématique a son univers visuel.
            </p>
          </Reveal>

          {/* Palette display */}
          <Reveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-bg-card border border-border-color/50">
              <Swatch color={LINA.teal} name="LINA Teal" hex="#2ABAB3" />
              <Swatch color={LINA.orange} name="Coups de cœur" hex="#E8654A" />
              <Swatch color={LINA.yellow} name="Jeunesse" hex="#DDA448" />
              <Swatch color={LINA.cream} name="Page de livre" hex="#FDFDFD" />
              <Swatch color={LINA.sfBlue} name="Fantasy & SF" hex="#203A7C" />
              <Swatch color={LINA.policierBlue} name="Policier" hex="#424076" />
              <Swatch color={LINA.romancePurple} name="Romance" hex="#8D6A9F" />
              <Swatch color="#1A4A47" name="Dark accent" hex="#1A4A47" />
            </div>
          </Reveal>

          {/* Desktop redesign image */}
          <Reveal delay={0.2}>
            <div className="rounded-2xl overflow-hidden border shadow-2xl"
              style={{ borderColor: LINA.teal + "25" }}
            >
              <img
                src="/lina-desktop.png"
                alt="Refonte desktop - LINA"
                className="w-full h-auto"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* PARCOURS PUB → LANDING - The First Heretic */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <ColorDivider color={LINA.orange} />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: LINA.orange }}>PARCOURS UTILISATEUR</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4 max-w-3xl">
              <span style={{ color: LINA.orange }}>The First Heretic</span> - un parcours immersif
            </h2>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Création d'un parcours complet : pub sur site partenaire → landing page dédiée → achat en librairie.
              Cible : Camille, chercheuse de cadeaux pour une amie fan d'heroic fantasy.
            </p>
          </Reveal>

          {/* Animated journey timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="flex flex-col">
              <JourneyStep
                num="01"
                title="Découverte"
                desc="Camille voit la pub 'The First Heretic' sur un site partenaire. L'illustration et le lore Warhammer captent son attention."
                delay={0}
                color={LINA.orange}
              />
              <JourneyStep
                num="02"
                title="Intérêt"
                desc="Clic vers la landing page dédiée. L'univers dark et cinématique crée une immersion immédiate."
                delay={0.15}
                color={LINA.orange}
              />
              <JourneyStep
                num="03"
                title="Exploration"
                desc="Navigation sur la landing : personnage, histoire, couverture 3D, limited edition. Chaque section nourrit l'envie."
                delay={0.3}
                color={LINA.teal}
              />
              <JourneyStep
                num="04"
                title="Décision"
                desc="CTA 'Acheter' → redirection vers le site LINA avec le livre pré-sélectionné. Achat en librairie indépendante."
                delay={0.45}
                color={LINA.teal}
              />
            </div>

            {/* Pub image */}
            <Reveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-border-color/50 shadow-xl sticky top-32">
                <img
                  src="/lina-heretic-poster.png"
                  alt="Pub The First Heretic"
                  className="w-full h-auto"
                />
              </div>
            </Reveal>
          </div>

          {/* Landing page images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Reveal>
              <div className="rounded-2xl overflow-hidden border border-border-color/50 shadow-lg">
                <img src="/lina-pub-landing.png" alt="Vue d'ensemble pub + landing" className="w-full h-auto" />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-border-color/50 shadow-lg">
                <img src="/lina-heretic-landing.png" alt="Landing page The First Heretic" className="w-full h-auto" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* NOTES D'INTENTION                       */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-bg-surf relative overflow-hidden">
        <ColorDivider color={LINA.yellow} />
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: LINA.yellow }}>NOTES D'INTENTION</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-4">
              Choix chromatiques & architecturaux
            </h2>
            <p className="text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              Le bleu LINA (#2ABAB3) est conservé - c'est l'identité du site. Le fond passe
              en blanc cassé, plus doux et proche d'une page de livre. Chaque section est
              introduite par un bandeau coloré qui traduit son émotion : orange pour les coups
              de cœur, bleu pour les nouveautés, jaune pour la jeunesse.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-border-color/50">
              <img src="/lina-notes.png" alt="Notes d'intention" className="w-full h-auto" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* CONCLUSION / APPRENTISSAGES             */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <Label className="mb-4 block">CE QUE J'AI APPRIS</Label>
            <h2 className="text-3xl md:text-4xl font-bold font-display tracking-tight text-t1 mb-8 max-w-3xl">
              3 jours pour repenser une expérience complète
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              {
                title: "Contrainte = créativité",
                desc: "3 jours pour un système d'icônes, une refonte et un parcours pub → landing. La contrainte de temps force les décisions rapides et les choix forts.",
                color: LINA.orange,
              },
              {
                title: "Les icônes simplifient tout",
                desc: "Une barre d'icônes remplace une sidebar de 18 lignes de texte. Le scanning visuel est 10x plus rapide que la lecture.",
                color: LINA.yellow,
              },
              {
                title: "La prescription doit être humaine",
                desc: "Afficher le nom du libraire et son avis transforme un catalogue en recommandation personnelle. Le local est un avantage.",
                color: LINA.teal,
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="p-6 rounded-2xl bg-bg-card border border-border-color/50 h-full">
                  <div className="w-2 h-2 rounded-full mb-4" style={{ backgroundColor: item.color }} />
                  <h3 className="text-lg font-bold font-display text-t1 mb-3">{item.title}</h3>
                  <p className="text-sm text-t2 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Back link */}
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-t2 hover:text-t1 transition-colors font-display text-sm tracking-wide group"
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
