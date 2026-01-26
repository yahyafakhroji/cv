'use client';

import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { RESUME_DATA } from '@/data/resume-data';
import Link from 'next/link';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border py-12">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, hsl(var(--background)), transparent)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo/Name */}
          <motion.a
            href="#"
            className="gradient-text text-xl font-bold"
            whileHover={{ scale: 1.05 }}
          >
            {RESUME_DATA.initials}
          </motion.a>

          {/* Tagline */}
          <p className="max-w-md text-center text-sm text-muted-foreground">
            Building digital experiences with passion and precision.
          </p>

          {/* Divider */}
          <div className="my-4 h-px w-24 bg-gradient-to-r from-transparent via-neon-purple to-transparent" />

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="flex items-center gap-1 text-sm text-muted-foreground">
              &copy; {currentYear} {RESUME_DATA.name}. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="h-4 w-4 fill-neon-pink text-neon-pink" />
              </motion.span>
            </p>
            <p className="flex items-center gap-1 text-xs text-muted-foreground/80">
              Powered by
              <Link
                href="https://claude.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-neon-cyan"
              >
                Claude Code
              </Link>
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-4 rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition-all hover:border-neon-purple/50 hover:text-foreground"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
