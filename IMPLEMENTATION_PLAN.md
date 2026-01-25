# Portfolio Refactor: Retro 80s Synthwave Theme

## Design Inspiration
- **Primary Reference**: [cassie.codes](https://cassie.codes) - Playful, interactive, colorful with creative elements
- **Color Theme**: Retro 80s Synthwave/Neon aesthetic
- **Style**: Futuristic but minimalist with smooth animations

---

## Tech Stack (Updated Dependencies)

### Core Framework
| Package | Version | Purpose |
|---------|---------|---------|
| `next` | `15.1.11` | React framework with App Router |
| `react` | `^19` | UI library (latest) |
| `react-dom` | `^19` | React DOM |
| `typescript` | `^5.7` | Type safety |

### Animation Libraries
| Package | Version | Purpose |
|---------|---------|---------|
| `motion` | `^12.27.0` | Primary animation library (formerly framer-motion) |
| `gsap` | `^3.14.2` | Advanced animations, ScrollTrigger, SplitText |
| `@gsap/react` | `^2.1.2` | GSAP React integration |
| `lenis` | `^1.3.17` | Smooth scrolling |

### 3D Graphics (Optional)
| Package | Version | Purpose |
|---------|---------|---------|
| `three` | `^0.170.0` | 3D graphics |
| `@react-three/fiber` | `^9.5.0` | React Three.js renderer |
| `@react-three/drei` | `^10.7.7` | R3F helpers and components |

### UI Components
| Package | Version | Purpose |
|---------|---------|---------|
| `@radix-ui/react-*` | Latest | Accessible primitives |
| `lucide-react` | `^0.475.0` | Icons |
| `class-variance-authority` | `^0.7.1` | Component variants |
| `clsx` | `^2.1.1` | Class utilities |
| `tailwind-merge` | `^3.0.0` | Tailwind class merging |

### Styling
| Package | Version | Purpose |
|---------|---------|---------|
| `tailwindcss` | `^3.4.17` | Utility-first CSS |
| `tailwindcss-animate` | `^1.0.7` | Animation utilities |

---

## Color Palette: Synthwave Retro 80s

```css
:root {
  /* Base Colors */
  --background: 270 50% 5%;           /* Deep purple-black #0d0a14 */
  --foreground: 300 100% 97%;         /* Soft white #faf5ff */

  /* Neon Accents */
  --neon-pink: 330 100% 60%;          /* Hot pink #ff1a8c */
  --neon-cyan: 180 100% 50%;          /* Electric cyan #00ffff */
  --neon-purple: 280 100% 65%;        /* Vivid purple #a855f7 */
  --neon-blue: 220 100% 60%;          /* Electric blue #3366ff */
  --neon-orange: 25 100% 55%;         /* Sunset orange #ff6a1a */
  --neon-yellow: 50 100% 50%;         /* Golden yellow #ffd700 */

  /* Sunset Gradient */
  --sunset-1: 50 100% 50%;            /* Yellow #ffd319 */
  --sunset-2: 30 100% 56%;            /* Orange #ff901f */
  --sunset-3: 330 100% 56%;           /* Pink #ff2975 */
  --sunset-4: 300 100% 56%;           /* Magenta #f222ff */
  --sunset-5: 270 100% 56%;           /* Purple #8c1eff */

  /* UI Colors */
  --card: 270 40% 10%;                /* Dark purple card */
  --card-foreground: 300 100% 97%;
  --muted: 270 30% 20%;               /* Muted purple */
  --muted-foreground: 270 20% 60%;
  --border: 280 50% 25%;              /* Purple border */
  --ring: 330 100% 60%;               /* Neon pink ring */

  /* Glow Effects */
  --glow-pink: 0 0 20px hsl(330 100% 60% / 0.5);
  --glow-cyan: 0 0 20px hsl(180 100% 50% / 0.5);
  --glow-purple: 0 0 20px hsl(280 100% 65% / 0.5);
}
```

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Main portfolio page
│   ├── globals.css             # Global styles + theme
│   └── fonts/                  # Custom fonts (if needed)
│
├── components/
│   ├── providers/
│   │   ├── smooth-scroll-provider.tsx  # Lenis smooth scroll
│   │   └── animation-provider.tsx      # GSAP context
│   │
│   ├── sections/
│   │   ├── hero.tsx            # Hero with animated intro
│   │   ├── about.tsx           # About me section
│   │   ├── experience.tsx      # Work timeline
│   │   ├── projects.tsx        # Project showcase
│   │   ├── skills.tsx          # Skills visualization
│   │   └── contact.tsx         # Contact CTA
│   │
│   ├── ui/
│   │   ├── button.tsx          # Neon button variants
│   │   ├── card.tsx            # Glowing card
│   │   ├── badge.tsx           # Tech badges
│   │   ├── magnetic-button.tsx # Magnetic hover effect
│   │   ├── text-reveal.tsx     # Animated text reveal
│   │   ├── glow-border.tsx     # Animated glow border
│   │   ├── grid-background.tsx # Retro grid background
│   │   └── noise-overlay.tsx   # Subtle noise texture
│   │
│   ├── animations/
│   │   ├── fade-in.tsx         # Fade in on scroll
│   │   ├── slide-up.tsx        # Slide up animation
│   │   ├── stagger-children.tsx # Staggered children
│   │   ├── parallax.tsx        # Parallax effect
│   │   └── floating.tsx        # Floating animation
│   │
│   ├── 3d/                     # Optional 3D components
│   │   ├── scene.tsx           # Main 3D scene
│   │   ├── particles.tsx       # Particle system
│   │   └── floating-shapes.tsx # Geometric shapes
│   │
│   └── icons/                  # Custom icons
│       ├── github.tsx
│       ├── linkedin.tsx
│       └── x.tsx
│
├── data/
│   └── resume-data.tsx         # CV content (keep existing)
│
├── hooks/
│   ├── use-smooth-scroll.ts    # Lenis hook
│   ├── use-mouse-position.ts   # Mouse tracking
│   ├── use-in-view.ts          # Intersection observer
│   └── use-media-query.ts      # Responsive hook
│
└── lib/
    ├── utils.ts                # Utility functions
    └── animations.ts           # Animation presets
```

---

## Section Breakdown

### 1. Hero Section
**Purpose**: Captivating first impression introducing "Full-Stack Developer"

**Elements**:
- Retro grid background (CSS perspective grid fading into horizon)
- Animated sun/sunset gradient circle
- Name reveal animation (letter by letter with glow)
- Title: "Full-Stack Developer" with typing effect
- Floating geometric shapes (triangles, circles)
- Scroll indicator with pulse animation
- Subtle scanlines overlay

**Animations**:
- GSAP SplitText for name reveal
- Floating shapes with Motion
- Parallax on scroll

### 2. About Section
**Purpose**: Personal introduction with tech stack

**Elements**:
- Split layout: Avatar/3D element | Bio text
- Glowing border avatar
- Bio with staggered text reveal
- Tech stack icons with hover glow effects
- "Currently building at [Company]" highlight

**Animations**:
- Fade in from left/right on scroll
- Icon hover with scale and glow
- Text stagger animation

### 3. Experience Section
**Purpose**: Work history timeline

**Elements**:
- Vertical timeline with neon line
- Company cards with glow on hover
- Role badges and tech stack
- Date indicators

**Animations**:
- Timeline draws on scroll
- Cards slide in alternating left/right
- Badges animate on card reveal

### 4. Projects Section
**Purpose**: Showcase best work

**Elements**:
- Bento grid layout (asymmetric)
- Project cards with image/gradient preview
- Tech stack badges
- Hover: 3D tilt effect + border glow
- Featured project highlight

**Animations**:
- Staggered grid reveal
- 3D tilt on hover (Motion)
- Image parallax inside cards

### 5. Skills Section
**Purpose**: Technical capabilities

**Elements**:
- Categorized skills (Frontend, Backend, Tools)
- Animated skill bars with neon fill
- Or: floating skill bubbles
- Interactive hover states

**Animations**:
- Bars fill on scroll
- Skill icons pulse
- Category tabs animate

### 6. Contact Section
**Purpose**: Call to action

**Elements**:
- Large CTA text: "Let's work together"
- Animated gradient border button
- Social links with magnetic effect
- Email with copy functionality

**Animations**:
- Text reveal on scroll
- Button hover effects
- Social icons magnetic pull

---

## Animation Presets

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
};

export const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

export const slideInRight = {
  initial: { opacity: 0, x: 100 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};
```

---

## Typography

**Recommended Fonts**:
- **Headings**: "Space Grotesk" or "Outfit" (modern, geometric)
- **Body**: "Inter" or "Plus Jakarta Sans" (clean, readable)
- **Accent/Code**: "JetBrains Mono" (monospace for tech feel)

All available via Google Fonts or next/font.

---

## Performance Considerations

1. **Lazy load 3D components** - Only load Three.js when in viewport
2. **Reduce motion** - Respect `prefers-reduced-motion`
3. **Image optimization** - Use next/image with blur placeholders
4. **Code splitting** - Dynamic imports for heavy components
5. **Font optimization** - Use next/font for zero layout shift

---

## Implementation Order

1. **Foundation** (Day 1)
   - Update dependencies
   - Set up Tailwind theme
   - Create smooth scroll provider
   - Build animation utilities

2. **Core Components** (Day 2)
   - Hero section with grid background
   - Text reveal animations
   - Glow effects and borders

3. **Content Sections** (Day 3-4)
   - About section
   - Experience timeline
   - Projects grid
   - Skills visualization

4. **Polish** (Day 5)
   - Contact section
   - Page transitions
   - Mobile optimization
   - Performance tuning

---

## References & Resources

### Design Inspiration
- [Awwwards Portfolio Winners](https://www.awwwards.com/websites/winner_category_portfolio/)
- [cassie.codes](https://cassie.codes)
- [Synthwave Color Palettes](https://colorany.com/color-palettes/synthwave-color-palettes/)

### Animation Libraries
- [Motion Docs](https://motion.dev/)
- [GSAP Docs](https://gsap.com/docs/v3/)
- [Lenis Docs](https://lenis.darkroom.engineering/)

### 3D Graphics
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [@react-three/drei](https://github.com/pmndrs/drei)

---

## Notes

- Keep the existing `resume-data.tsx` as the data source
- Maintain print functionality from command menu
- Ensure accessibility with proper ARIA labels
- Test on mobile devices thoroughly
- Keep Cloudflare Pages deployment working
