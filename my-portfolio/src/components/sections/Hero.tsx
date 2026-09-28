"use client";

import { motion, useReducedMotion } from "framer-motion";
import HeroBackground from "@/components/ui/HeroBackground";
import AnimatedIdentity from "@/components/visuals/AnimatedIdentity";
import OrbitalSystem from "@/components/visuals/OrbitalSystem";

// Anime.js inspired easeOutQuart curve - controlled, sharp deceleration, expensive landing
const animeEase = [0.22, 1, 0.36, 1] as const;

interface WordConfig {
  text: string;
  color: string;
  startDelay: number;
}

const HERO_WORDS: WordConfig[] = [
  { text: "BUILDING", color: "#ff493f", startDelay: 0.22 },
  { text: "DIGITAL", color: "#2f63e8", startDelay: 0.44 },
  { text: "EXPERIENCES", color: "#ff9d08", startDelay: 0.66 },
];

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden px-4 pt-[72px] pb-6 sm:px-8 md:px-12 md:pt-[86px] md:pb-12 lg:px-16 lg:pt-[90px] lg:pb-14"
      style={{ backgroundColor: "#030304" }}
    >
      {/* Background Layer: Kinetic Digital Fabric + deep ambient lighting */}
      <HeroBackground />

      {/* Foreground Content Container */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] pointer-events-auto">
        {/* Two-Column Balanced Hero Composition: Text Top / Character Below on mobile, Side-by-Side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.12fr_0.88fr] items-center gap-5 min-[390px]:gap-6 sm:gap-8 lg:gap-10">
          {/* Left Column: Cohesive Typography Block (Identity Eyebrow + Dominant Headline) */}
          <div className="flex flex-col justify-center max-w-[760px] lg:-translate-y-3 xl:-translate-y-5">
            {/* Identity line - locked tightly above the headline as cohesive unit */}
            <div className="mb-2 sm:mb-2.5 leading-none">
              <AnimatedIdentity />
            </div>

            {/* Main Headline - 3 distinct lines, dominant & geometric */}
            <h1
              className="font-[family-name:var(--font-space-grotesk)] font-extrabold select-none uppercase tracking-[-0.035em] text-[clamp(2.65rem,12.8vw,5rem)] lg:text-[127px] leading-[0.88] break-words"
            >
              {HERO_WORDS.map((word) => (
                <span key={word.text} className="block overflow-visible" style={{ color: word.color }}>
                  {shouldReduceMotion ? (
                    <span>{word.text}</span>
                  ) : (
                    Array.from(word.text).map((char, charIdx) => {
                      const delay = word.startDelay + charIdx * 0.028;
                      return (
                        <motion.span
                          key={charIdx}
                          className="inline-block will-change-transform"
                          initial={{
                            opacity: 0,
                            y: 28,
                            x: -3,
                            filter: "blur(6px)",
                          }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            x: 0,
                            filter: "blur(0px)",
                          }}
                          transition={{
                            duration: 0.65,
                            delay,
                            ease: animeEase,
                          }}
                        >
                          {char}
                        </motion.span>
                      );
                    })
                  )}
                </span>
              ))}
            </h1>
          </div>

          {/* Right Column: Sibi Character Image (+30% scaled anchor) + Living Orbital System */}
          <div className="flex items-center justify-center lg:justify-end w-full mt-2 min-[390px]:mt-3 sm:mt-4 lg:mt-0">
            <OrbitalSystem />
          </div>
        </div>
      </div>
    </section>
  );
}
