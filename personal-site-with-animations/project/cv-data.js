// Structured CV content for Yahya Fakhroji — shared by all site directions.
export const CV = {
  name: "Yahya Fakhroji",
  role: "Senior Software Engineer",
  disciplines: ["Web", "Mobile", "Desktop", "Backend"],
  location: "Malang, East Java, Indonesia",
  email: "contact@hiyahya.dev",
  links: {
    site: { label: "hiyahya.dev", href: "https://hiyahya.dev" },
    linkedin: { label: "linkedin.com/in/yahya-fakhroji", href: "https://linkedin.com/in/yahya-fakhroji" },
    github: { label: "github.com/yahyafakhroji", href: "https://github.com/yahyafakhroji" },
  },
  available: true,
  lead: "I design and ship production-grade software across web, mobile, desktop, and backend — end to end.",
  profile: "Software engineer with over a decade of experience working across the full product lifecycle: architecting systems, building polished interfaces, implementing services and APIs, and deploying to cloud and edge infrastructure. I've modernized enterprise portals for global cloud providers, led multi-app commerce ecosystems for emerging markets, and built crypto payment and wallet products. I care about clean architecture, developer experience, and reliable, user-centric software — and I'm comfortable mentoring teams and owning initiatives end to end.",
  facts: [
    { k: "Experience", v: "10+ years" },
    { k: "Base", v: "Malang, Indonesia" },
    { k: "Mode", v: "Remote-first" },
    { k: "Focus", v: "Frontend · Full-stack" },
  ],
  skills: [
    { label: "Languages & Web", items: "TypeScript, JavaScript, React, Next.js, React Router v7, Angular, Vue, Nuxt, Svelte" },
    { label: "Mobile & Desktop", items: "React Native, Expo, Capacitor, Ionic, Electron, PWA" },
    { label: "Backend & Data", items: "Node.js, NestJS, Hono, AdonisJS, Python, FastAPI, PHP, Laravel, GraphQL, REST, PostgreSQL, MySQL, Supabase" },
    { label: "Web3 & Blockchain", items: "Stellar, Soroban, Smart wallets, PasskeyKit, WalletConnect" },
    { label: "UI & Design Systems", items: "Tailwind CSS, Chakra UI, Ant Design, Angular Material, shadcn/ui, Figma-to-token workflows" },
    { label: "DevOps & Cloud", items: "Docker, Kubernetes, CI/CD, Cloudflare Workers, Git, Vite, Bun" },
    { label: "Practices", items: "Agile/Scrum, Code review, Performance optimization, Technical leadership, Mentoring" },
  ],
  experience: [
    {
      company: "Datum", role: "Senior Frontend Engineer", location: "New York, US · Remote",
      period: "Jan 2025 — Present", year: "2025", current: true,
      summary: "Customer & staff portals for a cloud platform — React Router v7, TypeScript, Hono, Bun on Kubernetes.",
      bullets: [
        "Build and maintain Datum Cloud's customer and staff portals using React, React Router v7, TypeScript, Hono and Bun, deployed on Kubernetes.",
        "Drive migration of legacy UI packages into a unified component library, standardizing the design system and accelerating delivery across teams.",
        "Lead a V3 frontend architecture initiative migrating the BFF layer from Express to Hono with React Query for performant, type-safe data flows.",
        "Implement permission-aware UI on the platform's RBAC module and contribute to security incident response, including remediation tooling and timeline reporting.",
      ],
    },
    {
      company: "MugglePay", role: "Full Stack Engineer", location: "Singapore · Remote",
      period: "Mar 2024 — Dec 2024", year: "2024",
      summary: "Crypto payment gateway — digital-asset payment flows across web services and merchant portals.",
      bullets: [
        "Developed full-stack features for a crypto payment gateway, integrating digital-asset payment flows across web services and merchant portals.",
        "Designed and consumed APIs spanning frontend and backend, focused on reliability and a smooth checkout experience for merchants.",
      ],
    },
    {
      company: "Equinix Metal", role: "Consultant Product Developer", location: "New York, US · Remote",
      period: "Mar 2020 — Aug 2024", year: "2020",
      summary: "Digital layer for one of the world's largest bare-metal cloud providers, serving thousands of enterprise users.",
      bullets: [
        "Engineered the digital layer for one of the world's largest bare-metal cloud providers, serving thousands of enterprise users.",
        "Built and maintained the Staff Portal (Angular, Angular Material) and Customer Portal (Next.js, React), shipping enhancements with cross-functional teams.",
        "Ensured high availability and seamless experiences for infrastructure customers through clean-code practices, code reviews and performance optimization.",
      ],
    },
    {
      company: "Futr Asia", role: "Full Stack Developer & Project Leader", location: "Malang, Indonesia",
      period: "Sep 2022 — Feb 2024", year: "2022",
      summary: "Led the Lini commerce ecosystem — five apps powering digital transformation for Indonesian SMEs.",
      bullets: [
        "Led the Lini commerce ecosystem (Courier, Seller, Store, Mitra and Nala apps) from concept to production, powering digital transformation for Indonesian SMEs/UMKM.",
        "Shipped offline-first PWAs deployed as native Android apps via Capacitor, using React, Angular and real-time GraphQL.",
        "Mentored team members, coordinated cross-app workflows, and owned system architecture and integrations.",
      ],
    },
    {
      company: "Packet Host", role: "Front End Developer", location: "US · Remote — acquired by Equinix",
      period: "Mar 2018 — Mar 2020", year: "2018",
      summary: "Migrated legacy AngularJS portals to Angular 2+ for bare-metal cloud infrastructure customers.",
      bullets: [
        "Migrated legacy AngularJS portals to Angular 2+, significantly improving performance and maintainability.",
        "Contributed to both Staff and Customer portals across React, Angular and Laravel for bare-metal cloud customers.",
      ],
    },
    {
      company: "Dinkum Interactive", role: "Web Developer", location: "US · Remote",
      period: "Jul 2016 — Mar 2018", year: "2016",
      summary: "Custom WordPress/WooCommerce plugins and full-stack apps with Phalcon and MithrilJS.",
      bullets: [
        "Developed custom WordPress and WooCommerce plugins with third-party API integrations for international clients.",
        "Built full-stack applications with Phalcon (PHP) and MithrilJS, including Copilot (analytics monitoring) and MuseCRM (SaaS ticketing).",
      ],
    },
    {
      company: "Montazze Studio", role: "Web Developer", location: "Malang, Indonesia",
      period: "Apr 2015 — Jun 2016", year: "2015",
      summary: "Custom WordPress themes and WooCommerce extensions — pixel-perfect, responsive interfaces.",
      bullets: [
        "Built custom WordPress themes and WooCommerce extensions, translating designs into pixel-perfect, responsive interfaces.",
        "Collaborated closely with design teams to ensure precise implementation of creative concepts.",
      ],
    },
  ],
  projectGroups: [
    {
      label: "Commerce & Logistics",
      items: [
        { name: "Lini Ecosystem", period: "2022 — 2024", desc: "Five-app commerce platform (Courier, Mitra, Seller, Store, Nala) for Indonesian SMEs, shipped to web and native Android.", stack: "React · Angular · GraphQL · Capacitor" },
        { name: "Keeppack", period: "2019 — 2022", desc: "Co-warehousing and e-commerce fulfillment system for online sellers, spanning customer and staff apps.", stack: "Nuxt.js · Ant Design" },
        { name: "Kelola WMS", period: "2021 — 2022", desc: "Marketplace-integrated warehouse management connecting order fulfillment with major marketplaces.", stack: "Angular · Tailwind CSS" },
      ],
    },
    {
      label: "Fintech, Payments & Crypto",
      items: [
        { name: "Rozo Wallet", period: "Recent", desc: "Cross-platform crypto wallet with Stellar smart wallets, passkey auth (PasskeyKit) and deep-link payment callbacks.", stack: "React Native · Expo · Stellar" },
        { name: "Moinves", period: "2018 — 2020", desc: "Mutual-fund investment platform and API for PT Mandiri Manajemen Investasi, broadening retail investment access.", stack: "PHP · PrestaShop" },
      ],
    },
    {
      label: "Hospitality & Point of Sale",
      items: [
        { name: "Bonbon Merchant", period: "2020 — 2021", desc: "Feature-rich point-of-sale system powering restaurant operations.", stack: "Angular · PWA" },
        { name: "Bonbon Customer", period: "2019 — 2020", desc: "Digital dining app with table booking, ordering, split bills and payments.", stack: "Nuxt.js · Framework7" },
      ],
    },
    {
      label: "Workforce & Field Operations",
      items: [
        { name: "Rosty", period: "2021 — 2022", desc: "End-to-end workforce management and automation platform with client and admin apps.", stack: "Angular · Tailwind CSS" },
        { name: "Site Survey Mobile", period: "2017", desc: "Geolocation-based field survey app powering cloud project management.", stack: "Angular · Ionic" },
      ],
    },
    {
      label: "Early Platforms",
      items: [
        { name: "Copilot", period: "2016 — 2018", desc: "In-house analytics and data-integration system unifying diverse client data for faster decision-making.", stack: "Phalcon (PHP) · MithrilJS" },
        { name: "MuseCRM", period: "2016 — 2018", desc: "SaaS online ticketing and customer-management platform.", stack: "AngularJS · Bootstrap" },
      ],
    },
  ],
  openSource: [
    { name: "hiyahya.dev", desc: "Personal portfolio and CV site.", stack: "Next.js 16 · Bun · Cloudflare Workers" },
    { name: "pusher-ts", desc: "Open-source Pusher server-side SDK for real-time messaging.", stack: "TypeScript · Express · Apache-2.0" },
    { name: "Starter templates", desc: "Boilerplates for NestJS, Next.js SaaS and React admin dashboards, plus Telegram bot starters.", stack: "TypeScript · Python" },
  ],
};
