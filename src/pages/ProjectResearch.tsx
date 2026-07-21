import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude Concerts 18-25, étude qualitative UX Research.
 * Projet sans visuels : tout repose sur la structure et les récits.
 * Même gabarit que Musthane/INK/LINA (hero espresso + sommaire scrollspy).
 */

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "methode", label: "Méthode" },
  { id: "insights", label: "Insights" },
  { id: "profils", label: "Profils" },
  { id: "implications", label: "Implications" },
  { id: "bilan", label: "Bilan" },
]

const META = [
  { label: "Rôle", value: "UX Researcher" },
  { label: "Méthode", value: "7 entretiens + tâche SEQ" },
  { label: "Durée", value: "Février 2025" },
  { label: "Équipe", value: "Trio · ECV Bordeaux" },
]

const HYPOTHESES = [
  {
    tag: "H1",
    title: "La découverte se fait par hasard ?",
    desc: "On pensait que la majorité des découvertes se font en scrollant les réseaux, pas en cherchant activement sur Google ou une app spécialisée.",
    result: "Confirmée · 6/7",
  },
  {
    tag: "H2",
    title: "Les amis déclenchent la décision ?",
    desc: "On pensait que le groupe social est central, le concert devient surtout un prétexte pour se retrouver entre potes.",
    result: "Confirmée · 7/7",
  },
]

const STEPS = [
  {
    step: "Étape 1 · ~25 min",
    title: "Conversation sur leurs habitudes",
    lines: [
      "Comment ils découvrent les concerts ?",
      "Quel rôle jouent leurs amis ?",
      "Quels outils ils utilisent au quotidien ?",
    ],
  },
  {
    step: "Étape 2 · ~20 min",
    title: "Tâche concrète en temps réel",
    lines: [
      "« Trouve un concert dans les 2 prochaines semaines et propose-le à tes amis, avec tes vrais outils. »",
      "Observation sans intervention.",
      "À la fin : note SEQ de 1 à 7.",
    ],
  },
]

const INSIGHTS = [
  {
    num: "01",
    title: "La découverte se fait par hasard",
    desc: "Confirmé chez 6 participants sur 7. Personne ne cherche activement sur Google ou une app spécialisée, l'information arrive en scrollant les réseaux. Seule exception : T2, sans réseaux, qui découvre quand même passivement via les affiches et ses amis.",
    quote:
      "Je les découvre en scrollant Twitter, j'ai juste à attendre que le concert soit annoncé.",
    author: "Q1",
  },
  {
    num: "02",
    title: "Les amis sont au cœur de la décision",
    desc: "Confirmé chez tous, mais différemment. Certains n'y vont pas sans accompagnant, d'autres se motivent mieux en groupe. Pour K3, c'est même économique : le billet s'assume à plusieurs.",
    quote:
      "Tout seul, je me motive moins. Si les potes y vont, je peux y aller même si je connais pas tant que ça.",
    author: "T1",
  },
  {
    num: "03",
    title: "Le budget est le vrai frein, pas les outils",
    desc: "Résultat inattendu : les 7 ont parlé du budget spontanément, souvent en premier. Ce n'était pas dans nos hypothèses. Certains ne s'informent même pas quand le budget est serré, l'attention dépend de la capacité à agir.",
    quote: "Quand j'ai pas d'argent, je m'informe pas trop.",
    author: "Q2",
  },
  {
    num: "04",
    title: "Le profil qui remet tout en question",
    desc: "K2 va à plus de 10 concerts par an mais trouve la découverte très difficile (1/7). Aucun réseau social, aucune confiance dans les algorithmes : il s'informe via ses amis et des newsletters. Ce décalage entre le déclaratif et le réel est l'enseignement le plus précieux de l'étude.",
    quote: "",
    author: "",
  },
]

type Profile = {
  name: string
  age: string
  genre: string
  badge: string
  score: number
  desc: string
  featured?: boolean
}

