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
