"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger, splitText } from "animejs";

export default function AnimatedIdentity() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Respect reduced motion preference: show text statically without animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      return;
    }

    let splitter: ReturnType<typeof splitText> | null = null;
    let anim: ReturnType<typeof animate> | null = null;

    try {
      // Split the complete identity text into characters
      splitter = splitText(el, { chars: true });

      if (splitter && splitter.chars && splitter.chars.length > 0) {
        // Anime.js Animation documentation technique:
        // Characters start slightly lower with low opacity and subtle blur,
        // moving upward into position with staggered timing and sharp deceleration
        anim = animate(splitter.chars, {
          y: ["12px", "0px"],
          opacity: [0, 1],
          filter: ["blur(4px)", "blur(0px)"],
          ease: "outExpo",
          duration: 620,
          delay: stagger(22, { start: 120 }),
        });
      }
    } catch (err) {
      console.warn("Anime.js splitText error:", err);
      el.style.opacity = "1";
    }

    return () => {
      if (anim) {
        try {
          anim.revert();
        } catch {
          // ignore revert error on unmount
        }
      }
      if (splitter) {
        try {
          splitter.revert();
        } catch {
          // ignore revert error on unmount
        }
      }
    };
  }, []);

  return (
    <>
      <style>{`
        .animated-identity [data-char] {
          display: inline-block;
          will-change: transform, opacity, filter;
        }
      `}</style>
      <div
        ref={containerRef}
        className="animated-identity flex flex-wrap items-center gap-2 sm:gap-2.5 md:gap-3.5 select-none"
        aria-label="S.SIBIRAJ // AI FULL STACK DEVELOPER"
      >
        <span
          className="font-bold tracking-[0.10em] text-[#f0f0f2] text-[clamp(1.05rem,3.4vw,1.65rem)]"
        >
          S.SIBIRAJ
        </span>
        <span className="text-white/30 font-mono text-[clamp(0.8rem,3.2vw,1.1rem)] tracking-widest">
          //
        </span>
        <span className="text-white/55 font-mono uppercase tracking-[0.18em] sm:tracking-[0.20em] text-[clamp(0.75rem,3.2vw,0.925rem)] lg:text-sm">
          AI FULL STACK DEVELOPER
        </span>
      </div>
    </>
  );
}
