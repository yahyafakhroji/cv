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

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, hsl(var(--neon-purple) / 0.15), transparent 60%)`,
        }}
      />

      <div className="container relative z-10 mx-auto px-4">
        <FadeIn>
          <h2 id="contact-heading" className="section-heading">
            Let&apos;s <span className="text-glow-pink">Connect</span>
          </h2>
        </FadeIn>

        <div className="mx-auto max-w-3xl text-center">
          {/* Main CTA text */}
          <FadeIn delay={0.2}>
            <p className="mb-8 text-xl text-muted-foreground md:text-2xl">
              Have a project in mind or want to collaborate?
              <br />
              <span className="text-foreground">I&apos;d love to hear from you.</span>
            </p>
          </FadeIn>

          {/* Email CTA */}
          <FadeIn delay={0.4}>
            <MagneticButton className="mb-12 inline-block">
              <motion.a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="pulse-glow group relative inline-flex items-center gap-3 overflow-hidden rounded-xl px-8 py-4"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient border */}
                <div className="glow-border absolute inset-0 rounded-xl" />

                {/* Background */}
                <div className="absolute inset-[2px] rounded-xl bg-card" />

                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <Mail className="h-5 w-5 text-neon-pink" />
                  <span className="gradient-text text-lg font-medium">
                    {RESUME_DATA.contact.email}
                  </span>
                  <motion.div
                    className="text-neon-cyan"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="h-5 w-5" />
                  </motion.div>
                </div>
              </motion.a>
            </MagneticButton>
          </FadeIn>

          {/* Social links */}
          <FadeIn delay={0.6}>
            <div className="mb-12 flex justify-center gap-6">
              {RESUME_DATA.contact.social.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <MagneticButton key={social.name} strength={0.4}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-3 transition-all hover:border-neon-purple/50"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && (
                        <Icon className="h-5 w-5 transition-colors group-hover:text-neon-purple" />
                      )}
                      <span className="text-sm transition-colors group-hover:text-neon-purple">
                        {social.name}
                      </span>
                    </motion.a>
                  </MagneticButton>
                );
              })}
            </div>
          </FadeIn>

          {/* Location */}
          <FadeIn delay={0.8}>
            <a
              href={RESUME_DATA.locationLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <MapPin className="h-4 w-4 text-neon-cyan" />
              <span>{RESUME_DATA.location}</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
