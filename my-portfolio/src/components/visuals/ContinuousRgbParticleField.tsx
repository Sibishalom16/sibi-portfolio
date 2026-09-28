"use client";

import React, { useEffect, useState, useMemo } from "react";

interface DotParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  depth: "bg" | "normal" | "accent";
  size: number;
  minOpacity: number;
  maxOpacity: number;
  duration: number;
  delay: number;
  fadeDuration: number;
  fadeDelay: number;
  responsiveClass: string;
  glow?: boolean;
  hasTrail?: boolean;
}

// Technical RGB Spectrum (Cyan, Blue, Violet, Pink, Red, Orange, Green)
export const RGB_PALETTE = [
  "#06B6D4", // 0: Cyan
  "#3B82F6", // 1: Blue
  "#8B5CF6", // 2: Violet
  "#EC4899", // 3: Pink
  "#EF4444", // 4: Red
  "#F97316", // 5: Orange
  "#84CC16", // 6: Green
];

/**
 * Clean Exclusion Zones around the 5 major section visuals:
 * 1. Skills: Cyan technical network (upper/mid right)
 * 2. Projects: Digital architectural form (upper/mid right)
 * 3. Experience: Career signal trajectory (upper/mid right)
 * 4. Certifications: Certificate light field (upper/mid right)
 * 5. Education: Graduation cap wireframe (upper/mid right)
 * 6. Contact: Form inputs & let's work together heading
 * 7. Footer: Personal branding text & social dock
 */
export const MAJOR_VISUAL_EXCLUSION_ZONES = [
  { name: "Skills Network", minX: 42, maxX: 98, minY: 13.0, maxY: 21.0 },
  { name: "Projects Architecture", minX: 46, maxX: 98, minY: 25.5, maxY: 32.5 },
  { name: "Experience Career Signal", minX: 44, maxX: 98, minY: 43.0, maxY: 50.0 },
  { name: "Certifications Light Field", minX: 44, maxX: 98, minY: 56.5, maxY: 63.5 },
  { name: "Education Graduation Cap", minX: 46, maxX: 98, minY: 70.0, maxY: 77.0 },
  { name: "Contact Form Box", minX: 45, maxX: 95, minY: 83.5, maxY: 90.5 },
];

export function isInsideMajorVisualZone(x: number, y: number): boolean {
  return MAJOR_VISUAL_EXCLUSION_ZONES.some(
    (zone) => x >= zone.minX && x <= zone.maxX && y >= zone.minY && y <= zone.maxY
  );
}

/**
 * Unified, curated coordinates spanning:
 * ABOUT (1%–11.5%) → SKILLS (12%–24%) → PROJECTS (24.5%–41.5%) →
 * EXPERIENCE (42%–55%) → CERTIFICATIONS (55.5%–68.5%) → EDUCATION (69%–81%) →
 * CONTACT (81.5%–92.5%) → FOOTER (93%–100%)
 *
 * 74 coordinates strategically placed strictly in negative spaces, margins, and gutters.
 * Tier 1: 24 particles visible on all screens (Mobile, Tablet, Desktop).
 * Tier 2: 24 particles visible on md+ (Tablet & Desktop).
 * Tier 3: 26 particles visible on lg+ (Desktop).
 */
