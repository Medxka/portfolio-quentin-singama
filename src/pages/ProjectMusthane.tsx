import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude Musthane — structure type case study (sommaire latéral,
 * hero + méta, contexte, problèmes, solutions, bilan, projet suivant)
 * dans la grammaire du système : kickers, mono labels, cartes espresso.
 */

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "problemes", label: "Problèmes" },
  { id: "arborescence", label: "Arborescence" },
  { id: "nav-desktop", label: "Nav desktop" },
  { id: "nav-mobile", label: "Nav mobile" },
  { id: "accueil", label: "Accueil" },
  { id: "bilan", label: "Bilan" },
]

const META = [
  { label: "Rôle", value: "UX Designer · Arbo & Nav" },
  { label: "Méthode", value: "Audit heuristique + refonte arborescence" },
  { label: "Durée", value: "2 jours · projet école" },
  { label: "Livrables", value: "Audit · arbo · nav desktop & mobile · accueil" },
]

const PROBLEMS = [
  {
    num: "01",
    title: "Quatre axes de nav qui se croisent",
    desc: "Sur-mesure / Nos solutions / Votre industrie + 7 sous-marques. Le même produit est trouvable par 3 chemins différents — l'utilisateur ne sait pas où chercher.",
  },
  {
    num: "02",
    title: "7 sous-marques sans logique apparente",
    desc: "Mustmove, Muststore, Mustshock, Muststop, Mustbalance, Mustlift, Mustpress. Aucune explication de la logique — à quoi sert chaque marque ? Pour quel besoin ?",
  },
  {
    num: "03",
    title: "Sous-menu industries surchargé",
    desc: "9 industries affichées sur 4 colonnes au survol. Surcharge cognitive immédiate — pas de hiérarchisation entre les marchés principaux et secondaires.",
  },
  {
    num: "04",
    title: "Hero homepage flou",
    desc: "« Design to mobility » / « We design for tomorrow » — aucune mention claire de ce que fabrique vraiment Musthane (réservoirs, citernes, obturateurs gonflables) avant de scroller longuement.",
  },
  {
    num: "05",
    title: "Pas de hiérarchie de CTA",
    desc: "Le contact est planqué dans le footer. Pour un site B2B où la conversion = demande de devis, le CTA prioritaire devrait être visible above-the-fold.",
  },
  {
    num: "06",
    title: "Switcher de langue dans le footer",
    desc: "FR / EN / ES coexistent mais le sélecteur est en bas de page. Sur un site B2B international, c'est un bug d'accessibilité de marché.",
  },
]

const MEGA_MENUS = [
  { tab: "Solutions", src: "/work/musthane/musthane-nav-solutions.webp" },
  { tab: "Industrie", src: "/work/musthane/musthane-nav-industrie.webp" },
  { tab: "Produits", src: "/work/musthane/musthane-nav-produits.webp" },
  { tab: "Ressources", src: "/work/musthane/musthane-nav-ressources.webp" },
  { tab: "À propos", src: "/work/musthane/musthane-nav-apropos.webp" },
]

const MOBILE_SCREENS = [
  { label: "Drawer · Accueil", src: "/work/musthane/musthane-mobile-default.png" },
  { label: "Nos solutions", src: "/work/musthane/musthane-mobile-solutions.png" },
  { label: "Votre industrie", src: "/work/musthane/musthane-mobile-industrie.png" },
  { label: "Nos produits", src: "/work/musthane/musthane-mobile-produits.png" },
  { label: "Ressources", src: "/work/musthane/musthane-mobile-ressources.png" },
  { label: "À propos", src: "/work/musthane/musthane-mobile-apropos.png" },
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

/* ── Blocs média ──────────────────────────────────────────── */
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

function BeforeAfter() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Figure
        src="/work/musthane/musthane-arbo-old.webp"
        alt="Ancienne arborescence Musthane : quatre axes parallèles"
        caption="Avant — 4 axes qui se contredisent"
      />
      <Figure
        src="/work/musthane/musthane-arbo-new.webp"
        alt="Nouvelle arborescence Musthane : une seule logique par usage"
        caption="Après — une seule logique, par usage"
      />
    </div>
  )
}

