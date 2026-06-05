# HPortal Design Language

This document defines the visual language, design principles, and stylistic
conventions of the HPortal component library. It serves as the authoritative
reference for anyone designing new components, extending existing ones, or
evaluating whether a proposed change is consistent with the system's identity.

---

## 1. Design Philosophy

HPortal is built on a single conviction: **every pixel of visual budget should
be spent on clarity, not decoration.**

The system deliberately eliminates ornamental elements — rounded corners,
gradients, animations, drop shadows, and decorative imagery — and redirects
that visual energy into the things that actually help users complete tasks:
legible typography, unambiguous interactive feedback, and a strong
information hierarchy built from simple geometric primitives.

This is not minimalism for aesthetic purposes. It is **functional austerity** —
a design posture where every visual decision must justify itself in terms of
usability, accessibility, or information density.

### 1.1 Core Principles

1. **Readability above all.** Typography is the primary interface. Font
   choice, size, weight, and spacing are the most important design decisions
   in the system.

2. **Interaction certainty.** Every interactive element must provide
   unambiguous visual feedback across all states (default, hover, focus,
   active, disabled). Users should never wonder "did I click that?" or
   "where is my focus?"

3. **Structural clarity through borders.** Thick solid-colour borders — not
   shadows, not gradients — define the visual hierarchy. Borders are
   HPortal's primary tool for grouping, separating, and emphasising content.

4. **Colour as semantic signal.** Colour is used to convey meaning (error,
   success, warning, brand identity), not to decorate. Each colour in the
   palette has a defined purpose.

5. **Zero decoration overhead.** If a visual property does not improve
   comprehension or usability, it is removed. This includes: border-radius
   on rectangular elements, transition animations, background gradients,
   text shadows, and decorative iconography.

---

## 2. Visual Characteristics

### 2.1 Geometry: Sharp Rectangles

All UI elements are **sharp-cornered rectangles**. `border-radius` is
explicitly set to `0` on buttons, inputs, textareas, selects, and search
fields to override browser defaults.

The only exceptions are elements whose **semantic meaning requires a circular
shape**:

| Element | border-radius | Reason |
|---------|--------------|--------|
| Radio button outer ring | `50%` | Circular shape is the universal signifier distinguishing radio from checkbox |
| Radio button inner dot | `50%` | Must match the outer ring |
| Warning exclamation icon | `50%` | The circled "!" is a universally recognised hazard symbol |

These are not decorative choices — they are functional necessities. No
component should introduce border-radius for aesthetic reasons.

### 2.2 Motion: Absolute Zero

HPortal uses **no CSS transitions, no animations, and no keyframes.**

State changes (hover, focus, active) are **instantaneous**. When a user
hovers over a link, the underline thickens immediately. When a button
receives focus, the colour inverts in a single frame.

This is a deliberate choice:

- **Performance:** zero animation means zero jank, even on low-powered
  devices.
- **Accessibility:** users with vestibular disorders (`prefers-reduced-motion`)
  are served by default, not as an afterthought.
- **Certainty:** instantaneous feedback removes the ambiguity of "is the
  animation still playing or has the state actually changed?"

If a future component genuinely requires motion (e.g. a loading spinner),
it must be implemented as an isolated exception with a
`prefers-reduced-motion: reduce` fallback, and documented in this file.

### 2.3 Depth: Functionally Flat

The system is **almost entirely flat**. The only use of `box-shadow` in the
component set falls into two functional categories:

| Shadow usage | Purpose |
|-------------|---------|
| `box-shadow: 0 2px 0 [darker-colour]` on buttons | Simulates a 2px physical "ledge" beneath the button, creating a pressable affordance. The shadow disappears on `:active` as the button shifts down 2px — a tactile metaphor, not a decorative choice. |
| `box-shadow: 0 -2px [yellow], 0 4px [black]` on focused links | Creates the distinctive two-tone focus band (yellow above, black below) that is the system's universal focus indicator. |
| `box-shadow: inset 0 0 0 Npx` on tag outlines and focus rings | Used as a layout-safe alternative to `border` to avoid affecting box dimensions. |

No component uses shadow for elevation, layering, or decorative depth. The
`--hp-shadow-sm` and `--hp-shadow-md` tokens exist in the design token file
for edge-case use by integrators, but no core component references them.

---

## 3. Colour System

### 3.1 Palette

HPortal's palette is deliberately constrained. Five brand colours, a neutral
grey ramp, and a set of semantic aliases.

#### Brand Colours

