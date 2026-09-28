"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { animate } from "animejs";

interface OrbitConfig {
  id: string;
  name: string;
  color: string;
  glowColor: string;
  cx: number;
  cy: number;
  angle: number;
  rx: number;
  ry: number;
  backPath: string;
  frontPath: string;
  fullPath: string;
  speed: number; // ms for full pulse loop
  dashPulse: string;
  particles: {
    r: number;
    color: string;
    dur: number;
    begin: number;
    isForeground: boolean;
  }[];
}

const ORBIT_CONFIGS: OrbitConfig[] = [
  // Orbit 1: Primary Electric Cyan/Blue Horizon Orbit (-18 deg)
  {
    id: "orbit-1",
    name: "Cyan Horizon",
    color: "#06b6d4",
    glowColor: "rgba(6, 182, 212, 0.6)",
    cx: 300,
    cy: 340,
    angle: -18,
    rx: 245,
    ry: 95,
    backPath: "M 55 340 A 245 95 0 0 1 545 340",
    frontPath: "M 545 340 A 245 95 0 0 1 55 340",
    fullPath: "M 55 340 A 245 95 0 0 1 545 340 A 245 95 0 0 1 55 340",
    speed: 11000,
    dashPulse: "80 480",
    particles: [
      { r: 2.4, color: "#06b6d4", dur: 11, begin: 0, isForeground: true },
      { r: 1.8, color: "#38bdf8", dur: 11, begin: 5.5, isForeground: false },
    ],
  },

// Orbit 2: Cosmic Violet Helix (+32 deg)
{
  id: "orbit-2",
  name: "Violet Helix",
  color: "#8b5cf6",
  glowColor: "rgba(139, 92, 246, 0.6)",

  cx: 410,
  cy: 290,
  angle: 32,
  rx: 200,
  ry: 100,

  backPath: "M 210 290 A 200 100 0 0 1 610 290",
  frontPath: "M 610 290 A 200 100 0 0 1 210 290",
  fullPath:
    "M 210 290 A 200 100 0 0 1 610 290 A 200 100 0 0 1 210 290",

  speed: 14500,
  dashPulse: "70 450",

  particles: [
    { r: 2.8, color: "#a855f7", dur: 14.5, begin: 1.2, isForeground: true },
    { r: 2.0, color: "#c084fc", dur: 14.5, begin: 8.5, isForeground: false },
  ],
},
  // Orbit 3: Warm Amber/Orange Rim Orbit (-38 deg)
  {
    id: "orbit-3",
    name: "Amber Rim",
    color: "#ff9d08",
    glowColor: "rgba(255, 157, 8, 0.65)",
    cx: 335,
    cy: 395,
    angle: -18,
    rx: 240,
    ry: 72,
    backPath: "M 95 395 A 240 72 0 0 1 575 395",
    frontPath: "M 575 395 A 240 72 0 0 1 95 395",
    fullPath: "M 95 395 A 240 72 0 0 1 575 395 A 240 72 0 0 1 95 395",
    speed: 17000,
    dashPulse: "65 460",
    particles: [
      { r: 2.6, color: "#ff9d08", dur: 17, begin: 3.4, isForeground: true },
      { r: 1.9, color: "#fb923c", dur: 17, begin: 11.9, isForeground: false },
    ],
  },
  // Orbit 4: Lower Cyan Base Swirl (-10 deg)
  {
    id: "orbit-4",
    name: "Lower Swirl",
    color: "#38bdf8",
    glowColor: "rgba(56, 189, 248, 0.55)",
    cx: 315,
    cy: 455,
    angle: -10,
    rx: 185,
    ry: 58,
    backPath: "M 130 455 A 185 58 0 0 1 500 455",
    frontPath: "M 500 455 A 185 58 0 0 1 130 455",
    fullPath: "M 130 455 A 185 58 0 0 1 500 455 A 185 58 0 0 1 130 455",
    speed: 9500,
    dashPulse: "50 350",
    particles: [
      { r: 2.2, color: "#38bdf8", dur: 9.5, begin: 0.8, isForeground: true },
      { r: 1.6, color: "#06b6d4", dur: 9.5, begin: 5.5, isForeground: false },
    ],
  },
];

