# UI/UX Refresh & Rebranding Design

**Date:** 2026-01-26
**Project:** CV Portfolio Website
**Theme:** Retro 80s Synthwave Aesthetic

---

## Overview

This design document outlines enhancements to the CV portfolio site to make it feel more fresh and professional while maintaining the retro 80s synthwave aesthetic. The improvements focus on three areas:

1. **Rebranding** - Repositioning from "Full-Stack Developer" to "Web Technologies Engineer"
2. **Interactive Micro-interactions** - Adding engaging hover effects and animations
3. **Visual Polish** - Enhanced retro effects (scanlines, glitch, holographic borders, cursor trail)

**Implementation Complexity:** 6-9 hours total

- Easy: Resume data updates (1-2 hours)
- Medium: Micro-interactions and CSS (3-4 hours)
- Complex: Cursor trail and advanced effects (2-3 hours)

---

## 1. Rebranding Strategy

### Professional Identity Change

**Title Transformation:**

- **From:** "Full-Stack Developer"
- **To:** "Web Technologies Engineer"

**Rationale:** Emphasizes technical depth and hands-on engineering expertise while maintaining focus on web technologies specifically. Aligns with the personal brand of being a "Web Technology Enthusiast" and "Fast Learner."

### Updated Messaging

**Hero Section:**

```typescript
// src/components/sections/hero.tsx
title: 'Web Technologies Engineer';
tagline: 'Engineering modern web experiences with cutting-edge technologies';
subtitle: '10+ years of turning ideas into reality';
```

**About Section:**

```typescript
// src/data/resume-data.tsx
about: 'Web Technologies Engineer | Exploring modern web frameworks & tools | 10+ years building scalable applications | Ex Equinix, Futr Asia, Packet'

summary: 'I'm a Web Technologies Engineer passionate about crafting robust, user-friendly applications. Over 10+ years, I've contributed to high-impact projects at companies like Equinix and Futr Asia, working across the full web stack—from Angular and React frontends to Node.js and PHP backends. I thrive on learning new technologies and delivering solutions that balance innovation with reliability.'
```

**Meta Title:**

```typescript
title: `${RESUME_DATA.name} | Web Technologies Engineer`;
```

---

## 2. Resume Data Enhancements

### Principles for Professional Yet Friendly Tone

**Do:**

- Use active verbs: "Built", "Led", "Architected", "Delivered", "Contributed"
- Add context: company size, user scale, business impact
- Show progression: "modernized", "enhanced", "optimized"
- Be specific: name technologies and outcomes

**Don't:**

- Use first person ("I joined") - keep it professional
- Be vague: "worked on project" → "developed X for Y purpose"
- Repeat yourself: vary language across descriptions
- Include filler words: "also", "but", "just"

### Work Experience Updates

#### Equinix Metal (2020-2024)

**Before:**

```
"Maintained Staff Portal v2 Angular 9+ and Angular Material. Maintained New Customer portal using NextJs."
```

**After:**

```typescript
description: 'Developed and maintained two key portals serving thousands of users: the Staff Portal (Angular 9+ with Angular Material) and Customer Portal (Next.js with Tailwind CSS). Collaborated with cross-functional teams to deliver feature enhancements and resolve critical issues, ensuring high availability and user satisfaction.';
```

#### Futr Asia (2022-2024)

**Before:**

```
"I Joined Futr Asia as Full Stack Web Developer. But I also became the project leader for one of the projects there."
```

**After:**

```typescript
description: 'Led the Lini ecosystem project as Full Stack Developer and Project Leader, architecting a suite of interconnected applications (Courier, Seller, Store, Mitra) using React, Angular, and GraphQL. Coordinated development workflows, mentored team members, and delivered production-ready PWAs with offline capabilities.';
```

#### Packet Host (2018-2020)

**Before:**

```
"Maintained Staff Portal using AngularJS and Laravel. Maintained Customer portal using React. Built New Staff Portal using Angular 2+ and Angular Material"
```

