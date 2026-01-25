"use client";

import { motion } from "motion/react";
import { ExternalLink, Calendar } from "lucide-react";
import { FadeIn } from "@/components/animations/fade-in";
import { RESUME_DATA } from "@/data/resume-data";

export function Projects() {
  const glowColors = ["pink", "cyan", "purple"] as const;

  return (
    <section id="projects" className="section relative">
      <div className="container mx-auto px-4">
        <FadeIn>
          <h2 className="section-heading">
            Featured <span className="text-glow-purple">Projects</span>
          </h2>
        </FadeIn>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {RESUME_DATA.projects.map((project, index) => {
            const glowColor = glowColors[index % 3];
            const colorClass = {
              pink: "neon-pink",
              cyan: "neon-cyan",
              purple: "neon-purple",
            }[glowColor];

            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className={`group relative overflow-hidden rounded-xl bg-card border border-border p-6
                  hover:border-${colorClass}/50 transition-all duration-300`}
              >
                {/* Gradient overlay on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, hsl(var(--${colorClass}) / 0.1), transparent 70%)`,
                  }}
                />

                {/* Content */}
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className={`text-lg font-semibold text-${colorClass}`}>
                      {project.title}
                    </h3>
                    {"link" in project && project.link && (
                      <motion.a
                        href={project.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 rounded-lg bg-background/50 border border-border
                          hover:border-${colorClass}/50 transition-colors`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>

                  {/* Timeline */}
                  {project.timeline && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                      <Calendar className="w-3 h-3" />
                      {project.timeline}
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 text-xs rounded bg-background/50 border border-border text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-2 py-0.5 text-xs rounded bg-background/50 border border-border text-muted-foreground">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Border glow effect */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: `inset 0 0 20px hsl(var(--${colorClass}) / 0.1)`,
                  }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
