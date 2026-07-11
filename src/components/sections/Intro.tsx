import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"

/**
 * Intro — "La démarche". Asymmetric two-column layout: kicker on the
 * left, statement + method + a quiet inline stat row on the right.
 * No cards, no borders: the numbers breathe on the bare peach ground.
 */

const STATS = [
  { value: "05", label: "projets livrés" },
  { value: "03", label: "expériences studio" },
  { value: "2026", label: "dispo alternance" },
]

export function Intro() {
  return (
    <section id="intro" className="section-pad">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <Kicker className="text-taupe-2">La démarche</Kicker>
            </Reveal>
          </div>

          <div className="md:col-span-7">
            <Reveal delay={0.08}>
              <h2 className="text-h3 text-espresso">
                Explorer, prototyper, tester — jusqu'à ce que ce soit évident.
              </h2>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[60ch] text-plarge text-taupe">
                Diplômé Concepteur UI à l'ECV Bordeaux, je crois qu'un bon
                design ne se remarque pas&nbsp;: il rend les choses simples. Ma
                méthode tient en trois gestes — comprendre le vrai problème par
                la recherche, structurer par le système, valider par le test.
              </p>
            </Reveal>

            <ul className="mt-12 flex flex-wrap gap-12">
              {STATS.map((stat, index) => (
                <Reveal as="li" key={stat.label} delay={0.24 + index * 0.08}>
                  <p className="font-mono text-[1.8rem] font-medium leading-none text-sienna">
                    {stat.value}
                  </p>
                  <p className="mt-3 font-mono text-mono-label uppercase text-taupe-2">
                    {stat.label}
                  </p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
