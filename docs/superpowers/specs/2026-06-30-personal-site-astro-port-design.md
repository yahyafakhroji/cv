# Personal Site — Astro Port Design Spec

**Date:** 2026-06-30
**Author:** Yahya Fakhroji (with Claude)
**Status:** Approved for planning

## 1. Goal

Convert the Claude Design prototype `SiteTimeline.dc.html` into a production-grade
personal site:

- **Astro 7** (static output) + **Tailwind v4** + **TypeScript**
- **Responsive** across 320 / 375 / 768 / 1024 / 1440 / 1920
- **Professional SEO** — the current hiyahya.dev SEO is weak; this rebuild fixes it
- **Content lives in data files** (Astro Content Collections, Zod-validated) so editing
  the site means editing JSON, never markup
- **Faithful 1:1 visual port** — all motion and styling preserved
- **Latest dependency versions** throughout

Single page only (the timeline). Structure stays open so other pages can be added later,
but none are in scope now.

## 2. Source of truth

The prototype bundle lives at `personal-site-with-animations/project/`. During
implementation it is relocated to `design-reference/` (kept in-repo for reference, not
shipped). Key files:

- `SiteTimeline.dc.html` — the page being ported (hero, about, skills, experience,
  projects, contact, footer)
- `cv-data.js` — the `CV` content object (already cleanly structured)
- `support.js` — Claude Design runtime (NOT ported; replaced by Astro)

## 3. Tech stack (pinned latest)

| Package | Version | Purpose |
|---|---|---|
| astro | 7.0.3 | framework, static build |
| tailwindcss + @tailwindcss/vite | 4.3.2 | CSS-first styling (`@theme`) |
| typescript | 6.0.3 | types |
| @astrojs/sitemap | 3.7.3 | sitemap generation |
| @astrojs/check | 0.9.9 | `astro check` type validation |
| @fontsource/bricolage-grotesque | 5.2.10 | self-hosted display font |
| @fontsource/hanken-grotesk | 5.2.8 | self-hosted body font |

Package manager: **Bun**. Output: `static`. No SSR adapter, no React/island runtime —
interactions are plain TS modules (progressive enhancement).

> Versions are pinned to "latest at build time." If a newer minor/patch exists when we
> install, we take it and note it.

## 4. Project structure

```
personal-site/
├─ astro.config.mjs            # tailwind vite plugin, sitemap, site url
├─ tsconfig.json               # strict
├─ package.json
├─ design-reference/           # original prototype bundle (not shipped)
├─ docs/superpowers/specs/     # this spec + plan
├─ public/
│  ├─ robots.txt
│  ├─ favicon.svg
│  ├─ og/og-image.png          # 1200x630 social card
│  └─ Yahya_Fakhroji_CV.pdf    # from the bundle
├─ src/
│  ├─ content.config.ts        # Zod schemas — the type-safe data contract
│  ├─ content/
│  │  ├─ profile.json          # singleton profile/hero/about data
│  │  ├─ skills.json           # capability rows
│  │  ├─ experience/           # ONE json per job; filename prefix = order
│  │  │  ├─ 01-datum.json
│  │  │  └─ … (7 total)
│  │  └─ projects.json         # grouped project cards
│  ├─ data/
│  │  └─ site.ts               # SEO/site config (url, titles, OG, socials)
│  ├─ layouts/
│  │  └─ BaseLayout.astro      # <html>, head, fonts, tokens, slot
│  ├─ components/
│  │  ├─ seo/Seo.astro         # meta + OG + Twitter + JSON-LD
│  │  ├─ layout/SectionHeader.astro  # the "01 / Profile ——" row
│  │  ├─ layout/Footer.astro
│  │  ├─ hero/Hero.astro
│  │  ├─ about/About.astro
│  │  ├─ skills/Skills.astro
│  │  ├─ experience/Experience.astro
│  │  ├─ projects/Projects.astro
│  │  └─ contact/Contact.astro
│  ├─ scripts/                 # vanilla TS, loaded per-component
│  │  ├─ spotlight.ts          # cursor dot-grid mask (--mx/--my)
│  │  ├─ magnetic.ts           # pointer-pull links
│  │  ├─ reveal.ts             # IntersectionObserver fade-up
│  │  ├─ scramble.ts           # discipline text cycling
│  │  ├─ heroEntrance.ts       # letter-by-letter stagger
│  │  └─ experienceScrollSpy.ts# sticky panel sync + progress bar
│  ├─ styles/
│  │  ├─ tokens.css            # @theme: colors, type scale, easing, durations
│  │  └─ global.css            # base, selection, dot-grid layers, keyframes
│  └─ pages/
│     └─ index.astro           # composes all sections
```

## 5. Content model (Zod schemas)

Defined in `src/content.config.ts`. Build fails on a bad field — that is the safety rail.

**profile** (singleton, `profile.json`)
```
name: string
role: string
disciplines: string[]          # scramble cycle: Web/Mobile/Desktop/Backend
location: string
email: string
available: boolean
lead: string                   # hero sub-paragraph
profile: string                # about paragraph
facts: { k: string, v: string }[]
links: {
  site:     { label, href }
  github:   { label, href }
  linkedin: { label, href }
}
```

