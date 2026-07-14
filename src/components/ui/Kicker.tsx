import * as React from "react"
import { cn } from "@/src/lib/utils"

/**
 * Kicker, ( LABEL ) en mono uppercase, grammaire signature du système.
 * Un seul par section. Couleur héritée (text-*).
 */
export function Kicker({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <span className={cn("kicker", className)}>{children}</span>
}
