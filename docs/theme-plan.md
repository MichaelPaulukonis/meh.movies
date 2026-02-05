# Plan: Vibe Switcher Implementation

The current "light/dark" toggle is non-functional because the app is designed as "Dark First" with hardcoded glassy colors. A traditional light mode would clash with the "Digital Maximalism" aesthetic. Instead, we will implement a **Vibe Switcher** that swaps the entire color palette of the application.

## 1. Analysis of Current State
- `app.vue` toggles a `.dark` class on the root element.
- Colors are mostly defined via Tailwind utility classes with high transparency (e.g., `bg-white/10`, `bg-black/40`).
- The primary background gradient is a static CSS variable `--bg-main` in `:root`.

## 2. Proposed "Crazy Color" Mode
We will replace the Light/Dark concept with two distinct "Vibes":
- **Vibe A (Default - Sunset):** Purple, Pink, Yellow (The current look).
- **Vibe B (Acid Cyber):** Cyan, Acid Green, Deep Blue.

## 3. Implementation Steps

### Step 1: Variable-ize the Palette
Update `app.vue` to define different values for CSS variables based on the active theme class.
```css
:root {
  --bg-main: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%);
  --accent-gradient: linear-gradient(90deg, #4ade80 0%, #3b82f6 100%);
  --glow-color: rgba(255, 255, 255, 0.4);
}

.dark { /* We will use the 'dark' class as the trigger for Vibe B */
  --bg-main: linear-gradient(135deg, #06b6d4 0%, #10b981 50%, #1e3a8a 100%);
  --accent-gradient: linear-gradient(90deg, #facc15 0%, #f97316 100%);
  --glow-color: rgba(6, 182, 212, 0.4);
}
```

### Step 2: Update Layout & Components
- Ensure the background decorative blobs in `app.vue` use these variables or semi-transparent versions of them.
- Update the toggle button icon to reflect a "Vibe Switch" (e.g., 🔮 vs 🧪).

### Step 3: Global Color Refinement
- Audit `pages/index.vue` and `pages/movie/[id].vue` to ensure they use the `--accent-gradient` variable instead of hardcoded tailwind gradient classes where possible.

## 4. Expected Outcome
- The toggle button will instantly swap the app from a "Sunset Maximalist" look to an "Acid Cyber" look.
- All glassy panels and neon highlights will respond to the new palette.
- No loss of data or functionality.
