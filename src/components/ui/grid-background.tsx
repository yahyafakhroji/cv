'use client';

import { motion } from 'motion/react';

interface GridBackgroundProps {
  className?: string;
}

export function GridBackground({ className }: GridBackgroundProps) {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className || ''}`}>
      {/* Perspective grid */}
      <div className="absolute inset-0" style={{ perspective: '1000px' }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-x-0 bottom-0 h-[60vh]"
          style={{
            background: `
              linear-gradient(90deg, hsl(var(--neon-purple) / 0.3) 1px, transparent 1px),
              linear-gradient(hsl(var(--neon-purple) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            transform: 'rotateX(60deg)',
            transformOrigin: 'center top',
            maskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to top, black 30%, transparent 100%)',
          }}
        />
      </div>

      {/* Horizon glow */}
      <div
        className="absolute bottom-[30%] left-0 right-0 h-px"
        style={{
          background: `linear-gradient(90deg, transparent, hsl(var(--neon-pink) / 0.5), hsl(var(--neon-cyan) / 0.5), transparent)`,
          boxShadow: `0 0 40px 20px hsl(var(--neon-pink) / 0.2)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 h-[50vh] w-full -translate-x-1/2"
        style={{
          background: `radial-gradient(ellipse at center bottom, hsl(var(--neon-purple) / 0.15) 0%, transparent 70%)`,
        }}
      />
    </div>
  );
}

export function GridLines({ className }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 ${className || ''}`}
      style={{
        backgroundImage: `
          linear-gradient(hsl(var(--neon-purple) / 0.08) 1px, transparent 1px),
          linear-gradient(90deg, hsl(var(--neon-purple) / 0.08) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}
    />
  );
}
