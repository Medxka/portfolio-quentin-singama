import * as React from "react"
import { Link } from "react-router-dom"
import { motion, useScroll, useTransform } from "motion/react"
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
      <span className="text-t3/50 uppercase hidden md:inline">// RSH-2025-QUAL · RAPPORT D'ANALYSE TERRAIN</span>
      <span
        className="ml-auto px-2 py-0.5 border rounded-sm text-[9px] uppercase tracking-[0.15em]"
        style={{ borderColor: C.cyan + "50", color: C.cyan }}
      >
        DÉCRYPTÉ
      </span>
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
              Une étude qualitative pour comprendre comment les 18-25 ans trouvent et choisissent leurs concerts · et pourquoi les outils existants ne leur suffisent pas.
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
            <Label className="mb-4 block" style={{ color: C.cyan }}>// CONTEXTE · POURQUOI CETTE ÉTUDE</Label>
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
                Pas pour juger telle ou telle app, mais pour voir comment ces outils s'insèrent vraiment dans leur quotidien · et ce qui les pousse, ou les freine, à y aller."
              </p>
              <div className="absolute top-4 left-4 text-[80px] font-display font-bold leading-none pointer-events-none" style={{ color: C.cyan + "10" }}>"</div>
            </div>
          </Reveal>

          {/* Hypotheses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <HypothesisCard
              tag="H1"
              title="Est-ce que les concerts se découvrent par hasard ?"
              desc="On pensait que la majorité des découvertes se font en scrollant les réseaux, pas en cherchant activement sur Google ou des apps spécialisées."
              result="CONFIRMÉE 6/7"
            />
            <HypothesisCard
              tag="H2"
              title="Est-ce que les amis déclenchent la décision ?"
              desc="On pensait que le groupe social joue un rôle central · que le concert devient surtout un prétexte pour se retrouver entre potes."
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
            <Label className="mb-4 block" style={{ color: C.cyan }}>// MÉTHODOLOGIE · CE QU'ON A FAIT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-6 max-w-3xl">
              Comment on a <span style={{ color: C.cyan }}>travaillé</span>
            </h2>
            <p className="text-base md:text-lg text-t2 max-w-3xl leading-relaxed mb-12">
              On a rencontré <span className="font-mono font-bold" style={{ color: C.cyan }}>7</span> étudiants de 18 à 25 ans, en France.
              On a fait exprès de varier les profils : genres musicaux différents, fréquences de sortie variées, outils distincts.
              L'objectif n'était pas d'avoir un échantillon représentatif · mais des <span className="text-t1 font-semibold">récits riches et contrastés</span>.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Step 1 */}
            <Reveal delay={0.1}>
              <div className="relative p-6 md:p-8 rounded-xl border overflow-hidden"
                style={{ borderColor: C.cyan + "15", backgroundColor: C.cardAlt }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 block" style={{ color: C.cyan + "80" }}>ÉTAPE 1 · ~25 MIN</span>
                <h3 className="text-base md:text-lg font-bold font-display text-t1 mb-4 leading-snug">Conversation sur leurs habitudes</h3>
                <div className="space-y-2.5 text-sm text-t2 relative z-10">
                  <p>→ Comment ils découvrent les concerts ?</p>
                  <p>→ Quel rôle jouent leurs amis ?</p>
                  <p>→ Quels outils ils utilisent au quotidien ?</p>
                </div>
              </div>
            </Reveal>

            {/* Step 2 */}
            <Reveal delay={0.2}>
              <div className="relative p-6 md:p-8 rounded-xl border overflow-hidden"
                style={{ borderColor: C.cyan + "15", backgroundColor: C.cardAlt }}
              >
                <span className="font-mono text-[10px] tracking-[0.2em] uppercase mb-3 block" style={{ color: C.cyan + "80" }}>ÉTAPE 2 · ~20 MIN</span>
                <h3 className="text-base md:text-lg font-bold font-display text-t1 mb-4 leading-snug">Tâche concrète en temps réel</h3>
                <div className="space-y-2.5 text-sm text-t2 relative z-10">
                  <p className="italic text-t1/90">"Trouve un concert dans les 2 prochaines semaines et propose-le à tes amis, avec tes vrais outils."</p>
                  <p>→ Observation sans intervention.</p>
                  <p>→ À la fin : note SEQ de <span className="font-mono font-bold" style={{ color: C.cyan }}>1 à 7</span>.</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════ */}
      {/* 4. CE QU'ON A DÉCOUVERT · 4 INSIGHTS    */}
      {/* ═══════════════════════════════════════ */}
      <section className="py-20 md:py-28 relative overflow-hidden">
        <CyanDivider />
        <div className="max-w-5xl mx-auto px-6 mt-12">
          <Reveal>
            <Label className="mb-4 block" style={{ color: C.cyan }}>// RÉSULTATS · CE QU'ON A DÉCOUVERT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Les <span style={{ color: C.cyan }}>4 insights</span> principaux
            </h2>
          </Reveal>

          <div className="space-y-6">
            <InsightCard
              num="01"
              title="La découverte se fait par hasard"
              desc="Confirmé chez 6 participants sur 7. Personne ne cherche activement un concert sur Google ou une app spécialisée. L'information arrive toute seule en scrollant les réseaux. Seule exception : T2, qui n'a pas de réseaux sur son téléphone · et découvre quand même passivement, via les affiches et ses amis."
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
              desc="Résultat inattendu : tous les 7 participants ont parlé du budget spontanément, souvent en premier. Ce n'était pas dans nos hypothèses de départ. Certains ne s'informent même pas sur les concerts quand leur budget est serré · l'attention dépend de la capacité à agir."
              quote="Quand j'ai pas d'argent, je m'informe pas trop."
              quoteAuthor="Q2"
            />
            <InsightCard
              num="04"
              title="Le profil qui remet tout en question"
              desc="K2 va à plus de 10 concerts par an · mais trouve la découverte très difficile (score 1/7). Il n'utilise aucun réseau social, ne fait pas confiance aux algorithmes, et s'informe uniquement via ses amis et des newsletters. Ce décalage entre ce qu'on déclare et ce qu'on fait est l'enseignement le plus précieux de toute l'étude."
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
            <Label className="mb-4 block" style={{ color: C.cyan }}>// PARTICIPANTS · LES 7 PROFILS</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              <span className="font-mono" style={{ color: C.cyan }}>7</span> récits, <span style={{ color: C.cyan }}>7</span> réalités
            </h2>
          </Reveal>

          {/* Bento grid: K2 featured (2 cols), 6 autres (1 col) sur 4 cols total */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Featured: K2 — le paradoxe (2 cols) */}
            <ProfileCard featured name="K2" age="~25 ans" genre="Variété FR · +10 concerts/an" badge="PARADOXE" score={3} delay={0}
              desc="Le plus assidu trouve la découverte la plus difficile. Zéro réseaux, tout passe par ses amis. Ce décalage entre ce qu'on déclare et ce qu'on fait est l'enseignement le plus précieux de toute l'étude."
            />
            <ProfileCard name="Q1" age="~20 ans" genre="K-Pop" badge="PASSIF TOTAL" score={7} delay={0.06}
              desc="Il attend que l'info vienne à lui via Twitter. Partage sur Discord. Zéro friction."
            />
            <ProfileCard name="Q2" age="~20 ans" genre="K-Pop & Pop FR" badge="ALGORITHME FIRST" score={7} delay={0.12}
              desc="Elle fait plus confiance à l'algorithme qu'à ses amis. Adapte son canal aux habitudes de ses copines."
            />
            <ProfileCard name="K1" age="~20 ans" genre="Rap · Occasionnel" badge="HYBRIDE" score={5} delay={0.18}
              desc="Scroll passif et recherche active selon l'humeur. Autonome, jamais bloqué par le groupe."
            />
            <ProfileCard name="K3" age="~20 ans" genre="Rap · 3-5/an" badge="SOCIAL BLOQUANT" score={4} delay={0.24}
              desc="A renoncé à un concert car trop cher seul. Le groupe est un levier économique autant que social."
            />
            <ProfileCard name="T1" age="~22 ans" genre="Underground/Indie" badge="DICE USER" score={6} delay={0.3}
              desc="Seul à utiliser Dice + Spotify comme hub principal. Renonce si personne ne peut l'accompagner."
            />
            <ProfileCard name="T2" age="~23 ans" genre="Classique/Éclectique" badge="OFFLINE" score={5} delay={0.36}
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
            <Label className="mb-4 block" style={{ color: C.cyan }}>// IMPLICATIONS · SI ON CONCEVAIT UN PRODUIT</Label>
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-t1 mb-12 max-w-3xl">
              Ce que ces résultats <span style={{ color: C.cyan }}>veulent dire</span>
            </h2>
          </Reveal>

          <div className="space-y-4">
            {[
              { id: "01", text: "Les alertes proactives sont plus utiles que les moteurs de recherche. L'utilisateur ne cherche pas · il reçoit." },
              { id: "02", text: "Une fonctionnalité \"aller avec des amis\" avant l'achat serait un levier fort. La décision est rarement solo." },
              { id: "03", text: "Afficher les prix dès la découverte, pas seulement à l'achat. Le budget conditionne même l'attention." },
              { id: "04", text: "Couvrir les événements underground · le catalogue incomplet est la friction principale de T1 sur Dice." },
            ].map((rec, i) => (
              <Reveal key={rec.id} delay={i * 0.1}>
                <div className="p-5 md:p-6 rounded-xl border flex items-start gap-4 md:gap-5"
                  style={{ borderColor: C.cyan + "15", backgroundColor: C.card }}
                >
                  <span className="font-display text-2xl md:text-3xl font-bold leading-none shrink-0 mt-0.5" style={{ color: C.cyan }}>
                    {rec.id}
                  </span>
                  <p className="text-base text-t2 leading-relaxed">
                    {rec.text}
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
  return (
    <Reveal>
      <div className="p-6 rounded-xl border relative overflow-hidden h-full"
        style={{ borderColor: C.cyan + "20", backgroundColor: C.card }}
      >
        <span className="font-mono text-[10px] tracking-[0.15em] mb-4 block" style={{ color: C.cyan }}>HYPOTHÈSE {tag}</span>
        <h3 className="text-sm md:text-base font-bold font-display text-t1 mb-3 leading-snug">{title}</h3>
        <p className="text-sm text-t2 leading-relaxed mb-4">{desc}</p>
        <div className="font-mono text-[11px] tracking-[0.12em] px-2.5 py-1 rounded border inline-block"
          style={{ borderColor: C.cyan + "40", color: C.cyan, backgroundColor: C.cyan + "08" }}
        >
          {result}
        </div>
      </div>
    </Reveal>
  )
}

/* ── Insight card ── */
function InsightCard({ num, title, desc, quote, quoteAuthor }: { num: string; title: string; desc: string; quote: string; quoteAuthor: string }) {
  return (
    <Reveal>
      <div className="p-6 md:p-8 rounded-xl border-l-[3px] relative"
        style={{ borderColor: C.cyan, backgroundColor: C.card }}
      >
        <Label className="mb-3 block" style={{ color: C.cyan }}>INSIGHT {num}</Label>
        <h3 className="text-lg md:text-xl font-bold font-display text-t1 mb-4">{title}</h3>
        <p className="text-sm md:text-base text-t2 leading-relaxed mb-4">{desc}</p>

        {quote && (
          <blockquote className="mt-4 pl-4 border-l-2 italic text-sm md:text-base text-t1/90 leading-relaxed"
            style={{ borderColor: C.cyan + "60" }}
          >
            "{quote}"
            {quoteAuthor && (
              <span className="block font-mono text-[10px] mt-2 not-italic" style={{ color: C.cyan }}>· {quoteAuthor}</span>
            )}
          </blockquote>
        )}
      </div>
    </Reveal>
  )
}

/* ── Profile card (bento) ── */
function ProfileCard({ name, age, genre, badge, score, desc, delay, featured = false }: {
  name: string; age: string; genre: string; badge: string; score: number; desc: string; delay: number; featured?: boolean
}) {
  return (
    <Reveal delay={delay} className={featured ? "lg:col-span-2 md:col-span-2" : ""}>
      <motion.div
        className={`relative rounded-2xl border h-full flex flex-col transition-all duration-300 ${featured ? "p-6 md:p-8" : "p-5 md:p-6"}`}
        style={{
          borderColor: featured ? C.cyan + "35" : C.cyan + "15",
          backgroundColor: featured ? C.cyan + "08" : C.card,
        }}
        whileHover={{ borderColor: C.cyan + "55", y: -2 }}
      >
        {/* Top row: monogram + meta + badge */}
        <div className={`flex items-start justify-between gap-3 ${featured ? "mb-5" : "mb-4"}`}>
          <div className="flex items-center gap-3 min-w-0">
            {/* Big monogram */}
            <div
              className={`shrink-0 rounded-xl flex items-center justify-center border ${featured ? "w-14 h-14" : "w-11 h-11"}`}
              style={{
                borderColor: C.cyan + "40",
                backgroundColor: C.cyan + "12",
                boxShadow: featured ? `0 0 20px ${C.cyan}15` : "none",
              }}
            >
              <span className={`font-display font-bold ${featured ? "text-xl" : "text-base"}`} style={{ color: C.cyan }}>{name}</span>
            </div>
            <div className="min-w-0">
              <div className="text-sm text-t1 truncate">{age}</div>
              <div className="font-mono text-[10px] text-t3/70 uppercase tracking-wider truncate">{genre}</div>
            </div>
          </div>

          <span
            className="shrink-0 font-mono text-[8px] tracking-[0.15em] uppercase px-2 py-0.5 border rounded-sm whitespace-nowrap"
            style={{ borderColor: C.cyan + "35", color: C.cyan, backgroundColor: C.cyan + "08" }}
          >
            {badge}
          </span>
        </div>

        {/* Description */}
        <p className={`text-t2 leading-relaxed flex-1 ${featured ? "text-base md:text-lg italic text-t1/95" : "text-sm"}`}>
          {featured ? `"${desc}"` : desc}
        </p>

        {/* SEQ score visualization */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between gap-3" style={{ borderColor: C.cyan + "15" }}>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-t3/60">SEQ · facilité</span>
          <div className="flex items-center gap-1.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full"
                style={{
                  backgroundColor: i < score ? C.cyan : "transparent",
                  boxShadow: i < score ? `0 0 4px ${C.cyan}80` : "none",
                  border: i < score ? "none" : `1px solid ${C.cyan}30`,
                }}
              />
            ))}
            <span className="font-mono text-[10px] ml-1.5" style={{ color: C.cyan }}>{score}/7</span>
          </div>
        </div>
      </motion.div>
    </Reveal>
  )
}
