"use client";

import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { RESUME_DATA } from "@/data/resume-data";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, hsl(var(--background)), transparent)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center gap-4">
          {/* Logo/Name */}
          <motion.a
            href="#"
            className="text-xl font-bold gradient-text"
            whileHover={{ scale: 1.05 }}
          >
            {RESUME_DATA.initials}
          </motion.a>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Building digital experiences with passion and precision.
          </p>

          {/* Divider */}
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent my-4" />

          {/* Copyright */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              &copy; {currentYear} {RESUME_DATA.name}. Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-neon-pink fill-neon-pink" />
              </motion.span>
            </p>
            <p className="text-xs text-muted-foreground/80 flex items-center gap-1">
              Powered by
              <Link href="https://claude.com" target="_blank" rel="noopener noreferrer" className="text-neon-cyan font-semibold">Claude Code</Link>
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-4 px-4 py-2 text-xs text-muted-foreground hover:text-foreground border border-border hover:border-neon-purple/50 rounded-full transition-all"
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
