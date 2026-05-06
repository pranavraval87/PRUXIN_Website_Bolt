# PRUXIN SaaS Platform — Canonical Agent Instructions

## Project Overview

PRUXIN is a high-end SaaS platform marketing site targeting engineering teams and technical decision-makers. The aesthetic is inspired by Stripe, Linear, and Vercel — precision-engineered, purposeful, and elevated.

## Stack

- **Framework:** Vite + React 19 + TypeScript
- **Styling:** Tailwind CSS v4 with OKLCH color tokens
- **Components:** shadcn/ui (new-york style) — always use existing UI components
- **Icons:** Lucide React
- **Theming:** dark-first (ThemeProvider defaultTheme="dark")

## "Obsidian Clarity" Design System

### Color Palette

| Token | Hex | OKLCH | Usage |
|-------|-----|-------|-------|
| `--background` / `--obsidian` | `#0B1020` | `oklch(0.13 0.03 255)` | Canvas, page background |
| `--primary` / `--brand-blue` | `#4352E8` | `oklch(0.50 0.22 264)` | CTAs, interactive elements |
| `--accent` / `--glow-cyan` | `#6EE7F2` | `oklch(0.88 0.12 196)` | Highlights, live indicators, glow |
| `--card` | — | `oklch(0.17 0.03 255)` | Card surfaces |
| `--muted-foreground` | — | `oklch(0.60 0.015 240)` | Secondary text |

### Tailwind Utility Classes (custom)

```css
.glass-card    /* bg-white/5 + backdrop-blur-md + 1px border white/10 */
.glass-nav     /* sticky nav: obsidian/75 + backdrop-blur-xl + border-white/8 */
.glow-cyan     /* cyan-teal box-shadow glow */
.glow-blue     /* brand-blue box-shadow glow */
.gradient-text /* linear-gradient text: brand-blue → glow-cyan */
.hero-glow     /* radial gradient ambient background */
```

### Visual Rules

1. **Glassmorphism first:** All cards, panels, and nav use `glass-card` or `glass-nav`
2. **1px border strokes:** All glass surfaces use `border border-white/10`
3. **Glow accents:** Interactive elements and highlights use `glow-cyan` or `glow-blue`
4. **Gradient headlines:** Hero and section headings use `gradient-text` for key words
5. **No sharp whites:** Use `text-foreground` (oklch 0.96) not pure white
6. **Spacing:** Generous padding — sections use `py-24 lg:py-32`

## File Structure

```
src/
  components/
    layout/
      Navbar.tsx          # Glass nav with brand logo + CTA
      RootLayout.tsx      # Page shell wrapping all routes
    sections/
      HeroSection.tsx     # Psychological hook hero
      AudioSection.tsx    # Social proof audio testimonials
    ui/                   # shadcn/ui components (do not edit directly)
  lib/
    utils.ts
```

## Component Conventions

- Always use shadcn/ui components — never build custom from scratch if a shadcn equivalent exists
- Prefer `cn()` from `@/lib/utils` for conditional class merging
- Section components are self-contained with their own padding and max-width constraints
- Use `max-w-7xl mx-auto px-6` for content width
- Typography: headlines use `font-bold tracking-tight`, body uses `leading-relaxed`

## Brand Voice

- Confident, technical, and precise
- Headlines are declarative statements, not questions
- Sub-copy is benefit-focused, never feature-laundry
- CTAs are action-oriented: "Start Free Trial", "See It Live", "Get Early Access"

## Page Structure Sequence

1. `Navbar` — sticky glass nav
2. `HeroSection` — psychological hook with trust badge, gradient headline, dual CTA
3. `AudioSection` — believability via audio testimonials with waveform UI
4. *(Phase 2)* Features, Pricing, Social Proof grid, Footer
