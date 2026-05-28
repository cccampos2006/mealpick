---
name: pickmeal
description: End "what do I cook?" paralysis in under 30 seconds.
colors:
  warm-linen: "#f4f3ee"
  card-surface: "#ffffff"
  kitchen-herb: "#354d3f"
  kitchen-herb-deep: "#2b3f33"
  warm-cedar: "#5f5145"
  charcoal: "#1e1e1e"
  smoke: "#6b6b6b"
  pebble: "#8a8a8a"
  divider: "#ebebeb"
typography:
  display:
    fontFamily: "'Libertinus Serif Display', 'Libertinus Serif', Georgia, serif"
    fontSize: "42px"
    fontWeight: 400
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "'Libertinus Serif Display', 'Libertinus Serif', Georgia, serif"
    fontSize: "22px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "'Inria Serif', Georgia, serif"
    fontSize: "20px"
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "'Inter', system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.1em"
rounded:
  pill: "24px"
  card: "16px"
  btn: "12px"
  tag: "20px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.kitchen-herb}"
    textColor: "{colors.card-surface}"
    typography: "title"
    rounded: "{rounded.btn}"
    padding: "14px 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.kitchen-herb-deep}"
    textColor: "{colors.card-surface}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.charcoal}"
    rounded: "{rounded.btn}"
    padding: "12px 20px"
  chip-single:
    backgroundColor: "transparent"
    textColor: "{colors.smoke}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "8px 12px"
  chip-single-selected:
    backgroundColor: "{colors.kitchen-herb}"
    textColor: "{colors.card-surface}"
    rounded: "{rounded.pill}"
  chip-multi:
    backgroundColor: "transparent"
    textColor: "{colors.kitchen-herb}"
    rounded: "{rounded.pill}"
    height: "40px"
    padding: "8px 16px"
  chip-multi-checked:
    backgroundColor: "{colors.kitchen-herb}"
    textColor: "{colors.card-surface}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.card-surface}"
    rounded: "{rounded.card}"
    padding: "16px"
  nav:
    backgroundColor: "{colors.card-surface}"
    rounded: "{rounded.card}"
    height: "70px"
---

# Design System: pickmeal

## 1. Overview

**Creative North Star: "The Still Counter"**

A kitchen counter the moment before cooking starts: clear, quiet, ready. Everything is exactly where it needs to be, nothing more. This design system holds that same discipline. The interface exists to make a decision disappear, not to be noticed. Calm confidence over performative motion. Material honesty over polish for its own sake.

The system is built on parchment and herb. Two surfaces, one accent, no room for decoration. The serif typography carries warmth; Inter carries precision; the two never compete. Hierarchy is established through weight and scale alone. Color does one job: confirm selection and guide action. It does not decorate.

This is explicitly not a food blog, not a delivery app, not a SaaS dashboard. There are no hero-metric blocks, no gradient accent stripes, no loading sequences that make you watch the app instead of deciding what to eat. The moment a recipe appears, the interface steps aside.

**Key Characteristics:**
- Mobile-first, single-surface layout. No sidebar, no secondary navigation.
- Parchment background with white card surfaces: depth through material contrast, not shadow weight.
- One accent color (Kitchen Herb) used exclusively for selection, confirmation, and primary action.
- Serif type for display and interactive labels; sans-serif for data and metadata.
- Motion is state-only: the chip slider animates between selections; cards scale on hover. Nothing else moves uninvited.
- Spacing varies deliberately for rhythm; equal gutters everywhere is monotony.

## 2. Colors: The Parchment Palette

A two-surface, one-accent palette. Background and card surface differ only in warmth; the accent earns its place by appearing only when confirming or directing.

### Primary
- **Kitchen Herb** (`#354d3f`, oklch(33% 0.05 147)): The single accent. Used for primary buttons, selected chip state, step-number circles, ingredient dot markers, and navigation active state. Appears on roughly 10% of any screen at rest. Never used decoratively.
- **Kitchen Herb Deep** (`#2b3f33`, oklch(27% 0.045 147)): The hover and pressed state of Kitchen Herb. Never used independently as a standalone color.

