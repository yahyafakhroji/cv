# Personal Site — Astro Port Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Port the Claude Design `SiteTimeline.dc.html` prototype into a production-grade, SEO-strong, content-driven Astro static site.

**Architecture:** Astro 7 static site. All content lives in Zod-validated Content Collections (`src/content/`). The page is composed of section components that read content at build time. The prototype's vanilla `DCLogic` interactions are ported 1:1 into small standalone TS modules loaded per component, all gated on `prefers-reduced-motion` and degrading to a visible base state. SEO is centralized in one `Seo.astro` fed by a typed `site.ts` config plus profile content.

**Tech Stack:** Astro 7.0.3, Tailwind v4.3.2 (`@tailwindcss/vite`, CSS-first `@theme`), TypeScript 6.0.3, `@astrojs/sitemap` 3.7.3, `@astrojs/check` 0.9.9, Fontsource (Bricolage Grotesque 5.2.10 + Hanken Grotesk 5.2.8), Bun (package manager + test runner).

## Global Constraints

- **Package manager:** Bun. Install with `bun add` / `bun add -d`. Run scripts with `bun run`.
- **Dependency versions:** install the latest published version of every package; do not downgrade. Versions above are floors.
- **Output:** `output: 'static'`. No SSR adapter, no React/island runtime.
- **Site URL:** `https://hiyahya.dev` (canonical, sitemap, OG, JSON-LD).
- **No framework for interactions:** plain `.ts` modules only. JS budget < 80kb.
- **Reduced motion:** every animation must no-op (or settle to final visible state) under `prefers-reduced-motion: reduce`. No content may be hidden when JS is off or motion is reduced.
- **Brand tokens (exact):** paper `#F1F1ED`, ink `#17181B`, muted `#6B6E76`, line `#DCDBD4`, accent `#2B43C7`. Fonts: Bricolage Grotesque (display), Hanken Grotesk (body).
- **Source of pixel truth:** `design-reference/project/SiteTimeline.dc.html` and `cv-data.js`. When markup detail is ambiguous, match that file.
- **Every task ends green:** `bun run build` and `bunx astro check` must pass before each commit from Task 2 onward.
- **Commit style:** conventional commits (`feat:`, `chore:`, `test:`, `docs:`, `style:`).

---

## File Structure

| File | Responsibility |
|---|---|
| `astro.config.mjs` | site url, static output, tailwind + sitemap |
| `tsconfig.json` | strict TS, path alias `@/*` → `src/*` |
| `src/styles/tokens.css` | `@theme` tokens (colors, fonts) |
| `src/styles/global.css` | base reset, selection, dot-grid layers, keyframes |
| `src/content.config.ts` | Zod schemas + collections |
| `src/content/profile.json` | profile/hero/about singleton |
| `src/content/skills.json` | capability rows |
| `src/content/experience/NN-*.json` | one job per file |
| `src/content/projects.json` | grouped project cards |
| `src/data/site.ts` | site/SEO config constants |
| `src/lib/seo.ts` | pure `buildJsonLd()` helper (unit-tested) |
| `src/lib/content.ts` | pure `sortExperience()` helper (unit-tested) |
| `src/components/seo/Seo.astro` | meta + OG + Twitter + JSON-LD |
| `src/layouts/BaseLayout.astro` | html shell, head, fonts, slot |
| `src/components/layout/SectionHeader.astro` | "01 / Profile ——" header row |
| `src/components/layout/Footer.astro` | footer |
| `src/components/hero/Hero.astro` | hero section |
| `src/components/about/About.astro` | about/profile section |
| `src/components/skills/Skills.astro` | skills section |
| `src/components/experience/Experience.astro` | experience section (sticky scroll-spy) |
| `src/components/projects/Projects.astro` | projects section |
| `src/components/contact/Contact.astro` | contact section |
| `src/scripts/spotlight.ts` | cursor dot-grid mask |
| `src/scripts/magnetic.ts` | pointer-pull links |
| `src/scripts/reveal.ts` | IntersectionObserver fade-up |
| `src/scripts/scramble.ts` | discipline word cycling |
| `src/scripts/heroEntrance.ts` | letter stagger entrance |
| `src/scripts/experienceScrollSpy.ts` | sticky panel + progress bar |
| `src/pages/index.astro` | composes the page |
| `public/robots.txt`, `public/favicon.svg`, `public/og/og-image.png`, `public/Yahya_Fakhroji_CV.pdf` | static assets |

---

## Task 1: Scaffold project + relocate prototype

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/tokens.css`, `src/styles/global.css`, `src/layouts/BaseLayout.astro`, `src/pages/index.astro`
- Move: `personal-site-with-animations/` → `design-reference/`

**Interfaces:**
- Produces: `BaseLayout.astro` with props `{ title?: string }` and a default `<slot/>`; global token classes `text-ink bg-paper`, font families `font-display` / `font-body`.

- [ ] **Step 1: Relocate the prototype bundle**

```bash
git mv personal-site-with-animations design-reference
```

- [ ] **Step 2: Init package.json and install deps (latest)**

```bash
bun init -y
bun add astro
bun add -d @astrojs/check typescript @astrojs/sitemap @tailwindcss/vite tailwindcss
bun add @fontsource/bricolage-grotesque @fontsource/hanken-grotesk
```

Then set `package.json` `"scripts"` to:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

Remove any `"main"`/`"module"` entry-point keys `bun init` added.

- [ ] **Step 3: Write `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://hiyahya.dev',
  output: 'static',
  integrations: [sitemap()],
  vite: { plugins: [tailwindcss()] },
});
```

- [ ] **Step 4: Write `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "design-reference"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

- [ ] **Step 5: Write `src/styles/tokens.css`**

```css
@import 'tailwindcss';

@theme {
  --color-paper: #F1F1ED;
  --color-ink: #17181B;
  --color-muted: #6B6E76;
  --color-line: #DCDBD4;
  --color-accent: #2B43C7;

  --font-display: 'Bricolage Grotesque', sans-serif;
  --font-body: 'Hanken Grotesk', system-ui, -apple-system, sans-serif;

  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
}
```

- [ ] **Step 6: Write `src/styles/global.css`**

```css
@import './tokens.css';
@import '@fontsource/bricolage-grotesque/index.css';
@import '@fontsource/hanken-grotesk/400.css';
@import '@fontsource/hanken-grotesk/500.css';
@import '@fontsource/hanken-grotesk/600.css';
@import '@fontsource/hanken-grotesk/700.css';

* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; background: var(--color-paper); overflow-anchor: none; }
body { color: var(--color-ink); font-family: var(--font-body); -webkit-font-smoothing: antialiased; overflow-x: clip; }
::selection { background: var(--color-accent); color: var(--color-paper); }

/* Hero "Available" pulse */
@keyframes tl-pulse {
  0%   { box-shadow: 0 0 0 0 rgba(43,67,199,0.45); }
  70%  { box-shadow: 0 0 0 7px rgba(43,67,199,0); }
  100% { box-shadow: 0 0 0 0 rgba(43,67,199,0); }
}

/* Fixed dot-grid base + accent spotlight layers (ported from prototype lines 23-24) */
.dotgrid-base, .dotgrid-spot { position: fixed; inset: 0; z-index: 0; pointer-events: none; }
.dotgrid-base { background-image: radial-gradient(circle, rgba(23,24,27,0.055) 1.1px, transparent 1.7px); background-size: 27px 27px; }
.dotgrid-spot {
  background-image: radial-gradient(circle, rgba(43,67,199,0.4) 1.4px, transparent 2px);
  background-size: 27px 27px;
  -webkit-mask-image: radial-gradient(240px circle at var(--mx,50vw) var(--my,42vh), #000 0%, rgba(0,0,0,0.26) 52%, transparent 76%);
  mask-image: radial-gradient(240px circle at var(--mx,50vw) var(--my,42vh), #000 0%, rgba(0,0,0,0.26) 52%, transparent 76%);
}

@media (prefers-reduced-motion: reduce) {
  .dotgrid-spot { display: none; }
}
```

