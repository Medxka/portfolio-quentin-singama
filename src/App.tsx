import * as React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { Nav } from "./components/sections/Nav"
import { Footer } from "./components/sections/Footer"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { ProjectMusthane } from "./pages/ProjectMusthane"
import { ProjectLINA } from "./pages/ProjectLINA"
import { ProjectINK } from "./pages/ProjectINK"
import { ProjectResearch } from "./pages/ProjectResearch"
import { ProjectHappyJob } from "./pages/ProjectHappyJob"

export function App() {
  const { pathname, hash } = useLocation()
  const lenisRef = React.useRef<Lenis | null>(null)

  // Smooth scroll global (Lenis).
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    lenisRef.current = lenis
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  // Scroll vers l'ancre si présente, sinon remonte en haut à chaque page.
  React.useEffect(() => {
    const lenis = lenisRef.current
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -112 })
        else el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [pathname, hash])

  // Remonter en haut de page — via Lenis, sinon sa boucle rAF écrase le scroll.
  const scrollToTop = React.useCallback(() => {
    const lenis = lenisRef.current
    if (lenis) lenis.scrollTo(0, { duration: 1.1 })
    else window.scrollTo({ top: 0, behavior: "smooth" })
  }, [])

  return (
    <>
      <Nav onScrollTop={scrollToTop} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projets/musthane" element={<ProjectMusthane />} />
        <Route path="/projets/lina" element={<ProjectLINA />} />
        <Route path="/projets/ink" element={<ProjectINK />} />
        <Route path="/projets/research" element={<ProjectResearch />} />
        <Route path="/projets/happyjob" element={<ProjectHappyJob />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
