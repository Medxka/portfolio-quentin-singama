import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { PillButton } from "../components/ui/PillButton"

/**
 * Cas d'étude INK — hackathon 48h (2ᵉ place) : un univers dystopique
 * complet et deux marques opposées. Même gabarit que Musthane/LINA.
 */

const SECTIONS = [
  { id: "contexte", label: "Contexte" },
  { id: "lore", label: "Le lore" },
  { id: "marques", label: "Deux marques" },
  { id: "identite", label: "Identité" },
  { id: "maquettes", label: "Maquettes" },
  { id: "role", label: "Mon rôle" },
]

const META = [
  { label: "Rôle", value: "Storytelling & UI Design" },
  { label: "Durée", value: "48h · hackathon" },
  { label: "Équipe", value: "Groupe 13 · 11 personnes" },
  { label: "Résultat", value: "2ᵉ place · ECV Bordeaux" },
]

const TIMELINE = [
  {
    year: "2038",
    title: "Premier blackout numérique",
    desc: "Une cyberattaque mondiale d'origine inconnue paralyse les réseaux pendant 72h. 2,4 milliards de personnes sans communication. Les gouvernements commencent à centraliser le contrôle des flux d'information.",
  },
  {
    year: "2047",
    title: "Guerre des semi-conducteurs",
    desc: "Conflits armés en Asie du Sud-Est pour le contrôle des ressources nécessaires à la production de puces. 18 nations impliquées. La presse papier est jugée « vecteur de propagande décentralisée non contrôlable ».",
  },
  {
    year: "2050",
    title: "Le blackout impérial",
    desc: "Effondrement simultané de 94 % des infrastructures numériques mondiales. Cause officielle : surcharge systémique. Cause réelle : jamais établie. 4 ans de chaos géopolitique s'ensuivent.",
  },
  {
    year: "2054",
    title: "Traité de Genève numérique",
    desc: "Signature par 187 nations d'un accord de « stabilisation informationnelle ». Création du Conseil Provisoire de Régulation Mondiale — premier embryon du futur 13ᵉ Ordre.",
  },
  {
    year: "2078",
    title: "Naissance du 13ᵉ Ordre",
    desc: "Le Conseil Provisoire devient une autorité permanente. Premier Édit : « Toute information non validée par le Conseil est une menace à la stabilité collective. »",
  },
  {
    year: "2089",
    title: "Fondation de K.N.I.",
    desc: "Kinetic Nutrition Inc. est créée sous mandat du 13ᵉ Ordre. Mission officielle : nutrition optimisée. Mission réelle : surveiller les comportements de consommation et identifier les dissidents.",
  },
  {
    year: "2094",
    title: "Loi d'épuration · phase 1",
    desc: "Interdiction de toute presse physique. Justification : « le papier imprimé est un vecteur de désinformation non traçable ». Peine : rééducation mémorielle de 6 mois.",
  },
  {
    year: "2100",
    title: "Loi d'épuration · phase finale",
    desc: "Extension à tout objet imprimé : tickets, étiquettes, emballages, photographies, affiches. Le print devient le bien le plus illégal — et donc le plus précieux — du monde. Naissance du marché noir.",
  },
  {
    year: "2134",
    title: "Fondation de l'I.N.K.",
    desc: "Un collectif de 12 chercheurs développe la récupération temporelle : voyager dans le passé pour extraire des prints avant leur destruction. Financement : enchères aux ultra-riches nostalgiques, au profit de la résistance.",
  },
  {
    year: "3113",
    title: "Aujourd'hui",
    desc: "L'I.N.K. opère depuis 979 ans. 200k crédits récoltés, 99 % d'authenticité, 1M d'années parcourues. Le 13ᵉ Ordre ne sait pas encore qu'ils existent.",
  },
]