- [ ] **Step 7: Write `src/layouts/BaseLayout.astro`**

```astro
---
import '@/styles/global.css';
interface Props { title?: string }
const { title = 'Yahya Fakhroji' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
  </head>
  <body>
    <div id="top" style="position:relative;min-height:100vh;width:100%" data-root>
      <div aria-hidden="true" class="dotgrid-base"></div>
      <div aria-hidden="true" class="dotgrid-spot" data-spot></div>
      <div style="position:relative;z-index:2">
        <slot />
      </div>
    </div>
  </body>
</html>
```

- [ ] **Step 8: Write a temporary `src/pages/index.astro`**

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
---
<BaseLayout>
  <main style="padding:4rem"><h1 class="font-display">Scaffold OK</h1></main>
</BaseLayout>
```

- [ ] **Step 9: Build and verify**

Run: `bun run build && bunx astro check`
Expected: build succeeds, `dist/index.html` exists, 0 type errors.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "chore: scaffold Astro 7 + Tailwind v4 project, relocate prototype to design-reference"
```

---

## Task 2: Content collections + ported data

**Files:**
- Create: `src/content.config.ts`, `src/content/profile.json`, `src/content/skills.json`, `src/content/projects.json`, `src/content/experience/01-datum.json` … `07-montazze.json`
- Create: `src/lib/content.ts`, `src/lib/content.test.ts`

**Interfaces:**
- Produces:
  - Collections `profile` (single entry id `"profile"`), `skills` (single entry id `"skills"`), `projects` (single entry id `"projects"`), `experience` (7 entries).
  - `sortExperience<T extends { id: string }>(entries: T[]): T[]` — sorts by numeric filename prefix ascending.
  - Exported TS types inferred from the Zod schemas: `Profile`, `SkillRow`, `Job`, `ProjectGroup`.

- [ ] **Step 1: Write the failing test for `sortExperience`**

`src/lib/content.test.ts`:

```ts
import { test, expect } from 'bun:test';
import { sortExperience } from './content';

test('sorts experience entries by numeric filename prefix', () => {
  const input = [
    { id: '03-equinix', data: {} },
    { id: '01-datum', data: {} },
    { id: '02-mugglepay', data: {} },
  ];
  const out = sortExperience(input).map((e) => e.id);
  expect(out).toEqual(['01-datum', '02-mugglepay', '03-equinix']);
});

test('handles ids without a numeric prefix by pushing them last', () => {
  const input = [{ id: 'zeta' }, { id: '02-b' }, { id: '01-a' }];
  const out = sortExperience(input).map((e) => e.id);
  expect(out).toEqual(['01-a', '02-b', 'zeta']);
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `bun test src/lib/content.test.ts`
Expected: FAIL — `sortExperience` not exported.

- [ ] **Step 3: Implement `src/lib/content.ts`**

```ts
export function sortExperience<T extends { id: string }>(entries: T[]): T[] {
  const rank = (id: string): number => {
    const m = id.match(/^(\d+)/);
    return m ? Number(m[1]) : Number.POSITIVE_INFINITY;
  };
  return [...entries].sort((a, b) => rank(a.id) - rank(b.id));
}
```

- [ ] **Step 4: Run test, verify it passes**

Run: `bun test src/lib/content.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Write `src/content.config.ts`**

```ts
import { defineCollection, z } from 'astro:content';
import { glob, file } from 'astro/loaders';

const linkSchema = z.object({ label: z.string(), href: z.string().url() });

const profile = defineCollection({
  loader: file('src/content/profile.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    disciplines: z.array(z.string()).min(1),
    location: z.string(),
    email: z.string().email(),
    available: z.boolean(),
    lead: z.string(),
    profile: z.string(),
    facts: z.array(z.object({ k: z.string(), v: z.string() })),
    links: z.object({ site: linkSchema, github: linkSchema, linkedin: linkSchema }),
  }),
});

const skills = defineCollection({
  loader: file('src/content/skills.json'),
  schema: z.object({ rows: z.array(z.object({ label: z.string(), items: z.string() })) }),
});

const projects = defineCollection({
  loader: file('src/content/projects.json'),
  schema: z.object({
    groups: z.array(z.object({
      label: z.string(),
      items: z.array(z.object({
        name: z.string(), period: z.string(), desc: z.string(), stack: z.string(),
      })),
    })),
  }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*.json', base: 'src/content/experience' }),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    location: z.string(),
    period: z.string(),
    year: z.string(),
    current: z.boolean().optional(),
    summary: z.string(),
    bullets: z.array(z.string()),
  }),
});

export const collections = { profile, skills, projects, experience };
```

> Note: the `file()` loader on a JSON object that is NOT an array of `{id,...}` yields a single entry whose id is the filename stem (`"profile"`, `"skills"`, `"projects"`). Components read it with `getEntry('profile', 'profile')`. If the installed Astro version's `file()` loader instead requires a top-level array, wrap each file as `[{ "id": "profile", ... }]` and keep the same `getEntry` calls — verify by running `bunx astro check` after Step 10 and reconcile if the id differs.

- [ ] **Step 6: Write `src/content/profile.json`** (ported from `design-reference/project/cv-data.js`)

```json
{
  "name": "Yahya Fakhroji",
  "role": "Senior Software Engineer",
  "disciplines": ["Web", "Mobile", "Desktop", "Backend"],
  "location": "Malang, East Java, Indonesia",
  "email": "contact@hiyahya.dev",
  "available": true,
  "lead": "I design and ship production-grade software across web, mobile, desktop, and backend — end to end.",
  "profile": "Software engineer with over a decade of experience working across the full product lifecycle: architecting systems, building polished interfaces, implementing services and APIs, and deploying to cloud and edge infrastructure. I've modernized enterprise portals for global cloud providers, led multi-app commerce ecosystems for emerging markets, and built crypto payment and wallet products. I care about clean architecture, developer experience, and reliable, user-centric software — and I'm comfortable mentoring teams and owning initiatives end to end.",
  "facts": [
    { "k": "Experience", "v": "10+ years" },
    { "k": "Base", "v": "Malang, Indonesia" },
    { "k": "Mode", "v": "Remote-first" },
    { "k": "Focus", "v": "Frontend · Full-stack" }
  ],
  "links": {
    "site": { "label": "hiyahya.dev", "href": "https://hiyahya.dev" },
    "github": { "label": "github.com/yahyafakhroji", "href": "https://github.com/yahyafakhroji" },
    "linkedin": { "label": "linkedin.com/in/yahya-fakhroji", "href": "https://linkedin.com/in/yahya-fakhroji" }
  }
}
```

- [ ] **Step 7: Write `src/content/skills.json`** (port `CV.skills`)

