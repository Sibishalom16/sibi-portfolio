"use client";

import React, { useEffect, useRef, useMemo } from "react";
import { animate, stagger } from "animejs";

interface DotParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  depth: "bg" | "normal" | "accent";
  size: number;
  minOpacity: number;
  maxOpacity: number;
  driftX: number;
  driftY: number;
  duration: number;
  delay: number;
  glow?: boolean;
  hasTrail?: boolean;
}

// Saturated RGB technical spectrum:
// Cyan, Blue, Violet, Pink, Red, Orange, Green
const RGB_PALETTE = [
  "#06B6D4", // 0: Cyan
  "#3B82F6", // 1: Blue
  "#8B5CF6", // 2: Violet
  "#EC4899", // 3: Pink
  "#EF4444", // 4: Red
  "#F97316", // 5: Orange
  "#84CC16", // 6: Green
];

// ── Clean Exclusion Zone around the Cyan Technical Network ──
// Protects the network in the header right-side area plus 8–12% comfortable padding:
// Horizontally: from x = 40% to x = 98%
// Vertically: from y = 3.5% to y = 32.5%
// Any particle inside this region is strictly excluded.
export const NETWORK_EXCLUSION_ZONE = {
  minX: 40,
  maxX: 98,
  minY: 3.5,
  maxY: 32.5,
};

export function isInsideNetworkZone(x: number, y: number): boolean {
  return (
    x >= NETWORK_EXCLUSION_ZONE.minX &&
    x <= NETWORK_EXCLUSION_ZONE.maxX &&
    y >= NETWORK_EXCLUSION_ZONE.minY &&
    y <= NETWORK_EXCLUSION_ZONE.maxY
  );
}

