import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useInView, useScroll, useTransform } from "motion/react"
import { Reveal } from "@/src/components/ui/Reveal"
import { Label } from "@/src/components/ui/Label"

/* ── Cyan tokens ── */
const C = {
  cyan: "#06B6D4",
  cyanDark: "#0891B2",
  bg: "#0A0A0F",
  card: "#0D0D14",
  cardAlt: "#111118",
}

/* ── Glitch divider (cyan) ── */
function CyanDivider() {
  return (
    <div className="relative h-[2px] w-full my-4 overflow-hidden">
      <div className="absolute inset-0" style={{ background: `linear-gradient(to right, transparent, ${C.cyan}60, transparent)` }} />
      <motion.div
        className="absolute top-0 h-full w-24"
        style={{ background: `linear-gradient(to right, transparent, ${C.cyan}, transparent)` }}
        animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
    </div>
  )
}

/* ── Terminal header ── */
function PageTerminalHeader() {
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b font-mono text-[10px] tracking-wider"
      style={{ backgroundColor: C.card, borderColor: C.cyan + "15" }}
    >
      <div className="flex gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: C.cyan }} />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
        <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
      </div>
      <span className="text-t3/50 uppercase hidden md:inline">// RSH-2025-QUAL — RAPPORT D'ANALYSE TERRAIN</span>
      <motion.span
        className="ml-auto px-2 py-0.5 border rounded-sm text-[9px] uppercase tracking-[0.15em]"
        style={{ borderColor: C.cyan + "50", color: C.cyan }}
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        DÉCRYPTÉ
      </motion.span>
    </div>
  )
}

/* ── Typewriter hook ── */
function useTypewriter(text: string, triggerInView: boolean, speed = 40) {
  const [displayed, setDisplayed] = React.useState("")
  const [done, setDone] = React.useState(false)
  React.useEffect(() => {
    if (!triggerInView) return
    let i = 0
    setDisplayed("")
    setDone(false)
    const iv = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) { clearInterval(iv); setDone(true) }
    }, speed)
    return () => clearInterval(iv)
  }, [triggerInView, text, speed])
  return { displayed, done }
}

/* ── SEQ bar ── */
function SEQBar({ score, max = 7, inView }: { score: number; max?: number; inView: boolean }) {
  const filled = Math.round((score / max) * max)
  return (
    <div className="font-mono text-[10px] flex items-center gap-2 mt-3">
      <span className="text-t3/50">SEQ</span>
      <span style={{ color: C.cyan }}>
        {"["}
        {Array.from({ length: max }, (_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.08 }}
          >
            {i < filled ? "█" : "░"}
          </motion.span>
        ))}
        {"]"}
      </span>
      <span className="text-t3">{score}/{max}</span>
    </div>
  )
}