```json
{
  "rows": [
    { "label": "Languages & Web", "items": "TypeScript, JavaScript, React, Next.js, React Router v7, Angular, Vue, Nuxt, Svelte" },
    { "label": "Mobile & Desktop", "items": "React Native, Expo, Capacitor, Ionic, Electron, PWA" },
    { "label": "Backend & Data", "items": "Node.js, NestJS, Hono, AdonisJS, Python, FastAPI, PHP, Laravel, GraphQL, REST, PostgreSQL, MySQL, Supabase" },
    { "label": "Web3 & Blockchain", "items": "Stellar, Soroban, Smart wallets, PasskeyKit, WalletConnect" },
    { "label": "UI & Design Systems", "items": "Tailwind CSS, Chakra UI, Ant Design, Angular Material, shadcn/ui, Figma-to-token workflows" },
    { "label": "DevOps & Cloud", "items": "Docker, Kubernetes, CI/CD, Cloudflare Workers, Git, Vite, Bun" },
    { "label": "Practices", "items": "Agile/Scrum, Code review, Performance optimization, Technical leadership, Mentoring" }
  ]
}
```

- [ ] **Step 8: Write `src/content/projects.json`** (port `CV.projectGroups` verbatim — all 5 groups)

Copy the five groups (`Commerce & Logistics`, `Fintech, Payments & Crypto`, `Hospitality & Point of Sale`, `Workforce & Field Operations`, `Early Platforms`) and their items exactly from `design-reference/project/cv-data.js` lines 100–137 into this shape:

```json
{ "groups": [ { "label": "Commerce & Logistics", "items": [ { "name": "...", "period": "...", "desc": "...", "stack": "..." } ] } ] }
```

The full item list to reproduce (name · period · stack), descriptions copied verbatim from `cv-data.js`:
- Commerce & Logistics: Lini Ecosystem (2022 — 2024), Keeppack (2019 — 2022), Kelola WMS (2021 — 2022)
- Fintech, Payments & Crypto: Rozo Wallet (Recent), Moinves (2018 — 2020)
- Hospitality & Point of Sale: Bonbon Merchant (2020 — 2021), Bonbon Customer (2019 — 2020)
- Workforce & Field Operations: Rosty (2021 — 2022), Site Survey Mobile (2017)
- Early Platforms: Copilot (2016 — 2018), MuseCRM (2016 — 2018)

- [ ] **Step 9: Write the 7 experience files** (port `CV.experience`, one object per file, in order)

`src/content/experience/01-datum.json`:

```json
{
  "company": "Datum",
  "role": "Senior Frontend Engineer",
  "location": "New York, US · Remote",
  "period": "Jan 2025 — Present",
  "year": "2025",
  "current": true,
  "summary": "Customer & staff portals for a cloud platform — React Router v7, TypeScript, Hono, Bun on Kubernetes.",
  "bullets": [
    "Build and maintain Datum Cloud's customer and staff portals using React, React Router v7, TypeScript, Hono and Bun, deployed on Kubernetes.",
    "Drive migration of legacy UI packages into a unified component library, standardizing the design system and accelerating delivery across teams.",
    "Lead a V3 frontend architecture initiative migrating the BFF layer from Express to Hono with React Query for performant, type-safe data flows.",
    "Implement permission-aware UI on the platform's RBAC module and contribute to security incident response, including remediation tooling and timeline reporting."
  ]
}
```

Then create the remaining six from `cv-data.js`, preserving order and all fields:
`02-mugglepay.json` (MugglePay), `03-equinix.json` (Equinix Metal), `04-futr.json` (Futr Asia), `05-packet.json` (Packet Host), `06-dinkum.json` (Dinkum Interactive), `07-montazze.json` (Montazze Studio). Only `01-datum` has `"current": true`.

- [ ] **Step 10: Verify content validates + render a count probe**

Replace `src/pages/index.astro` body with a temporary probe:

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getCollection, getEntry } from 'astro:content';
import { sortExperience } from '@/lib/content';
const exp = sortExperience(await getCollection('experience'));
const profile = await getEntry('profile', 'profile');
---
<BaseLayout>
  <main style="padding:4rem">
    <p>name: {profile?.data.name}</p>
    <p>jobs: {exp.length}</p>
    <p>first: {exp[0]?.id}</p>
  </main>
</BaseLayout>
```

Run: `bun run build && bunx astro check`
Expected: build passes; rendered probe shows `name: Yahya Fakhroji`, `jobs: 7`, `first: 01-datum`. (If `getEntry`/`file()` id differs, reconcile per Step 5 note, then rebuild.)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: add Zod content collections and port CV data to JSON"
```

---

## Task 3: SEO foundation (site config, JSON-LD, Seo.astro, assets)

**Files:**
- Create: `src/data/site.ts`, `src/lib/seo.ts`, `src/lib/seo.test.ts`, `src/components/seo/Seo.astro`, `public/robots.txt`, `public/favicon.svg`
- Create (assets): `public/Yahya_Fakhroji_CV.pdf`, `public/img/avatar.jpg`, `public/og/og-image.png`
- Modify: `src/layouts/BaseLayout.astro` (mount `Seo`)

**Interfaces:**
- Consumes: `profile` collection (Task 2).
- Produces:
  - `SITE` constant: `{ url, name, title, description, locale, ogImage, twitter, themeColor }`.
  - `buildJsonLd(args: { profile: Profile; site: typeof SITE; skills: string[]; jobs: { company: string; role: string }[] }): object` — returns a `@graph` with `Person` + `ProfilePage`.
  - `Seo.astro` props: `{ title: string; description: string; path?: string }`.

- [ ] **Step 1: Write failing test for `buildJsonLd`**

`src/lib/seo.test.ts`:

```ts
import { test, expect } from 'bun:test';
import { buildJsonLd } from './seo';

const site = { url: 'https://hiyahya.dev', name: 'Yahya Fakhroji', title: 'Yahya Fakhroji — Senior Software Engineer', ogImage: '/og/og-image.png' } as any;
const profile = {
  name: 'Yahya Fakhroji', role: 'Senior Software Engineer', email: 'contact@hiyahya.dev',
  location: 'Malang, Indonesia',
  links: { github: { href: 'https://github.com/yahyafakhroji' }, linkedin: { href: 'https://linkedin.com/in/yahya-fakhroji' }, site: { href: 'https://hiyahya.dev' } },
} as any;

test('produces a Person node with jobTitle, sameAs and knowsAbout', () => {
  const ld: any = buildJsonLd({ profile, site, skills: ['TypeScript', 'Astro'], jobs: [{ company: 'Datum', role: 'Senior Frontend Engineer' }] });
  const person = ld['@graph'].find((n: any) => n['@type'] === 'Person');
  expect(person.name).toBe('Yahya Fakhroji');
  expect(person.jobTitle).toBe('Senior Software Engineer');
  expect(person.sameAs).toContain('https://github.com/yahyafakhroji');
  expect(person.sameAs).toContain('https://linkedin.com/in/yahya-fakhroji');
  expect(person.knowsAbout).toContain('TypeScript');
});

test('produces a ProfilePage node linked to the Person', () => {
  const ld: any = buildJsonLd({ profile, site, skills: [], jobs: [] });
  const page = ld['@graph'].find((n: any) => n['@type'] === 'ProfilePage');
  expect(page.mainEntity['@id']).toBe('https://hiyahya.dev/#person');
});
```

