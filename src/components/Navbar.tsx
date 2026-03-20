import * as React from "react"
import { Link, useLocation } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react"
import { cn } from "@/src/lib/utils"

function CogIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function CircuitLine() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-border-color to-transparent opacity-60" />
      <motion.div
        className="absolute top-0 h-full w-24 bg-gradient-to-r from-transparent via-p5/60 to-transparent"
        animate={{ x: ["-96px", "calc(100vw + 96px)"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />
      <div className="absolute top-1/2 -translate-y-1/2 left-[20%] w-1 h-1 rounded-full bg-p5/40" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[40%] w-1.5 h-1.5 rounded-full bg-c5/30" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[60%] w-1 h-1 rounded-full bg-p5/40" />
      <div className="absolute top-1/2 -translate-y-1/2 left-[80%] w-1.5 h-1.5 rounded-full bg-c5/30" />
    </div>
  )
}

function NavLink({
  children,
  to,
  onClick,
  className,
}: {
  children: React.ReactNode
  to: string
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  className?: string
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium text-t2 hover:text-t1 transition-colors duration-200 group py-1 px-1",
        className
      )}
    >
      <span className="absolute -left-1.5 -top-0.5 w-0 h-0 border-l border-t border-p5/0 group-hover:w-2 group-hover:h-2 group-hover:border-p5/40 transition-all duration-300 ease-out" />
      <span className="absolute -right-1.5 -bottom-0.5 w-0 h-0 border-r border-b border-c5/0 group-hover:w-2 group-hover:h-2 group-hover:border-c5/40 transition-all duration-300 ease-out" />
      <span className="relative font-display tracking-wide uppercase text-[13px]">{children}</span>
    </Link>
  )
}

export function Navbar() {
  const { scrollY } = useScroll()
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const backgroundColor = useTransform(
    scrollY,
    [0, 50],
    ["rgba(10, 10, 15, 0)", "rgba(10, 10, 15, 0.85)"]
  )

  const backdropFilter = useTransform(
    scrollY,
    [0, 50],
    ["blur(0px)", "blur(16px)"]
  )

  const isHome = location.pathname === "/"

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (isHome) {
      e.preventDefault()
      document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.nav
        style={{ backgroundColor, backdropFilter }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
          <Link
            to="/"
            className="flex items-center gap-2 group"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <CogIcon className="w-5 h-5 text-p5/40 group-hover:text-p5 transition-colors duration-300" />
            </motion.div>
            <span className="font-display font-bold text-xl tracking-tight text-t1 group-hover:text-p4 transition-colors duration-200">
              QS
            </span>
            <motion.span
              className="inline-block w-[2px] h-4 bg-p5/50 ml-[-4px]"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "steps(2)" }}
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <NavLink
              to={isHome ? "#projets" : "/#projets"}
              onClick={(e) => handleNavClick(e, "projets")}
            >
              Projets
            </NavLink>
            <NavLink to="/about">À propos</NavLink>
            <NavLink
              to="#footer"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              Contact
            </NavLink>
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-border-color/40">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-ok"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="text-[10px] font-mono text-t3 tracking-[0.15em] uppercase">Online</span>
            </div>
          </div>

          <button
            className="md:hidden relative p-2 text-t2 hover:text-t1 z-50"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span
                className="block h-[1.5px] bg-current origin-left"
                animate={isMobileMenuOpen ? { rotate: 45, width: "100%" } : { rotate: 0, width: "100%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
              <motion.span
                className="block h-[1.5px] bg-current"
                animate={isMobileMenuOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1.5px] bg-current origin-left"
                animate={isMobileMenuOpen ? { rotate: -45, width: "100%" } : { rotate: 0, width: "60%" }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isScrolled && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <CircuitLine />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl pt-28 px-8 flex flex-col md:hidden"
          >
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-32 left-8 w-[1px] h-32 bg-gradient-to-b from-p5/20 to-transparent" />
              <div className="absolute top-32 left-8 w-12 h-[1px] bg-gradient-to-r from-p5/20 to-transparent" />
              <div className="absolute bottom-40 right-8 w-[1px] h-24 bg-gradient-to-t from-c5/15 to-transparent" />
              <div className="absolute bottom-40 right-8 w-16 h-[1px] bg-gradient-to-l from-c5/15 to-transparent" />
            </div>

            {[
              {
                to: isHome ? "#projets" : "/#projets",
                label: "Projets",
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => handleNavClick(e, "projets"),
                num: "01"
              },
              {
                to: "/about",
                label: "À propos",
                onClick: () => setIsMobileMenuOpen(false),
                num: "02"
              },
              {
                to: "#footer",
                label: "Contact",
                onClick: (e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault()
                  document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" })
                  setIsMobileMenuOpen(false)
                },
                num: "03"
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="border-b border-border-color/30 py-6"
              >
                <Link
                  to={item.to}
                  onClick={item.onClick as any}
                  className="flex items-baseline gap-4 group"
                >
                  <span className="font-mono text-xs text-p5/40 group-hover:text-p5 transition-colors">{item.num}</span>
                  <span className="text-3xl font-bold font-display text-t1 group-hover:text-p4 transition-colors tracking-tight">{item.label}</span>
                  <span className="text-p5/0 group-hover:text-p5/70 transition-all duration-300 ml-auto text-lg">→</span>
                </Link>
              </motion.div>
            ))}

            <div className="mt-auto pb-12 flex items-center gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-ok"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-mono text-[10px] text-t3 tracking-[0.2em] uppercase">System operational - Bordeaux</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