export default function OrbitalSystem() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const characterRef = useRef<HTMLDivElement | null>(null);
  const bgOrbitsRef = useRef<SVGSVGElement | null>(null);
  const fgOrbitsRef = useRef<SVGSVGElement | null>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    setPrefersReducedMotion(isReduced);

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      window.innerWidth < 768;

    // 1. HERO ENTRANCE ANIMATION (Anime.js)
    if (!isReduced && characterRef.current && fgOrbitsRef.current && bgOrbitsRef.current) {
      // Sibi image smooth fade and slide up
      animate(characterRef.current, {
        opacity: [0, 1],
        scale: [0.93, 1],
        y: [20, 0],
        duration: 900,
        delay: 200,
        ease: "outExpo",
      });

      // SVG path-drawing entrance reveal for all orbital lines
      const allPaths = containerRef.current?.querySelectorAll(
        ".orbit-guide-path, .orbit-pulse-path"
      );
      if (allPaths && allPaths.length > 0) {
        animate(allPaths, {
          opacity: [0, 1],
          duration: 1200,
          delay: 400,
          ease: "outQuad",
        });
      }

      // Continuous subtle orbital line shift (1–2 degrees oscillation)
      const orbitGroups = containerRef.current?.querySelectorAll(".orbit-group");
      if (orbitGroups) {
        orbitGroups.forEach((group, idx) => {
          const cfg = ORBIT_CONFIGS[idx % ORBIT_CONFIGS.length];
          animate(group, {
            rotate: [cfg.angle - 1.5, cfg.angle + 1.5],
            duration: 10000 + idx * 2500,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
        });
      }
    }

    // 2. MOUSE PARALLAX INTERACTION (Controlled, lightweight depth)
    if (isTouch || isReduced) return;

    let rafId: number;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      targetX = Math.max(-1, Math.min(1, x));
      targetY = Math.max(-1, Math.min(1, y));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      // Character moves 3–5px
      if (characterRef.current) {
        characterRef.current.style.transform = `translate3d(${(
          currentX * 4
        ).toFixed(2)}px, ${(currentY * 4).toFixed(2)}px, 0)`;
      }

      // Background orbits move slightly less (~2.2px)
      if (bgOrbitsRef.current) {
        bgOrbitsRef.current.style.transform = `translate3d(${(
          currentX * 2.2
        ).toFixed(2)}px, ${(currentY * 2.2).toFixed(2)}px, 0)`;
      }

      // Foreground orbits move slightly more (~6.5px)
      if (fgOrbitsRef.current) {
        fgOrbitsRef.current.style.transform = `translate3d(${(
          currentX * 6.5
        ).toFixed(2)}px, ${(currentY * 6.5).toFixed(2)}px, 0)`;
      }

      rafId = requestAnimationFrame(updateParallax);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(updateParallax);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[340px] min-[390px]:max-w-[375px] min-[430px]:max-w-[400px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[640px] xl:max-w-[680px] aspect-square flex items-center justify-center select-none mx-auto"
    >
      <style>{`
        /* Continuous Travelling Light Pulses along the orbits */
        @keyframes orbitTravel1 {
          from { stroke-dashoffset: 560; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes orbitTravel2 {
          from { stroke-dashoffset: 520; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes orbitTravel3 {
          from { stroke-dashoffset: 525; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes orbitTravel4 {
          from { stroke-dashoffset: 400; }
          to { stroke-dashoffset: 0; }
        }
        .pulse-orbit-1 { animation: orbitTravel1 11s linear infinite; }
        .pulse-orbit-2 { animation: orbitTravel2 14.5s linear infinite; }
        .pulse-orbit-3 { animation: orbitTravel3 17s linear infinite; }
        .pulse-orbit-4 { animation: orbitTravel4 9.5s linear infinite; }

        @media (max-width: 767px) {
          .pulse-orbit-1 { animation-duration: 16s; }
          .pulse-orbit-2 { animation-duration: 20s; }
          .pulse-orbit-3 { animation-duration: 22s; }
          .pulse-orbit-4 { animation-duration: 14s; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pulse-orbit-1, .pulse-orbit-2, .pulse-orbit-3, .pulse-orbit-4 {
            animation: none !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>

      {/* ── Soft Deep Cosmic Glow behind Sibi ───────────────── */}
      <div
        className="pointer-events-none absolute w-[82%] h-[82%] rounded-full -z-10"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.16) 0%, rgba(47, 99, 232, 0.12) 38%, rgba(255, 149, 0, 0.05) 65%, transparent 75%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── LAYER 1: Background Orbits (Pass BEHIND Sibi) ──── */}
      <svg
        ref={bgOrbitsRef}
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden md:overflow-visible will-change-transform"
      >
        <defs>
          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-violet" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="glow-orange" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {ORBIT_CONFIGS.map((cfg, idx) => (
          <g
            key={`bg-${cfg.id}`}
            className={`orbit-group ${cfg.id === "orbit-4" ? "hidden md:block" : ""}`}
            transform={`rotate(${cfg.angle} ${cfg.cx} ${cfg.cy})`}
          >
            {/* Guide line (faint stable path behind) */}
            <path
              d={cfg.backPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth="0.85"
              strokeOpacity="0.12"
              className="orbit-guide-path"
            />

            {/* Travelling Light Pulse (Back segment) */}
            <path
              d={cfg.backPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth="1.4"
              strokeDasharray={cfg.dashPulse}
              strokeOpacity="0.5"
              className={`orbit-pulse-path pulse-orbit-${idx + 1}`}
            />

            {/* Background Particles traveling along the back path */}
            {!prefersReducedMotion &&
              cfg.particles
                .filter((p) => !p.isForeground)
                .map((p, pIdx) => (
                  <circle
                    key={`bg-pt-${cfg.id}-${pIdx}`}
                    r={p.r}
                    fill={p.color}
                    opacity="0.4"
                    className="hidden sm:block"
                    filter="url(#glow-cyan)"
                  >
                    <animateMotion
                      path={cfg.fullPath}
                      dur={`${p.dur}s`}
                      repeatCount="indefinite"
                      begin={`${p.begin}s`}
                    />
                  </circle>
                ))}
          </g>
        ))}
      </svg>

      {/* ── LAYER 2: Character Image (Sibi with laptop) ─── */}
      <div
        ref={characterRef}
        className="relative z-20 w-[92%] h-[92%] flex items-center justify-center will-change-transform"
        style={{ opacity: prefersReducedMotion ? 1 : 0 }}
      >
        <Image
          src="/sibi.png"
          alt="S.Sibiraj // AI Full Stack Developer"
          width={1303}
          height={1207}
          priority
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
        />
      </div>

      {/* ── LAYER 3: Foreground Orbits (Pass IN FRONT OF Sibi) ── */}
      <svg
        ref={fgOrbitsRef}
        viewBox="0 0 600 600"
        className="absolute inset-0 w-full h-full pointer-events-none z-30 overflow-hidden md:overflow-visible will-change-transform"
      >
        {ORBIT_CONFIGS.map((cfg, idx) => (
          <g
            key={`fg-${cfg.id}`}
            className={`orbit-group ${cfg.id === "orbit-4" ? "hidden md:block" : ""}`}
            transform={`rotate(${cfg.angle} ${cfg.cx} ${cfg.cy})`}
          >
            {/* Guide line (faint stable path in front) */}
            <path
              d={cfg.frontPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth="0.95"
              strokeOpacity="0.22"
              className="orbit-guide-path"
            />

            {/* Glowing Travelling Light Pulse (Front segment - brighter) */}
            <path
              d={cfg.frontPath}
              fill="none"
              stroke={cfg.color}
              strokeWidth="2.0"
              strokeDasharray={cfg.dashPulse}
              strokeOpacity="0.85"
              style={{
                filter: `drop-shadow(0 0 5px ${cfg.glowColor})`,
              }}
              className={`orbit-pulse-path pulse-orbit-${idx + 1}`}
            />

            {/* Foreground Particles traveling along the front path */}
            {!prefersReducedMotion &&
              cfg.particles
                .filter((p) => p.isForeground)
                .map((p, pIdx) => (
                  <circle
                    key={`fg-pt-${cfg.id}-${pIdx}`}
                    r={p.r}
                    fill={p.color}
                    opacity="0.95"
                    style={{
                      filter: `drop-shadow(0 0 6px ${cfg.glowColor})`,
                    }}
                  >
                    <animateMotion
                      path={cfg.fullPath}
                      dur={`${p.dur}s`}
                      repeatCount="indefinite"
                      begin={`${p.begin}s`}
                    />
                  </circle>
                ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
