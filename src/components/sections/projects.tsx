'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Calendar } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { RESUME_DATA } from '@/data/resume-data';

type ColorGroup = 'cyan' | 'purple' | 'pink';

const colorConfig: Record<
  ColorGroup,
  {
    cssVar: string;
    textClass: string;
    borderColor: string;
    borderColorSubtle: string;
    gradient: string;
    glowShadow: string;
    tagBorderColor: string;
  }
> = {
  cyan: {
    cssVar: '--neon-cyan',
    textClass: 'text-neon-cyan',
    borderColor: 'hsl(180 100% 50% / 0.5)',
    borderColorSubtle: 'hsl(180 100% 50% / 0.2)',
    gradient: 'hsl(var(--neon-cyan) / 0.1)',
    glowShadow:
      'inset 0 0 20px hsl(var(--neon-cyan) / 0.15), 0 0 15px hsl(var(--neon-cyan) / 0.08)',
    tagBorderColor: 'hsl(180 100% 50% / 0.2)',
  },
  purple: {
    cssVar: '--neon-purple',
    textClass: 'text-neon-purple',
    borderColor: 'hsl(280 100% 65% / 0.5)',
    borderColorSubtle: 'hsl(280 100% 65% / 0.2)',
    gradient: 'hsl(var(--neon-purple) / 0.1)',
    glowShadow:
      'inset 0 0 20px hsl(var(--neon-purple) / 0.15), 0 0 15px hsl(var(--neon-purple) / 0.08)',
    tagBorderColor: 'hsl(280 100% 65% / 0.2)',
  },
  pink: {
    cssVar: '--neon-pink',
    textClass: 'text-neon-pink',
    borderColor: 'hsl(330 100% 60% / 0.5)',
    borderColorSubtle: 'hsl(330 100% 60% / 0.2)',
    gradient: 'hsl(var(--neon-pink) / 0.1)',
    glowShadow:
      'inset 0 0 20px hsl(var(--neon-pink) / 0.15), 0 0 15px hsl(var(--neon-pink) / 0.08)',
    tagBorderColor: 'hsl(330 100% 60% / 0.2)',
  },
};

function ProjectCard({
  project,
  index,
  color,
}: {
  project: (typeof RESUME_DATA.projects)[number];
  index: number;
  color: ColorGroup;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const cfg = colorConfig[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="frosted-glass group relative overflow-hidden rounded-xl p-6 transition-all duration-300"
      style={{
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: isHovered ? cfg.borderColor : 'hsla(270, 50%, 40%, 0.15)',
        boxShadow: isHovered ? cfg.glowShadow : undefined,
      }}
    >
      {/* Gradient overlay on hover */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${cfg.gradient}, transparent 70%)`,
        }}
      />

      {/* CRT flicker on hover */}
      {isHovered && <div className="crt-flicker" />}

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className={`text-lg font-semibold ${cfg.textClass}`}>{project.title}</h3>
          {'link' in project && project.link && (
            <motion.a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 rounded-lg border border-border bg-background/50 p-2 transition-colors"
              style={{ borderColor: isHovered ? cfg.borderColorSubtle : undefined }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ExternalLink className="h-4 w-4" />
            </motion.a>
          )}
        </div>

        {/* Timeline */}
        {project.timeline && (
          <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
            <Calendar className="h-3 w-3" />
            {project.timeline}
          </div>
        )}

        {/* Description (shown when not hovered) */}
        <div
          className="overflow-hidden transition-all duration-200"
          style={{
            maxHeight: isHovered ? 0 : '3.5rem',
            opacity: isHovered ? 0 : 1,
            marginBottom: isHovered ? 0 : '1rem',
          }}
        >
          <p className="line-clamp-2 text-sm text-muted-foreground">{project.description}</p>
        </div>

        {/* Tagline + Impact overlay (shown on hover) */}
        <div
          className="overflow-hidden transition-all duration-200"
          style={{
            maxHeight: isHovered ? '6rem' : 0,
            opacity: isHovered ? 1 : 0,
            marginBottom: isHovered ? '1rem' : 0,
          }}
        >
          {'tagline' in project && project.tagline && (
            <p className={`text-sm font-medium ${cfg.textClass} mb-1`}>{project.tagline}</p>
          )}
          {'impactLine' in project && project.impactLine && (
            <p className="font-mono text-xs leading-relaxed text-white/60">{project.impactLine}</p>
          )}
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack
            .filter((tech) => tech !== 'Lini Ecosystem' && tech !== 'Side Project')
            .map((tech) => (
              <span
                key={tech}
                className="rounded bg-background/50 px-2 py-0.5 text-xs text-muted-foreground"
                style={{ border: `1px solid ${cfg.tagBorderColor}` }}
              >
                {tech}
              </span>
            ))}
        </div>
      </div>

      {/* Border glow effect */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          boxShadow: cfg.glowShadow,
        }}
      />
    </motion.div>
  );
}

export function Projects() {
  const allProjects = RESUME_DATA.projects;

  const liniProjects = allProjects.filter((p) =>
    (p.techStack as readonly string[]).includes('Lini Ecosystem')
  );
  const sideProjects = allProjects.filter(
    (p) =>
      (p.techStack as readonly string[]).includes('Side Project') &&
      !(p.techStack as readonly string[]).includes('Lini Ecosystem')
  );
  const otherProjects = allProjects.filter(
    (p) =>
      !(p.techStack as readonly string[]).includes('Lini Ecosystem') &&
      !(p.techStack as readonly string[]).includes('Side Project')
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section zone-projects relative"
    >
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 id="projects-heading" className="section-heading font-display">
            Featured <span className="text-glow-purple">Projects</span>
          </h2>
        </FadeIn>

        {/* === Lini Ecosystem === */}
        <div className="mx-auto max-w-6xl">
          <FadeIn delay={0.1}>
            <div className="mb-4">
              <h3 className="text-glow-cyan font-display text-lg text-neon-cyan">Lini Ecosystem</h3>
              <p className="font-mono text-sm text-white/50">
                Full-stack commerce ecosystem for Indonesia&apos;s emerging digital economy
              </p>
            </div>
          </FadeIn>

          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {liniProjects.map((project, index) => (
              <ProjectCard key={project.title} project={project} index={index} color="cyan" />
            ))}
          </div>
        </div>

        {/* === Separator === */}
        <div className="mx-auto mb-8 max-w-6xl">
          <FadeIn delay={0.15}>
            <div className="flex items-center gap-4">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
              <span className="font-display text-xs uppercase tracking-widest text-neon-purple/60">
                Other Projects
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
            </div>
          </FadeIn>
        </div>

        {/* === Side Projects === */}
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {sideProjects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index + liniProjects.length}
                color="purple"
              />
            ))}
          </div>
        </div>

        {/* === Older / Other Work === */}
        {otherProjects.length > 0 && (
          <div className="mx-auto max-w-6xl">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  index={index + liniProjects.length + sideProjects.length}
                  color="pink"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
