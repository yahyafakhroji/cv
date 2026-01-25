"use client";

import { motion } from "motion/react";
import { Mail, MapPin, Send } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { RESUME_DATA } from "@/data/resume-data";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export function Contact() {
  const socialIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    GitHub: GitHubIcon,
    LinkedIn: LinkedInIcon,
  };

  return (
    <section id="contact" className="section relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 100%, hsl(var(--neon-purple) / 0.15), transparent 60%)`,
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="section-heading">
            Let&apos;s <span className="text-glow-pink">Connect</span>
          </h2>
        </FadeIn>

        <div className="max-w-3xl mx-auto text-center">
          {/* Main CTA text */}
          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Have a project in mind or want to collaborate?
              <br />
              <span className="text-foreground">I&apos;d love to hear from you.</span>
            </p>
          </FadeIn>

          {/* Email CTA */}
          <FadeIn delay={0.4}>
            <MagneticButton className="inline-block mb-12">
              <motion.a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient border */}
                <div className="absolute inset-0 rounded-xl glow-border" />

                {/* Background */}
                <div className="absolute inset-[2px] rounded-xl bg-card" />

                {/* Content */}
                <div className="relative flex items-center gap-3">
                  <Mail className="w-5 h-5 text-neon-pink" />
                  <span className="text-lg font-medium gradient-text">
                    {RESUME_DATA.contact.email}
                  </span>
                  <motion.div
                    className="text-neon-cyan"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.div>
                </div>
              </motion.a>
            </MagneticButton>
          </FadeIn>

          {/* Social links */}
          <FadeIn delay={0.6}>
            <div className="flex justify-center gap-6 mb-12">
              {RESUME_DATA.contact.social.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <MagneticButton key={social.name} strength={0.4}>
                    <motion.a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-5 py-3 rounded-lg bg-card border border-border hover:border-neon-purple/50 transition-all"
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {Icon && <Icon className="w-5 h-5 group-hover:text-neon-purple transition-colors" />}
                      <span className="text-sm group-hover:text-neon-purple transition-colors">
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
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <MapPin className="w-4 h-4 text-neon-cyan" />
              <span>{RESUME_DATA.location}</span>
            </a>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
