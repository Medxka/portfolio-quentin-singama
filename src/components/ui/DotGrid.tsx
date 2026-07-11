import * as React from "react"

/**
 * DotGrid — trame de points canvas, texture signature des cartes sombres.
 * Les points respirent doucement ; une lueur suit la souris (désactivé
 * si prefers-reduced-motion : trame statique).
 */
export function DotGrid({
  gap = 22,
  baseAlpha = 0.14,
  color = "255, 176, 97", // apricot rgb
  className,
}: {
  gap?: number
  baseAlpha?: number
  color?: string
  className?: string
}) {
  const ref = React.useRef<HTMLCanvasElement>(null)

  React.useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    let visible = false
    let last = 0
    const FRAME_MS = 1000 / 24 // 24fps suffit pour une respiration lente
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      const time = t * 0.001
      for (let x = gap / 2; x < w; x += gap) {
        for (let y = gap / 2; y < h; y += gap) {
          let a = baseAlpha
          if (!reduce) {
            // respiration lente, déphasée par position
            a += 0.06 * Math.sin(time * 0.8 + x * 0.02 + y * 0.03)
            // lueur souris
            const dx = x - mouse.x
            const dy = y - mouse.y
            const d = Math.hypot(dx, dy)
            if (d < 140) a += (1 - d / 140) * 0.45
          }
          ctx.fillStyle = `rgba(${color}, ${Math.max(a, 0.04)})`
          ctx.beginPath()
          ctx.arc(x, y, 1.1, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = (t: number) => {
      raf = requestAnimationFrame(loop)
      // Ne dessine que si visible, et au plus à 24fps
      if (!visible || t - last < FRAME_MS) return
      last = t
      draw(t)
    }

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.x
      mouse.y = e.clientY - rect.y
    }
    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // rAF actif uniquement quand le canvas est à l'écran
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting
        if (visible && !reduce) draw(performance.now())
      },
      { rootMargin: "80px" }
    )
    io.observe(canvas)

    if (reduce) {
      draw(0)
    } else {
      raf = requestAnimationFrame(loop)
      canvas.parentElement?.addEventListener("mousemove", onMouse)
      canvas.parentElement?.addEventListener("mouseleave", onLeave)
    }

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      canvas.parentElement?.removeEventListener("mousemove", onMouse)
      canvas.parentElement?.removeEventListener("mouseleave", onLeave)
    }
  }, [gap, baseAlpha, color])

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  )
}