### Secondary
- **Warm Cedar** (`#5f5145`, oklch(37% 0.027 50)): Reserved exclusively for display typography: the hero headline and modal recipe titles. A warm brown that reads as structure rather than accent. Not used for interactive states, borders, or fills.

### Neutral
- **Warm Linen** (`#f4f3ee`, oklch(96% 0.006 89)): The page background. A tinted off-white leaning toward yellow-beige; never pure white. The surface on which cards float.
- **Card Surface** (`#ffffff`): Cards, modals, and the bottom nav. Pure white creates depth contrast against Warm Linen without requiring heavy shadow.
- **Charcoal** (`#1e1e1e`, oklch(14% 0.003 240)): Primary body text. Near-black with a trace of cool undertone.
- **Smoke** (`#6b6b6b`): Unselected chip labels, icon resting color, secondary copy.
- **Pebble** (`#8a8a8a`): Tertiary metadata: stat labels, empty-state text, section eyebrows.
- **Divider** (`#ebebeb`): Hairline separators inside modals and the shopping list header. Used sparingly; most layout separation comes from spacing and surface contrast.

### Named Rules
**The One Herb Rule.** Kitchen Herb (`#354d3f`) is the only color that acts. It appears on selection, confirmation, and primary action. Never on inactive elements, never as a decorative stripe, never as a gradient stop. When it appears, something changed or something needs to change. Its restraint is the signal.

**The Two-Surface Rule.** The layout has exactly two background values: Warm Linen (page) and Card Surface (elevated elements). No tertiary surface, no sidebar tint, no alternate panel color. A third background is drift.

## 3. Typography: Serif Warmth, Sans Precision

**Display Font:** Libertinus Serif Display (with Libertinus Serif, Georgia, serif as fallback)
**Label Serif:** Inria Serif (with Georgia, serif as fallback; used for interactive labels and buttons)
**UI Font:** Inter (with system-ui, sans-serif)
**Mono Font:** Courier New (monospace; used only for the shopping list pre-formatted text)

**Character:** Two distinct voices, never competing. The serifs carry the human layer: the question you're asking, the recipe name you're choosing, the button you're pressing to cook. Inter carries the informational layer: time, ingredient count, calorie value, cost tier. They do not swap roles.

### Hierarchy
- **Display** (Libertinus Serif Display, 400, 42px / 46px line-height, Warm Cedar): The page hero headline only. One instance per screen. Color is always Warm Cedar, never Charcoal.
- **Headline** (Libertinus Serif Display, 700, 22px / 1.2, Warm Cedar): Modal recipe title. One instance per modal surface.
- **Title** (Inria Serif, 400, 20px / 1.3, Charcoal): Section headings, carousel card recipe names, filter group labels (at 16px), button text.
- **Body** (Inter, 400–500, 14px / 1.6, Charcoal): Step instructions, ingredient lists, secondary copy. The mobile container naturally caps line length at 65–75ch.
- **Label** (Inter, 700, 10–11px, uppercase, letter-spacing 0.06–0.1em, Pebble): Stat labels (TEMPO, CUSTO, CALORIAS), section eyebrows. All-caps with tracked spacing; never sentence-case at this role.

### Named Rules
**The No-Role-Swap Rule.** Serifs carry human-facing content; sans-serif carries data. A button in Inria Serif is a deliberate feature. A stat value in Libertinus is always wrong. When in doubt: if a user reads it to make a decision, use serif. If a user scans it for information, use Inter.

## 4. Elevation

Depth through material contrast, not shadow weight. The page (Warm Linen) recedes; cards (white) advance; modals advance further. Shadows exist as state cues, not as decoration. All surfaces are flat at rest.

The elevation system has three distinct levels:
1. **Page**: No shadow. Warm Linen (`#f4f3ee`) flat surface.
2. **Lifted surface** (cards, filter panel, bottom nav): Ambient shadow at low opacity. Enough to separate surface from page; not enough to be noticed consciously.
3. **Overlay** (recipe detail modal, shopping modal): Stronger shadow with wider spread. Signals attention has shifted to a new layer above the page.

