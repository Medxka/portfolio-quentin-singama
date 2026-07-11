import { Kicker } from "../ui/Kicker"
import { PillButton } from "../ui/PillButton"
import { Reveal } from "../ui/Reveal"
import { DotGrid } from "../ui/DotGrid"
import { CONTACT } from "../../content"

/**
 * Contact — closing dark CTA. Full-bleed dot-grid texture behind a
 * centered display headline; primary mail CTA + LinkedIn.
 */
export function Contact() {
  const mailto = `mailto:${CONTACT.email}`

  return (
    <section
      id="contact"
      className="section-pad relative overflow-hidden bg-espresso text-linen"
    >
      <DotGrid baseAlpha={0.07} />
      <div className="shell relative z-10 text-center">
        <Reveal>
          <Kicker className="text-greige">Un projet, une alternance ?</Kicker>
          <h2 className="mx-auto mt-6 max-w-[16ch] text-display text-linen">
            Construisons quelque chose{" "}
            <span className="text-apricot">d’évident.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="mx-auto mt-6 max-w-[40ch] text-plarge text-greige">
            {CONTACT.status} — basé à Bordeaux, mobile France entière.
          </p>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillButton href={mailto} variant="solid">
              M’écrire un mail
            </PillButton>
            <PillButton href={CONTACT.linkedin} variant="dark" external>
              LinkedIn
            </PillButton>
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <a
            href={mailto}
            className="mt-8 inline-block font-mono text-mono-label uppercase text-greige transition-colors duration-300 hover:text-apricot"
          >
            {CONTACT.email}
          </a>
        </Reveal>
      </div>
    </section>
  )
}
