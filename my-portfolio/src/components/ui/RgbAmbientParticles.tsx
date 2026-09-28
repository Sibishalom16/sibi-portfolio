"use client";

import React, { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface Particle {
  id: number;
  top: string;
  left: string;
  size: number;
  color: string;
  minOpacity: number;
  maxOpacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
}

// Curated RGB technical atmospheric palette (cyan, blue, violet, occasional orange)
const RGB_COLORS = [
  "rgba(6, 182, 212, 0.85)",   // cyan
  "rgba(59, 130, 246, 0.85)",  // electric blue
  "rgba(139, 92, 246, 0.85)",  // violet
  "rgba(59, 130, 246, 0.80)",  // blue
  "rgba(6, 182, 212, 0.80)",   // cyan
  "rgba(139, 92, 246, 0.80)",  // violet
  "rgba(249, 115, 22, 0.75)",  // occasional orange
];

interface RgbAmbientParticlesProps {
  count?: number;
  className?: string;
}

export default function RgbAmbientParticles({
  count = 20,
  className = "",
}: RgbAmbientParticlesProps) {
  const shouldReduceMotion = useReducedMotion();

  // Natural sparse coordinates distributed across large empty areas of the entire page
  const particles: Particle[] = useMemo(() => {
    // 20 sparse global page coordinates (percentages from top to bottom of full page)
    const coordinates = [
      { x: 12, y: 4 },
      { x: 88, y: 7 },
      { x: 68, y: 13 },
      { x: 22, y: 19 },
      { x: 82, y: 25 },
      { x: 14, y: 31 },
      { x: 91, y: 37 },
      { x: 38, y: 43 },
      { x: 76, y: 49 },
      { x: 18, y: 55 },
      { x: 85, y: 61 },
      { x: 32, y: 67 },
      { x: 72, y: 73 },
      { x: 15, y: 79 },
      { x: 89, y: 84 },
      { x: 42, y: 89 },
      { x: 78, y: 93 },
      { x: 25, y: 96 },
      { x: 62, y: 34 },
      { x: 50, y: 58 },
    ];

    const targetCount = Math.min(count, coordinates.length);

    return Array.from({ length: targetCount }, (_, i) => {
      const coord = coordinates[i];
      const color = RGB_COLORS[i % RGB_COLORS.length];
      // Size: strictly 1px to 1.8px — tiny distant atmosphere points
      const size = 1.0 + ((i * 3) % 4) * 0.25;
      // Opacity: strictly 0.08 to 0.22 (whisper-quiet)
      const minOpacity = 0.07 + ((i * 2) % 3) * 0.025;
      const maxOpacity = 0.16 + ((i * 3) % 4) * 0.025;
      // Very slow, non-synchronized timings (12s - 22s)
      const duration = 12 + ((i * 5) % 7) * 1.5;
      const delay = ((i * 3) % 6) * 1.2;
      const driftX = (i % 2 === 0 ? 1 : -1) * (3 + ((i * 2) % 4));
      const driftY = (i % 3 === 0 ? -1 : 1) * (4 + ((i * 3) % 4));

      return {
        id: i,
        top: `${coord.y}%`,
        left: `${coord.x}%`,
        size: Number(size.toFixed(1)),
        color,
        minOpacity: Number(minOpacity.toFixed(2)),
        maxOpacity: Number(maxOpacity.toFixed(2)),
        driftX,
        driftY,
        duration,
        delay,
      };
    });
  }, [count]);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}
    >
      {particles.map((p) => {
        if (shouldReduceMotion) {
          return (
            <span
              key={p.id}
              className="absolute rounded-full"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                backgroundColor: p.color,
                opacity: p.minOpacity,
              }}
            />
          );
        }

        return (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              top: p.top,
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              willChange: "transform, opacity",
            }}
            animate={{
              x: [0, p.driftX, 0],
              y: [0, p.driftY, 0],
              opacity: [p.minOpacity, p.maxOpacity, p.minOpacity],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: p.delay,
            }}
          />
        );
      })}
    </div>
  );
}
