"use client";

import { Mail, ArrowUpRight, ShieldCheck } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

// Brand SVGs inline (Lucide n'inclut pas les logos marques)
function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GitHubIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

const CONTACTS: { label: string; href: string; value: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }[] = [
  {
    label: "Email",
    href: "mailto:quentinsingama974@gmail.com?subject=Alternance%20UX%2FUI%20%C2%B7%20Septembre%202026",
    value: "quentinsingama974@gmail.com",
    Icon: Mail as unknown as ComponentType<SVGProps<SVGSVGElement>>,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/quentin-singama-1b36b31b9/",
    value: "in/quentin-singama",
    Icon: LinkedInIcon,
  },
  {
    label: "GitHub",
    href: "https://github.com/Medxka",
    value: "@Medxka",
    Icon: GitHubIcon,
  },
];

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border-subtle bg-bg-base">
      {/* Top hairline */}
      <div className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 h-10 flex items-center justify-between font-mono text-micro uppercase tracking-[0.14em] text-t3">
          <span className="flex items-center gap-2">
            <span className="text-accent">//</span>
            <span>contact</span>
            <span className="text-border-strong">/</span>
            <span>établir le signal</span>
          </span>
          <span className="hidden sm:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-ok" />
            <span>réponse sous 48h ouvrées</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-12">
          {/* Left · CTA */}
          <div className="lg:col-span-7 lg:border-r lg:border-border-subtle lg:pr-12">
            <span className="font-mono text-mono-label uppercase tracking-[0.16em] text-accent mb-6 block">
              // end_of_feed
            </span>
            <h2
              className="font-display font-semibold text-t1 leading-[0.95] tracking-[-0.025em]"
              style={{ fontSize: "var(--text-display-l)" }}
            >
              Convaincu ?<br />
              <span className="text-t2">Parlons-en.</span>
            </h2>
            <p
              className="mt-8 max-w-xl text-t2"
              style={{ fontSize: "var(--text-body-l)", lineHeight: 1.6 }}
            >
              En recherche d&apos;alternance UX/UI pour septembre 2026.
              Disponible immédiatement pour des stages courts d&apos;ici là.
            </p>
          </div>

          {/* Right · contacts */}
          <div className="lg:col-span-5">
            <span className="font-mono text-micro uppercase tracking-[0.18em] text-t3 mb-8 block">
              → channels
            </span>
            <ul className="border-t border-border-subtle">
              {CONTACTS.map((c) => {
                const Icon = c.Icon;
                return (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="group flex items-center justify-between border-b border-border-subtle py-5 hover:bg-bg-surface/40 transition-colors duration-150"
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          className="w-4 h-4 text-t3 group-hover:text-accent transition-colors duration-150"
                          strokeWidth={1.5}
                          aria-hidden
                        />
                        <div className="flex flex-col">
                          <span className="font-mono text-mono-label uppercase tracking-[0.14em] text-t3">
                            {c.label}
                          </span>
                          <span className="font-display text-t1 text-[15px] mt-0.5">
                            {c.value}
                          </span>
                        </div>
                      </div>
                      <ArrowUpRight
                        className="w-4 h-4 text-t3 group-hover:text-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-150"
                        strokeWidth={1.5}
                        aria-hidden
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom hairline · signature */}
      <div className="border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-micro uppercase tracking-[0.14em] text-t3">
          <div className="flex items-center gap-3">
            <span className="text-accent">QS</span>
            <span className="text-border-strong">/</span>
            <span>2026</span>
            <span className="text-border-strong">/</span>
            <span>Bordeaux, FR</span>
          </div>
          <p className="text-t3 normal-case tracking-normal text-[12px]">
            Conçu, codé, et probablement réécrit trois fois.
          </p>
          <a
            href="/accessibilite"
            className="inline-flex items-center gap-1.5 text-t3 hover:text-t1 transition-colors duration-150"
          >
            <ShieldCheck className="w-3 h-3" strokeWidth={1.5} aria-hidden />
            WCAG 2.2 AA
          </a>
        </div>
      </div>
    </footer>
  );
}
