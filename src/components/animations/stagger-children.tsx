'use client';

import { motion } from 'motion/react';
import { ReactNode } from 'react';
import { fadeInUp, defaultTransition } from '@/lib/animations';

interface StaggerChildrenProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
  once?: boolean;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  initialDelay = 0.1,
  once = true,
}: StaggerChildrenProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: '-50px' }}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: initialDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  return (
    <motion.div variants={fadeInUp} transition={defaultTransition} className={className}>
      {children}
    </motion.div>
  );
}
