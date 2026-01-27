'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const ZONES = [
  { id: 'hero', label: 'Home', color: 'hsl(330 100% 60%)' },
  { id: 'about', label: 'About', color: 'hsl(180 100% 50%)' },
  { id: 'experience', label: 'Experience', color: 'hsl(180 100% 50%)' },
  { id: 'projects', label: 'Projects', color: 'hsl(280 100% 65%)' },
  { id: 'skills', label: 'Skills', color: 'hsl(330 100% 60%)' },
  { id: 'contact', label: 'Contact', color: 'hsl(30 100% 55%)' },
] as const;

export function ZoneIndicator() {
  const [activeZone, setActiveZone] = useState('hero');
  const [hoveredZone, setHoveredZone] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate overall scroll progress
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      // Determine active zone via intersection
      const sections = ZONES.map((z) => document.getElementById(z.id)).filter(Boolean);
      const viewportCenter = scrollTop + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= viewportCenter) {
          setActiveZone(ZONES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToZone = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav
      className="fixed right-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col items-center gap-3 md:right-6 md:flex"
      aria-label="Section navigation"
    >
      {/* Progress line background */}
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-white/10">
        <motion.div
          className="w-full bg-gradient-to-b from-neon-pink to-neon-cyan"
          style={{ height: `${scrollProgress * 100}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {ZONES.map((zone) => {
        const isActive = activeZone === zone.id;
        return (
          <div key={zone.id} className="relative">
            <button
              onClick={() => scrollToZone(zone.id)}
              onMouseEnter={() => setHoveredZone(zone.id)}
              onMouseLeave={() => setHoveredZone(null)}
              className="relative z-10 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-cyan"
              style={{
                width: isActive ? 10 : 8,
                height: isActive ? 10 : 8,
                backgroundColor: isActive ? zone.color : 'hsla(270, 50%, 60%, 0.3)',
                borderWidth: 1,
                borderColor: isActive ? zone.color : 'hsla(270, 50%, 60%, 0.4)',
                boxShadow: isActive ? `0 0 12px ${zone.color}` : 'none',
              }}
              aria-label={`Navigate to ${zone.label}`}
              aria-current={isActive ? 'true' : undefined}
            />

            {/* Tooltip */}
            <AnimatePresence>
              {hoveredZone === zone.id && (
                <motion.span
                  className="absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded border border-white/10 bg-black/80 px-2 py-1 font-mono text-xs text-white/80"
                  initial={{ opacity: 0, x: 5 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 5 }}
                  transition={{ duration: 0.15 }}
                >
                  {zone.label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </nav>
  );
}
