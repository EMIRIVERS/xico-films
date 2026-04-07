# Twice Clone Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replicate twicetwice.tv design for Pescadora on a parallel branch, using Pescadora's own projects.

**Architecture:** Full rewrite on `twice-redesign` branch. Next.js App Router, Lenis smooth scroll, GSAP text reveals, CSS-only animations (no Three.js). Sidebar navigation, loader, project grid with category pages, individual project pages.

**Tech Stack:** Next.js 16, Lenis, GSAP, Tailwind CSS, Inter/Space Grotesk/Playfair Display fonts

---

### Task 1: Branch setup and cleanup

**Files:**
- Modify: `package.json` (remove three, add lenis)
- Modify: `next.config.ts` (remove glsl loader)
- Delete: `src/components/canvas/*`, `src/components/ui/ParticleWordmark.tsx`, `src/components/ui/FishCursor.tsx`, `src/components/ui/Intro3D.tsx`, `src/components/ui/etheral-shadow.tsx`, `src/lib/three-utils.ts`, `src/types/glsl.d.ts`, `src/components/ui/Wordmark.tsx`
- Delete: `src/components/sections/Hero.tsx`, `src/components/sections/PortfolioHeader.tsx`, `src/components/sections/ManifestoSection.tsx`, `src/components/sections/PortfolioSection.tsx`, `src/components/sections/ProjectOverlay.tsx`, `src/components/sections/ServiciosSection.tsx`, `src/components/sections/ContactoSection.tsx`, `src/components/sections/SobreSection.tsx`, `src/components/sections/VideoSection.tsx`, `src/components/sections/FotoSection.tsx`
- Delete: `src/components/cursor/CustomCursor.tsx`
- Delete: `src/hooks/useMousePosition.ts`, `src/hooks/useScrollProgress.ts`, `src/hooks/useScrollReveal.ts`

- [ ] **Step 1:** Create branch `twice-redesign` from master
- [ ] **Step 2:** Remove Three.js and add Lenis dependency
- [ ] **Step 3:** Delete all old components, hooks, and utilities listed above
- [ ] **Step 4:** Simplify `next.config.ts` (remove glsl turbopack rule)
- [ ] **Step 5:** Commit: "chore: branch setup — remove Three.js, add Lenis"

---

### Task 2: Global styles and CSS variables

**Files:**
- Rewrite: `app/globals.css`

- [ ] **Step 1:** Rewrite `globals.css` with:
  - Tailwind import
  - Color tokens: `--bg: #080808`, `--nav-bg: #101010`, `--text-primary: #fff`, `--text-secondary: #858585`, `--text-muted: rgba(255,255,255,0.65)`
  - Easing curves: `--o1` through `--o6`, `--io1` through `--io6`, `--i1` through `--i6`
  - Sidebar layout variable: `--sidebar-w: 50px`, `--header-h: 80px`
  - Typography sizing: `--text-base: 1.1111vw` desktop, `4.07vw` mobile
  - Base resets: box-sizing, margin, padding, font-smoothing
  - Scrollbar hidden on desktop (`scrollbar-width: none`)
  - No custom cursor styles (standard cursor for this design)

- [ ] **Step 2:** Commit: "style: global CSS with Twice design tokens"

---

### Task 3: Font setup

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1:** Configure Inter, Space Grotesk, and Playfair Display via `next/font/google` in layout.tsx. Set CSS variables `--font-body`, `--font-display`, `--font-accent`.

- [ ] **Step 2:** Commit: "style: configure Inter, Space Grotesk, Playfair Display fonts"

---

### Task 4: Smooth scroll provider (Lenis)

**Files:**
- Create: `src/components/animations/SmoothScroll.tsx`

- [ ] **Step 1:** Create `SmoothScroll.tsx` — a `'use client'` component that:
  - Initializes Lenis on mount
  - Syncs with GSAP ScrollTrigger via `requestAnimationFrame` loop
  - Cleans up on unmount
  - Wraps children in a div

- [ ] **Step 2:** Commit: "feat: Lenis smooth scroll provider"

---

### Task 5: TextReveal animation component

**Files:**
- Create: `src/components/animations/TextReveal.tsx`

- [ ] **Step 1:** Create `TextReveal.tsx` — a `'use client'` component that:
  - Wraps children in `overflow: hidden` container
  - Inner element starts at `translateY(110%)`
  - Uses IntersectionObserver to trigger `translateY(0)` with `--o4` easing, `0.8s` duration
  - Accepts `delay` prop (stagger support)
  - Accepts `as` prop for element type (div, h1, p, span)

