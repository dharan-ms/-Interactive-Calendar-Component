"use client";

import { motion } from "framer-motion";
import { ThemeMode } from "./types";

const options: { key: ThemeMode; label: string }[] = [
  { key: "depth", label: "3D Depth" },
  { key: "glass", label: "Glass" },
  { key: "neumorph", label: "Neumorph" },
];

export function ThemeSwitcher({
  value,
  onChange,
}: {
  value: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}) {
  return (
    <div className="relative inline-flex rounded-2xl bg-white/10 p-1 ring-1 ring-white/20">
      {options.map((option) => {
        const active = value === option.key;
        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className="relative z-10 px-3 py-2 text-xs font-medium text-slate-100 sm:text-sm"
          >
            {active && (
              <motion.span
                layoutId="theme-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500"
              />
            )}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
