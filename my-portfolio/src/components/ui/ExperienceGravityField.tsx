"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Anime.js-style smooth organic easing
const gravityEase = [0.25, 1, 0.5, 1] as const;

interface LineDef {
  id: number;
  baseY: number;
  flatPath: string;
  bentPath: string;
  delay: number;
  opacity: number;
}

interface GravityParticle {
  id: number;
  cx: number;
  cy: number;
  r: number;
  color: string;
  driftX: number[];
  driftY: number[];
  duration: number;
  delay: number;
}

export default function ExperienceGravityField() {
  const shouldReduceMotion = useReducedMotion();

  const linesCount = 15;
  const gravityX = 310;
  const gravityY = 85;

  // Generate the 15 thin lines and their gravitational deflection paths
  const lines: LineDef[] = useMemo(() => {
    const list: LineDef[] = [];
    const startY = 16;
    const endY = 154;
    const stepY = (endY - startY) / (linesCount - 1);

    for (let i = 0; i < linesCount; i++) {
      const y = Number((startY + i * stepY).toFixed(1));
      const distY = y - gravityY;
      // Gaussian curve of gravitational pull around gravity center
      const influence = Math.exp(-Math.pow(distY / 42, 2));

      // Straight line
      const flatPath = `M 0 ${y} C 140 ${y}, 310 ${y}, 460 ${y}`;

      // Curved line bending around gravitational point
      const pullY = distY < 0 ? influence * 26 : -influence * 26;
      const ctrlX1 = Number((gravityX - 70 + influence * 20).toFixed(1));
      const ctrlX2 = Number((gravityX + 35 + influence * 35).toFixed(1));
      const ctrlY = Number((y + pullY).toFixed(1));

      const bentPath = `M 0 ${y} C ${ctrlX1} ${y}, ${ctrlX2} ${ctrlY}, 460 ${y}`;

      // Staggered delays: lines near the center respond first or sequential cascade
      const delay = i * 0.065;
      const opacity = Number((0.08 + influence * 0.08).toFixed(3));

      list.push({
        id: i,
        baseY: y,
        flatPath,
        bentPath,
        delay,
        opacity,
      });
    }
    return list;
  }, []);

  // Exactly 7 tiny particles drifting near the gravity well
  const particles: GravityParticle[] = useMemo(() => {
    return [
      {
        id: 1,
        cx: 240,
        cy: 70,
        r: 1.2,
        color: "#8b5cf6", // violet
        driftX: [240, 275, 305, 275, 240],
        driftY: [70, 78, 86, 76, 70],
        duration: 11,
        delay: 0.5,
      },
      {
        id: 2,
        cx: 320,
        cy: 95,
        r: 1.5,
        color: "#06b6d4", // cyan
        driftX: [320, 345, 310, 340, 320],
        driftY: [95, 90, 102, 94, 95],
        duration: 13,
        delay: 2.2,
      },
      {
        id: 3,
        cx: 280,
        cy: 115,
        r: 1.1,
        color: "#3b82f6", // blue
        driftX: [280, 305, 270, 300, 280],
        driftY: [115, 106, 118, 110, 115],
        duration: 12,
        delay: 1.2,
      },
      {
        id: 4,
        cx: 350,
        cy: 62,
        r: 1.3,
        color: "#8b5cf6", // violet
        driftX: [350, 325, 360, 335, 350],
        driftY: [62, 70, 60, 68, 62],
        duration: 14,
        delay: 3.5,
      },
      {
        id: 5,
        cx: 190,
        cy: 82,
        r: 1.2,
        color: "#3b82f6", // blue
        driftX: [190, 225, 255, 220, 190],
        driftY: [82, 85, 80, 84, 82],
        duration: 15,
        delay: 4.8,
      },
      {
        id: 6,
        cx: 380,
        cy: 104,
        r: 1.4,
        color: "#06b6d4", // cyan
        driftX: [380, 360, 395, 370, 380],
        driftY: [104, 110, 102, 108, 104],
        duration: 12.5,
        delay: 1.8,
      },
      {
        id: 7,
        cx: 300,
        cy: 50,
        r: 1.0,
        color: "#8b5cf6", // violet
        driftX: [300, 320, 290, 315, 300],
        driftY: [50, 56, 52, 58, 50],
        duration: 10.5,
        delay: 2.8,
      },
    ];
  }, []);

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[480px] h-[180px] pointer-events-none select-none overflow-hidden"
    >
      <svg
        viewBox="0 0 460 170"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="gravityLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="20%" stopColor="#7c3aed" stopOpacity="0.12" />
            <stop offset="55%" stopColor="#2563eb" stopOpacity="0.18" />
            <stop offset="78%" stopColor="#06b6d4" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="gravityWellGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.08" />
            <stop offset="50%" stopColor="#2563eb" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#030304" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Faint invisible gravity well ambient presence */}
        <circle
          cx={gravityX}
          cy={gravityY}
          r="95"
          fill="url(#gravityWellGlow)"
        />

        {/* ── 15 Abstract Gravitational Lines ── */}
        {lines.map((line) => {
          if (shouldReduceMotion) {
            return (
              <path
                key={line.id}
                d={line.flatPath}
                fill="none"
                stroke="url(#gravityLineGrad)"
                strokeWidth="0.8"
                opacity={line.opacity}
              />
            );
          }

          return (
            <motion.path
              key={line.id}
              d={line.flatPath}
              fill="none"
              stroke="url(#gravityLineGrad)"
              strokeWidth="0.8"
              initial={{ d: line.flatPath, opacity: line.opacity }}
              whileInView={{
                d: [line.flatPath, line.bentPath, line.bentPath, line.flatPath],
                opacity: [
                  line.opacity,
                  line.opacity + 0.12,
                  line.opacity + 0.12,
                  line.opacity,
                ],
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 6.5,
                repeat: Infinity,
                repeatDelay: 3.5,
                delay: line.delay,
                ease: gravityEase,
              }}
            />
          );
        })}

        {/* ── 5–10 Subtle Light Particles drifting near the lines ── */}
        {!shouldReduceMotion &&
          particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={p.cx}
              cy={p.cy}
              r={p.r}
              fill={p.color}
              initial={{ opacity: 0.08 }}
              animate={{
                cx: p.driftX,
                cy: p.driftY,
                opacity: [0.08, 0.26, 0.12, 0.24, 0.08],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: p.delay,
              }}
            />
          ))}
      </svg>
    </div>
  );
}
