# Design System: "Digital Maximalism" (meh.movies)

## 1. Design Philosophy

The core of this aesthetic is **Irony & Energy**. It rejects the "Corporate Memphis" style (flat colors and corporate illustrations) in favor of high-contrast gradients, neon glows, and informal, human-centric micro-copy.

* **Vibe:** Playful, high-energy, and unapologetically "Gen Z."
* **Key Principles:** Vibrant backgrounds, dark-mode-first interfaces, and heavy use of emojis as functional UI elements.

---

## 2. Color Architecture

The system relies on a high-saturation background to provide "mood" while keeping the primary interaction area dark and focused.

### Core CSS Tokens

```css
:root {
  /* Brand Gradients */
  --bg-main: linear-gradient(135deg, #a855f7 0%, #ec4899 50%, #f59e0b 100%);
  --accent-gradient: linear-gradient(90deg, #4ade80 0%, #3b82f6 100%);

  /* UI Surface Colors */
  --color-surface-card: #1a1618;
  --color-surface-input: #2a2426;
  --color-border: #3f3f46;

  /* Typography & Highlights */
  --color-text-bright: #ffffff;
  --color-text-dim: #a1a1aa;
  --neon-glow-blue: #93c5fd;
  --neon-glow-spread: rgba(147, 197, 253, 0.4);
}

```

---

## 3. Typography Scale

Typography should feel bold and intentional. Avoid thin weights. Use modern sans-serif fonts with tight letter spacing.

| Element | Size | Weight | Case | Style |
| --- | --- | --- | --- | --- |
| **H1 (Logo)** | 3.5rem | 900 (Black) | Irregular | Neon Outer Glow |
| **Section Labels** | 1.1rem | 700 (Bold) | Lowercase | Standard |
| **Input Text** | 1rem | 400 (Regular) | Standard | Muted color |
| **Primary Button** | 1.25rem | 800 (Extra Bold) | Title Case | High-contrast white |

---

## 4. UI Components

### The "Floating Card"

The central unit of the app. It must feel distinct from the background through depth and opacity.

* **Border Radius:** `24px`
* **Border:** `1px solid var(--color-border)`
* **Shadow:** Large, soft drop shadow (`0 25px 50px -12px rgba(0, 0, 0, 0.5)`)

### The Action Button

The primary button uses a horizontal gradient and heavy rounding.

* **Background:** `var(--accent-gradient)`
* **Interactivity:** On hover, a subtle scale increase (`scale(1.02)`) and brightness boost.

### Interactive "Vibe" Toggles

Instead of standard radio buttons, use custom "pills."

* **Unselected:** Dark background, subtle border.
* **Selected:** Blue border, bright text, and an accompanying emoji.

---

## 5. Visual Language Checklist

When building new pages, ensure the following elements are present to maintain the "Gen Z" aesthetic:

* [ ] **Emoji Inclusion:** Use emojis in labels (e.g., `👉 input ur text`).
* [ ] **Neon Accents:** At least one glowing element per screen.
* [ ] **Informal Micro-copy:** Use lowercase and slang (e.g., "ur basic text" instead of "your input").
* [ ] **High Saturation:** Ensure the background gradient feels "loud."
