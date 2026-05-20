"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, CornerDownRight, Sparkle } from "lucide-react";

const TAGS = ["ARBORESCENCE", "NAV DESIGN", "MOBILE", "AUDIT UX"];

export function FeaturedMusthane() {
  return (
    <section id="projets" className="border-b border-border-subtle bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 pt-20 pb-12 lg:pt-28 lg:pb-16">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-[0.16em] text-t3 mb-10"
        >
          <span className="h-px w-8 bg-accent" aria-hidden />
          <span className="text-accent">003</span>
          <CornerDownRight className="w-3.5 h-3.5 text-t3" aria-hidden />
          <span>Selected work · projet vedette</span>
        </motion.div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
        >
          <Link
            href="/musthane"
            className="group block border border-border-subtle rounded-md overflow-hidden bg-bg-surface hover:border-accent transition-colors duration-200"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
              {/* Left · content (8 cols) */}
              <div className="lg:col-span-8 lg:border-r lg:border-border-subtle p-8 md:p-12 lg:p-14 flex flex-col justify-between gap-10">
                <div>
                  {/* Badge nouveau */}
                  <div className="flex items-center gap-3 mb-8">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-accent/40 rounded-sm font-mono text-mono-label uppercase tracking-[0.18em] text-accent bg-accent/5">
                      <Sparkle className="w-3 h-3" strokeWidth={1.5} aria-hidden />
                      Nouveau
                    </span>
                    <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                      // REF · MUST-2026-NAV
                    </span>
                  </div>

                  <h3
                    className="font-display font-semibold text-t1 leading-[1.0] tracking-[-0.025em] mb-6"
                    style={{ fontSize: "var(--text-display-m)" }}
                  >
                    Refonte navigation Musthane
                    <br />
                    <span className="text-t2">100+ produits remis en ordre.</span>
                  </h3>

                  <p
                    className="text-t2 max-w-2xl leading-relaxed"
                    style={{ fontSize: "var(--text-body-l)" }}
                  >
                    Site B2B industriel · 4 axes de classification contradictoires
                    démêlés en une logique unique. Audit heuristique, nouvelle
                    arborescence, mega-menu desktop, drawer mobile et nouvelle accueil.
                  </p>
                </div>

                {/* Tags + CTA */}
                <div className="flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-2">
                    {TAGS.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-1 rounded-sm border border-border-subtle font-mono text-mono-label uppercase tracking-[0.14em] text-t3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-2 text-t1 group-hover:text-accent transition-colors duration-150 font-display font-medium text-[15px]">
                    Ouvrir l&apos;étude
                    <ArrowUpRight
                      className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-150"
                      strokeWidth={1.5}
                      aria-hidden
                    />
                  </span>
                </div>
              </div>

              {/* Right · stat punch (4 cols) */}
              <div className="lg:col-span-4 p-8 md:p-12 lg:p-14 bg-bg-elevated/40 flex flex-col justify-between gap-8 relative overflow-hidden">
                {/* Background grid */}
                <div
                  className="absolute inset-0 opacity-[0.5] pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
                    backgroundSize: "32px 32px",
                  }}
                  aria-hidden
                />

                <span className="relative font-mono text-micro uppercase tracking-[0.18em] text-t3">
                  // stat-key
                </span>

                <div className="relative flex items-baseline gap-3">
                  <span
                    className="font-display font-semibold text-t1 leading-none tracking-[-0.04em] tabular-nums"
                    style={{ fontSize: "clamp(72px, 12vw, 144px)" }}
                  >
                    4
                  </span>
                  <span className="text-t3 font-display text-display-m">→</span>
                  <span
                    className="font-display font-semibold text-accent leading-none tracking-[-0.04em] tabular-nums"
                    style={{ fontSize: "clamp(72px, 12vw, 144px)" }}
                  >
                    1
                  </span>
                </div>

                <div className="relative">
                  <span className="block font-mono text-mono-label uppercase tracking-[0.14em] text-t2">
                    4 axes de nav
                  </span>
                  <span className="block font-mono text-mono-label uppercase tracking-[0.14em] text-t3 mt-1">
                    → 1 logique par usage
                  </span>
                  <span className="block mt-4 font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                    100+ produits remappés
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
