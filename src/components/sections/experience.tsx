'use client';

import { motion } from 'motion/react';
import { Briefcase, ExternalLink } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { GlowCard } from '@/components/ui/glow-card';
import { RESUME_DATA } from '@/data/resume-data';

export function Experience() {
  return (
    <section id="experience" className="section relative">
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
          <h2 className="section-heading">
            <span className="text-glow-pink">Work</span> Experience
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative mx-auto max-w-4xl">
          {/* Timeline line */}
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan md:left-1/2 md:-translate-x-1/2" />

          {/* Experience items */}
          {RESUME_DATA.work.map((job, index) => (
            <motion.div
              key={`${job.company}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative mb-12 flex flex-col gap-8 md:flex-row ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 top-0 z-10 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-neon-pink bg-background shadow-neon-pink md:left-1/2 md:-translate-x-1/2">
                <motion.div
                  className="absolute inset-0 rounded-full bg-neon-pink"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Date label */}
              <div
                className={`hidden items-start md:flex justify-${
                  index % 2 === 0 ? 'start' : 'end'
                } w-1/2 pt-0`}
              >
                <span className="font-mono text-sm text-neon-cyan">
                  {job.start} - {job.end}
                </span>
              </div>

              {/* Content card */}
              <div className="pl-8 md:w-1/2 md:pl-0">
                <GlowCard
                  glowColor={index % 3 === 0 ? 'pink' : index % 3 === 1 ? 'cyan' : 'purple'}
                >
                  {/* Mobile date */}
                  <span className="mb-2 block font-mono text-sm text-neon-cyan md:hidden">
                    {job.start} - {job.end}
                  </span>

                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 flex items-center gap-1 text-sm text-neon-pink hover:underline"
                      >
                        {job.company}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    </div>
                    <Briefcase className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  </div>

                  {/* Badges */}
                  {job.badges.length > 0 && (
                    <div className="mb-4 flex flex-wrap gap-2">
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

                  {/* Description */}
                  <p className="mb-4 text-sm text-muted-foreground">{job.description}</p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded border border-border bg-card px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.techStack.length > 6 && (
                      <span className="rounded border border-border bg-card px-2 py-1 text-xs text-muted-foreground">
                        +{job.techStack.length - 6} more
                      </span>
                    )}
                  </div>
                </GlowCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
