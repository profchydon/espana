# Ginger Design System

The visual & content system for **Ginger Technologies**. This repo gives design agents and engineers everything they need to build well-branded interfaces, prototypes, decks, and assets that feel like Ginger.

## Source materials provided

- `uploads/Design system color.png` — Master color palette (Sunshine, Ginger Sunshine Red, Purple Iris, Cardinal, Green, Red, Black scales)
- `uploads/Typography.png` — Type stack (Graphik, Poppins, Playfair) and the Display → Footnote scale
- `uploads/CTA.png` — Primary button treatments for web and mobile

> ⚠️ No codebase, Figma, or live product was provided. The system below is reconstructed from the three brand sheets above. Where details were not specified (component states, iconography, motion), this guide fills the gap with sensible defaults that match the visual evidence — flagged inline so you can correct them.

## Index

| File | What's in it |
| --- | --- |
| `README.md` | This file — context, content, visual foundations, iconography |
| `colors_and_type.css` | All color + typography CSS variables, plus semantic classes (`.h1`, `.body`, `.caption` …) |
| `fonts/` | Webfonts (Google Font fallbacks — see Typography) |
| `assets/` | Logos, icons, and placeholder imagery |
| `preview/` | Design System tab cards (color palettes, type specimens, components) |
| `SKILL.md` | Skill manifest so this folder can be dropped into Claude Code |

## Brand at a glance

Ginger Technologies is a modern consumer/lifestyle technology brand. The palette is warm-led — sunny ambers and a signature **Ginger Sunshine Red** carry the brand, balanced by a refined **Purple Iris** accent and disciplined neutrals. Typography pairs **Playfair** (editorial serif, for display moments) with **Graphik** and **Poppins** (clean geometric sans, for everything else). The result is editorial-meets-utility: confident headlines, calm UI.

---

## CONTENT FUNDAMENTALS

> Inferred from the brand artifacts. Adjust against real product copy when available.

**Voice.** Warm, direct, unfussy. The brand is named after a vivid color and a vivid root — leaning into clarity and a little heat, never into corporate hedging.

**Person.** Speak in **second person** ("you"), not first ("we"). When the product itself acts, name it ("Ginger sends a reminder…") rather than "we send".

**Casing.** **Sentence case** everywhere — buttons, headers, nav, titles. Avoid Title Case and ALL CAPS in product UI. Section labels in this brand book (e.g. "WEB", "MOBILE") are the only exception and live in marketing-style headers, not in app chrome.

**Tone examples.**

| Don't | Do |
| --- | --- |
| "Please proceed to continue." | "Continue" |
| "We were unable to process your request at this time." | "Something went wrong. Try again?" |
| "Click here to get started today!" | "Get started" |
| "Synergize your workflow." | "Plan your week in 30 seconds." |

**Punctuation.** Periods on full sentences, no period on a single-clause button or label. Em dashes (—) are welcome. Avoid exclamation points unless something is genuinely celebratory.

**Numbers.** Spell out one through nine in body copy; numerals everywhere else (dates, counts, prices, data).

**Emoji.** Sparingly, and never as a substitute for an icon. Acceptable in conversational copy (notifications, empty states); avoid in nav, buttons, and headers.

**Vibe.** Editorial restraint with a warm core. Think Sunday-paper layout meets a well-run app.

---

## VISUAL FOUNDATIONS

### Color

The palette is organized as **seven named hue scales × eleven steps** (lightest → darkest). The hues:

- **Sunshine** — soft amber → near-black brown. Warm hero color.
- **Ginger Sunshine Red** — pale peach → deep oxblood. The signature CTA / brand accent.
- **Purple Iris** — lilac → deep aubergine. Editorial accent, used sparingly.
- **Cardinal** — pinks into a deep wine red. Secondary warm.
- **Green** — mint → forest. Success / nature.
- **Red** — alert reds for errors and destructive actions.
- **Black** — eleven-step neutral grayscale; the workhorse for type and surfaces.

Each scale runs `50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950` analogous to a Tailwind-style ramp.

**Brand usage ratio.** ~70% neutrals (Black scale) · ~20% Sunshine + Ginger Sunshine Red · ~10% Purple Iris / Cardinal / Green / Red.

### Typography

Three families, one job each:

- **Playfair Display** — display-only. Use for editorial moments: hero headlines, magazine-style section openers, big quotes. Bold or Black weights. Never for body.
- **Graphik** — primary sans. Headings (Display → H5) and emphasized UI labels. Bold and Medium.
- **Poppins** — secondary sans / fallback. Body, captions, footnotes. Medium and Regular.

Letter spacing is **slightly tightened** across the board: −1% on headings, −4% on body. This is the single most "Ginger" type detail — never ship default tracking.

