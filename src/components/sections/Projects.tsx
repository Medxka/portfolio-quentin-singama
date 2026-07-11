import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { DotGrid } from "../ui/DotGrid"
import { PROJECTS } from "../../content"
import type { Project } from "../../content"

/**
 * Projects — signature section: dark numbered cards stacked on the light
 * peach background. Alternating visual/text halves, DotGrid texture,
 * giant apricot mono numbers. The research project (no image) renders
 * a verbatim interview quote instead of a visual.
 */

function ProjectVisual({ project, index }: { project: Project; index: number }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.imageAlt}
        loading="lazy"
        className={`h-auto w-full rounded-xl shadow-2xl transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:rotate-0 ${
          index % 2 === 0 ? "-rotate-2" : "rotate-2"
        }`}
      />
    )
  }

  // Research project: the raw material speaks for itself
  return (
    <blockquote className="text-h4 text-linen">
      <p>
        «&nbsp;Je sais qu'il y a un concert quelque part. Je sais pas où. Mais
        je sais.&nbsp;»
      </p>
      <cite className="mt-4 block font-mono text-mono-label uppercase not-italic text-greige">
        Léa, 21 ans — entretien n°4
      </cite>
    </blockquote>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const headingId = `projet-${project.id}`
  const reversed = index % 2 === 1

  return (
    <article
      aria-labelledby={headingId}
      className="group relative overflow-hidden rounded-card bg-espresso-2 text-linen md:min-h-[420px]"
    >
      <DotGrid baseAlpha={0.1} />

      <div className="relative z-10 grid items-center gap-10 p-6 sm:p-8 md:grid-cols-2 md:p-12">
        {/* Visual half */}
        <div className={reversed ? "md:order-2" : ""}>
          <ProjectVisual project={project} index={index} />
        </div>

        {/* Text half */}
        <div className={reversed ? "md:order-1" : ""}>
          <div className="flex items-baseline gap-4">
            <span className="select-none font-mono text-[clamp(3rem,6vw,4.5rem)] leading-none text-apricot">
              {project.num}
            </span>
            <span className="font-mono text-mono-label text-greige">
              {project.year}
            </span>
          </div>

          <h3 id={headingId} className="mt-6 text-h4 text-linen">
            {project.title}
          </h3>

          <p className="mt-2 font-mono text-mono-label uppercase text-apricot-bright">
            {project.role}
          </p>

          <p className="mt-4 max-w-[48ch] text-psmall text-greige">
            {project.desc}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-pill border border-butter/25 px-3 py-1.5 font-mono text-mono-label uppercase text-butter"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}

export function Projects() {
  return (
    <section id="projets" className="section-pad">
      <div className="shell">
        <Reveal>
          <Kicker className="text-taupe-2">Projets sélectionnés</Kicker>
          <h2 className="mt-6 max-w-[20ch] text-h3 text-espresso">
            Cinq projets, une même exigence&nbsp;: l'évidence.
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-[clamp(2rem,4vh,3rem)]">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={index * 0.05}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
