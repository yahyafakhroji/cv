'use client';

import { motion } from 'motion/react';
import { FadeIn } from '@/components/animations/fade-in';
import { RESUME_DATA } from '@/data/resume-data';

const categoryAccent = {
  frontend: { color: 'pink', glowClass: 'text-glow-pink', neonClass: 'text-neon-pink' },
  backend: { color: 'cyan', glowClass: 'text-glow-cyan', neonClass: 'text-neon-cyan' },
  tools: { color: 'purple', glowClass: 'text-glow-purple', neonClass: 'text-neon-purple' },
} as const;

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="zone-skills section relative overflow-hidden"
    >
      {/* Background effect */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: `radial-gradient(circle at 20% 50%, hsl(var(--neon-pink) / 0.1), transparent 50%),
                       radial-gradient(circle at 80% 50%, hsl(var(--neon-cyan) / 0.1), transparent 50%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn>
          <h2 id="skills-heading" className="section-heading font-display">
            <span className="text-glow-cyan">Technical</span> Skills
          </h2>
          <p className="mx-auto -mt-8 mb-12 text-center font-mono text-sm text-white/50">
            System capabilities initialized
          </p>
        </FadeIn>

        {/* Categorized skill badges */}
        <div className="mx-auto grid max-w-5xl gap-10 md:gap-12 lg:grid-cols-3">
          {RESUME_DATA.skills.map((skillGroup, groupIndex) => {
            const accent =
              categoryAccent[skillGroup.category as keyof typeof categoryAccent] ??
              categoryAccent.backend;

            return (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: groupIndex * 0.12 }}
              >
                <h3
                  className={`mb-5 font-display text-lg font-semibold tracking-wide ${accent.glowClass} ${accent.neonClass}`}
                >
                  {skillGroup.label}
                </h3>

                <div className="flex flex-wrap gap-2.5">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.3,
                        delay: groupIndex * 0.1 + skillIndex * 0.03,
                      }}
                      whileHover={{
                        scale: 1.08,
                        boxShadow: `0 0 16px hsl(var(--neon-${accent.color}) / 0.4)`,
                      }}
                      className={`cursor-default rounded-full border px-4 py-2 text-sm transition-all border-neon-${accent.color}/30 text-neon-${accent.color} bg-neon-${accent.color}/5 hover:border-neon-${accent.color}/60 hover:bg-neon-${accent.color}/10`}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