**After:**

```typescript
description: 'Modernized legacy portals by migrating from AngularJS to Angular 2+, improving performance and maintainability. Contributed to both Staff and Customer portals, working with React, Angular, and Laravel to deliver seamless user experiences for bare-metal cloud infrastructure customers.';
```

#### Dinkum Interactive (2016-2018)

**Before:**

```
"Built Custom Wordpress Plugins. Built Custom Woocommerce Plugins. Worked on Project using Phalcon Framework and MithrilJS. Worked as Front end Developer on Project using AngularJS and Material UI"
```

**After:**

```typescript
description: 'Developed custom WordPress and WooCommerce plugins for client projects, extending e-commerce functionality and integrating third-party APIs. Contributed to full-stack applications using Phalcon (PHP) and MithrilJS, and built responsive frontends with AngularJS and Material UI.';
```

#### Montazze Studio (2015-2016)

**Before:**

```
"Collaborated with design teams to implement the desing to Wordpress Theme. Built Custom Wordpress Plugins. Built Custom Woocommerce Plugins"
```

**After:**

```typescript
description: 'Collaborated with designers to translate mockups into pixel-perfect WordPress themes. Built custom plugins and WooCommerce extensions to meet client requirements, focusing on performance and user experience.';
```

### Projects Description Pattern

**Apply across all projects:**

- Lead with impact/purpose first
- Add user-facing value proposition
- Keep tech stack in tags (already good)

**Example - Lini Courier Enhancement:**

**Before:**

```
description: 'The Driver/Courier App for focuses on efficient shipment management.'
```

**After:**

```typescript
description: 'Mobile-first courier application built with React and Capacitor, enabling drivers to manage shipments efficiently with real-time tracking, offline support, and optimized routing. Part of the Lini ecosystem serving UMKM/SME businesses across Indonesia.';
```

---

## 3. Interactive Micro-interactions

### Animation Philosophy: Subtle Baseline + Bold Moments

**Baseline (Always Present):**

- Gentle hover states (300-400ms transitions)
- Restrained glow effects
- Smooth, professional feel

**Bold Moments (Strategic Placement):**

- Hero section: Dramatic glitch on name
- Project cards: Strong glow + tilt on hover
- Skills: Interactive badges that react to mouse
- Contact CTA: Eye-catching pulse effect

### Hero Section

#### Enhancement 1: Name Glitch Effect (BOLD)

**File:** `src/components/sections/hero.tsx`

```typescript
// On page load, name appears with dramatic glitch
Animation sequence:
1. Name hidden initially
2. Glitch effect (800ms) with chromatic aberration
   - Cyan channel offset: -3px horizontal
   - Pink channel offset: +3px horizontal
3. Channels recombine
4. Stable state

Trigger: Page load (once only)
Implementation: New component <GlitchReveal>
```

#### Enhancement 2: Floating Shapes Mouse Interaction (SUBTLE)

**File:** `src/components/ui/floating-shapes.tsx`

```typescript
// Geometric shapes react to cursor movement
Current: Shapes float randomly
Enhancement: Shapes move away from cursor (parallax depth)

Movement calculation:
- Distance threshold: 150px
- Movement range: 10-20px based on distance
- Transition: 600ms ease-out
- Z-index depth: Closer shapes move more
```

#### Enhancement 3: Grid Background Mouse Parallax (SUBTLE)

**File:** `src/components/ui/grid-background.tsx`

```typescript
// Grid tilts slightly based on mouse position
Current: Static 3D perspective grid
Enhancement: Grid rotateX/rotateY follows cursor

Rotation limits: ±2 degrees
Smoothing: Lerp interpolation (0.1 factor)
Mobile: Disabled for performance
```

### About Section

#### Enhancement 4: Avatar Magnetic Effect (SUBTLE)

**File:** `src/components/sections/about.tsx`

