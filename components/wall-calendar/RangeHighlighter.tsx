"use client";

import { motion } from "framer-motion";

export function RangeHighlighter({ label, active }: { label: string; active: boolean }) {
  return (
    <motion.div
      layout
      className={[
        "relative overflow-hidden rounded-2xl px-4 py-2.5 ring-1",
        active ? "bg-cyan-500/20 ring-cyan-200/35" : "bg-white/10 ring-white/20",
      ].join(" ")}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div
        className={[
          "absolute inset-0 bg-gradient-to-r",
          active ? "from-cyan-300/25 via-indigo-400/30 to-violet-400/25" : "from-cyan-400/10 via-indigo-500/15 to-fuchsia-400/10",
        ].join(" ")}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />
      <span className="relative z-10 text-lg font-semibold text-white sm:text-[34px]">{label}</span>
    </motion.div>
  );
}
