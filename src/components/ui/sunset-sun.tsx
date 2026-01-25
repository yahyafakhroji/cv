"use client";

import { motion } from "motion/react";

interface SunsetSunProps {
  size?: number;
  className?: string;
}

export function SunsetSun({ size = 300, className }: SunsetSunProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className={`relative ${className || ""}`}
      style={{ width: size, height: size }}
    >
      {/* Main sun gradient */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: `linear-gradient(180deg,
            hsl(var(--sunset-1)) 0%,
            hsl(var(--sunset-2)) 20%,
            hsl(var(--sunset-3)) 45%,
            hsl(var(--sunset-4)) 70%,
            hsl(var(--sunset-5)) 100%
          )`,
          boxShadow: `
            0 0 60px hsl(var(--sunset-3) / 0.5),
            0 0 120px hsl(var(--sunset-4) / 0.3),
            0 0 180px hsl(var(--sunset-5) / 0.2)
          `,
        }}
      />

      {/* Horizontal lines (classic 80s effect) */}
      <div
        className="absolute inset-0 rounded-full overflow-hidden"
        style={{
          clipPath: "inset(50% 0 0 0)",
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 bg-background"
            style={{
              top: `${52 + i * 6}%`,
              height: `${2 + i * 0.5}%`,
            }}
          />
        ))}
      </div>

      {/* Glow overlay */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: `radial-gradient(circle at 50% 30%, hsl(var(--sunset-1) / 0.3), transparent 60%)`,
        }}
      />
    </motion.div>
  );
}
