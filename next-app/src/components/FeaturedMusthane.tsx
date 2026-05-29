"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const TAGS = ["Arbo", "Nav design", "Mobile", "Audit UX"] as const;

const META = [
  { label: "Scope", value: "100+ produits" },
  { label: "Setup", value: "Solo · 2 jours" },
  { label: "Rôle", value: "UX · IA" },
] as const;

export function FeaturedMusthane() {
  const reduce = useReducedMotion();

  const fade = (delay = 0) =>
    reduce
      ? { initial: false, animate: { opacity: 1, y: 0 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10%" },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      id="projets"
      aria-labelledby="featured-musthane-title"
      className="border-t border-border-subtle bg-bg-base text-t1"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-16 py-16 md:py-20">
        {/* Eyebrow */}
        <motion.div
          {...fade(0)}
          className="flex items-center justify-between mb-10 md:mb-12"
        >
          <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3">
            Featured · Case 01
          </span>
          <span className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3 hidden md:inline">
            Musthane · 2026
          </span>
        </motion.div>

        {/* HÉROS TYPO · la décision avant le projet */}
        <motion.h2
          id="featured-musthane-title"
          {...fade(0.05)}
          className="font-display font-semibold text-t1 leading-[0.88] tracking-[-0.04em] max-md:leading-[0.95] max-md:tracking-[-0.02em]"
          style={{ fontSize: "var(--text-display-l)" }}
        >
          De{" "}
          <span
            className="font-mono text-t3 align-middle"
            style={{ fontSize: "var(--text-display-m)" }}
          >
            4
          </span>{" "}
          axes à <span className="text-accent">1 logique</span>.
        </motion.h2>

        {/* Sub · 1 ligne dense */}
        <motion.p
          {...fade(0.1)}
          className="mt-6 md:mt-8 max-w-[52ch] text-t2 leading-[1.5]"
          style={{ fontSize: "var(--text-body)" }}
        >
          Refonte de l&apos;architecture de navigation Musthane · remapper plus
          de cent produits autour d&apos;un parcours unique.
        </motion.p>

        {/* Mockup contained · aspect compact 21/9, cropé center pour tenir en 1 scroll */}
        <motion.figure
          {...fade(0.15)}
          className="mt-10 md:mt-12 relative overflow-hidden rounded-md bg-bg-surface ring-1 ring-inset ring-border-subtle"
        >
          <div className="relative aspect-[21/9] w-full">
            <Image
              src="/musthane-mac-mockup.webp"
              alt="Refonte de la navigation Musthane sur écran MacBook · nouvelle architecture à un seul axe."
              fill
              priority
              sizes="(min-width: 1280px) 1200px, 100vw"
              className="object-cover object-center"
            />
          </div>
          <figcaption className="sr-only">
            Mockup de la nouvelle navigation Musthane sur écran MacBook.
          </figcaption>
        </motion.figure>

        {/* Footer row · méta + tags + CTA tout aligné */}
        <motion.div
          {...fade(0.2)}
          className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-x-12 items-end border-t border-border-subtle pt-8"
        >
          {/* Méta 3-col */}
          <dl className="lg:col-span-6 grid grid-cols-3 gap-6 md:gap-8">
            {META.map((item) => (
              <div key={item.label}>
                <dt className="font-mono text-mono-label uppercase tracking-[0.18em] text-t3 mb-1.5">
                  {item.label}
                </dt>
                <dd className="font-display text-t1 leading-tight tracking-[-0.01em] text-[15px] md:text-[16px]">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Tags */}
          <ul
            aria-label="Disciplines mobilisées"
            className="lg:col-span-3 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-mono-label uppercase tracking-[0.16em] text-t2"
          >
            {TAGS.map((tag) => (
              <li key={tag}>
                <span aria-hidden className="text-t3 mr-2">·</span>
                {tag}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="lg:col-span-3 flex lg:justify-end">
            <Link
              href="/musthane"
              aria-label="Lire l'étude de cas Musthane"
              className="group inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-bg-base rounded-sm min-h-[44px]"
            >
              <span
                className="font-display font-semibold text-t1 leading-[1.0] tracking-[-0.02em] underline underline-offset-[8px] decoration-1 decoration-border-strong group-hover:text-accent group-hover:decoration-accent transition-colors duration-200"
                style={{ fontSize: "var(--text-display-xs)" }}
              >
                Ouvrir l&apos;étude
              </span>
              <ArrowUpRight
                className="w-5 h-5 shrink-0 text-t2 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200"
                strokeWidth={1.5}
                aria-hidden
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