const RAW_COORDINATES: Array<{
  x: number;
  y: number;
  colorIndex: number;
  depth: "bg" | "normal" | "accent";
  tier: 1 | 2 | 3;
  hasTrail?: boolean;
}> = [
  // ── SECTION 1: ABOUT (y: 1.0% — 11.5%) ──────────────────────────────
  { x: 4,  y: 1.8,  colorIndex: 0, depth: "normal", tier: 1 },
  { x: 14, y: 3.2,  colorIndex: 2, depth: "accent", tier: 1, hasTrail: true },
  { x: 26, y: 2.5,  colorIndex: 1, depth: "normal", tier: 2 },
  { x: 48, y: 2.2,  colorIndex: 0, depth: "bg",     tier: 3 },
  { x: 74, y: 2.8,  colorIndex: 6, depth: "normal", tier: 2 },
  { x: 92, y: 3.4,  colorIndex: 3, depth: "accent", tier: 2 },
  { x: 6,  y: 6.5,  colorIndex: 5, depth: "normal", tier: 1 },
  { x: 88, y: 7.2,  colorIndex: 1, depth: "normal", tier: 3 },
  { x: 16, y: 10.4, colorIndex: 2, depth: "accent", tier: 3 },
  { x: 82, y: 10.8, colorIndex: 0, depth: "bg",     tier: 2 },

  // ── SECTION 2: SKILLS (y: 12.0% — 24.0%) ────────────────────────────
  { x: 5,  y: 13.5, colorIndex: 6, depth: "normal", tier: 1 },
  { x: 18, y: 14.8, colorIndex: 0, depth: "accent", tier: 1, hasTrail: true },
  { x: 32, y: 13.2, colorIndex: 1, depth: "bg",     tier: 3 },
  { x: 4,  y: 18.2, colorIndex: 2, depth: "normal", tier: 2 },
  { x: 22, y: 19.5, colorIndex: 5, depth: "normal", tier: 1 },
  { x: 36, y: 18.8, colorIndex: 0, depth: "accent", tier: 2 },
  { x: 8,  y: 22.8, colorIndex: 4, depth: "bg",     tier: 3 },
  { x: 48, y: 23.2, colorIndex: 6, depth: "normal", tier: 2 },
  { x: 92, y: 23.6, colorIndex: 1, depth: "normal", tier: 3 },

  // ── SECTION 3: PROJECTS (y: 24.5% — 41.5%) ──────────────────────────
  { x: 5,  y: 25.8, colorIndex: 0, depth: "normal", tier: 1 },
  { x: 16, y: 26.6, colorIndex: 2, depth: "accent", tier: 2 },
  { x: 30, y: 25.5, colorIndex: 1, depth: "bg",     tier: 3 },
  { x: 4,  y: 30.5, colorIndex: 5, depth: "normal", tier: 1 },
  { x: 94, y: 29.8, colorIndex: 3, depth: "accent", tier: 2, hasTrail: true },
  { x: 8,  y: 35.0, colorIndex: 6, depth: "normal", tier: 2 },
  { x: 38, y: 35.8, colorIndex: 0, depth: "bg",     tier: 3 },
  { x: 92, y: 36.2, colorIndex: 2, depth: "normal", tier: 3 },
  { x: 6,  y: 40.2, colorIndex: 1, depth: "accent", tier: 1 },
  { x: 28, y: 40.8, colorIndex: 4, depth: "normal", tier: 2 },
  { x: 88, y: 40.4, colorIndex: 5, depth: "bg",     tier: 3 },

  // ── SECTION 4: EXPERIENCE (y: 42.0% — 55.0%) ────────────────────────
  { x: 6,  y: 43.2, colorIndex: 2, depth: "normal", tier: 1 },
  { x: 18, y: 44.5, colorIndex: 0, depth: "accent", tier: 1, hasTrail: true },
  { x: 32, y: 43.8, colorIndex: 6, depth: "bg",     tier: 3 },
  { x: 4,  y: 48.5, colorIndex: 1, depth: "normal", tier: 2 },
  { x: 24, y: 49.6, colorIndex: 3, depth: "accent", tier: 2 },
  { x: 94, y: 48.2, colorIndex: 5, depth: "normal", tier: 3 },
  { x: 8,  y: 53.4, colorIndex: 0, depth: "bg",     tier: 1 },
  { x: 46, y: 53.8, colorIndex: 2, depth: "normal", tier: 3 },
  { x: 90, y: 53.5, colorIndex: 6, depth: "accent", tier: 2 },

  // ── SECTION 5: CERTIFICATIONS (y: 55.5% — 68.5%) ────────────────────
  { x: 5,  y: 56.5, colorIndex: 3, depth: "normal", tier: 1 },
  { x: 17, y: 57.8, colorIndex: 1, depth: "accent", tier: 2 },
  { x: 31, y: 56.8, colorIndex: 0, depth: "bg",     tier: 3 },
  { x: 4,  y: 62.4, colorIndex: 6, depth: "normal", tier: 2 },
  { x: 94, y: 61.8, colorIndex: 2, depth: "accent", tier: 1, hasTrail: true },
  { x: 8,  y: 66.8, colorIndex: 5, depth: "normal", tier: 1 },
  { x: 26, y: 67.5, colorIndex: 0, depth: "bg",     tier: 3 },
  { x: 64, y: 67.8, colorIndex: 1, depth: "normal", tier: 2 },
  { x: 91, y: 67.2, colorIndex: 4, depth: "accent", tier: 3 },

  // ── SECTION 6: EDUCATION (y: 69.0% — 81.0%) ─────────────────────────
  { x: 5,  y: 70.2, colorIndex: 0, depth: "normal", tier: 1 },
  { x: 19, y: 71.4, colorIndex: 2, depth: "accent", tier: 2 },
  { x: 33, y: 70.6, colorIndex: 6, depth: "bg",     tier: 3 },
  { x: 4,  y: 75.8, colorIndex: 1, depth: "normal", tier: 1 },
  { x: 94, y: 75.2, colorIndex: 5, depth: "accent", tier: 2, hasTrail: true },
  { x: 8,  y: 79.8, colorIndex: 3, depth: "normal", tier: 3 },
  { x: 28, y: 80.4, colorIndex: 0, depth: "bg",     tier: 2 },
  { x: 54, y: 80.0, colorIndex: 2, depth: "normal", tier: 3 },
  { x: 90, y: 80.2, colorIndex: 6, depth: "normal", tier: 1 },

  // ── SECTION 7: CONTACT (y: 81.5% — 92.5%) ───────────────────────────
  { x: 6,  y: 82.2, colorIndex: 6, depth: "normal", tier: 1 }, // top margin
  { x: 24, y: 82.0, colorIndex: 0, depth: "accent", tier: 2 },
  { x: 78, y: 82.2, colorIndex: 1, depth: "bg",     tier: 3 },
  { x: 4,  y: 86.8, colorIndex: 2, depth: "normal", tier: 1 }, // far-left gutter
  { x: 95, y: 86.4, colorIndex: 5, depth: "accent", tier: 2, hasTrail: true }, // far-right gutter
  { x: 14, y: 90.6, colorIndex: 0, depth: "normal", tier: 1 }, // open space below location
  { x: 28, y: 91.2, colorIndex: 4, depth: "bg",     tier: 3 },
  { x: 43, y: 89.8, colorIndex: 6, depth: "normal", tier: 2 }, // column gap
  { x: 88, y: 91.8, colorIndex: 3, depth: "accent", tier: 3 }, // bottom margin

  // ── SECTION 8: FOOTER (y: 93.0% — 100.0%) ──────────────────────────
  { x: 8,  y: 93.8, colorIndex: 1, depth: "normal", tier: 1 }, // top transition margin
  { x: 52, y: 93.6, colorIndex: 6, depth: "bg",     tier: 3 },
  { x: 88, y: 93.8, colorIndex: 0, depth: "accent", tier: 2 },
  { x: 4,  y: 96.2, colorIndex: 2, depth: "normal", tier: 1 }, // left gutter
  { x: 42, y: 96.6, colorIndex: 5, depth: "bg",     tier: 3 }, // central open gap
  { x: 94, y: 96.2, colorIndex: 3, depth: "normal", tier: 2, hasTrail: true }, // right gutter
  { x: 18, y: 98.8, colorIndex: 0, depth: "accent", tier: 1 }, // bottom copyright area
  { x: 74, y: 98.6, colorIndex: 1, depth: "normal", tier: 2 },
];