| Token | Hex | Role |
|-------|-----|------|
| `--hp-clr-main` | `#2F73A1` | Primary brand blue. Used on buttons, headers, panel borders, active nav indicators. |
| `--hp-clr-main-dark` | `#1c577e` | Darkened primary. Hover states, button pressed shadow. |
| `--hp-clr-main-light` | `#a3d6ff` | Lightened primary. Reserved for subtle highlights. |
| `--hp-clr-deepblue` | `#3B368F` | Secondary brand colour. Visited links, alternate panel variant. |
| `--hp-clr-accent` | `#F19337` | High-visibility accent (orange-yellow). Focus indicator, accent buttons. |
| `--hp-clr-accent-dark` | `#b0610f` | Darkened accent. Hover states for accent elements. |

#### Functional Colours

| Token | Hex | Role |
|-------|-----|------|
| `--hp-clr-red` | `#B30101` | Error, danger, warning buttons. |
| `--hp-clr-green` | `#068348` | Success states, positive feedback. |
| `--hp-clr-error` | `#B30101` | Alias for red in form validation contexts. |
| `--hp-clr-success` | `#068348` | Alias for green in feedback contexts. |

#### Neutral Ramp

| Token | Hex | Usage |
|-------|-----|-------|
| `--hp-clr-black` | `#0A0B0C` | Focus text, heaviest borders. Near-black, not pure `#000`. |
| `--hp-clr-dark` | `#282828` | Body text, dark header background. |
| `--hp-clr-grey` | `#585858` | Secondary text. |
| `--hp-clr-grey-dark` | `#4D4C4B` | Plain panel border. |
| `--hp-clr-grey-mid` | `#b3b3b3` | Muted text, light borders. |
| `--hp-clr-grey-light` | `#eaeaea` | Mid-tone backgrounds, table zebra. |
| `--hp-clr-off-white` | `#F5F5F5` | Light backgrounds (footer, panels). |
| `--hp-clr-white` | `#FFFFFF` | Page background, button text on dark. |

### 3.2 Colour Usage Rules

1. **Colour is never purely decorative.** Every colour application must map
   to a semantic purpose (brand identity, interactive state, error/success
   feedback, or structural separation).

2. **Solid fills only.** No gradients. Backgrounds are flat single-colour
   fills. This reinforces the system's graphic, poster-like quality.

3. **High-contrast text.** Body text is `#282828` on `#FFFFFF` (contrast
   ratio ~15:1). The focus state uses `#0A0B0C` on `#F19337` (contrast
   ratio ~7.5:1, exceeding WCAG AA for all text sizes).

4. **The accent colour has exactly one job** in the default palette: marking
   focus. It appears on skip links, focused inputs, focused buttons, and
   focused links. Accent buttons exist as a variant but should be used
   sparingly to avoid diluting the focus signal.

---

## 4. Typography

### 4.1 Typefaces

| Role | Family | Fallback Stack | Weights |
|------|--------|----------------|---------|
| Base (UI text) | Transport | Helvetica Neue → Arial → sans-serif | 400 (Light), 700 (Mid) |
| Monospace (code) | JetBrains Mono | Menlo → Consolas → Courier New → monospace | 400 (Light) |

**Transport** was designed by Jock Kinneir and Margaret Calvert for the
British road sign system. Its design goal — maximum legibility at speed, at
distance, and in poor lighting — makes it an unusually effective UI typeface.
The letterforms are open, the counters are large, and the stroke contrast is
low, all of which favour on-screen readability.

**JetBrains Mono** is chosen for code contexts because of its excellent
disambiguation of commonly confused characters (0/O, 1/l/I) and its
generous x-height that matches Transport's visual weight at similar sizes.

### 4.2 Type Scale

The system uses a **fixed pixel scale**, not a relative/modular scale. This
keeps sizing predictable and removes compounding rounding errors.

| Token | Size | Usage |
|-------|------|-------|
| `--hp-fs-sm` | 16px | Captions, breadcrumbs, phase banner, footer |
| `--hp-fs-base` | 18px | Body text, form inputs, default component text |
| `--hp-fs-md` | 19px | Heading-S, buttons, slightly emphasised text |
| `--hp-fs-lg` | 24px | Heading-M, error summary title |
| `--hp-fs-xl` | 32px | Heading-L |
| `--hp-fs-2xl` | 36px | Heading-XL, confirmation panel |
| `--hp-fs-3xl` | 48px | Hero heading (documentation), Heading-XL on desktop |

Note the base size of **18px** — deliberately larger than the web default of
16px. This is a core accessibility decision: larger base text reduces eye
strain and improves readability on all screen sizes.

### 4.3 Weight System: Binary Only

HPortal uses exactly **two font weights**:

