# hiyahya.dev — Personal Site

Production rebuild of the `SiteTimeline` design as a fast, SEO-strong, content-driven
static site. Single page: hero · profile · capabilities · experience (sticky scroll-spy)
· projects · contact.

**Lighthouse:** Performance 99 · Accessibility 100 · SEO 100 · Best Practices 100.

## Stack

- **Astro 7** (static output) — zero JS shipped except a few tiny inlined interaction modules
- **Tailwind v4** (CSS-first `@theme` tokens, `@tailwindcss/vite`)
- **TypeScript** + **Astro Content Collections** (Zod-validated content)
- **Bun** (package manager, test runner)
- Self-hosted fonts via **Fontsource** (Bricolage Grotesque + Hanken Grotesk)
- `@astrojs/sitemap`

## Commands

```bash
bun install        # install dependencies
bun run dev        # dev server (http://localhost:4321)
bun run build      # production build -> dist/
bun run preview    # serve the production build
bun run check      # astro check (type + template diagnostics)
bun test           # unit tests (content + SEO helpers)
```

## Editing content — no markup changes needed

All site content lives in `src/content/`, validated against schemas in
`src/content.config.ts` (a bad field fails the build):

| Edit this | To change |
|---|---|
| `src/content/profile.json` | name, role, disciplines, hero lead, about paragraph, facts, email, social links, availability |
| `src/content/skills.json` | the capability rows |
| `src/content/experience/NN-*.json` | a job. **Add a job** = add a file; the numeric filename prefix sets order (`01-` = newest at top) |
| `src/content/projects.json` | project groups and cards |

SEO/site config (domain, title, description, OG image, social handle) lives in
`src/data/site.ts`. The OG card is `public/og/og-image.png`; the avatar (used in
JSON-LD) is `public/img/avatar.png`.

## SEO

Centralized in `src/components/seo/Seo.astro`: title, description, canonical, theme-color,
Open Graph (`profile`), Twitter `summary_large_image`, and JSON-LD (`Person` +
`ProfilePage` with `sameAs`, `knowsAbout`, `address`, `jobTitle`). Plus `sitemap-index.xml`
and `robots.txt`.

## Architecture notes

- Sections are markup-only `.astro` components in `src/components/<section>/`.
- Interactions are framework-free TS modules in `src/scripts/` (spotlight, magnetic,
  reveal, scramble, hero entrance, experience scroll-spy), wired once from `index.astro`.
  All respect `prefers-reduced-motion` and degrade to a fully visible base state.
- Design tokens in `src/styles/tokens.css`; base/keyframes/dot-grid in `global.css`.
- The original Claude Design prototype is kept under `design-reference/` (not shipped).

## Deploy

`bun run build` emits a fully static `dist/`. Deploy to any static host — Netlify,
Vercel, Cloudflare Pages, GitHub Pages, or S3. No server or adapter required. If the
domain changes, update `site` in `astro.config.mjs` and `SITE.url` in `src/data/site.ts`.
