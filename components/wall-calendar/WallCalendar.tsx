"use client";

import { KeyboardEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { addDays, addMonths, format, isAfter, isSameDay } from "date-fns";
import Image from "next/image";
import { CalendarGrid } from "./CalendarGrid";
import { NotesPanel } from "./NotesPanel";
import { NoteBucket, ThemeMode } from "./types";
import { THEME_STORAGE_KEY, themeClassNames } from "./theme-utils";

const notesStorage = "wall-calendar-notes";

export default function WallCalendar() {
  const [monthDate, setMonthDate] = useState(() => new Date());
  const [now, setNow] = useState(() => new Date());
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(1);
  const [theme, setTheme] = useState<ThemeMode>("depth");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [focusDate, setFocusDate] = useState(() => new Date());
  const [expandedNotes, setExpandedNotes] = useState(false);
  const [notes, setNotes] = useState<Record<string, NoteBucket>>({});

  useEffect(() => {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
    const savedNotes = localStorage.getItem(notesStorage);
    if (savedTheme) setTheme(savedTheme);
    if (savedNotes) setNotes(JSON.parse(savedNotes) as Record<string, NoteBucket>);
  }, []);

  useEffect(() => {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(notesStorage, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const monthKey = format(monthDate, "yyyy-MM");
  const rangeKey = startDate && endDate ? `${format(startDate, "yyyy-MM-dd")}__${format(endDate, "yyyy-MM-dd")}` : "open";
  const noteKey = `${monthKey}::${rangeKey}`;
  const currentNote = notes[noteKey] ?? { monthNote: "", rangeNote: "" };

  const updateNote = (type: keyof NoteBucket, value: string) => {
    setNotes((prev) => ({
      ...prev,
      [noteKey]: { ...currentNote, [type]: value },
    }));
  };

  const onPickDate = (day: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day);
      setEndDate(null);
      return;
    }
    if (isAfter(startDate, day)) {
      setEndDate(startDate);
      setStartDate(day);
      return;
    }
    if (isSameDay(startDate, day)) {
      setEndDate(day);
      return;
    }
    setEndDate(day);
  };

  const onKeyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") setFocusDate((d) => addDays(d, 1));
    if (event.key === "ArrowLeft") setFocusDate((d) => addDays(d, -1));
    if (event.key === "ArrowDown") setFocusDate((d) => addDays(d, 7));
    if (event.key === "ArrowUp") setFocusDate((d) => addDays(d, -7));
    if (event.key === "Enter") onPickDate(focusDate);
  };

  useEffect(() => {
    setMonthDate((current) => {
      if (current.getMonth() !== focusDate.getMonth() || current.getFullYear() !== focusDate.getFullYear()) {
        return new Date(focusDate);
      }
      return current;
    });
  }, [focusDate]);

  const selectionHint = useMemo(() => {
    if (startDate && endDate) return "Range selected";
    if (startDate) return "Start date selected - Pick an end date";
    return "No range selected yet";
  }, [startDate, endDate]);

  const rangeText = useMemo(() => {
    if (startDate && endDate) return `${format(startDate, "MMM d")} - ${format(endDate, "MMM d")}`;
    if (startDate) return `${format(startDate, "MMM d")} - ...`;
    return "No dates selected";
  }, [startDate, endDate]);

  return (
    <motion.main
      tabIndex={0}
      onKeyDown={onKeyboard}
      className="mx-auto max-w-[1480px] p-4 text-white outline-none sm:p-8"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
        className="mb-4 flex flex-wrap items-center justify-between gap-3"
      >
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl ring-1 ring-white/20">
            <Image
              src="/images/logo.png"
              alt="TιɱҽNҽʂƚ logo"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-2xl font-semibold text-white sm:text-3xl">TιɱҽNҽʂƚ</h1>
        </div>
        <div className="rounded-2xl bg-emerald-500/20 px-4 py-2 text-right ring-1 ring-emerald-200/35">
          <p className="text-xl font-semibold text-white tabular-nums sm:text-2xl" suppressHydrationWarning>
            {mounted ? format(now, "hh:mm:ss a") : "--:--:-- --"}
          </p>
          <p className="text-sm text-white" suppressHydrationWarning>
            {mounted ? format(now, "EEEE, dd MMMM yyyy") : "Loading date..."}
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-[1.8fr_1fr]">
        <motion.section
          variants={{ hidden: { opacity: 0, y: 22 }, visible: { opacity: 1, y: 0 } }}
          className={`rounded-3xl p-4 sm:p-5 ${themeClassNames[theme]}`}
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white">{format(monthDate, "MMMM yyyy")}</p>
              <p
                className={[
                  "mt-2 text-sm font-medium",
                  "text-white",
                ].join(" ")}
              >
                {selectionHint}
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <span className="rounded-xl bg-black/45 px-3 py-2 text-xs font-semibold text-white ring-1 ring-white/20 sm:text-sm">
                {rangeText}
              </span>
              <button
                type="button"
                onClick={() => {
                  const today = new Date();
                  setFocusDate(today);
                  setMonthDate(today);
                }}
                className="rounded-xl bg-black/45 px-3 py-2 text-sm text-white ring-1 ring-white/20"
              >
                Today
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection(-1);
                  setMonthDate((d) => addMonths(d, -1));
                }}
                className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/20"
              >
                Prev
              </button>
              <button
                type="button"
                onClick={() => {
                  setDirection(1);
                  setMonthDate((d) => addMonths(d, 1));
                }}
                className="rounded-xl bg-white/10 px-3 py-2 text-sm text-white ring-1 ring-white/20"
              >
                Next
              </button>
            </div>
          </div>
          <CalendarGrid
            monthDate={monthDate}
            startDate={startDate}
            endDate={endDate}
            theme={theme}
            onPickDate={(day) => {
              setFocusDate(day);
              onPickDate(day);
            }}
            direction={direction}
          />
        </motion.section>

        <AnimatePresence mode="wait">
          <NotesPanel
            key={`${noteKey}-${expandedNotes ? "open" : "closed"}`}
            theme={theme}
            monthNote={currentNote.monthNote}
            rangeNote={currentNote.rangeNote}
            onMonthNote={(v) => updateNote("monthNote", v)}
            onRangeNote={(v) => updateNote("rangeNote", v)}
            expanded={expandedNotes}
            onToggleExpand={() => setExpandedNotes((v) => !v)}
          />
        </AnimatePresence>
      </div>
      <p className="mt-4 text-center text-xs text-slate-200">Made by Dharan</p>
    </motion.main>
  );
}
