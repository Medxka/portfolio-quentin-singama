import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary"
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-p5 disabled:pointer-events-none disabled:opacity-50",
          variant === "primary" && "bg-p5 text-white hover:-translate-y-0.5 hover:glow-p5",
          variant === "secondary" && "bg-transparent border border-border-color text-t1 hover:border-p5",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
