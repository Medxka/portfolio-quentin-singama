"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Hourglass } from "lucide-react";

type Project = {
  href: string;
  ref: string;
  title: string;
  pitch: string;
  meta: string;
  tags: string[];
  status?: "live" | "coming-soon";
  stat?: { value: string; unit: string };
};

const PROJECTS: Project[] = [
  {
    href: "/research",
    ref: "RES-2025-UX",
    title: "Découverte de concerts chez les étudiants",
    pitch:
      "7 interviews semi-directifs · analyse thématique · 4 insights majeurs. Étude UX qualitative pour comprendre comment les 18-25 ans trouvent et choisissent leurs concerts.",
    meta: "UX Research · Trio · Février 2025",
    tags: ["UX RESEARCH", "INTERVIEWS", "ANALYSE"],
    status: "live",
    stat: { value: "07", unit: "récits" },
  },
  {
    href: "/ink",
    ref: "INK-2024-HACK",
    title: "INK · Une marque née en 48h",
    pitch:
      "Hackathon créatif ECV · 11 personnes · 2ᵉ place sur 12 équipes. Direction artistique + UI sur un univers dystopique double identité (gouvernement KNI vs résistance INK).",
    meta: "Hackathon · Équipe de 11 · 48h · 2024",
    tags: ["BRANDING", "UI DESIGN", "HACKATHON"],
    status: "live",
    stat: { value: "02", unit: "/12" },
  },
  {
    href: "/lina",
    ref: "LINA-2025-UX",
    title: "LINA · Repenser la librairie indépendante",
    pitch:
      "Workshop ECV · 3 jours en duo. Refonte UX/UI desktop + système d'icônes pour améliorer la découverte produit en librairie.",
    meta: "Workshop · Duo · 3 jours",
    tags: ["UX/UI", "ICON SYSTEM"],
    status: "live",
  },
  {
    href: "/happy-job",
    ref: "HJ-2025-BRAND",
    title: "Happy Job · Campagnes recrutement",
    pitch:
      "Stage 2 mois en graphic design. Production visuelle pour réseau d'agences · campagnes saisonnières · gestion d'assets multi-supports.",
    meta: "Stage · Solo en équipe pro · 2 mois",
    tags: ["GRAPHIC DESIGN", "PRINT", "BRANDING"],
    status: "live",
  },
  {
    href: "#",
    ref: "SP-2026-SAAS",
    title: "Side project · App de gestion perso",
    pitch:
      "Un outil que je voulais utiliser moi-même. Gestion productivité pensée pour les gens fatigués des templates Notion à 47 bases liées. Conception + build en parallèle.",
    meta: "Side project · Solo · 2026",
    tags: ["PRODUCT", "SAAS", "MOBILE"],
    status: "coming-soon",
  },
];

export function SelectedWork() {
  return (
    <section className="border-b border-border-subtle bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.ref}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.2, 0, 0, 1] }}
            >
              {p.status === "coming-soon" ? (
                <ComingSoonCard project={p} />
              ) : (
                <ProjectCard project={p} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={project.href}
      className="group block h-full border border-border-subtle rounded-md bg-bg-surface hover:border-accent transition-colors duration-200 p-6 md:p-8"
    >
      <div className="flex items-start justify-between gap-4 mb-6">
        <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
          // REF · {project.ref}
        </span>
        {project.stat && (
          <div className="flex items-baseline gap-1 font-mono">
            <span
              className="text-t1 tabular-nums tracking-[-0.04em] font-semibold"
              style={{ fontSize: "var(--text-display-s)", lineHeight: 1 }}
            >
              {project.stat.value}
            </span>
            <span className="text-mono-label text-t3 uppercase tracking-[0.14em]">
              {project.stat.unit}
            </span>
          </div>
        )}
      </div>

      <h3
        className="font-display font-semibold text-t1 leading-[1.05] tracking-[-0.02em] mb-4 group-hover:text-accent transition-colors duration-200"
        style={{ fontSize: "var(--text-display-s)" }}
      >
        {project.title}
      </h3>

      <p className="text-t2 text-[14px] leading-relaxed mb-6">{project.pitch}</p>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-sm border border-border-subtle font-mono text-mono-label uppercase tracking-[0.14em] text-t3"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border-subtle">
        <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
          {project.meta}
        </span>
        <span className="inline-flex items-center gap-1.5 text-t1 group-hover:text-accent transition-colors duration-150 font-display font-medium text-[13px]">
          Ouvrir
          <ArrowUpRight
            className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-150"
            strokeWidth={1.5}
            aria-hidden
          />
        </span>
      </div>
    </Link>
  );
}

function ComingSoonCard({ project }: { project: Project }) {
  return (
    <div
      className="block h-full border border-dashed border-border-strong rounded-md bg-bg-surface/50 p-6 md:p-8 relative overflow-hidden"
      aria-label="Side project en cours de construction"
    >
      {/* Subtle grid bg */}
      <div
        className="absolute inset-0 opacity-[0.3] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(var(--border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--border-subtle) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden
      />

      <div className="relative flex items-start justify-between gap-4 mb-6">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 border border-warn/40 rounded-sm font-mono text-mono-label uppercase tracking-[0.18em] text-warn bg-warn/5">
          <Hourglass className="w-3 h-3" strokeWidth={1.5} aria-hidden />
          Coming soon
        </span>
        <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
          // {project.ref}
        </span>
      </div>

      <h3
        className="relative font-display font-semibold text-t2 leading-[1.05] tracking-[-0.02em] mb-4"
        style={{ fontSize: "var(--text-display-s)" }}
      >
        {project.title}
      </h3>

      <p className="relative text-t3 text-[14px] leading-relaxed mb-6">
        {project.pitch}
      </p>

      <div className="relative flex flex-wrap items-center gap-2 mb-6">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center px-2 py-0.5 rounded-sm border border-border-subtle/60 font-mono text-mono-label uppercase tracking-[0.14em] text-t3/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="relative flex items-center justify-between pt-4 border-t border-border-subtle">
        <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
          {project.meta}
        </span>
        <a
          href="mailto:quentinsingama974@gmail.com?subject=Side%20project%20%C2%B7%20me%20notifier"
          className="inline-flex items-center gap-1.5 text-t2 hover:text-accent transition-colors duration-150 font-display font-medium text-[13px]"
        >
          Me notifier
          <ArrowUpRight
            className="w-3.5 h-3.5 transition-transform duration-150 hover:-translate-y-0.5 hover:translate-x-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        </a>
      </div>
    </div>
  );
}
