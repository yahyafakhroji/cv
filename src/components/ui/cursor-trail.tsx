'use client';

import { useEffect, useRef } from 'react';
import { useIsMobile, useReducedMotion } from '@/hooks';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
}

const colors = ['#ff2e97', '#00d9ff', '#a855f7']; // neon-pink, neon-cyan, neon-purple

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);
  const colorIndexRef = useRef(0);
  const enabledRef = useRef(true);

  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Disable on mobile or reduced motion
    if (isMobile || reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (!enabledRef.current) return;

      mouseRef.current = { x: e.clientX, y: e.clientY };

      // Add new particle
      particlesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: 0,
        maxLife: 800, // 800ms lifetime
        color: colors[colorIndexRef.current % colors.length],
      });

      colorIndexRef.current++;

      // Keep only last 7 particles
      if (particlesRef.current.length > 7) {
        particlesRef.current.shift();
      }
    };

    // Keyboard toggle (T key)
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 't' || e.key === 'T') {
        enabledRef.current = !enabledRef.current;
        if (!enabledRef.current) {
          particlesRef.current = [];
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyPress);

    // Animation loop
    let lastTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current = particlesRef.current.filter((particle) => {
        particle.life += delta;
        particle.x += particle.vx;
        particle.y += particle.vy;

        const lifeRatio = particle.life / particle.maxLife;
        const opacity = 1 - lifeRatio;
        const size = 8 * (1 - lifeRatio * 0.5); // Shrink to 50% size

        if (opacity > 0) {
          // Draw glow
          const gradient = ctx.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            size * 3
          );
          gradient.addColorStop(
            0,
            `${particle.color}${Math.floor(opacity * 0.8 * 255)
              .toString(16)
              .padStart(2, '0')}`
          );
          gradient.addColorStop(
            0.5,
            `${particle.color}${Math.floor(opacity * 0.3 * 255)
              .toString(16)
              .padStart(2, '0')}`
          );
          gradient.addColorStop(1, `${particle.color}00`);

          ctx.fillStyle = gradient;
          ctx.fillRect(particle.x - size * 3, particle.y - size * 3, size * 6, size * 6);

          // Draw core
          ctx.fillStyle = `${particle.color}${Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, '0')}`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fill();

          return true;
        }

        return false;
      });

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyPress);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isMobile, reducedMotion]);

  // Don't render on mobile or reduced motion
  if (isMobile || reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  );
}
