"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import GraduationCapVisual from "@/components/visuals/GraduationCapVisual";

const ease = [0.215, 0.61, 0.355, 1] as const;

export default function Education() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(6,182,212,0.18)" }}
    >
      {/* Cyan ambient glow */}
      <div aria-hidden className="pointer-events-none absolute left-0 bottom-0 h-[280px] w-[280px] overflow-hidden">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading + Abstract Graduation Cap Visual (upper-right) */}
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="flex-shrink-0"
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4" style={{ color: "var(--cyan)" }}>
              Academic Background
            </p>
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
            >
              Education &amp;
              <br />
              <span style={{ color: "var(--cyan)" }}>training.</span>
            </h2>
          </motion.div>

          {/* Graduation visual seated above the right-side timeline card */}
          <div className="flex flex-col items-start lg:items-end select-none w-full lg:w-[48%] xl:w-[46%] max-w-[560px] overflow-hidden sm:overflow-visible">
            <GraduationCapVisual />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Academic Info */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease }}
            className="pl-4 py-2 sm:pl-6 md:pl-10"
            style={{ borderLeft: "2px solid var(--cyan)" }}
          >
            <span
              className="font-[family-name:var(--font-bebas)] text-lg tracking-[0.08em]"
              style={{ color: "var(--cyan)" }}
            >
              {education.period}
            </span>

            <h3
              className="mt-3 sm:mt-4 font-[family-name:var(--font-space-grotesk)] font-bold tracking-[-0.04em]"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)", color: "#f0f0f2" }}
            >
              {education.degree}
            </h3>

            <p
              className="mt-2.5 sm:mt-3 text-sm sm:text-base md:text-lg"
              style={{ color: "rgba(240,240,242,0.70)" }}
            >
              {education.program}
            </p>

            <p
              className="mt-1 text-xs sm:text-sm"
              style={{ color: "rgba(240,240,242,0.45)" }}
            >
              {education.institution}
            </p>

            <div className="mt-5 sm:mt-6">
              <span
                className="inline-block border px-3.5 py-1.5 text-xs uppercase tracking-[0.16em]"
                style={{ borderColor: "rgba(6,182,212,0.40)", color: "var(--cyan)", background: "rgba(6,182,212,0.08)" }}
              >
                {education.status}
              </span>
            </div>
          </motion.div>

          {/* Learning Progress Visualization (Responsive on all screen sizes) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.2, ease }}
            className="flex flex-col select-none mt-2 lg:mt-0"
          >
            <div className="rounded border border-white/[0.06] bg-[#08090d]/40 backdrop-blur-sm p-4 sm:p-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] text-[10px] font-mono tracking-wider">
                <span className="text-white/60 uppercase">TIMELINE // 2024 &rarr; 2028</span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-medium">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  IN PROGRESS
                </span>
              </div>

              {/* Progress track */}
              <div className="relative my-7">
                {/* Background track line */}
                <div className="h-[2px] w-full bg-white/[0.08] relative">
                  {/* Completed progression line (50% through 4-year degree) */}
                  <div
                    className="absolute left-0 top-0 h-full bg-cyan-400/80 transition-all"
                    style={{ width: "50%" }}
                  />
                  {/* Subtle traveling light packet */}
                  <motion.div
                    className="absolute top-[-3px] h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#06b6d4]"
                    animate={{ left: ["0%", "50%", "0%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Milestones nodes: 2024, 2025, 2026 (Current), 2027, 2028 */}
                <div className="flex justify-between items-center -mt-[5px] text-[10px] font-mono">
                  {[
                    { year: "2024", state: "done" },
                    { year: "2025", state: "done" },
                    { year: "2026", state: "current" },
                    { year: "2027", state: "future" },
                    { year: "2028", state: "future" },
                  ].map((node) => (
                    <div key={node.year} className="flex flex-col items-center gap-1.5">
                      <span
                        className="h-2 w-2 rounded-full border transition-all"
                        style={{
                          background: node.state === "current" ? "var(--cyan)" : node.state === "done" ? "#06b6d4" : "#08090d",
                          borderColor: node.state === "future" ? "rgba(255,255,255,0.2)" : "var(--cyan)",
                          boxShadow: node.state === "current" ? "0 0 8px #06b6d4" : "none",
                        }}
                      />
                      <span
                        className="text-[9px] tracking-wider"
                        style={{
                          color: node.state === "current" ? "#fff" : node.state === "done" ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.25)",
                          fontWeight: node.state === "current" ? 600 : 400,
                        }}
                      >
                        {node.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status details */}
              <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40 tracking-wider">
                <span>STAGE: YEAR 3 OF 4</span>
                <span className="text-white/60">COMPUTER SCIENCE</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
