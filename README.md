# Yahya Fakhroji - CV/Portfolio

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?logo=typescript)
![Bun](https://img.shields.io/badge/Bun-1.2-orange?logo=bun)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![Cloudflare](https://img.shields.io/badge/Cloudflare-Workers-F38020?logo=cloudflare)
![License](https://img.shields.io/badge/license-MIT-green)

A modern, high-performance CV/Portfolio website with a retro 80s synthwave aesthetic. Built with Next.js 16 and deployed on Cloudflare Workers for global edge performance.

**Live Site:** [https://hiyahya.dev](https://hiyahya.dev)

## ✨ Features

### Design & UX

- **Retro 80s Synthwave Theme** - Neon colors, gradient effects, and nostalgic vibes
- **Smooth Animations** - Motion (Framer Motion v12) powered interactions
- **Native Smooth Scrolling** - CSS-based smooth scroll (no JavaScript required)
- **Parallax Effects** - Sunset sun with scroll-based animations
- **Responsive Design** - Mobile-first, works perfectly on all devices
- **Dark Mode** - Synthwave dark theme with neon accents

### Performance

- **Edge Deployment** - Cloudflare Workers with global CDN
- **Optimized Bundle** - ~140KB smaller, fits in 3MB free tier limit
- **Static Generation** - Pre-rendered pages for instant loads
- **Image Optimization** - Next.js Image component with Cloudflare Images support
- **Lightweight** - Minimal dependencies, maximum performance

### Developer Experience

- **Single Config File** - Update everything in [`src/data/resume-data.tsx`](./src/data/resume-data.tsx)
- **TypeScript** - Full type safety throughout
- **Git Hooks** - Automated code quality checks with Lefthook
- **Auto Deploy** - Push to `main` branch triggers automatic deployment
- **Hot Reload** - Fast local development with Next.js Turbopack

## 🚀 Tech Stack

### Core

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5.9](https://www.typescriptlang.org/)** - Type safety

### Styling

- **[Tailwind CSS 3.4](https://tailwindcss.com/)** - Utility-first CSS
- **[Radix UI](https://www.radix-ui.com/)** - Headless UI components
- **Custom Synthwave Theme** - Neon colors, gradients, and animations

### Animation & Interactions

- **[Motion](https://motion.dev/)** (Framer Motion v12) - Declarative animations
- **Native CSS** - Smooth scrolling and transitions
- **Scroll-based animations** - Parallax effects with Motion hooks

### Deployment

- **[@opennextjs/cloudflare](https://opennext.js.org/cloudflare)** - OpenNext adapter for Cloudflare
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Edge computing platform
- **[Wrangler](https://developers.cloudflare.com/workers/wrangler/)** - Cloudflare CLI

### Icons & UI

- **[Lucide React](https://lucide.dev/)** - Minimal, tree-shakeable icon library
- **[Radix UI Primitives](https://www.radix-ui.com/)** - Accessible UI components (Dialog, Slot)

### Developer Tools

- **[Lefthook](https://lefthook.dev/)** - Fast Git hooks manager
- **[ESLint](https://eslint.org/)** - Code linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[TypeScript](https://www.typescriptlang.org/)** - Type checking

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yahyafakhroji/cv.git
cd cv

# Install dependencies
bun install
```

## 🛠️ Development

```bash
# Start development server
bun dev

# Open http://localhost:3000
```

### Git Hooks

This project uses Lefthook for automated code quality checks. Hooks are automatically installed on `bun install`.

**Pre-commit checks:**

- ESLint with auto-fix
- TypeScript type checking
- No `console.log` in source files

**Pre-push checks:**

- Full build validation

**Commit message validation:**

- Enforces [Conventional Commits](https://www.conventionalcommits.org/) format

See [docs/LEFTHOOK.md](./docs/LEFTHOOK.md) for detailed documentation.

## 🏗️ Build & Deploy

### Local Build

```bash
# Build for production
npm run pages:build

# Preview locally
bun run pages:dev
```

### Deploy to Cloudflare Workers

```bash
# Deploy to production
bun run pages:deploy
```

### Auto Deploy

Push to `main` branch to automatically trigger deployment via Cloudflare Workers integration with GitHub.

## ⚙️ Configuration

### Update Your Information

Edit [`src/data/resume-data.tsx`](./src/data/resume-data.tsx) to customize:

- Personal information
- Work experience
- Projects
- Skills
- Education
- Contact details

### Custom Domain

Update [`wrangler.toml`](./wrangler.toml) to add your custom domain:

```toml
[[routes]]
pattern = "yourdomain.com"
custom_domain = true
```

### Theme Customization

Modify colors and styles in:

- [`src/app/globals.css`](./src/app/globals.css) - CSS variables and theme
- [`tailwind.config.js`](./tailwind.config.js) - Tailwind configuration

## 📁 Project Structure

```
cv/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles & theme
│   ├── components/
│   │   ├── sections/          # Page sections
│   │   │   ├── hero.tsx
│   │   │   ├── about.tsx
│   │   │   ├── experience.tsx
│   │   │   ├── projects.tsx
│   │   │   └── skills.tsx
│   │   ├── ui/                # Reusable UI components
│   │   ├── animations/        # Animation components
│   │   └── providers/         # React context providers
│   ├── data/
│   │   └── resume-data.tsx    # 📝 Edit this file!
│   ├── hooks/                 # Custom React hooks
│   └── lib/                   # Utility functions
├── open-next.config.ts        # OpenNext configuration
├── wrangler.toml              # Cloudflare Workers config
└── package.json               # Dependencies & scripts
```

## 🎨 Sections

The portfolio includes these sections:

- **Hero** - Introduction with animated text
- **About** - Personal summary
- **Experience** - Work history timeline
- **Projects** - Portfolio showcase
- **Skills** - Technical skills grid
- **Contact** - Get in touch section
- **Footer** - Social links

## 🔧 Scripts

```bash
# Development
bun dev                  # Start dev server
bun run build            # Build Next.js app

# Cloudflare Deployment
bun run pages:build      # Build with OpenNext
bun run pages:dev        # Preview locally
bun run pages:deploy     # Deploy to Cloudflare

# Code Quality
bun run lint             # Run ESLint
```

## 📝 License

[MIT](https://choosealicense.com/licenses/mit/)

## 🙏 Credits

- Developed with: [Claude Code](https://claude.ai) - AI-powered coding assistant
- Logo/Favicon: Generated with [Google Gemini Nano](https://deepmind.google/technologies/gemini/nano/)
- Deployed with: [OpenNext Cloudflare](https://opennext.js.org/cloudflare)
- Hosting: [Cloudflare Workers](https://workers.cloudflare.com/)

## 📧 Contact

**Yahya Fakhroji**

- Website: [hiyahya.dev](https://hiyahya.dev)
- GitHub: [@yahyafakhroji](https://github.com/yahyafakhroji)
- LinkedIn: [yahya-fakhroji](https://www.linkedin.com/in/yahya-fakhroji/)

---

Built with ❤️ using Next.js and Claude Code
