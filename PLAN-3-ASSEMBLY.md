# Phase 3: Assembly, Polish & Delivery

> **Prerequisite**: Phase 2 (PLAN-2-COMPONENTS.md) is complete — all components built and individually verified.  
> **Goal**: Wire everything together, add final polish, optimize performance, and verify the complete site.

---

## Table of Contents

1. [Final App.tsx Assembly](#1-final-apptsx-assembly)
2. [Complete index.css — All Custom Styles](#2-complete-indexcss)
3. [Scroll Behavior & Section IDs](#3-scroll-behavior--section-ids)
4. [Responsive Polish](#4-responsive-polish)
5. [Performance Optimization](#5-performance-optimization)
6. [Accessibility Audit](#6-accessibility-audit)
7. [UI/UX Pro Max Pre-Delivery Checklist](#7-uiux-pro-max-pre-delivery-checklist)
8. [Build & Deployment](#8-build--deployment)
9. [Final Verification — Complete Walkthrough](#9-final-verification)
10. [Known Limitations & Future Improvements](#10-known-limitations)

---

## 1. Final App.tsx Assembly

### Complete App.tsx

This is the final composition. All sections are assembled in the correct visual order:

```tsx
// src/App.tsx
import { Navbar } from '@/components/layout/Navbar';
import { SideHUD } from '@/components/layout/SideHUD';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { Marquee } from '@/components/sections/Marquee';
import { LatestDrops } from '@/components/sections/LatestDrops';
import { Collections } from '@/components/sections/Collections';
import { PageReveal } from '@/components/shared/PageReveal';

function App() {
  return (
    <>
      {/* Entry animation overlay */}
      <PageReveal />

      {/* Fixed elements (always visible) */}
      <Navbar />
      <SideHUD />

      {/* Scrollable content */}
      <main>
        {/* Section 1: Full-viewport cinematic hero */}
        <HeroSection />

        {/* Section 2: Announcement ticker */}
        <Marquee />

        {/* Section 3: Product flip cards */}
        <LatestDrops />

        {/* Section 4: Category collection grid */}
        <Collections />
      </main>

      {/* Footer with social buttons */}
      <Footer />
    </>
  );
}

export default App;
```

### Verify section IDs for navigation

These IDs must exist for anchor links and SideHUD to work:

| Section | Expected `id` | Component |
|---------|---------------|-----------|
| Hero | `hero` | `HeroSection` |
| Product Cards | `latest-drops` | `LatestDrops` |
| Collections | `collections` | `Collections` |
| Footer/Contact | `contact` | `Footer` |

---

## 2. Complete index.css

This is the FINAL, comprehensive CSS file that includes everything:

```css
/* ==========================================
   ADAWWRABLY — MAIN STYLESHEET
   ========================================== */

/* === GOOGLE FONTS === */
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

/* === TAILWIND v4 === */
@import "tailwindcss";

/* === CUSTOM THEME TOKENS === */
@theme {
  --font-display: 'Bebas Neue', sans-serif;
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'DM Mono', monospace;

  --spacing-section: 6rem;
  --spacing-heading: 3rem;
  --spacing-card-gap: 1.5rem;
  --container-max: 1400px;
  --container-padding: 1.5rem;
}

/* === DESIGN SYSTEM TOKENS (Dark Theme Only) === */
@layer base {
  :root {
    --background: 240 15% 3.5%;
    --foreground: 0 0% 95%;
    --card: 240 14% 7%;
    --card-foreground: 0 0% 95%;
    --popover: 240 14% 7%;
    --popover-foreground: 0 0% 95%;
    --primary: 354 100% 57%;
    --primary-foreground: 0 0% 100%;
    --secondary: 24 100% 70%;
    --secondary-foreground: 0 0% 5%;
    --muted: 240 10% 14%;
    --muted-foreground: 240 5% 55%;
    --accent: 330 65% 28%;
    --accent-foreground: 0 0% 95%;
    --destructive: 0 84% 60%;
    --destructive-foreground: 0 0% 100%;
    --border: 240 10% 15%;
    --input: 240 10% 15%;
    --ring: 354 100% 57%;
    --radius: 0.75rem;

    /* Custom tokens */
    --glow-red: 0 0 20px rgba(255, 34, 51, 0.4);
    --glow-orange: 0 0 20px rgba(255, 153, 102, 0.3);
    --glass-bg: rgba(14, 14, 28, 0.7);
    --glass-border: rgba(255, 255, 255, 0.08);
    --glass-blur: blur(12px);
  }

  /* Smooth scrolling */
  html {
    scroll-behavior: smooth;
    scroll-padding-top: 5rem; /* Account for fixed navbar */
  }

  /* Selection color */
  ::selection {
    background-color: hsl(354, 100%, 57%, 0.3);
    color: white;
  }
}

/* === COMPONENT STYLES === */
@layer components {
  /* Ensure hero is full dynamic viewport */
  #hero {
    min-height: 100vh;
    min-height: 100dvh;
  }
}

/* === UTILITY ANIMATIONS === */
@layer utilities {
  /* Marquee infinite scroll */
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }
  .animate-marquee {
    animation: marquee 30s linear infinite;
  }

  /* Spinning border for product card back */
  @keyframes spin-slow {
    from { transform: rotateZ(0deg); }
    to { transform: rotateZ(360deg); }
  }
  .animate-spin-slow {
    animation: spin-slow 5s linear infinite;
  }

  /* Scroll indicator bounce */
  @keyframes scroll-bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(8px); }
  }
}

/* === REDUCED MOTION SUPPORT === */
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }

  .animate-marquee,
  .animate-spin-slow {
    animation: none !important;
  }
}

/* === SCROLLBAR STYLING (Webkit) === */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: hsl(240, 15%, 3.5%);
}
::-webkit-scrollbar-thumb {
  background: hsl(240, 10%, 20%);
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: hsl(354, 100%, 57%);
}
```

---

## 3. Scroll Behavior & Section IDs

### Smooth Anchor Scrolling

The `scroll-behavior: smooth` in CSS handles basic anchor links. But for the SideHUD's IntersectionObserver to work properly, each section needs correct `id` attributes AND proper spacing.

### Section Spacing Pattern

Every major section should follow this pattern:
```tsx
<section id="section-name" className="py-[var(--spacing-section)] px-[var(--container-padding)]">
  <div className="max-w-[var(--container-max)] mx-auto">
    {/* content */}
  </div>
</section>
```

This ensures:
- Consistent vertical rhythm (96px top+bottom padding)
- Consistent horizontal padding (24px)
- Max content width (1400px) centered
- Section IDs for anchor navigation

---

## 4. Responsive Polish

### Breakpoint Strategy

Following UI/UX Pro Max guideline: Test at 375px, 768px, 1024px, 1440px.

| Breakpoint | Tailwind | What changes |
|------------|----------|-------------|
| <640px (mobile) | `sm:` | Single column everything. Side HUD hidden. Hamburger nav. |
| 640-767px (large phone) | `sm:` | Product grid 2-col. Collection grid 2-col. |
| 768-1023px (tablet) | `md:` | Desktop nav shows. Footer columns. |
| 1024+ (desktop) | `lg:` | Product grid 4-col. Side HUD visible. Full layout. |
| 1440+ (wide) | `xl:` | Content maxes out at 1400px. Generous whitespace. |

### Mobile-Specific Fixes

Add these to `src/index.css` if needed:

```css
/* Prevent horizontal scroll from marquee overflow */
body {
  overflow-x: hidden;
}

/* Fix iOS momentum scrolling */
main {
  -webkit-overflow-scrolling: touch;
}

/* Hero on mobile: slightly shorter to show scroll hint */
@media (max-width: 640px) {
  #hero {
    min-height: 90vh;
    min-height: 90dvh;
  }
}
```

### Touch Interaction for Flip Cards

The `ProductFlipCard` already handles this via the `onClick` handler combined with `onMouseEnter`/`onMouseLeave`. On touch devices:
- First tap: flips the card (no hover event fires)
- Tap elsewhere: card flips back

Ensure the `useState` toggle in `ProductFlipCard` works correctly:
```tsx
onClick={() => setIsFlipped(!isFlipped)}
```

---

## 5. Performance Optimization

### Image Optimization

| Image | Size | Action |
|-------|------|--------|
| `hero-bg.png` | 1.9MB | Vite will optimize on build. Add `loading="eager"` + `fetchpriority="high"` via HTML preload. |
| Product images | 90-490KB each | Use `loading="lazy"` on all product `<img>` tags (already done in ProductFlipCard). |
| Logo | 121KB | Small enough. Loaded eagerly (in navbar). |

### Font Loading Strategy

The Google Fonts import uses `display=swap`, which shows text immediately in a fallback font, then swaps when the custom font loads. No FOIT (Flash of Invisible Text).

### CSS Performance Rules (from UI/UX Pro Max)

- ✅ All animations use `transform` and `opacity` (GPU-composited)
- ✅ No `width`, `height`, `top`, `left` animations (avoid layout thrashing)
- ✅ `will-change: transform` on parallax elements
- ✅ Scroll handler throttled via `requestAnimationFrame`
- ✅ IntersectionObserver for section tracking (no scroll event listeners)

### Bundle Size Check

After `npm run build`, verify:

```bash
npm run build
```

Expected output:
```
dist/index.html                  1.2 KB
dist/assets/index-[hash].css    ~15 KB gzip
dist/assets/index-[hash].js     ~40 KB gzip (React + shadcn components)
```

If JS exceeds 60KB gzip, check for unnecessary shadcn components being imported.

---

## 6. Accessibility Audit

### WCAG Compliance Checks

| Check | Standard | How to Verify |
|-------|----------|---------------|
| Text contrast | 4.5:1 minimum | Use browser DevTools → Rendering → Show contrast ratios |
| Focus indicators | Visible on all interactive elements | Tab through entire page with keyboard |
| Alt text | All `<img>` elements | Search codebase for `<img` — verify each has `alt` |
| Semantic HTML | Proper heading hierarchy | Only one `<h1>` (hero title), `<h2>` for sections |
| Labels | All links and buttons | Check `aria-label` on icon-only buttons |
| Reduced motion | `prefers-reduced-motion` | Toggle in OS settings, verify animations stop |

### Heading Hierarchy

```
<h1> ADAWWRABLY (hero title — there should be ONLY ONE)
  <h2> Latest Drops
  <h2> Shop by Collection
  <h4> Quick Links (footer)
  <h4> Connect (footer)
```

### Keyboard Navigation Test

1. Press Tab → should focus on first nav link
2. Tab through all nav links → to social icons → to hamburger (mobile)
3. Tab to "Buy Now" CTA in hero
4. Tab through product cards (they should be focusable)
5. Tab to collection cards
6. Tab to footer links → social buttons
7. Every focused element should have a visible outline/ring

---

## 7. UI/UX Pro Max Pre-Delivery Checklist

Run through this BEFORE declaring the build complete:

### Visual Quality
- [ ] No emojis used as structural icons (Lucide SVGs used everywhere)
- [ ] All icons from consistent family (Lucide React)
- [ ] Official brand logo (`Logo.png`) used with correct proportions
- [ ] Pressed-state visuals don't shift layout
- [ ] Semantic theme tokens used (no ad-hoc per-screen hardcoded colors)

### Interaction
- [ ] ALL clickable elements have `cursor-pointer`
- [ ] ALL hover states have transitions (150-300ms)
- [ ] Touch targets ≥44×44px on mobile
- [ ] Disabled states visually clear (if any)
- [ ] Focus order matches visual order

### Dark Mode
- [ ] Primary text contrast ≥4.5:1 on dark background
- [ ] Muted text contrast ≥3:1 on dark background
- [ ] Borders/dividers visible against dark surfaces
- [ ] No pure white (#FFFFFF) backgrounds anywhere

### Layout
- [ ] Content doesn't overflow horizontally at any breakpoint
- [ ] Fixed navbar doesn't cover content (scroll-padding-top set)
- [ ] Footer is fully visible without scrolling issues
- [ ] 8px spacing rhythm maintained (4/8/16/24/32/48/96 values)
- [ ] Side HUD doesn't overlay content on narrow desktop screens

### Performance
- [ ] Lighthouse Performance ≥90
- [ ] Lighthouse Accessibility ≥90
- [ ] No layout shifts (CLS = 0)
- [ ] Hero image loads within 2.5s (LCP target)
- [ ] Total page weight <4MB (including images)

---

## 8. Build & Deployment

### Production Build

```bash
npm run build
```

### Preview Production Build Locally

```bash
npm run preview
```

Visit `http://localhost:4173/` and verify everything works the same as dev mode.

### Deployment Options

| Platform | Command | Notes |
|----------|---------|-------|
| Vercel | `npx vercel` | Zero-config for Vite. Recommended. |
| Netlify | Drag `dist/` folder | Or use `netlify deploy` CLI |
| GitHub Pages | Configure `base` in `vite.config.ts` | Need `base: '/repo-name/'` |
| Self-hosted | Copy `dist/` to web server | Nginx/Apache config needed |

### For Vercel (recommended):

```bash
npm install -g vercel
vercel
```

When prompted:
- **Project**: Yes, set up a new project
- **Framework**: Vite
- **Build**: `npm run build`
- **Output**: `dist`

---

## 9. Final Verification — Complete Walkthrough

### Desktop Browser Test (1920×1080)

1. **Page Load**
   - [ ] Page reveal shows Adawwrably logo briefly → fades out
   - [ ] Hero section fills entire viewport
   - [ ] One Piece crew background image is visible and crisp
   - [ ] "ADAWWRABLY" title is massive, white, with red outline
   - [ ] Scroll indicator bounces at bottom center

2. **Scroll Down**
   - [ ] Navbar transitions from transparent to blurred dark
   - [ ] Hero content fades out with parallax (moves slower than scroll)
   - [ ] Red marquee strip appears with scrolling announcements
   - [ ] Marquee pauses on hover

3. **Latest Drops Section**
   - [ ] Section heading "LATEST DROPS" visible in Bebas Neue
   - [ ] 4 columns of product cards visible
   - [ ] Each card shows spinning orange border animation
   - [ ] Hovering a card flips it to reveal product image + info
   - [ ] Product name, price (₹), and badge visible on front face
   - [ ] "Add to Cart" button visible on flipped card

4. **Collections Section**
   - [ ] Section heading "SHOP BY COLLECTION" visible
   - [ ] 3×2 grid of glassmorphism cards
   - [ ] Each card has category name + product count
   - [ ] Hover lifts card + adds red glow border

5. **Side HUD** *(desktop only)*
   - [ ] Vertical category names visible on fixed left side
   - [ ] Active section highlighted in red with tick indicator
   - [ ] Clicking HUD label scrolls to corresponding section

6. **Footer**
   - [ ] 3-column layout: Logo, Links, Social buttons
   - [ ] 2×2 social button grid with corner-rounded shapes
   - [ ] Instagram (pink), YouTube (red), WhatsApp (green), Facebook (blue)
   - [ ] Buttons fill with brand color on hover
   - [ ] Copyright "© 2026 Adawwrably" at bottom

### Mobile Browser Test (375×812)

1. [ ] Hero fills viewport, title scales down via clamp()
2. [ ] Hamburger icon visible (top-right)
3. [ ] Hamburger opens full-width slide-in Sheet menu
4. [ ] Side HUD is hidden
5. [ ] Product cards: 1 column, tap to flip
6. [ ] Collection cards: 2 columns
7. [ ] Footer stacks to single column
8. [ ] Marquee scrolls without horizontal overflow

### Sound Notification on Completion

Per user's preference (from memories), play a sound when the build completes:

```powershell
# After npm run build completes successfully:
[System.Media.SystemSounds]::Asterisk.Play()
```

---

## 10. Known Limitations & Future Improvements

### Current Limitations (Static Site)
| Limitation | Reason | Future Fix |
|-----------|--------|------------|
| No actual cart functionality | Static placeholder data (Q10a) | Connect to WooCommerce/Shopify API |
| No product detail pages | Landing page only (Q9a) | Add React Router + product pages |
| No search functionality | Out of scope | Add search with Fuse.js or API |
| Placeholder social links | Only Instagram is real | Update when URLs available |
| Product data is hardcoded | `products.ts` static file | Replace with CMS/API fetch |

### Recommended Future Enhancements
1. **GSAP ScrollTrigger** — More sophisticated scroll animations (entrance reveals, staggered card loading)
2. **Framer Motion** — For page transitions if adding more pages
3. **Image optimization** — Convert PNGs to WebP with `vite-plugin-image-optimizer`
4. **Analytics** — Add Google Analytics or Plausible
5. **Loading states** — Use the bouncing dots loader (from want.md) for future async content
6. **WhatsApp integration** — Direct order via WhatsApp Business API
7. **Reviews section** — Add customer testimonials with horizontal scroll
8. **Newsletter signup** — Add email capture with Mailchimp/ConvertKit

---

## Quick Reference: UI/UX Pro Max Design System Search Commands

The agent can use these throughout the build to look up specific design guidance:

```bash
# Full design system (already generated & persisted)
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "anime e-commerce dark" --design-system -p "Adawwrably"

# Style lookups
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "glassmorphism dark" --domain style
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "parallax storytelling" --domain style

# Typography
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "bold condensed dark" --domain typography

# UX guidelines
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "hover animation card" --domain ux
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "reduced motion accessibility" --domain ux

# shadcn/ui specific
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "dark theme card button" --stack shadcn

# Color palettes
python ".agents/skills/ui-ux-pro-max-skill/src/ui-ux-pro-max/scripts/search.py" "dark anime merchandise" --domain color
```

---

## Summary: What Gets Built

```
COMPLETE PAGE FLOW (TOP → BOTTOM):

┌──────────────────────────────────────────────────┐
│  [Page Reveal: Logo pulse → Fade out]            │
├──────────────────────────────────────────────────┤
│  [NAVBAR] Logo | Home Shop Collections About | IG│  ← Fixed, transparent → blur
├──────────────────────────────────────────────────┤
│                                                  │
│  [SIDE HUD]     ┌──────────────────────┐         │  ← Fixed left (desktop)
│  KEYCHAINS      │                      │         │
│  FIGURES        │    HERO SECTION       │         │  ← 100vh, background: hero-bg.png
│  PLUSHIES       │                      │         │
│  CLOTHING       │    ADAWWRABLY        │         │  ← 12vw, white + red stroke
│  ACCESSORIES    │    India's Biggest...│         │
│                 │    [ Buy Now ]       │         │  ← Red outline button
│                 └──────────────────────┘         │
│                                                  │
├──────────────────────────────────────────────────┤
│  ✦ FREE SHIPPING ✦ NEW DROPS ✦ 10K+ FANS ✦     │  ← Red marquee strip
├──────────────────────────────────────────────────┤
│                                                  │
│             LATEST DROPS                         │  ← Bebas Neue section heading
│                                                  │
│  [Card] [Card] [Card] [Card]                     │  ← 4-col flip cards
│  [Card] [Card] [Card] [Card]                     │     Spinning border → Product
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│          SHOP BY COLLECTION                      │
│                                                  │
│  [Keychains] [Figures]  [Mystery]                │  ← 3×2 glassmorphism grid
│  [Plushies]  [Clothing] [Access.]                │
│                                                  │
├──────────────────────────────────────────────────┤
│                                                  │
│  FOOTER                                          │
│  Logo+Tagline | Links | [IG] [YT]               │  ← 3 columns
│                       | [WA] [FB]               │  ← 2×2 social buttons
│  © 2026 Adawwrably | Privacy | Returns          │
│                                                  │
└──────────────────────────────────────────────────┘
```

> **THE BUILD IS COMPLETE WHEN**: All Phase 3 verification checks pass, `npm run build` succeeds without errors, and the production preview at `localhost:4173` matches the design spec above.
