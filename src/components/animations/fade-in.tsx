"use client";

import { motion, type Variants } from "motion/react";
import { ReactNode } from "react";
import { fadeInUp, fadeInLeft, fadeInRight, fadeInDown, defaultTransition } from "@/lib/animations";

type Direction = "up" | "down" | "left" | "right";

interface FadeInProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

const variants: Record<Direction, Variants> = {
  up: fadeInUp,
  down: fadeInDown,
  left: fadeInLeft,
  right: fadeInRight,
};

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: FadeInProps) {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: "-50px" }}
      variants={variants[direction]}
      transition={{ ...defaultTransition, delay, duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
