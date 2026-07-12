import { Hero } from "../components/sections/Hero"
import { ExperienceStrip } from "../components/sections/ExperienceStrip"
import { Intro } from "../components/sections/Intro"
import { Projects } from "../components/sections/Projects"
import { Process } from "../components/sections/Process"
import { Contact } from "../components/sections/Contact"

export function Home() {
  return (
    <main id="top">
      <Hero />
      <div className="bg-peach text-taupe">
        <ExperienceStrip />
        <Intro />
        <Projects />
      </div>
      <Process />
      <Contact />
    </main>
  )
}
