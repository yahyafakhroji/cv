"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { MapPin, Mail } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { StaggerChildren, StaggerItem } from "@/components/animations/stagger-children";
import { GlowCard } from "@/components/ui/glow-card";
import { RESUME_DATA } from "@/data/resume-data";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

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

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          {/* Avatar and social links */}
          <FadeIn direction="left" delay={0.2}>
            <div className="flex flex-col items-center">
              {/* Avatar with glow border */}
              <motion.div
                className="relative mb-8"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-neon-pink via-neon-purple to-neon-cyan blur-md opacity-75" />
                <Image
                  src={RESUME_DATA.avatarUrl}
                  alt={RESUME_DATA.name}
                  width={224}
                  height={224}
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full object-cover border-2 border-background"
                  priority
                />
              </motion.div>

              {/* Info badges */}
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                <a
                  href={RESUME_DATA.locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-neon-purple/50 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-neon-pink" />
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
                      className="p-3 rounded-lg bg-card border border-border hover:border-neon-cyan/50 transition-all hover:shadow-neon-cyan"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                    </motion.a>
                  );
                })}
                {RESUME_DATA.contact.email && (
                  <motion.a
                    href={`mailto:${RESUME_DATA.contact.email}`}
                    className="p-3 rounded-lg bg-card border border-border hover:border-neon-pink/50 transition-all hover:shadow-neon-pink"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Bio content */}
          <FadeIn direction="right" delay={0.4}>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 gradient-text">
                  {RESUME_DATA.initials} - Web Technology Enthusiast
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {RESUME_DATA.summary}
                </p>
              </div>

              {/* Quick stats */}
              <StaggerChildren className="grid grid-cols-3 gap-4" staggerDelay={0.1}>
                <StaggerItem>
                  <GlowCard className="text-center p-4" glowColor="pink">
                    <div className="text-3xl font-bold text-neon-pink">9+</div>
                    <div className="text-xs text-muted-foreground mt-1">Years Exp</div>
                  </GlowCard>
                </StaggerItem>
                <StaggerItem>
                  <GlowCard className="text-center p-4" glowColor="cyan">
                    <div className="text-3xl font-bold text-neon-cyan">13+</div>
                    <div className="text-xs text-muted-foreground mt-1">Projects</div>
                  </GlowCard>
                </StaggerItem>
                <StaggerItem>
                  <GlowCard className="text-center p-4" glowColor="purple">
                    <div className="text-3xl font-bold text-neon-purple">5</div>
                    <div className="text-xs text-muted-foreground mt-1">Companies</div>
                  </GlowCard>
                </StaggerItem>
              </StaggerChildren>

              {/* Education */}
              {RESUME_DATA.education.length > 0 && (
                <GlowCard glowColor="purple">
                  <h4 className="text-lg font-semibold mb-2 text-neon-purple">Education</h4>
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
