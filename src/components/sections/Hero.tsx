import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { Kicker } from "../ui/Kicker"
import { PillButton } from "../ui/PillButton"
import { DotGrid } from "../ui/DotGrid"
import { EASE } from "../../lib/utils"
import { CONTACT } from "../../content"

/**
 * Rise, page-load entrance (not scroll-tied): y+fade, staggered by index.
 * Renders static when prefers-reduced-motion is on.
 */
function Rise({
  index,
  className,
  children,
}: {
  index: number
  className?: string
  children: React.ReactNode
}) {
  const reduce = useReducedMotion()

  if (reduce) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.1 + index * 0.12, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * Hero, full-viewport dark opening. A warm horizon glow (sunrise arc)
 * breathes at the bottom under a dot-grid texture; the pitch sits on top.
 */
export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-espresso pt-16 text-linen"
    >
      <style>{`
        @keyframes hero-breathe {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes hero-bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
        /* Atmospheric glow rising above the horizon line */
        .hero-halo {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            ellipse 95% 62% at 50% 100%,
            color-mix(in oklab, var(--color-apricot) 22%, transparent) 0%,
            color-mix(in oklab, var(--color-apricot) 9%, transparent) 40%,
            transparent 72%
          );
          animation: hero-breathe 8s ease-in-out infinite;
        }
        /* The horizon itself: a huge circle whose top arc peeks in,
           dark surface + thin bright rim + hugging glow */
        .hero-planet {
          position: absolute;
          left: 50%;
          top: 100%;
          width: 160vw;
          min-width: 900px;
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%, calc(-1 * clamp(5.5rem, 16vh, 11rem)));
          background: linear-gradient(
            to bottom,
            color-mix(in oklab, var(--color-espresso-2) 82%, var(--color-apricot) 18%),
            var(--color-espresso) 24%
          );
          border: 1px solid color-mix(in oklab, var(--color-apricot-bright) 45%, transparent);
          box-shadow:
            0 -2px 18px color-mix(in oklab, var(--color-apricot-bright) 32%, transparent),
            0 -26px 110px color-mix(in oklab, var(--color-apricot) 24%, transparent);
        }
        .hero-bob {
          display: inline-block;
          animation: hero-bob 2.2s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-halo, .hero-bob { animation: none; }
        }
      `}</style>

      {/* Layer 1, warm horizon backdrop */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="hero-halo" />
        <div className="hero-planet" />
      </div>

      {/* Layer 2, dot-grid texture over the horizon area */}
      <div aria-hidden className="absolute bottom-0 left-0 h-1/2 w-full">
        <DotGrid baseAlpha={0.08} />
      </div>

      {/* Layer 3, content */}
      <div className="shell relative z-10 text-center">
        <Rise index={0}>
          <Kicker className="text-greige">{CONTACT.status}</Kicker>
        </Rise>

        <Rise index={1}>
          <h1 className="mx-auto mt-6 max-w-[16ch] text-display">
            Je suis{" "}
            <span className="text-apricot">Quentin Singama</span>.
          </h1>
        </Rise>

        <Rise index={2}>
          <p className="mx-auto mt-6 max-w-[44ch] text-plarge text-greige">
            UX/UI Designer &amp; Researcher à Bordeaux. J’explore, je
            prototype, je teste.
          </p>
        </Rise>

        <Rise index={3} className="mt-10 flex flex-wrap justify-center gap-3">
          <PillButton variant="dark" href="#projets">
            Voir les projets
          </PillButton>
          <PillButton variant="solid" href={`mailto:${CONTACT.email}`}>
            Me contacter
          </PillButton>
        </Rise>

        <Rise index={4} className="mt-16">
          <p className="font-mono text-mono-label uppercase text-greige">
            scroll{" "}
            <span aria-hidden className="hero-bob">
              ↓
            </span>
          </p>
        </Rise>
      </div>
    </section>
  )
}