/* ── Main page ── */
export function ProjectResearch() {
  const heroRef = React.useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  React.useEffect(() => { window.scrollTo(0, 0) }, [])

  return (
    <div className="w-full" style={{ backgroundColor: C.bg }}>

      {/* Terminal header */}
      <PageTerminalHeader />

      {/* ═══════════════════════════════════════ */}
      {/* 1. HERO                                 */}
      {/* ═══════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ backgroundColor: C.bg }}>
        <motion.div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: heroOpacity }}>
          <div className="absolute top-[20%] right-[20%] w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[180px]"
            style={{ backgroundColor: C.cyan + "08" }}
          />
        </motion.div>

        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
          <Reveal>
            <Label className="mb-6 block" style={{ color: C.cyan }}>// RAPPORT D'ANALYSE TERRAIN</Label>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white mb-6">
              Découverte de concerts{" "}
              <span style={{ color: C.cyan }}>chez les étudiants</span>
            </h1>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="text-base md:text-lg text-t2 mb-12 max-w-3xl mx-auto leading-relaxed">
              Une étude qualitative pour comprendre comment les 18-25 ans trouvent et choisissent leurs concerts — et pourquoi les outils existants ne leur suffisent pas.
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y max-w-4xl mx-auto"
              style={{ borderColor: C.cyan + "25" }}
            >
              {[
                { label: "Rôle", value: "UX Researcher" },
                { label: "Méthode", value: "7 entretiens semi-directifs + tâches utilisateur" },
                { label: "Durée", value: "Février 2025" },
                { label: "Équipe", value: "Q. Singama · T. Gonzalez · K. Lescure" },
              ].map(item => (
                <div key={item.label}>
                  <Label className="mb-2 block" style={{ color: C.cyan }}>{item.label}</Label>
                  <p className="font-medium text-t1 text-sm">{item.value}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent pointer-events-none z-10" style={{ to: C.bg }} />
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 2. POURQUOI CETTE ÉTUDE ?               */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <CyanDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// CONTEXTE — POURQUOI CETTE ÉTUDE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-8 max-w-3xl">
              Le <span style={{ color: C.cyan }}>point de départ</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-6 md:p-8 rounded-xl border relative overflow-hidden"
              style={{ borderColor: C.cyan + "20", backgroundColor: C.card }}
            >
              <p className="text-base md:text-lg text-t2 leading-relaxed italic relative z-10">
                "On voulait comprendre comment les étudiants utilisent le numérique pour aller en concert.
                Pas pour juger telle ou telle app, mais pour voir comment ces outils s'insèrent vraiment dans leur quotidien — et ce qui les pousse, ou les freine, à y aller."
              </p>
              <div className="absolute top-4 left-4 text-[80px] font-display font-bold leading-none pointer-events-none" style={{ color: C.cyan + "10" }}>"</div>
            </div>
          </Reveal>

          {/* Hypotheses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <HypothesisCard
              tag="H1"
              title="EST-CE QUE LES CONCERTS SE DÉCOUVRENT PAR HASARD ?"
              desc="On pensait que la majorité des découvertes se font en scrollant les réseaux, pas en cherchant activement sur Google ou des apps spécialisées."
              result="CONFIRMÉE 6/7"
            />
            <HypothesisCard
              tag="H2"
              title="EST-CE QUE LES AMIS DÉCLENCHENT LA DÉCISION ?"
              desc="On pensait que le groupe social joue un rôle central — que le concert devient surtout un prétexte pour se retrouver entre potes."
              result="CONFIRMÉE 7/7"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 3. COMMENT ON A TRAVAILLÉ               */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <CyanDivider />
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// MÉTHODOLOGIE — CE QU'ON A FAIT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Comment on a <span style={{ color: C.cyan }}>travaillé</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              On a rencontré <span className="font-mono font-bold" style={{ color: C.cyan }}>7</span> étudiants de 18 à 25 ans, en France.
              On a fait exprès de varier les profils : genres musicaux différents, fréquences de sortie variées, outils distincts.
              L'objectif n'était pas d'avoir un échantillon représentatif — mais des <span className="text-t1 font-semibold">récits riches et contrastés</span>.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <Reveal delay={0.1}>
              <div className="relative p-6 md:p-8 rounded-xl border overflow-hidden"
                style={{ borderColor: C.cyan + "15", backgroundColor: C.cardAlt }}
              >
                <div className="absolute top-4 right-4 text-[100px] font-mono font-bold leading-none pointer-events-none" style={{ color: C.cyan + "06" }}>①</div>
                <Label className="mb-4 block" style={{ color: C.cyan }}>CONVERSATION SUR LEURS HABITUDES</Label>
                <div className="space-y-3 text-sm text-t2 relative z-10">
                  <p>→ Comment ils découvrent les concerts ?</p>
                  <p>→ Quel rôle jouent leurs amis ?</p>
                  <p>→ Quels outils ils utilisent au quotidien ?</p>
                </div>
                <p className="text-xs text-t3 mt-4 font-mono">~25 min par entretien</p>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2}>
              <div className="relative p-6 md:p-8 rounded-xl border overflow-hidden"
                style={{ borderColor: C.cyan + "15", backgroundColor: C.cardAlt }}
              >
                <div className="absolute top-4 right-4 text-[100px] font-mono font-bold leading-none pointer-events-none" style={{ color: C.cyan + "06" }}>②</div>
                <Label className="mb-4 block" style={{ color: C.cyan }}>TÂCHE CONCRÈTE EN TEMPS RÉEL</Label>
                <div className="space-y-3 text-sm text-t2 relative z-10">
                  <p className="italic">"Trouve un concert dans les 2 prochaines semaines et propose-le à tes amis, avec tes vrais outils."</p>
                  <p>→ On observait et on notait sans intervenir.</p>
                  <p>→ À la fin : note de facilité de <span className="font-mono font-bold" style={{ color: C.cyan }}>1 à 7</span> (SEQ).</p>
                </div>
                <p className="text-xs text-t3 mt-4 font-mono">~20 min par entretien</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4. CE QU'ON A DÉCOUVERT — 4 INSIGHTS    */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <CyanDivider />
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// RÉSULTATS — CE QU'ON A DÉCOUVERT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Les <span style={{ color: C.cyan }}>4 insights</span> principaux
            </h2>
          </Reveal>

          <div className="space-y-6">
            <InsightCard
              num="01"
              title="La découverte se fait par hasard"
              desc="Confirmé chez 6 participants sur 7. Personne ne cherche activement un concert sur Google ou une app spécialisée. L'information arrive toute seule en scrollant les réseaux. Seule exception : T2, qui n'a pas de réseaux sur son téléphone — et découvre quand même passivement, via les affiches et ses amis."
              quote="Je les découvre en scrollant Twitter, j'ai juste à attendre que le concert soit annoncé."
              quoteAuthor="Q1"
            />
            <InsightCard
              num="02"
              title="Les amis sont au cœur de la décision"
              desc="Confirmé chez tous, mais différemment. Certains n'y vont tout simplement pas sans accompagnant. D'autres se motivent mieux en groupe mais peuvent y aller seuls. Pour K3, c'est même économique : le billet coûte moins cher à assumer quand on le vit à plusieurs."
              quote="Tout seul, je me motive moins. Si les potes y vont, je peux y aller même si je connais pas tant que ça."
              quoteAuthor="T1"
            />
            <InsightCard
              num="03"
              title="Le budget est le vrai frein, pas les outils"
              desc="Résultat inattendu : tous les 7 participants ont parlé du budget spontanément, souvent en premier. Ce n'était pas dans nos hypothèses de départ. Certains ne s'informent même pas sur les concerts quand leur budget est serré — l'attention dépend de la capacité à agir."
              quote="Quand j'ai pas d'argent, je m'informe pas trop."
              quoteAuthor="Q2"
            />
            <InsightCard
              num="04"
              title="Le profil qui remet tout en question"
              desc="K2 va à plus de 10 concerts par an — mais trouve la découverte très difficile (score 1/7). Il n'utilise aucun réseau social, ne fait pas confiance aux algorithmes, et s'informe uniquement via ses amis et des newsletters. Ce décalage entre ce qu'on déclare et ce qu'on fait est l'enseignement le plus précieux de toute l'étude."
              quote=""
              quoteAuthor=""
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 5. LES 7 PROFILS                        */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <CyanDivider />
        <div className="max-w-6xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// PARTICIPANTS — LES 7 PROFILS</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              <span className="font-mono" style={{ color: C.cyan }}>7</span> récits, <span style={{ color: C.cyan }}>7</span> réalités
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Row 1: 3 */}
            <ProfileCard name="Q1" age="~20 ans" genre="K-Pop" badge="PASSIF TOTAL" score={7} delay={0}
              desc="Il attend que l'info vienne à lui via Twitter. Partage immédiatement sur Discord. Zéro friction."
            />
            <ProfileCard name="Q2" age="~20 ans" genre="K-Pop & Pop FR" badge="ALGORITHME FIRST" score={7} delay={0.08}
              desc="Elle fait plus confiance à l'algorithme qu'à ses amis. Adapte son canal de partage aux habitudes de ses copines."
            />
            <ProfileCard name="K1" age="~20 ans" genre="Rap · Occasionnel" badge="HYBRIDE" score={5} delay={0.16}
              desc="Profil hybride : scroll passif et recherche active selon son humeur. Autonome, jamais bloqué par le groupe."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Row 2: 2 */}
            <ProfileCard name="K2" age="~25 ans" genre="Variété FR · +10/an" badge="PARADOXE" score={3} delay={0.24}
              desc="Le paradoxe : le plus assidu trouve la découverte la plus difficile. Zéro réseaux, tout passe par ses amis."
            />
            <ProfileCard name="K3" age="~20 ans" genre="Rap · 3-5/an" badge="SOCIAL BLOQUANT" score={4} delay={0.32}
              desc="A renoncé à un concert car trop cher seul. Le groupe est un levier économique autant que social."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            {/* Row 3: 2 */}
            <ProfileCard name="T1" age="~22 ans" genre="Underground/Indie" badge="DICE USER" score={6} delay={0.4}
              desc="Seul à utiliser Dice + Spotify comme hub principal. Renonce si personne ne peut l'accompagner."
            />
            <ProfileCard name="T2" age="~23 ans" genre="Classique/Éclectique · Rare" badge="OFFLINE" score={5} delay={0.48}
              desc="Zéro réseaux par choix. Découverte offline uniquement. Sensibilité écolo = réticence aux gros événements."
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 6. SO WHAT ?                            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.cyan + "06" }}>
        <CyanDivider />
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// IMPLICATIONS — SI ON CONCEVAIT UN PRODUIT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Ce que ces résultats <span style={{ color: C.cyan }}>veulent dire</span>
            </h2>
          </Reveal>

          <div className="space-y-4">
            {[
              { id: "01", text: "Les alertes proactives sont plus utiles que les moteurs de recherche. L'utilisateur ne cherche pas — il reçoit." },
              { id: "02", text: "Une fonctionnalité \"aller avec des amis\" avant l'achat serait un levier fort. La décision est rarement solo." },
              { id: "03", text: "Afficher les prix dès la découverte, pas seulement à l'achat. Le budget conditionne même l'attention." },
              { id: "04", text: "Couvrir les événements underground — le catalogue incomplet est la friction principale de T1 sur Dice." },
            ].map((rec, i) => (
              <Reveal key={rec.id} delay={i * 0.1}>
                <div className="p-5 md:p-6 rounded-xl border flex items-start gap-4"
                  style={{ borderColor: C.cyan + "15", backgroundColor: C.card }}
                >
                  <span className="font-mono text-[10px] tracking-[0.15em] whitespace-nowrap mt-0.5" style={{ color: C.cyan + "60" }}>
                    // RECOMMANDATION_{rec.id}
                  </span>
                  <p className="text-base text-t2 leading-relaxed">
                    <span style={{ color: C.cyan }} className="font-bold">→</span>{" "}{rec.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 7. MON RÔLE & CE QUE J'AI APPRIS        */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <CyanDivider />
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// RÉFLEXION PERSONNELLE</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-8 max-w-3xl">
              Mon rôle & ce que <span style={{ color: C.cyan }}>j'ai appris</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="p-6 md:p-8 rounded-xl border relative overflow-hidden"
              style={{ borderColor: C.cyan + "15", backgroundColor: C.card }}
            >
              <p className="text-base text-t2 leading-relaxed">
                J'ai mené <span className="font-mono font-bold" style={{ color: C.cyan }}>3 des 7</span> entretiens, construit le guide d'entretien avec l'équipe, et participé à l'analyse thématique et à la rédaction du rapport final.
              </p>
              <p className="text-base text-t2 leading-relaxed mt-4">
                Ce que ce projet m'a appris : les premières interviews étaient trop ouvertes. J'ai appris à <span className="text-t1 font-semibold">reformuler sans orienter</span> à partir du 3ème entretien.
              </p>
              <p className="text-base text-t2 leading-relaxed mt-4">
                La limite principale : on a recruté par réseau personnel, ce qui crée un biais de sélection. Avec plus de temps, on aurait recruté via des associations étudiantes pour plus de diversité de profils.
              </p>
              <motion.span
                className="inline-block mt-2 font-mono text-sm"
                style={{ color: C.cyan }}
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >_</motion.span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* NEXT PROJECT                            */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-24 border-t text-center" style={{ borderColor: C.cyan + "15", backgroundColor: C.bg }}>
        <Reveal>
          <Label className="mb-4 block" style={{ color: C.cyan }}>PROJET SUIVANT</Label>
          <Link to="/musthane" className="inline-block group">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-t1 transition-colors group-hover:text-[#F59E0B]">
              Audit UX &amp; SEO Musthane →
            </h2>
          </Link>
        </Reveal>
      </section>
    </div>
  )
}

/* ═══════════════════════════════════════════════ */
/* SUB-COMPONENTS                                  */
/* ═══════════════════════════════════════════════ */

/* ── Hypothesis card ── */
function HypothesisCard({ tag, title, desc, result }: { tag: string; title: string; desc: string; result: string }) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const tw = useTypewriter(result, inView)

  return (
    <Reveal>
      <div ref={ref} className="p-6 rounded-xl border relative overflow-hidden h-full"
        style={{ borderColor: C.cyan + "20", backgroundColor: C.card }}
      >
        <span className="font-mono text-[10px] tracking-[0.15em] mb-4 block" style={{ color: C.cyan }}>[ {tag} ]</span>
        <h3 className="text-sm md:text-base font-bold font-display text-t1 mb-3 uppercase tracking-wide leading-snug">{title}</h3>
        <p className="text-sm text-t2 leading-relaxed mb-4">{desc}</p>
        <div className="font-mono text-[11px] tracking-[0.1em] px-2 py-1 rounded border inline-block"
          style={{ borderColor: C.cyan + "40", color: C.cyan, backgroundColor: C.cyan + "08" }}
        >
          [{tw.displayed}
          {!tw.done && <motion.span animate={{ opacity: [1, 0] }} transition={{ duration: 0.5, repeat: Infinity }}>▌</motion.span>}
          {tw.done && "]"}
        </div>
      </div>
    </Reveal>
  )
}

/* ── Insight card ── */
function InsightCard({ num, title, desc, quote, quoteAuthor }: { num: string; title: string; desc: string; quote: string; quoteAuthor: string }) {
  return (
    <Reveal>
      <div className="p-6 md:p-8 rounded-xl border-l-[3px] relative overflow-hidden"
        style={{ borderColor: C.cyan, backgroundColor: C.card }}
      >
        {/* Big watermark number */}
        <div className="absolute top-4 right-6 text-[80px] md:text-[120px] font-mono font-bold leading-none pointer-events-none" style={{ color: C.cyan + "06" }}>{num}</div>

        <Label className="mb-3 block relative z-10" style={{ color: C.cyan }}>INSIGHT {num}</Label>
        <h3 className="text-lg md:text-xl font-bold font-display text-t1 mb-4 relative z-10">{title}</h3>
        <p className="text-sm text-t2 leading-relaxed relative z-10 mb-4">{desc}</p>

        {quote && (
          <div className="relative p-4 rounded-lg mt-4 z-10" style={{ backgroundColor: C.cyan + "08" }}>
            <div className="absolute top-2 left-3 text-[40px] font-display font-bold leading-none pointer-events-none" style={{ color: C.cyan + "15" }}>"</div>
            <p className="italic text-sm text-t2 relative z-10 pl-6">
              "{quote}"
            </p>
            {quoteAuthor && (
              <span className="font-mono text-[10px] mt-2 block pl-6" style={{ color: C.cyan }}>— {quoteAuthor}</span>
            )}
          </div>
        )}
      </div>
    </Reveal>
  )
}

/* ── Profile card ── */
function ProfileCard({ name, age, genre, badge, score, desc, delay }: {
  name: string; age: string; genre: string; badge: string; score: number; desc: string; delay: number
}) {
  const ref = React.useRef(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })

  return (
    <Reveal delay={delay}>
      <motion.div
        ref={ref}
        className="p-5 rounded-xl border relative overflow-hidden group transition-all duration-300 h-full"
        style={{ borderColor: C.cyan + "12", backgroundColor: C.card }}
        whileHover={{ borderColor: C.cyan + "40" }}
      >
        {/* Badge */}
        <span className="absolute top-4 right-4 font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded-sm"
          style={{ borderColor: C.cyan + "30", color: C.cyan, backgroundColor: C.cyan + "08" }}
        >
          {badge}
        </span>

        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center border" style={{ borderColor: C.cyan + "30", backgroundColor: C.cyan + "10" }}>
            <span className="font-mono text-xs font-bold" style={{ color: C.cyan }}>{name}</span>
          </div>
          <div>
            <span className="text-xs text-t3 block">{age}</span>
            <span className="font-mono text-[9px] text-t3/60 uppercase tracking-wider">{genre}</span>
          </div>
        </div>

        <p className="text-sm text-t2 leading-relaxed mb-3">{desc}</p>

        <SEQBar score={score} inView={inView} />
      </motion.div>
    </Reveal>
  )
}
