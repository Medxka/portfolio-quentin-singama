import * as React from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowUpRight } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import { DISCIPLINES } from "../content"

/**
 * Page /discipline/video, présentée à part des autres disciplines :
 * le montage est une passion perso (edits « flow », rythmés sur le son,
 * façon reels / AMV), pas une commande. Galerie de players.
 */

type Edit = { slug: string; title: string; style: string }

const EDITS: Edit[] = [
  { slug: "amv-knk", title: "AMV, KNK", style: "AMV · edit rythmé" },
  { slug: "nun-id-change", title: "Nun, ID change", style: "ID change · calé sur le beat" },
  { slug: "come-closer", title: "Come Closer", style: "Edit · flow" },
  { slug: "portfolio-etudiant", title: "Portfolio étudiant", style: "Montage cinématique" },
]

function EditPlayer({ edit }: { edit: Edit; key?: React.Key | null }) {
  return (
    <figure>
      <div className="overflow-hidden rounded-card bg-espresso shadow-xl ring-1 ring-espresso/10">
        <video
          controls
          preload="none"
          playsInline
          loop
          poster={`/work/video/${edit.slug}.webp`}
          className="block aspect-video w-full bg-espresso object-contain"
        >
          <source src={`/work/video/${edit.slug}.mp4`} type="video/mp4" />
          Ton navigateur ne peut pas lire cette vidéo.
        </video>
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="text-h5 text-espresso">{edit.title}</span>
        <span className="shrink-0 font-mono text-mono-label uppercase text-taupe-2">
          {edit.style}
        </span>
      </figcaption>
    </figure>
  )
}

export function ProjectVideo() {
  const navigate = useNavigate()
  const others = DISCIPLINES.filter((d) => d.id !== "video")

  React.useEffect(() => {
    document.title = "Montage vidéo, Quentin Singama"
    return () => {
      document.title = "Quentin Singama · UX/UI Designer & Researcher"
    }
  }, [])

  return (
    <main id="top">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-espresso pb-16 pt-36 text-linen">
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
              <Kicker className="text-greige">Hors cadre, une passion</Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[16ch] text-display">
              Le montage, mon <span className="text-apricot">terrain de jeu</span>.
            </h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-7 max-w-[60ch] text-plarge text-greige">
              En dehors du design, je monte. Des edits nerveux, façon flow, coupes serrées, transitions calées sur le son, l'énergie des reels
              et des AMV. Pas une commande : je le fais pour le plaisir de sentir
              un montage tomber pile sur le beat.
            </p>
          </Reveal>

          <Reveal delay={0.32}>
            <p className="mt-8 font-mono text-mono-label uppercase text-apricot">
              {EDITS.length} edits · le son fait partie du montage, {" "}
              <span className="text-greige">monte le volume.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Galerie ─────────────────────────────────────── */}
      <div className="bg-peach text-taupe">
        <div className="shell py-16 lg:py-20">
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {EDITS.map((e, i) => (
              <Reveal key={e.slug} delay={Math.min(i * 0.06, 0.24)}>
                <EditPlayer edit={e} />
              </Reveal>
            ))}
          </div>

          {/* Autres disciplines */}
          <div className="mt-16 border-t border-espresso/10 pt-10">
            <Kicker className="text-taupe-2">Autres disciplines</Kicker>
            <div className="mt-5 flex flex-wrap gap-3">
              {others.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => navigate(`/discipline/${d.id}`)}
                  className="group inline-flex items-center gap-2 rounded-pill border border-espresso/15 px-4 py-2 font-mono text-mono-label uppercase text-espresso transition-colors duration-300 hover:border-espresso hover:bg-espresso hover:text-linen"
                >
                  {d.name}
                  <ArrowUpRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