// Curated coordinates distributed across allowed regions:
// - Around the heading & behind "Technical capabilities."
// - Left gutter & margin
// - Above the network (top edge)
// - Below the network across open areas
// - Far-right spaces outside the network (beside lower category rows)
// ZERO particles placed inside the network exclusion zone.
const RAW_COORDINATES: Array<{
  x: number;
  y: number;
  colorIndex: number;
  depth: "bg" | "normal" | "accent";
  hasTrail?: boolean;
}> = [
    // ── 1. Heading & Title Zone (Around & behind "Technical capabilities.") ──
    { x: 14, y: 15, colorIndex: 0, depth: "normal" },
    { x: 22, y: 14, colorIndex: 1, depth: "bg" },
    { x: 29, y: 16, colorIndex: 2, depth: "normal" },
    { x: 16, y: 22, colorIndex: 3, depth: "normal" },
    { x: 24, y: 25, colorIndex: 4, depth: "accent", hasTrail: true },
    { x: 32, y: 21, colorIndex: 5, depth: "bg" },
    { x: 37, y: 25, colorIndex: 0, depth: "normal" },
    { x: 6, y: 7, colorIndex: 6, depth: "bg" },
    { x: 12, y: 5, colorIndex: 1, depth: "normal" },
    { x: 20, y: 8, colorIndex: 2, depth: "bg" },
    { x: 28, y: 6, colorIndex: 5, depth: "accent" },
    { x: 35, y: 9, colorIndex: 0, depth: "bg" },
    { x: 3, y: 12, colorIndex: 1, depth: "bg" },
    { x: 7, y: 18, colorIndex: 0, depth: "normal" },
    { x: 3, y: 24, colorIndex: 4, depth: "bg" },

    // ── 2. Top Edge Above Network (y <= 3%, safe overhead margin) ──
    { x: 48, y: 2, colorIndex: 1, depth: "bg" },
    { x: 62, y: 2, colorIndex: 3, depth: "normal" },
    { x: 75, y: 2, colorIndex: 0, depth: "bg" },
    { x: 88, y: 2, colorIndex: 5, depth: "normal" },
    { x: 96, y: 2, colorIndex: 2, depth: "bg" },

    // ── 3. Far-Left Marginal Gutter (y: 30%–88%, x: 2%–14%) ──
    { x: 4, y: 34, colorIndex: 4, depth: "bg" },
    { x: 11, y: 38, colorIndex: 5, depth: "accent" },
    { x: 3, y: 44, colorIndex: 2, depth: "bg" },
    { x: 8, y: 49, colorIndex: 6, depth: "normal" },
    { x: 4, y: 58, colorIndex: 3, depth: "bg" },
    { x: 12, y: 63, colorIndex: 1, depth: "normal", hasTrail: true },
    { x: 4, y: 72, colorIndex: 0, depth: "bg" },
    { x: 10, y: 77, colorIndex: 2, depth: "normal" },
    { x: 3, y: 84, colorIndex: 5, depth: "bg" },
    { x: 8, y: 89, colorIndex: 4, depth: "normal" },

    // ── 4. Middle Spaces between Category Labels & Pills (x: 18%–32%) ──
    { x: 20, y: 36, colorIndex: 3, depth: "bg" },
    { x: 25, y: 39, colorIndex: 0, depth: "normal" },
    { x: 30, y: 35, colorIndex: 6, depth: "bg" },
    { x: 19, y: 50, colorIndex: 1, depth: "normal" },
    { x: 24, y: 54, colorIndex: 5, depth: "accent" },
    { x: 31, y: 51, colorIndex: 4, depth: "bg" },
    { x: 18, y: 66, colorIndex: 2, depth: "bg" },
    { x: 23, y: 69, colorIndex: 0, depth: "normal" },
    { x: 29, y: 73, colorIndex: 3, depth: "bg" },
    { x: 21, y: 80, colorIndex: 6, depth: "normal" },

    // ── 5. Directly Below the Network (y: 34%–53%, x: 46%–97%) ──
    { x: 46, y: 35, colorIndex: 0, depth: "normal" },
    { x: 54, y: 36, colorIndex: 1, depth: "bg" },
    { x: 63, y: 35, colorIndex: 6, depth: "accent", hasTrail: true },
    { x: 72, y: 36, colorIndex: 4, depth: "bg" },
    { x: 82, y: 35, colorIndex: 2, depth: "normal" },
    { x: 91, y: 36, colorIndex: 5, depth: "bg" },
    { x: 97, y: 35, colorIndex: 0, depth: "normal" },
    { x: 76, y: 41, colorIndex: 3, depth: "normal" },
    { x: 84, y: 44, colorIndex: 1, depth: "bg" },
    { x: 92, y: 42, colorIndex: 4, depth: "normal" },
    { x: 96, y: 46, colorIndex: 0, depth: "accent" },
    { x: 75, y: 48, colorIndex: 1, depth: "bg" },
    { x: 83, y: 50, colorIndex: 5, depth: "normal" },
    { x: 89, y: 53, colorIndex: 4, depth: "bg" },
    { x: 95, y: 51, colorIndex: 2, depth: "bg" },

    // ── 6. Right Lower Flank (y: 68%–94%, x: 72%–97%) ──
    { x: 74, y: 70, colorIndex: 3, depth: "normal" },
    { x: 80, y: 68, colorIndex: 0, depth: "bg" },
    { x: 87, y: 72, colorIndex: 1, depth: "normal", hasTrail: true },
    { x: 94, y: 69, colorIndex: 6, depth: "accent" },
    { x: 77, y: 77, colorIndex: 5, depth: "bg" },
    { x: 83, y: 80, colorIndex: 4, depth: "normal" },
    { x: 90, y: 78, colorIndex: 2, depth: "bg" },
    { x: 96, y: 83, colorIndex: 0, depth: "normal" },
    { x: 73, y: 86, colorIndex: 1, depth: "bg" },
    { x: 82, y: 89, colorIndex: 3, depth: "accent" },
    { x: 89, y: 88, colorIndex: 5, depth: "normal" },
    { x: 95, y: 92, colorIndex: 4, depth: "bg" },
    { x: 85, y: 74, colorIndex: 6, depth: "bg" },

    // ── 7. Lower Section Base Margin (y: 86%–96%, x: 16%–68%) ──
    { x: 18, y: 91, colorIndex: 2, depth: "bg" },
    { x: 25, y: 88, colorIndex: 5, depth: "normal" },
    { x: 32, y: 94, colorIndex: 0, depth: "bg" },
    { x: 40, y: 89, colorIndex: 6, depth: "accent", hasTrail: true },
    { x: 47, y: 93, colorIndex: 1, depth: "bg" },
    { x: 54, y: 90, colorIndex: 4, depth: "normal" },
    { x: 61, y: 95, colorIndex: 3, depth: "bg" },
    { x: 67, y: 88, colorIndex: 0, depth: "normal" },
    { x: 22, y: 95, colorIndex: 4, depth: "bg" },
    { x: 36, y: 92, colorIndex: 2, depth: "bg" },
    { x: 58, y: 92, colorIndex: 5, depth: "bg" },

    // ── 8. Sparse Transition Nodes ──
    { x: 68, y: 59, colorIndex: 4, depth: "bg" },
    { x: 65, y: 73, colorIndex: 5, depth: "normal" },
    { x: 34, y: 44, colorIndex: 0, depth: "bg" },
    { x: 35, y: 61, colorIndex: 6, depth: "normal" },
    { x: 63, y: 82, colorIndex: 1, depth: "bg" },
    { x: 38, y: 77, colorIndex: 2, depth: "bg" },
  ];

