"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from "date-fns";
import { DayCell } from "./DayCell";
import { ThemeMode } from "./types";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

type Props = {
  monthDate: Date;
  startDate: Date | null;
  endDate: Date | null;
  theme: ThemeMode;
  onPickDate: (day: Date) => void;
  direction: number;
};

export function CalendarGrid({ monthDate, startDate, endDate, onPickDate, theme, direction }: Props) {
  const monthStart = startOfMonth(monthDate);
  const monthEnd = endOfMonth(monthDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => (
          <span key={day} className="px-2 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white">
            {day}
          </span>
        ))}
      </div>
      <div className="relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={format(monthDate, "yyyy-MM")}
            custom={direction}
            variants={{
              enter: (d: number) => ({ x: d >= 0 ? 80 : -80, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (d: number) => ({ x: d >= 0 ? -80 : 80, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="grid grid-cols-7 gap-2"
          >
            {days.map((day) => {
              const inMonth = day.getMonth() === monthDate.getMonth();
              const isStart = startDate ? isSameDay(day, startDate) : false;
              const isEnd = endDate ? isSameDay(day, endDate) : false;
              const inRange =
                startDate && endDate
                  ? isWithinInterval(day, { start: startDate, end: endDate })
                  : startDate
                    ? isSameDay(day, startDate)
                    : false;

              return (
                <DayCell
                  key={day.toISOString()}
                  date={day}
                  isCurrentMonth={inMonth}
                  isToday={isSameDay(day, new Date())}
                  isStart={isStart}
                  isEnd={isEnd}
                  isInRange={inRange}
                  theme={theme}
                  onClick={onPickDate}
                />
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="text-xs text-white">Tip: use arrow keys to move day-by-day, then press Enter to pick range.</p>
    </div>
  );
}
