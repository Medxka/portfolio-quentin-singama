import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude LINA — même gabarit que Musthane : hero + méta, sommaire
 * latéral scrollspy, sections ancrées, bilan, projet suivant.
 */

const SECTIONS = [
  { id: "problemes", label: "Problèmes" },
  { id: "icones", label: "Icônes" },
  { id: "refonte", label: "Refonte" },
  { id: "parcours", label: "Parcours" },
  { id: "bilan", label: "Bilan" },
]

const META = [
  { label: "Rôle", value: "UX/UI Designer" },
  { label: "Durée", value: "3 jours · sprint école" },
  { label: "Équipe", value: "Duo" },
  { label: "Outils", value: "Figma · Illustrator" },
]

const PROBLEMS = [
  {
    num: "01",
    title: "Navigation orientée achat",
    desc: "Le site est construit pour ceux qui savent déjà ce qu'ils veulent — il ne favorise pas la découverte.",
  },
  {
    num: "02",
    title: "Coups de cœur génériques",
    desc: "Les sélections sont trop similaires entre les différents sites régionaux. Aucune personnalité locale.",
  },
  {
    num: "03",
    title: "Prescription invisible",
    desc: "La recommandation des libraires — leur plus grande force — est noyée dans un site trop fonctionnel.",
  },
]

const JOURNEY = [
  {
    num: "01",
    title: "Découverte",
    desc: "Camille voit la pub « The First Heretic » sur un site partenaire. L'illustration et le lore Warhammer captent son attention.",
  },
  {
    num: "02",
    title: "Intérêt",
    desc: "Clic vers la landing page dédiée. L'univers dark et cinématique crée une immersion immédiate.",
  },
  {
    num: "03",
    title: "Exploration",
    desc: "Navigation sur la landing : personnage, histoire, couverture 3D, édition limitée. Chaque section nourrit l'envie.",
  },
  {
    num: "04",
    title: "Décision",
    desc: "CTA « Acheter » → redirection vers le site LINA avec le livre pré-sélectionné. Achat en librairie indépendante.",
  },
]

