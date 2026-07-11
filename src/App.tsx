import * as React from "react"
import Lenis from "lenis"
import { Nav } from "./components/sections/Nav"
import { Hero } from "./components/sections/Hero"
import { ExperienceStrip } from "./components/sections/ExperienceStrip"
import { Intro } from "./components/sections/Intro"
import { Projects } from "./components/sections/Projects"
import { Process } from "./components/sections/Process"
import { Timeline } from "./components/sections/Timeline"
import { Contact } from "./components/sections/Contact"
import { Footer } from "./components/sections/Footer"

export function App() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const lenis = new Lenis({ autoRaf: true, lerp: 0.09 })
    return () => lenis.destroy()
  }, [])

  return (
    <>
      <Nav />
      <main id="top">
        <Hero />
        <div className="bg-peach text-taupe">
          <ExperienceStrip />
          <Intro />
          <Projects />
        </div>
        <Process />
        <div className="bg-peach text-taupe">
          <Timeline />
        </div>
        <Contact />
        <Footer />
      </main>
    </>
  )
}
