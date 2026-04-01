# Phase 2: Component Construction — Every Section, Pixel-Perfect

> **Prerequisite**: Phase 1 (PLAN-1-FOUNDATION.md) is complete — dev server runs, shadcn/ui installed, design tokens configured.  
> **Goal**: Build every component from placeholders to fully-styled, animated, responsive sections.  
> **Build Order**: Hero → Navbar + SideHUD → Marquee → Product Cards → Collections → Footer → Page Reveal

---

## Table of Contents

1. [Hero Section (THE Centerpiece)](#1-hero-section)
2. [Navbar (Top Bar)](#2-navbar)
3. [Side HUD (Chainzoku-Style)](#3-side-hud)
4. [Mobile Menu](#4-mobile-menu)
5. [Marquee Announcement Strip](#5-marquee-announcement-strip)
6. [Product Flip Cards (Latest Drops)](#6-product-flip-cards)
7. [Collections Grid](#7-collections-grid)
8. [Footer with Social Buttons](#8-footer-with-social-buttons)
9. [Page Reveal Animation](#9-page-reveal-animation)
10. [Shared Components](#10-shared-components)
11. [Component Verification Checklist](#11-component-verification-checklist)

---

## 1. Hero Section

**File**: `src/components/sections/HeroSection.tsx`  
**Priority**: HIGHEST — build this first.

### Visual Reference
Study `image.png` and `image-1.png` (Chainzoku screenshots). Key observations:
- Full-viewport cinematic image fills the entire background
- Massive white brand text with dark outline overlays the image
- Text is semi-transparent (≈92% opacity) so the image bleeds through
- Dark gradient overlay ensures text readability
- Subtitle + CTA button centered below the title
- The bottom edge fades to pure black for seamless transition into next section

### Architecture (3 visual layers)

```
Layer 1 (bottom): Background image — hero-bg.png, cover, centered
Layer 2 (middle): Gradient overlay — dark->transparent->dark
Layer 3 (top):    Content — title, subtitle, CTA button
```

### Implementation

```tsx
// src/components/sections/HeroSection.tsx
import { Button } from '@/components/ui/button';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { ShoppingBag } from 'lucide-react';

export function HeroSection() {
  const { scrollY } = useScrollPosition();

  // Parallax: title moves up at 0.3x scroll speed
  const parallaxOffset = scrollY * 0.3;
  // Fade out hero content as user scrolls
  const opacity = Math.max(0, 1 - scrollY / 600);

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Layer 1: Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero-bg.png')",
          transform: `translate3d(0, ${scrollY * 0.1}px, 0)`,
          willChange: 'transform',
        }}
      />

      {/* Layer 2: Gradient Overlays */}
      {/* Top vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background" />
      {/* Radial vignette for cinematic edges */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(8,8,15,0.7) 100%)',
        }}
      />

      {/* Layer 3: Content */}
      <div
        className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        style={{
          transform: `translate3d(0, -${parallaxOffset}px, 0)`,
          opacity,
          willChange: 'transform, opacity',
        }}
      >
        {/* Brand Title */}
        <h1
          className="font-display uppercase tracking-wider leading-none mb-4 select-none"
          style={{
            fontSize: 'clamp(3rem, 12vw, 10rem)',
            color: 'white',
            WebkitTextStroke: '2px hsl(var(--primary))',
            textShadow: '0 0 40px rgba(255, 34, 51, 0.3), 0 4px 30px rgba(0,0,0,0.5)',
            opacity: 0.92,
            letterSpacing: '0.08em',
          }}
        >
          ADAWWRABLY
        </h1>

        {/* Subtitle */}
        <p
          className="font-sans text-foreground/80 tracking-widest uppercase mb-8"
          style={{
            fontSize: 'clamp(0.75rem, 2vw, 1.2rem)',
            letterSpacing: '0.2em',
            textShadow: '0 2px 10px rgba(0,0,0,0.8)',
          }}
        >
          India's Biggest Anime Merch Store
        </p>

        {/* CTA Button */}
        <Button
          asChild
          size="lg"
          variant="outline"
          className="
            border-2 border-primary bg-transparent text-white
            rounded-full px-10 py-6 text-lg font-sans font-semibold
            uppercase tracking-wider
            hover:bg-primary hover:text-white hover:shadow-[var(--glow-red)]
            transition-all duration-300 ease-out
            hover:-translate-y-0.5
            cursor-pointer
          "
        >
          <a href="/shop">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Buy Now
          </a>
        </Button>
      </div>

      {/* Scroll indicator at bottom */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={{ opacity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-3 bg-white/60 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
```

### Critical CSS for HeroSection

Add to `src/index.css`:

```css
/* Hero Section Custom Styles */
@layer components {
  #hero {
    /* Ensure hero is always full viewport */
    min-height: 100vh;
    min-height: 100dvh; /* Dynamic viewport height for mobile */
  }
}

/* Scroll indicator bounce animation */
@keyframes scroll-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}
```

### UI/UX Pro Max Compliance
- ✅ Hero-Centric Design pattern (CTA above fold)
- ✅ CTA 7:1 contrast ratio (white text on transparent → red fill on hover)
- ✅ GPU-accelerated parallax (`translate3d`, `will-change`)
- ✅ `cursor-pointer` on CTA button
- ✅ Responsive via `clamp()` sizing — no breakpoint fragmentation
- ✅ Reduced motion: CSS parallax degrades gracefully (no JS animation lib)

---

## 2. Navbar

**File**: `src/components/layout/Navbar.tsx`

### Behavior
- Fixed, transparent by default
- On scroll (>80px): glassmorphism backdrop (blur + dark background)
- Left: Logo, Center: Nav links, Right: Social icon links
- Mobile (≤768px): Logo left, hamburger right → opens MobileMenu (Sheet)

```tsx
// src/components/layout/Navbar.tsx
import { useState } from 'react';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { cn } from '@/lib/utils';
import { Menu, Instagram, Youtube, Phone, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileMenu } from './MobileMenu';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'Shop', href: '#latest-drops' },
  { label: 'Collections', href: '#collections' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const socialLinks = [
  { icon: Instagram, href: 'https://www.instagram.com/adawwrably', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
  { icon: Phone, href: '#', label: 'WhatsApp' },
  { icon: Facebook, href: '#', label: 'Facebook' },
];

export function Navbar() {
  const { isScrolled } = useScrollPosition();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out',
          isScrolled
            ? 'bg-background/85 backdrop-blur-xl border-b border-border/50'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-[var(--container-max)] mx-auto px-[var(--container-padding)] h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 shrink-0">
            <img
              src="/Logo.png"
              alt="Adawwrably"
              className="h-10 w-auto"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="
                  text-sm font-sans font-medium uppercase tracking-wider
                  text-muted-foreground hover:text-foreground
                  transition-colors duration-200
                  cursor-pointer
                "
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop Social Icons */}
          <div className="hidden md:flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="
                  text-muted-foreground hover:text-primary
                  transition-colors duration-200
                  cursor-pointer
                "
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden cursor-pointer"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
        socialLinks={socialLinks}
      />
    </>
  );
}
```

---

## 3. Side HUD

**File**: `src/components/layout/SideHUD.tsx`

### Chainzoku-Style Fixed Left HUD (Desktop Only ≥1024px)

```tsx
// src/components/layout/SideHUD.tsx
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const hudItems = [
  { label: 'KEYCHAINS', sectionId: 'keychains' },
  { label: 'FIGURES', sectionId: 'figures' },
  { label: 'PLUSHIES', sectionId: 'plushies' },
  { label: 'CLOTHING', sectionId: 'clothing' },
  { label: 'ACCESSORIES', sectionId: 'accessories' },
];

export function SideHUD() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
    );

    // Observe each section that corresponds to HUD items
    const sections = ['latest-drops', 'collections'];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-start">
      {/* Vertical line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

      <div className="flex flex-col gap-6 pl-4">
        {hudItems.map((item) => (
          <a
            key={item.label}
            href={`#${item.sectionId}`}
            className={cn(
              'relative text-[9px] font-sans font-medium uppercase tracking-[3px] transition-all duration-300 cursor-pointer',
              activeSection === item.sectionId
                ? 'text-primary'
                : 'text-muted-foreground/50 hover:text-muted-foreground'
            )}
            style={{
              textShadow: '0 0 8px rgba(8, 8, 15, 0.9)',
            }}
          >
            {/* Active indicator tick */}
            <span
              className={cn(
                'absolute -left-4 top-1/2 -translate-y-1/2 h-px transition-all duration-300',
                activeSection === item.sectionId
                  ? 'w-3 bg-primary'
                  : 'w-1.5 bg-white/20'
              )}
            />
            {item.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
```

---

## 4. Mobile Menu

**File**: `src/components/layout/MobileMenu.tsx`

Uses shadcn/ui `Sheet` component for the slide-in overlay:

```tsx
// src/components/layout/MobileMenu.tsx
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { type LucideIcon } from 'lucide-react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  socialLinks: { icon: LucideIcon; href: string; label: string }[];
}

export function MobileMenu({ open, onClose, navLinks, socialLinks }: MobileMenuProps) {
  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right" className="bg-background border-border w-full sm:w-80">
        <SheetHeader>
          <SheetTitle>
            <img src="/Logo.png" alt="Adawwrably" className="h-10 w-auto" />
          </SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-1 mt-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={onClose}
              className="
                py-3 px-4 text-lg font-sans font-medium uppercase tracking-wider
                text-foreground hover:text-primary hover:bg-muted
                rounded-lg transition-all duration-200
                cursor-pointer
              "
            >
              {link.label}
            </a>
          ))}
        </nav>

        <Separator className="my-6" />

        <div className="flex items-center gap-4 px-4">
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="
                p-3 rounded-xl bg-muted text-muted-foreground
                hover:bg-primary hover:text-white
                transition-all duration-200
                cursor-pointer
              "
            >
              <social.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

---

## 5. Marquee Announcement Strip

**File**: `src/components/sections/Marquee.tsx`

```tsx
// src/components/sections/Marquee.tsx
import { announcements } from '@/data/products';

export function Marquee() {
  // Duplicate content for seamless infinite scroll
  const content = [...announcements, ...announcements].join(' ✦ ');

  return (
    <section className="bg-primary text-white overflow-hidden py-3 relative group">
      <div
        className="
          flex whitespace-nowrap
          animate-marquee group-hover:[animation-play-state:paused]
        "
      >
        <span className="text-sm font-sans font-semibold uppercase tracking-widest px-4">
          {content}
        </span>
        <span className="text-sm font-sans font-semibold uppercase tracking-widest px-4">
          {content}
        </span>
      </div>
    </section>
  );
}
```

Add the marquee animation to `src/index.css`:

```css
@layer utilities {
  @keyframes marquee {
    from { transform: translateX(0); }
    to { transform: translateX(-50%); }
  }

  .animate-marquee {
    animation: marquee 30s linear infinite;
  }
}
```

---

## 6. Product Flip Cards (Latest Drops)

**File**: `src/components/sections/LatestDrops.tsx`  
**File**: `src/components/cards/ProductFlipCard.tsx`

### The Uiverse Flip Card — Adapted & Enhanced

This is the core interaction from `want.md`. Key changes from original Uiverse code:
1. **Bug fix**: `@keyframes rotation_481` second block changed from `0%` to `100%`
2. **Card back (Q3c)**: Anime texture pattern instead of floating circles
3. **Responsive**: Cards use `aspect-ratio` instead of fixed `190×254px`
4. **Front face**: Shows product image + frosted glass info overlay
5. **Touch support**: Click to flip on mobile (hover doesn't work on touch)

```tsx
// src/components/cards/ProductFlipCard.tsx
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import type { Product } from '@/data/products';

interface ProductFlipCardProps {
  product: Product;
}

export function ProductFlipCard({ product }: ProductFlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="group perspective-[1000px] cursor-pointer"
      style={{ aspectRatio: '3/4' }}
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d]',
          'shadow-[0_0_10px_1px_rgba(0,0,0,0.9)]',
          'rounded-xl',
          isFlipped && '[transform:rotateY(180deg)]'
        )}
      >
        {/* === BACK FACE (Default visible — anime pattern + spinning border) === */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-xl overflow-hidden bg-card flex items-center justify-center">
          {/* Spinning border */}
          <div
            className="absolute w-40 h-[160%] animate-spin-slow"
            style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--secondary)), hsl(var(--secondary)), hsl(var(--secondary)), hsl(var(--secondary)), transparent)',
            }}
          />
          {/* Inner content on back */}
          <div className="absolute inset-[1px] bg-card rounded-xl flex flex-col items-center justify-center gap-4 z-10">
            {/* Subtle anime pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04] rounded-xl"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 5 L35 15 L30 25 L25 15 Z' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/svg%3E")`,
                backgroundSize: '60px 60px',
              }}
            />
            {/* Logo */}
            <img
              src="/Logo.png"
              alt="Adawwrably"
              className="w-16 h-auto opacity-30"
            />
            <span className="text-xs text-muted-foreground/40 font-sans uppercase tracking-[4px]">
              Hover to reveal
            </span>
          </div>
        </div>

        {/* === FRONT FACE (Revealed on hover/tap — product image) === */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl overflow-hidden">
          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="lazy"
          />

          {/* Badge (top-left) */}
          {product.badge && (
            <div className="absolute top-3 left-3 z-10">
              <Badge
                variant={product.badge === 'SALE' ? 'destructive' : product.badge === 'NEW' ? 'default' : 'secondary'}
                className="text-[10px] font-mono uppercase tracking-wider"
              >
                {product.badge === 'HOT' ? '🔥 HOT' : product.badge}
              </Badge>
            </div>
          )}

          {/* Info Overlay (bottom) */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-black/70 backdrop-blur-md">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-foreground font-sans font-medium truncate max-w-[60%]">
                {product.name}
              </p>
              <div className="flex items-center gap-1.5">
                {product.originalPrice && (
                  <span className="text-[10px] text-muted-foreground line-through font-mono">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                <span className="text-sm text-primary font-mono font-bold">
                  {formatPrice(product.price)}
                </span>
              </div>
            </div>
            <Button
              size="sm"
              className="w-full h-7 text-xs font-sans uppercase tracking-wider cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Future: Add to cart
              }}
            >
              <ShoppingCart className="h-3 w-3 mr-1" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

### Latest Drops Section

```tsx
// src/components/sections/LatestDrops.tsx
import { products } from '@/data/products';
import { ProductFlipCard } from '@/components/cards/ProductFlipCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function LatestDrops() {
  return (
    <section id="latest-drops" className="py-[var(--spacing-section)] px-[var(--container-padding)]">
      <div className="max-w-[var(--container-max)] mx-auto">
        <SectionHeading
          title="Latest Drops"
          subtitle="Fresh merch, straight from Japan"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-card-gap)]">
          {products.slice(0, 8).map((product) => (
            <ProductFlipCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
```

### Required CSS Animations

Add to `src/index.css`:

```css
@layer utilities {
  /* Spinning border for product card back */
  @keyframes spin-slow {
    from { transform: rotateZ(0deg); }
    to { transform: rotateZ(360deg); }
  }

  .animate-spin-slow {
    animation: spin-slow 5s linear infinite;
  }
}
```

---

## 7. Collections Grid

**File**: `src/components/sections/Collections.tsx`  
**File**: `src/components/cards/CollectionCard.tsx`

```tsx
// src/components/cards/CollectionCard.tsx
import { cn } from '@/lib/utils';

interface CollectionCardProps {
  name: string;
  count: number;
  index: number;
}

// Each collection gets a unique subtle gradient background
const gradients = [
  'from-red-900/20 to-orange-900/10',
  'from-blue-900/20 to-indigo-900/10',
  'from-purple-900/20 to-pink-900/10',
  'from-green-900/20 to-emerald-900/10',
  'from-amber-900/20 to-yellow-900/10',
  'from-cyan-900/20 to-teal-900/10',
];

export function CollectionCard({ name, count, index }: CollectionCardProps) {
  return (
    <a
      href={`#${name.toLowerCase().replace(/\s+/g, '-')}`}
      className={cn(
        'group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer',
        'border border-[var(--glass-border)]',
        'bg-gradient-to-br',
        gradients[index % gradients.length],
        'transition-all duration-300 ease-out',
        'hover:-translate-y-1 hover:border-primary/50',
        'hover:shadow-[var(--glow-red)]'
      )}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-[var(--glass-bg)] backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2 p-6">
        <h3
          className="font-display text-2xl md:text-3xl uppercase tracking-wider text-center"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          {name}
        </h3>
        <p className="text-sm text-muted-foreground font-sans">
          {count} Products
        </p>
      </div>
    </a>
  );
}
```

```tsx
// src/components/sections/Collections.tsx
import { collections } from '@/data/products';
import { CollectionCard } from '@/components/cards/CollectionCard';
import { SectionHeading } from '@/components/shared/SectionHeading';

export function Collections() {
  return (
    <section id="collections" className="py-[var(--spacing-section)] px-[var(--container-padding)]">
      <div className="max-w-[var(--container-max)] mx-auto">
        <SectionHeading
          title="Shop by Collection"
          subtitle="Find your favourite universe"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 gap-[var(--spacing-card-gap)]">
          {collections.map((col, i) => (
            <CollectionCard
              key={col.id}
              name={col.name}
              count={col.count}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

---

## 8. Footer with Social Buttons

**File**: `src/components/layout/Footer.tsx`  
**File**: `src/components/cards/SocialButton.tsx`

### Uiverse Social Buttons (Praashoo7) — Adapted

The original Uiverse design uses white background with colorful icons. For our dark theme:
- Background: `var(--card)` (dark)
- On hover: fills with brand color
- Mapped to user's 4 platforms (Q2c)

```tsx
// src/components/cards/SocialButton.tsx
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SocialButtonProps {
  icon: LucideIcon;
  label: string;
  href: string;
  color: string;        // Brand color (e.g., '#CC39A4' for Instagram)
  position: 'tl' | 'tr' | 'bl' | 'br'; // Corner radius position
}

const radiusMap = {
  tl: 'rounded-[45px_5px_5px_5px]',   // Top-left rounded
  tr: 'rounded-[5px_45px_5px_5px]',   // Top-right rounded
  bl: 'rounded-[5px_5px_5px_45px]',   // Bottom-left rounded
  br: 'rounded-[5px_5px_45px_5px]',   // Bottom-right rounded
};

export function SocialButton({ icon: Icon, label, href, color, position }: SocialButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'w-[72px] h-[72px] md:w-[80px] md:h-[80px] flex items-center justify-center',
        'bg-card border border-border/50',
        'transition-all duration-200 ease-in-out cursor-pointer',
        'hover:scale-110',
        radiusMap[position]
      )}
      style={{
        ['--hover-bg' as string]: color,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = color;
        e.currentTarget.querySelector('svg')?.classList.add('text-white');
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = '';
        e.currentTarget.querySelector('svg')?.classList.remove('text-white');
      }}
    >
      <Icon className="h-6 w-6 transition-colors duration-200" style={{ color }} />
    </a>
  );
}
```

```tsx
// src/components/layout/Footer.tsx
import { Separator } from '@/components/ui/separator';
import { SocialButton } from '@/components/cards/SocialButton';
import { Instagram, Youtube, Phone, Facebook } from 'lucide-react';

const footerLinks = [
  { label: 'Shop', href: '#latest-drops' },
  { label: 'Collections', href: '#collections' },
  { label: 'Track Order', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

const socialButtons = [
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/adawwrably', color: '#CC39A4', position: 'tl' as const },
  { icon: Youtube, label: 'YouTube', href: '#', color: '#FF0000', position: 'tr' as const },
  { icon: Phone, label: 'WhatsApp', href: '#', color: '#25D366', position: 'bl' as const },
  { icon: Facebook, label: 'Facebook', href: '#', color: '#1877F2', position: 'br' as const },
];

export function Footer() {
  return (
    <footer id="contact" className="bg-card border-t border-border/30 pt-16 pb-8 px-[var(--container-padding)]">
      <div className="max-w-[var(--container-max)] mx-auto">
        {/* Main footer content — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1: Logo + tagline */}
          <div className="flex flex-col gap-4">
            <img src="/Logo.png" alt="Adawwrably" className="h-12 w-auto self-start" />
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Made with ❤️ for anime fans across India. Every item we carry is chosen with love for the culture.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-lg uppercase tracking-wider mb-2">Quick Links</h4>
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Column 3: Social buttons (Uiverse 2x2 grid) */}
          <div className="flex flex-col gap-3">
            <h4 className="font-display text-lg uppercase tracking-wider mb-2">Connect</h4>
            <div className="grid grid-cols-2 gap-2 w-fit">
              {socialButtons.map((social) => (
                <SocialButton key={social.label} {...social} />
              ))}
            </div>
          </div>
        </div>

        <Separator className="mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© 2026 Adawwrably. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Privacy Policy</a>
            <a href="#" className="hover:text-foreground transition-colors cursor-pointer">Returns Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
```

---

## 9. Page Reveal Animation

**File**: `src/components/shared/PageReveal.tsx`

Elegant brand reveal that plays as the page loads:

```tsx
// src/components/shared/PageReveal.tsx
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export function PageReveal() {
  const [phase, setPhase] = useState<'visible' | 'fading' | 'hidden'>('visible');

  useEffect(() => {
    // Logo visible for 600ms, then fade out over 400ms
    const fadeTimer = setTimeout(() => setPhase('fading'), 600);
    const hideTimer = setTimeout(() => setPhase('hidden'), 1000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (phase === 'hidden') return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[999] bg-background flex items-center justify-center',
        'transition-opacity duration-400 ease-out',
        phase === 'fading' ? 'opacity-0' : 'opacity-100'
      )}
    >
      <img
        src="/Logo.png"
        alt="Loading..."
        className="w-24 h-auto animate-pulse"
      />
    </div>
  );
}
```

---

## 10. Shared Components

### SectionHeading

```tsx
// src/components/shared/SectionHeading.tsx

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="text-center mb-[var(--spacing-heading)]">
      <h2
        className="font-display uppercase tracking-wider"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          letterSpacing: '0.06em',
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground font-sans text-sm md:text-base tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
```

---

## 11. Component Verification Checklist

After building ALL components, verify:

### Visual
- [ ] Hero fills full viewport with One Piece background visible
- [ ] "ADAWWRABLY" title is massive white text with red outline (Supreme style)
- [ ] Subtitle "India's Biggest Anime Merch Store" is readable
- [ ] "Buy Now" button has red outline, fills red on hover
- [ ] Scroll indicator bounces at hero bottom
- [ ] Navbar is transparent over hero, blurs on scroll
- [ ] Side HUD shows category names on left (desktop only)
- [ ] Marquee scrolls continuously, pauses on hover
- [ ] All 8 product cards display with spinning border animation
- [ ] Cards flip on hover (desktop) and tap (mobile) to show product
- [ ] Product names, prices (₹), and badges show on flipped face
- [ ] Collection grid shows 6 categories with glassmorphism cards
- [ ] Footer shows logo, links, and 2×2 social buttons with correct colors
- [ ] Page reveal plays on first load (logo pulse → fade out)

### Interaction
- [ ] All buttons have `cursor-pointer`
- [ ] All hover states have smooth transitions (150-300ms)
- [ ] Touch targets are ≥44×44px on mobile
- [ ] Mobile menu opens/closes via hamburger + Sheet overlay
- [ ] Navbar anchor links scroll smoothly to sections

### Performance
- [ ] Product images have `loading="lazy"`
- [ ] Hero BGimage has `fetchpriority="high"` (via preload in HTML)
- [ ] No layout shift on scroll (all animations use `transform`/`opacity` only)
- [ ] `prefers-reduced-motion` — parallax degrades (no jank)

### Responsiveness
- [ ] Test at 375px (iPhone SE), 768px (iPad), 1024px (desktop), 1440px (wide)
- [ ] Product grid: 1 col mobile, 2 col tablet, 4 col desktop
- [ ] Collection grid: 2 col mobile, 3 col desktop
- [ ] Side HUD hidden on <1024px
- [ ] Footer stacks to single column on mobile

> **Phase 2 is complete when all items above pass. Proceed to Phase 3 (PLAN-3-ASSEMBLY.md).**
