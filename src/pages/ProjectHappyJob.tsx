import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude Happy Job — stage graphic design (2 mois).
 * Campagne de recrutement saisonnier déclinée par secteur autour d'un
 * ressort simple : le jeu de mots. Même gabarit que les autres projets.
 */

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "concept", label: "Concept" },
  { id: "campagne", label: "Campagne" },
  { id: "bilan", label: "Bilan" },
]

const META = [
  { label: "Rôle", value: "Graphic Designer" },
  { label: "Contexte", value: "Stage · 2 mois" },
  { label: "Structure", value: "Happy Job · réseau d'agences" },
  { label: "Périmètre", value: "Print & social" },
]

type Poster = { src: string; alt: string; sector: string; line: string }

const CAMPAIGN: Poster[] = [
  {
    src: "/work/hj-2.webp",
    alt: "Affiche Happy Job — femme dans un verger de pommes, offres agricoles",
    sector: "Agriculture",
    line: "« Des offres à vous faire tomber dans les pommes »",
  },
  {
    src: "/work/hj-1.webp",
    alt: "Affiche Happy Job — cartes à jouer par secteur : tourisme, restauration, agriculture",
    sector: "Tous secteurs",
    line: "« Quelle carte allez-vous tirer cette saison ? »",
  },
  {
    src: "/work/hj-3.webp",
    alt: "Affiche Happy Job — menu de restaurant, « pas besoin d'un CV étoilé »",
    sector: "Restauration",
    line: "« Pas besoin d'un CV étoilé pour décrocher un contrat »",
  },
  {
    src: "/work/hj-4.webp",
    alt: "Affiche Happy Job — cuisiniers en service, « mets ton énergie au menu »",
    sector: "Restauration",
    line: "« Mets ton énergie au menu. On a les missions »",
  },
]

const STATS = [
  { value: "2 mois", label: "de stage" },
  { value: "3 secteurs", label: "ciblés" },
  { value: "Print & social", label: "supports" },
  { value: "1 système", label: "de marque" },
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
export function ProjectHappyJob() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Happy Job — Cas d'étude · Quentin Singama"
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
                Cas d'étude — Graphic Design · 2026
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[18ch] text-display">
              Recruter pour les saisons,{" "}
              <span className="text-apricot">toute l'année</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              Deux mois de stage en graphic design chez Happy Job, un réseau
              d'agences de recrutement. Ma mission : décliner une campagne
              d'affichage qui rend désirables les emplois saisonniers —
              agriculture, restauration, tourisme — avec un même système de
              marque et un ressort simple, le jeu de mots.
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
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Recruter quand personne ne postule.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Happy Job recrute des saisonniers pour ses entreprises
                  partenaires. Le problème est structurel : ces offres peinent à
                  attirer, et la concurrence est rude au moment des pics —
                  vendanges, saison touristique, coups de feu en cuisine. La
                  campagne devait rendre ces offres désirables, tout en restant
                  déclinable sur plusieurs secteurs et plusieurs agences.
                </p>
              </Reveal>
            </section>

            {/* Concept */}
            <section id="concept" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Concept</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Un système de marque, un ressort :{" "}
                  <span className="text-sienna">le jeu de mots</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Un même langage visuel tient toute la campagne : la vague de
                  papier déchiré rouge, le motif « C » en fond, et la signature
                  « Des emplois saisonniers toute l'année ». Sur cette base,
                  chaque secteur reçoit son accroche — le message fait sourire,
                  la marque reste reconnaissable d'un visuel à l'autre.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src="/work/happyjob-affiche.webp"
                    alt="Visuel signature Happy Job — emplois saisonniers toute l'année"
                    caption="Le visuel signature — vague rouge, motif « C », signature saisonnière"
                  />
                </div>
              </Reveal>
            </section>

            {/* Campagne */}
            <section id="campagne" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Déclinaisons</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Une accroche par secteur.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Chaque affiche existe en print (agence, vitrine) et en social,
                  avec un QR code vers l'inscription en ligne — pour que chaque
                  agence partenaire puisse l'activer sur ses propres canaux.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 sm:grid-cols-2">
                  {CAMPAIGN.map((p) => (
                    <Figure
                      key={p.src}
                      src={p.src}
                      alt={p.alt}
                      caption={`${p.sector} — ${p.line}`}
                    />
                  ))}
                </div>
              </Reveal>
            </section>

            {/* Bilan */}
            <section id="bilan" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Bilan</Kicker>
                <h2 className="mt-5 max-w-[20ch] text-h3 text-espresso">
                  Ce que le stage m'a appris.
                </h2>
                <p className="mt-6 max-w-[60ch] text-plarge text-taupe">
                  Travailler dans un système de marque déjà posé : produire
                  vite, rester cohérent, décliner sans casser l'identité. J'ai
                  appris à faire tenir un concept sur plusieurs formats et
                  plusieurs secteurs, à écrire des accroches courtes qui
                  portent, et à préparer des fichiers propres pour le print
                  comme pour le social.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <ul className="mt-10 flex flex-wrap gap-x-14 gap-y-8">
                  {STATS.map((s) => (
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