```typescript
// Avatar subtly follows cursor when nearby
Trigger: Mouse within 150px radius
Movement: Avatar moves 4-6px toward cursor
Glow: Border glow intensifies on hover (opacity 20% → 60%)
Reset: Smooth return to center (400ms)

Implementation: MagneticElement wrapper component
```

#### Enhancement 5: Stats Cards Hover Reveal (BOLD)

**File:** `src/components/sections/about.tsx`

```typescript
// Quick stats cards with enhanced hover
Default state: "10+ Years Experience"
Hover effects:
- Lift: 8px elevation
- Glow: Opacity 20% → 60%
- Scale: 1.0 → 1.02
- Shadow: Multi-layer shadow grows

Animation: 300ms ease-out
Optional: Card flip to show breakdown (can add later)
```

#### Enhancement 6: Social Icons Ripple Effect (SUBTLE)

**File:** `src/components/sections/about.tsx`

```typescript
// Icons create ripple on hover
Current: Simple color change
Enhancement: Radial pulse animation

Effect:
- Circle expands from icon center
- Size: 0 → 48px diameter
- Opacity: 1 → 0
- Duration: 600ms
- Color: Icon-specific (cyan for GitHub, purple for LinkedIn)
```

### Experience Section

#### Enhancement 7: Timeline Scroll Progress (SUBTLE)

**File:** `src/components/sections/experience.tsx`

```typescript
// Timeline line animates as you scroll
Current: Static gradient line
Enhancement: Progress indicator fills as you scroll

Implementation:
- Use Framer Motion useScroll hook
- Track scroll progress through section
- Gradient "flows" pink → purple → cyan
- Line height: 0% → 100% based on scroll
```

#### Enhancement 8: Job Card Tilt on Hover (BOLD)

**File:** `src/components/sections/experience.tsx`

```typescript
// Cards tilt toward cursor (3D effect)
Trigger: Mouse enters card
Effects:
- Tilt: rotateX/Y based on cursor position (max ±8 degrees)
- Glow: Mouse-tracking spotlight follows cursor
- Lift: 12px elevation with shadow
- Tech badges: Float up with stagger (50ms delay each)

Implementation: Card3D component with transform-style: preserve-3d
```

#### Enhancement 9: Tech Stack Badges Interactive (SUBTLE → BOLD)

**File:** `src/components/sections/experience.tsx`

```typescript
// Badges react to mouse proximity
States:
1. Default: Static badges
2. Mouse nearby (100px): Soft glow
3. Hover:
   - Scale: 1.1x
   - Glow: Intensifies (section color)
   - Optional: Tooltip "X years experience"

Animation: Spring physics (bouncy: 0.6)
```

### Projects Section

#### Enhancement 10: Holographic Border Effect (BOLD)

**File:** `src/components/sections/projects.tsx`

```typescript
// Project cards get animated rainbow border on hover
Current: Static border with mouse glow
Enhancement: Rotating gradient border

Gradient: Pink → Cyan → Purple → Pink (conic-gradient)
Rotation: 360° over 3 seconds
Border width: 1px → 3px glow on hover
Trigger: Hover only (performance)

CSS Implementation:
@keyframes rotate-gradient {
  0% { --angle: 0deg; }
  100% { --angle: 360deg; }
}
```

### Skills Section

#### Enhancement 11: Skill Badge Proximity Glow (SUBTLE → BOLD)

**File:** `src/components/sections/skills.tsx`

```typescript
// Badges glow based on distance to cursor
Detection radius: 120px from cursor
Glow calculation: intensity = (120 - distance) / 120

Colors by category:
- Frontend: Pink glow
- Backend: Cyan glow
- Tools: Purple glow

Hover state:
- Scale: 1.15x
- Glow: 3x intensity
- Pulse: 2s loop
```

### Contact Section

#### Enhancement 12: Email Button Pulse (BOLD)

**File:** `src/components/sections/contact.tsx`

