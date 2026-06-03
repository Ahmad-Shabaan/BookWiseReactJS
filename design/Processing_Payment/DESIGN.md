# Design System Specification: The Luminescent Depth Framework

## 1. Overview & Creative North Star
**Creative North Star: "The Ethereal Command Center"**

This design system is not a collection of static boxes; it is a living, breathing environment of light and shadow. We are moving away from the "flat grid" monotony of typical SaaS products. Instead, we embrace **Atmospheric Layering**. By utilizing the depths of `#0B0F1A` and the vibrant energy of electric blue/purple accents, we create a UI that feels like a high-end physical console—intentional, premium, and sophisticated.

We break the "template" look through:
*   **Intentional Asymmetry:** Strategic use of whitespace and overlapping containers to guide the eye.
*   **Luminous Depth:** Replacing harsh lines with tonal transitions and glassmorphism.
*   **High-Contrast Information Architecture:** Using radical scale shifts in typography to establish authority.

---

## 2. Colors & Surface Philosophy
Our palette is rooted in the deep space of `surface` (#0a0e19), layered with precision to create a sense of focused calm.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning or layout containment. Structural boundaries must be defined solely through background color shifts. To separate a sidebar from a main content area, place a `surface-container-low` (#0f131f) section against the `surface` (#0a0e19) background.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of frosted glass. 
*   **Base:** `surface` (#0a0e19)
*   **The Content Bed:** `surface-container` (#141927) for main dashboard regions.
*   **Floating Elements:** `surface-container-high` (#1a1f2e) or `highest` (#202535) for modals and menus.

### The "Glass & Gradient" Rule
To achieve "Soul," main CTAs and hero elements must use the **Electric Signature Gradient**: 
*   **From:** `primary` (#a3a6ff) 
*   **To:** `secondary` (#c180ff)
*   **Angle:** 135 degrees.

Apply `backdrop-blur: 12px` to any surface above the base layer to allow the deep background tones to bleed through, softening the interface.

---

## 3. Typography
We use **Inter** not as a default, but as a precision instrument. The goal is an editorial feel that emphasizes data and action.

*   **Display Scale (`display-lg` to `display-sm`):** Reserved for high-impact data points and hero headers. These should be set with a `-0.02em` letter-spacing to feel tight and authoritative.
*   **Headline & Title:** Use `headline-lg` (2rem) for page titles. Pair with `on-surface-variant` (#a7aaba) for breadcrumbs to create a clear hierarchy.
*   **Body & Labels:** `body-md` (0.875rem) is our workhorse. For secondary metadata, use `label-md` or `label-sm` in all-caps with `+0.05em` tracking to provide a "technical" aesthetic.

---

## 4. Elevation & Depth
In this system, elevation is a function of **light and opacity**, not just "shadows."

*   **The Layering Principle:** Rather than a shadow, place a `surface-container-lowest` (#000000) card inside a `surface-container-low` (#0f131f) section to create "recessed" depth.
*   **Ambient Shadows:** For floating modals, use a custom shadow: `0 20px 40px rgba(0, 0, 0, 0.4)`. The shadow must be tinted with the `surface` color to avoid a "muddy" look.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#444855) at **15% opacity**. This provides a whisper of a boundary without breaking the "No-Line" rule.
*   **Glassmorphism:** For navigation bars and floating tooltips, use `surface-container` at 70% opacity with a blur. This ensures the UI feels like a single, integrated ecosystem.

---

## 5. Components

### Buttons
*   **Primary:** Signature Gradient (Primary to Secondary) with `on-primary` (#0f00a4) text. Radius: `md` (0.75rem).
*   **Secondary:** `surface-container-highest` background with a subtle "Ghost Border."
*   **Tertiary:** Transparent background, `primary` text, no border. Hover state uses a 10% `primary` background tint.

### Cards & Lists
*   **Standard Card:** Use `surface-container-low` with `xl` (1.5rem) padding. 
*   **The Divider Ban:** Never use a horizontal line to separate list items. Use 16px of vertical white space or alternate the background between `surface-container` and `surface-container-low`.

### Input Fields
*   **Style:** `surface-container-highest` background. No border.
*   **Focus State:** A 2px outer glow using `primary` at 30% opacity.
*   **Error State:** Text in `error` (#ff6e84), background shifts to a 5% tint of `error_container`.

### Glass Tooltips
*   **Styling:** `surface-bright` (#262c3d) at 80% opacity, `backdrop-blur: 8px`. Radius: `sm`.

---

## 6. Do’s and Don’ts

### Do:
*   **Do** use extreme whitespace (64px+) between major sections to let the "Electric" accents breathe.
*   **Do** use `primary-dim` (#6063ee) for interactive icons to maintain a sophisticated tone.
*   **Do** apply the `xl` (1.5rem) roundedness to major containers to soften the "tech" feel.

### Don't:
*   **Don't** use pure white (#FFFFFF) for text. Always use `on-background` (#e8eafb) to prevent eye strain in dark mode.
*   **Don't** use standard 1px borders. If you feel the need for a line, try a 4px color-shift instead.
*   **Don't** use traditional "Drop Shadows" on cards that are sitting on the base surface. Rely on tonal shifts.