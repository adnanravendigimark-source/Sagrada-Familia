---
name: Sagrada Familia Guided Tours
description: Independent guide that compares Sagrada Família tours and tickets and sends visitors to book on GetYourGuide.
colors:
  basilica-terracotta: "#bb4f2b"
  basilica-teal: "#0f5c5c"
  basilica-plum: "#4a2545"
  mosaic-gold: "#d9a441"
  gold-ochre: "#c1892c"
  gold-deep: "#a3701f"
  stone-paper: "#faf8f4"
  stone-mist: "#f5f5f4"
  stone-line: "#e7e5e4"
  stone-ink: "#241f1a"
  wordmark-navy: "#1c2438"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Cormorant Garamond, Georgia, ui-serif, serif"
    fontSize: "3.75rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Cormorant Garamond, Georgia, ui-serif, serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Cormorant Garamond, Georgia, ui-serif, serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.35
  body:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  article:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "system-ui, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    letterSpacing: "0.05em"
rounded:
  md: "12px"
  lg: "16px"
  xl: "24px"
  pill: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "24px"
  section: "64px"
  container: "72rem"
components:
  button-primary:
    backgroundColor: "{colors.basilica-terracotta}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-recommended:
    backgroundColor: "{colors.gold-ochre}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "10px 20px"
  button-hero-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.basilica-terracotta}"
    rounded: "{rounded.pill}"
    padding: "10px 24px"
  card-tour:
    backgroundColor: "{colors.white}"
    textColor: "{colors.stone-ink}"
    rounded: "{rounded.xl}"
    padding: "24px"
  callout-quick-answer:
    backgroundColor: "#c1892c0d"
    textColor: "{colors.stone-ink}"
    rounded: "{rounded.lg}"
    padding: "20px"
  chip-ribbon:
    backgroundColor: "{colors.gold-ochre}"
    textColor: "{colors.white}"
    rounded: "{rounded.pill}"
    padding: "4px 12px"
---

# Design System: Sagrada Familia Guided Tours

## Overview

**Creative North Star: "The Basilica Guidebook"**

The site reads like a well-made travel guidebook about one building: warm stone paper, confident serif headings, and colour used the way the basilica uses stained glass, in deliberate moments rather than everywhere. A visitor should feel they are being advised by an independent, calm expert, not sold to. The serif (Cormorant Garamond) carries the voice and the sense of place; a plain system sans carries every fact, price and button so information stays fast and legible.

Density is moderate. Persuasive surfaces (homepage) lead with real photography of the basilica and a plum-tinted hero, then settle into light stone sections with generous 64px vertical rhythm. Reading surfaces (guides) are calm columns with a quick answer up front. Booking actions are tactile pills that sit next to clear, attributed facts: rating source, duration and "last checked" dates.

Confirmed anti-references: this must never look like a **pushy booking site** (no countdowns, fake urgency, flashing badges, discount stickers) or a **generic SaaS template** (no purple-gradient heroes, glassmorphism everywhere, stock three-icon feature grids).

**Key Characteristics:**
- Warm stone paper background with ink-dark text, never pure black on pure white
- Serif display headings, sans-serif for facts, prices and controls
- Terracotta is the action colour; teal is the link/information colour; gold marks ratings and the recommended choice
- Rounded, tactile cards that lift slightly on hover
- Every third-party fact is attributed and dated next to where it appears

## Colors

A warm, mineral palette drawn from the basilica's stone and stained glass, with one action colour.

