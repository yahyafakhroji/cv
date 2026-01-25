"use client";

import { motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { GridBackground } from "@/components/ui/grid-background";
import { SunsetSun } from "@/components/ui/sunset-sun";
import { FloatingShapes } from "@/components/ui/floating-shapes";
import { TextReveal, TypewriterText } from "@/components/animations/text-reveal";
import { RESUME_DATA } from "@/data/resume-data";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background elements */}
      <GridBackground />
      <FloatingShapes />

      {/* Sunset sun */}
      <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-0">
        <SunsetSun size={280} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Greeting */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-neon-cyan text-lg md:text-xl mb-4 tracking-widest uppercase"
        >
          Hello, I&apos;m
        </motion.p>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="gradient-text">{RESUME_DATA.name}</span>
        </motion.h1>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-2xl md:text-3xl lg:text-4xl font-light mb-8"
        >
          <span className="text-foreground/80">
            <TypewriterText text="Full-Stack Developer" delay={1.2} speed={0.08} />
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-12"
        >
          Crafting digital experiences with modern web technologies.
          <br />
          <span className="text-neon-pink">9+ years</span> of turning ideas into reality.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a
            href="#projects"
            className="btn-neon rounded-lg"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="btn-neon btn-neon-cyan rounded-lg"
          >
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
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </motion.div>
      </motion.div>

      {/* Noise overlay */}
      <div className="noise-overlay pointer-events-none" />
    </section>
  );
}
