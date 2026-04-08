"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { MouseEvent } from "react";
import { ThemeMode } from "./types";
import { heroGradientByTheme, themeClassNames } from "./theme-utils";

export function HeroImagePanel({ theme }: { theme: ThemeMode }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(y, { stiffness: 180, damping: 20 });
  const ry = useSpring(x, { stiffness: 180, damping: 20 });

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    x.set(px * 10);
    y.set(py * -10);
  };

  return (
    <motion.div
      onMouseMove={theme === "depth" ? onMove : undefined}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      className={`noise relative overflow-hidden rounded-3xl p-6 ${themeClassNames[theme]}`}
      style={theme === "depth" ? { rotateX: rx, rotateY: ry, perspective: 1000 } : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 opacity-90">
        <div className={`h-full w-full bg-gradient-to-br ${heroGradientByTheme[theme]}`} />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.16),transparent_32%),radial-gradient(circle_at_85%_78%,rgba(168,85,247,0.18),transparent_36%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/10 to-slate-950/35" />
      <div className="relative z-10 h-[220px] sm:h-[280px] lg:h-full lg:min-h-[650px]" />
    </motion.div>
  );
}
