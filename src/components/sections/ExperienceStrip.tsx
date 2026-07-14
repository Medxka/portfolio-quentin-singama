import * as React from "react"
import { useReducedMotion } from "motion/react"
import { Reveal } from "../ui/Reveal"

/**
 * ExperienceStrip, slim trust strip under the hero. Mono label, then a
 * full-bleed marquee of wordmarks (schools, studios, clients) drifting
 * slowly left. Two identical sequences make the -50% translate loop
 * seamless; hover pauses it; reduced motion renders a static centered row.
 */

const NAMES = ["ECV Bordeaux", "Happy Job", "EVA", "Yumie", "Musthane"]

/**
 * Passes de la liste par séquence : il faut qu'une séquence soit plus large
 * que l'écran pour que le loop -50% n'expose jamais de vide (jusqu'à ~3000px).
 * La durée suit REPEAT pour garder une vitesse de dérive constante.
 */
const REPEAT = 4

const MARQUEE_CSS = `
.xp-track {
  display: flex;
  align-items: center;
  width: max-content;
  animation: xp-scroll ${30 * REPEAT}s linear infinite;
  will-change: transform;
}
.xp-marquee:hover .xp-track {
  animation-play-state: paused;
}
.xp-seq {
  display: flex;
  flex: none;
  align-items: center;
  gap: clamp(2.25rem, 5vw, 3.5rem);
  padding-right: clamp(2.25rem, 5vw, 3.5rem);
}
.xp-marquee {
  mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 12%, black 88%, transparent);
}
@keyframes xp-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .xp-track {
    animation: none;
    width: 100%;
  }
  .xp-dup {
    display: none;
  }
  .xp-seq {
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    padding-right: 0;
  }
  .xp-seq .xp-dot:last-child {
    display: none;
  }
  .xp-marquee {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
`

function WordmarkSequence({
  duplicate = false,
  passes,
}: {
  duplicate?: boolean
  passes: number
}) {
  // Répète la liste `passes` fois pour qu'une séquence dépasse la largeur d'écran.
  const items = Array.from({ length: passes }, (_, pass) =>
    NAMES.map((name) => ({ name, key: `${pass}-${name}` }))
  ).flat()
  return (
    <div
      className={duplicate ? "xp-seq xp-dup" : "xp-seq"}
      aria-hidden={duplicate || undefined}
    >
      {items.map(({ name, key }) => (
        <React.Fragment key={key}>
          <span className="whitespace-nowrap font-sans text-h5 font-bold text-taupe">
            {name}
          </span>
          {/* trailing dot keeps the rhythm across the loop seam */}
          <span
            aria-hidden
            className="xp-dot inline-block h-1.5 w-1.5 rounded-[1px] bg-apricot"
          />
        </React.Fragment>
      ))}
    </div>
  )
}

export function ExperienceStrip() {
  const reduce = useReducedMotion()
  // Reduced motion : une seule passe, rangée statique centrée (pas de loop).
  const passes = reduce ? 1 : REPEAT
  return (
    <section
      aria-labelledby="confiance-label"
      className="border-b border-espresso/10 py-10"
    >
      <style>{MARQUEE_CSS}</style>

      <div className="shell">
        <Reveal>
          <p
            id="confiance-label"
            className="mb-6 text-center font-mono text-mono-label uppercase text-taupe-2"
          >
            Ils m'ont fait confiance
          </p>
        </Reveal>
      </div>

      <Reveal delay={0.08}>
        <div className="xp-marquee w-full overflow-hidden">
          <div className="xp-track">
            <WordmarkSequence passes={passes} />
            {!reduce && <WordmarkSequence duplicate passes={passes} />}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