export default function SkillsRgbDotField() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Generate particle models with depth layers, calibrated sizes, and opacities
  const particles: DotParticle[] = useMemo(() => {
    // Explicit protection check: ensure zero particles ever render inside the network zone
    const validCoords = RAW_COORDINATES.filter(
      (item) => !isInsideNetworkZone(item.x, item.y)
    );

    return validCoords.map((item, idx) => {
      const color = RGB_PALETTE[item.colorIndex % RGB_PALETTE.length];

      let size = 2;
      let minOpacity = 1;
      let maxOpacity = 1;
      let glow = false;

      if (item.depth === "normal") {
        size = 1.5;
        minOpacity = 0.20;
        maxOpacity = 0.35;
      } else if (item.depth === "accent") {
        // Occasional larger accent dots: 2.0px to 2.4px
        size = 2.2;
        minOpacity = 0.35;
        maxOpacity = 0.55;
        glow = true;
      }

      // Slightly more noticeable, independent drift vectors (9s - 17s)
      const duration = 10 + ((idx * 7) % 8) * 1.0;
      const delay = ((idx * 3) % 9) * 0.7;

      // Independent horizontal and diagonal movement with varied amplitude
      // Background dots drift 8-14px; normal dots drift 14-22px; accents drift 20-30px
      const baseDistance =
        item.depth === "accent" ? 22 : item.depth === "normal" ? 16 : 10;
      let driftX = (idx % 2 === 0 ? 1 : -1) * (baseDistance + ((idx * 3) % 8));
      let driftY = (idx % 3 === 0 ? -1 : 1) * (baseDistance * 0.85 + ((idx * 4) % 7));

      // Particles in the upper-left (around heading) are directed away from the network zone
      if (item.y <= 33 && item.x <= 40) {
        driftX = -Math.abs(driftX); // drift away from network into heading or left gutter
      }

      return {
        id: idx,
        x: item.x,
        y: item.y,
        color,
        depth: item.depth,
        size,
        minOpacity,
        maxOpacity,
        driftX,
        driftY,
        duration,
        delay,
        glow,
        hasTrail: item.hasTrail,
      };
    });
  }, []);

  useEffect(() => {
    // Respect user's motion preferences
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let anims: ReturnType<typeof animate>[] = [];
    const isMobile = window.innerWidth < 768;

    try {
      // 1. Noticeable yet elegant independent horizontal & diagonal drift
      const driftDots = container.querySelectorAll<HTMLElement>(".skills-rgb-dot");
      driftDots.forEach((el) => {
        const dx = parseFloat(el.dataset.dx || "12") * (isMobile ? 0.45 : 1);
        const dy = parseFloat(el.dataset.dy || "12") * (isMobile ? 0.45 : 1);
        const dur = parseFloat(el.dataset.dur || "14") * 1000;
        const del = parseFloat(el.dataset.del || "0") * 1000;

        const a1 = animate(el, {
          translateX: [-dx * 0.5, dx * 0.5],
          translateY: [-dy * 0.5, dy * 0.5],
          duration: dur,
          delay: del,
          alternate: true,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a1);
      });

      // 2. Individual opacity breathing (minOpacity to maxOpacity and back)
      const fadeDots = container.querySelectorAll<HTMLElement>(".skills-rgb-fade");
      fadeDots.forEach((el) => {
        const minOp = parseFloat(el.dataset.minop || "0.15");
        const maxOp = parseFloat(el.dataset.maxop || "0.35");
        const dur = parseFloat(el.dataset.dur || "12") * 850;
        const del = (parseFloat(el.dataset.del || "0") + 0.8) * 1000;

        const a2 = animate(el, {
          opacity: [minOp, maxOp, minOp],
          duration: dur,
          delay: del,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a2);
      });

      // 3. Subtle soft pulse on the occasional highlight / accent particles
      if (!isMobile) {
        const accentDots = container.querySelectorAll<HTMLElement>(".skills-rgb-accent");
        if (accentDots.length > 0) {
          const a3 = animate(accentDots, {
            scale: [1, 1.25, 1],
            duration: 4400,
            delay: stagger(1100),
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a3);
        }
      }
    } catch (err) {
      console.warn("SkillsRgbDotField animation error:", err);
    }

    return () => {
      anims.forEach((a) => {
        try {
          a.revert();
        } catch {
          // ignore cleanup errors
        }
      });
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none z-0"
    >
      {particles.map((p) => {
        // On mobile, hide every 2nd background particle to keep it ultra lightweight
        const mobileHideClass = p.depth === "bg" && p.id % 2 !== 0 ? "hidden md:block" : "";

        return (
          <div
            key={p.id}
            data-dx={p.driftX}
            data-dy={p.driftY}
            data-dur={p.duration}
            data-del={p.delay}
            data-minop={p.minOpacity}
            data-maxop={p.maxOpacity}
            className={`skills-rgb-dot skills-rgb-fade ${p.depth === "accent" ? "skills-rgb-accent" : ""
              } ${mobileHideClass} absolute rounded-full`}
            style={{
              top: `${p.y}%`,
              left: `${p.x}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: p.color,
              opacity: p.minOpacity,
              boxShadow: p.glow
                ? `0 0 5px ${p.color}, 0 0 10px ${p.color}50`
                : undefined,
              willChange: "transform, opacity",
            }}
          >
            {/* Optional subtle trailing line for a very small number of particles */}
            {p.hasTrail && (
              <span
                aria-hidden="true"
                className="hidden lg:block absolute top-[50%] right-[100%] h-[1px] -translate-y-1/2 pointer-events-none"
                style={{
                  width: "10px",
                  background: `linear-gradient(to left, ${p.color}45, transparent)`,
                  opacity: 0.7,
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
