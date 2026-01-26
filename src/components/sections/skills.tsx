'use client';

import { motion } from 'motion/react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { RESUME_DATA } from '@/data/resume-data';

// Map skills to categories
const skillCategories = {
  Frontend: [
    'JavaScript',
    'TypeScript',
    'Angular/AngularJS',
    'React/Next.js',
    'Vue/Nuxt',
    'Ant Design/Chakra UI/Bootstrap/Angular Material',
  ],
  Backend: ['Node.js/Adonis/Nest', 'PHP/Wordpress', 'GraphQL'],
  Tools: ['Git/Docker/Jira', 'MySQL/PostgreSQL'],
};

const glowColors = {
  Frontend: 'pink',
  Backend: 'cyan',
  Tools: 'purple',
} as const;

export function Skills() {
  return (
    <section id="skills" className="section relative overflow-hidden">
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
          <h2 className="section-heading">
            <span className="text-glow-cyan">Technical</span> Skills
          </h2>
        </FadeIn>

        {/* Skills grid by category */}
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {Object.entries(skillCategories).map(([category, skills], categoryIndex) => {
            const color = glowColors[category as keyof typeof glowColors];
            const colorVar = `var(--neon-${color})`;

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
                className="relative"
              >
                {/* Category header */}
                <div className="mb-6 flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{
                      backgroundColor: `hsl(${colorVar})`,
                      boxShadow: `0 0 10px hsl(${colorVar} / 0.5)`,
                    }}
                  />
                  <h3 className="text-xl font-semibold" style={{ color: `hsl(${colorVar})` }}>
                    {category}
                  </h3>
                </div>

                {/* Skills list */}
                <StaggerChildren className="space-y-3" staggerDelay={0.05}>
                  {skills.map((skill, skillIndex) => (
                    <StaggerItem key={skill}>
                      <motion.div
                        className="group relative"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {/* Skill bar background */}
                        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-3 transition-colors group-hover:border-border/80">
                          {/* Animated fill */}
                          <motion.div
                            className="absolute inset-0 rounded-lg"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 0.8,
                              delay: categoryIndex * 0.1 + skillIndex * 0.05,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            style={{
                              background: `linear-gradient(90deg, hsl(${colorVar} / 0.1), hsl(${colorVar} / 0.05))`,
                              transformOrigin: 'left',
                            }}
                          />

                          {/* Skill text */}
                          <span className="relative z-10 text-sm text-foreground/90">{skill}</span>

                          {/* Hover glow line */}
                          <motion.div
                            className="absolute bottom-0 left-0 top-0 w-1 rounded-l-lg opacity-0 transition-opacity group-hover:opacity-100"
                            style={{ backgroundColor: `hsl(${colorVar})` }}
                          />
                        </div>
                      </motion.div>
                    </StaggerItem>
                  ))}
                </StaggerChildren>
              </motion.div>
            );
          })}
        </div>

        {/* All skills as floating badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-16 max-w-4xl"
        >
          <h4 className="mb-6 text-center text-muted-foreground">All Technologies</h4>
          <div className="flex flex-wrap justify-center gap-3">
            {RESUME_DATA.skills.map((skill, index) => {
              const colors = ['pink', 'cyan', 'purple'] as const;
              const color = colors[index % 3];
              return (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 20px hsl(var(--neon-${color}) / 0.4)`,
                  }}
                  className={`cursor-default rounded-full border px-4 py-2 text-sm transition-all border-neon-${color}/30 text-neon-${color} bg-neon-${color}/5 hover:border-neon-${color}/60 hover:bg-neon-${color}/10`}
                >
                  {skill}
                </motion.span>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
