"use client";

import { motion } from "motion/react";

interface FloatingShapeProps {
  className?: string;
}

export function FloatingShapes({ className }: FloatingShapeProps) {
  const shapes = [
    { type: "triangle", size: 60, x: "10%", y: "20%", delay: 0, duration: 6 },
    { type: "circle", size: 40, x: "85%", y: "15%", delay: 1, duration: 7 },
    { type: "square", size: 50, x: "75%", y: "70%", delay: 0.5, duration: 8 },
    { type: "triangle", size: 45, x: "15%", y: "75%", delay: 1.5, duration: 6.5 },
    { type: "circle", size: 30, x: "90%", y: "45%", delay: 2, duration: 7.5 },
    { type: "diamond", size: 35, x: "5%", y: "50%", delay: 0.8, duration: 6.8 },
  ];

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className || ""}`}>
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, shape.type === "triangle" ? 10 : 360],
          }}
          transition={{
            opacity: { duration: shape.duration, repeat: Infinity, ease: "easeInOut" },
            y: { duration: shape.duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: shape.duration * 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 0.8, delay: shape.delay },
          }}
        >
          <Shape type={shape.type} size={shape.size} />
        </motion.div>
      ))}
    </div>
  );
}

function Shape({ type, size }: { type: string; size: number }) {
  const baseStyle = {
    width: size,
    height: size,
  };

  switch (type) {
    case "triangle":
      return (
        <div
          style={{
            ...baseStyle,
            borderLeft: `${size / 2}px solid transparent`,
            borderRight: `${size / 2}px solid transparent`,
            borderBottom: `${size}px solid hsl(var(--neon-pink) / 0.3)`,
            filter: "drop-shadow(0 0 10px hsl(var(--neon-pink) / 0.5))",
            width: 0,
            height: 0,
          }}
        />
      );
    case "circle":
      return (
        <div
          className="rounded-full"
          style={{
            ...baseStyle,
            border: "2px solid hsl(var(--neon-cyan) / 0.5)",
            boxShadow: "0 0 15px hsl(var(--neon-cyan) / 0.3), inset 0 0 15px hsl(var(--neon-cyan) / 0.1)",
          }}
        />
      );
    case "square":
      return (
        <div
          style={{
            ...baseStyle,
            border: "2px solid hsl(var(--neon-purple) / 0.5)",
            boxShadow: "0 0 15px hsl(var(--neon-purple) / 0.3)",
          }}
        />
      );
    case "diamond":
      return (
        <div
          style={{
            width: size * 0.7,
            height: size * 0.7,
            border: "2px solid hsl(var(--neon-orange) / 0.5)",
            transform: "rotate(45deg)",
            boxShadow: "0 0 15px hsl(var(--neon-orange) / 0.3)",
          }}
        />
      );
    default:
      return null;
  }
}
