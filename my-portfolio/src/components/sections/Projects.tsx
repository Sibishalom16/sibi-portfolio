"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolioData";
import ProjectArchitecturalForm from "@/components/visuals/ProjectArchitecturalForm";

const ease = [0.22, 1, 0.36, 1] as const;

const PROJECT_ACCENTS = ["#00d97e", "#7c3aed", "#ff9500"] as const;
const PROJECT_ACCENTS_DIM = [
  "rgba(0,217,126,0.10)",
  "rgba(124,58,237,0.10)",
  "rgba(255,149,0,0.10)",
] as const;

export default function Projects() {
  const { projects } = portfolioData;

  return (
    <section
      id="projects"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(0,217,126,0.15)" }}
    >
      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading + Abstract Digital Material / Flowing Architecture Visual on the empty right side */}
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="flex-shrink-0"
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4" style={{ color: "#00d97e" }}>
              What I&apos;ve Built
            </p>
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
            >
              Things I&apos;ve
              <br />
              <span style={{ color: "#00d97e" }}>built.</span>
            </h2>
          </motion.div>

          {/* Abstract Digital Material / Flowing Architectural Geometry */}
          <div className="flex flex-col items-start lg:items-end select-none w-full lg:w-[45%] xl:w-[50%] max-w-[760px] pb-1 overflow-hidden sm:overflow-visible">
            <ProjectArchitecturalForm />
          </div>
        </div>

        {/* Project rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {projects.map((project, idx) => {
            const accent = PROJECT_ACCENTS[idx] ?? "#fff";
            const accentDim = PROJECT_ACCENTS_DIM[idx] ?? "rgba(255,255,255,0.05)";

            return (
              <motion.article
                key={project.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease }}
                className="group relative py-8 transition-colors duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] md:py-14"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = `${accent}35`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderBottomColor = "rgba(255,255,255,0.08)";
                }}
              >
                {/* Very subtle background glow behind the row (bounded to prevent overflow) */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-400 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(ellipse 70% 60% at 50% 50%, ${accent}0d, transparent 75%)`,
                  }}
                />

                <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:justify-between md:gap-10">
                  {/* Number */}
                  <span
                    className="shrink-0 font-[family-name:var(--font-bebas)] text-lg tracking-[0.1em] md:w-12 transition-colors duration-300"
                    style={{ color: "rgba(255,255,255,0.25)" }}
                  >
                    {project.number}
                  </span>

                  {/* Main content */}
                  <div className="flex-1">
                    <div
                      className="mb-1.5 text-xs uppercase tracking-[0.18em]"
                      style={{ color: "rgba(255,255,255,0.35)" }}
                    >
                      {project.category}
                    </div>

                    {/* Project Title with smooth 4px magnetic drift and color highlight */}
                    <h3
                      className="font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.04em] inline-block transition-transform duration-350 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:translate-x-1"
                      style={{ fontSize: "clamp(1.5rem, 3.5vw, 3.8rem)", color: "#f0f0f2" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.color = accent;
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.color = "#f0f0f2";
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      className="mt-3 sm:mt-4 max-w-2xl text-xs sm:text-sm leading-relaxed"
                      style={{ color: "rgba(240,240,242,0.50)" }}
                    >
                      {project.description}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-4 sm:mt-5 flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="border px-2.5 py-1 text-[10px] sm:text-[11px] uppercase tracking-[0.12em]"
                          style={{
                            borderColor: `${accent}25`,
                            color: "rgba(240,240,242,0.45)",
                            background: accentDim,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Contribution */}
                    {"contribution" in project && project.contribution && (
                      <p
                        className="mt-3 sm:mt-4 max-w-2xl text-xs leading-relaxed"
                        style={{ color: "rgba(240,240,242,0.50)" }}
                      >
                        <span
                          className="font-medium tracking-[0.06em]"
                          style={{ color: "rgba(255,255,255,0.75)" }}
                        >
                          Contribution:{" "}
                        </span>
                        {project.contribution}
                      </p>
                    )}
                  </div>

                  {/* Separate Action Links (GitHub, Live Demo) — full touch targets on mobile */}
                  <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 pt-1 md:pt-0 md:w-[144px] md:shrink-0 md:flex-col md:items-end">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center justify-center sm:justify-between gap-2 border px-4 py-2.5 text-xs uppercase tracking-[0.13em] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] w-full sm:w-auto md:w-full hover:-translate-y-0.5"
                        style={{
                          borderColor: `${accent}35`,
                          color: "rgba(240,240,242,0.70)",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = accent;
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.background = `${accent}12`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${accent}35`;
                          (e.currentTarget as HTMLElement).style.color = "rgba(240,240,242,0.70)";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <span className="flex items-center gap-1.5">
                          <FaGithub size={12} /> GitHub
                        </span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    )}

                    {"liveUrl" in project && Boolean(project.liveUrl) && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/btn inline-flex items-center justify-center sm:justify-between gap-2 border px-4 py-2.5 text-xs uppercase tracking-[0.13em] transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] w-full sm:w-auto md:w-full hover:-translate-y-0.5"
                        style={{
                          borderColor: `${accent}35`,
                          color: "rgba(240,240,242,0.70)",
                          background: "transparent",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = accent;
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.background = `${accent}12`;
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${accent}35`;
                          (e.currentTarget as HTMLElement).style.color = "rgba(240,240,242,0.70)";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <span>Live Demo</span>
                        <ArrowUpRight
                          size={13}
                          className="transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                        />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}