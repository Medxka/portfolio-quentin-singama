import { Link } from "react-router-dom"
import { Search, Boxes, ClipboardCheck, ArrowRight } from "lucide-react"
import { Kicker } from "../components/ui/Kicker"
import { Reveal } from "../components/ui/Reveal"
import { PillButton } from "../components/ui/PillButton"
import { DotGrid } from "../components/ui/DotGrid"
import { Timeline } from "../components/sections/Timeline"
import { Contact } from "../components/sections/Contact"
import { CONTACT } from "../content"

const PRINCIPLES = [
  {
    Icon: Search,
    title: "Comprendre",
    desc: "Partir du vrai problème, pas du brief. Entretiens, tests, observation, écouter avant de dessiner.",
  },
  {
    Icon: Boxes,
    title: "Structurer",
    desc: "Mettre de l'ordre par le système : arborescence, design system, cohérence. La structure porte le sens.",
  },
  {
    Icon: ClipboardCheck,
    title: "Valider",
    desc: "Confronter au réel. Prototyper, tester, itérer, jusqu'à ce que ça devienne évident pour l'utilisateur.",
  },
]

export function About() {
  return (
    <main id="top">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-espresso pb-24 pt-36 text-linen">
        <DotGrid baseAlpha={0.05} />
        <div className="shell relative z-10 grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div className="relative overflow-hidden rounded-3xl bg-espresso-2">
              <img
                src="/portrait.jpg"
                alt="Quentin Singama, UX/UI Designer à Bordeaux"
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
          </Reveal>

          <div>
            <Reveal>
              <Kicker className="text-greige">À propos</Kicker>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-6 max-w-[16ch] text-display">
                Designer, chercheur,{" "}
                <span className="text-apricot">obsédé de clarté.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-7 max-w-[54ch] text-plarge text-greige">
                Je suis UX/UI Designer &amp; Researcher, basé à Bordeaux.
                Diplômé Concepteur UI à l'ECV en 2025, je poursuis en Master
                pour approfondir la recherche et le design de systèmes. Ce qui
                me fait avancer&nbsp;: transformer des problèmes emmêlés en
                interfaces qui coulent de source.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-4 max-w-[54ch] text-pbody text-greige">
                Avant le design produit, j'ai fait mes armes en direction
                artistique et graphisme, chez Happy Job, EVA, Yumie. Cette
                double culture, image et système, nourrit ma façon de
                concevoir&nbsp;: rigoureuse dans la structure, sensible dans le
                détail.
              </p>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-8 flex flex-wrap gap-2.5">
                {[CONTACT.status, CONTACT.formation, CONTACT.location].map(
                  (chip) => (
                    <li
                      key={chip}
                      className="rounded-pill bg-linen/[0.06] px-4 py-2 font-mono text-mono-label uppercase text-greige"
                    >
                      {chip}
                    </li>
                  )
                )}
              </ul>
            </Reveal>

            <Reveal delay={0.4}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <PillButton href="#contact" variant="solid">
                  Me contacter
                </PillButton>
                <Link
                  to="/"
                  className="group inline-flex items-center gap-1.5 font-mono text-mono-label uppercase text-greige transition-colors duration-300 hover:text-linen"
                >
                  Voir mes projets
                  <ArrowRight
                    size={14}
                    strokeWidth={2}
                    aria-hidden
                    className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Ma démarche ───────────────────────────────────── */}
      <section className="section-pad bg-peach text-taupe">
        <div className="shell">
          <Reveal>
            <Kicker className="text-taupe-2">Ma démarche</Kicker>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-6 max-w-[22ch] text-h3 text-espresso">
              Comprendre, structurer, valider.
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-3">
            {PRINCIPLES.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={0.12 + i * 0.08}>
                <div className="flex flex-col">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-espresso text-apricot">
                    <Icon size={20} strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="mt-5 font-mono text-mono-label text-sienna">
                    0{i + 1}
                  </span>
                  <h3 className="mt-2 font-sans text-h4 text-espresso">
                    {title}
                  </h3>
                  <p className="mt-2.5 max-w-[34ch] text-psmall text-taupe">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Parcours (timeline) ───────────────────────────── */}
      <div className="bg-peach text-taupe">
        <Timeline />
      </div>

      {/* ── Contact ───────────────────────────────────────── */}
      <Contact />
    </main>
  )
}
