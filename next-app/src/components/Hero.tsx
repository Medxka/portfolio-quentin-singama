"use client";

import { motion } from "motion/react";
import { ProcessFlow } from "./ProcessFlow";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full pt-32 pb-20">
        {/* REF code micro signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="ref-code mb-8"
        >
          // QS · 2026 · BORDEAUX
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left — copy */}
          <div className="lg:col-span-7">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="h-px w-8 bg-accent" />
              <span className="ref-code !text-accent !text-[11px]">
                Product Designer · M2 UX/UI
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display font-semibold leading-[0.92] tracking-[-0.035em] mb-10">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.2, 0, 0, 1] }}
                className="block text-t1"
                style={{ fontSize: "var(--text-display-xl)" }}
              >
                Quentin
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.45, ease: [0.2, 0, 0, 1] }}
                className="block text-gradient-signature uppercase"
                style={{
                  fontSize: "var(--text-display-l)",
                  letterSpacing: "0.04em",
                }}
              >
                Singama
              </motion.span>
            </h1>

            {/* Accroche validée (Option A factuelle) */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.2, 0, 0, 1] }}
              className="text-t2 max-w-2xl mb-6"
              style={{ fontSize: "var(--text-display-xs)", lineHeight: 1.5 }}
            >
              M2 UX/UI à Bordeaux.{" "}
              <span className="text-t1">
                6 projets, 2 ans à transformer du flou en interfaces qui tiennent.
              </span>
            </motion.p>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease: [0.2, 0, 0, 1] }}
              className="text-t2 max-w-xl mb-12"
              style={{ fontSize: "var(--text-body)", lineHeight: 1.65 }}
            >
              Je cherche une alternance Product Design dans une équipe SaaS B2B
              où la recherche utilisateur compte autant que le Figma.{" "}
              <span className="text-t1">Septembre 2026, Bordeaux ou remote.</span>
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: [0.2, 0, 0, 1] }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#projets"
                className="inline-flex items-center justify-center gap-2 px-6 h-11 rounded-md font-display font-medium text-[15px] tracking-tight text-white transition-colors duration-150"
                style={{
                  backgroundColor: "var(--accent)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor =
                    "var(--accent-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "var(--accent)")
                }
              >
                Voir les projets
                <span aria-hidden>→</span>
              </a>
              <a
                href="mailto:quentinsingama974@gmail.com?subject=Alternance%20Product%20Design%20%C2%B7%20Septembre%202026"
                className="inline-flex items-center justify-center px-6 h-11 rounded-md font-display font-medium text-[15px] tracking-tight text-t1 border transition-colors duration-150"
                style={{ borderColor: "var(--border-strong)" }}
              >
                Me parler
              </a>
            </motion.div>
          </div>

          {/* Right — Process flow signature data viz */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9, ease: [0.2, 0, 0, 1] }}
            className="hidden lg:block lg:col-span-5"
          >
            <div className="border rounded-xl p-6" style={{ borderColor: "var(--border-subtle)", backgroundColor: "var(--bg-surface)" }}>
              <div className="flex items-center gap-2 mb-6">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: "var(--ok)" }}
                />
                <span className="ref-code !text-[10px]">
                  // PROCESS · LIVE
                </span>
              </div>
              <ProcessFlow />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
