"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  Quote,
  BookOpen,
  Feather,
  Hourglass,
  Bookmark,
  Compass,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Selected Work — Issue N°01
   Treated as a small print magazine: masthead, hero feature,
   alternating editorial spreads, and a "next issue" teaser.
   ───────────────────────────────────────────────────────────── */

type Project = {
  href: string;
  ref: string;
  folio: string;       // "p.02" — magazine page number
  rubric: string;      // "Feature", "Field notes"…
  kicker: string;      // small line above title
  title: string;
  lede: string;        // long opening paragraph (with drop cap)
  meta: string;
  byline: string;      // role + context
};

const HERO: Project & { pull: string; pullAttr: string; stat: { value: string; unit: string } } = {
  href: "/research",
  ref: "RES-2025-UX",
  folio: "p.02",
  rubric: "Cover story · UX Research",
  kicker: "Field study — Concerts & 18-25 ans",
  title: "Comment une génération entière trouve ses concerts en grattant Instagram à 1h du matin.",
  lede:
    "Sept entretiens semi-directifs, une grille d'analyse thématique, et une conviction qui s'effrite : non, les étudiants ne « cherchent » pas leurs concerts — ils tombent dessus. Entre le bouche-à-oreille tardif, les stories partagées et la peur de rater « le » truc, on a documenté une découverte qui ressemble moins à une recherche qu'à une dérive. Quatre insights majeurs en sont sortis, dont un qui retourne complètement le brief de départ.",
  pull: "« Je sais qu'il y a un concert quelque part. Je sais pas où. Je sais pas quand. Mais je sais. »",
  pullAttr: "Léa, 21 ans · entretien n°04",
  meta: "Trio · Février 2025 · ECV",
  byline: "Recherche, analyse & restitution — Quentin Singama, en trio.",
  stat: { value: "07", unit: "récits" },
};

const FEATURES: Project[] = [
  {
    href: "/ink",
    ref: "INK-2024-HACK",
    folio: "p.06",
    rubric: "Dispatch · Hackathon",
    kicker: "48 heures, deux camps, une marque",
    title: "INK — naître en 48h et finir deuxième sur douze.",
    lede:
      "Hackathon ECV, onze personnes, deux nuits. On invente un monde dystopique à double identité : le gouvernement KNI d'un côté, la résistance INK de l'autre. Direction artistique partagée, système UI livré, pitch tenu. La 2ᵉ place est venue avec un soulagement plus grand que la fierté.",
    meta: "Équipe de 11 · 48h · 2024",
    byline: "Direction artistique & UI — collectif ECV.",
  },
  {
    href: "/lina",
    ref: "LINA-2025-UX",
    folio: "p.10",
    rubric: "Workshop · UX/UI",
    kicker: "Trois jours dans une librairie",
    title: "LINA — refaire entrer la flânerie dans l'écran d'une librairie indépendante.",
    lede:
      "Workshop ECV, en duo, trois jours. Une refonte desktop pour la librairie LINA et, glissé dedans, un petit système d'icônes pensé pour ne pas crier. La question n'était pas « comment vendre plus » mais « comment faire qu'on s'attarde » — la nuance change tout.",
    meta: "Duo · 3 jours · 2025",
    byline: "UX/UI & système d'icônes — en duo.",
  },
  {
    href: "/happy-job",
    ref: "HJ-2025-BRAND",
    folio: "p.14",
    rubric: "Field notes · Stage",
    kicker: "Deux mois chez Happy Job",
    title: "Happy Job — graphic design en agence, deadlines réelles, fichiers vrais.",
    lede:
      "Deux mois de stage en graphic design pour un réseau d'agences de recrutement. Campagnes saisonnières, déclinaisons multi-supports, gestion d'assets. L'apprentissage discret : un fichier bien rangé vaut souvent un brief en moins.",
    meta: "Stage · Solo en équipe pro · 2 mois",
    byline: "Production visuelle & déclinaisons — équipe interne.",
  },
];

const TEASER = {
  href: "#",
  ref: "SP-2026-SAAS",
  folio: "p.18",
  rubric: "À paraître · Prochain numéro",
  kicker: "Side project · 2026",
  title: "Une app de gestion perso, pour les gens fatigués des templates Notion à 47 bases liées.",
  lede:
    "Un outil que je voulais utiliser moi-même. Productivité, mais doucement. Conception et build en parallèle, sortie quand c'est prêt — pas avant.",
  meta: "Side project · Solo · 2026",
};

