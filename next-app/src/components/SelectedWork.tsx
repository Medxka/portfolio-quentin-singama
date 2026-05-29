"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Hourglass } from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Selected Work — portfolio designer UX/UI grid
   Chaque projet = preview visuel dominant + footer ligne unique.
   Au hover (desktop) : overlay révèle role / context / tags.
   ───────────────────────────────────────────────────────────── */

type Preview =
  | { kind: "color"; bg: string; fg: string; label: string; sub: string }
  | { kind: "stat"; bg: string; value: string; label: string }
  | { kind: "stack"; bg: string; layers: string[] }
  | { kind: "grid"; bg: string; cells: number };

type Project = {
  num: string;
  href: string;
  title: string;
  category: string;
  role: string;
  context: string;
  tags: string[];
  preview: Preview;
  status?: "coming-soon";
};

const PROJECTS: Project[] = [
  {
    num: "01",
    href: "/research",
    title: "Découverte de concerts chez les étudiants",
    category: "UX Research",
    role: "UX Researcher · trio",
    context: "7 interviews · 4 insights majeurs · février 2025",
    tags: ["Research", "Qualitatif", "Personas"],
    preview: {
      kind: "stat",
      bg: "linear-gradient(135deg, #1a1d23 0%, #0a0b0d 100%)",
      value: "07",
      label: "interviews semi-directives",
    },
  },
  {
    num: "02",
    href: "/ink",
    title: "INK · Une marque née en 48h",
    category: "Branding · UI",
    role: "Direction artistique · 11 personnes",
    context: "Hackathon ECV · 2ᵉ place sur 12 équipes · 2024",
    tags: ["Branding", "UI", "Hackathon"],
    preview: {
      kind: "color",
      bg: "#0A0A0A",
      fg: "#AB0600",
      label: "INK",
      sub: "ILLICIT · NETWORK · KEEPERS",
    },
  },
  {
    num: "03",
    href: "/lina",
    title: "LINA · Librairie indépendante",
    category: "UX/UI · Icon System",
    role: "UX/UI Designer · duo",
    context: "Workshop ECV · 3 jours · refonte desktop + icônes",
    tags: ["UX/UI", "Icônes"],
    preview: {
      kind: "stack",
      bg: "linear-gradient(180deg, #111317 0%, #0a0b0d 100%)",
      layers: ["LIVRE", "PAGE", "CHAPITRE", "EXTRAIT"],
    },
  },
  {
    num: "04",
    href: "/happy-job",
    title: "Happy Job · Campagnes recrutement",
    category: "Graphic Design",
    role: "Graphic Designer · stage 2 mois",
    context: "Campagnes saisonnières · réseau d'agences · 2025",
    tags: ["Branding", "Print", "Multi-support"],
    preview: {
      kind: "grid",
      bg: "#0A0B0D",
      cells: 6,
    },
  },
  {
    num: "05",
    href: "#notify",
    title: "Side project SaaS",
    category: "Product Design · Build",
    role: "Solo · design + code",
    context: "App de gestion perso · sortie 2026",
    tags: ["Product", "SaaS", "Solo"],
    status: "coming-soon",
    preview: {
      kind: "color",
      bg: "#0D0D14",
      fg: "#A78BFA",
      label: "—",
      sub: "BUILD IN PROGRESS",
    },
  },
];

