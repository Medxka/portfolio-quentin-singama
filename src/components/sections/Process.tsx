import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { SKILLS } from "../../content"

/**
 * Process, the six practices as numbered hairline rows (dark section).
 * System grammar: mono index in apricot, no cards, borders as structure.
 */
export function Process() {
  return (
    <section id="process" className="section-pad bg-espresso text-linen">
      <div className="shell">
        <Reveal>
          <Kicker className="text-greige">Ce que je sais faire</Kicker>
          <h2 className="mt-6 text-h3 text-linen">
            {"Six pratiques, un seul but : rendre simple."}
          </h2>
        </Reveal>

        <ol
          role="list"
          className="mt-16 grid gap-x-16 gap-y-0 border-b border-linen/10 md:grid-cols-2"
        >
          {SKILLS.map((skill, i) => (
            <Reveal
              key={skill.name}
              as="li"
              delay={i * 0.05}
              className="flex items-baseline gap-6 border-t border-linen/10 py-8 transition-colors duration-300 hover:bg-linen/[0.03]"
            >
              <span
                aria-hidden
                className="w-8 shrink-0 font-mono text-mono-label text-apricot"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-h5 text-linen">{skill.name}</h3>
                <p className="mt-2 max-w-[40ch] text-psmall text-greige">
                  {skill.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
