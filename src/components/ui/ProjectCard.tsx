import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { cn } from "@/src/lib/utils"
import { Tag } from "./Tag"

interface ProjectCardProps {
  tag: string
  title: string
  description: string
  imageSrc: string
  imageAlt: string
  href: string
  featured?: boolean
  className?: string
  imageHeight?: string
  imageBg?: string
}

export function ProjectCard({
  tag,
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  featured = false,
  className,
  imageHeight = "h-[200px]",
  imageBg = "bg-p9",
}: ProjectCardProps) {
  return (
    <Link to={href} className={cn("block group", className)}>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="h-full flex flex-col overflow-hidden rounded-2xl border border-border-color bg-bg-card transition-all duration-300 hover:glow-p5 hover:border-p5/50"
      >
        <div className={cn("w-full overflow-hidden relative", imageHeight, imageBg)}>
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex flex-col flex-1 p-6 md:p-8">
          <Tag className="w-fit mb-4">{tag}</Tag>
          <h3 className={cn("font-bold text-t1 mb-3", featured ? "text-2xl md:text-3xl" : "text-xl md:text-2xl")}>
            {title}
          </h3>
          <p className="text-t2 text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </Link>
  )
}
