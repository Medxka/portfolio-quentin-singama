import * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { EASE } from "@/src/lib/utils"

/**
 * Reveal, entrée y+fade au scroll. Le contenu est visible par défaut
 * (initial appliqué seulement si motion OK) : jamais de section blanche.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: "div" | "section" | "li" | "span"
  /** React key pass-through (usage en liste) */
  key?: React.Key | null
}) {
  const reduce = useReducedMotion()
  const Comp = motion[as]

  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </Comp>
  )
}
