# Retro 80s Synthwave Interactive Redesign

**Date:** 2026-01-27
**Scope:** Full UI/UX overhaul + resume data rewrite + interaction design

---

## 1. Concept

Transform the CV from a scrollable resume into an **enhanced scroll journey** through 6 distinct Synthwave "zones." Each zone has its own visual atmosphere while sharing the neon DNA. The resume content is rewritten from dry CV language to a **creative technologist** voice — blending impact with craft.

**Target audience:** Hiring managers, potential clients, developer peers (all equally).

---

## 2. Zone Structure

### Zone 1 — "Boot Sequence" (Hero)

CRT monitor boot-up animation on load. Screen flickers, scanlines intensify, then the name renders in glowing neon with a tagline. The sunset sun rises behind a wireframe cityscape. Scroll prompt pulses at the bottom.

### Zone 2 — "Signal" (About)

Cityscape transitions into a closer view. Avatar sits inside a holographic frame. Summary broken into 2-3 punchy lines that fade in on scroll. Quick stats appear as glowing dashboard gauges or counters that animate up.

### Zone 3 — "Timeline Highway" (Experience)

A neon-lit highway stretching into perspective. Each job is a "mile marker" along the road. As you scroll, the road moves and each position slides into focus with parallax depth. Companies alternate sides.

### Zone 4 — "Arcade Floor" (Projects)

The highway leads into an indoor arcade/gallery space. Projects displayed as glowing cards in a grid. Hovering reveals impact line and tech stack with a CRT flicker effect. Color-coded by ecosystem (Lini = cyan, side projects = purple, older work = pink).

### Zone 5 — "Control Deck" (Skills)

Synthwave dashboard/cockpit view. Skills visualized as equalizer bars that fill on scroll-into-view and pulse subtly when idle. Grouped by domain with animated fill.

### Zone 6 — "Transmission" (Contact)

Journey ends at a "broadcast tower." Email and socials presented as communication channels. Magnetic neon button pulses with "Send Transmission" CTA.

---

## 3. Visual Design System

### Color Palette (per-zone gradient)

| Layer         | Approach                                                                          |
| ------------- | --------------------------------------------------------------------------------- |
| Background    | Gradient shifts per zone: deep purple -> midnight blue -> dark teal as you scroll |
| Primary neons | Pink, Cyan, Purple — each zone has a dominant neon                                |
| Accent        | Warm neon orange + electric yellow for highlights and hover states                |
| Surfaces      | Frosted glass with subtle chromatic aberration at edges                           |

**Zone dominant colors:**

- Hero: Pink
- About: Cyan
- Experience: Cyan
- Projects: Purple
- Skills: Pink
- Contact: Orange/Yellow

### Typography

| Role          | Font                                        | Rationale                               |
| ------------- | ------------------------------------------- | --------------------------------------- |
| Headlines     | Orbitron or Rajdhani                        | Geometric, futuristic, distinctly retro |
| Body          | Inter                                       | Clean readability                       |
| Code/tags     | JetBrains Mono                              | Technical identity                      |
| Stats/numbers | Monospaced display with glow counter effect | Dashboard feel                          |

### Visual Effects

- **Zone transitions:** Horizontal light sweep or VHS tracking distortion at section boundaries (~300ms)
- **Parallax depth:** Foreground elements (cards, text) move at different speeds than background (grid, shapes, cityscape)
- **CRT boot on first load:** 1-2 second "power on" flicker before hero renders. Skippable. Plays once per session (sessionStorage).
- **Scroll-reactive ambient glow:** Soft radial light follows scroll position, illuminating current zone

### What stays from current design:

- Scanlines overlay
- Noise texture
- Retro grid perspective
- Cursor trail
- GlowCard mouse-follow effect

---

## 4. Resume Data Rewrite

### Identity

```
name: "Yahya Fakhroji"
tagline: "Web Technologies Engineer — One stack to build it all"
greeting: "Initializing..." -> "YAHYA FAKHROJI"
```

### Summary -> Manifesto (2-3 punchy lines)

Direction:

- "I architect digital experiences at the intersection of engineering precision and creative craft."
- "A decade of shipping — from startup MVPs to enterprise platforms serving thousands."
- "Based in Malang, Indonesia. Building for the world."

### Work Experience -> Campaign Highlights

Each role restructured to:

1. **Hook line** — one sentence selling the impact
2. **What I shipped** — 2-3 bullets blending outcome + craft
3. **Tech stack** — curated to what's impressive, not exhaustive (drop Slack, Jira, Trello, Skype)

**Equinix Metal (2020-2024):**