const PROFILES: Profile[] = [
  {
    name: "K2",
    age: "~25 ans",
    genre: "Variété FR · +10 concerts/an",
    badge: "Paradoxe",
    score: 3,
    desc: "Le plus assidu trouve la découverte la plus difficile. Zéro réseaux, tout passe par ses amis. Le décalage entre ce qu'on déclare et ce qu'on fait : l'enseignement le plus précieux de l'étude.",
    featured: true,
  },
  {
    name: "Q1",
    age: "~20 ans",
    genre: "K-Pop",
    badge: "Passif total",
    score: 7,
    desc: "Il attend que l'info vienne à lui via Twitter. Partage sur Discord. Zéro friction.",
  },
  {
    name: "Q2",
    age: "~20 ans",
    genre: "K-Pop & Pop FR",
    badge: "Algorithme first",
    score: 7,
    desc: "Elle fait plus confiance à l'algorithme qu'à ses amis. Adapte son canal aux habitudes de ses copines.",
  },
  {
    name: "K1",
    age: "~20 ans",
    genre: "Rap · Occasionnel",
    badge: "Hybride",
    score: 5,
    desc: "Scroll passif ou recherche active selon l'humeur. Autonome, jamais bloqué par le groupe.",
  },
  {
    name: "K3",
    age: "~20 ans",
    genre: "Rap · 3-5/an",
    badge: "Social bloquant",
    score: 4,
    desc: "A renoncé à un concert car trop cher seul. Le groupe est un levier économique autant que social.",
  },
  {
    name: "T1",
    age: "~22 ans",
    genre: "Underground / Indie",
    badge: "Dice user",
    score: 6,
    desc: "Seul à utiliser Dice + Spotify comme hub. Renonce si personne ne peut l'accompagner.",
  },
  {
    name: "T2",
    age: "~23 ans",
    genre: "Classique / Éclectique",
    badge: "Offline",
    score: 5,
    desc: "Zéro réseaux par choix. Découverte offline uniquement. Sensibilité écolo = réticence aux gros événements.",
  },
]

const IMPLICATIONS = [
  {
    id: "01",
    text: "Les alertes proactives sont plus utiles que les moteurs de recherche. L'utilisateur ne cherche pas, il reçoit.",
  },
  {
    id: "02",
    text: "Une fonction « y aller avec des amis » avant l'achat serait un levier fort. La décision est rarement solo.",
  },
  {
    id: "03",
    text: "Afficher les prix dès la découverte, pas seulement à l'achat. Le budget conditionne même l'attention.",
  },
  {
    id: "04",
    text: "Couvrir les événements underground, le catalogue incomplet est la friction principale de T1 sur Dice.",
  },
]

/* ── Sommaire latéral (scrollspy) ─────────────────────────── */
function SideNav() {
  const [active, setActive] = React.useState(SECTIONS[0].id)

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id)
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    )
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  return (
    <nav
      aria-label="Sommaire du cas d'étude"
      className="sticky top-28 hidden self-start lg:block"
    >
      <ul className="space-y-3.5">
        {SECTIONS.map((s) => {
          const isActive = active === s.id
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`group inline-flex items-center gap-3 font-mono text-mono-label uppercase transition-colors duration-300 ${
                  isActive ? "text-espresso" : "text-taupe-2 hover:text-espresso"
                }`}
              >
                <span
                  aria-hidden
                  className={`h-1.5 w-1.5 rounded-[1px] transition-all duration-300 ${
                    isActive ? "bg-apricot scale-125" : "bg-espresso/15"
                  }`}
                />
                {s.label}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ── Visualisation du score SEQ (facilité perçue 1→7) ─────── */
function SeqDots({ score, tone = "light" }: { score: number; tone?: "light" | "dark" }) {
  const on = tone === "dark" ? "bg-apricot" : "bg-sienna"
  const off = tone === "dark" ? "bg-linen/20" : "bg-espresso/12"
  const txt = tone === "dark" ? "text-apricot" : "text-sienna"
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: 7 }).map((_, i) => (
        <span
          key={i}
          aria-hidden
          className={`h-1.5 w-1.5 rounded-full ${i < score ? on : off}`}
        />
      ))}
      <span className={`ml-1.5 font-mono text-mono-label ${txt}`}>{score}/7</span>
    </div>
  )
}

/* ── Carte hypothèse ──────────────────────────────────────── */
function HypothesisCard({
  tag,
  title,
  desc,
  result,
}: {
  tag: string
  title: string
  desc: string
  result: string
  key?: React.Key | null
}) {
  return (
    <div className="flex h-full flex-col rounded-card border border-espresso/10 bg-cream p-6 shadow-sm">
      <span className="font-mono text-mono-label uppercase text-taupe-2">
        Hypothèse {tag}
      </span>
      <h3 className="mt-3 text-h5 text-espresso">{title}</h3>
      <p className="mt-3 flex-1 text-psmall text-taupe">{desc}</p>
      <span className="mt-5 inline-flex w-fit items-center rounded-pill border border-sienna/40 bg-sienna/8 px-2.5 py-1 font-mono text-mono-label uppercase text-sienna">
        {result}
      </span>
    </div>
  )
}

