import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface LabelProps extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export function Label({ className, ...props }: LabelProps) {
  return (
    <span
      className={cn(
        "font-display text-[11px] uppercase tracking-[0.1em] text-c5 font-semibold",
        className
      )}
      {...props}
    />
  )
}
