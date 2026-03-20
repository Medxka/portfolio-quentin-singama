import * as React from "react"

/*
 * Mechanicus Noosphere - Canvas particle network
 * Floating nodes connected by lines, like a data-network / circuit map.
 * Colors: p5 (violet #8B5CF6) and c5 (cyan #06B6D4) at low opacity.
 * Reacts subtly to mouse position.
 */

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  alpha: number
}

export function HeroCanvas() {
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const mouseRef = React.useRef({ x: 0, y: 0 })
  const nodesRef = React.useRef<Node[]>([])
  const frameRef = React.useRef<number>(0)

  React.useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    let width = 0
    let height = 0

    const colors = [
      "139, 92, 246",   // p5 violet
      "6, 182, 212",    // c5 cyan
      "139, 92, 246",   // more violet (weighted)
    ]

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas!.width = width * dpr
      canvas!.height = height * dpr
      canvas!.style.width = width + "px"
      canvas!.style.height = height + "px"
      ctx!.scale(dpr, dpr)
    }

    function initNodes() {
      const count = Math.min(Math.floor((width * height) / 18000), 80)
      nodesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: Math.random() * 0.5 + 0.15,
      }))
    }

    function drawGrid() {
      if (!ctx) return
      // subtle technical grid
      const gridSize = 60
      ctx.strokeStyle = "rgba(139, 92, 246, 0.03)"
      ctx.lineWidth = 0.5

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
      }

      // measurement marks at edges
      ctx.fillStyle = "rgba(139, 92, 246, 0.06)"
      for (let x = 0; x < width; x += gridSize * 3) {
        ctx.fillRect(x - 0.5, 0, 1, 4)
        ctx.fillRect(x - 0.5, height - 4, 1, 4)
      }
    }

    function animate() {
      if (!ctx) return
      ctx.clearRect(0, 0, width, height)

      drawGrid()

      const nodes = nodesRef.current
      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const connectionDist = 150

      // update & draw nodes
      for (const node of nodes) {
        node.x += node.vx
        node.y += node.vy

        // gentle mouse attraction
        const dx = mx - node.x
        const dy = my - node.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 250 && dist > 1) {
          node.vx += (dx / dist) * 0.003
          node.vy += (dy / dist) * 0.003
        }

        // damping
        node.vx *= 0.999
        node.vy *= 0.999

        // wrap
        if (node.x < -20) node.x = width + 20
        if (node.x > width + 20) node.x = -20
        if (node.y < -20) node.y = height + 20
        if (node.y > height + 20) node.y = -20

        // draw node
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${node.color}, ${node.alpha})`
        ctx.fill()
      }

      // draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.12
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.strokeStyle = `rgba(${nodes[i].color}, ${alpha})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // occasional data pulse along a connection
      const tick = frameRef.current
      if (tick % 120 < 2 && nodes.length > 2) {
        const idx = Math.floor(Math.random() * nodes.length)
        const n = nodes[idx]
        ctx.beginPath()
        ctx.arc(n.x, n.y, 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${n.color}, 0.6)`
        ctx.fill()
      }

      frameRef.current++
      requestAnimationFrame(animate)
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    resize()
    initNodes()
    animate()

    window.addEventListener("resize", () => { resize(); initNodes() })
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  )
}
