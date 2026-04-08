"use client";

import { motion } from "framer-motion";
import { ThemeMode } from "./types";

type Props = {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isStart: boolean;
  isEnd: boolean;
  isInRange: boolean;
  theme: ThemeMode;
  onClick: (day: Date) => void;
};

const holidays = new Set(["01-01", "12-25"]);

export function DayCell(props: Props) {
  const { date, isCurrentMonth, isToday, isStart, isEnd, isInRange, onClick, theme } = props;
  const key = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const holiday = holidays.has(key);

  return (
    <motion.button
      type="button"
      title={holiday ? "Holiday marker" : "Select date"}
      onClick={() => onClick(date)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      className={[
        "group relative h-20 overflow-hidden rounded-2xl p-2 text-left text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60",
        isCurrentMonth ? "text-white" : "text-slate-300",
        isInRange
          ? "bg-gradient-to-r from-slate-700/60 to-zinc-800/65 bg-[length:200%_100%] animate-gradient-sweep ring-1 ring-white/20"
          : "bg-slate-800/55 ring-1 ring-white/10",
        theme === "neumorph" ? "shadow-[inset_0_0_0_1px_rgba(148,163,184,0.08),6px_6px_16px_rgba(2,6,23,0.4),-6px_-6px_16px_rgba(30,41,59,0.5)]" : "",
      ].join(" ")}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 360, damping: 30 }}
        className={[
          "absolute inset-1 rounded-xl",
          isStart || isEnd ? "bg-zinc-300/25 ring-1 ring-white/55" : "bg-transparent",
        ].join(" ")}
      />
      {isStart || isEnd ? <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white/90 animate-pulseGlow" /> : null}
      <span className="relative z-10 block text-[20px] font-semibold leading-none">{date.getDate()}</span>
      {holiday ? <span className="relative z-10 mt-1 inline-block rounded-full bg-rose-400/20 px-2 py-0.5 text-[10px] text-white">Holiday</span> : null}
      {isToday ? <span className="relative z-10 mt-1 block text-[10px] text-white">Today</span> : null}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </motion.button>
  );
}
