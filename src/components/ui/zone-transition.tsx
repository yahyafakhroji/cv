'use client';

import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface ZoneTransitionProps {
  variant?: 'sweep' | 'vhs';
}

export function ZoneTransition({ variant = 'sweep' }: ZoneTransitionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  if (variant === 'vhs') {
    return (
      <div ref={ref} className="relative my-0 h-[2px] w-full overflow-hidden">
        {isInView && (
          <motion.div
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative my-0 h-[3px] w-full overflow-hidden">
      {isInView && (
        <motion.div
          className="absolute left-0 top-0 h-full w-full"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        >
          <div className="h-full w-full bg-gradient-to-r from-transparent via-neon-cyan to-neon-pink blur-[1px]" />
        </motion.div>
      )}
      {/* Residual glow line */}
      {isInView && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-purple/20 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        />
      )}
    </div>
  );
}