- [ ] **Step 2:** Commit: "feat: TextReveal animation component"

---

### Task 6: Sidebar navigation

**Files:**
- Create: `src/components/layout/Sidebar.tsx`

- [ ] **Step 1:** Create `Sidebar.tsx` — a `'use client'` component:
  - Fixed left, `width: var(--sidebar-w)`, `background: var(--nav-bg)`
  - Full height `100vh`
  - Logo "PESCADORA" at top, rotated `-90deg`, `transform-origin: center`
  - Nav links: Stories, Comercial, Video Clip, Fotografia, About — each rotated `-90deg`
  - All text uses `mix-blend-mode: difference`
  - Links use Next.js `Link` component
  - `z-index: 100`
  - Hidden on mobile (`display: none` below 768px)

- [ ] **Step 2:** Commit: "feat: fixed sidebar navigation"

---

### Task 7: Mobile header and menu

**Files:**
- Create: `src/components/layout/MobileHeader.tsx`
- Create: `src/components/layout/MobileMenu.tsx`

- [ ] **Step 1:** Create `MobileHeader.tsx`:
  - Fixed top bar, `height: var(--header-h)`, `background: var(--nav-bg)`
  - Logo "PESCADORA" left-aligned
  - Hamburger button (3-line SVG) right-aligned
  - Hidden on desktop (`display: none` above 768px)
  - `z-index: 100`
  - Accepts `onToggle` and `isOpen` props

- [ ] **Step 2:** Create `MobileMenu.tsx`:
  - Fullscreen overlay, `height: calc(100svh - var(--header-h))`, top offset by header
  - Background `var(--nav-bg)`
  - Nav links listed vertically, large text
  - Staggered text-reveal animation on open (translateY with delay per item)
  - `opacity: 0` / `pointer-events: none` when closed, animated to visible
  - `z-index: 99`

- [ ] **Step 3:** Commit: "feat: mobile header and fullscreen menu overlay"

---

### Task 8: Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

- [ ] **Step 1:** Create `Footer.tsx`:
  - Dark background matching `--bg`
  - "PESCADORA" logo display
  - Contact info: "Mexico" (placeholder city)
  - Navigation links mirroring sidebar
  - Minimal layout, small text, `--text-secondary` color
  - TextReveal on scroll into view

- [ ] **Step 2:** Commit: "feat: footer component"

---

### Task 9: Root layout assembly

**Files:**
- Rewrite: `app/layout.tsx`

- [ ] **Step 1:** Rewrite `app/layout.tsx`:
  - Import fonts (Inter, Space Grotesk, Playfair Display)
  - Import SmoothScroll, Sidebar, MobileHeader, MobileMenu
  - Manage mobile menu open/close state (client wrapper needed)
  - Structure: `<Sidebar />` + `<MobileHeader />` + `<MobileMenu />` + `<main>` with clip-path + `<SmoothScroll>{children}</SmoothScroll>`
  - Main content: `clip-path: inset(0 0 0 var(--sidebar-w))` on desktop, `inset(var(--header-h) 0 0 0)` on mobile
  - Metadata: title "Pescadora", description

- [ ] **Step 2:** Create `src/components/layout/LayoutShell.tsx` — client component wrapping sidebar + header + menu + children with mobile menu state

- [ ] **Step 3:** Commit: "feat: root layout with sidebar, mobile header, smooth scroll"

---

### Task 10: Loader

**Files:**
- Create: `src/components/loader/Loader.tsx`

- [ ] **Step 1:** Create `Loader.tsx` — a `'use client'` component:
  - Fullscreen fixed overlay, `z-index: 200`, `background: var(--bg)`
  - Large SVG circle centered (690px desktop, 320px mobile)
  - Circle uses `stroke-dasharray` + `stroke-dashoffset` CSS animation (draws itself over 2s)
  - "PESCADORA" text below circle with translateY reveal
  - After 2.5s: opacity fades to 0, then component unmounts (useState `visible`)
  - Uses `sessionStorage` to only show on first visit (not on route changes)

- [ ] **Step 2:** Commit: "feat: SVG circle loader with text reveal"

---

### Task 11: Project data layer

**Files:**
- Modify: `src/data/project-stories.ts`
- Modify: `src/types/media.ts`
- Create: `src/lib/projects.ts`

- [ ] **Step 1:** Add `coverImage` field to `ProjectStory` interface. Update each project entry with a cover image path (first photo from registry for photo projects, poster placeholder for videos).

