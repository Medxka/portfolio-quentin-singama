"use client";

import { motion } from "motion/react";
import {
  Briefcase,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  Mail,
  ArrowUpRight,
  CornerDownRight,
} from "lucide-react";

const DATA_ROWS = [
  { label: "Poste", value: "UX/UI Designer · Generalist research + craft", Icon: Briefcase },
  { label: "Contrat", value: "Alternance M2 · rythme 4j entreprise / 1j école", Icon: Calendar },
  { label: "Début", value: "Septembre 2026 · 12 mois", Icon: Clock },
  { label: "En attendant", value: "Stages courts ouverts · mai → août 2026", Icon: Sparkles },
  { label: "Localisation", value: "Bordeaux · Remote · Hybride", Icon: MapPin },
];

export function StatusSection() {
  return (
    <section id="status" className="border-b border-border-subtle bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-12 lg:gap-x-12">
          {/* Left · primary signal */}
          <div className="lg:col-span-7 lg:border-r lg:border-border-subtle lg:pr-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
              className="flex items-center gap-2 font-mono text-mono-label uppercase tracking-[0.16em] text-t3 mb-8"
            >
              <span className="h-px w-8 bg-accent" aria-hidden />
              <span className="text-accent">002</span>
              <CornerDownRight className="w-3.5 h-3.5 text-t3" aria-hidden />
              <span>Recherche en cours</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.2, 0, 0, 1] }}
              className="font-display font-semibold text-t1 leading-[0.98] tracking-[-0.025em] mb-8"
              style={{ fontSize: "var(--text-display-l)" }}
            >
              Alternance UX/UI <span className="text-gradient-signature">· Septembre 2026</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.2, 0, 0, 1] }}
              className="text-t2 max-w-2xl mb-10"
              style={{ fontSize: "var(--text-body-l)", lineHeight: 1.6 }}
            >
              Master 2 Design & UX/UI à l&apos;ECV Bordeaux. Recherche d&apos;entreprise pour
              une alternance d&apos;un an. Ouvert à tous les contextes : studios, agences,
              scale-ups, ETI, in-house. Disponible aussi pour des stages courts d&apos;ici septembre.
            </motion.p>

            <ul className="border-t border-border-subtle">
              {DATA_ROWS.map((row, i) => {
                const Icon = row.Icon;
                return (
                  <motion.li
                    key={row.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: 0.25 + i * 0.05, ease: [0.2, 0, 0, 1] }}
                    className="flex items-start gap-4 border-b border-border-subtle py-4"
                  >
                    <span className="flex items-center gap-2 min-w-[140px] pt-0.5 font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                      <Icon className="w-3.5 h-3.5 text-accent" strokeWidth={1.5} aria-hidden />
                      {row.label}
                    </span>
                    <span className="text-t1 text-[14px] md:text-[15px] leading-snug">
                      {row.value}
                    </span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Right · contact CTAs */}
          <div className="lg:col-span-5">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
              className="block font-mono text-micro uppercase tracking-[0.18em] text-t3 mb-8"
            >
              → établir le contact
            </motion.span>

            <div className="space-y-3">
              <motion.a
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.2, 0, 0, 1] }}
                href="mailto:quentinsingama974@gmail.com?subject=Alternance%20UX%2FUI%20%C2%B7%20Septembre%202026"
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-md border border-border-subtle hover:border-accent hover:bg-bg-surface transition-colors duration-150"
              >
                <div className="flex items-center gap-4">
                  <Mail
                    className="w-4 h-4 text-t3 group-hover:text-accent transition-colors duration-150"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                  <div className="flex flex-col">
                    <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                      Email
                    </span>
                    <span className="font-display text-t1 text-[14px] truncate mt-0.5">
                      quentinsingama974@gmail.com
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-t3 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-150"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </motion.a>

              <motion.a
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: 0.18, ease: [0.2, 0, 0, 1] }}
                href="https://www.linkedin.com/in/quentin-singama-1b36b31b9/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 px-5 py-4 rounded-md border border-border-subtle hover:border-accent hover:bg-bg-surface transition-colors duration-150"
              >
                <div className="flex items-center gap-4">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 text-t3 group-hover:text-accent transition-colors duration-150"
                    aria-hidden
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                      LinkedIn
                    </span>
                    <span className="font-display text-t1 text-[14px] mt-0.5">
                      in/quentin-singama
                    </span>
                  </div>
                </div>
                <ArrowUpRight
                  className="w-4 h-4 text-t3 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-150"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </motion.a>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-6 font-mono text-mono-label uppercase tracking-[0.12em] text-t3"
            >
              <span className="text-accent">↳</span> Réponse sous 48h ouvrées
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
