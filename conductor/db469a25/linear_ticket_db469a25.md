---
id: db469a25
title: "Phase 1: Foundation - Project Setup & Design System"
status: "Ready for Dev"
priority: High
order: 10
created: 2026-04-01
updated: 2026-04-01
research: "./research_20260401.md"
plan: "./plan_20260401.md"
links:
  - url: ../01c2bf34/linear_ticket_01c2bf34.md
    title: Parent Ticket
---

# Description

## Problem to solve
The current project is a default Vite + React + TS boilerplate. It lacks Tailwind CSS v4, shadcn/ui, and the custom design tokens (colors, fonts, spacing) required for the Adawwrably brand.

## Solution
Implement Phase 1 from `PLAN-1-FOUNDATION.md`. This includes installing dependencies, configuring Tailwind, initializing shadcn/ui, and setting up the global design tokens in `index.css`.

## Implementation Details
- Install `@tailwindcss/vite` and configure `vite.config.ts`.
- Initialize `shadcn@latest init`.
- Configure the color palette (background, primary, secondary, glow-red) in `src/index.css`.
- Set up typography (`Bebas Neue`, `Inter`, `DM Mono`) as theme variables.
- Prepare initial assets in `public/` (`hero-bg.png`, `Logo.png`).
- Update `index.html` with correct metadata and fonts.
- **Verification**: Run `npm run dev` and confirm Tailwind and shadcn are functional.
