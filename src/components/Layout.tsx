import * as React from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"

export function Layout() {
  const location = useLocation()

  React.useEffect(() => {
    const titles: Record<string, string> = {
      "/": "Quentin Singama | UX/UI Designer & Researcher",
      "/ink": "INK — Branding Dystopique | Quentin Singama",
      "/lina": "LINA — Expérience Librairie | Quentin Singama",
      "/research": "UX Research — Concerts Étudiants | Quentin Singama",
      "/musthane": "Musthane — Audit UX | Quentin Singama",
      "/about": "À Propos — Dossier Personnel | Quentin Singama",
    }
    
    // Set title based on current path, or fallback to default
    document.title = titles[location.pathname] || "Quentin Singama | UX/UI Designer"
    
    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location])

  return (
    <div className="min-h-screen flex flex-col bg-bg text-t1 font-sans selection:bg-p5/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
