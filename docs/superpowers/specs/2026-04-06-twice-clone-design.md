# Pescadora — Twice Clone Redesign

## Overview

Replicate the design of [twicetwice.tv](https://www.twicetwice.tv/) for Pescadora's portfolio, swapping Twice's projects for Pescadora's own video and photography work. Built on a parallel branch `twice-redesign` to preserve the current particle-fish design on `master`.

## Target Reference

- **Site:** twicetwice.tv (Paris/Oslo production agency)
- **Stack:** Nuxt + Sanity CMS + Vimeo + Lenis smooth scroll
- **Aesthetic:** Dark luxury minimalism, sidebar navigation, text-reveal animations, video-centric grid

## Architecture

### Stack

- Next.js 16 App Router (existing)
- Lenis (smooth scroll — new dependency)
- GSAP (text reveal animations — existing)
- CSS variables for easing curves
- No Three.js, no WebGL canvas, no particle effects

### Routes

| Route | Content |
|---|---|
| `/` | Loader + full project grid (all categories) |
| `/comercial` | Filtered: commercial videos only |
| `/video-clip` | Filtered: videoclips only |
| `/fotografia` | Filtered: photo projects only |
| `/about` | About Pescadora |
| `/project/[slug]` | Individual project page |

### Data

Reuse existing `media_registry.json` and `project-stories.ts`. Extend `ProjectStory` type to include a `coverImage` field for thumbnail posters extracted from .mov files.

Videos will eventually be hosted on Vimeo. Until then, show poster thumbnails with a play icon overlay.

## Layout

### Desktop (>=768px)

```
+--------+--------------------------------------------+
| SIDEBAR|                                            |
| 50px   |          MAIN CONTENT                      |
| fixed  |          clip-path: inset(0 0 0 50px)      |
|        |                                            |
| P      |                                            |
| E      |          Smooth scroll (Lenis)             |
| S      |                                            |
| C      |                                            |
| A      |                                            |
| D      |                                            |
| O      |                                            |
| R      |                                            |
| A      |                                            |
|        |                                            |
| nav    |                                            |
| links  |                                            |
| rotated|                                            |
| -90deg |                                            |
+--------+--------------------------------------------+
```

- Sidebar: fixed left, `width: 50px`, `background: #101010`
- Logo "PESCADORA" at top, rotated -90deg
- Nav links: Stories, Comercial, Video Clip, Fotografia, About (rotated -90deg)
- `mix-blend-mode: difference` on all sidebar text
- Main content offset via `clip-path: inset(0 0 0 50px)`

### Mobile (<768px)

- Sidebar becomes top header bar, `height: 80px`
- Hamburger menu icon (SVG, ~56px)
- Menu overlay: fullscreen, `calc(100svh - 80px)`, staggered text-reveal animations
- Content clip-path: `inset(80px 0 0 0)`

## Loader

1. Large SVG circle (centered, ~690px desktop / 320px mobile)
2. `stroke-dasharray` animation — circle draws itself
3. "PESCADORA" text with `translateY(110%)` reveal animation
4. Duration: ~2.5s
5. Opacity fade-out, then `display: none` / unmount
6. Runs only on initial page load (not on route changes)

## Project Grid

### Thumbnail Card

- Cover image (poster extracted from .mov, or first photo from photo project)
- Aspect ratio: 16:9 for video, varies for photo
- On hover:
  - Slight scale (1.02)
  - Title reveals with `translateY` from below (overflow hidden mask)
- Links to `/project/[slug]`

### Grid Layout

- Responsive CSS grid
- Desktop: 2 columns with gap
- Mobile: 1 column

### Category Pages

Each category route (`/comercial`, `/video-clip`, `/fotografia`) renders the same grid component filtered by category. No client-side filtering — each is a separate page.

## Project Page (`/project/[slug]`)

1. **Hero:** Full-width video embed (Vimeo iframe, or poster with play overlay as placeholder)
2. **Metadata block:**
   - Title (large, display font)
   - Client
   - Category
   - Year
   - Role
3. **Gallery:** If the project has multiple photos (from `media_registry.json`), display them in a vertical masonry-style layout below
4. **Navigation:** Previous/Next project links at bottom

## Animation System

### Easing Curves (CSS Variables)

```css
:root {
  /* Out curves */
  --o1: cubic-bezier(.65, 1, .9, 1);
  --o2: cubic-bezier(.5, 1, .89, 1);
  --o3: cubic-bezier(.33, 1, .68, 1);
  --o4: cubic-bezier(.22, 1, .36, 1);
  --o5: cubic-bezier(.16, 1, .3, 1);
  --o6: cubic-bezier(.05, .7, .1, 1);

  /* In-Out curves */
  --io1: cubic-bezier(.37, 0, .63, 1);
  --io2: cubic-bezier(.45, .05, .55, .95);
  --io3: cubic-bezier(.65, 0, .35, 1);
  --io4: cubic-bezier(.76, 0, .24, 1);
  --io5: cubic-bezier(.83, 0, .17, 1);
  --io6: cubic-bezier(.87, 0, .13, 1);

  /* In curves */
  --i1: cubic-bezier(.12, 0, .39, 0);
  --i2: cubic-bezier(.11, 0, .5, 0);
  --i3: cubic-bezier(.32, 0, .67, 0);
  --i4: cubic-bezier(.64, 0, .78, 0);
  --i5: cubic-bezier(.7, 0, .84, 0);
  --i6: cubic-bezier(.9, 0, .1, .3);
}
```

### Text Reveal

```
Container: overflow: hidden
  Child: transform: translateY(110%)
  On viewport enter (IntersectionObserver or GSAP ScrollTrigger):
    Child: transform: translateY(0), transition with --o4, duration 0.8s
```

### Smooth Scroll

- Lenis instance on the main content area
- GSAP ScrollTrigger integrated with Lenis RAF loop

## Visual Style

### Colors

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#080808` | Page background |
| `--nav-bg` | `#101010` | Sidebar background |
| `--text-primary` | `#ffffff` | Headings, body |
| `--text-secondary` | `#858585` | Metadata, captions |
| `--text-muted` | `rgba(255,255,255,0.65)` | Hover states |

### Typography

| Role | Font | Weight | Fallback for |
|---|---|---|---|
| Body / UI | Inter | 400, 600 | BL Melody |
| Display / Headings | Space Grotesk | 700, 800 | HK Grotesk |
| Accent / Italic | Playfair Display | 300 italic | Times Now |

### Sizing

- Desktop base: `1.1111vw` (~16px at 1440px)
- Mobile base: `4.07vw` (~16px at 393px)
- Viewport-responsive scaling throughout

## File Structure (new components)

```
src/
  components/
    layout/
      Sidebar.tsx          # Fixed sidebar navigation
      MobileHeader.tsx     # Mobile top bar + hamburger
      MobileMenu.tsx       # Fullscreen overlay menu
      Footer.tsx           # Contact info + nav links
    loader/
      Loader.tsx           # SVG circle + text reveal loader
    projects/
      ProjectGrid.tsx      # Responsive thumbnail grid
      ProjectCard.tsx      # Individual thumbnail card
      ProjectPage.tsx      # Full project view
    animations/
      TextReveal.tsx       # Reusable text reveal wrapper
      SmoothScroll.tsx     # Lenis provider
  styles/
    globals.css            # CSS variables, easing curves, base styles
  data/
    project-stories.ts     # Extended with coverImage field
app/
  layout.tsx               # Sidebar + SmoothScroll provider
  page.tsx                 # Home: Loader + ProjectGrid (all)
  comercial/page.tsx       # ProjectGrid filtered
  video-clip/page.tsx      # ProjectGrid filtered
  fotografia/page.tsx      # ProjectGrid filtered
  about/page.tsx           # About Pescadora
  project/[slug]/page.tsx  # Individual project
```

## New Dependencies

- `lenis` — smooth scroll (MIT license)
- No other new dependencies. GSAP and framer-motion already in project.

## What Gets Removed (on this branch)

- `WebGLCanvas.tsx`, `PhotoPlane.tsx`, `RadialGallery.tsx` — Three.js components
- `ParticleWordmark.tsx`, `FishCursor.tsx`, `Intro3D.tsx` — particle/3D effects
- `three-utils.ts`, `glsl.d.ts` — Three.js utilities
- `three` dependency (on this branch only)

## Content Mapping

### Twice -> Pescadora

| Twice | Pescadora |
|---|---|
| Commercials | Comercial |
| Personal Work | Video Clip |
| (n/a) | Fotografia |
| Stories (all) | Home (all) |
| Paris / Oslo | Ciudad de contacto |
| "TWICE" branding | "PESCADORA" branding |

### Projects (15 videos + 11 photo projects)

**Videos (from media_registry.json):**
- NOMA MEZCAL (comercial)
- TIERRA JIASU (comercial)
- CONADE C2 (comercial)
- AMOR DE VASO (comercial)
- ITSCO (comercial)
- LUCKY STASH (comercial)
- COMO FUEGO LENTO (video-clip)
- HIPNOTIZADO (video-clip)
- COTORREO + CACAO (podcast)

**Photo projects:**
- AHI NO MAS QUEDO, ALT, DRINKS, ESTUDIO, GAC, hoyo 19, itsco, nascar, PAISAJE, RIMAN, TONIC

## Pre-requisites

1. Extract poster frames from .mov files (ffmpeg, first frame or midpoint)
2. Convert posters to .webp for web optimization
3. Decide on contact info for footer (city, address, email/phone)
