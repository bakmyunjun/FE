# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

면접 연습 플랫폼 (Interview Practice Platform) with AI coaching and real-time feedback. Built with React 19 + TypeScript + Vite + Tailwind CSS + Zustand + React Query.

## Development Commands

```bash
pnpm dev        # Start dev server (Vite HMR, port 5173)
pnpm build      # TypeScript check + production build
pnpm lint       # Lint with Biome
pnpm format     # Format with Biome
pnpm check      # Full Biome check (lint + format)
```

## Architecture

### Routing (`src/routes/index.tsx`)
- `/login` → LoginPage
- `/` → Home (dashboard with stats and interview history)
- `/report/:id` → ReportPage (lazy loaded)
- `/interview` → InterviewPage (lazy loaded)

### State Management
- **Zustand** for global state (`src/stores/`)
- **React Query** for server state (configured in `src/lib/queryClient.ts`, retry=1, no refetch on window focus)
- Local React state for component-specific state

### Component Organization
- `src/components/ui/` - shadcn/ui components (Radix UI primitives)
- `src/components/home/` - Dashboard components
- `src/components/interview/` - Interview flow components
- `src/components/report/` - Analysis & coaching components
- `src/components/layout/` - Header, Footer
- `src/components/modal/` - Alert modal system

### Modal System
Portal-based with two root elements in `index.html`: `#root` and `#modal-root`

### Styling
- Tailwind CSS with custom typography scale (h1-h3, sub1-sub2, body1-body2)
- Font: Pretendard (Korean-optimized)
- Dark mode support via CSS variables (class strategy)
- shadcn/ui components use New York style

## Key Conventions

- **Import alias**: Use `@/` for all src imports (e.g., `@/components/ui/button`)
- **Code quality**: Biome for linting/formatting (tab indentation, double quotes)
- **Package manager**: pnpm

## Current Development State

- UI mockup/prototype phase - layouts complete
- Mock data in `src/lib/mock.ts`
- API integration not yet implemented
- Authentication UI only, no backend logic
