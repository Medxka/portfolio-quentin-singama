import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/src/lib/utils"
import { CONTACT } from "../../content"

/* Bouton "Me contacter" + curseur custom qui suit la souris (façon effortel :
   natif masqué, dot en mix-blend difference lerpé + label offset). */
const CTA_CSS = `
.cta-btn-zone { cursor: none; }
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
  .cta-btn-zone { cursor: pointer; }
  .cta-cursor { display: none; }
}
`

function CtaCursor({
  label,
  zoneRef,
}: {
  label: string
  zoneRef: React.RefObject<HTMLDivElement | null>
}) {
  const followRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(false)

  React.useEffect(() => {
    const zone = zoneRef.current
    if (!zone) return
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

    zone.addEventListener("mouseenter", onEnter)
    zone.addEventListener("mousemove", onMove)
    zone.addEventListener("mouseleave", onLeave)
    return () => {
      cancelAnimationFrame(raf)
      zone.removeEventListener("mouseenter", onEnter)
      zone.removeEventListener("mousemove", onMove)
      zone.removeEventListener("mouseleave", onLeave)
    }
  }, [zoneRef])

  return (
    <div className="cta-cursor" data-active={active} ref={followRef} aria-hidden>
      <span className="cta-dot" />
      <span className="cta-label">{label}</span>
    </div>
  )
}

/**
 * ContactCTA — gros bouton "Me contacter" (espresso + chip flèche) avec le
 * curseur custom "Sois pas timide" qui suit la souris au survol.
 */
export function ContactCTA({ className }: { className?: string }) {
  const mailto = `mailto:${CONTACT.email}`
  const zoneRef = React.useRef<HTMLDivElement>(null)

  return (
    <div ref={zoneRef} className={cn("cta-btn-zone relative", className)}>
      <style>{CTA_CSS}</style>
      <a
        href={mailto}
        className="group/btn flex items-stretch gap-1.5"
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
      <CtaCursor label="Sois pas timide" zoneRef={zoneRef} />
    </div>
  )
}
