'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { motion, useInView } from 'motion/react';
import { FadeIn } from '@/components/animations/fade-in';
import { RESUME_DATA } from '@/data/resume-data';

/** Accent color config per category */
const categoryAccent = {
  frontend: {
    color: 'pink',
    cssVar: 'var(--neon-pink)',
    glowClass: 'text-glow-pink',
  },
  backend: {
    color: 'cyan',
    cssVar: 'var(--neon-cyan)',
    glowClass: 'text-glow-cyan',
  },
  tools: {
    color: 'purple',
    cssVar: 'var(--neon-purple)',
    glowClass: 'text-glow-purple',
  },
} as const;

/**
 * Generate a deterministic pseudo-random height between min and max
 * based on a seed string (skill name). This keeps the heights stable
 * across renders without using Math.random().
 */
function seededHeight(seed: string, min: number, max: number): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = (Math.abs(hash) % 1000) / 1000;
  return min + normalized * (max - min);
}

/** A single equalizer bar for one skill */
function EqualizerBar({
  skill,
  index,
  isInView,
  accentVar,
  categoryDelay,
}: {
  skill: string;
  index: number;
  isInView: boolean;
  accentVar: string;
  categoryDelay: number;
}) {
  const targetHeight = useMemo(() => seededHeight(skill, 55, 100), [skill]);
  const [hasFilled, setHasFilled] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(
      () => setHasFilled(true),
      categoryDelay + index * 60 + 800 // wait for initial grow animation
    );
    return () => clearTimeout(timer);
  }, [isInView, index, categoryDelay]);

  return (
    <div className="flex flex-col items-center gap-1.5" style={{ minWidth: 0 }}>
      {/* Bar container */}
      <div className="relative w-full overflow-hidden rounded-t-sm" style={{ height: 120 }}>
        {/* Background track */}
        <div
          className="absolute inset-x-0 bottom-0 rounded-t-sm"
          style={{
            height: '100%',
            background: `hsl(${accentVar} / 0.06)`,
          }}
        />

        {/* Filled bar */}
        <motion.div
          className={`equalizer-bar absolute inset-x-0 bottom-0${hasFilled ? 'pulse' : ''}`}
          style={
            {
              '--bar-height': `${targetHeight}%`,
              background: `linear-gradient(to top, hsl(${accentVar}), hsl(${accentVar} / 0.6))`,
            } as React.CSSProperties
          }
          initial={{ height: '0%' }}
          animate={isInView ? { height: `${targetHeight}%` } : { height: '0%' }}
          transition={{
            duration: 0.8,
            delay: categoryDelay / 1000 + index * 0.06,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />

        {/* Top glow cap */}
        <motion.div
          className="absolute inset-x-0 h-1 rounded-t-sm"
          style={{
            background: `hsl(${accentVar})`,
            boxShadow: `0 0 8px hsl(${accentVar} / 0.8), 0 -2px 12px hsl(${accentVar} / 0.4)`,
          }}
          initial={{ bottom: '0%', opacity: 0 }}
          animate={
            isInView ? { bottom: `${targetHeight}%`, opacity: 1 } : { bottom: '0%', opacity: 0 }
          }
          transition={{
            duration: 0.8,
            delay: categoryDelay / 1000 + index * 0.06,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        />
      </div>

      {/* Skill label */}
      <span
        className="w-full truncate text-center text-[10px] leading-tight text-white/50 sm:text-xs"
        title={skill}
      >
        {skill}
      </span>
    </div>
  );
}

/** A single category equalizer panel */
function CategoryEqualizer({
  skillGroup,
  categoryIndex,
}: {
  skillGroup: (typeof RESUME_DATA.skills)[number];
  categoryIndex: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const accent =
    categoryAccent[skillGroup.category as keyof typeof categoryAccent] ?? categoryAccent.backend;
  const categoryDelay = categoryIndex * 150;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: categoryIndex * 0.12 }}
      className="relative"
    >
      {/* Category label */}
      <h3
        className={`mb-4 font-display text-lg font-semibold tracking-wide sm:text-xl ${accent.glowClass}`}
        style={{ color: `hsl(${accent.cssVar})` }}
      >
        {skillGroup.label}
      </h3>

      {/* Equalizer deck */}
      <div
        className="rounded-lg border border-white/10 bg-white/[0.02] p-3 sm:p-4"
        style={{
          boxShadow: `inset 0 0 40px hsl(${accent.cssVar} / 0.03)`,
        }}
      >
        {/* Bars grid */}
        <div
          className="grid gap-1.5 sm:gap-2"
          style={{
            gridTemplateColumns: `repeat(${skillGroup.items.length}, minmax(0, 1fr))`,
          }}
        >
          {skillGroup.items.map((skill, skillIndex) => (
            <EqualizerBar
              key={skill}
              skill={skill}
              index={skillIndex}
              isInView={isInView}
              accentVar={accent.cssVar}
              categoryDelay={categoryDelay}
            />
          ))}
        </div>

        {/* Bottom baseline */}
        <div className="mt-1 h-px w-full" style={{ background: `hsl(${accent.cssVar} / 0.3)` }} />
      </div>
    </motion.div>
  );
}

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

        {/* Equalizer panels by category */}
        <div className="mx-auto grid max-w-6xl gap-6 md:gap-8 lg:grid-cols-3">
          {RESUME_DATA.skills.map((skillGroup, categoryIndex) => (
            <CategoryEqualizer
              key={skillGroup.category}
              skillGroup={skillGroup}
              categoryIndex={categoryIndex}
            />
          ))}
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
            {RESUME_DATA.skills.flatMap((skillGroup, groupIndex) => {
              const colors = ['pink', 'cyan', 'purple'] as const;
              const color = colors[groupIndex % 3];
              return skillGroup.items.map((skill, skillIndex) => (
                <motion.span
                  key={`${skillGroup.category}-${skill}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.3,
                    delay: (groupIndex * skillGroup.items.length + skillIndex) * 0.03,
                  }}
                  whileHover={{
                    scale: 1.1,
                    boxShadow: `0 0 20px hsl(var(--neon-${color}) / 0.4)`,
                  }}
                  className={`cursor-default rounded-full border px-4 py-2 text-sm transition-all border-neon-${color}/30 text-neon-${color} bg-neon-${color}/5 hover:border-neon-${color}/60 hover:bg-neon-${color}/10`}
                >
                  {skill}
                </motion.span>
              ));
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