- [ ] **Step 2: Run test, verify it fails**

Run: `bun test src/lib/seo.test.ts`
Expected: FAIL — `buildJsonLd` not exported.

- [ ] **Step 3: Implement `src/data/site.ts`**

```ts
export const SITE = {
  url: 'https://hiyahya.dev',
  name: 'Yahya Fakhroji',
  title: 'Yahya Fakhroji — Senior Software Engineer',
  description:
    'Senior software engineer with 10+ years building production-grade software across web, mobile, desktop and backend. Remote-first, based in Malang, Indonesia.',
  locale: 'en_US',
  ogImage: '/og/og-image.png',
  twitter: '@yahyafakhroji',
  themeColor: '#F1F1ED',
} as const;
```

- [ ] **Step 4: Implement `src/lib/seo.ts`**

```ts
import type { SITE } from '@/data/site';

interface JsonLdArgs {
  profile: {
    name: string; role: string; email: string; location: string;
    links: { github: { href: string }; linkedin: { href: string }; site: { href: string } };
  };
  site: typeof SITE;
  skills: string[];
  jobs: { company: string; role: string }[];
}

export function buildJsonLd({ profile, site, skills, jobs }: JsonLdArgs): object {
  const personId = `${site.url}/#person`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': personId,
        name: profile.name,
        url: site.url,
        email: `mailto:${profile.email}`,
        jobTitle: profile.role,
        image: `${site.url}/img/avatar.jpg`,
        address: { '@type': 'PostalAddress', addressLocality: profile.location },
        sameAs: [profile.links.github.href, profile.links.linkedin.href],
        knowsAbout: skills,
        worksFor: jobs[0] ? { '@type': 'Organization', name: jobs[0].company } : undefined,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${site.url}/#profilepage`,
        url: site.url,
        name: site.title,
        mainEntity: { '@id': personId },
      },
    ],
  };
}
```

- [ ] **Step 5: Run test, verify it passes**

Run: `bun test src/lib/seo.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 6: Implement `src/components/seo/Seo.astro`**

```astro
---
import { getEntry, getCollection } from 'astro:content';
import { SITE } from '@/data/site';
import { buildJsonLd } from '@/lib/seo';
import { sortExperience } from '@/lib/content';

interface Props { title: string; description: string; path?: string }
const { title, description, path = '/' } = Astro.props;

const canonical = new URL(path, SITE.url).href;
const ogImage = new URL(SITE.ogImage, SITE.url).href;

const profile = (await getEntry('profile', 'profile'))!.data;
const skillsEntry = (await getEntry('skills', 'skills'))!.data;
const skills = skillsEntry.rows.flatMap((r: { items: string }) => r.items.split(',').map((s) => s.trim()));
const jobs = sortExperience(await getCollection('experience')).map((e) => ({ company: e.data.company, role: e.data.role }));

const jsonLd = buildJsonLd({ profile, site: SITE, skills, jobs });
---
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<meta name="theme-color" content={SITE.themeColor} />
<meta name="author" content={profile.name} />

<meta property="og:type" content="profile" />
<meta property="og:site_name" content={SITE.name} />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImage} />
<meta property="og:locale" content={SITE.locale} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImage} />

<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="sitemap" href="/sitemap-index.xml" />

<script type="application/ld+json" set:html={JSON.stringify(jsonLd)} is:inline />
```

- [ ] **Step 7: Wire `Seo` into `BaseLayout.astro`**

Add props and mount `Seo` in `<head>`, replacing the bare `<title>`:

```astro
---
import '@/styles/global.css';
import Seo from '@/components/seo/Seo.astro';
import { SITE } from '@/data/site';
interface Props { title?: string; description?: string; path?: string }
const { title = SITE.title, description = SITE.description, path = '/' } = Astro.props;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <Seo title={title} description={description} path={path} />
  </head>
  <body>
    <div id="top" style="position:relative;min-height:100vh;width:100%" data-root>
      <div aria-hidden="true" class="dotgrid-base"></div>
      <div aria-hidden="true" class="dotgrid-spot" data-spot></div>
      <div style="position:relative;z-index:2"><slot /></div>
    </div>
  </body>
</html>
```

- [ ] **Step 8: Add `public/robots.txt`**

```
User-agent: *
Allow: /

Sitemap: https://hiyahya.dev/sitemap-index.xml
```

- [ ] **Step 9: Add `public/favicon.svg`** (accent-dot monogram on paper)

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#F1F1ED"/>
  <text x="16" y="22" font-family="Georgia, serif" font-size="20" font-weight="700" text-anchor="middle" fill="#17181B">Y</text>
  <circle cx="25" cy="8" r="3" fill="#2B43C7"/>
</svg>
```

- [ ] **Step 10: Acquire image assets**

```bash
mkdir -p public/img public/og
cp design-reference/project/uploads/Yahya_Fakhroji_CV.pdf public/Yahya_Fakhroji_CV.pdf
curl -fsSL "https://github.com/yahyafakhroji.png?size=460" -o public/img/avatar.jpg
```

For `public/og/og-image.png` (1200×630): generate a brand card (paper background `#F1F1ED`, ink name in a Bricolage-style display face, accent dot, role + `hiyahya.dev`). Author it as an SVG matching brand tokens and rasterize to PNG (e.g. via the Playwright MCP: render the SVG in a 1200×630 viewport and screenshot), saving to `public/og/og-image.png`. Verify it is exactly 1200×630 and < 200kb.

- [ ] **Step 11: Build and verify SEO output**

Run: `bun run build`
Then verify the built HTML and sitemap:

```bash
grep -o 'rel="canonical" href="https://hiyahya.dev/"' dist/index.html
grep -o 'property="og:image"' dist/index.html
grep -o '"@type":"Person"' dist/index.html
test -f dist/sitemap-index.xml && echo "sitemap ok"
test -f dist/robots.txt && echo "robots ok"
```

Expected: all five echo/grep lines match. Run `bunx astro check` → 0 errors.

- [ ] **Step 12: Commit**

```bash
git add -A
git commit -m "feat: add SEO foundation — site config, JSON-LD, meta tags, sitemap, assets"
```

---

## Task 4: Interaction scripts (the motion library)

**Files:**
- Create: `src/scripts/spotlight.ts`, `src/scripts/magnetic.ts`, `src/scripts/reveal.ts`, `src/scripts/scramble.ts`, `src/scripts/heroEntrance.ts`

**Interfaces:**
- Produces (each a named-exported init fn, called from a component `<script>`):
  - `initSpotlight(root: HTMLElement): void` — sets `--mx/--my` on `root` from pointer.
  - `initMagnetic(root: ParentNode): void` — pulls `[data-magnetic]` toward cursor.
  - `initReveal(root: ParentNode): void` — fades up `[data-reveal]` on intersect.
  - `initScramble(el: HTMLElement, words: string[]): void` — cycles scrambled text.
  - `initHeroEntrance(root: ParentNode): void` — staggers `[data-letter]` + `[data-fade]`.
- All read `prefers-reduced-motion` and no-op (leaving the visible base state) when reduced.

> Ported from `design-reference/project/SiteTimeline.dc.html` `DCLogic` methods (`initSpotlight` 402-412, `initMagnetic` 376-400, `initReveals` 232-257, `startScramble` 342-374, `runEntrance` 259-287). Drop the "frozen-capture safety net" `setTimeout` hacks — those existed only for the design tool's screenshotter.

