import * as React from "react"
import { ArrowRight } from "lucide-react"
import { Kicker } from "../ui/Kicker"
import { Reveal } from "../ui/Reveal"
import { CONTACT } from "../../content"

/* Curseur custom + label qui suit la souris sur la card (façon effortel :
   .custom__cursor lerpé, .cursor label offset bas-droite). */
const CTA_CSS = `
.cta-card { cursor: none; }
.cta-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease;
  will-change: transform;
}
.cta-cursor[data-active="true"] { opacity: 1; }
.cta-dot {
  position: absolute;
  top: 0;
  left: 0;
  width: 13px;
  height: 13px;
  margin: -6.5px 0 0 -6.5px;
  border-radius: 50%;
  background: #fff;
  mix-blend-mode: difference;
}
.cta-label {
  position: absolute;
  top: 15px;
  left: 17px;
  white-space: nowrap;
  border-radius: 6px;
  background: var(--color-linen);
  color: var(--color-espresso);
  padding: 5px 9px;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
@media (prefers-reduced-motion: reduce) {
  .cta-card { cursor: pointer; }
  .cta-cursor { display: none; }
}
`

function CtaCursor({
  label,
  cardRef,
}: {
  label: string
  cardRef: React.RefObject<HTMLDivElement | null>
}) {
  const followRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const card = cardRef.current
    if (!card) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    let mx = 0
    let my = 0
    let cx = 0
    let cy = 0
    let raf = 0

    const loop = () => {
      cx += (mx - cx) * 0.2
      cy += (my - cy) * 0.2
      if (followRef.current) {
        followRef.current.style.transform = `translate(${cx}px, ${cy}px)`
      }
      raf = requestAnimationFrame(loop)
    }
    const onEnter = (e: MouseEvent) => {
      mx = cx = e.clientX
      my = cy = e.clientY
      setActive(true)
      if (!raf) raf = requestAnimationFrame(loop)
    }
    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
    }
    const onLeave = () => {
      setActive(false)
      cancelAnimationFrame(raf)
      raf = 0
    }

    card.addEventListener("mouseenter", onEnter)
    card.addEventListener("mousemove", onMove)
    card.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      card.removeEventListener("mouseenter", onEnter)
      card.removeEventListener("mousemove", onMove)
      card.removeEventListener("mouseleave", onLeave)
    }
  }, [cardRef])

  return (
    <div className="cta-cursor" data-active={active} ref={followRef} aria-hidden>
      <span className="cta-dot" />
      <span className="cta-label">{label}</span>
    </div>
  )
}

export function Contact() {
  const mailto = `mailto:${CONTACT.email}`
  const cardRef = React.useRef<HTMLDivElement>(null)

  return (
    <section id="contact" className="section-pad bg-espresso text-linen">
      <style>{CTA_CSS}</style>
      <div className="shell">
        <Reveal>
          <Kicker className="text-greige">Un projet, une alternance ?</Kicker>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={cardRef}
            className="cta-card group/card relative mt-8 overflow-hidden rounded-[28px] bg-apricot p-8 text-espresso md:p-14"
          >
            <div className="grid gap-8 md:grid-cols-[1.55fr_1fr] md:items-start">
              <h2 className="max-w-[15ch] text-h3 leading-[1.05] text-espresso">
                Construisons quelque chose d'évident.
              </h2>
              <p className="max-w-[38ch] text-pbody text-espresso/75">
                Disponible en alternance, septembre 2026. Écris-moi pour
                discuter d'un besoin, d'un projet, ou juste pour dire bonjour.
              </p>
            </div>

            <a
              href={mailto}
              className="group/btn mt-10 flex items-stretch gap-1.5"
              aria-label="Me contacter par mail"
            >
              <span className="flex flex-1 items-center rounded-2xl bg-espresso px-7 py-5 font-sans text-h4 text-linen transition-colors duration-300 group-hover/btn:bg-espresso-2">
                Me contacter
              </span>
              <span className="flex w-16 items-center justify-center rounded-2xl bg-espresso text-apricot transition-colors duration-300 group-hover/btn:bg-espresso-2 md:w-24">
                <ArrowRight
                  size={22}
                  strokeWidth={2}
                  aria-hidden
                  className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover/btn:translate-x-1"
                />
              </span>
            </a>

            <CtaCursor label="Sois pas timide" cardRef={cardRef} />
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-mono-label uppercase text-greige">
            <a
              href={mailto}
              className="transition-colors duration-300 hover:text-apricot"
            >
              {CONTACT.email}
            </a>
            <a
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
              className="transition-colors duration-300 hover:text-apricot"
            >
              LinkedIn
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
