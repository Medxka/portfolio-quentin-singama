import * as React from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { DotGrid } from "../ui/DotGrid"
import { PROJECTS } from "../../content"
import type { Project } from "../../content"

/**
 * Projects, pile de cartes façon effortel (.sticky-card) : chaque carte
 * s'épingle au même point (sticky top), la suivante monte par-dessus, et
 * la précédente "recule" (scale down depuis le haut + voile pêche qui la
 * fond dans l'arrière-plan). Piloté au scroll en rAF via --recede.
 */

const STACK_CSS = `
.proj-stack {
  display: flex;
  flex-direction: column;
  gap: clamp(6rem, 18vh, 10rem);
}
.proj-card {
  position: sticky;
  top: var(--stack-top, clamp(5rem, 12vh, 7rem));
  transform-origin: 50% 0;
  transform: scale(calc(1 - 0.07 * var(--recede, 0)));
  will-change: transform;
}
/* voile couleur du fond : la carte couverte se fond dans la page
   (équivalent .sticky-card-overlay d'effortel) */
.proj-veil {
  position: absolute;
  inset: 0;
  z-index: 20;
  border-radius: inherit;
  background: var(--color-peach);
  opacity: calc(0.6 * var(--recede, 0));
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .proj-card { transform: none; }
  .proj-veil { display: none; }
}
`

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
        Léa, 21 ans, entretien n°4
      </cite>
    </blockquote>
  )
}

function ProjectCard({
  project,
  index,
}: {
  project: Project
  index: number
  key?: React.Key | null
}) {
  const headingId = `projet-${project.id}`
  const reversed = index % 2 === 1

  return (
    <article
      aria-labelledby={headingId}
      className="proj-card group relative overflow-hidden rounded-card bg-espresso-2 text-linen md:min-h-[420px]"
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
                className="rounded-pill border border-cream/25 px-3 py-1.5 font-mono text-mono-label uppercase text-cream"
              >
                {tag}
              </li>
            ))}
          </ul>

          {project.href && (
            <p className="mt-7 inline-flex items-center gap-2 font-mono text-mono-label uppercase text-linen">
              Voir le cas d'étude
              <ArrowRight
                size={14}
                strokeWidth={2}
                aria-hidden
                className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-1"
              />
            </p>
          )}
        </div>
      </div>

      {/* voile de recul (opacité pilotée par --recede) */}
      <span className="proj-veil" aria-hidden />

      {/* carte cliquable vers le cas d'étude */}
      {project.href && (
        <Link
          to={project.href}
          aria-label={`Voir le cas d'étude ${project.title}`}
          className="absolute inset-0 z-30"
        />
      )}
    </article>
  )
}

export function Projects() {
  const stackRef = React.useRef<HTMLDivElement>(null)

  // Recede au scroll : pour chaque carte (sauf la dernière), la progression
  // = distance parcourue par la carte suivante vers le point d'épinglage.
  React.useEffect(() => {
    const stack = stackRef.current
    if (!stack) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const cards = [...stack.querySelectorAll<HTMLElement>(".proj-card")]
    if (cards.length < 2) return
    let raf = 0
    let ticking = false

    const update = () => {
      ticking = false
      const gap = parseFloat(getComputedStyle(stack).rowGap) || 0
      for (let i = 0; i < cards.length - 1; i++) {
        const cur = cards[i]
        const next = cards[i + 1]
        const pinTop = parseFloat(getComputedStyle(cur).top) || 0
        const travel = cur.offsetHeight + gap
        const p = Math.min(
          1,
          Math.max(0, 1 - (next.getBoundingClientRect().top - pinTop) / travel)
        )
        cur.style.setProperty("--recede", p.toFixed(3))
      }
    }
    const onScroll = () => {
      if (!ticking) {
        ticking = true
        raf = requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [])

  return (
    <section id="projets" className="section-pad">
      <style>{STACK_CSS}</style>
      <div className="shell">
        <Reveal>
          <Kicker className="text-taupe-2">Projets sélectionnés</Kicker>
          <h2 className="mt-6 max-w-[20ch] text-h3 text-espresso">
            Cinq projets, une même exigence&nbsp;: l'évidence.
          </h2>
        </Reveal>

        <div ref={stackRef} className="proj-stack mt-16">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