- [ ] **Step 1: Write `src/scripts/reveal.ts`**

```ts
export function initReveal(root: ParentNode): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const els = [...root.querySelectorAll<HTMLElement>('[data-reveal]')];
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      const el = e.target as HTMLElement;
      io.unobserve(el);
      const d = parseFloat(el.getAttribute('data-reveal-delay') || '0');
      el.style.transition = `opacity 0.8s ease ${d}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${d}ms`;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  for (const el of els) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(26px)';
    io.observe(el);
  }
}
```

- [ ] **Step 2: Write `src/scripts/spotlight.ts`**

```ts
export function initSpotlight(root: HTMLElement): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0, x = 0, y = 0;
  const onMove = (ev: PointerEvent) => {
    x = ev.clientX; y = ev.clientY;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      root.style.setProperty('--mx', `${x}px`);
      root.style.setProperty('--my', `${y}px`);
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}
```

- [ ] **Step 3: Write `src/scripts/magnetic.ts`**

```ts
export function initMagnetic(root: ParentNode): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const items = [...root.querySelectorAll<HTMLElement>('[data-magnetic]')];
  if (!items.length) return;
  let raf = 0;
  const onMove = (ev: PointerEvent) => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      for (const el of items) {
        const r = el.getBoundingClientRect();
        const dx = ev.clientX - (r.left + r.width / 2);
        const dy = ev.clientY - (r.top + r.height / 2);
        const dist = Math.hypot(dx, dy);
        const radius = Math.max(r.width, 120);
        const pull = 1 - dist / radius;
        el.style.transform = dist < radius
          ? `translate(${dx * 0.28 * pull}px, ${dy * 0.28 * pull}px)`
          : 'translate(0,0)';
      }
    });
  };
  window.addEventListener('pointermove', onMove, { passive: true });
}
```

- [ ] **Step 4: Write `src/scripts/scramble.ts`**

```ts
export function initScramble(el: HTMLElement, words: string[]): void {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (words.length < 2) return;
  const chars = 'ABCDEFGHKMNRSTXYZ#%&/<>*+=';
  let wi = 0, inner = 0;
  const scrambleTo = (text: string) => {
    const from = el.textContent || '';
    const len = Math.max(from.length, text.length);
    const queue = Array.from({ length: len }, (_, i) => {
      const start = Math.floor(Math.random() * 12);
      return { to: text[i] || '', start, end: start + 8 + Math.floor(Math.random() * 12), ch: '' };
    });
    let frame = 0;
    if (inner) clearInterval(inner);
    inner = window.setInterval(() => {
      let out = '', done = 0;
      for (const q of queue) {
        if (frame >= q.end) { done++; out += q.to; }
        else if (frame >= q.start) {
          if (!q.ch || Math.random() < 0.3) q.ch = chars[Math.floor(Math.random() * chars.length)];
          out += `<span style="opacity:0.4">${q.ch}</span>`;
        }
      }
      el.innerHTML = out;
      frame++;
      if (done === queue.length) { el.textContent = text; clearInterval(inner); inner = 0; }
    }, 38);
  };
  window.setInterval(() => { wi = (wi + 1) % words.length; scrambleTo(words[wi]); }, 2900);
}
```

- [ ] **Step 5: Write `src/scripts/heroEntrance.ts`**

```ts
export function initHeroEntrance(root: ParentNode): void {
  const letters = [...root.querySelectorAll<HTMLElement>('[data-letter]')];
  const fades = [...root.querySelectorAll<HTMLElement>('[data-fade]')];
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    [...letters, ...fades].forEach((el) => { el.style.opacity = '1'; el.style.transform = 'none'; });
    return;
  }
  letters.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(110%)'; });
  fades.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(14px)'; });
  requestAnimationFrame(() => {
    letters.forEach((el, i) => {
      const d = 120 + i * 30;
      el.style.transition = `transform 0.95s cubic-bezier(0.22,1,0.36,1) ${d}ms, opacity 0.8s ease ${d}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
    fades.forEach((el) => {
      const d = parseFloat(el.getAttribute('data-delay') || '0');
      el.style.transition = `opacity 0.7s ease ${d}ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${d}ms`;
      el.style.opacity = '1'; el.style.transform = 'translateY(0)';
    });
  });
}
```

- [ ] **Step 6: Type-check**

Run: `bunx astro check`
Expected: 0 errors. (Scripts aren't imported yet; this just confirms they compile.)

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: port interaction scripts (spotlight, magnetic, reveal, scramble, hero entrance)"
```

---

## Task 5: Hero + page shell wiring

**Files:**
- Create: `src/components/hero/Hero.astro`, `src/components/layout/SectionHeader.astro`
- Modify: `src/pages/index.astro` (real page begins)

**Interfaces:**
- Consumes: `profile` collection; scripts `initHeroEntrance`, `initScramble`, `initMagnetic`, `initSpotlight`, `initReveal`.
- Produces: `SectionHeader.astro` props `{ no: string; label: string }` rendering the `01 / Profile ——` row (ported from prototype lines 52-56).

- [ ] **Step 1: Write `SectionHeader.astro`**

```astro
---
interface Props { no: string; label: string }
const { no, label } = Astro.props;
---
<div data-reveal class="flex items-baseline gap-[14px] mb-[clamp(20px,3vw,40px)]">
  <span class="text-[12px] font-bold tracking-[0.1em] text-accent">{no}</span>
  <span class="text-[12px] font-semibold tracking-[0.18em] uppercase text-muted">{label}</span>
  <span class="flex-1 h-px bg-line"></span>
</div>
```

- [ ] **Step 2: Write `Hero.astro`** (port prototype lines 29-47)

```astro
---
import { getEntry } from 'astro:content';
const { data: p } = (await getEntry('profile', 'profile'))!;
const words = p.name.split(' ').map((w) => w.split(''));
---
<header class="min-h-screen flex flex-col justify-center items-center text-center max-w-[1100px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(48px,9vh,104px)]">
  {p.available && (
    <div data-fade data-delay="20" class="flex items-center gap-[10px] text-[13px] font-semibold tracking-[0.14em] uppercase text-muted mb-[clamp(22px,4vw,40px)]">
      <span class="w-2 h-2 rounded-full bg-accent" style="animation:tl-pulse 2.4s infinite"></span>
      Available for work
    </div>
  )}
  <h1 class="m-0 font-display font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(54px,12vw,158px)]">
    {words.map((letters) => (
      <span class="inline-block overflow-hidden align-bottom pb-[0.16em] -mb-[0.16em] mr-[0.16em]">
        {letters.map((c) => <span data-letter class="inline-block will-change-transform">{c}</span>)}
      </span>
    ))}
  </h1>
  <div data-fade data-delay="560" class="flex flex-wrap justify-center items-baseline gap-x-4 gap-y-2 mt-[clamp(20px,3vw,36px)]">
    <span class="font-display text-[clamp(22px,3.2vw,40px)] font-semibold tracking-[-0.02em]">{p.role}</span>
    <span class="text-[clamp(15px,1.7vw,20px)] font-semibold text-accent">— for <span data-scramble class="inline-block min-w-[7ch] text-left">{p.disciplines[0]}</span></span>
  </div>
  <p data-fade data-delay="680" class="max-w-[620px] mx-auto mt-[clamp(22px,3vw,34px)] text-[clamp(18px,2vw,25px)] leading-[1.5]">{p.lead}</p>
  <div data-fade data-delay="800" class="flex flex-wrap justify-center gap-x-7 gap-y-[10px] mt-[clamp(28px,4vw,46px)]">
    <a data-magnetic href={`mailto:${p.email}`} class="inline-block text-[15px] font-semibold text-ink no-underline border-b border-line pb-[3px] will-change-transform transition-colors duration-200 hover:text-accent hover:border-accent">Email&nbsp;↗</a>
    <a data-magnetic href={p.links.github.href} target="_blank" rel="noopener" class="inline-block text-[15px] font-semibold text-ink no-underline border-b border-line pb-[3px] will-change-transform transition-colors duration-200 hover:text-accent hover:border-accent">GitHub&nbsp;↗</a>
    <a data-magnetic href={p.links.linkedin.href} target="_blank" rel="noopener" class="inline-block text-[15px] font-semibold text-ink no-underline border-b border-line pb-[3px] will-change-transform transition-colors duration-200 hover:text-accent hover:border-accent">LinkedIn&nbsp;↗</a>
  </div>
</header>
```