### Shadow Vocabulary
- **Ambient lift** (`0px 12px 18px 0px rgba(0,0,0,0.08)`): Cards, filter panel, bottom navigation at rest. The system default for any lifted surface.
- **Hover lift** (`0px 18px 28px rgba(0,0,0,0.13)`): Recipe cards on hover. A controlled upgrade, not a dramatic change.
- **Overlay depth** (`0 12px 40px rgba(0,0,0,0.18)`): Modals only. Paired with a blurred dark backdrop `rgba(20,16,8,0.5)` to reinforce the layer shift.
- **Selection lift** (`0 5px 10px 0 rgba(0,0,0,0.30)`): The chip slider indicator. Punchy and vertical; makes the selected chip feel physically above the row.

### Named Rules
**The Flat-At-Rest Rule.** No element has a permanent hero shadow at rest. Shadows respond to state: hover upgrades the shadow, overlay adds depth, selection adds a tight punch. The ambient lift (cards, nav) is the single exception: a structural signal that the surface is not the page.

## 5. Components

### Buttons

Confident, unhurried. The primary button uses Inria Serif rather than Inter; it reads as an invitation, not a command.

- **Shape:** Gently rounded (12px radius). Not pill-shaped, not square. Corners that acknowledge the touch without softening the intent.
- **Primary:** Kitchen Herb background (`#354d3f`), white text, 48px height, 24px horizontal padding. Inria Serif 16px / 400.
- **Hover:** Kitchen Herb Deep (`#2b3f33`) + `translateY(-1px)`. 150ms ease. Returns to default on active.
- **Disabled:** 50% opacity. `cursor: not-allowed`. No color shift.
- **Ghost (modal secondary):** Transparent background, 1.5px border at `rgba(53,77,63,0.3)`, Inter 14px/600, Charcoal text. On hover: border shifts to Kitchen Herb solid, faint green background fill `rgba(53,77,63,0.05)`, text shifts to Kitchen Herb.

### Chips (Single-select, with Slider)

pickmeal's signature interaction component. A row of buttons with a full-height green indicator that glides between selections. The indicator (`chip-slider`) is a positioned element behind the labels, Kitchen Herb fill, selection-lift shadow. The selected label is white; unselected labels are Smoke.

- **Container:** 40px height, transparent background, no border, pill context.
- **Slider indicator:** Kitchen Herb fill (`#354d3f`), `0 5px 10px 0 rgba(0,0,0,0.30)` shadow, `border-radius: 24px`, absolute-positioned behind labels. Transitions `left` and `width` at 250ms `cubic-bezier(0.4,0,0.2,1)`.
- **Unselected label:** Smoke text (`#6b6b6b`), Inter 14px/400. Hover: faint green tint `rgba(53,77,63,0.08)`.
- **Selected label:** White text (`#ffffff`), z-index above slider.
- **Initial state:** Transition is suppressed on first render to prevent animation from 0 position.

**The Slider-Only Rule.** Single-select state is communicated by the slider indicator alone. No check icon, no ring, no underline is added to the selected chip. The slider is the complete signal.

### Chips (Multi-select, Dietary Restrictions)

Independent toggle chips; no shared indicator. State is intrinsic to each chip.

- **Unselected:** Transparent background, 1px Kitchen Herb border (`#354d3f`), Kitchen Herb text, 40px height, 24px border-radius, 16px horizontal padding. Hover: `rgba(53,77,63,0.07)` tint.
- **Checked:** Kitchen Herb fill, white text, border-color matches fill.
- **Transition:** 150ms ease on background and color.

### Cards

The surface on which recipes appear. Behavior differs between carousel (large, centerstage) and grid (compact, scanning).

- **Corner Style:** Rounded (16px radius).
- **Background:** Card Surface (`#ffffff`).
- **Shadow:** Ambient lift at rest; hover lift on hover.
- **Border:** None.
- **Carousel card:** 80vw width on mobile (max 400px), vertical layout with image block (min 220px), name (Inria Serif 20px), and a 2x2 info grid (icon + value). Scale transform: `scale(0.87)` and 65% opacity when non-active; `scale(1)` and full opacity when active. Transition 350ms ease.
- **Grid card (favorites):** Compact. 100px emoji thumbnail, 10–13px internal padding, Inria Serif 13px/700 name, meta-tag row below.