| Weight | Token | Usage |
|--------|-------|-------|
| 400 | `--hp-fw-normal` | Body text, hints, secondary content |
| 700 | `--hp-fw-bold` | Headings, labels, links, buttons, keys in summary lists |

No intermediate weights (300, 500, 600) are used. This binary system creates
an unambiguous two-tier hierarchy: bold text demands attention; normal-weight
text provides supporting detail. Combined with the colour system and border
weights, two font weights are sufficient to express any level of emphasis.

### 4.4 Line Height

| Token | Value | Usage |
|-------|-------|-------|
| `--hp-lh-base` | 1.5 | Body text, lists, form elements |
| `--hp-lh-heading` | 1.2 | All headings |

The generous 1.5 body line-height creates breathing room between lines,
improving readability for extended text passages.

### 4.5 Link Underline Convention

All link-style underlines use **`border-bottom`**, never `text-decoration:
underline`. This prevents the underline from colliding with the descenders of
letters like **y**, **g**, **p**, **q**, and **j**.

Additionally, the **anti-jump rule** applies: the total of
`border-bottom-width + padding-bottom` must remain constant across default,
hover, and focus states to prevent layout shift.

See `CONTRIBUTING.md` for the full code pattern.

---

## 5. Border Language

Borders are HPortal's most distinctive visual tool. They replace shadows,
backgrounds, and outlines as the primary means of conveying hierarchy and
grouping.

### 5.1 Border Weight Scale

| Weight | Semantic meaning | Examples |
|--------|-----------------|----------|
| 1px | Passive separation; structural divider | Table rows, summary list rows, footer line, phase banner bottom |
| 2px | Moderate emphasis; identity stroke | Button border, active tab indicator, breadcrumb hover, footer link hover |
| 3px | Active emphasis; interaction feedback | Input focus border, link hover underline, search focus, textarea focus |
| 4px | Structural accent; content demarcation | Error summary panel border, error state left bar, inset text left bar, details content left bar |
| 5px | Maximum emphasis; visual anchor | Panel border, notification banner border, primary nav bottom bar, header bottom accent |

This five-tier scale is the backbone of HPortal's visual hierarchy. It acts
as a **typographic weight system for containers** — just as text uses 400 and
700, containers use 1px through 5px.

### 5.2 Border Colour Rules

- **Brand blue** (`--hp-clr-main`): default panels, notifications, nav bars.
- **Black** (`--hp-clr-border` / `--hp-clr-black`): inputs, form controls,
  focus states. Black borders carry the strongest "pay attention" signal.
- **Red** (`--hp-clr-error`): error states. Always paired with error text.
- **Grey** (`--hp-clr-border-light`): passive separators (table rows, footer
  lines).
- **Accent** (`--hp-clr-accent`): inverted header bottom border, active
  states on dark backgrounds.

---

## 6. Spacing System

HPortal uses a **5px-base linear spacing scale**:

| Token | Value | Common usage |
|-------|-------|-------------|
| `--hp-sp-1` | 5px | Tight internal padding (tag, inline gaps) |
| `--hp-sp-2` | 10px | Standard internal padding, small margins |
| `--hp-sp-3` | 15px | Component internal padding, form hint indent |
| `--hp-sp-4` | 20px | Standard component margin-bottom, content padding |
| `--hp-sp-5` | 25px | Heading bottom margin (L) |
| `--hp-sp-6` | 30px | Section separation, heading bottom margin (XL) |
| `--hp-sp-7` | 40px | Large section separation, hero padding |
| `--hp-sp-8` | 50px | Major vertical rhythm |
| `--hp-sp-9` | 60px | Maximum spacing (hero top padding) |

The first six values form a strict **arithmetic progression** (common
difference 5px). Beyond `sp-6`, the scale widens to 10px increments. This
makes the system easy to reason about mentally — every space is a multiple
of 5.

### 6.1 Layout Constraints

| Property | Value | Rationale |
|----------|-------|-----------|
| Max page width | 1000px | Keeps line lengths within the 60–80 character optimal reading range at 18px base size |
| Standard border width | 2px | The `--hp-border-w` token; used as the default border for buttons and structural elements |

---

## 7. Interactive States

Every interactive element in HPortal follows a **five-state model**:

### 7.1 State Definitions