const LEARNINGS = [
  {
    num: "01",
    title: "Contrainte = créativité",
    desc: "3 jours pour un système d'icônes, une refonte et un parcours pub → landing. La contrainte de temps force les décisions rapides et les choix forts.",
  },
  {
    num: "02",
    title: "Les icônes simplifient tout",
    desc: "Une barre d'icônes remplace une sidebar de 18 lignes de texte. Le scanning visuel est bien plus rapide que la lecture.",
  },
  {
    num: "03",
    title: "La prescription doit être humaine",
    desc: "Afficher le nom du libraire et son avis transforme un catalogue en recommandation personnelle. Le local est un avantage.",
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

function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption?: string
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

function NumberedRows({
  items,
}: {
  items: { num: string; title: string; desc: string }[]
}) {
  return (
    <ol className="grid gap-x-12 md:grid-cols-2">
      {items.map((p, i) => (
        <Reveal as="li" key={p.num} delay={i * 0.05}>
          <div className="flex gap-5 border-t border-espresso/10 py-6">
            <span
              aria-hidden
              className="w-9 shrink-0 font-mono text-h5 text-sienna"
            >
              {p.num}
            </span>
            <div>
              <h3 className="text-h5 text-espresso">{p.title}</h3>
              <p className="mt-2 max-w-[44ch] text-psmall text-taupe">
                {p.desc}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectLINA() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "LINA — Cas d'étude · Quentin Singama"
    return () => {
      document.title = "Quentin Singama — UX/UI Designer & Researcher"
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
                Cas d'étude — UX/UI Design · 2024
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[18ch] text-display">
              Repenser la{" "}
              <span className="text-apricot">librairie indépendante</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              LINA fédère les librairies indépendantes autour d'un site de
              vente en ligne. En trois jours : refonte UX/UI du site desktop,
              système d'icônes par genre, et un parcours complet pub → landing
              page pour ramener les lecteurs vers la librairie.
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
            {/* Problèmes */}
            <section id="problemes" className="scroll-mt-28 pt-16">
              <Reveal>
                <Kicker className="text-taupe-2">Recherche</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Trois problèmes révélés par 150 utilisateurs.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Une étude menée sur 150 utilisateurs a mis en évidence trois
                  freins majeurs à la découverte sur le site existant.
                </p>
              </Reveal>
              <div className="mt-10">
                <NumberedRows items={PROBLEMS} />
              </div>
              <Reveal delay={0.1}>
                <blockquote className="mt-10 max-w-[46ch] border-t border-espresso/10 pt-8 text-h4 text-espresso">
                  Comment mettre en avant le côté{" "}
                  <span className="text-sienna">prescripteur</span> des
                  libraires&nbsp;?
                </blockquote>
              </Reveal>
            </section>

            {/* Icônes */}
            <section id="icones" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Iconographie</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  La navigation devient visuelle.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Remplacer la navigation textuelle par des icônes expressives
                  et colorées. Chaque genre a sa couleur et son pictogramme —
                  une barre d'icônes remplace une sidebar de 18 lignes de
                  texte.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src="/work/lina/lina-icones.webp"
                    alt="Système d'icônes LINA — un pictogramme coloré par genre littéraire"
                    caption="Le système d'icônes — un genre, une couleur, un pictogramme"
                  />
                </div>
              </Reveal>
            </section>

            {/* Refonte */}
            <section id="refonte" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Refonte desktop</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  D'un catalogue à une expérience de{" "}
                  <span className="text-sienna">découverte</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  L'architecture a été repensée selon une logique de
                  découverte, pas de catalogue. Des bandeaux colorés rythment
                  le scroll, et les coups de cœur sont incarnés — nom et avis
                  du libraire visibles, la prescription redevient humaine.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 space-y-8">
                  <Figure
                    src="/work/lina/lina-desktop.webp"
                    alt="Refonte desktop du site LINA"
                    caption="La refonte desktop — logique de découverte"
                  />
                  <Figure
                    src="/work/lina/lina-notes.webp"
                    alt="Notes d'intention : choix chromatiques et architecturaux"
                    caption="Choix chromatiques & architecturaux — notes d'intention"
                  />
                </div>
              </Reveal>
            </section>

            {/* Parcours */}
            <section id="parcours" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Parcours</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  De la pub à la librairie.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Création d'un parcours complet : pub sur site partenaire →
                  landing page dédiée → achat en librairie. Cible : Camille,
                  chercheuse de cadeaux pour une amie fan d'heroic fantasy.
                </p>
              </Reveal>
              <div className="mt-10">
                <NumberedRows items={JOURNEY} />
              </div>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:grid-cols-[1fr_1.6fr]">
                  <Figure
                    src="/work/lina/lina-heretic-poster.webp"
                    alt="Publicité The First Heretic sur site partenaire"
                    caption="La pub — site partenaire"
                  />
                  <Figure
                    src="/work/lina/lina-pub-landing.webp"
                    alt="Vue d'ensemble du parcours pub vers landing page"
                    caption="Vue d'ensemble — pub → landing"
                  />
                </div>
                <div className="mt-8">
                  <Figure
                    src="/work/lina/lina-heretic-landing.webp"
                    alt="Landing page The First Heretic complète"
                    caption="La landing page — univers dark et cinématique"
                  />
                </div>
              </Reveal>
            </section>

            {/* Bilan */}
            <section id="bilan" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Bilan</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  3 jours pour repenser une expérience complète.
                </h2>
              </Reveal>
              <div className="mt-10">
                <NumberedRows items={LEARNINGS} />
              </div>
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
              <Kicker className="text-greige">Projet précédent</Kicker>
              <h2 className="mt-5 text-h3 text-linen">
                Musthane — Remettre de l'ordre dans 100+ produits
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
