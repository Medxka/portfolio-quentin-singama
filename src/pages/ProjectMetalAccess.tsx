import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude Metal Access, plateforme d'accessibilité des festivals metal.
 * Projet de groupe (sprint RNCP UX, ECV). Contribution de Quentin : UX/UI de
 * toutes les maquettes + développement de la partie accessibilité. Même
 * gabarit que les autres cas d'étude.
 */

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "recherche", label: "Recherche" },
  { id: "concept", label: "Concept" },
  { id: "maquettes", label: "Maquettes" },
  { id: "signaletique", label: "Signalétique" },
  { id: "dev", label: "Développement" },
  { id: "bilan", label: "Bilan" },
]

const META = [
  { label: "Rôle", value: "UX/UI Design & Dév front" },
  { label: "Contexte", value: "Sprint intensif · 1 semaine" },
  { label: "Cadre", value: "RNCP Manager UX · ECV" },
  { label: "Équipe", value: "~10 · pôle UX/UI (4)" },
]

const CONSTAT = [
  { value: "25 %", label: "des Français en situation de handicap" },
  { value: "14,5 M", label: "de personnes concernées en France" },
  { value: "< 10 %", label: "des festivals réellement accessibles" },
]

const CIBLES = [
  {
    tag: "Débutant",
    besoin: "Comprendre les bases de l'accessibilité événementielle.",
    action: "Consulte le guide de bonnes pratiques, lance le diagnostic.",
  },
  {
    tag: "Intermédiaire",
    besoin: "Vérifier sa conformité et structurer sa démarche.",
    action: "Fait le diagnostic de maturité, consulte les normes.",
  },
  {
    tag: "Confirmé / Pro",
    besoin: "Déployer rapidement des solutions concrètes.",
    action: "Télécharge directement le pack de signalétique.",
  },
]

const THEMATIQUES = [
  "Mobiliser ses équipes & communiquer",
  "L'accès au site",
  "Circuler & se repérer",
  "L'expérience & les contenus",
  "Dispositifs & équipements concrets",
]

const MAQUETTES = [
  {
    src: "/work/metal-access/ma-bonnes-pratiques.webp",
    alt: "Page Bonnes pratiques, bibliothèque filtrable par pratique et par handicap",
    caption: "Bonnes pratiques, biblio filtrable par pratique × type de handicap",
  },
  {
    src: "/work/metal-access/ma-handicaps.webp",
    alt: "Page Les handicaps, connaître les publics pour mieux les accueillir",
    caption: "Les handicaps, connaître les publics (la page que j'ai aussi développée)",
  },
  {
    src: "/work/metal-access/ma-ressources.webp",
    alt: "Page Ressources, signalétique et guides prêts à déployer",
    caption: "Ressources, tout ce qui est prêt à déployer",
  },
  {
    src: "/work/metal-access/ma-audit.webp",
    alt: "Outil d'audit d'accessibilité, analyse du parcours de l'événement",
    caption: "L'outil d'audit, le diagnostic de maturité, fonctionnalité phare",
  },
]