```typescript
// CTA button with attention-grabbing pulse
Animation loop (2s):
- Glow: 0 → 20px → 0
- Box-shadow: rgba(neon-pink, 0.6)
- Border gradient: Rotates continuously

Hover enhancements:
- Pulse intensifies (faster, larger)
- Magnetic effect: Button moves 8px toward cursor
- Icon animation: Send icon "flies out" on click
```

#### Enhancement 13: Social Links Enhanced Hover (SUBTLE)

**File:** `src/components/sections/contact.tsx`

```typescript
// More engaging social link interactions
Hover state:
- Icon scale: 1.2x
- Background circle: Fade in behind icon
- Color: Icon → white, Background → brand color
- Animation: Spring bounce (overshoot)

Stagger: If moving between links, animate sequentially
```

---

## 4. Visual Polish & Retro Effects

### Global Effects

#### Enhancement 14: Scanline Overlay (SUBTLE)

**File:** `src/app/globals.css`

```css
/* Animated horizontal scanlines for CRT feel */
.scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 3px,
    rgba(255, 255, 255, 0.03) 3px,
    rgba(255, 255, 255, 0.03) 4px
  );
  animation: scanline-move 20s linear infinite;
}

@keyframes scanline-move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100px);
  }
}

/* Apply to hero, about, contact sections */
/* Mobile: Disabled */
```

#### Enhancement 15: Animated Noise Texture (SUBTLE)

**File:** `src/components/ui/grid-background.tsx`

```typescript
// Current noise is static, make it dynamic
Enhancement: Animated grain (film grain effect)
Method: Shift noise pattern every 100ms
Opacity: Keep at 3%
Blend mode: overlay

Implementation: CSS animation with multiple background images
```

#### Enhancement 16: Section Entry Glitch (BOLD)

**File:** Create `src/components/animations/glitch-reveal.tsx`

```typescript
// Brief glitch effect when sections enter viewport
Trigger: Intersection Observer (once per section)
Duration: 200ms
Effect: Chromatic aberration on headings

Animation sequence:
1. Heading splits into RGB channels (2px offset)
   - Red: +2px horizontal
   - Green: 0px
   - Blue: -2px horizontal
2. Channels recombine over 200ms
3. Stable state

Apply to: Hero (on load), Projects heading, Contact heading
```

### Card Enhancements

#### Enhancement 17: Multi-layer Card Shadows (SUBTLE)

**File:** `src/components/ui/glow-card.tsx`

```css
/* Layered shadows for depth */
.card-shadow-depth {
  box-shadow:
    0 4px 8px rgba(var(--neon-pink-rgb), 0.2),
    0 12px 24px rgba(var(--neon-cyan-rgb), 0.1),
    0 24px 48px rgba(0, 0, 0, 0.3);
  transition: box-shadow 300ms ease-out;
}

.card-shadow-depth:hover {
  box-shadow:
    0 8px 16px rgba(var(--neon-pink-rgb), 0.3),
    0 16px 32px rgba(var(--neon-cyan-rgb), 0.2),
    0 32px 64px rgba(0, 0, 0, 0.4);
}
```

#### Enhancement 18: Tech Badge Glow by Category (SUBTLE)

**File:** `src/components/sections/experience.tsx`, `src/components/sections/projects.tsx`

```typescript
// Each badge gets unique glow based on category
Categorization:
- Frontend: React, Angular, Vue, Next.js, Nuxt → Pink glow
- Backend: Node.js, PHP, GraphQL, Adonis, Nest → Cyan glow
- Tools: Git, Docker, Jira, MySQL, PostgreSQL → Purple glow

Hover effect:
- Glow intensifies 3x
- Pulsing animation: 2s loop
- Scale: 1.05x
```

### Background Enhancements

#### Enhancement 19: Sunset Gradient Animation (SUBTLE)

**File:** `src/components/sections/hero.tsx`