function MegaMenuTabs() {
  const [active, setActive] = React.useState(0)
  return (
    <div className="overflow-hidden rounded-card bg-espresso-2 shadow-xl">
      <div
        role="tablist"
        aria-label="Mega-menus de la nouvelle navigation"
        className="flex items-stretch gap-1 overflow-x-auto border-b border-linen/10 bg-espresso p-2"
      >
        {MEGA_MENUS.map((m, i) => {
          const isActive = i === active
          return (
            <button
              key={m.tab}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-lg px-4 py-2.5 font-mono text-mono-label uppercase transition-colors duration-300 ${
                isActive
                  ? "bg-apricot text-espresso"
                  : "text-greige hover:bg-linen/[0.06] hover:text-linen"
              }`}
            >
              {m.tab}
            </button>
          )
        })}
      </div>
      <img
        src={MEGA_MENUS[active].src}
        alt={`Mega-menu ${MEGA_MENUS[active].tab} de la nouvelle navigation`}
        className="block h-auto w-full"
      />
    </div>
  )
}

function MobileRow() {
  return (
    <div className="-mx-1 flex snap-x gap-4 overflow-x-auto px-1 pb-3">
      {MOBILE_SCREENS.map((m) => (
        <figure key={m.label} className="w-[220px] shrink-0 snap-start">
          <div className="overflow-hidden rounded-2xl bg-espresso-2 shadow-lg">
            <img
              src={m.src}
              alt={`Écran mobile — ${m.label}`}
              loading="lazy"
              className="block h-auto w-full"
            />
          </div>
          <figcaption className="mt-2.5 font-mono text-mono-label uppercase text-taupe-2">
            {m.label}
          </figcaption>
        </figure>
      ))}
    </div>
  )
}

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectMusthane() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "Musthane — Cas d'étude · Quentin Singama"
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
                Cas d'étude — UX Design · 2025
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[18ch] text-display">
              Remettre de l'ordre dans{" "}
              <span className="text-apricot">100+ produits</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              Musthane fabrique des solutions gonflables industrielles pour 10
              secteurs (défense, BTP, pétrole, maritime…). Le site existant
              croise 4 systèmes de classification incompatibles. Refonte
              complète de l'arborescence, de la nav desktop et mobile, et d'une
              accueil qui guide vraiment.
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
                  Quatre axes de classification qui se contredisent.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Le site actuel propose quatre entrées parallèles vers les
                  mêmes produits : le sur-mesure, les solutions, les industries
                  et les sous-marques. Chaque chemin a sa propre logique — et
                  aucun ne dit clairement où trouver quoi.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src="/work/musthane/musthane-old-nav.webp"
                    alt="Mega-menu Nos Solutions du site Musthane actuel, 7 sous-marques en colonnes"
                    caption="Le mega-menu actuel — 7 sous-marques en colonnes"
                  />
                </div>
              </Reveal>
            </section>

            {/* Problèmes */}
            <section id="problemes" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Audit</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Six problèmes majeurs identifiés.
                </h2>
              </Reveal>
              <ol className="mt-10 grid gap-x-12 md:grid-cols-2">
                {PROBLEMS.map((p, i) => (
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
            </section>

            {/* Arborescence */}
            <section id="arborescence" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Arborescence</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Une seule logique&nbsp;:{" "}
                  <span className="text-sienna">par usage</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Suppression des 4 axes parallèles. Un seul point d'entrée
                  principal — « Nos solutions » — classé par usage métier
                  (stockage, levage, obturation…). Les sous-marques deviennent
                  des labels secondaires sur les fiches produit, pas un système
                  de nav. Les industries deviennent un filtre, pas un menu.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <BeforeAfter />
                </div>
              </Reveal>
            </section>

            {/* Nav desktop */}
            <section id="nav-desktop" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Nav desktop</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Cinq entrées, cinq mega-menus.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Top nav réduit à 5 entrées — Nos produits · Nos solutions ·
                  Votre industrie · Ressources · À propos. Chaque entrée
                  déploie un mega-menu groupé par usage avec visuels et
                  descriptions courtes. Contact en CTA sticky à droite.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <MegaMenuTabs />
                </div>
              </Reveal>
            </section>

            {/* Nav mobile */}
            <section id="nav-mobile" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Nav mobile</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Drawer hiérarchisé, pas un dump de liens.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Le drawer reprend la même logique par usage, un niveau à la
                  fois : accordéons par entrée, industries en filtre, contact
                  toujours visible en bas.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <MobileRow />
                </div>
              </Reveal>
            </section>

            {/* Accueil */}
            <section id="accueil" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Solution · Accueil</Kicker>
                <h2 className="mt-5 max-w-[22ch] text-h3 text-espresso">
                  Une accueil qui dit ce qu'on fait.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Hero explicite (ce que Musthane fabrique, pour qui), preuve
                  immédiate par les usages, et demande de devis visible dès
                  l'arrivée.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src="/work/musthane/musthane-nav-default.webp"
                    alt="Nouvelle page d'accueil Musthane"
                    caption="La nouvelle accueil"
                  />
                </div>
              </Reveal>
            </section>

            {/* Bilan */}
            <section id="bilan" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Bilan</Kicker>
                <h2 className="mt-5 max-w-[18ch] text-h3 text-espresso">
                  Ce que j'ai appris.
                </h2>
                <p className="mt-6 max-w-[58ch] text-plarge text-taupe">
                  En 2 jours, le piège c'était d'aller trop vite vers les
                  maquettes. J'ai pris du temps sur l'arbo et l'audit — sans
                  ça, refaire un mega-menu propre n'aurait été qu'une couche
                  cosmétique.
                </p>
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
                LINA — Repenser la librairie indépendante
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <PillButton
              variant="solid"
              href="/projets/lina"
              onClick={(e) => {
                e.preventDefault()
                navigate("/projets/lina")
              }}
            >
              Voir LINA
            </PillButton>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
