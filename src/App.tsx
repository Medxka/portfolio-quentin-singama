import * as React from "react"
import { Routes, Route, useLocation } from "react-router-dom"
import Lenis from "lenis"
import { Nav } from "./components/sections/Nav"
import { Footer } from "./components/sections/Footer"
import { Home } from "./pages/Home"
import { About } from "./pages/About"
import { ProjectMusthane } from "./pages/ProjectMusthane"
import { ProjectLINA } from "./pages/ProjectLINA"

export function App() {
  const { pathname, hash } = useLocation()

  // Smooth scroll global (Lenis).
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    return () => lenis.destroy()
  }, [])

  // Scroll vers l'ancre si présente, sinon remonte en haut à chaque page.
  React.useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: "smooth" })
        return
      }
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projets/musthane" element={<ProjectMusthane />} />
        <Route path="/projets/lina" element={<ProjectLINA />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </>
  )
}
