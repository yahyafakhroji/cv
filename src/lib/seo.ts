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
        image: `${site.url}/img/avatar.png`,
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
