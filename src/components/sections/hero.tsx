'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { GridBackground } from '@/components/ui/grid-background';
import { SunsetSun } from '@/components/ui/sunset-sun';
import { FloatingShapes } from '@/components/ui/floating-shapes';
import { TypewriterText } from '@/components/animations/text-reveal';
import { RESUME_DATA } from '@/data/resume-data';

export function Hero() {
  // Parallax scroll effect for the sunset sun - grows bigger as you scroll
  const { scrollY } = useScroll();
  const sunY = useTransform(scrollY, [0, 500], [0, 100]);
  const sunOpacity = useTransform(scrollY, [0, 400], [0.3, 0]);
  const sunScale = useTransform(scrollY, [0, 500], [1, 1.5]); // Grows 50% bigger

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background elements */}
      <GridBackground />
      <FloatingShapes />

      {/* Sunset sun - positioned behind content with parallax scroll effect */}
      <motion.div
        className="absolute bottom-0 left-1/2 z-0"
        style={{
          x: '-50%', // Centers horizontally
          y: sunY,
          opacity: sunOpacity,
          scale: sunScale,
        }}
      >
        <SunsetSun size={400} />
      </motion.div>

      {/* Content */}
      <div className="text-shadow-lg relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-4 text-lg uppercase tracking-widest text-neon-cyan md:text-xl"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 text-5xl font-bold drop-shadow-[0_0_25px_rgba(0,0,0,0.8)] md:text-7xl lg:text-8xl"
        >
          <span className="gradient-text">{RESUME_DATA.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-8 text-2xl font-light md:text-3xl lg:text-4xl"
        >
          <span className="text-foreground/80">
            <TypewriterText text="Web Technologies Engineer" delay={1.2} speed={0.08} />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mx-auto mb-12 max-w-2xl text-lg text-muted-foreground drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] md:text-xl"
        >
          Engineering modern web experiences with cutting-edge technologies.
          <br />
          <span className="text-neon-pink">10+ years</span> of turning ideas into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#projects" className="btn-neon rounded-lg">
            View My Work
          </a>
          <a href="#contact" className="btn-neon btn-neon-cyan rounded-lg">
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm uppercase tracking-widest">Scroll</span>
          <ChevronDown className="h-5 w-5" />
        </motion.div>
      </motion.div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none" />
    </section>
  );
}
