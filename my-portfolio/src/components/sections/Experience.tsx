"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import CareerSignalVisual from "@/components/visuals/CareerSignalVisual";

const ease = [0.215, 0.61, 0.355, 1] as const;

export default function Experience() {
  const { experience } = portfolioData;

  return (
    <section
      id="experience"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(124,58,237,0.20)" }}
    >
      {/* Violet ambient glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 bottom-0 h-[300px] w-[300px] overflow-hidden">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* Heading + Career Signal / Trajectory Visual on the empty right side */}
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="flex-shrink-0"
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4" style={{ color: "var(--violet)" }}>
              Where I&apos;ve Worked
            </p>
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
            >
              Experience &amp;
              <br />
              <span style={{ color: "var(--violet)" }}>internships.</span>
            </h2>
          </motion.div>

          {/* Abstract Career Signal / Progression Visual */}
          <div className="flex flex-col items-start lg:items-end select-none w-full lg:w-[48%] xl:w-[54%] max-w-[820px] pb-1 overflow-hidden sm:overflow-visible">
            <CareerSignalVisual />
          </div>
        </div>

        {/* Timeline */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {experience.map((item, idx) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease }}
              className="group py-8 md:py-14"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-12">
                {/* Number with accent line */}
                <div className="flex shrink-0 items-center gap-3 md:w-20 md:flex-col md:items-start md:gap-2">
                  <span
                    className="font-[family-name:var(--font-bebas)] text-xl tracking-[0.08em]"
                    style={{ color: "var(--violet)" }}
                  >
                    {item.number}
                  </span>
                  <div
                    className="hidden h-12 w-px md:block"
                    style={{ background: "rgba(124,58,237,0.35)" }}
                  />
                </div>

                {/* Main content */}
                <div className="flex-1">
                  <h3
                    className="font-[family-name:var(--font-space-grotesk)] font-semibold tracking-[-0.04em]"
                    style={{ fontSize: "clamp(1.4rem, 2.8vw, 2.8rem)", color: "#f0f0f2" }}
                  >
                    {item.role}
                  </h3>

                  <div className="mt-2.5 sm:mt-3 flex flex-wrap items-center gap-2 text-xs sm:text-sm">
                    <span className="font-medium" style={{ color: "rgba(240,240,242,0.75)" }}>{item.company}</span>
                    <span style={{ color: "rgba(255,255,255,0.20)" }}>/</span>
                    <span
                      className="border px-2.5 py-0.5 text-[11px] uppercase tracking-[0.14em]"
                      style={{ borderColor: "rgba(124,58,237,0.40)", color: "var(--violet)" }}
                    >
                      {item.type}
                    </span>
                    <span style={{ color: "rgba(255,255,255,0.20)" }}>/</span>
                    <span style={{ color: "rgba(240,240,242,0.50)" }}>{item.duration}</span>
                  </div>

                  <p
                    className="mt-4 sm:mt-5 max-w-xl text-xs sm:text-sm leading-relaxed"
                    style={{ color: "rgba(240,240,242,0.42)" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Certificate button — full touch width on mobile */}
                {item.certificateUrl && (
                  <div className="pt-1 md:self-start">
                    <a
                      href={item.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/link inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-xs uppercase tracking-[0.14em] transition-all duration-300 w-full sm:w-auto hover:-translate-y-0.5"
                      style={{ borderColor: "rgba(124,58,237,0.40)", color: "rgba(240,240,242,0.70)", background: "transparent" }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "var(--violet)";
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.background = "rgba(124,58,237,0.12)";
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,58,237,0.40)";
                        (e.currentTarget as HTMLElement).style.color = "rgba(240,240,242,0.70)";
                        (e.currentTarget as HTMLElement).style.background = "transparent";
                      }}
                    >
                      View Certificate
                      <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                    </a>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