- [ ] **Step 2:** Create `src/lib/projects.ts` with helper functions:
  - `getAllProjects()`: returns all projects as array
  - `getProjectsByCategory(category)`: filters by category
  - `getProjectBySlug(slug)`: single project lookup
  - `getProjectMedia(projectName)`: returns photos from registry for a project
  - `getAdjacentProjects(slug)`: returns prev/next for navigation

- [ ] **Step 3:** Commit: "feat: project data layer with helpers"

---

### Task 12: ProjectCard component

**Files:**
- Create: `src/components/projects/ProjectCard.tsx`

- [ ] **Step 1:** Create `ProjectCard.tsx`:
  - Next.js `Link` wrapping the card, links to `/project/[slug]`
  - Cover image via `next/image`, `aspect-ratio: 16/9` for video, auto for photo
  - Hover: scale 1.02 with transition
  - Title overlay at bottom with `overflow: hidden` + `translateY(100%)` on idle, `translateY(0)` on hover
  - Category label small text, `--text-secondary`

- [ ] **Step 2:** Commit: "feat: ProjectCard thumbnail component"

---

### Task 13: ProjectGrid component

**Files:**
- Create: `src/components/projects/ProjectGrid.tsx`

- [ ] **Step 1:** Create `ProjectGrid.tsx`:
  - Accepts `projects` array prop
  - CSS grid: 2 columns desktop, 1 column mobile, gap `1.25rem`
  - Maps projects to `ProjectCard`
  - Padding to account for sidebar/header offset

- [ ] **Step 2:** Commit: "feat: ProjectGrid responsive layout"

---

### Task 14: Home page

**Files:**
- Rewrite: `app/page.tsx`

- [ ] **Step 1:** Rewrite `app/page.tsx`:
  - Import Loader, ProjectGrid, Footer
  - Get all projects via `getAllProjects()`
  - Render: `<Loader />` + page title with TextReveal + `<ProjectGrid projects={all} />` + `<Footer />`

- [ ] **Step 2:** Commit: "feat: home page with loader and full project grid"

---

### Task 15: Category pages

**Files:**
- Create: `app/comercial/page.tsx`
- Create: `app/video-clip/page.tsx`
- Create: `app/fotografia/page.tsx`

- [ ] **Step 1:** Create `app/comercial/page.tsx`:
  - Page title "Comercial" with TextReveal
  - `<ProjectGrid>` filtered by `getProjectsByCategory('comercial')`
  - Footer

- [ ] **Step 2:** Create `app/video-clip/page.tsx`:
  - Same pattern, category `'video-clip'`

- [ ] **Step 3:** Create `app/fotografia/page.tsx`:
  - Same pattern, category `'fotografia'`

- [ ] **Step 4:** Commit: "feat: category pages — comercial, video-clip, fotografia"

---

### Task 16: Individual project page

**Files:**
- Create: `app/project/[slug]/page.tsx`

- [ ] **Step 1:** Create `app/project/[slug]/page.tsx`:
  - `generateStaticParams` from all project slugs
  - Hero: full-width cover image (or video poster with play icon overlay)
  - Metadata block: title (Space Grotesk bold), client, category, year, role
  - Photo gallery: vertical stack of all project photos from registry
  - Previous/Next navigation at bottom using `getAdjacentProjects()`
  - Footer
  - All text sections use TextReveal

- [ ] **Step 2:** Commit: "feat: individual project page with gallery and nav"

---

### Task 17: About page

**Files:**
- Create: `app/about/page.tsx`

- [ ] **Step 1:** Create `app/about/page.tsx`:
  - "Sobre Pescadora" heading with TextReveal
  - Description text: "Fotografia y video de campana. Mexico."
  - Minimal layout matching Twice's about page aesthetic
  - Footer

- [ ] **Step 2:** Commit: "feat: about page"

---

### Task 18: Extract video posters

**Files:**
- Create: `scripts/extract-posters.sh`

- [ ] **Step 1:** Create a script that uses ffmpeg to extract a frame at 1 second from each .mov file in the project root, saves as `.webp` in `public/media/posters/`

- [ ] **Step 2:** Run the script to generate poster images

- [ ] **Step 3:** Update `project-stories.ts` cover image paths to point to generated posters

- [ ] **Step 4:** Commit: "feat: extract video poster thumbnails"

---

### Task 19: Build verification

- [ ] **Step 1:** Run `npm run build` and fix any TypeScript or build errors
- [ ] **Step 2:** Run `npm run lint` and fix any lint issues
- [ ] **Step 3:** Visual test: `npm run dev` and verify all pages render correctly
- [ ] **Step 4:** Final commit if fixes needed