### Primary
- **Basilica Terracotta** (#bb4f2b; darkened from #c4552f to pass WCAG AA with white text): the action colour. Booking buttons, primary hero CTA, price emphasis in the comparison table. It is backed by a CSS variable (`--color-basilica-terracotta`) that the admin "Brand Colors" panel can override.

### Secondary
- **Stained-Glass Teal** (#0f5c5c): links inside articles, category labels, informational accents, the blog booking box tint. Also a CSS variable.

### Tertiary
- **Mosaic Gold** (#d9a441), **Gold Ochre** (#c1892c), **Gold Deep** (#a3701f): star glyphs, the "Recommended" ribbon and its button gradient (ochre → deep), quick-answer tint. Gold signals "rated" or "recommended", never an action on its own.
- **Basilica Plum** (#4a2545): hero overlay and dark atmospheric surfaces only.

### Neutral
- **Stone Paper** (#faf8f4): page background.
- **Stone Mist** (#f5f5f4): alternate section bands, table of contents box.
- **Stone Line** (#e7e5e4): dividers, card and box borders.
- **Stone Ink** (#241f1a): body text, headings; secondary text is Stone Ink at 40–70% opacity.
- **Wordmark Navy** (#1c2438): logo wordmark only.

### Named Rules
**The Stained-Glass Rule.** Colour arrives in moments. Terracotta appears only on things you can press; teal only on things that inform or link; gold only on ratings and the recommended pick. If a colour has no job on a screen, it isn't there.

**The Attributed Fact Rule.** Any rating, review count, duration, price or opening hour copied from a third party shows its source and/or "checked" date in small Stone Ink (45–55%) text right next to it.

## Typography

**Display Font:** Cormorant Garamond (with Georgia, ui-serif)
**Body Font:** system-ui (with -apple-system, sans-serif)

**Character:** An elegant, slightly literary serif for the sense of place, paired with an invisible system sans that never slows down a price, a time or a button.

### Hierarchy
- **Display** (700, 2.25rem → 3.75rem at `sm`, line-height 1.1, tight tracking): hero H1 only.
- **Headline** (700, 1.875rem, 1.2): section H2s ("Sagrada Familia Guided Tours & Tickets", "Compare & Choose").
- **Title** (600, 1rem–1.125rem, 1.35): tour card titles, sidebar and practical-info headings.
- **Body** (400, 1rem / 0.875rem in UI, 1.6): UI copy, descriptions.
- **Article** (400, 17px, 1.625): guide body text; keep line length around 65–75ch.
- **Label** (600, 0.75rem, uppercase, 0.05em tracking): eyebrows, "from", ribbons, category tags.

### Named Rules
**The Two-Voice Rule.** Serif speaks about the place; sans states the facts. Never set a price, time, button label or rating in the serif display face (the price numeral on tour cards is the one deliberate exception).

## Layout

Content sits in a centred container (max 72rem, 16px side padding, 24px from `sm`). Sections breathe with 64px vertical padding (96px for the blog teaser on large screens). The homepage tour grid is 1 → 2 (`sm`) → 3 (`lg`) columns with 24px gaps. Guide pages use a reading column plus a 20rem sidebar from `lg`; below `lg` the sidebar drops under the article. Mobile is the primary booking device: booking buttons stay full-size and thumb-reachable, and a fixed bottom bar can promote the recommended tour on small screens.

## Elevation & Depth

Hybrid: surfaces are flat with soft resting shadows (`shadow-sm`), and depth is a response to interaction. Tour cards lift (translate -4px) and gain a large soft shadow on hover. The hero uses a plum gradient overlay and a translucent glass rating card, the only blur in the system. The mobile sticky bar casts an upward shadow so it reads as floating above content.

### Named Rules
**The Lift-On-Intent Rule.** Shadows grow only when a visitor points at something they can act on. Static information never floats.

## Shapes

Generous, friendly curves: 24px on tour cards, 16px on content boxes (quick answer, booking box, table of contents, comparison table frame), 12px on inline images and thumbnails, full pills on every button, chip and rating badge. Borders are hairlines in Stone Line or a tinted version of the box's accent (teal at 20%, gold at 25%).

## Components

### Buttons
- **Shape:** full pill (9999px).
- **Primary:** Basilica Terracotta, white 14px semibold text, 10px × 20px; hover darkens to 90% and deepens the shadow.
- **Recommended:** Gold Ochre → Gold Deep gradient, white text; only on the recommended tour.
- **Hero ghost:** transparent with a 40% white border on the plum hero.
- **Outline:** white fill, 2px terracotta border and text (e.g. "View All Articles"); fills terracotta on hover.
- **Labels:** say what happens next ("Check dates", "See tower options"), never "Click here".

### Chips
- **Ribbon:** Gold Ochre → Gold Deep pill, white uppercase 12px label with a ★, top-left over card images ("Recommended", "Best Views").
- **Rating badge:** white 95% pill over the image bottom-left: "4.7★ · 4,850 reviews on GetYourGuide".

### Cards / Containers
- **Tour card:** white, 24px radius, hairline border (gold 2px when recommended), 4:3 image, 24px padding, footer pinned to the bottom with "from" label, price and pill button; a small "checked" note sits above the footer.
- **Content boxes:** 16px radius, tinted backgrounds (teal 5% for booking boxes, gold 5% for Quick Answer, Stone Mist for the table of contents).
- **Shadow strategy:** see Elevation & Depth.

### Inputs / Fields
Public site has one form (Contact). Admin UI is out of scope for this document.

### Navigation
Light header on Stone Paper with the logo lockup, plain text links and a terracotta "Book a Tour" pill on desktop; a menu button opens the mobile nav. Breadcrumbs are 12px Stone Ink at 50% with the current page in 70%.

### Quick Answer (signature)
A gold-tinted 16px box with a lightbulb glyph that opens every guide: the answer first, then the booking box, then the collapsible table of contents.

## Do's and Don'ts

### Do:
- **Do** keep booking buttons terracotta pills with specific labels, and put the affiliate note directly under booking groups.
- **Do** show rating source and checked dates next to every third-party fact (The Attributed Fact Rule).
- **Do** use Cormorant Garamond for headings and the system sans for facts, prices and controls.
- **Do** use real photographs of the basilica, with descriptive alt text, served through the image optimizer.
- **Do** keep sections on Stone Paper / Stone Mist with 64px vertical rhythm.

### Don't:
- **Don't** add countdown timers, "only X left", "best price" stamps, flashing or animated urgency badges, or struck-through prices you can't verify.
- **Don't** use purple-gradient heroes beyond the existing plum photo overlay, glassmorphism beyond the hero rating card, or generic three-icon feature grids.
- **Don't** put ratings or reviews into structured data; they belong to the booking provider.
- **Don't** introduce a new accent colour; extend with tints of terracotta, teal, gold or plum.
