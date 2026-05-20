"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Menu, X, FileText } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const LINKS = [
  { href: "/#projets", label: "Projets" },
  { href: "/about", label: "À propos" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 ${
        scrolled
          ? "bg-bg-base/85 backdrop-blur-md border-b border-border-subtle"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark left */}
        <Link
          href="/"
          className="font-display font-medium text-t1 hover:text-accent transition-colors duration-150 text-[15px] tracking-tight"
        >
          Quentin Singama
        </Link>

        {/* Center nav · desktop */}
        <nav
          aria-label="Navigation principale"
          className="hidden md:flex items-center gap-8"
        >
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-t2 hover:text-t1 transition-colors duration-150 text-[14px] font-display font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right · actions */}
        <div className="flex items-center gap-2">
          {/* CV download · desktop */}
          <a
            href="/cv-quentin-singama.pdf"
            download
            className="hidden md:inline-flex items-center gap-1.5 px-3 h-8 rounded-md text-t2 hover:text-t1 hover:bg-bg-elevated transition-colors duration-150 font-mono text-mono-label uppercase tracking-[0.12em]"
          >
            <FileText className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden />
            CV
          </a>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Burger · mobile only */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="md:hidden inline-flex items-center justify-center w-8 h-8 rounded-md text-t2 hover:text-t1 hover:bg-bg-elevated transition-colors duration-150"
          >
            {open ? (
              <X className="w-4 h-4" strokeWidth={1.5} aria-hidden />
            ) : (
              <Menu className="w-4 h-4" strokeWidth={1.5} aria-hidden />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="md:hidden fixed inset-0 top-16 bg-bg-base/95 backdrop-blur-md border-t border-border-subtle"
        >
          <nav
            aria-label="Navigation mobile"
            className="flex flex-col p-6 gap-1"
          >
            {LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-4 border-b border-border-subtle text-t1 hover:text-accent transition-colors duration-150"
              >
                <span className="font-mono text-mono-label text-t3 uppercase tracking-[0.14em] w-8">
                  0{i + 1}
                </span>
                <span className="font-display font-medium text-display-s">
                  {link.label}
                </span>
              </Link>
            ))}
            <a
              href="/cv-quentin-singama.pdf"
              download
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-4 border-b border-border-subtle text-t1 hover:text-accent transition-colors duration-150"
            >
              <span className="font-mono text-mono-label text-t3 uppercase tracking-[0.14em] w-8">
                03
              </span>
              <span className="font-display font-medium text-display-s flex items-center gap-2">
                CV{" "}
                <FileText
                  className="w-4 h-4"
                  strokeWidth={1.5}
                  aria-hidden
                />
              </span>
            </a>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