export function SelectedWork() {
  const reduced = useReducedMotion();
  const fade = (delay = 0) =>
    reduced
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-80px" },
          transition: { duration: 0.6, delay, ease: [0.2, 0, 0, 1] as const },
        };

  return (
    <section className="border-b border-border-subtle bg-bg-base">
      <div className="mx-auto max-w-[1180px] px-6 pt-10 pb-24 lg:pt-14 lg:pb-32">
        {/* ── Masthead ───────────────────────────────────────── */}
        <motion.header {...fade(0)} className="border-y border-border-strong py-5 mb-12 md:mb-16">
          <div className="flex items-baseline justify-between gap-6 font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
            <span className="inline-flex items-center gap-2">
              <BookOpen className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
              Selected Work · Issue N°01
            </span>
            <span className="hidden sm:inline">Volume MMXXVI</span>
            <span>Quatre projets, un teaser</span>
          </div>
        </motion.header>

        {/* ── COVER STORY · hero feature ─────────────────────── */}
        <motion.article {...fade(0.05)} className="mb-20 md:mb-28">
          {/* Folio strip */}
          <div className="flex items-baseline justify-between border-b border-border-subtle pb-3 mb-8 font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
            <span className="inline-flex items-center gap-2">
              <Feather className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
              {HERO.rubric}
            </span>
            <span>{HERO.folio} · ref. {HERO.ref}</span>
          </div>

          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-accent mb-5">
            {HERO.kicker}
          </p>

          <h2
            className="font-display font-semibold text-t1 italic tracking-[-0.025em] leading-[0.98] mb-10 max-w-[18ch]"
            style={{ fontSize: "var(--text-display-l)" }}
          >
            {HERO.title}
          </h2>

          {/* Editorial 3-col split: stat · lede · pull-quote */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10 md:gap-y-0">
            {/* Stat block — left column */}
            <aside className="md:col-span-3 md:border-r md:border-border-subtle md:pr-6">
              <div className="flex md:block items-baseline gap-3">
                <span
                  className="font-display font-semibold text-t1 tabular-nums tracking-[-0.05em] leading-none"
                  style={{ fontSize: "var(--text-display-m)" }}
                >
                  {HERO.stat.value}
                </span>
                <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3 md:block md:mt-3">
                  {HERO.stat.unit} récoltés
                </span>
              </div>
              <p className="hidden md:block mt-6 font-mono text-micro uppercase tracking-[0.18em] text-t3 leading-relaxed">
                {HERO.byline}
              </p>
            </aside>

            {/* Lede — center column with drop cap */}
            <div className="md:col-span-5 md:border-r md:border-border-subtle md:pr-8">
              <p className="text-t2 text-body-l leading-[1.7] [&::first-letter]:font-display [&::first-letter]:font-semibold [&::first-letter]:text-t1 [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:mt-1 [&::first-letter]:text-[4.5rem] [&::first-letter]:leading-[0.85]">
                {HERO.lede}
              </p>
              <div className="mt-8 flex items-center justify-between border-t border-border-subtle pt-4">
                <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
                  {HERO.meta}
                </span>
                <Link
                  href={HERO.href}
                  className="group inline-flex items-center gap-1.5 font-display font-medium text-[13px] text-t1 hover:text-accent transition-colors duration-200"
                >
                  Lire l'étude
                  <ArrowUpRight
                    className="w-3.5 h-3.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform duration-200"
                    strokeWidth={1.5}
                    aria-hidden
                  />
                </Link>
              </div>
            </div>

            {/* Pull-quote — right column */}
            <figure className="md:col-span-4">
              <Quote className="w-6 h-6 text-accent mb-4" strokeWidth={1.5} aria-hidden />
              <blockquote
                className="font-display italic text-t1 tracking-[-0.015em] leading-[1.15]"
                style={{ fontSize: "var(--text-display-s)" }}
              >
                {HERO.pull}
              </blockquote>
              <figcaption className="mt-5 font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
                — {HERO.pullAttr}
              </figcaption>
            </figure>
          </div>
        </motion.article>

        {/* ── Section break ──────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-16 md:mb-20" aria-hidden>
          <span className="h-px flex-1 bg-border-strong" />
          <span className="font-mono text-mono-label uppercase tracking-[0.28em] text-t3">
            §  Dans ce numéro
          </span>
          <span className="h-px flex-1 bg-border-strong" />
        </div>

        {/* ── Editorial spreads ─────────────────────────────── */}
        <div className="space-y-16 md:space-y-24">
          {FEATURES.map((p, i) => (
            <EditorialSpread key={p.ref} project={p} index={i} fade={fade} />
          ))}
        </div>

        {/* ── Next issue teaser ─────────────────────────────── */}
        <motion.div {...fade(0.05)} className="mt-20 md:mt-28 border-t border-border-strong pt-10">
          <NextIssue />
        </motion.div>

        {/* ── Colophon ──────────────────────────────────────── */}
        <div className="mt-16 md:mt-20 pt-6 border-t border-border-subtle flex flex-wrap items-baseline justify-between gap-3 font-mono text-micro uppercase tracking-[0.22em] text-t3">
          <span className="inline-flex items-center gap-2">
            <Bookmark className="w-3 h-3" strokeWidth={1.5} aria-hidden />
            Fin du numéro
          </span>
          <span>Composé en Söhne & IBM Plex Mono</span>
          <span>© Quentin Singama · MMXXVI</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   Editorial spread — alternates rhythm: odd = text-left,
   even = text-right; lede always gets a drop-cap.
   ───────────────────────────────────────────────────────────── */
function EditorialSpread({
  project,
  index,
  fade,
}: {
  project: Project;
  index: number;
  fade: (delay?: number) => Record<string, unknown>;
}) {
  const flipped = index % 2 === 1;

  return (
    <motion.article {...fade(0.05 * index)} className="group">
      {/* Folio strip */}
      <div className="flex items-baseline justify-between border-b border-border-subtle pb-3 mb-6 font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
        <span>{project.rubric}</span>
        <span>{project.folio} · ref. {project.ref}</span>
      </div>

      <div
        className={`grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6 ${
          flipped ? "md:[direction:rtl]" : ""
        }`}
      >
        {/* Title column */}
        <header className="md:col-span-5 md:[direction:ltr]">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-accent-2 mb-4">
            {project.kicker}
          </p>
          <h3
            className="font-display font-semibold text-t1 tracking-[-0.022em] leading-[1.02] mb-6"
            style={{ fontSize: "var(--text-display-m)" }}
          >
            {project.title}
          </h3>
          <p className="font-mono text-micro uppercase tracking-[0.18em] text-t3 leading-relaxed max-w-[36ch]">
            {project.byline}
          </p>
        </header>

        {/* Body column with drop-cap */}
        <div className="md:col-span-7 md:[direction:ltr] md:border-l md:border-border-subtle md:pl-10">
          <p className="text-t2 text-body-l leading-[1.75] columns-1 lg:columns-2 lg:gap-8 [&::first-letter]:font-display [&::first-letter]:font-semibold [&::first-letter]:text-t1 [&::first-letter]:float-left [&::first-letter]:mr-2 [&::first-letter]:mt-1 [&::first-letter]:text-[3.5rem] [&::first-letter]:leading-[0.85]">
            {project.lede}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border-subtle pt-4">
            <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
              {project.meta}
            </span>
            <Link
              href={project.href}
              className="group/link inline-flex items-center gap-1.5 font-display font-medium text-[13px] text-t1 hover:text-accent transition-colors duration-200"
            >
              Lire l'article
              <ArrowUpRight
                className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ─────────────────────────────────────────────────────────────
   Next issue teaser — flagged "À paraître", no card.
   ───────────────────────────────────────────────────────────── */
function NextIssue() {
  return (
    <article aria-label="Prochain numéro — side project">
      <div className="flex items-baseline justify-between border-b border-border-subtle pb-3 mb-8 font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
        <span className="inline-flex items-center gap-2 text-warn">
          <Compass className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
          {TEASER.rubric}
        </span>
        <span>{TEASER.folio} · ref. {TEASER.ref}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 gap-y-6">
        <header className="md:col-span-5">
          <p className="font-mono text-mono-label uppercase tracking-[0.22em] text-warn mb-4">
            <Hourglass className="inline w-3 h-3 mr-1.5 -translate-y-px" strokeWidth={1.5} aria-hidden />
            {TEASER.kicker}
          </p>
          <h3
            className="font-display font-semibold italic text-t2 tracking-[-0.022em] leading-[1.05]"
            style={{ fontSize: "var(--text-display-s)" }}
          >
            {TEASER.title}
          </h3>
        </header>

        <div className="md:col-span-7 md:border-l md:border-border-subtle md:pl-10">
          <p className="text-t3 text-body-l leading-[1.7] italic">
            {TEASER.lede}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-border-subtle pt-4">
            <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
              {TEASER.meta}
            </span>
            <a
              href="mailto:quentinsingama974@gmail.com?subject=Prochain%20num%C3%A9ro%20%C2%B7%20me%20notifier"
              className="group/link inline-flex items-center gap-1.5 font-display font-medium text-[13px] text-t2 hover:text-accent transition-colors duration-200"
            >
              Me prévenir à la sortie
              <ArrowUpRight
                className="w-3.5 h-3.5 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 transition-transform duration-200"
                strokeWidth={1.5}
                aria-hidden
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
