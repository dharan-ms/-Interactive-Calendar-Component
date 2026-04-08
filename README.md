# TιɱҽNҽʂƚ - Wall Calendar Experience

A premium, interactive wall-calendar web app built with Next.js, Tailwind CSS, Framer Motion, and date-fns.

It includes a visual entry screen (landing-style), a full monthly calendar with date-range selection, and an integrated notes panel.

## Features

- Landing screen with calendar-themed hero image and "Enter Website" flow
- Full monthly grid (Monday-first, 7 columns)
- Date range selection (start + end) with animated highlights
- Month navigation (`Today`, `Prev`, `Next`)
- Live clock and full date display
- Notes system:
  - Monthly Plan
  - Selected Dates Notes
  - Expand/collapse notes area
  - Auto-save via `localStorage`
- Responsive layout (desktop + mobile friendly)
- Motion interactions powered by Framer Motion
- Background video support
- Footer credit: `Made by Dharan`

## Tech Stack

- Next.js (App Router)
- React
- Tailwind CSS
- Framer Motion
- date-fns

## Project Structure

- `app/page.tsx` - Landing + website entry flow and app shell
- `app/layout.tsx` - Root layout
- `app/globals.css` - Global styles/background effects
- `components/wall-calendar/WallCalendar.tsx` - Main container logic
- `components/wall-calendar/CalendarGrid.tsx` - Month grid rendering
- `components/wall-calendar/DayCell.tsx` - Individual day cell visuals/states
- `components/wall-calendar/NotesPanel.tsx` - Notes UI
- `components/wall-calendar/theme-utils.ts` - Theme class mappings
- `public/videos/wall-calendar-bg.mp4` - Background video
- `public/images/landing-calendar.jpg` - Landing screen image
- `public/images/logo.png` - Header logo

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run development server:

```bash
npm run dev
```

3. Open:

`http://localhost:3000`

## Build for Production

```bash
npm run build
npm run start
```

## Notes

- If dev runtime cache gets corrupted (rare), clean and restart:

```bash
rm -rf .next
npm run dev
```

