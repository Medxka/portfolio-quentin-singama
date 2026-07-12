import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { TIMELINE } from "../../content"

/**
 * Timeline — career entries as hairline rows on the light background
 * (parent wrapper sets bg-peach / text-taupe).
 */
export function Timeline() {
  return (
    <section id="parcours" className="section-pad">
      <div className="shell">
        <Reveal>
          <Kicker className="text-taupe-2">À propos</Kicker>
          <h2 className="mt-6 text-h3 text-espresso">
            Quatre années à apprendre en faisant.
          </h2>
        </Reveal>

        <ol role="list" className="mt-16 border-b border-espresso/10">
          {TIMELINE.map((entry, i) => (
            <Reveal
              key={entry.company}
              as="li"
              delay={i * 0.08}
              className="grid gap-6 border-t border-espresso/10 py-10 md:grid-cols-12"
            >
              <p className="font-mono text-psmall font-medium text-espresso md:col-span-2">
                {entry.year}
              </p>
              <div className="md:col-span-4">
                <h3 className="text-h5 text-espresso">{entry.role}</h3>
                <p className="mt-1 font-mono text-mono-label uppercase text-taupe-2">
                  {entry.company}
                </p>
              </div>
              <p className="max-w-[52ch] text-psmall text-taupe md:col-span-6">
                {entry.desc}
              </p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
