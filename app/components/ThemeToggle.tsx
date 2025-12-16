"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    document.documentElement.setAttribute("data-theme", initialTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  const isDark = theme === "dark";
  if (!mounted) {
    return (
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-black/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm backdrop-blur-sm transition hover:border-slate-300/70 hover:bg-black/10"
        aria-label="Carregando tema"
        suppressHydrationWarning
      >
        <span
          className="flex h-5 w-5 items-center justify-center rounded-full bg-black/40"
          aria-hidden="true"
        >
          ☀️
        </span>
        <span className="hidden sm:inline" suppressHydrationWarning>
          Claro
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full border border-slate-500/40 bg-black/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm backdrop-blur-sm transition hover:border-slate-300/70 hover:bg-black/10"
      aria-label={isDark ? "Ativar modo claro" : "Ativar modo escuro"}
      suppressHydrationWarning
    >
      <span
        className="flex h-5 w-5 items-center justify-center rounded-full bg-black/40"
        aria-hidden="true"
        suppressHydrationWarning
      >
        {isDark ? "🌙" : "☀️"}
      </span>
      <span className="hidden sm:inline" suppressHydrationWarning>
        {isDark ? "Escuro" : "Claro"}
      </span>
    </button>
  );
}

export default ThemeToggle;