- Hook: "Engineered the digital layer for one of the world's largest data center companies."
- Bullets:
  - Built and maintained Staff Portal (Angular) and Customer Portal (Next.js) serving thousands of enterprise users
  - Delivered feature enhancements across cross-functional teams ensuring high availability
- Stack: TypeScript, Angular, React, Next.js, Tailwind CSS, Angular Material

**Futr Asia (2022-2024):**

- Hook: "Architected a 5-app commerce ecosystem powering Indonesia's SME digital transformation."
- Bullets:
  - Led the Lini ecosystem from concept to production — Courier, Seller, Store, Mitra apps
  - Shipped offline-first PWAs deployed as native Android apps via Capacitor
  - Mentored team and coordinated cross-app development workflows
- Stack: React, Angular, TypeScript, GraphQL, Chakra UI, Capacitor, Docker

**Packet Host (2018-2020):**

- Hook: "Modernized bare-metal cloud infrastructure portals through a ground-up framework migration."
- Bullets:
  - Migrated legacy AngularJS portals to Angular 2+, improving performance and maintainability
  - Contributed to both Staff and Customer portals for cloud infrastructure customers
- Stack: Angular, React, TypeScript, Laravel, Bootstrap

**Dinkum Interactive (2016-2018):**

- Hook: "Extended e-commerce capabilities for global clients through custom WordPress engineering."
- Bullets:
  - Developed custom WooCommerce plugins with third-party API integrations
  - Built full-stack applications using Phalcon PHP and MithrilJS
- Stack: WordPress, PHP, AngularJS, Phalcon, MithrilJS, Material UI

**Montazze Studio (2015-2016):**

- Hook: "Translated design vision into pixel-perfect digital experiences."
- Bullets:
  - Built custom WordPress themes and WooCommerce extensions
  - Focused on performance optimization and user experience
- Stack: WordPress, PHP, CSS, jQuery, Bootstrap

### Projects -> Showcase

Each project gets:

1. **Tagline** — what it is in one breath
2. **Impact line** — the "so what"
3. **Craft line** — the "how"

**Lini Ecosystem (highlight as a group):**

- Tagline: "Full-stack commerce ecosystem for Indonesia's emerging digital economy"
- Impact: "5 interconnected apps empowering SMEs to manage orders, logistics, and storefronts"
- Craft: "React + Angular hybrid architecture, real-time GraphQL, offline-first PWAs, native Android via Capacitor"

Individual Lini apps keep their cards but are visually grouped under the ecosystem banner.

**Side Projects (refreshed descriptions):**

- Keeppack: "Warehouse-as-a-service platform streamlining e-commerce fulfillment operations"
- Rosty: "End-to-end workforce automation — from scheduling to deployment"
- Kelola WMS: "Marketplace-integrated warehouse management with order fulfillment automation"
- Bonbon Merchant: "Feature-rich POS system for modern restaurant operations"
- Bonbon Customer: "Digital dining experience — table booking, ordering, split bills, payments"
- Moinves: "Mutual fund investment platform for PT Mandiri Manajemen Investasi"
- Copilot: "In-house data integration system for multi-client decision intelligence"
- MuseCRM: "SaaS ticketing and customer management platform"
- Site Survey: "Geolocation-based field survey app with cloud project management"

### Skills -> Capabilities

Grouped into narrative categories:

**Frontend Craft:**

- JavaScript, TypeScript, React/Next.js, Angular, Vue/Nuxt
- Tailwind CSS, Chakra UI, Angular Material, Ant Design, Bootstrap

**Backend Systems:**

- Node.js (Adonis, Nest), PHP (WordPress, Phalcon, Laravel)
- GraphQL, REST APIs
- MySQL, PostgreSQL

**DevOps & Tooling:**

- Git, Docker, CI/CD
- PWA, Capacitor (hybrid mobile)
- Vite, Webpack

---

## 5. Interaction & Animation Design

### Scroll-driven transitions

- Zone boundaries trigger horizontal light sweep / VHS tracking distortion (~300ms)
- Background gradient shifts smoothly between zones via `useScroll` + `useTransform`
- Retro grid perspective subtly changes angle per zone

### Per-zone interactions

| Zone             | Interaction                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------------- |
| Boot Sequence    | CRT flicker on load -> text renders char-by-char -> sunset sun rises with parallax on scroll |
| Signal           | Stats counters animate up in view. Avatar has holographic shimmer on hover                   |
| Timeline Highway | Road perspective shifts on scroll. Job cards slide in from alternating sides with depth      |
| Arcade Floor     | Cards have CRT flicker on hover. Hover reveals "insert coin" style overlay with details      |
| Control Deck     | Equalizer bars fill on scroll. Bars pulse subtly like audio levels when idle                 |
| Transmission     | Magnetic CTA with expanded pull radius. Background noise intensifies near button             |