- [ ] **Step 3: Rewrite `src/pages/index.astro`** (real shell — global script lives here)

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import { getEntry } from 'astro:content';
import Hero from '@/components/hero/Hero.astro';
const { data: p } = (await getEntry('profile', 'profile'))!;
---
<BaseLayout>
  <script type="application/json" data-disciplines set:html={JSON.stringify(p.disciplines)} is:inline></script>
  <main>
    <Hero />
  </main>
</BaseLayout>

<script>
  import { initSpotlight } from '@/scripts/spotlight';
  import { initMagnetic } from '@/scripts/magnetic';
  import { initReveal } from '@/scripts/reveal';
  import { initScramble } from '@/scripts/scramble';
  import { initHeroEntrance } from '@/scripts/heroEntrance';

  const root = document.querySelector<HTMLElement>('[data-root]');
  if (root) initSpotlight(root);
  initMagnetic(document);
  initReveal(document);
  initHeroEntrance(document);

  const scr = document.querySelector<HTMLElement>('[data-scramble]');
  const discEl = document.querySelector<HTMLElement>('[data-disciplines]');
  const disc: string[] = discEl ? JSON.parse(discEl.textContent || '[]') : [];
  if (scr && disc.length) initScramble(scr, disc);
</script>
```

> This single page-level `<script>` wires every global interaction once. Section components stay markup-only; the experience scroll-spy (Task 7) adds its own page-level script block.

- [ ] **Step 4: Build + visual verify**

Run: `bun run build && bunx astro check`
Then screenshot the hero with the Playwright MCP against `bun run preview` (`http://localhost:4321`) at 375 / 768 / 1440. Confirm: full name renders unclipped, "Available" pill present, role + one discipline word visible, three links, dot-grid background visible, no horizontal scroll.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: build hero section with entrance, scramble, magnetic and spotlight"
```

---

## Task 6: About + Skills sections

**Files:**
- Create: `src/components/about/About.astro`, `src/components/skills/Skills.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `profile` (`profile`, `facts`), `skills` (`rows`); `SectionHeader`.

- [ ] **Step 1: Write `About.astro`** (port prototype lines 50-69)

```astro
---
import { getEntry } from 'astro:content';
import SectionHeader from '@/components/layout/SectionHeader.astro';
const { data: p } = (await getEntry('profile', 'profile'))!;
---
<section aria-labelledby="about-h" class="py-[clamp(64px,9vw,130px)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)]">
    <SectionHeader no="01" label="Profile" />
    <h2 id="about-h" class="sr-only">Profile</h2>
    <div class="flex flex-wrap gap-[clamp(28px,5vw,72px)]">
      <p data-reveal class="flex-[3_1_460px] m-0 font-display text-[clamp(21px,2.6vw,33px)] leading-[1.4] tracking-[-0.02em] font-medium text-pretty">{p.profile}</p>
      <div data-reveal data-reveal-delay="120" class="flex-[1_1_220px] flex flex-col">
        {p.facts.map((f) => (
          <div class="flex justify-between gap-3 py-[14px] border-t border-line text-[14px]">
            <span class="text-muted">{f.k}</span>
            <span class="text-ink font-semibold text-right">{f.v}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write `Skills.astro`** (port prototype lines 72-86)

```astro
---
import { getEntry } from 'astro:content';
import SectionHeader from '@/components/layout/SectionHeader.astro';
const { data: s } = (await getEntry('skills', 'skills'))!;
---
<section aria-labelledby="skills-h" class="py-[clamp(48px,7vw,100px)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)]">
    <SectionHeader no="02" label="Capabilities" />
    <h2 id="skills-h" class="sr-only">Capabilities</h2>
    {s.rows.map((row) => (
      <div data-reveal class="flex flex-wrap gap-x-[clamp(24px,4vw,56px)] gap-y-2 py-[clamp(16px,2vw,22px)] border-t border-line">
        <div class="flex-[1_1_220px] min-w-[160px] font-display text-[clamp(17px,1.8vw,22px)] font-semibold tracking-[-0.01em]">{row.label}</div>
        <div class="flex-[3_1_480px] text-[clamp(15px,1.5vw,18px)] leading-[1.55] text-muted">{row.items}</div>
      </div>
    ))}
  </div>
</section>
```

- [ ] **Step 3: Mount in `index.astro`**

Import `About` and `Skills`; render `<About />` then `<Skills />` after `<Hero />` inside `<main>`.

- [ ] **Step 4: Build + visual verify**

Run: `bun run build && bunx astro check`
Screenshot at 375 / 768 / 1440. Confirm: section headers numbered, profile paragraph + facts align, 7 skill rows, reveal works (and content present with motion reduced). No overflow.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add about and skills sections"
```

---

## Task 7: Experience section (sticky scroll-spy)

**Files:**
- Create: `src/components/experience/Experience.astro`, `src/scripts/experienceScrollSpy.ts`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `experience` collection, `sortExperience`, `SectionHeader`.
- Produces: `initExperienceScrollSpy(root: ParentNode): void` — wires the sticky chapter panel `[data-panel]` fields (`[data-active-year]`, `[data-active-company]`, `[data-active-role]`, `[data-active-summary]`, `[data-progress-label]`), the progress bar `[data-bar]`, and active-card dimming, from `[data-jobcard]` positions (ported from prototype `initSticky` 289-340).

- [ ] **Step 1: Write `experienceScrollSpy.ts`**

