import * as React from "react"
import { motion, useInView } from "motion/react"

interface RevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  delay?: number
  className?: string
  key?: React.Key
}

export function Reveal({ children, delay = 0, className, ...props }: RevealProps) {
  const ref = React.useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.6, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
