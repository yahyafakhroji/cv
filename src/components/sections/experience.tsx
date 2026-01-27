'use client';

import { motion } from 'motion/react';
import { ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { GlowCard } from '@/components/ui/glow-card';
import { RESUME_DATA } from '@/data/resume-data';

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="zone-experience section relative"
    >
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-purple) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 80px',
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn>
          <h2 id="experience-heading" className="section-heading font-display">
            <span className="text-glow-pink">Work</span> Experience
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line - neon-pink to neon-cyan gradient */}
          <div
            className="absolute bottom-0 left-0 top-0 w-px md:left-1/2 md:-translate-x-1/2"
            style={{
              background:
                'linear-gradient(to bottom, hsl(var(--neon-pink)), hsl(var(--neon-purple)) 50%, hsl(var(--neon-cyan)))',
            }}
          />

          {/* Experience items */}
          {RESUME_DATA.work.map((job, index) => (
            <motion.div
              key={`${job.company}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                scale: 1,
                y: 0,
              }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className={`relative mb-12 flex flex-col gap-8 md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot with glow pulse */}
              <div
                className="absolute left-0 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-neon-cyan bg-background md:left-1/2 md:-translate-x-1/2"
                style={{
                  boxShadow:
                    '0 0 8px hsl(var(--neon-cyan) / 0.6), 0 0 16px hsl(var(--neon-cyan) / 0.3)',
                }}
              >
                <motion.div
                  className="absolute inset-0 rounded-full bg-neon-cyan"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Date label */}
              <div
                className={`hidden items-start md:flex ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                } w-1/2 pt-0`}
              >
                <span className="font-mono text-sm text-neon-cyan">
                  {job.start} - {job.end}
                </span>
              </div>

              {/* Content card with parallax depth */}
              <motion.div
                className="pl-8 md:w-1/2 md:pl-0"
                whileInView={{ scale: 1.0 }}
                viewport={{ once: false, amount: 0.5 }}
                initial={{ scale: 0.97 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <GlowCard
                  glowColor={index % 3 === 0 ? 'pink' : index % 3 === 1 ? 'cyan' : 'purple'}
                >
                  {/* Mobile date */}
                  <span className="mb-2 block font-mono text-sm text-neon-cyan md:hidden">
                    {job.start} - {job.end}
                  </span>

                  {/* Header: Company + Badges */}
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <a
                      href={job.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm font-medium text-neon-pink hover:underline"
                    >
                      {job.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                    {job.badges.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {job.badges.map((badge) => (
                          <span
                            key={badge}
                            className="rounded-full border border-neon-purple/30 bg-neon-purple/20 px-2 py-1 text-xs text-neon-purple"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Title and period */}
                  <h3 className="mb-4 text-lg font-semibold text-foreground">
                    {job.title}
                    <span className="hidden text-sm font-normal text-muted-foreground md:inline">
                      {' '}
                      &middot; {job.start} &ndash; {job.end}
                    </span>
                  </h3>

                  {/* Hook line - bold glowing cyan text */}
                  <p
                    className="mb-3 text-base font-bold text-neon-cyan"
                    style={{
                      textShadow:
                        '0 0 8px hsl(var(--neon-cyan) / 0.5), 0 0 16px hsl(var(--neon-cyan) / 0.25)',
                    }}
                  >
                    {job.hookLine}
                  </p>

                  {/* Description */}
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    {job.description}
                  </p>

                  {/* Tech stack - frosted glass tags */}
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-white/10 bg-white/5 px-2 py-1 text-xs text-muted-foreground backdrop-blur-sm transition-colors hover:border-neon-cyan/30 hover:text-neon-cyan/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </GlowCard>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
