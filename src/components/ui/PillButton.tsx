import * as React from "react"
import { cn } from "@/src/lib/utils"

type Variant = "solid" | "ghost" | "dark"

/**
 * PillButton — bouton signature : pill radius 10px, mono uppercase,
 * chip flèche carrée accolée qui glisse au hover.
 *
 * - solid : fond apricot, texte espresso (CTA primaire)
 * - ghost : bordure, texte courant (secondaire sur clair ou sombre)
 * - dark  : fond espresso-2, texte linen (secondaire sur sombre)
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
  const base =
    "group inline-flex items-stretch font-mono text-mono-label uppercase select-none"

  const bodyStyles: Record<Variant, string> = {
    solid: "bg-apricot text-espresso group-hover:bg-apricot-bright",
    ghost:
      "border border-current/30 text-current group-hover:border-current/60",
    dark: "bg-espresso-2 text-linen group-hover:bg-espresso-3",
  }

  const chipStyles: Record<Variant, string> = {
    solid: "bg-apricot text-espresso group-hover:bg-apricot-bright",
    ghost: "border border-current/30 group-hover:border-current/60",
    dark: "bg-espresso-2 text-linen group-hover:bg-espresso-3",
  }

  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(base, className)}
    >
      <span
        className={cn(
          "flex items-center rounded-l-pill px-4 py-3 transition-colors duration-300",
          bodyStyles[variant]
        )}
      >
        {children}
      </span>
      <span
        aria-hidden
        className={cn(
          "ml-px flex w-10 items-center justify-center rounded-r-pill transition-colors duration-300",
          chipStyles[variant]
        )}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5"
        >
          <path
            d="M2 7h9M7.5 3.5 11 7l-3.5 3.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </a>
  )
}
