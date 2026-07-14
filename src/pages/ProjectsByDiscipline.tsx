import * as React from "react"
import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { DotGrid } from "../components/ui/DotGrid"
import {
  DISCIPLINES,
  projectsByDiscipline,
  type Project,
} from "../content"

/**
 * Page /discipline/:id, présente les projets d'une discipline.
 * Une seule page paramétrée : hero espresso + grille des projets, ou
 * état « bientôt » si la discipline n'a pas encore de projet.
 */

/* ── Carte projet (grille) ─────────────────────────────────── */
function DisciplineCard({ project }: { project: Project; key?: React.Key | null }) {
  const media = project.image ? (
    <div className="overflow-hidden rounded-card bg-espresso-2">
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.03]"
      />
    </div>
  ) : (
    <div className="dot-fallback grid aspect-[16/10] place-items-center rounded-card bg-espresso">
      <span className="font-mono text-mono-label uppercase tracking-[0.04em] text-greige">
        {project.title}
      </span>
    </div>
  )

  const body = (
    <>
      {media}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span className="font-mono text-mono-label uppercase text-taupe-2">
            {project.num} · {project.role}
          </span>
          <h3 className="mt-2 text-h4 text-espresso">{project.title}</h3>
        </div>
        <span
          aria-hidden
          className="mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full bg-espresso/8 text-espresso transition-all duration-300 group-hover:bg-espresso group-hover:text-linen"
        >
          <ArrowRight
            size={16}
            strokeWidth={2}
            className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
          />
        </span>
      </div>
      <p className="mt-3 max-w-[52ch] text-pbody text-taupe">{project.desc}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((t) => (
          <li
            key={t}
            className="rounded-pill border border-espresso/12 px-2.5 py-1 font-mono text-mono-label uppercase text-taupe-2"
          >
            {t}
          </li>
        ))}
      </ul>
    </>
  )

  if (project.href) {
    return (
      <Link
        to={project.href}
        className="group block rounded-card p-3 transition-colors duration-300 hover:bg-cream/60"
      >
        {body}
      </Link>
    )
  }
  return <div className="group rounded-card p-3">{body}</div>
}

/* ── Page ─────────────────────────────────────────────────── */
export function ProjectsByDiscipline() {
  const { id } = useParams()
  const navigate = useNavigate()
  const discipline = DISCIPLINES.find((d) => d.id === id)

  React.useEffect(() => {
    if (discipline) document.title = `${discipline.name}, Quentin Singama`
    return () => {
      document.title = "Quentin Singama · UX/UI Designer & Researcher"
    }
  }, [discipline])

  // Slug inconnu → retour à l'accueil.
  if (!discipline) return <Navigate to="/" replace />

  const projects = projectsByDiscipline(discipline.id)
  const others = DISCIPLINES.filter((d) => d.id !== discipline.id)

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
              <Kicker className="text-greige">
                Discipline, {projects.length}{" "}
                {projects.length > 1 ? "projets" : "projet"}
              </Kicker>
            </div>
          </Reveal>

          <Reveal delay={0.16}>
            <h1 className="mt-6 max-w-[16ch] text-display">{discipline.name}</h1>
          </Reveal>

          <Reveal delay={0.24}>
            <p className="mt-6 max-w-[58ch] text-plarge text-greige">
              {discipline.intro}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Corps ───────────────────────────────────────── */}
      <div className="bg-peach text-taupe">
        <div className="shell py-16 lg:py-20">
          {projects.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={Math.min(i * 0.06, 0.24)}>
                  <DisciplineCard project={p} />
                </Reveal>
              ))}
            </div>
          ) : (
            /* État « bientôt », discipline sans projet publié */
            <Reveal>
              <div className="mx-auto max-w-2xl rounded-card border border-espresso/10 bg-cream px-8 py-16 text-center shadow-sm">
                <span className="font-mono text-mono-label uppercase text-taupe-2">
                  Bientôt
                </span>
                <h2 className="mt-4 text-h4 text-espresso">
                  Les cas d'étude arrivent.
                </h2>
                <p className="mx-auto mt-4 max-w-[42ch] text-pbody text-taupe">
                  {discipline.intro} Les projets sont en cours de préparation, reviens bientôt, ou explore les autres disciplines.
                </p>
              </div>
            </Reveal>
          )}

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
