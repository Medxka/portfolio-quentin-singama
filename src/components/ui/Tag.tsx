import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface TagProps {
  className?: string;
  children?: React.ReactNode;
}

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-[7px] bg-p9 px-[11px] py-[3px] text-[10px] uppercase font-semibold tracking-wider text-c4",
        className
      )}
      {...props}
    />
  )
}
