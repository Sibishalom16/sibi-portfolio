"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import SignalNetwork from "@/components/visuals/SignalNetwork";

const ease = [0.215, 0.61, 0.355, 1] as const;

export default function About() {
  const { personal, resume } = portfolioData;

  return (
    <section
      id="about"
      className="relative overflow-hidden px-4 py-16 sm:px-6 md:px-12 md:py-32 lg:px-16"
      style={{ borderTop: "1px solid rgba(147,51,234,0.20)" }}
    >
      {/* Purple ambient glow */}
      <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[350px] w-[350px] overflow-hidden">
        <div
          className="absolute right-0 top-0 h-full w-full rounded-full"
          style={{ background: "radial-gradient(circle, rgba(147,51,234,0.08) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid gap-14 md:grid-cols-[1fr_1.6fr] md:gap-28">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease }}
          >
            <p className="text-xs uppercase tracking-[0.22em]" style={{ color: "var(--purple)" }}>
              Who I Am
            </p>
            <h2
              className="mt-5 font-[family-name:var(--font-space-grotesk)] leading-tight tracking-[-0.05em]"
              style={{ fontSize: "clamp(2.4rem, 4.5vw, 5rem)" }}
            >
              A developer who
              <br />
              <span style={{ color: "var(--purple)" }}>builds with purpose.</span>
            </h2>

            {/* Subtle Developer Activity Indicator */}
            <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center gap-4 text-[10px] font-mono tracking-wider select-none text-white/40">
              <div className="relative flex items-center justify-center h-8 w-8 shrink-0">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-purple-400/30"
                />
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-purple-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-purple-400" />
                </span>
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-white/60 font-semibold uppercase tracking-[0.16em]">
                  STATE // BUILDING · LEARNING · EXPLORING
                </span>
                <span className="text-white/35">
                  13.0827° N, 80.2707° E · CHENNAI, IN
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
          >
            <p
              className="leading-relaxed"
              style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "rgba(240,240,242,0.72)" }}
            >
              {personal.about}
            </p>

            <div className="mt-10">
              <a
                href={resume.path}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 border px-5 py-3 text-xs uppercase tracking-[0.16em] text-white/90 transition-all duration-300"
                style={{ borderColor: "var(--purple)", background: "var(--purple-10)" }}
                onMouseEnter={e => { e.currentTarget.style.background = "rgba(147,51,234,0.2)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "var(--purple-10)"; }}
              >
                {resume.label}
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              {/* Subtle RGB Generative Visual directly beneath Download Resume */}
              <SignalNetwork />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
