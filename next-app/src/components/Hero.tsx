"use client";

import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  MapPin,
  Briefcase,
  Activity,
  Mail,
  CornerDownRight,
  FileText,
  Sparkle,
} from "lucide-react";

const STATS: { value: string; unit: string; label: string }[] = [
  { value: "06", unit: "/ shipped", label: "Projets de bout en bout" },
  { value: "04", unit: "ans", label: "Expérience design" },
  { value: "M2", unit: "UX/UI", label: "Bordeaux — 2026" },
  { value: "09", unit: "/ 2026", label: "Alternance · ETA" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay, ease: [0.2, 0, 0, 1] as const },
        };

  return (
    <section className="relative border-b border-border-subtle bg-bg-base">
      {/* Hairline top : breadcrumb mono */}
      <div className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between">
          <div className="flex items-center gap-2 font-mono text-micro uppercase tracking-[0.14em] text-t3">
            <Sparkle className="w-3 h-3 text-accent" aria-hidden />
            <span>QS</span>
            <span className="text-border-strong">/</span>
            <span>2026</span>
            <span className="text-border-strong">/</span>
            <span className="text-t2">PORTFOLIO_v3</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-mono text-micro uppercase tracking-[0.14em] text-t3">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-ok/40 animate-ping" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-ok" />
            </span>
            <span>Available · Sept 2026</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12">
          {/* ─── Left · 7 cols · narrative ─── */}
          <div className="lg:col-span-7 lg:border-r lg:border-border-subtle lg:pr-12">
            <motion.div
              {...fade(0.05)}
              className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-[0.16em] text-t3 mb-10"
            >
              <span className="h-px w-8 bg-accent" aria-hidden />
              <span className="text-accent">001</span>
              <CornerDownRight className="w-3.5 h-3.5 text-t3" aria-hidden />
              <span>UX/UI Designer · M2 ECV Bordeaux</span>
            </motion.div>

            <motion.h1
              {...fade(0.15)}
              className="font-display font-semibold text-t1 leading-[0.92] tracking-[-0.035em]"
              style={{ fontSize: "var(--text-display-xl)" }}
            >
              Quentin Singama.
            </motion.h1>

            <motion.p
              {...fade(0.3)}
              className="mt-10 max-w-2xl text-t2"
              style={{ fontSize: "var(--text-display-s)", lineHeight: 1.35 }}
            >
              M2 UX/UI à Bordeaux.{" "}
              <span className="text-t1">
                6 projets, 2 ans à transformer du flou en interfaces qui tiennent.
              </span>
            </motion.p>

            <motion.p
              {...fade(0.4)}
              className="mt-6 max-w-xl text-t2"
              style={{ fontSize: "var(--text-body-l)", lineHeight: 1.6 }}
            >
              Je cherche une alternance UX/UI Design dans une équipe
              où la recherche utilisateur compte autant que le Figma.{" "}
              <span className="text-t1">Septembre 2026, Bordeaux ou remote.</span>
            </motion.p>

            <motion.div
              {...fade(0.5)}
              className="mt-12 flex flex-col sm:flex-row gap-3"
            >
              <a
                href="#projets"
                className="group inline-flex items-center justify-center gap-2 h-11 px-5 font-display font-medium text-[15px] text-white bg-accent hover:bg-accent-hover transition-colors duration-150 rounded-md"
              >
                Voir les projets
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </a>
              <a
                href="mailto:quentinsingama974@gmail.com?subject=Alternance%20Product%20Design%20%C2%B7%20Septembre%202026"
                className="group inline-flex items-center justify-center gap-2 h-11 px-5 font-display font-medium text-[15px] text-t1 border border-border-strong hover:border-accent hover:text-accent transition-colors duration-150 rounded-md"
              >
                <Mail className="w-4 h-4" aria-hidden />
                Me parler
              </a>
            </motion.div>

            <motion.div
              {...fade(0.6)}
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 font-mono text-mono-label uppercase tracking-[0.12em] text-t3"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-t2" aria-hidden />
                Bordeaux · FR
              </span>
              <span className="text-border-strong" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-t2" aria-hidden />
                Alternance · 12 mois
              </span>
              <span className="text-border-strong" aria-hidden>·</span>
              <span className="inline-flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-accent" aria-hidden />
                Product · Brand · Service
              </span>
            </motion.div>
          </div>

          {/* ─── Right · 5 cols · raw stats ─── */}
          <div className="lg:col-span-5">
            <motion.div
              {...fade(0.25)}
              className="flex items-center justify-between font-mono text-micro uppercase tracking-[0.18em] text-t3 mb-8"
            >
              <span className="flex items-center gap-2">
                <FileText className="w-3 h-3" aria-hidden />
                index.dat
              </span>
              <span className="text-border-strong">→ snapshot</span>
            </motion.div>

            <ul className="border-t border-border-subtle">
              {STATS.map((s, i) => (
                <motion.li
                  key={s.label}
                  {...fade(0.35 + i * 0.07)}
                  className="group flex items-baseline justify-between border-b border-border-subtle py-6 hover:bg-bg-surface/40 transition-colors duration-150"
                >
                  <div className="flex items-baseline gap-3">
                    <span
                      className="font-mono text-t1 tabular-nums tracking-[-0.04em]"
                      style={{ fontSize: "var(--text-display-m)", lineHeight: 1 }}
                    >
                      {s.value}
                    </span>
                    <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                      {s.unit}
                    </span>
                  </div>
                  <span className="font-mono text-mono-label uppercase tracking-[0.12em] text-t2 text-right max-w-[55%]">
                    {s.label}
                  </span>
                </motion.li>
              ))}
            </ul>

            <motion.div
              {...fade(0.7)}
              className="mt-8 flex items-start gap-3 border-l-2 border-accent pl-4"
            >
              <p className="font-mono text-mono-label uppercase tracking-[0.12em] text-t3 leading-relaxed">
                <span className="text-accent">// stage_court</span>{" "}
                <span className="text-t2">
                  disponible immédiatement · 2 à 6 mois · remote OK
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Hairline bottom : terminal-style footer */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between font-mono text-micro uppercase tracking-[0.14em] text-t3">
          <span className="flex items-center gap-2">
            <span className="text-accent">$</span>
            <span>scroll</span>
            <ArrowRight className="w-3 h-3 -rotate-90" aria-hidden />
            <span className="text-t2">projets.shipped()</span>
          </span>
          <span className="hidden sm:inline text-t3">
            EOF · ligne_001 · prêt
          </span>
        </div>
      </div>
    </section>
  );
}