export function SelectedWork() {
  return (
    <section className="border-b border-border-subtle bg-bg-base">
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-20 lg:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {PROJECTS.map((p, i) => (
            <ProjectTile key={p.num} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectTile({ project, index }: { project: Project; index: number }) {
  const reduce = useReducedMotion();
  const isSoon = project.status === "coming-soon";

  const motionProps = reduce
    ? { initial: false, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-60px" },
        transition: {
          duration: 0.5,
          delay: index * 0.06,
          ease: [0.2, 0, 0, 1] as const,
        },
      };

  const Inner = (
    <motion.div
      {...motionProps}
      className={`group relative flex flex-col h-full overflow-hidden rounded-md border ${
        isSoon
          ? "border-dashed border-border-strong"
          : "border-border-subtle hover:border-accent"
      } transition-colors duration-200`}
    >
      {/* Preview block (dominant) */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <PreviewBlock preview={project.preview} />

        {/* Hover overlay reveal */}
        {!isSoon && (
          <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-t from-bg-base via-bg-base/85 to-transparent">
            <span className="font-mono text-mono-label uppercase tracking-[0.16em] text-accent mb-3">
              {project.category}
            </span>
            <p className="text-t1 text-[14px] leading-relaxed mb-4 max-w-md">
              <span className="block text-t2">{project.role}</span>
              <span className="block text-t3 mt-1">{project.context}</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center px-2 py-0.5 rounded-sm border border-border-subtle font-mono text-mono-label uppercase tracking-[0.14em] text-t2 bg-bg-base/60 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Coming-soon overlay always visible */}
        {isSoon && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-warn/40 rounded-sm font-mono text-mono-label uppercase tracking-[0.18em] text-warn bg-bg-base/80 backdrop-blur-sm">
              <Hourglass className="w-3 h-3" strokeWidth={1.5} aria-hidden />
              Coming soon · 2026
            </span>
          </div>
        )}
      </div>

      {/* Footer · single line */}
      <div className="flex items-center justify-between gap-4 px-6 md:px-7 py-5 border-t border-border-subtle">
        <div className="flex items-baseline gap-4 min-w-0">
          <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3 shrink-0">
            {project.num}
          </span>
          <h3 className="font-display font-medium text-t1 text-[15px] md:text-[16px] tracking-[-0.01em] truncate">
            {project.title}
          </h3>
        </div>
        <ArrowUpRight
          className={`w-4 h-4 shrink-0 ${
            isSoon ? "text-t3" : "text-t2 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          } transition-all duration-150`}
          strokeWidth={1.5}
          aria-hidden
        />
      </div>
    </motion.div>
  );

  if (isSoon) {
    return (
      <a
        href="mailto:quentinsingama974@gmail.com?subject=Side%20project%20%C2%B7%20me%20notifier"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md"
      >
        {Inner}
      </a>
    );
  }

  return (
    <Link
      href={project.href}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded-md"
    >
      {Inner}
    </Link>
  );
}

/* ─────────────────────────────────────────────────────────────
   Preview blocks — chaque projet a son traitement signature
   ───────────────────────────────────────────────────────────── */
function PreviewBlock({ preview }: { preview: Preview }) {
  if (preview.kind === "stat") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center"
        style={{ background: preview.bg }}
      >
        <span
          className="font-display font-semibold text-t1 tabular-nums tracking-[-0.05em] leading-none"
          style={{ fontSize: "clamp(96px, 18vw, 200px)" }}
        >
          {preview.value}
        </span>
        <span className="mt-4 font-mono text-mono-label uppercase tracking-[0.2em] text-t3">
          {preview.label}
        </span>
      </div>
    );
  }

  if (preview.kind === "color") {
    return (
      <div
        className="relative w-full h-full flex flex-col items-center justify-center"
        style={{ background: preview.bg }}
      >
        <div
          className="absolute inset-0 opacity-[0.4] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 30%, ${preview.fg}30, transparent 50%), radial-gradient(circle at 80% 70%, ${preview.fg}20, transparent 60%)`,
          }}
        />
        <span
          className="relative font-display font-semibold tracking-[-0.04em] leading-none"
          style={{ fontSize: "clamp(72px, 14vw, 160px)", color: preview.fg }}
        >
          {preview.label}
        </span>
        <span
          className="relative mt-6 font-mono text-mono-label uppercase tracking-[0.25em]"
          style={{ color: `${preview.fg}99` }}
        >
          {preview.sub}
        </span>
      </div>
    );
  }

  if (preview.kind === "stack") {
    return (
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ background: preview.bg }}
      >
        <div className="flex flex-col items-stretch gap-2 w-[60%]">
          {preview.layers.map((label, i) => (
            <div
              key={label}
              className="border-l-2 border-accent/60 pl-4 py-2 font-mono text-mono-label uppercase tracking-[0.16em] text-t2"
              style={{
                opacity: 1 - i * 0.18,
                marginLeft: `${i * 12}px`,
              }}
            >
              <span className="text-accent mr-3">{String(i + 1).padStart(2, "0")}</span>
              {label}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (preview.kind === "grid") {
    return (
      <div
        className="w-full h-full p-6 md:p-8 grid grid-cols-3 grid-rows-2 gap-2"
        style={{ background: preview.bg }}
      >
        {Array.from({ length: preview.cells }).map((_, i) => (
          <div
            key={i}
            className="border border-border-subtle/60 rounded-sm flex items-center justify-center"
            style={{
              background: i % 2 === 0 ? "var(--bg-elevated)" : "var(--bg-surface)",
            }}
          >
            <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3 opacity-60">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return null;
}