```typescript
// Current sunset is static, make it breathe
Animation: Hue shift ±5 degrees over 10s
Opacity pulse: 80% ↔ 100% (breathing effect)
Duration: 10s loop

CSS Implementation:
@keyframes sunset-breathe {
  0%, 100% {
    opacity: 0.8;
    filter: hue-rotate(0deg);
  }
  50% {
    opacity: 1.0;
    filter: hue-rotate(5deg);
  }
}
```

#### Enhancement 20: Grid Line Intensity Wave (SUBTLE)

**File:** `src/components/ui/grid-background.tsx`

```typescript
// Grid lines pulse with energy
Pattern: Wave effect from center outward
Speed: 4s cycle
Intensity: 60% → 100% → 60%

Implementation: SVG filter or CSS animation on gradient stops
```

### Typography Enhancements

#### Enhancement 21: Neon Tube Text Shadow (BOLD)

**File:** `src/app/globals.css`

```css
/* Multiple text shadows for neon tube effect */
.text-neon-glow {
  text-shadow:
    0 0 10px currentColor,
    /* Tight glow */ 0 0 20px currentColor,
    /* Medium glow */ 0 0 40px currentColor,
    /* Outer glow */ 0 2px 4px rgba(0, 0, 0, 0.5); /* Depth shadow */
}

/* Apply to: H1, H2 headings */
h1,
h2 {
  @apply text-neon-glow;
}
```

### Global Interactive Effect

#### Enhancement 22: Neon Cursor Trail (BOLD)

**File:** Create `src/components/ui/cursor-trail.tsx`

```typescript
// Cursor leaves glowing trail across entire site
Particles:
- Count: 7 dots trailing behind cursor
- Size: Start 6px, shrink to 0
- Spacing: 20px apart
- Colors: Cycle [neon-pink, neon-cyan, neon-purple]

Lifetime:
- Fade: 800ms (opacity 1 → 0)
- Scale: 1 → 0.3
- Blur: 2px gaussian

Performance:
- Canvas API for efficiency
- 60fps limit
- Disabled on mobile
- Disabled if prefers-reduced-motion

Toggle: Press 'T' key to disable/enable

Implementation:
interface Particle {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
}

const CursorTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Mouse move handler: create particles
    // Animation loop: update and render particles
    // Keyboard handler: toggle on 'T' key
  }, [enabled]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
    />
  );
};
```

### Footer Enhancements

#### Enhancement 23: Animated Heart Beat (SUBTLE)

**File:** `src/components/sections/footer.tsx`

```typescript
// "Made with ❤️" heart animation
Animation: Scale 1.0 → 1.2 → 1.0 (1.2s cycle)
Color: Gradient pink-to-red during pulse
Trigger: Continuous loop

Implementation:
<motion.span
  animate={{ scale: [1, 1.2, 1] }}
  transition={{ duration: 1.2, repeat: Infinity }}
>
  ❤️
</motion.span>
```

#### Enhancement 24: Back to Top Enhancement (SUBTLE)

**File:** `src/components/sections/footer.tsx`

```typescript
// More satisfying scroll-to-top
Entrance: Slide up when scrolled past hero (useScroll)
Hover:
- Rotate 180° (arrow flips)
- Scale 1.1x
- Glow intensifies

Click effect:
- Scale pulse (0.9x → 1.1x → 1x)
- Particle burst (5-7 small dots)
- Page scroll with brief glitch effect (VHS rewind)
```

---

## 5. Mobile & Accessibility Optimizations

### Mobile-Specific Rules

```typescript
// Disable heavy effects on mobile
const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  disable: [
    'cursor-trail',
    'mouse-tracking-glows',
    'parallax-effects',
    'noise-animation',
    'card-tilt-3d'
  ];

  simplify: {
    'card-hover': 'simple-scale', // No tilt, just scale
    'animation-duration': '0.7x'  // 30% faster
  };

  keep: [
    'fade-ins',
    'text-reveals',
    'basic-transitions',
    'color-changes'
  ];

  addTouchFeedback: {
    'tap-ripple': true, // Material Design-style ripple
    'haptic-feedback': true // If supported
  };
}
```

