'use client';

import { motion, useMotionTemplate, useMotionValue } from 'motion/react';
import { ReactNode, useRef } from 'react';
import { cn } from '@/lib/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'pink' | 'cyan' | 'purple';
}

export function GlowCard({ children, className, glowColor = 'purple' }: GlowCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const colorMap = {
    pink: 'var(--neon-pink)',
    cyan: 'var(--neon-cyan)',
    purple: 'var(--neon-purple)',
  };

  const background = useMotionTemplate`
    radial-gradient(
      300px circle at ${mouseX}px ${mouseY}px,
      hsl(${colorMap[glowColor]} / 0.15),
      transparent 80%
    )
  `;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={cn(
        'card-shadow-depth group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-colors hover:border-neon-purple/50',
        className
      )}
    >
      {/* Glow effect that follows mouse */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />

      {/* Border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-xl"
          style={{
            background: `linear-gradient(135deg, hsl(${colorMap[glowColor]} / 0.2), transparent 50%)`,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
