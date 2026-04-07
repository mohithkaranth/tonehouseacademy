# Tonehouse Academy

Next.js 14 App Router project for the Tonehouse Academy landing page and application flow.

## Stack

- Next.js 14 (`app/` directory routing)
- React 18
- Route Handler API at `app/api/apply/route.ts`
- Prisma for persistence

## Scripts

- `npm run dev` – start local dev server
- `npm run build` – production build (Vercel-compatible)
- `npm run start` – run production server
- `npm run lint` – run Next.js lint checks

## Vercel deployment

This repository is configured to build on Vercel with default settings:

- Framework preset: **Next.js** (auto-detected)
- Install command: default (`npm install`)
- Build command: default (`npm run build`)
- Output directory: default (`.next`)

No custom Vercel build configuration is required.