### Reduced Motion Support

```css
/* Respect user preferences */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  /* Disable specific effects */
  .cursor-trail,
  .scanlines,
  .glitch-effect,
  .parallax-element {
    display: none !important;
  }

  /* Keep only opacity and color changes */
  .fade-in {
    animation: none;
    opacity: 1;
  }
}
```

### Accessibility Enhancements

#### Focus States

```css
/* Keyboard navigation polish */
*:focus-visible {
  outline: 2px solid hsl(180 100% 50%); /* Neon cyan */
  outline-offset: 2px;
  animation: focus-pulse 1s ease-in-out infinite;
}

@keyframes focus-pulse {
  0%,
  100% {
    outline-color: hsl(180 100% 50%);
  }
  50% {
    outline-color: hsl(180 100% 70%);
  }
}

/* Tab order: Logical flow through sections */
/* Skip links: "Skip to main content" for screen readers */
```

#### ARIA Labels

```typescript
// Add descriptive labels for screen readers
<section aria-label="Professional Experience">
<section aria-label="Featured Projects">
<button aria-label="Send email to contact@hiyahya.dev">
<canvas aria-hidden="true"> {/* Cursor trail */}
```

---

## 6. Implementation Priority

### Phase 1: Quick Wins (1-2 hours)

**Goal:** Immediate visible improvements

1. ✅ Update resume data (all descriptions)
2. ✅ Change title to "Web Technologies Engineer"
3. ✅ Add multi-layer card shadows
4. ✅ Add tech badge glow by category
5. ✅ Add animated heart in footer

**Files to modify:**

- `src/data/resume-data.tsx`
- `src/components/sections/hero.tsx`
- `src/components/ui/glow-card.tsx`
- `src/components/sections/footer.tsx`
- `src/app/globals.css`

### Phase 2: Micro-interactions (3-4 hours)

**Goal:** Engaging hover effects

1. ✅ Avatar magnetic effect
2. ✅ Stats cards hover reveal
3. ✅ Social icons ripple
4. ✅ Job card 3D tilt
5. ✅ Timeline scroll progress
6. ✅ Email button pulse
7. ✅ Floating shapes mouse interaction
8. ✅ Skill badge proximity glow

**Files to modify:**

- `src/components/sections/about.tsx`
- `src/components/sections/experience.tsx`
- `src/components/sections/skills.tsx`
- `src/components/sections/contact.tsx`
- `src/components/ui/floating-shapes.tsx`
- `src/components/ui/magnetic-element.tsx` (new)
- `src/components/ui/card-3d.tsx` (new)

### Phase 3: Visual Polish (2-3 hours)

**Goal:** Premium retro effects

1. ✅ Scanline overlay
2. ✅ Section entry glitch
3. ✅ Name glitch on load
4. ✅ Holographic border on project cards
5. ✅ Neon tube text shadows
6. ✅ Grid background parallax
7. ✅ Sunset gradient animation
8. ✅ Cursor trail effect
9. ✅ Back to top enhancements

**Files to modify:**

- `src/app/globals.css`
- `src/components/animations/glitch-reveal.tsx` (new)
- `src/components/ui/cursor-trail.tsx` (new)
- `src/components/ui/grid-background.tsx`
- `src/components/sections/hero.tsx`
- `src/components/sections/projects.tsx`
- `src/components/sections/footer.tsx`

### Phase 4: Polish & Optimization (1 hour)

**Goal:** Performance and accessibility

1. ✅ Mobile detection and simplification
2. ✅ Reduced motion support
3. ✅ Focus state enhancements
4. ✅ ARIA labels
5. ✅ Performance testing
6. ✅ Cross-browser testing

**Files to modify:**

- All component files (add mobile checks)
- `src/app/globals.css` (media queries)
- `src/hooks/use-is-mobile.ts` (new)
- `src/hooks/use-reduced-motion.ts` (new)