const STATS = [
  { value: "48h", label: "de création" },
  { value: "2", label: "marques complètes" },
  { value: "1", label: "univers dystopique" },
  { value: "979", label: "ans d'histoire inventée" },
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

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectINK() {
  const navigate = useNavigate()

  React.useEffect(() => {
    document.title = "INK — Cas d'étude · Quentin Singama"
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
                Cas d'étude — Branding & Storytelling · 2024
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[16ch] text-display">
              La chute du <span className="text-apricot">print</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[62ch] text-plarge text-greige">
              Un hackathon créatif de 48h. Un thème : « A Journey ». Un medium
              imposé : le print. On aurait pu faire une marque d'impression
              classique — on a inventé un monde où le papier est devenu le bien
              le plus illégal de l'humanité, et la marque de résistance qui le
              sauve. 2ᵉ place.
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
                  INK — Illicit Network Keepers.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Une organisation clandestine qui voyage dans le temps pour
                  sauver les documents imprimés avant leur destruction, et les
                  revend aux enchères pour financer la résistance. Toute la
                  marque repose sur un univers : mille ans d'histoire inventée
                  en 48 heures.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10">
                  <Figure
                    src="/work/ink-cover-card.png"
                    alt="Identité INK — logo étoile sur fond noir étoilé"
                    caption="L'identité INK — l'étincelle d'un réseau caché"
                  />
                </div>
              </Reveal>
            </section>

            {/* Lore */}
            <section id="lore" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Storytelling</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Comment le print est devenu illégal.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Mon rôle principal : construire le lore. Une chronologie de
                  1075 ans qui rend l'univers crédible — chaque événement
                  justifie l'existence des deux marques.
                </p>
              </Reveal>
              <ol className="mt-10">
                {TIMELINE.map((t, i) => (
                  <Reveal as="li" key={t.year} delay={Math.min(i * 0.04, 0.2)}>
                    <div className="grid gap-2 border-t border-espresso/10 py-6 sm:grid-cols-[6rem_1fr] sm:gap-8">
                      <span className="font-mono text-h5 text-sienna">
                        {t.year}
                      </span>
                      <div>
                        <h3 className="font-mono text-mono-label uppercase tracking-[0.04em] text-espresso">
                          {t.title}
                        </h3>
                        <p className="mt-2 max-w-[62ch] text-psmall text-taupe">
                          {t.desc}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </section>

            {/* Deux marques */}
            <section id="marques" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Branding</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Deux faces d'une même{" "}
                  <span className="text-sienna">résistance</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  KNI, la façade : une marque de nutrition approuvée par le
                  régime, froide et optimisée. INK, le réseau : la marque
                  clandestine qui sauve ce que le 13ᵉ Ordre cherche à effacer.
                  Deux identités complètes, pensées pour s'opposer.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <Figure
                    src="/work/ink/ink-cover-kni.webp"
                    alt="Identité KNI — Kinetic Nutrition Inc., la façade officielle"
                    caption="KNI — la façade · « Mangez en 10 secondes. Vivez 100 %. »"
                  />
                  <Figure
                    src="/work/ink/ink-cover-ink.webp"
                    alt="Identité INK — le réseau clandestin"
                    caption="INK — le réseau · ce que l'Ordre cherche à effacer"
                  />
                </div>
              </Reveal>
            </section>

            {/* Identité */}
            <section id="identite" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">Direction artistique</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Nuanciers, typographie, références.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Réalisés en collaboration avec l'équipe : un nuancier froid
                  et clinique pour KNI, un rouge résistance sur noir pour INK,
                  et un moodboard dystopique commun.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 space-y-8">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Figure
                      src="/work/ink/ink-nuancier-kni.webp"
                      alt="Nuancier KNI, tons froids et cliniques"
                      caption="Nuancier KNI"
                    />
                    <Figure
                      src="/work/ink/ink-nuancier-ink.webp"
                      alt="Nuancier INK, noir et rouge résistance"
                      caption="Nuancier INK"
                    />
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Figure
                      src="/work/ink/ink-nuancier-typo.webp"
                      alt="Choix typographiques des deux marques"
                      caption="Typographies"
                    />
                    <Figure
                      src="/work/ink/ink-moodboard.webp"
                      alt="Moodboard dystopique du projet"
                      caption="Moodboard — références dystopiques"
                    />
                  </div>
                </div>
              </Reveal>
            </section>

            {/* Maquettes */}
            <section id="maquettes" className="scroll-mt-28 pt-20">
              <Reveal>
                <Kicker className="text-taupe-2">UI Design</Kicker>
                <h2 className="mt-5 max-w-[24ch] text-h3 text-espresso">
                  Façade &{" "}
                  <span className="text-sienna">clandestinité</span>.
                </h2>
                <p className="mt-6 max-w-[62ch] text-pbody text-taupe">
                  Le site KNI : interface froide, épurée, capsules nutritives
                  en grille — tout semble normal. Le site INK : prints aux
                  enchères, prix en crédits — le marché noir de la mémoire
                  imprimée.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="mt-10 space-y-8">
                  <Figure
                    src="/work/ink/ink-maquette-kni.webp"
                    alt="Site KNI, la façade gouvernementale"
                    caption="Le site KNI — la façade"
                  />
                  <Figure
                    src="/work/ink/ink-maquette.webp"
                    alt="Site INK, l'interface clandestine d'enchères"
                    caption="Le site INK — l'interface clandestine"
                  />
                  <Figure
                    src="/work/ink/ink-enchere.webp"
                    alt="Détail d'une enchère de print sur le site INK"
                    caption="Détail — une enchère de print"
                  />
                </div>
              </Reveal>
            </section>

            {/* Mon rôle */}
            <section id="role" className="scroll-mt-28 py-20">
              <Reveal>
                <Kicker className="text-taupe-2">Mon rôle</Kicker>
                <h2 className="mt-5 max-w-[20ch] text-h3 text-espresso">
                  Rendre l'univers crédible.
                </h2>
                <p className="mt-6 max-w-[58ch] text-plarge text-taupe">
                  Dans ce groupe de 11, je me suis occupé du storytelling —
                  construire la chronologie, les institutions, les enjeux — et
                  de l'UI des maquettes. Le branding, le moodboard et les
                  assets produits ont été réalisés en collaboration avec
                  l'équipe.
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
