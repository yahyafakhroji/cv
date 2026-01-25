"use client";

import { motion } from "motion/react";
import { Briefcase, ExternalLink } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { GlowCard } from "@/components/ui/glow-card";
import { RESUME_DATA } from "@/data/resume-data";

export function Experience() {
  return (
    <section id="experience" className="section relative">
      {/* Background grid lines */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--neon-purple) / 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "100% 80px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <FadeIn>
          <h2 className="section-heading">
            <span className="text-glow-pink">Work</span> Experience
          </h2>
        </FadeIn>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-neon-pink via-neon-purple to-neon-cyan md:-translate-x-1/2" />

          {/* Experience items */}
          {RESUME_DATA.work.map((job, index) => (
            <motion.div
              key={`${job.company}-${index}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex flex-col md:flex-row gap-8 mb-12 ${
                index % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Timeline dot */}
              <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 rounded-full bg-background border-2 border-neon-pink -translate-x-1/2 md:-translate-x-1/2 shadow-neon-pink z-10">
                <motion.div
                  className="absolute inset-0 rounded-full bg-neon-pink"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>

              {/* Date label */}
              <div
                className={`hidden md:flex items-start justify-${
                  index % 2 === 0 ? "start" : "end"
                } w-1/2 pt-0`}
              >
                <span className="text-neon-cyan font-mono text-sm">
                  {job.start} - {job.end}
                </span>
              </div>

              {/* Content card */}
              <div className="md:w-1/2 pl-8 md:pl-0">
                <GlowCard glowColor={index % 3 === 0 ? "pink" : index % 3 === 1 ? "cyan" : "purple"}>
                  {/* Mobile date */}
                  <span className="md:hidden text-neon-cyan font-mono text-sm block mb-2">
                    {job.start} - {job.end}
                  </span>

                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-foreground">
                        {job.title}
                      </h3>
                      <a
                        href={job.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-neon-pink hover:underline flex items-center gap-1 text-sm mt-1"
                      >
                        {job.company}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <Briefcase className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  </div>

                  {/* Badges */}
                  {job.badges.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {job.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 text-xs rounded-full bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-muted-foreground text-sm mb-4">
                    {job.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2">
                    {job.techStack.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs rounded bg-card border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {job.techStack.length > 6 && (
                      <span className="px-2 py-1 text-xs rounded bg-card border border-border text-muted-foreground">
                        +{job.techStack.length - 6} more
                      </span>
                    )}
                  </div>
                </GlowCard>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
