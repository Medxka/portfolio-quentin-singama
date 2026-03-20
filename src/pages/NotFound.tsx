import * as React from "react"
import { Link } from "react-router-dom"
import { motion } from "motion/react"
import { Button } from "@/src/components/ui/Button"

export function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-p5/10 rounded-full blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 text-center px-6">
        <motion.h1 
          className="text-8xl md:text-[12rem] font-bold font-display text-p5 leading-none mb-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-3xl md:text-5xl font-bold font-display text-t1 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Cette page s'est perdue dans le Warp
        </motion.h2>
        
        <motion.p 
          className="text-xl text-t2 mb-12 max-w-lg mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Pas de panique, on peut te ramener en sécurité.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button asChild className="text-lg px-8 py-4">
            <Link to="/">Retour à l'accueil →</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
