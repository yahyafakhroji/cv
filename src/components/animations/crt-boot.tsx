'use client';

import { useState, useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CRTBootProps {
  children: ReactNode;
  duration?: number;
}

export function CRTBoot({ children, duration = 1500 }: CRTBootProps) {
  const [booted, setBooted] = useState(false);
  const [skipBoot, setSkipBoot] = useState(false);

  useEffect(() => {
    // Only play boot animation once per session
    if (typeof window !== 'undefined') {
      const hasBooted = sessionStorage.getItem('crt-booted');
      if (hasBooted) {
        setSkipBoot(true);
        setBooted(true);
        return;
      }
    }

    const timer = setTimeout(() => {
      setBooted(true);
      if (typeof window !== 'undefined') {
        sessionStorage.setItem('crt-booted', 'true');
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (skipBoot) {
    return <>{children}</>;
  }

  return (
    <>
      <AnimatePresence>
        {!booted && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scaleY: 0.005, scaleX: 0.2 }}
              animate={{
                opacity: [0, 1, 1, 1, 1],
                scaleY: [0.005, 0.005, 0.4, 0.8, 1],
                scaleX: [0.2, 0.8, 1, 1, 1],
                filter: [
                  'brightness(0) saturate(0)',
                  'brightness(2) saturate(0)',
                  'brightness(1.5) saturate(0.5)',
                  'brightness(1.2) saturate(0.8)',
                  'brightness(1) saturate(1)',
                ],
              }}
              transition={{ duration: duration / 1000, ease: 'easeOut' }}
            >
              {/* Scanline overlay during boot */}
              <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.15)_2px,rgba(0,0,0,0.15)_4px)]" />

              <motion.p
                className="mb-4 font-mono text-sm text-neon-cyan/70"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Initializing...
              </motion.p>

              <motion.h1
                className="text-glow-pink font-display text-4xl font-bold md:text-6xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0, 1] }}
                transition={{ duration: 0.8, delay: 0.6, times: [0, 0.5, 1] }}
                style={{
                  textShadow: '0 0 20px hsl(330 100% 60%), 0 0 40px hsl(330 100% 60% / 0.5)',
                }}
              >
                YAHYA FAKHROJI
              </motion.h1>

              <motion.p
                className="mt-4 font-mono text-xs text-neon-cyan/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0 }}
              >
                SYSTEM READY_
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booted ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </>
  );
}
