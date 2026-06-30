import { defineCollection } from 'astro:content';
import { z } from 'astro:schema';
import { glob, file } from 'astro/loaders';

const linkSchema = z.object({ label: z.string(), href: z.url() });

const profile = defineCollection({
  loader: file('src/content/profile.json'),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    disciplines: z.array(z.string()).min(1),
    location: z.string(),
    email: z.email(),
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

const education = defineCollection({
  loader: file('src/content/education.json'),
  schema: z.object({
    items: z.array(z.object({
      school: z.string(), degree: z.string(), detail: z.string(), period: z.string(),
    })),
  }),
});

const languages = defineCollection({
  loader: file('src/content/languages.json'),
  schema: z.object({
    items: z.array(z.object({ name: z.string(), level: z.string() })),
  }),
});

export const collections = { profile, skills, projects, experience, education, languages };
