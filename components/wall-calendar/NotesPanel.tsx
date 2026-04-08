"use client";

import { motion } from "framer-motion";
import { ThemeMode } from "./types";
import { themeClassNames } from "./theme-utils";

type Props = {
  theme: ThemeMode;
  monthNote: string;
  rangeNote: string;
  onMonthNote: (v: string) => void;
  onRangeNote: (v: string) => void;
  expanded: boolean;
  onToggleExpand: () => void;
};

export function NotesPanel(props: Props) {
  const { theme, monthNote, rangeNote, onMonthNote, onRangeNote, expanded, onToggleExpand } = props;
  return (
    <motion.aside
      layout
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      className={`rounded-3xl p-4 sm:p-5 ${themeClassNames[theme]}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Notes</h3>
        <button
          type="button"
          onClick={onToggleExpand}
          className="rounded-xl bg-white/10 px-3 py-1.5 text-xs text-white ring-1 ring-white/20"
        >
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
      <motion.div layout className="space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white">Monthly Plan</span>
          <textarea
            value={monthNote}
            onChange={(e) => onMonthNote(e.target.value)}
            rows={expanded ? 5 : 3}
            className="w-full rounded-2xl bg-slate-900/60 p-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-300 focus:outline-none focus:ring-cyan-300"
            placeholder="Add monthly goals, reminders, and priorities..."
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-xs uppercase tracking-[0.22em] text-white">Selected Dates Notes</span>
          <textarea
            value={rangeNote}
            onChange={(e) => onRangeNote(e.target.value)}
            rows={expanded ? 5 : 3}
            className="w-full rounded-2xl bg-slate-900/60 p-3 text-sm text-white ring-1 ring-white/10 placeholder:text-slate-300 focus:outline-none focus:ring-cyan-300"
            placeholder="Add notes for the currently selected date range..."
          />
        </label>
      </motion.div>
    </motion.aside>
  );
}