---

## 7. Technical Implementation Notes

### New Dependencies (Optional)

```json
{
  "dependencies": {
    // All existing dependencies work
    // No new packages required!
  }
}
```

**Note:** All effects can be implemented with existing Motion (Framer Motion) and vanilla CSS/Canvas API. No additional libraries needed.

### New Hooks

#### `useIsMobile.ts`

```typescript
export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768 || /iPhone|iPad|iPod|Android/i.test(navigator.userAgent));
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isMobile;
};
```

#### `useReducedMotion.ts`

```typescript
export const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return reducedMotion;
};
```

#### `useMagneticEffect.ts`

```typescript
export const useMagneticEffect = (ref: RefObject<HTMLElement>, strength = 0.3) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      element.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
    };

    const handleMouseLeave = () => {
      element.style.transform = 'translate(0, 0)';
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref, strength]);
};
```

### New Components

#### `MagneticElement.tsx`

Wrapper component that applies magnetic effect to children.

#### `Card3D.tsx`

Enhanced card with 3D tilt effect based on mouse position.

#### `GlitchReveal.tsx`

Text reveal with chromatic aberration glitch effect.

#### `CursorTrail.tsx`

Global cursor trail effect using canvas.

---

## 8. Testing Checklist

### Visual Testing

- [ ] All sections render correctly on desktop (1920x1080, 1440x900)
- [ ] All sections render correctly on tablet (768x1024)
- [ ] All sections render correctly on mobile (375x667, 414x896)
- [ ] Animations are smooth (60fps minimum)
- [ ] No layout shifts or jank
- [ ] Colors and contrast meet WCAG AA standards

### Interaction Testing

- [ ] All hover effects work smoothly
- [ ] Cursor trail performs well (no lag)
- [ ] Magnetic effects feel natural
- [ ] Card tilts are smooth and responsive
- [ ] Button pulses are visible but not annoying
- [ ] Timeline scroll progress tracks correctly
- [ ] Back to top button appears at right time

### Performance Testing

- [ ] Page load time < 3 seconds
- [ ] Time to Interactive < 5 seconds
- [ ] No console errors or warnings
- [ ] Canvas effects don't cause memory leaks
- [ ] Mobile performance is acceptable (check with throttling)
- [ ] Animations respect reduced motion preferences

### Accessibility Testing

- [ ] All interactive elements are keyboard accessible
- [ ] Focus states are visible and styled
- [ ] Screen reader can navigate all content
- [ ] ARIA labels are present where needed
- [ ] Color contrast passes WCAG AA
- [ ] Reduced motion mode disables heavy animations

### Browser Testing

- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

---

## 9. Success Metrics

**Qualitative:**

- Site feels more premium and polished
- Retro aesthetic is stronger
- Professional brand is clearer ("Web Technologies Engineer")
- Interactions are delightful without being distracting

**Quantitative:**

- Lighthouse Performance Score: > 90
- Lighthouse Accessibility Score: 100
- Time on Page: Increase expected due to engagement
- Bounce Rate: Decrease expected due to better UX

---

## 10. Future Enhancements (Out of Scope)

Ideas to consider for v2:

1. **Dark/Light Mode Toggle** - Switch between synthwave themes
2. **Project Detail Modals** - Click cards to see full case studies
3. **Skills Filter** - Filter experience/projects by technology
4. **Testimonials Section** - Add social proof
5. **Blog Integration** - Share technical articles
6. **Easter Eggs** - Konami code for special effects
7. **Internationalization** - Multi-language support
8. **Resume Download** - Generate PDF from live data

---

## Conclusion

This design enhances the CV portfolio with professional branding, engaging micro-interactions, and polished retro effects while maintaining excellent performance and accessibility. The phased implementation approach allows for incremental delivery and testing.

**Total estimated effort:** 6-9 hours
**Expected impact:** Significantly improved user engagement and professional perception

Ready for implementation! 🚀
