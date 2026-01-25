"use client";

import { motion } from "motion/react";
import { textRevealContainer, textRevealChar, easings } from "@/lib/animations";

interface TextRevealProps {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  once?: boolean;
}

export function TextReveal({
  text,
  className,
  charClassName,
  delay = 0,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: "-50px" }}
      className={className}
      aria-label={text}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap">
          <motion.span
            variants={textRevealContainer}
            transition={{ delayChildren: delay }}
            className="inline-block"
          >
            {word.split("").map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={textRevealChar}
                className={`inline-block ${charClassName || ""}`}
                style={{ transformOrigin: "bottom" }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          {wordIndex < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </motion.div>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({
  text,
  className,
  delay = 0,
  speed = 0.05,
}: TypewriterTextProps) {
  return (
    <motion.span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: delay + index * speed,
            duration: 0.1,
          }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="inline-block w-[2px] h-[1em] bg-neon-pink ml-1"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
          times: [0, 0.5, 0.5, 1],
        }}
      />
    </motion.span>
  );
}

interface GlitchTextProps {
  text: string;
  className?: string;
}

export function GlitchText({ text, className }: GlitchTextProps) {
  return (
    <motion.span
      className={`relative inline-block ${className || ""}`}
      whileHover="hover"
    >
      <motion.span
        className="absolute inset-0 text-neon-cyan"
        variants={{
          hover: {
            x: [-2, 2, -2],
            opacity: [0.8, 0.8, 0.8],
            transition: {
              duration: 0.2,
              repeat: Infinity,
            },
          },
        }}
        style={{ clipPath: "inset(45% 0 40% 0)" }}
      >
        {text}
      </motion.span>
      <motion.span
        className="absolute inset-0 text-neon-pink"
        variants={{
          hover: {
            x: [2, -2, 2],
            opacity: [0.8, 0.8, 0.8],
            transition: {
              duration: 0.2,
              repeat: Infinity,
            },
          },
        }}
        style={{ clipPath: "inset(60% 0 20% 0)" }}
      >
        {text}
      </motion.span>
      <span className="relative">{text}</span>
    </motion.span>
  );
}
