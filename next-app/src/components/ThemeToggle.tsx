"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);

  const next = theme === "dark" ? "light" : "dark";
  const label = mounted
    ? `Basculer en mode ${next === "dark" ? "sombre" : "clair"}`
    : "Basculer le thème";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={label}
      className="inline-flex items-center justify-center w-8 h-8 rounded-md text-t2 hover:text-t1 hover:bg-bg-elevated transition-colors duration-150"
    >
      {mounted && theme === "dark" ? (
        <Sun className="w-4 h-4" strokeWidth={1.5} aria-hidden />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1.5} aria-hidden />
      )}
    </button>
  );
}