| State | Visual treatment |
|-------|-----------------|
| **Default** | Brand colour or contextual colour. The baseline appearance. |
| **Hover** | Darkened colour (brand-dark variant) and/or thickened border-bottom. Immediate, no transition. |
| **Focus** | **The universal focus pattern:** background flips to `--hp-clr-focus` (orange-yellow `#F19337`), text flips to `--hp-clr-focus-text` (near-black `#0A0B0C`), and a `box-shadow` creates a distinctive two-tone band. All other decorative borders are removed. |
| **Active** | For buttons: 2px downward shift (`top: 2px`) + shadow removal, simulating a physical press. For links: same as focus or a visited colour. |
| **Disabled** | Muted grey text (`--hp-clr-text-muted`), `pointer-events: none`, reduced border colour. No cursor change needed since pointer events are disabled. |

### 7.2 The Focus Signature

The focus state is the most visually distinctive element of HPortal. Its
three-part construction — colour inversion + box-shadow band + border
removal — is designed to be visible on **any** background colour (light,
dark, coloured):

```
┌────────────────────────────┐
│  ██ 2px yellow band (top)  │  box-shadow: 0 -2px var(--hp-clr-focus)
│  Link Text Here            │  background: var(--hp-clr-focus)
│  ██ 4px black band (bottom)│  box-shadow: 0  4px var(--hp-clr-focus-text)
└────────────────────────────┘
```

This pattern is repeated identically on links, breadcrumbs, pagination,
error summary links, details summary, footer links, docs navigation, and
every other focusable text element. Consistency is critical — users must
be able to recognise focus instantly regardless of which component they are
interacting with.

---

## 8. Component Design Patterns

### 8.1 Solid Colour Blocks as Primary Expression

Large areas of flat, solid colour are HPortal's primary means of
communicating component identity and status:

| Pattern | Examples |
|---------|---------|
| Full-bleed colour header bar | Panel title bar, notification title, header background (inverted), confirmation panel |
| Colour-coded border | Panel left/top border, notification border, error summary border |
| Solid badge | Tag (filled variant), phase banner tag, button (all variants) |
| Colour inversion | Focus state (yellow), inverted header (dark), accent button (orange on black text) |

This "poster design" aesthetic — bold type + flat colour fields + sharp
geometry — gives HPortal its recognisable identity.

### 8.2 Left-Border Accent Pattern

Several components use a **thick left border** as a visual accent that
draws the eye without overwhelming the content:

- **Inset Text:** 4px grey-light left border
- **Error Input:** 4px red left border
- **Details Content:** 4px grey-light left border

This is a lightweight alternative to full-border panels for content that
needs subtle visual distinction.

### 8.3 Button Physicality

Despite the flat aesthetic, buttons have a subtle **physical metaphor**: a
2px bottom shadow simulating depth, which disappears on `:active` as the
button shifts down 2px. This is the only place in the system where a
depth illusion is employed, and its purpose is strictly functional — it
makes buttons feel "pressable" and provides unambiguous click feedback.

---

## 9. Accessibility Commitments

The design language encodes several accessibility guarantees:

1. **WCAG AA contrast** on all text/background combinations. The focus state
   exceeds AA requirements for both normal and large text.

2. **No information conveyed by colour alone.** Errors use colour + em-dash
   prefix + border. Success uses colour + text label. Tags use colour +
   uppercase text.

3. **No motion dependency.** With zero animations, the system is inherently
   safe for users with vestibular disorders.

4. **Visible focus on every interactive element.** The high-contrast focus
   signature is impossible to miss, supporting keyboard-only navigation.

5. **Large base font size** (18px) reduces the need for browser zoom and
   improves readability for users with mild visual impairments.

6. **Skip link** appears on keyboard focus, allowing screen reader and
   keyboard users to bypass navigation.

---

## 10. What HPortal Is Not

To prevent scope creep and maintain design coherence, the following are
explicitly out of scope for HPortal's design language:

| Out of scope | Rationale |
|-------------|-----------|
| Rounded corners (decorative) | Contradicts the sharp-rectangle geometry principle |
| CSS transitions or animations | Contradicts the zero-motion principle |
| Drop shadows for elevation | Contradicts the flat aesthetic; borders serve this role |
| Gradients | Contradicts the solid-colour-block language |
| Icon libraries or decorative imagery | The system is text-first; icons are used only where semantically necessary (warning !, search magnifier, nav arrows) |
| Dark mode | Not currently in scope; may be considered as a future token-level extension |
| Responsive breakpoint proliferation | The system uses a single breakpoint (640px) for mobile/desktop; complex responsive grids are not part of the core |

---

## 11. Summary

HPortal's design language can be distilled into six words:

> **Borders, blocks, type. No decoration.**

Every component in the system is a composition of sharp rectangles, solid
colour fills, heavy borders, and two font weights. Interactive states are
instantaneous and high-contrast. The visual vocabulary is deliberately small —
this constraint is what gives the system its coherence, its recognisability,
and its ability to communicate clearly at any scale.
