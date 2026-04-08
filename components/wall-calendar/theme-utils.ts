import { ThemeMode } from "./types";

export const THEME_STORAGE_KEY = "wall-calendar-theme";

export const themeClassNames: Record<ThemeMode, string> = {
  depth:
    "bg-slate-900/65 border border-white/10 shadow-premium [transform-style:preserve-3d] supports-[backdrop-filter]:backdrop-blur-md",
  glass:
    "bg-white/10 border border-white/20 shadow-soft supports-[backdrop-filter]:backdrop-blur-2xl",
  neumorph:
    "bg-slate-800 border border-slate-700/80 shadow-[8px_8px_20px_#020617,-8px_-8px_20px_#1e293b]",
};

export const heroGradientByTheme: Record<ThemeMode, string> = {
  depth: "from-teal-300/25 via-blue-600/35 to-violet-700/30",
  glass: "from-emerald-100/30 via-cyan-200/20 to-indigo-200/25",
  neumorph: "from-slate-600/95 via-slate-700/95 to-slate-800/95",
};