```ts
export function initExperienceScrollSpy(root: ParentNode): void {
  const cards = [...root.querySelectorAll<HTMLElement>('[data-jobcard]')];
  if (!cards.length) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const panel = root.querySelector<HTMLElement>('[data-panel]');
  const bar = root.querySelector<HTMLElement>('[data-bar]');
  const f = {
    year: root.querySelector<HTMLElement>('[data-active-year]'),
    company: root.querySelector<HTMLElement>('[data-active-company]'),
    role: root.querySelector<HTMLElement>('[data-active-role]'),
    summary: root.querySelector<HTMLElement>('[data-active-summary]'),
    label: root.querySelector<HTMLElement>('[data-progress-label]'),
  };
  const total = cards.length;
  const pad2 = (n: number) => String(n).padStart(2, '0');

  const applyMode = () => { if (panel) panel.style.position = window.innerWidth >= 860 ? 'sticky' : 'static'; };
  applyMode();
  let rzT = 0;
  window.addEventListener('resize', () => { clearTimeout(rzT); rzT = window.setTimeout(applyMode, 150); }, { passive: true });

  if (!reduce) cards.forEach((c) => { c.style.transition = 'opacity 0.45s ease'; });

  let last = -1;
  const setActive = (i: number) => {
    if (i === last) return;
    last = i;
    const c = cards[i];
    if (f.year) f.year.textContent = c.dataset.year || '';
    if (f.company) f.company.textContent = c.dataset.company || '';
    if (f.role) f.role.textContent = c.dataset.role || '';
    if (f.summary) f.summary.textContent = c.dataset.summary || '';
    if (f.label) f.label.textContent = `${pad2(i + 1)} / ${pad2(total)}`;
    if (bar) bar.style.width = `${((i + 1) / total) * 100}%`;
    if (!reduce) cards.forEach((card, j) => { card.style.opacity = j === i ? '1' : '0.32'; });
  };

  const compute = () => {
    const pinnedTop = Math.max(56, Math.min(window.innerHeight * 0.1, 112));
    const anchor = pinnedTop + 84;
    let idx = 0;
    for (let i = 0; i < cards.length; i++) {
      if (cards[i].getBoundingClientRect().top - anchor <= 4) idx = i; else break;
    }
    setActive(idx);
  };

  let raf = 0;
  window.addEventListener('scroll', () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = 0; compute(); });
  }, { passive: true });
  compute();
}
```

- [ ] **Step 2: Write `Experience.astro`** (port prototype lines 88-128)

```astro
---
import { getCollection } from 'astro:content';
import { sortExperience } from '@/lib/content';
import SectionHeader from '@/components/layout/SectionHeader.astro';
const jobs = sortExperience(await getCollection('experience')).map((e) => e.data);
const first = jobs[0];
const total = jobs.length;
const pad2 = (n: number) => String(n).padStart(2, '0');
---
<section aria-labelledby="exp-h" class="py-[clamp(56px,8vw,120px)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)]">
    <SectionHeader no="03" label="Experience" />
    <h2 id="exp-h" class="sr-only">Experience</h2>
    <div class="flex flex-wrap gap-[clamp(24px,4vw,64px)] items-start">
      <div data-panel class="flex-[1_1_300px] min-w-[260px] self-start top-[clamp(56px,10vh,112px)]">
        <div data-progress-label class="text-[12px] font-bold tracking-[0.14em] text-accent">{pad2(1)} / {pad2(total)}</div>
        <div data-active-year class="font-display text-[clamp(72px,11vw,128px)] font-extrabold leading-[0.92] tracking-[-0.04em] mt-[10px] mb-[8px]">{first.year}</div>
        <div data-active-company class="font-display text-[clamp(24px,2.6vw,32px)] font-bold tracking-[-0.02em]">{first.company}</div>
        <div data-active-role class="text-[clamp(15px,1.6vw,18px)] font-semibold text-accent mt-[2px]">{first.role}</div>
        <p data-active-summary class="mt-4 mb-0 text-[clamp(15px,1.5vw,17px)] leading-[1.55] text-muted max-w-[380px] text-pretty">{first.summary}</p>
        <div class="mt-[26px] h-[3px] w-full bg-line rounded-[3px] overflow-hidden">
          <span data-bar class="block h-full bg-accent rounded-[3px] transition-[width] duration-500" style="width:14%"></span>
        </div>
      </div>
      <div class="flex-[1.6_1_420px] flex flex-col gap-[clamp(40px,6vw,80px)] pb-[clamp(0px,7vh,96px)]">
        {jobs.map((job) => (
          <article data-jobcard data-year={job.year} data-company={job.company} data-role={job.role} data-summary={job.summary} class="scroll-mt-[90px]">
            <div class="flex flex-wrap items-baseline gap-x-[14px] gap-y-2 mb-1">
              <h3 class="m-0 font-display text-[clamp(26px,3.2vw,42px)] font-bold tracking-[-0.03em]">{job.company}</h3>
              {job.current && <span class="text-[11px] font-bold tracking-[0.04em] text-accent border border-accent rounded-full px-[10px] py-[3px]">NOW</span>}
            </div>
            <div class="flex flex-wrap gap-x-4 gap-y-[6px] items-baseline mb-[18px]">
              <span class="text-[clamp(16px,1.8vw,20px)] font-semibold">{job.role}</span>
              <span class="text-[13px] font-semibold tracking-[0.04em] text-muted">{job.period}</span>
            </div>
            <ul class="m-0 p-0 list-none flex flex-col gap-[11px]">
              {job.bullets.map((b) => (
                <li class="relative pl-6 text-[clamp(15px,1.6vw,18px)] leading-[1.55] text-ink text-pretty">
                  <span class="absolute left-0 top-[0.62em] w-[10px] h-px bg-accent"></span>{b}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Mount in `index.astro`** after `<Skills />`, and add the experience script to the page-level script block:

```astro
<script>
  import { initExperienceScrollSpy } from '@/scripts/experienceScrollSpy';
  initExperienceScrollSpy(document);
</script>
```

(Add this as a second `<script>` at the bottom of `index.astro`, or append the import + call into the existing page-level script — either works; Astro bundles both.)

- [ ] **Step 4: Build + visual verify (scroll behavior)**

Run: `bun run build && bunx astro check`
With `bun run preview`, use Playwright: at 1440px scroll through the experience section and confirm the pinned panel's year/company/role updates as cards pass the reading line and the progress bar grows to 100% at the last job. At 768px confirm the panel is static (not pinned) and all 7 jobs render in order (Datum → Montazze). Confirm `NOW` pill only on Datum.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add experience section with sticky chapter panel and scroll-spy"
```

---

## Task 8: Projects + Contact + Footer

