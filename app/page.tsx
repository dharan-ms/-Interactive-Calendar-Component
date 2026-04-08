"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import WallCalendar from "@/components/wall-calendar/WallCalendar";

const ENTRY_KEY = "wall-calendar-entry";

export default function Page() {
  const [entered, setEntered] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setEntered(localStorage.getItem(ENTRY_KEY) === "1");
    setHydrated(true);
  }, []);

  const onEnter = () => {
    localStorage.setItem(ENTRY_KEY, "1");
    setEntered(true);
  };

  const onBackToLanding = () => {
    localStorage.removeItem(ENTRY_KEY);
    setEntered(false);
  };

  if (!hydrated) {
    return <div className="min-h-screen bg-slate-950" />;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {entered ? (
        <>
          <video
            className="pointer-events-none fixed inset-0 -z-20 h-full w-full object-cover"
            src="/videos/wall-calendar-bg.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
          <div className="fixed inset-0 -z-10 bg-slate-950/62 backdrop-blur-[2px]" />
        </>
      ) : null}

      <AnimatePresence mode="wait">
        {!entered ? (
          <motion.section
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-20"
          >
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="/images/landing-calendar.jpg"
                alt="Calendar inspired landing visual"
                width={1920}
                height={1080}
                className="h-full w-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/15" />
              <div className="absolute inset-x-0 top-0 p-6 sm:p-10">
                <h1 className="text-3xl font-bold text-white sm:text-5xl">TιɱҽNҽʂƚ</h1>
              </div>
              <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                <button
                  type="button"
                  onClick={onEnter}
                  className="rounded-2xl bg-white/90 px-7 py-3 text-base font-semibold text-slate-900 shadow-soft transition hover:scale-105 hover:bg-white"
                >
                  Click Me
                </button>
              </div>
            </div>
          </motion.section>
        ) : null}
      </AnimatePresence>

      {entered ? (
        <>
          <button
            type="button"
            onClick={onBackToLanding}
            title="Back to Landing"
            aria-label="Back to Landing"
            className="fixed right-4 top-4 z-30 h-9 w-9 rounded-full bg-black/45 text-sm font-semibold text-white ring-1 ring-white/25 backdrop-blur-sm transition hover:bg-black/60"
          >
            ⤺
          </button>
          <WallCalendar />
        </>
      ) : null}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-0 left-0 z-[2147483647] h-16 w-16 bg-slate-950/85 backdrop-blur-sm"
      />
    </div>
  );
}