### Micro-interactions

- Neon text flickers subtly on hover
- Tech stack tags "pop" scale on hover
- Section headings do a single glitch-frame on first appearance
- Navigation dots glow to indicate current zone

### Performance guardrails

- All animations use `transform` and `opacity` only (GPU-composited)
- `prefers-reduced-motion` disables all motion, falls back to instant transitions
- Parallax layers use `will-change: transform` sparingly
- CRT boot animation plays once per session (sessionStorage flag)

---

## 6. Navigation

### Floating zone indicator (right edge)

- Small dots/dashes glow to show current zone
- Labeled on hover only (tooltip)
- Active dot matches current zone's dominant neon color
- Connected by thin vertical line that fills as you scroll (progress bar)
- Mobile: compact vertical strip, tap-navigable

### Scroll behavior

- CSS `scroll-behavior: smooth` (no scroll-jacking or snap)
- Free scroll — zone transitions happen fluidly at boundaries
- Subtle zone name flash at top corner on zone entry, then fades

### Mobile adaptations

- Parallax reduced to simple fade-in (no parallax on touch)
- CRT boot shortened to ~0.5s
- Cards stack single-column
- Equalizer bars animate but simpler (no idle pulse)
- Cursor trail and magnetic button disabled on touch
- Zone transitions simplified to opacity crossfades

---

## 7. Technical Implementation Notes

### New dependencies to evaluate

- Retro display font (Orbitron or Rajdhani via Google Fonts / next/font)
- No new animation library needed (Motion v12 covers everything)

### Data structure changes to `resume-data.tsx`

- Add `tagline` field
- Add `greeting` field
- Add `manifestoLines` array (replacing `summary`)
- Add `hookLine` to each work entry
- Add `tagline`, `impactLine`, `craftLine` to each project
- Group skills into `{ category, label, items }` structure
- Remove non-technical items from techStack arrays (Slack, Jira, Trello, Skype)

### Component changes

- Hero: Add CRT boot sequence, update typewriter content
- About: Restructure to manifesto lines + animated stat counters
- Experience: Redesign timeline to highway metaphor with parallax
- Projects: Group Lini ecosystem, add hover overlays with impact/craft
- Skills: Replace bars with equalizer visualization, add categories
- Contact: Add "Transmission" theme, intensified CTA
- New: Zone transition component (light sweep effect)
- New: Floating zone indicator navigation
- Update: globals.css with per-zone gradient system and new effects

### Files to modify

- `src/data/resume-data.tsx` — content rewrite + structure changes
- `src/app/globals.css` — zone gradients, new effects, typography
- `src/app/page.tsx` — zone wrapper structure
- `src/components/sections/hero.tsx` — CRT boot + new content
- `src/components/sections/about.tsx` — manifesto + counters
- `src/components/sections/experience.tsx` — highway metaphor
- `src/components/sections/projects.tsx` — grouped showcase + overlays
- `src/components/sections/skills.tsx` — equalizer visualization
- `src/components/sections/contact.tsx` — transmission theme
- `tailwind.config.js` — new font, extended animations

### New files (minimal)

- `src/components/ui/zone-indicator.tsx` — floating navigation dots
- `src/components/ui/zone-transition.tsx` — section boundary effect
- `src/components/animations/crt-boot.tsx` — boot sequence animation
- `src/components/animations/stat-counter.tsx` — animated number counter

---

## 8. Implementation Phases

### Phase 1: Foundation

- Update `resume-data.tsx` with new structure and rewritten content
- Add new font (Orbitron/Rajdhani) to tailwind config and layout
- Implement per-zone background gradient system in globals.css
- Clean up tech stacks (remove non-technical items)

### Phase 2: Zone Components

- Build CRT boot sequence component
- Redesign Hero with new greeting/tagline/manifesto flow
- Redesign About with stat counters and holographic avatar
- Build zone transition effect component
- Build floating zone indicator navigation

### Phase 3: Experience & Projects

- Redesign Experience with highway/parallax metaphor
- Redesign Projects with ecosystem grouping and hover overlays
- Add impact/craft lines to project cards

### Phase 4: Skills & Contact

- Redesign Skills with equalizer bars and categories
- Redesign Contact with Transmission theme and intensified CTA
- Add micro-interactions (text flicker, tag pop, heading glitch)

### Phase 5: Polish & Performance

- Mobile adaptations (disable parallax, simplify transitions)
- Accessibility audit (reduced motion, keyboard nav, contrast)
- Performance audit (GPU-only animations, will-change management)
- Cross-browser testing
- sessionStorage for CRT boot (play once)