**Files:**
- Create: `src/components/projects/Projects.astro`, `src/components/contact/Contact.astro`, `src/components/layout/Footer.astro`
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `projects` (`groups`), `profile` (links/email); `SectionHeader`; `initMagnetic` (already wired globally — contact's giant link just needs `data-magnetic`).

- [ ] **Step 1: Write `Projects.astro`** (port prototype lines 130-158)

```astro
---
import { getEntry } from 'astro:content';
import SectionHeader from '@/components/layout/SectionHeader.astro';
const { data: pr } = (await getEntry('projects', 'projects'))!;
---
<section aria-labelledby="proj-h" class="py-[clamp(56px,8vw,120px)]">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)]">
    <SectionHeader no="04" label="Projects" />
    <h2 id="proj-h" class="sr-only">Projects</h2>
    <div class="flex flex-col gap-[clamp(36px,5vw,60px)]">
      {pr.groups.map((grp) => (
        <div data-reveal>
          <div class="text-[12px] font-bold tracking-[0.06em] uppercase text-accent mb-[18px]">{grp.label}</div>
          <div class="grid gap-[clamp(14px,1.6vw,22px)]" style="grid-template-columns:repeat(auto-fit,minmax(280px,1fr))">
            {grp.items.map((p) => (
              <div class="flex flex-col gap-[10px] p-[clamp(20px,2.2vw,26px)] bg-[#FBFBF9] border border-line rounded-[14px] transition duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_16px_36px_-22px_rgba(43,67,199,0.5)]">
                <div class="flex justify-between items-baseline gap-3">
                  <h4 class="m-0 font-display text-[clamp(19px,2vw,24px)] font-bold tracking-[-0.02em]">{p.name}</h4>
                  <span class="text-[12px] font-semibold text-muted whitespace-nowrap">{p.period}</span>
                </div>
                <p class="m-0 text-[14.5px] leading-[1.5] text-muted flex-1 text-pretty">{p.desc}</p>
                <div class="text-[12px] font-semibold text-accent pt-1">{p.stack}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Step 2: Write `Contact.astro`** (port prototype lines 160-176)

```astro
---
import { getEntry } from 'astro:content';
import SectionHeader from '@/components/layout/SectionHeader.astro';
const { data: p } = (await getEntry('profile', 'profile'))!;
---
<section id="contact" aria-labelledby="contact-h" class="pt-[clamp(80px,12vw,170px)] pb-[clamp(60px,8vw,100px)] border-t border-line">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)]">
    <SectionHeader no="05" label="Contact" />
    <h2 id="contact-h" data-reveal class="m-0 font-display text-[clamp(38px,7vw,98px)] font-extrabold tracking-[-0.04em] leading-[0.98] max-w-[13ch]">Let's make something <span class="text-accent">lasting</span>.</h2>
    <p data-reveal data-reveal-delay="80" class="my-[clamp(22px,3vw,32px)] text-[clamp(17px,2vw,22px)] text-muted max-w-[560px] leading-[1.5]">Open to senior frontend & full-stack roles and contracts — remote, worldwide. I usually reply within a day.</p>
    <a data-magnetic data-reveal data-reveal-delay="120" href={`mailto:${p.email}`} class="inline-block font-display text-[clamp(28px,5.5vw,74px)] font-bold tracking-[-0.035em] text-ink no-underline border-b-2 border-line pb-[6px] will-change-transform transition-colors duration-300 hover:text-accent hover:border-accent">{p.email}</a>
    <div data-reveal data-reveal-delay="160" class="flex flex-wrap gap-x-[clamp(24px,4vw,48px)] gap-y-[14px] mt-[clamp(40px,6vw,64px)] text-[14px] font-semibold">
      <a href={p.links.linkedin.href} target="_blank" rel="noopener" class="text-ink no-underline border-b border-line pb-[3px] transition-colors duration-200 hover:text-accent hover:border-accent">{p.links.linkedin.label}&nbsp;↗</a>
      <a href={p.links.github.href} target="_blank" rel="noopener" class="text-ink no-underline border-b border-line pb-[3px] transition-colors duration-200 hover:text-accent hover:border-accent">{p.links.github.label}&nbsp;↗</a>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Write `Footer.astro`** (port prototype lines 178-183)

```astro
---
import { getEntry } from 'astro:content';
const { data: p } = (await getEntry('profile', 'profile'))!;
const year = new Date().getFullYear();
---
<footer class="border-t border-line">
  <div class="max-w-[1200px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(24px,3vw,36px)] flex flex-wrap justify-between gap-[10px] text-[12px] font-medium text-muted">
    <span>© {year} {p.name}</span>
    <span>{p.role} · Remote-first</span>
  </div>
</footer>
```

- [ ] **Step 4: Mount all three in `index.astro`**

Final order inside `<main>`: `Hero`, `About`, `Skills`, `Experience`, `Projects`, `Contact`. Place `<Footer />` after `</main>`.

- [ ] **Step 5: Build + visual verify**

Run: `bun run build && bunx astro check`
Screenshot full page at 375 / 768 / 1440. Confirm: project cards grid reflows (1→2→3 cols), hover lift works, contact headline + giant email render, footer year correct, no overflow at any width.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add projects, contact and footer sections — page complete"
```

---

## Task 9: Final verification, performance, accessibility

**Files:**
- Modify: `src/components/seo/Seo.astro` (font preload if needed), any fixes surfaced by audits.
- Create: `README.md`

- [ ] **Step 1: Run the production build + type check**

Run: `bun run build && bunx astro check`
Expected: 0 errors, 0 warnings.

- [ ] **Step 2: Full unit test pass**

Run: `bun test`
Expected: all tests in `src/lib/*.test.ts` pass (4 total).

- [ ] **Step 3: Accessibility + reduced-motion check**

With `bun run preview` and Playwright:
- Emulate `prefers-reduced-motion: reduce` → reload → confirm ALL text is visible (hero name, all reveals) with no animation, and the spotlight layer is hidden.
- Keyboard-tab through the page → confirm visible focus on every link.
- Confirm landmarks: one `<header>` (hero), one `<main>`, each section has `aria-labelledby`, one `<footer>`.

- [ ] **Step 4: Lighthouse audit**

Run Lighthouse (or Playwright's audit) against the previewed page. Targets: SEO ≥ 95, Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95. Fix any flagged issue (missing alt, contrast, unsized image, render-blocking font) inline. If a font-related render-blocking warning appears, add an explicit `<link rel="preload" as="font" type="font/woff2" crossorigin href={...}>` in `Seo.astro` for the hashed Bricolage 800-weight file Astro emits into `dist/_astro/`.

- [ ] **Step 5: Verify SEO artifacts in `dist/`**

```bash
grep -c '"@type":"Person"' dist/index.html
grep -c '"@type":"ProfilePage"' dist/index.html
grep -c 'property="og:image"' dist/index.html
test -f dist/sitemap-index.xml && test -f dist/robots.txt && echo "artifacts ok"
```

Expected: each grep ≥ 1, "artifacts ok".

- [ ] **Step 6: Write `README.md`**

Document: stack; `bun install` / `bun run dev` / `bun run build` / `bun run preview`; where content lives (`src/content/` — how to edit profile/skills, add/reorder an experience file, add a project); where SEO config lives (`src/data/site.ts`); and how to deploy the static `dist/` to any host (Netlify/Vercel/Cloudflare Pages/GitHub Pages).

- [ ] **Step 7: Final commit**

```bash
git add -A
git commit -m "chore: final verification, a11y fixes, README"
```

---

## Self-Review (completed by author)

**Spec coverage:** Astro 7 static (T1) · Tailwind v4 tokens (T1) · Content Collections + Zod + ported data (T2) · SEO meta/OG/Twitter/JSON-LD/sitemap/robots/assets/images (T3) · all 6 interaction modules (T4 + experience spy T7) · hero (T5) · about/skills (T6) · experience sticky scroll-spy (T7) · projects/contact/footer (T8) · responsive + a11y + perf + Lighthouse + README (T9). `openSource` intentionally omitted per spec §11. ✔ all spec sections mapped.

**Placeholder scan:** No "TBD / handle edge cases". The two environment-dependent steps (OG image rasterization in T3.S10, font-preload hashed path in T9.S4) carry concrete fallback instructions rather than vague directions.

**Type consistency:** `sortExperience` signature consistent across T2/T3/T7. `buildJsonLd` args match between T3 test and impl. Collection access (`getEntry('profile','profile').data`, `.rows`, `.groups`) consistent across all consuming components. Script init fn names (`initSpotlight` / `initMagnetic` / `initReveal` / `initScramble` / `initHeroEntrance` / `initExperienceScrollSpy`) consistent between T4/T7 definitions and their T5/T7 call sites. Hero markup-only with global wiring in `index.astro` (no per-component duplicate `initReveal`).
