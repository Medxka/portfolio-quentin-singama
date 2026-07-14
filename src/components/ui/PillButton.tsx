import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/src/lib/utils"

type Variant = "solid" | "ghost" | "dark"

const Arrow = ({ className }: { className?: string }) => (
  <ArrowRight className={className} size={15} strokeWidth={1.75} aria-hidden />
)

/**
 * PillButton, CTA signature (grammaire effortel, palette chaude).
 *
 * Repos : pill + chip coloré à droite portant la flèche.
 * Hover : le chip s'étend pour remplir toute la pill (0.65s, overshoot),
 * le label recolore pour rester lisible, la flèche boucle (sort à droite,
 * une seconde entre par la gauche). Tout piloté en CSS (voir index.css).
 *
 * - solid : pill apricot → remplissage espresso
 * - dark  : pill espresso-2 → remplissage apricot
 * - ghost : contour → remplissage apricot
 */
export function PillButton({
  children,
  href,
  variant = "solid",
  external,
  className,
  onClick,
}: {
  children: React.ReactNode
  href: string
  variant?: Variant
  external?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      data-variant={variant}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn("pill-btn group", className)}
    >
      <span aria-hidden className="pill-fill" />
      <span className="pill-label">{children}</span>
      <span aria-hidden className="pill-arrows">
        <Arrow className="pill-arrow pill-arrow-rest" />
        <Arrow className="pill-arrow pill-arrow-in" />
      </span>
    </a>
  )
}
