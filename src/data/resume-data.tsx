import {
  ClevertechLogo,
  ConsultlyLogo,
  JojoMobileLogo,
  Equinix,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Yahya Fakhroji",
  initials: "YF",
  location: "Malang, East Java, Indonesia",
  locationLink: "https://www.google.com/maps/place/Malang",
  about:
    "Frontend Engineer focused on building products with web technologies and extra attention to user POV.",
  summary:
    "As a Frontend Engineer, I have successfully taken multiple products from 0 to 1 and almost all of my products are built with web technologies. I lead teams effectively, ensuring an environment where people can do their best work. Currently, I work mostly with TypeScript, React, Vue, Angular, Node.js, and GraphQL. I have more than 8 years of experience in working remotely with companies all around the world.",
  avatarUrl: "https://avatars.githubusercontent.com/u/3510868?v=4",
  personalWebsiteUrl: "https://hiyahya.dev",
  contact: {
    email: "yahya.fakhroji@gmail.com",
    tel: "+6285852448921",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/yahyafakhroji",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/yahya-fakhroji/",
        icon: LinkedInIcon,
      },
    ],
  },
  education: [
    {
      school: "Atlas Nusantara Technology University",
      degree: "Bachelor of Informatics Engineering",
      start: "2013",
      end: "2018",
    },
  ],
  work: [
    {
      company: "Equinix Metal",
      link: "https://deploy.equinix.com/",
      badges: ["Remote"],
      title: "Consultant Product Developer",
      logo: Equinix,
      start: "2020",
      end: "Present",
      description:
        "Maintained Staff Portal v2 Angular 9+ and Angular Material. Maintained New Customer portal using NextJs.",
      techStack: [
        "TypeScript",
        "Angular",
        "Angular Material",
        "React",
        "Nextjs",
        "Tailwindcss",
        "Jira (Project Management)",
        "Slack",
      ],
    },
    {
      company: "Futr Asia",
      link: "https://futr.asia",
      badges: [],
      title: "Full Stack Web Developer & Project Leader",
      logo: ClevertechLogo,
      start: "2022",
      end: "2024",
      description:
        "I Joined Futr Asia as Full Stack Web Developer. But I also became the project leader for one of the projects there.",
      techStack: [
        "Angular",
        "React v18",
        "Chakra UI",
        "PWA",
        "Graphql Client",
        "Jotai (State management)",
        "Immer",
        "SCSS Preprocessor",
        "ESlint",
        "Typescript",
        "Prettier",
        "Docker",
        "Capacitor (for Android App)",
      ],
    },
    {
      company: "Packet Host",
      link: "https://deploy.equinix.com/",
      badges: ["Acquired by Equinix", "Remote"],
      title: "Front End Developer",
      logo: JojoMobileLogo,
      start: "2018",
      end: "2020",
      description:
        "Maintained Staff Portal using AngularJS and Laravel. Maintained Customer portal using React. Built New Staff Portal using Angular 2+ and Angular Material",
      techStack: ["AngularJS","Laravel","React","Angular","Angular Material","Bootstrap","Jira (Project Management)","Slack"],
    },
    {
      company: "Dinkum Interactive",
      link: "https://www.dinkuminteractive.com/",
      badges: ["Remote"],
      title: "Web Developer",
      logo: JojoMobileLogo,
      start: "2016",
      end: "2018",
      description:
        "Built Custom Wordpress Plugins. Built Custom Woocommerce Plugins. Worked on Project using Phalcon Framework and MithrilJS. Worked as Front end Developer on Project using AngularJS and Material UI",
      techStack: ["Wordpress","PHP","CSS","JQuery","AngularJs","Phalcon Framework (PHP)","Mithril JS","Material UI","Bootstrap","Trello (Task Management)","Slack"],
    },
    {
      company: "Montazze Studio",
      link: "https://montazze.com/",
      badges: [],
      title: "Web Developer",
      logo: JojoMobileLogo,
      start: "2015",
      end: "2016",
      description:
        "Collaborated with design teams to implement the desing to Wordpress Theme. Built Custom Wordpress Plugins. Built Custom Woocommerce Plugins",
      techStack: ["Wordpress","PHP","CSS","JQuery","Bootstrap","Trello (Task Management)","Slack","Skype"],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "Angular/AngularJS",
    "React/Next.js",
    "Vue/Nuxt",
    "Node.js/Adonis/Nest",
    "Ant Design/Chakra UI/Bootstrap/Angular Material",
    "PHP/Wordpress",
    "GraphQL",  
    "Git/Docker/Jira",
    "MySQL/PostgreSQL",
  ],
  projects: [
    {
      title: "Lini Courier",
      techStack: [
        "Lead + Full Stack Dev",
        "Lini Ecosystem",
        "TypeScript",
        "React",
        "Vite",
        "GraphQL",
        "Chakra UI",
        "Capacitor by Ionic",
      ],
      description: "The Driver/Courier App for focuses on efficient shipment management.",
      logo: ConsultlyLogo,
      timeline: "Sep 2022 - Jan 2024",
      link: {
        label: "https://courier.linistore.id/",
        href: "https://courier.linistore.id/",
      },
    },
    {
      title: "Lini Mitra",
      techStack: [
        "Lead + Full Stack Dev",
        "Lini Ecosystem",
        "TypeScript",
        "React",
        "Vite",
        "GraphQL",
        "Chakra UI",
        "Capacitor by Ionic",
      ],
      description: "Freelance Canvasser App is a versatile tool designed to streamline the canvassing process for freelance workers.",
      logo: ConsultlyLogo,
      timeline: "Sep 2022 - Jan 2024",
      link: {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=id.lini.mitra&hl=en",
      },
    },
    {
      title: "Lini Seller",
      techStack: [
        "Lead Frontend Dev",
        "Lini Ecosystem",
        "TypeScript",
        "Angular",
        "GraphQL",
        "Ant Design",
        "PWA",
      ],
      description: "Seller Center for UMKM/SME to manage their product and order.",
      logo: ConsultlyLogo,
      timeline: "Sep 2022 - Jan 2024",
      link: {
        label: "Lini Seller",
        href: "https://seller.linistore.id/",
      },
    },
    {
      title: "Lini Store",
      techStack: [
        "Lead Frontend Dev",
        "Lini Ecosystem",
        "TypeScript",
        "React",
        "Vite",
        "GraphQL",
        "Ant Design",
        "Tailwind CSS",
      ],
      description: "B2C Platform for display product from UMKM/SME.",
      logo: ConsultlyLogo,
      timeline: "Sep 2022 - Jan 2024",
      link: {
        label: "Lini Store",
        href: "https://linistore.id/",
      },
    },
    {
      title: "Lini Store x Nala",
      techStack: [
        "Lead + Full Stack Dev",
        "Lini Ecosystem",
        "TypeScript",
        "React",
        "Vite",
        "GraphQL",
        "Chakra UI",
        "PWA",
      ],
      description: "B2C collaboration with Nala Platform",
      logo: ConsultlyLogo,
      timeline: "Sep 2022 - Jan 2024",
      link: {
        label: "Lini Store x Nala",
        href: "https://nala.linistore.id/",
      },
    },
    {
      title: "Keeppack Customer & Staff App",
      techStack: [
        "Side Project",
        "Nuxt.Js",
        "Ant Design",
      ],
      description: "Cowarehousing and eCommerce Fulfillment System",
      logo: ConsultlyLogo,
      timeline: "Jul 2019 - Apr 2022",
      link: {
        label: "Keeppack",
        href: "https://keeppack.id/",
      },
    },
    {
      title: "Rosty Client and Admin App",
      techStack: [
        "Side Project",
        "Typescript",
        "Angular",
        "Angular Material",
        "Tailwind CSS",
      ],
      description: "Automation in Workforce Management. Managing your workforce made simpler through our end to end automation",
      logo: ConsultlyLogo,
      timeline: "Apr 2021 - Feb 2022",
    },
    {
      title: "Kelola WMS Customer & Staff App",
      techStack: [
        "Side Project",
        "Typescript",
        "Angular",
        "Angular Material",
        "Tailwind CSS",
      ],
      description: "Application that provides order fulfillment and product management services and is integrated with marketplaces.",
      logo: ConsultlyLogo,
      timeline: "Aug 2021 - Jan 2022",
      link: {
        label: "Kelola WMS",
        href: "https://app.kelola.id/",
      },
    },
    {
      title: "Bonbon Merchant App",
      techStack: [
        "Side Project",
        "Typescript",
        "Angular",
        "Bootstrap",
        "PWA",
      ],
      description: "Bonbon POS is the most advanced, feature-rich POS system on the market.",
      logo: ConsultlyLogo,
      timeline: "Aug 2020 - Dec 2021",
    },
    {
      title: "Moinves APP & API",
      techStack: [
        "Side Project",
        "PHP",
        "Prestashop",
        "Bootstrap",
        "JQuery",
      ],
      description: "Mutual Funds Investment App - by PT Mandiri Manajemen Investasi",
      logo: ConsultlyLogo,
      timeline: "Jan 2018 - Apr 2020",
      link: {
        label: "Moinves",
        href: "https://moinves.co.id/",
      },
    },
    {
      title: "Bonbon Customer App",
      techStack: [
        "Side Project",
        "Nuxt.Js",
        "Framework7",
        "PWA",
      ],
      description: "The restaurant app improves dining with digital features like table booking, food ordering, split bills, and easy payments.",
      logo: ConsultlyLogo,
      timeline: "Sep 2019 - Feb 2020",
      link: {
        label: "Bonbon",
        href: "https://pwa-demo.bonbon.co.id/",
      },
    },
    {
      title: "Copilot",
      techStack: [
        "Full Stack Dev",
        "PHP",
        "Phalcon Framework",
        "Mithril JS",
      ],
      description: "Copilot, our streamlined in-house system, integrates diverse data for quick decision-making in managing multiple clients and varied data sets.",
      logo: ConsultlyLogo,
      timeline: "Jul 2016 - Mar 2018",
    },
    {
      title: "MuseCRM",
      techStack: [
        "Frontend Dev",
        "Javascript",
        "Angular JS",
        "Bootstrap",
      ],
      description: "SaaS solution, revamps online ticketing and customer management with modern, user-friendly features.",
      logo: ConsultlyLogo,
      timeline: "Jul 2016 - Mar 2018",
      link: {
        label: "Muse CRM",
        href: "https://www.musecrm.com/",
      },
    },
    {
      title: "Site Survey Mobile App",
      techStack: [
        "Side Project",
        "Javascript",
        "Angular",
        "Ionic Framework",
        "Wordpress",
      ],
      description: "Geolocation-based site survey app that empowers cloud project management apps",
      logo: ConsultlyLogo,
      timeline: "Apr 2017 - Aug 2017",
      link: {
        label: "Site Survey",
        href: "https://activyco.id/",
      },
    },
  ],
} as const;