**skills** (`skills.json`)
```
[{ label: string, items: string }]
```

**experience** (collection, `experience/*.json`, ordered by filename prefix)
```
{ company, role, location, period, year, current?: boolean, summary, bullets: string[] }
```

**projects** (`projects.json`)
```
[{ label: string, items: { name, period, desc, stack }[] }]
```

Note: the prototype's `CV.openSource[]` is **not rendered** by the timeline layout; it is
omitted to stay faithful. (Can be added later if desired.)

### Editing model
- Change hero lead / about / facts / links → `profile.json`
- Add or reorder a job → add/rename a file in `experience/`
- Add a project → `projects.json`
- Site title / description / OG image / domain → `src/data/site.ts`

## 6. Visual system (ported verbatim)

Tailwind v4 `@theme` tokens in `tokens.css`:

| Token | Value |
|---|---|
| `--color-paper` | `#F1F1ED` |
| `--color-ink` | `#17181B` |
| `--color-muted` | `#6B6E76` |
| `--color-line` | `#DCDBD4` |
| `--color-accent` | `#2B43C7` (default; palette also has `#1F6F4F`, `#B83A2E`, `#5A3CC4`) |
| display font | Bricolage Grotesque |
| body font | Hanken Grotesk |

Fluid type/space via `clamp()` exactly as the prototype (hero `clamp(54px,12vw,158px)`,
etc.). Inline prototype styles become Tailwind utilities + a few token-driven custom
classes where utilities are awkward (dot-grid layers, masked spotlight).

## 7. Interaction port

Each prototype `DCLogic` behavior → one TS module. All gate on
`prefers-reduced-motion: reduce` and degrade to the visible base state (no JS = no broken
layout, no hidden content).

| Module | Behavior | Notes |
|---|---|---|
| `spotlight.ts` | cursor-reactive dot-grid mask | pointer-only; sets `--mx/--my` |
| `magnetic.ts` | links pull toward cursor | hero + contact links |
| `reveal.ts` | fade-up on scroll | IntersectionObserver, unobserve after |
| `scramble.ts` | discipline word cycling | from `profile.disciplines` |
| `heroEntrance.ts` | letter stagger + fades | runs once on load |
| `experienceScrollSpy.ts` | sticky chapter panel + progress bar | sticky ≥860px, static below; scroll-spy picks active job |

The experience scroll-spy is the one stateful piece: a vanilla module reads the rendered
job cards, tracks the active index against a fixed reading line, and updates the pinned
panel (year/company/role/summary) + progress bar. No framework needed — Astro renders the
markup, the script wires behavior.

## 8. SEO (the headline objective)

`Seo.astro`, fed by `src/data/site.ts` + `profile.json`:

- `<title>`, meta description, `<link rel=canonical>`, `lang="en"`, `theme-color` `#F1F1ED`
- **Open Graph:** `og:type=profile`, title, description, url, `og:image` (1200x630)
- **Twitter:** `summary_large_image`
- **JSON-LD:** `Person` + `ProfilePage` — `name`, `jobTitle`, `url`, `email`,
  `image` (GitHub avatar), `address` (Malang, ID), `sameAs` (GitHub, LinkedIn),
  `knowsAbout` (skills), `worksFor`/`alumniOf` from experience
- **`@astrojs/sitemap`** → sitemap-index.xml; **`robots.txt`** allowing all + sitemap ref
- Self-hosted fonts via Fontsource with `<link rel=preload>` on the critical weights,
  `font-display: swap`
- Semantic landmarks (`header`/`main`/`section[aria-labelledby]`/`footer`) — mostly
  already present in the prototype
- Per-image explicit `width`/`height`; descriptive `alt`

### Images
- **Profile / JSON-LD image:** GitHub avatar (`github.com/yahyafakhroji`) downloaded into
  `public/` (path-stable, not hotlinked).
- **OG card:** 1200x630 generated to match the paper/accent brand (or grabbed from
  hiyahya.dev if a suitable one exists), stored at `public/og/og-image.png`.
- **Favicon:** brand mark (accent dot / monogram) as `favicon.svg`.

## 9. Accessibility & performance

- Reduced-motion honored everywhere; visible focus rings; AA contrast (paper/ink passes)
- Static HTML, Astro inlines critical CSS, near-zero render-blocking
- JS budget: microsite target < 80kb (we expect far less — a handful of tiny modules)
- Targets: LCP < 2.5s, CLS < 0.1, INP < 200ms

## 10. Tooling & verification

- `bun run build` + `astro check` must pass clean
- Responsive screenshots at the breakpoints above (Playwright)
- Reduced-motion sanity check
- Lighthouse pass on the built page (SEO/perf/a11y)

## 11. Out of scope

- Additional pages (about/blog/projects index)
- Headless CMS
- `openSource` section
- Contact form backend (contact is a `mailto:` CTA, as designed)

## 12. Open / deferred decisions

- Final OG image art direction — start from brand tokens; refine if you have a preferred image.
- Accent default stays `#2B43C7` (the prototype's CSS base). Palette tokens kept available.