**The No-Nested-Card Rule.** Cards never contain cards. The filter panel is a card; the chip rows inside it are not cards. If content needs grouping within a card, use a Warm Linen background tint, not a child card surface.

### Navigation (Bottom, Mobile)

Floating pill nav, position fixed, 8px from bottom, 16px from left and right edges. Two tab items flanking a center logo mark.

- **Container:** Card Surface background, 16px border-radius, ambient-lift shadow, 70px height, 11–13px padding.
- **Default item:** Transparent background, Charcoal text (Inria Serif 16px/400), Smoke icon.
- **Active item:** Kitchen Herb fill, white text, white icon (via `brightness(0) invert(1)`), 12px border-radius, 48px height. 150ms ease transition.
- **Badge:** Kitchen Herb background, white text (Inter 11px/700), pill shape. Hidden at zero count.

### Filter Panel Container

A card that changes its nature based on state. At rest (form visible): white surface, ambient shadow, 16px radius, 8–16px padding. After recipe generation: `panel-transparent` state, background, shadow, and radius all removed. The carousel appears below and the panel dissolves. This state transition is the primary scene change in the app; it must feel like a reveal, not a flicker.

### Meta Tag

A small inline label for recipe metadata on favorite-list cards. Warm Linen background (`#f4f3ee`), Smoke text (Inter 10px/600), 20px border-radius, 2px/7px padding. Appears only in compact list contexts; never inside the recipe modal (where stat boxes replace it).

## 6. Do's and Don'ts

### Do:
- **Do** use Kitchen Herb (`#354d3f`) exclusively for selection and primary action. Every appearance of this color signals that something changed or needs to change.
- **Do** use Inria Serif for buttons and interactive labels. The serif-button is deliberate; it signals a human-facing invitation rather than a command.
- **Do** keep exactly two background values: Warm Linen for the page, Card Surface (white) for elevated elements.
- **Do** reserve Warm Cedar (`#5f5145`) strictly for display typography: the hero headline and modal recipe title. Nowhere else.
- **Do** keep shadows at ambient weight for resting surfaces. The ambient lift (`0px 12px 18px 0px rgba(0,0,0,0.08)`) is the ceiling for non-interactive elements.
- **Do** use Inter for all data and metadata: times, counts, calorie values, cost indicators, stat labels. Numbers are always sans-serif.
- **Do** invert icons to white (`brightness(0) invert(1)`) when they appear on Kitchen Herb backgrounds (active nav item, selected chip, primary button icon).
- **Do** vary spacing for rhythm. The app deliberately uses different vertical gaps between sections (8px, 12px, 16px, 24px). Uniform padding everywhere is a signal that spacing was not considered.

### Don't:
- **Don't** use Kitchen Herb decoratively: no side-stripe `border-left` accents, no background washes on sections, no gradient overlays. The One Herb Rule.
- **Don't** use gradient text (`background-clip: text` with a gradient background). Ever.
- **Don't** use `border-left` or `border-right` greater than 1px as a colored accent stripe on any element.
- **Don't** create a third background surface. No sidebar tint, no secondary panel color, no alternate container shade. Two surfaces only.
- **Don't** use Libertinus Serif Display for UI labels, buttons, or data. It belongs to display hierarchy only (hero title, modal recipe title).
- **Don't** animate layout properties (`height`, `padding`, `top`, `left`). Animate `transform` and `opacity` only.
- **Don't** introduce delivery-app patterns: aggressive CTAs, countdown urgency indicators, promotional banners, progress-bar sequences that pad time.
- **Don't** introduce food-blog patterns: infinite-scroll suggestion surfaces, identical card grids with icon + heading + text repeated endlessly, author bylines.
- **Don't** introduce SaaS dashboard patterns: hero-metric blocks (large number, small label, gradient accent), feature-flag banners, modal confirmation dialogs for simple actions.
- **Don't** add modal dialogs where a toast or inline message suffices. The app already uses toasts for feedback confirmation; preserve that pattern.
- **Don't** use glassmorphism (backdrop-filter blur on decorative card surfaces). The one existing use of `backdrop-filter: blur(4px)` is on the modal overlay backdrop, which is functional (it dims and blurs the page beneath an active modal). No extensions.