/* ── Étape de méthode ─────────────────────────────────────── */
function MethodStep({
  step,
  title,
  lines,
}: {
  step: string
  title: string
  lines: string[]
  key?: React.Key | null
}) {
  return (
    <div className="rounded-card border border-espresso/10 bg-cream p-6 shadow-sm md:p-8">
      <span className="font-mono text-mono-label uppercase text-taupe-2">
        {step}
      </span>
      <h3 className="mt-3 text-h5 text-espresso">{title}</h3>
      <ul className="mt-4 space-y-2.5">
        {lines.map((l, i) => (
          <li key={i} className="flex gap-2.5 text-psmall text-taupe">
            <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-apricot" />
            <span>{l}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

/* ── Carte insight ────────────────────────────────────────── */
function InsightCard({
  num,
  title,
  desc,
  quote,
  author,
}: {
  num: string
  title: string
  desc: string
  quote: string
  author: string
  key?: React.Key | null
}) {
  return (
    <div className="rounded-card border border-espresso/10 bg-cream p-6 shadow-sm md:p-8">
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-h4 leading-none text-sienna">{num}</span>
        <span className="font-mono text-mono-label uppercase text-taupe-2">
          Insight
        </span>
      </div>
      <h3 className="mt-3 text-h4 text-espresso">{title}</h3>
      <p className="mt-4 text-pbody text-taupe">{desc}</p>
      {quote && (
        <blockquote className="mt-5 border-l-2 border-sienna/40 pl-4 text-plarge italic text-espresso">
          « {quote} »
          {author && (
            <cite className="mt-2 block font-mono text-mono-label uppercase not-italic text-sienna">, {author}
            </cite>
          )}
        </blockquote>
      )}
    </div>
  )
}

/* ── Carte profil (bento) ─────────────────────────────────── */
/* K2, le paradoxe : pleine largeur, traité comme une citation. */
function FeaturedProfile({ p }: { p: Profile }) {
  return (
    <div className="rounded-card bg-espresso p-6 text-linen md:p-8">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-apricot/15 font-mono text-h5 text-apricot">
          {p.name}
        </span>
        <span className="min-w-0">
          <span className="block text-psmall text-linen">
            Le {p.badge.toLowerCase()} · {p.age}
          </span>
          <span className="mt-0.5 block font-mono text-mono-label uppercase text-greige">
            {p.genre}
          </span>
        </span>
      </div>
      <blockquote className="mt-6 max-w-[56ch] text-plarge italic">
        « {p.desc} »
      </blockquote>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-x-3 gap-y-2 border-t border-linen/15 pt-4">
        <span className="whitespace-nowrap font-mono text-mono-label uppercase text-greige">
          SEQ · facilité
        </span>
        <SeqDots score={p.score} tone="dark" />
      </div>
    </div>
  )
}

/* Les autres : rangées éditoriales (trait fin, titre, méta mono, récit). */
function ProfileRow({ p }: { p: Profile; key?: React.Key | null }) {
  return (
    <li className="border-t border-espresso/10 py-6 first:border-t-0">
      <div className="flex flex-wrap items-start gap-x-5 gap-y-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-espresso/8 font-mono text-h5 text-sienna">
          {p.name}
        </span>
        <div className="min-w-0 flex-1 basis-60">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="text-h5 text-espresso">{p.badge}</h3>
            <span className="font-mono text-mono-label uppercase text-taupe-2">
              {p.age} · {p.genre}
            </span>
          </div>
          <p className="mt-2 max-w-[58ch] text-psmall text-taupe">{p.desc}</p>
        </div>
        <div className="shrink-0 sm:pt-2">
          <SeqDots score={p.score} tone="light" />
        </div>
      </div>
    </li>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectResearch() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Concerts 18-25 · Cas d'étude · Quentin Singama"
    return () => {
      document.title = "Quentin Singama · UX/UI Designer & Researcher"
    }
  }, [])

  return (
    <main id="top">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-espresso pb-20 pt-36 text-linen">
        <DotGrid baseAlpha={0.05} />
        <div className="shell relative z-10">
          <Reveal>
            <Link
              to="/#projets"
              className="group inline-flex items-center gap-2 font-mono text-mono-label uppercase text-greige transition-colors duration-300 hover:text-linen"
            >
              <ArrowLeft
                size={14}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-x-0.5"
              />
              Retour aux projets
            </Link>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="mt-10">
              <Kicker className="text-greige">
                Cas d'étude · UX Research · 2025
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[18ch] text-display">
              Comment les 18-25 ans{" "}
              <span className="text-apricot">découvrent</span> leurs concerts.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              Une étude qualitative pour comprendre comment cette génération
              trouve, et choisit, ses concerts. Sept entretiens
              semi-directifs, une tâche en conditions réelles, et quatre
              insights qui retournent le brief de départ.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <dl className="mt-12 grid gap-x-10 gap-y-6 border-t border-linen/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
              {META.map((m) => (
                <div key={m.label}>
                  <dt className="font-mono text-mono-label uppercase text-apricot">
                    {m.label}
                  </dt>
                  <dd className="mt-2 text-psmall text-linen">{m.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ── Corps : sommaire + contenu ──────────────────── */}
      <div className="bg-peach text-taupe">
        <div className="shell grid gap-12 py-6 lg:grid-cols-[11rem_1fr] lg:gap-16">
          <SideNav />

          <div className="min-w-0">
            {/* Contexte */}
            <section id="contexte" className="scroll-mt-28 pt-16">
              <Reveal>
                <Kicker className="text-taupe-2">Contexte</Kicker>
                <h2 className="mt-5 max-w-[20ch] text-h3 text-espresso">
                  Le point de départ.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  On voulait comprendre comment les étudiants utilisent le
                  numérique pour aller en concert. Pas pour juger telle ou telle
                  app, mais pour voir comment ces outils s'insèrent vraiment dans
                  leur quotidien, et ce qui les pousse, ou les freine, à y
                  aller.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {HYPOTHESES.map((h) => (
                    <HypothesisCard key={h.tag} {...h} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Méthode */}
            <section id="methode" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Méthodologie</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Comment on a travaillé.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  On a rencontré 7 étudiants de 18 à 25 ans, aux profils
                  volontairement variés, genres musicaux, fréquences de sortie
                  et outils différents. L'objectif : des récits riches et
                  contrastés, pas un échantillon représentatif.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  {STEPS.map((s) => (
                    <MethodStep key={s.step} {...s} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Insights */}
            <section id="insights" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Résultats</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Les <span className="text-sienna">4 insights</span> principaux.
                </h2>
              </Reveal>
              <div className="mt-10 space-y-6">
                {INSIGHTS.map((ins, i) => (
                  <Reveal key={ins.num} delay={Math.min(i * 0.06, 0.18)}>
                    <InsightCard {...ins} />
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Profils */}
            <section id="profils" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Participants</Kicker>
                <h2 className="mt-5 max-w-[20ch] text-h3 text-espresso">
                  <span className="font-mono text-sienna">7</span> récits,{" "}
                  <span className="text-sienna">7</span> réalités.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <FeaturedProfile p={PROFILES[0]} />
                </div>
              </Reveal>
              <Reveal delay={0.16}>
                <ol className="mt-8 border-b border-espresso/10">
                  {PROFILES.filter((p) => !p.featured).map((p) => (
                    <ProfileRow key={p.name} p={p} />
                  ))}
                </ol>
              </Reveal>
            </section>

            {/* Implications */}
            <section id="implications" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Implications</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Ce que ces résultats{" "}
                  <span className="text-sienna">veulent dire</span>.
                </h2>
              </Reveal>
              <div className="mt-10 space-y-4">
                {IMPLICATIONS.map((rec, i) => (
                  <Reveal key={rec.id} delay={Math.min(i * 0.06, 0.18)}>
                    <div className="flex items-start gap-5 rounded-card border border-espresso/10 bg-cream p-5 shadow-sm md:p-6">
                      <span className="shrink-0 font-mono text-h4 leading-none text-sienna">
                        {rec.id}
                      </span>
                      <p className="text-pbody text-taupe">{rec.text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </section>

            {/* Bilan */}
            <section id="bilan" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Réflexion</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Mon rôle & ce que j'ai appris.
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-8 max-w-[64ch] space-y-5 text-plarge text-taupe">
                  <p>
                    J'ai mené <span className="text-espresso">3 des 7</span>{" "}
                    entretiens, construit le guide d'entretien avec l'équipe, et
                    participé à l'analyse thématique et à la rédaction du rapport
                    final.
                  </p>
                  <p>
                    Ce que ce projet m'a appris : mes premières interviews
                    étaient trop ouvertes. J'ai appris à{" "}
                    <span className="text-espresso">reformuler sans orienter</span>{" "}
                    à partir du 3ᵉ entretien.
                  </p>
                  <p>
                    La limite principale : un recrutement par réseau personnel,
                    donc un biais de sélection. Avec plus de temps, on serait
                    passés par des associations étudiantes pour diversifier les
                    profils.
                  </p>
                </div>
              </Reveal>
            </section>
          </div>
        </div>
      </div>

      {/* ── Projet suivant ──────────────────────────────── */}
      <section className="relative overflow-hidden bg-espresso py-20 text-linen">
        <DotGrid baseAlpha={0.06} />
        <div className="shell relative z-10 flex flex-wrap items-end justify-between gap-8">
          <div>
            <Reveal>
              <Kicker className="text-greige">Projet suivant</Kicker>
              <h2 className="mt-5 text-h3 text-linen">INK, La chute du print</h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <PillButton
              variant="solid"
              href="/projets/ink"
              onClick={(e) => {
                e.preventDefault()
                navigate("/projets/ink")
              }}
            >
              Voir INK
            </PillButton>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