> **Font availability flag.** Graphik is a commercial Commercial Type license. Until licensed font files are dropped into `fonts/`, this system falls back to **Inter** (closest geometric/grotesque match for Graphik) via Google Fonts. Poppins and Playfair Display are loaded from Google Fonts directly. **Action for the user:** drop licensed Graphik `.woff2` files into `fonts/graphik/` and uncomment the `@font-face` block in `colors_and_type.css`.

### Spacing & layout

8-point base scale: `4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96`.

Layouts favor **generous left/right margins** and editorial rag (asymmetric where useful). Default container max-width 1200px on web, 16px gutters on mobile.

### Backgrounds

Off-white (`#FAFAFA` / `Black 50`) is the default surface, not pure white. Full-bleed product photography is welcome on marketing pages; keep textures and gradients **out** of UI surfaces. No noise, no glassmorphism, no gradient meshes — the warmth comes from the palette itself.

### Corner radii

- Buttons & inputs: **8px** (matches the CTA artwork)
- Cards & surfaces: **12px**
- Modals / large containers: **16px**
- Pill / capsule: full (`9999px`) — used for tags and small status chips only

### Borders

1px hairlines in `Black 200`. On the outline button variant, the border matches the text color (Ginger Sunshine Red 600) at 1.5px so it visually weighs the same as the filled button next to it.

### Shadows

Two-tier elevation, both very soft:

- `--shadow-sm` — `0 1px 2px rgba(20, 20, 20, 0.04), 0 1px 1px rgba(20, 20, 20, 0.03)` — resting cards
- `--shadow-md` — `0 8px 24px rgba(20, 20, 20, 0.08), 0 2px 6px rgba(20, 20, 20, 0.04)` — menus, popovers, lifted cards

No glow shadows. No colored shadows.

### Hover & press states

- **Filled buttons** — hover darkens by one step on the scale (e.g. `Ginger 600` → `Ginger 700`); press darkens two steps and shrinks 1% (`scale(0.99)`).
- **Outline buttons** — hover fills the background at 8% opacity of the border color; press at 16%.
- **Text links** — underline on hover; never on rest.
- **Cards** — hover raises shadow from `sm` → `md` and translates `-2px` on Y. No scale.

### Motion

Subtle and quick. Standard easing `cubic-bezier(0.2, 0.8, 0.2, 1)` (an "easy out") at **160ms** for micro-interactions, **240ms** for layout shifts. No bounces, no springs. Page transitions are crossfades, not slides.

### Transparency & blur

Used **only** for protection gradients on full-bleed imagery (a vertical fade from transparent to `Black 950 / 60%` behind text overlays). No frosted-glass nav, no backdrop-blur on cards.

### Cards

`background: white` (or `Black 50` on white surfaces), `border: 1px solid Black 100`, `border-radius: 12px`, `shadow: --shadow-sm`, `padding: 24px`. Hover raises elevation (see above). No colored left borders, no gradient fills.

### Imagery vibe

Warm, naturally lit, lightly grainy. Skin tones honest, not over-saturated. When in doubt, lean **warm and slightly contrasty** rather than cool/clinical.

---

## ICONOGRAPHY

> No icon set was supplied with the brand artifacts. **Substitution flagged:** this system links **Lucide** from CDN as the default icon family — clean, consistent 24px stroke icons that match Graphik/Poppins's geometric tone. **Action for the user:** if Ginger has a proprietary icon set, drop SVGs into `assets/icons/` and we'll switch the references over.

**Style rules (whichever set is used).**
- Stroke icons, **1.5px** stroke weight, 24px default size.
- Square-ish proportions, rounded line caps, rounded joins.
- Currentcolor fill — icons inherit the parent text color.
- Single-color only. No two-tone, no filled backgrounds, no decorative gradients.

**Sizes.** 16px (inline with body text), 20px (inputs, dense UI), 24px (default), 32px (feature/hero).

**Emoji.** Allowed in conversational copy only (notifications, empty states, casual marketing). Never in navigation, buttons, headers, or data labels.

**Unicode glyphs.** Use real characters — `→`, `↗`, `·`, `—`, `×`, `⌘` — not icon equivalents, when the glyph is semantically correct.

---

## How to use this system in a new design

1. Link `colors_and_type.css` from your HTML.
2. Pull colors as `var(--ginger-600)`, `var(--black-900)`, etc. — or use semantic aliases (`var(--fg-primary)`, `var(--bg-surface)`).
3. Apply type via the semantic classes (`.h1`, `.body`, `.caption`) or the variables (`var(--font-display)`, `var(--font-sans)`).
4. For components, copy the patterns shown in `preview/` — they're the canonical implementations.
