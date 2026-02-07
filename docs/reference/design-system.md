# Digital Maximalism Design System: meh.movies 🙄

## Table of Contents

1. [Overview](#overview)
2. [Brand Philosophy](#brand-philosophy)
3. [Visual Identity](#visual-identity)
4. [Color System](#color-system)
5. [Typography](#typography)
6. [Component Architecture](#component-architecture)
7. [Layout Principles](#layout-principles)
8. [UI Components](#ui-components)
9. [Animation & Motion](#animation--motion)
10. [Implementation Guidelines](#implementation-guidelines)

## Overview

The **meh.movies Digital Maximalism** design system is a high-energy, high-contrast framework designed for the Gen-Z aesthetic. It rejects minimalism in favor of "vibe-centric" design, utilizing vibrant gradients, bold glassmorphism, and expressive typography.

### Core Principles

- **Vibe-Driven**: Design is dictated by the current "mood" or "vibe."
- **Glassmorphism**: Heavy use of translucent, blurred surfaces to create depth.
- **Maximalist Typography**: Bold, italic, and high-weight fonts are the primary decorative elements.
- **Dynamic Theming**: Fluid switching between high-energy light modes and neon-drenched dark modes.

---

## Brand Philosophy

### Vision

To create a "digital sanctuary" for movie discovery that feels alive, playful, and unapologetically bold. It should feel like a curated "serve" rather than a utility.

### Brand Personality

- **Expressive**: Bold colors and experimental layouts.
- **Confident**: Loud typography that demands attention.
- **Nostalgic-Futuristic**: Blending Y2K gradients with modern glass effects.

---

## Visual Identity

### Design Principles

- **Italic Everything**: Most headers and labels use italics to imply motion and energy.
- **High-Weight Contrast**: Juxtaposing ultra-heavy `font-[1000]` with medium weights.
- **Glow & Bloom**: Surfaces emit ambient light and soft drop shadows.
- **Asymmetric Energy**: Subtle rotations and scaling on interactive elements.

---

## Color System

The system uses two primary "Vibes" that transform the entire UI state.

### Vibe A: Sunset Maximalism (Light Mode)

Optimized for high-energy, daylight environments.

```css
--bg-main: linear-gradient(135deg, #fdf4ff 0%, #fbcfe8 50%, #ffedd5 100%);
--color-accent: #db2777;           /* Deep Pink */
--color-text-main: #1e1b4b;         /* Deep Indigo */
--color-surface-base: rgba(255, 255, 255, 0.85);
--color-discovery-via: #f97316;     /* Vibrant Orange */
```

### Vibe B: Acid Cyber (Dark Mode)

The primary experience; optimized for neon-noir aesthetics.

```css
--bg-main: linear-gradient(135deg, #020617 0%, #064e3b 50%, #1e1b4b 100%);
--color-accent: #4ade80;           /* Acid Green */
--color-text-main: #f0fdfa;         /* Mint White */
--color-surface-base: rgba(2, 6, 23, 0.85);
--color-discovery-via: #ffffff;     /* Pure White */
```

### Ambient Decorative Blobs

Decorative radial gradients placed behind content to create depth.

- **Blob 1**: Primary accent (20-40% opacity).
- **Blob 2**: Secondary accent (20-30% opacity).
- **Blob 3**: Tertiary purple (20% opacity).

---

## Typography

### Font Selection

Primary font family relies on system-optimized sans-serifs, with heavy emphasis on weight and style.

```css
font-family: 
  "Inter", 
  system-ui, 
  -apple-system, 
  sans-serif;
```

### Type Scale - "Maximalist Hierarchy"

- **Display XL**: `text-7xl` to `text-9xl`, `font-[1000]`, `italic`, `tracking-tighter`.
- **Heading L**: `text-5xl`, `font-[1000]`, `italic`, `tracking-tighter`.
- **Labels**: `text-[10px]`, `font-black`, `uppercase`, `tracking-[0.4em]`.
- **Body**: `text-lg`, `font-medium`, `italic`, `leading-tight`.

---

## Component Architecture

### Elevation & Glassmorphism

The system does not use traditional shadows for elevation, but rather border-tints and backdrop-blurs.

```css
/* Glass Surface Pattern */
.glass {
  background: var(--color-surface-glass);
  backdrop-filter: blur(24px);
  border: 2px solid var(--color-border-subtle);
  border-radius: 40px;
}

/* Interior Glow */
.glow-accent {
  filter: drop-shadow(0 0 20px var(--color-accent-glow));
}
```

---

## Layout Principles

### Spacing System

Generous, variable spacing to allow for "breathable maximalism."

- **Standard Padding**: `p-6` (24px) to `p-12` (48px).
- **Page Sections**: `mb-24` (96px) to `mb-32` (128px).
- **Radius Scale**: Ultra-rounded corners are mandatory (`rounded-[40px]` to `rounded-[60px]`).

---

## UI Components

### 1. MovieCard (The Scroll)

Used for listing recent movies or discovery results.

- **Aspect Ratio**: `2/3`.
- **Interaction**: Scale up (`-translate-y-4`), border-color shift to `var(--color-accent)`.
- **Feature**: Large initial placeholder background for "alphabetical maximalism."

### 2. RecommendationCard (The Serve)

A specialized surface for LLM-generated content.

- **Style**: Ghost-white tint (`bg-white/10`).
- **Typography**: Heavily italicized reasoning text to differentiate from data.

### 3. Vibe Picker (Mood Buttons)

- **Shape**: `rounded-3xl` pill.
- **Feedback**: Active scale down to `95%`.
- **Visual**: Glowing shadow on selection.

---

## Animation & Motion

### The "Pop" Transition

A custom spring-like entry for results.

```css
/* Pop Entry Animation */
.pop-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.9) translateY(40px);
}
```

### Micro-Interactions

- **Spinner**: `animate-spin-slow` (4s duration) for a "chilled" loading state.
- **Hover Lift**: Every card or button should have a `scale-[1.05]` or `translate` on hover.

---

## Implementation Guidelines

### Global CSS Implementation

All design tokens are managed via CSS custom properties in `app.vue`.

```css
:root {
  --bg-main: ...;
  --color-accent: ...;
  /* etc */
}

.dark {
  --bg-main: ...;
  /* override for dark mode */
}
```

### Accessibility (Gen-Z Twist)

- **Legibility**: High weights ensure readability against vibrant backgrounds.
- **Contrast**: While experimental, the primary text colors (`--color-text-main`) are chosen to ensure AAA contrast against their respective vibe backgrounds.
- **Interactive States**: Clearly defined focus rings using `var(--color-accent)`.
