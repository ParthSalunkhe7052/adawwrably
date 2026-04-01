# Phase 1: Foundation — Project Setup, Design System & Core Structure

> **Project**: Adawwrably — India's Biggest Anime Merch Store  
> **Scope**: Single-page landing (`index.html`) — Chainzoku.io-inspired dark anime e-commerce  
> **Stack**: Vite + React + TypeScript + Tailwind CSS v4 + shadcn/ui  
> **Status**: This is Phase 1 of 3. Complete this before starting Phase 2.

---

## Table of Contents

1. [Context & Requirements Summary](#1-context--requirements-summary)
2. [Tech Stack Decision & Rationale](#2-tech-stack-decision--rationale)
3. [Step-by-Step: Project Initialization](#3-step-by-step-project-initialization)
4. [Design System Configuration](#4-design-system-configuration)
5. [File Structure Blueprint](#5-file-structure-blueprint)
6. [Asset Preparation](#6-asset-preparation)
7. [Base Layout & HTML Shell](#7-base-layout--html-shell)
8. [Verification Checklist](#8-verification-checklist)

---

## 1. Context & Requirements Summary

### What We're Building
A single-page anime merchandise landing page inspired by [Chainzoku.io](https://chainzoku.io/). The page must feel premium, cinematic, and immersive — dark theme only.

### User Answers (Locked Decisions)
| Question | Answer | Implication |
|----------|--------|-------------|
| Q1 — Hero CTA link | **A) /shop** | "Buy Now" button links to `/shop` |
| Q2 — Social platforms | **C) Instagram + YouTube + WhatsApp + Facebook** | 4 social buttons in footer |
| Q3 — Card back style | **C) Anime pattern/texture on dark background** | Not the glowing circles from Uiverse |
| Q4 — Product sections | **A) 1 section only (Latest Drops, 4-8 cards)** | Minimal, focused product display |
| Q5 — Hero typography | **C) Bold sharp condensed (Supreme/Kith style)** | NOT bubbly/wavy. Use condensed display font |
| Q6 — Navigation | **B) Top navbar + side HUD** | Chainzoku-style fixed left HUD |
| Q7 — HUD items | **A) Category names** | KEYCHAINS / FIGURES / PLUSHIES / etc. |
| Q8 — Logo | **A) Yes, Logo.png exists** | Use `Logo.png` from project root |
| Q9 — Pages | **A) Landing page only** | Single `index.html`, all sections on one page |
| Q10 — E-commerce | **A) Placeholder data only** | Static site, no API connections |
| Q11 — Theme | **A) Dark mode only** | No light mode toggle |
| Q12 — Build order | **A) Hero → Cards → Collections → Footer** | Hero section is highest priority |

### Available Assets
| Asset | Path | Description |
|-------|------|-------------|
| Hero background | `image copy.png` (1.9MB) | One Piece crew artwork — full viewport hero BG |
| Logo | `Logo.png` (121KB) | Panda mascot + "adAWWraBLY" text, transparent BG |
| Reference images | `image.png`, `image-1.png` | Chainzoku.io hero screenshots |
| Product images | `product images/` (12 files) | Anime keychains, figures, plushies — real merch photos |
| Uiverse components | `want.md` | Flip card CSS, social buttons CSS, loader CSS |

---

## 2. Tech Stack Decision & Rationale

### Chosen Stack: Vite + React + TypeScript + Tailwind CSS + shadcn/ui

| Component | Choice | Why |
|-----------|--------|-----|
| **Build tool** | Vite | Instant HMR, zero-config, optimized production builds |
| **Framework** | React 19 | shadcn/ui requires React. Component reusability. |
| **Language** | TypeScript | Type safety for product data structures |
| **Styling** | Tailwind CSS v4 | Works natively with shadcn/ui. Utility-first. No CSS file sprawl. |
| **Component library** | shadcn/ui | Premium, accessible UI primitives (Button, Card, Badge, Sheet, NavigationMenu). Compound component pattern. Dark mode built-in. |
| **Fonts** | Google Fonts | Free, CDN-served |
| **Icons** | Lucide React | shadcn/ui's default icon set. SVG-based, tree-shakeable. |
| **Animations** | CSS @keyframes + Framer Motion *(optional)* | CSS for simple animations, Framer Motion for scroll-triggered if needed |

---

## 3. Step-by-Step: Project Initialization

### Step 3.1: Check prerequisites

```bash
node --version
npm --version
```

### Step 3.2: Initialize Vite + React + TypeScript

```bash
cd "c:\Users\parth\OneDrive\Desktop\FreeLancing\Awadrabaly"
npx -y create-vite@latest ./ --template react-ts
```

### Step 3.3: Install dependencies

```bash
npm install
npm install tailwindcss @tailwindcss/vite
```

### Step 3.4: Configure Vite for Tailwind

Edit `vite.config.ts`:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
```

### Step 3.5: Initialize shadcn/ui

```bash
npx -y shadcn@latest init
```

---

## 4. Design System Configuration

### 4.1: Color Palette (src/index.css)

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 240 15% 3.5%;
    --foreground: 0 0% 95%;
    --card: 240 14% 7%;
    --card-foreground: 0 0% 95%;
    --primary: 354 100% 57%;
    --primary-foreground: 0 0% 100%;
    --secondary: 24 100% 70%;
    --border: 240 10% 15%;
    --radius: 0.75rem;

    --glow-red: 0 0 20px rgba(255, 34, 51, 0.4);
    --glass-bg: rgba(14, 14, 28, 0.7);
    --glass-blur: blur(12px);
  }
}
```

### 4.2: Typography

```css
@theme {
  --font-display: 'Bebas Neue', sans-serif;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'DM Mono', monospace;
}
```

---

## 5. Asset Preparation

### Step 5.1: Copy initial assets to public/

```powershell
New-Item -ItemType Directory -Force -Path "public/products"
Copy-Item "image copy.png" "public/hero-bg.png"
Copy-Item "Logo.png" "public/Logo.png"
```

---

## 6. Base Layout & HTML Shell

### Step 6.1: Update index.html

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Adawwrably — India's Biggest Anime Merch Store</title>
    <link rel="icon" type="image/png" href="/Logo.png" />
  </head>
  <body class="bg-background text-foreground antialiased">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 7. Verification Checklist

- [ ] `npm run dev` starts without errors
- [ ] Tailwind classes work (e.g., bg-red-500 test)
- [ ] shadcn/ui is ready to use
- [ ] All product assets are accessible in `public/` directory
- [ ] Google Fonts (Bebas Neue, Inter, DM Mono) are importing correctly

> **Phase 1 is complete when all items above pass. Proceed to Phase 2.**
