'use client';

import { motion } from 'motion/react';
import { textRevealContainer, textRevealChar } from '@/lib/animations';

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
  const words = text.split(' ');

  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once, margin: '-50px' }}
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
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                variants={textRevealChar}
                className={`inline-block ${charClassName || ''}`}
                style={{ transformOrigin: 'bottom' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
          {wordIndex < words.length - 1 && <span className="inline-block">&nbsp;</span>}
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

export function TypewriterText({ text, className, delay = 0, speed = 0.05 }: TypewriterTextProps) {
  const chars = text.split('');
  const totalDuration = delay + chars.length * speed;

  return (
    <motion.span className={className}>
      {chars.map((char, index) => {
        const charDelay = delay + index * speed;
        return (
          <motion.span key={index} className="relative inline-block">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                delay: charDelay,
                duration: 0.1,
              }}
            >
              {char}
            </motion.span>
            {/* Cursor that appears at each character position during typing */}
            <motion.span
              className="absolute -right-[2px] top-1/2 inline-block h-[1em] w-[2px] -translate-y-1/2 bg-neon-pink"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 1, 0] }}
              transition={{
                delay: charDelay,
                duration: speed,
                times: [0, 0.1, 0.9, 1],
              }}
            />
          </motion.span>
        );
      })}
      {/* Final blinking cursor after typing is complete */}
      <motion.span
        className="ml-[2px] inline-block h-[1em] w-[2px] bg-neon-pink align-middle"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 1, 1, 0, 0] }}
        transition={{
          delay: totalDuration,
          duration: 1,
          repeat: Infinity,
          times: [0, 0.3, 0.3, 0.7, 0.7, 1],
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
    <motion.span className={`relative inline-block ${className || ''}`} whileHover="hover">
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
        style={{ clipPath: 'inset(45% 0 40% 0)' }}
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
        style={{ clipPath: 'inset(60% 0 20% 0)' }}
      >
        {text}
      </motion.span>
      <span className="relative">{text}</span>
    </motion.span>
  );
}
