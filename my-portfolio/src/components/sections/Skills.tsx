"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";
import CapabilityNetwork from "@/components/visuals/CapabilityNetwork";

const ease = [0.215, 0.61, 0.355, 1] as const;

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#06b6d4",  // cyan
  Backend:  "#2563eb",  // blue
  Database: "#9333ea",  // purple
  Tools:    "#84cc16",  // lime
};

export default function Skills() {
  const { skills } = portfolioData;
  const [, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { label: "Frontend", items: skills.frontend },
    { label: "Backend",  items: skills.backend  },
    { label: "Database", items: skills.database },
    { label: "Tools",    items: skills.tools    },
  ];

  return (
    <section
      id="skills"
      className="relative px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16 overflow-hidden"
      style={{ borderTop: "1px solid rgba(6,182,212,0.18)" }}
    >
      {/* Cyan ambient glow */}
      <div aria-hidden className="pointer-events-none absolute left-0 top-0 h-[300px] w-[300px] overflow-hidden">
        <div
          className="h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">

        {/* Heading + Abstract Cyan Technical Network on the empty right side */}
        <div className="mb-10 sm:mb-14 md:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 sm:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
            className="flex-shrink-0"
          >
            <p className="text-xs uppercase tracking-[0.22em] mb-3 sm:mb-4" style={{ color: "var(--cyan)" }}>
              What I Work With
            </p>
            <h2
              className="font-[family-name:var(--font-space-grotesk)] leading-[0.92] tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.2rem, 5.5vw, 7rem)" }}
            >
              Technical
              <br />
              <span style={{ color: "var(--cyan)" }}>capabilities.</span>
            </h2>
          </motion.div>

          {/* Abstract Cyan Technical Network / Capability Field */}
          <div className="flex flex-col items-start lg:items-end select-none w-full lg:w-[48%] xl:w-[54%] max-w-[820px] pb-1 overflow-hidden sm:overflow-visible">
            <CapabilityNetwork />
          </div>
        </div>

        {/* Category rows */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {categories.map((cat, catIdx) => {
            const accent = CATEGORY_COLORS[cat.label] ?? "#fff";
            return (
              <motion.div
                key={cat.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.55, delay: catIdx * 0.1, ease }}
                className="py-6 sm:py-8 md:py-10 transition-colors duration-300"
                style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
                onMouseEnter={() => setActiveCategory(cat.label)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <div className="grid gap-3 sm:gap-4 md:grid-cols-[200px_1fr] md:items-baseline">
                  <h3
                    className="text-xs uppercase tracking-[0.22em] font-medium"
                    style={{ color: accent }}
                  >
                    {cat.label}
                  </h3>

                  <div className="flex flex-wrap gap-2 sm:gap-2.5">
                    {cat.items.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.88 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -3, transition: { duration: 0.18 } }}
                        transition={{ duration: 0.3, delay: catIdx * 0.07 + sIdx * 0.035, ease }}
                        className="cursor-default border px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs uppercase tracking-[0.12em] transition-colors duration-300"
                        style={{
                          borderColor: `${accent}30`,
                          color: "rgba(240,240,242,0.65)",
                          background: `${accent}08`,
                        }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = accent;
                          (e.currentTarget as HTMLElement).style.color = "#fff";
                          (e.currentTarget as HTMLElement).style.background = `${accent}18`;
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = `${accent}30`;
                          (e.currentTarget as HTMLElement).style.color = "rgba(240,240,242,0.65)";
                          (e.currentTarget as HTMLElement).style.background = `${accent}08`;
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
