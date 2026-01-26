'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import { MapPin, Mail } from 'lucide-react';
import { FadeIn } from '@/components/animations/fade-in';
import { StaggerChildren, StaggerItem } from '@/components/animations/stagger-children';
import { GlowCard } from '@/components/ui/glow-card';
import { RESUME_DATA } from '@/data/resume-data';
import { GitHubIcon, LinkedInIcon } from '@/components/icons';

export function About() {
  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
  };

  return (
    <section id="about" className="section relative">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="section-heading">
            <span className="text-glow-cyan">About</span> Me
          </h2>
        </FadeIn>

        <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2">
          {/* Avatar and social links */}
          <FadeIn direction="left" delay={0.2}>
            <div className="flex flex-col items-center">
              {/* Avatar with glow border */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan opacity-75 blur-md" />
                <Image
                  src={RESUME_DATA.avatarUrl}
                  alt={RESUME_DATA.name}
                  width={224}
                  height={224}
                  className="relative h-48 w-48 rounded-full border-2 border-background object-cover md:h-56 md:w-56"
                  priority
                />
              </motion.div>

              {/* Info badges */}
              <div className="mb-6 flex flex-wrap justify-center gap-3">
                <a
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 transition-colors hover:border-neon-purple/50"
                >
                  <MapPin className="h-4 w-4 text-neon-pink" />
                  <span className="text-sm">{RESUME_DATA.location}</span>
                </a>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {RESUME_DATA.contact.social.map((social) => {
                  const Icon = socialIcons[social.name];
                  return (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg border border-border bg-card p-3 transition-all hover:border-neon-cyan/50 hover:shadow-neon-cyan"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && <Icon className="h-5 w-5" />}
                    </motion.a>
                  );
                })}
                {RESUME_DATA.contact.email && (
                  <motion.a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    className="rounded-lg border border-border bg-card p-3 transition-all hover:border-neon-pink/50 hover:shadow-neon-pink"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="h-5 w-5" />
                  </motion.a>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Bio content */}
          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <div>
                <h3 className="gradient-text mb-4 text-2xl font-semibold">
                  {RESUME_DATA.initials} - Web Technology Enthusiast
                </h3>
                <p className="leading-relaxed text-muted-foreground">{RESUME_DATA.summary}</p>
              </div>

              {/* Quick stats */}
              <StaggerChildren className="grid grid-cols-3 gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <GlowCard className="p-4 text-center" glowColor="pink">
                    <div className="text-3xl font-bold text-neon-pink">10+</div>
                    <div className="mt-1 text-xs text-muted-foreground">Years Exp</div>
                  </GlowCard>
                </StaggerItem>
                <StaggerItem>
                  <GlowCard className="p-4 text-center" glowColor="cyan">
                    <div className="text-3xl font-bold text-neon-cyan">13+</div>
                    <div className="mt-1 text-xs text-muted-foreground">Projects</div>
                  </GlowCard>
                </StaggerItem>
                <StaggerItem>
                  <GlowCard className="p-4 text-center" glowColor="purple">
                    <div className="text-3xl font-bold text-neon-purple">5</div>
                    <div className="mt-1 text-xs text-muted-foreground">Companies</div>
                  </GlowCard>
                </StaggerItem>
              </StaggerChildren>

              {/* Education */}
              {RESUME_DATA.education.length > 0 && (
                <GlowCard glowColor="purple">
                  <h4 className="mb-2 text-lg font-semibold text-neon-purple">Education</h4>
                  {RESUME_DATA.education.map((edu) => (
                    <div key={edu.school}>
                      <p className="font-medium">{edu.school}</p>
                      <p className="text-sm text-muted-foreground">
                        {edu.degree} ({edu.start} - {edu.end})
                      </p>
                      <p className="text-sm text-muted-foreground">GPA: {edu.grade}</p>
                    </div>
                  ))}
                </GlowCard>
              )}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