export default function ContinuousRgbParticleField() {
  const [isTabVisible, setIsTabVisible] = useState(true);

  // Tab visibility listener: automatically pauses all GPU CSS animations when tab is hidden
  useEffect(() => {
    const handleVisibility = () => {
      setIsTabVisible(document.visibilityState === "visible");
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Pre-calculate particle metadata with visual intensity & exclusion check
  const particles: DotParticle[] = useMemo(() => {
    const validCoords = RAW_COORDINATES.filter(
      (c) => !isInsideMajorVisualZone(c.x, c.y)
    );

    return validCoords.map((coord, idx) => {
      const color = RGB_PALETTE[coord.colorIndex % RGB_PALETTE.length];

      let size: number;
      let minOpacity: number;
      let maxOpacity: number;
      let glow = false;

      switch (coord.depth) {
        case "accent":
          size = 2.2 + ((idx * 3) % 3) * 0.25;
          minOpacity = 0.72 + ((idx * 2) % 3) * 0.05;
          maxOpacity = 0.94 + ((idx * 3) % 4) * 0.02;
          glow = true;
          break;
        case "normal":
          size = 1.6 + ((idx * 2) % 3) * 0.2;
          minOpacity = 0.52 + ((idx * 3) % 3) * 0.05;
          maxOpacity = 0.82 + ((idx * 2) % 4) * 0.03;
          break;
        case "bg":
        default:
          size = 1.2 + (idx % 3) * 0.15;
          minOpacity = 0.34 + ((idx * 2) % 3) * 0.05;
          maxOpacity = 0.62 + ((idx * 3) % 3) * 0.04;
          break;
      }

      // Responsive visibility class
      let responsiveClass = "";
      if (coord.tier === 2) {
        responsiveClass = "hidden md:block";
      } else if (coord.tier === 3) {
        responsiveClass = "hidden lg:block";
      }

      // High-performance GPU-friendly animation timing
      const duration = 14 + ((idx * 7) % 9) * 1.5; // 14s — 26s
      const delay = Number((((idx * 3) % 17) * 1.2).toFixed(1)); // negative delay for immediate mid-motion start
      const fadeDuration = 10 + ((idx * 5) % 7) * 1.8; // 10s — 21s
      const fadeDelay = Number((((idx * 5) % 13) * 1.1).toFixed(1));

      return {
        id: idx,
        x: coord.x,
        y: coord.y,
        color,
        depth: coord.depth,
        size: Number(size.toFixed(2)),
        minOpacity: Number(minOpacity.toFixed(2)),
        maxOpacity: Number(maxOpacity.toFixed(2)),
        duration,
        delay,
        fadeDuration,
        fadeDelay,
        responsiveClass,
        glow,
        hasTrail: coord.hasTrail,
      };
    });
  }, []);

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${
        !isTabVisible ? "crgb-paused" : ""
      }`}
    >
      <style>{`
        @keyframes crgb-drift-1 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(12px, -9px, 0); }
          100% { transform: translate3d(-8px, 6px, 0); }
        }
        @keyframes crgb-drift-2 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-10px, 11px, 0); }
          100% { transform: translate3d(9px, -6px, 0); }
        }
        @keyframes crgb-drift-3 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(9px, 12px, 0); }
          100% { transform: translate3d(-11px, -7px, 0); }
        }
        @keyframes crgb-drift-4 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-11px, -10px, 0); }
          100% { transform: translate3d(8px, 9px, 0); }
        }
        @keyframes crgb-drift-5 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(13px, 7px, 0); }
          100% { transform: translate3d(-7px, -11px, 0); }
        }
        @keyframes crgb-drift-6 {
          0% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-8px, 12px, 0); }
          100% { transform: translate3d(10px, -9px, 0); }
        }

        @keyframes crgb-fade-1 {
          0%, 100% { opacity: var(--min-op, 0.45); }
          50% { opacity: var(--max-op, 0.85); }
        }
        @keyframes crgb-fade-2 {
          0%, 100% { opacity: var(--max-op, 0.85); }
          50% { opacity: var(--min-op, 0.45); }
        }

        @keyframes crgb-pulse-accent {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.22); }
        }

        .crgb-paused * {
          animation-play-state: paused !important;
        }

        @media (max-width: 767px) {
          .crgb-dot {
            scale: 0.82;
          }
          .crgb-inner {
            box-shadow: none !important;
            filter: drop-shadow(0 0 2.5px currentColor) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .crgb-dot, .crgb-inner {
            animation: none !important;
          }
        }
      `}</style>

      {particles.map((p) => {
        let boxShadow: string | undefined;
        if (p.glow) {
          boxShadow = `0 0 7px ${p.color}, 0 0 16px ${p.color}80, 0 0 24px ${p.color}40`;
        } else if (p.depth === "normal") {
          boxShadow = `0 0 5px ${p.color}65`;
        } else {
          boxShadow = `0 0 3px ${p.color}35`;
        }

        const driftAnim = `crgb-drift-${(p.id % 6) + 1} ${p.duration}s ease-in-out -${p.delay}s infinite alternate`;
        const fadeAnim = `crgb-fade-${(p.id % 2) + 1} ${p.fadeDuration}s ease-in-out -${p.fadeDelay}s infinite`;

        return (
          <div
            key={p.id}
            className={`crgb-dot ${p.responsiveClass} absolute`}
            style={
              {
                top: `${p.y}%`,
                left: `${p.x}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                animation: driftAnim,
                willChange: "transform",
              } as React.CSSProperties
            }
          >
            <div
              className={`crgb-inner ${p.depth === "accent" ? "crgb-accent" : ""} h-full w-full rounded-full`}
              style={
                {
                  backgroundColor: p.color,
                  boxShadow,
                  "--min-op": p.minOpacity,
                  "--max-op": p.maxOpacity,
                  animation: `${fadeAnim}${p.depth === "accent" ? ", crgb-pulse-accent 5s ease-in-out infinite" : ""}`,
                  willChange: "opacity, transform",
                } as React.CSSProperties
              }
            />

            {p.hasTrail && (
              <span
                aria-hidden="true"
                className="hidden lg:block absolute top-[50%] right-[100%] h-[1px] -translate-y-1/2 pointer-events-none"
                style={{
                  width: "14px",
                  background: `linear-gradient(to left, ${p.color}75, transparent)`,
                  opacity: 0.85,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
