'use client';

import { motion } from 'motion/react';
import { Mail, MapPin, Send } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { MagneticButton } from '@/components/ui/magnetic-button';
import { RESUME_DATA } from '@/data/resume-data';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';

export function Contact() {
  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
  };

  const socialLabels: Record<string, string> = {
    GitHub: 'GITHUB',
    LinkedIn: 'LINKED',
  };

  const socialHandles: Record<string, string> = {
    GitHub: 'github.com/yahyafakhroji',
    LinkedIn: 'linkedin.com/in/yahya-fakhroji',
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section zone-contact relative overflow-hidden"
    >
      {/* Background gradient - orange tinted for contact zone */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, hsl(var(--neon-orange) / 0.12), transparent 60%)`,
        }}
      />

      {/* Noise overlay with higher intensity near CTA */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          opacity: 0.04,
        }}
      />

      {/* Radial noise intensifier near center/CTA area */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, hsl(var(--neon-orange) / 0.06), transparent 50%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        {/* Heading with Orbitron font */}
        <FadeIn>
          <h2 id="contact-heading" className="section-heading font-display">
            Send <span className="text-glow-orange text-neon-orange">Transmission</span>
          </h2>
          <p className="-mt-8 mb-12 text-center font-mono text-sm text-neon-orange">
            {'// OPEN CHANNEL'}
          </p>
        </FadeIn>

        <div className="mx-auto max-w-3xl text-center">
          {/* Main CTA text */}
          <FadeIn delay={0.2}>
            <p className="mb-10 text-xl text-muted-foreground md:text-2xl">
              Have a project in mind or want to collaborate?
              <br />
              <span className="text-foreground">Open a channel.</span>
            </p>
          </FadeIn>

          {/* Email CTA - larger, prominent, with orange pulsing glow */}
          <FadeIn delay={0.4}>
            <MagneticButton className="mb-16 inline-block">
              <motion.a
                href={`mailto:${RESUME_DATA.contact.email}`}
                aria-label={`Send email to ${RESUME_DATA.contact.email}`}
                className="pulse-glow-orange group relative inline-flex items-center gap-4 overflow-hidden rounded-2xl px-10 py-5"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
              >
                {/* Animated orange gradient border */}
                <div className="glow-border-orange absolute inset-0 rounded-2xl" />

                {/* Background */}
                <div className="absolute inset-[2px] rounded-2xl bg-card" />

                {/* Content */}
                <div className="relative flex items-center gap-4">
                  <Mail className="h-6 w-6 text-neon-orange" />
                  <div className="flex flex-col items-start gap-0.5">
                    <span className="font-mono text-xs uppercase tracking-widest text-neon-orange/70">
                      Initiate Contact
                    </span>
                    <span className="text-lg font-medium text-foreground md:text-xl">
                      {RESUME_DATA.contact.email}
                    </span>
                  </div>
                  <motion.div
                    className="text-neon-orange"
                    animate={{ x: [0, 6, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="h-6 w-6" />
                  </motion.div>
                </div>
              </motion.a>
            </MagneticButton>
          </FadeIn>

          {/* Communication Channels - Terminal style */}
          <FadeIn delay={0.6}>
            <div className="mb-12">
              <p className="mb-6 font-mono text-xs uppercase tracking-widest text-neon-orange/60">
                {'// COMMUNICATION CHANNELS'}
              </p>
              <div className="mx-auto flex max-w-lg flex-col gap-3">
                {RESUME_DATA.contact.social.map((social) => {
                  const Icon = socialIcons[social.name];
                  const label = socialLabels[social.name] || social.name.toUpperCase();
                  const handle = socialHandles[social.name] || social.url;
                  return (
                    <MagneticButton key={social.name} strength={0.3}>
                      <motion.a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${social.name} profile`}
                        className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-5 py-3 transition-all hover:border-neon-orange/50 hover:bg-card/80"
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="font-mono text-sm text-neon-orange">{'>'}</span>
                        {Icon && (
                          <Icon className="h-4 w-4 shrink-0 transition-colors group-hover:text-neon-orange" />
                        )}
                        <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-neon-orange">
                          {label}
                        </span>
                        <span className="hidden flex-1 overflow-hidden font-mono text-xs tracking-wider text-border/80 sm:block">
                          {'..........................................................'.slice(
                            0,
                            30
                          )}
                        </span>
                        <span className="ml-auto font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                          {handle}
                        </span>
                      </motion.a>
                    </MagneticButton>
                  );
                })}

                {/* Email as a terminal entry too */}
                <MagneticButton strength={0.3}>
                  <motion.a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    aria-label={`Send email to ${RESUME_DATA.contact.email}`}
                    className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card/50 px-5 py-3 transition-all hover:border-neon-orange/50 hover:bg-card/80"
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="font-mono text-sm text-neon-orange">{'>'}</span>
                    <Mail className="h-4 w-4 shrink-0 transition-colors group-hover:text-neon-orange" />
                    <span className="shrink-0 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-neon-orange">
                      EMAIL
                    </span>
                    <span className="hidden flex-1 overflow-hidden font-mono text-xs tracking-wider text-border/80 sm:block">
                      {'..........................................................'.slice(0, 30)}
                    </span>
                    <span className="ml-auto font-mono text-xs text-muted-foreground transition-colors group-hover:text-foreground">
                      {RESUME_DATA.contact.email}
                    </span>
                  </motion.a>
                </MagneticButton>
              </div>
            </div>
          </FadeIn>

          {/* Location with signal indicator */}
          <FadeIn delay={0.8}>
            <a
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 font-mono text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {/* Pulsing signal dot */}
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon-orange/60" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-neon-orange shadow-[0_0_6px_hsl(var(--neon-orange)/0.8)]" />
              </span>
              <MapPin className="h-4 w-4 text-neon-orange" />
              <span className="uppercase tracking-wider">{RESUME_DATA.location}</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
