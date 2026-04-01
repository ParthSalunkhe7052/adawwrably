---
id: 9838aa22
title: "Phase 2: Component Construction - Pixel-Perfect UI"
status: Backlog
priority: High
order: 20
created: 2026-04-01
updated: 2026-04-01
links:
  - url: ../01c2bf34/linear_ticket_01c2bf34.md
    title: Parent Ticket
---

# Description

## Problem to solve
The project needs all its UI sections (Hero, Navbar, HUD, Marquee, Products, Collections, Footer) built and styled according to the Chainzoku.io-inspired design spec.

## Solution
Implement Phase 2 from `PLAN-2-COMPONENTS.md`. This involves building individual React components for each section using shadcn/ui and custom Tailwind styling.

## Implementation Details
- Build `HeroSection.tsx` with parallax background and massive brand title.
- Build `Navbar.tsx` (sticky, transparent → blur) and `MobileMenu.tsx` (shadcn Sheet).
- Build `SideHUD.tsx` (fixed left HUD with section tracking).
- Build `Marquee.tsx` with infinite scroll animation.
- Build `ProductFlipCard.tsx` with spinning border and hover flip (from `want.md`).
- Build `LatestDrops.tsx` to display the product grid.
- Build `CollectionCard.tsx` and `Collections.tsx` with glassmorphism effects.
- Build `Footer.tsx` with the 2x2 social button grid.
- Build `PageReveal.tsx` for the entry animation.
- **Verification**: Ensure all components match the visual spec and are responsive.