const BILAN = [
  { value: "1 sem.", label: "sprint intensif" },
  { value: "~10", label: "personnes, 3 pôles" },
  { value: "5", label: "thématiques d'accessibilité" },
  { value: "4", label: "publics signalétiques" },
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

function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
  key?: React.Key | null
}) {
  return (
    <figure>
      <div className="overflow-hidden rounded-card bg-espresso-2 shadow-xl">
        <img src={src} alt={alt} loading="lazy" className="block h-auto w-full" />
      </div>
      {caption && (
        <figcaption className="mt-3 font-mono text-mono-label uppercase text-taupe-2">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectMetalAccess() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Metal Access · Cas d'étude · Quentin Singama"
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
                Cas d'étude · UX/UI Design · 2026
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[18ch] text-display">
              Rendre les festivals metal{" "}
              <span className="text-apricot">accessibles à tous</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              Un sprint d'une semaine, en équipe, pour concevoir Metal Access :
              une plateforme qui aide les festivals à devenir accessibles aux
              personnes en situation de handicap. J'ai porté l'UX/UI de toutes
              les maquettes et développé la partie accessibilité du site.
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
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  L'accessibilité, angle mort des festivals.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Un festival accessible, ce n'est pas juste une rampe et une
                  case cochée : c'est repenser chaque étape du parcours, de
                  l'arrivée sur site à la billetterie. Le sujet est massif, mais
                  presque personne ne s'y attaque. Notre équipe pluridisciplinaire
                  (UX/UI, direction artistique, dev) avait une semaine pour en
                  faire une réponse concrète.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-10 grid gap-6 sm:grid-cols-3">
                  {CONSTAT.map((c) => (
                    <li
                      key={c.label}
                      className="rounded-card border border-espresso/10 bg-cream p-6 shadow-sm"
                    >
                      <p className="font-mono text-h3 leading-none text-sienna">
                        {c.value}
                      </p>
                      <p className="mt-4 text-psmall text-taupe">{c.label}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </section>

            {/* Recherche */}
            <section id="recherche" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Recherche</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Comprendre avant de concevoir.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  On a démarré par une veille et un benchmark (sites de
                  festivals, références d'accessibilité), puis on a cadré les
                  cibles. Trois niveaux de maturité, trois besoins, l'interface
                  devait parler à chacun.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ol className="mt-10">
                  {CIBLES.map((c, i) => (
                    <li key={c.tag}>
                      <div className="grid gap-2 border-t border-espresso/10 py-6 sm:grid-cols-[10rem_1fr] sm:gap-8">
                        <span className="font-mono text-h5 text-sienna">
                          {c.tag}
                        </span>
                        <div>
                          <p className="text-pbody text-espresso">{c.besoin}</p>
                          <p className="mt-1.5 text-psmall text-taupe">
                            {c.action}
                          </p>
                        </div>
                      </div>
                      {i === CIBLES.length - 1 && (
                        <div className="border-t border-espresso/10" />
                      )}
                    </li>
                  ))}
                </ol>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-10">
                  <p className="font-mono text-mono-label uppercase text-taupe-2">
                    Les 5 thématiques d'accessibilité
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2.5">
                    {THEMATIQUES.map((t) => (
                      <li
                        key={t}
                        className="rounded-pill border border-espresso/12 bg-cream px-3.5 py-2 text-psmall text-espresso"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </section>

            {/* Concept */}
            <section id="concept" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Concept</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Metal Access, l'outillage de l'inclusivité.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Une plateforme qui rend l'accessibilité désirable et
                  actionnable : un guide de bonnes pratiques filtrable, un pack
                  de signalétique prêt à imprimer, et un outil d'audit qui
                  diagnostique la maturité d'un événement. Le tout dans une DA
                  metal assumée (sombre, électrique) mais pensée lisible.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 lg:grid-cols-2">
                  <Figure
                    src="/work/metal-access/ma-fede.webp"
                    alt="Page La Fédé, identité Metal Access sur fond sombre et bleu électrique"
                    caption="L'identité & la fédération"
                  />
                  <Figure
                    src="/work/metal-access/ma-homepage.webp"
                    alt="Page d'accueil Metal Access, l'accessibilité au cœur du festival"
                    caption="La page d'accueil"
                  />
                </div>
              </Reveal>
            </section>

            {/* Maquettes */}
            <section id="maquettes" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Maquettes</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  L'UX/UI, écran par écran.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  J'ai conçu l'ensemble des maquettes : architecture de
                  l'information, parcours, interfaces. De la bibliothèque
                  filtrable à l'outil d'audit, chaque écran devait rester clair
                  malgré la densité du sujet.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-8 lg:grid-cols-2">
                  {MAQUETTES.map((m) => (
                    <Figure key={m.src} src={m.src} alt={m.alt} caption={m.caption} />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Signalétique */}
            <section id="signaletique" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Signalétique</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Une signalétique lisible par{" "}
                  <span className="text-sienna">tout le monde</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Le système de signalétique code chaque public par une{" "}
                  <span className="text-espresso">forme autant que par une couleur</span>{" "}
                  (artiste, bénévole, production, festivalier). Ce double codage
                  n'est pas décoratif : il reste lisible pour les personnes
                  daltoniennes, là où la couleur seule échoue. Décliné en
                  panneaux, bracelets et pass.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 space-y-8">
                  <Figure
                    src="/work/metal-access/ma-signaletique.webp"
                    alt="Système de codage : forme + couleur par public (artiste, bénévole, prod, festivalier)"
                    caption="Le codage forme + couleur, pensé pour les daltoniens"
                  />
                  <Figure
                    src="/work/metal-access/ma-bracelets.webp"
                    alt="Bracelets Metal Access déclinés par public, forme et couleur"
                    caption="Les bracelets, le même système, porté au poignet"
                  />
                </div>
              </Reveal>
            </section>

            {/* Développement */}
            <section id="dev" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Développement</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Du Figma au site en ligne.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Au-delà des maquettes, j'ai développé la partie accessibilité
                  du site, la page « Les handicaps », qui présente chaque public
                  et ses besoins. Passer de la maquette au code intégré, avec des
                  tests d'accessibilité, était la meilleure façon de vérifier que
                  le design tenait la route pour de vrai.
                </p>
              </Reveal>
            </section>

            {/* Bilan */}
            <section id="bilan" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Bilan</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Mon rôle & ce que j'en retiens.
                </h2>
                <p className="mt-6 max-w-[60ch] text-plarge text-taupe">
                  Dans une équipe pluridisciplinaire et un timing serré, j'ai
                  tenu le fil UX/UI de bout en bout, de la recherche aux
                  maquettes finales, et poussé jusqu'au développement de la
                  partie accessibilité. Concevoir <span className="text-espresso">pour</span>{" "}
                  l'accessibilité m'a appris à en faire un réflexe, pas une
                  contrainte de fin de projet.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-10 flex flex-wrap gap-x-14 gap-y-8">
                  {BILAN.map((s) => (
                    <li key={s.label}>
                      <p className="font-mono text-[1.8rem] font-medium leading-none text-sienna">
                        {s.value}
                      </p>
                      <p className="mt-3 font-mono text-mono-label uppercase text-taupe-2">
                        {s.label}
                      </p>
                    </li>
                  ))}
                </ul>
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
              <h2 className="mt-5 text-h3 text-linen">
                Musthane, Remettre de l'ordre dans 100+ produits
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <PillButton
              variant="solid"
              href="/projets/musthane"
              onClick={(e) => {
                e.preventDefault()
                navigate("/projets/musthane")
              }}
            >
              Voir Musthane
            </PillButton>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
