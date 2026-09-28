"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * ProjectArchitecturalForm — Abstract digital material & flowing geometric architecture.
 * Occupies the right 40–45% of the "Things I've built." section header.
 *
 * Concept:
 * - A sophisticated piece of digital architecture with layered geometric ribbons,
 *   translucent computational membrane surfaces, and ruled wireframe contours.
 * - Primary accent: Emerald green (#00D084 / #00d97e)
 * - Supporting subtle accents: Cyan (#06B6D4), Blue (#3B82F6), Violet (#8B5CF6)
 * - Completely static & independent of project data or array length.
 * - Ambient Anime.js motion: slow contour light pulses, gentle membrane drift,
 *   and sparse outer RGB particles.
 */
export default function ProjectArchitecturalForm() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let anims: ReturnType<typeof animate>[] = [];
    const isMobile = window.innerWidth < 768;

    try {
      // 1. Slow traveling light pulses along the primary emerald ribbon contours
      const pulsePaths = container.querySelectorAll(".p-ribbon-pulse");
      if (pulsePaths.length > 0) {
        const a1 = animate(pulsePaths, {
          strokeDashoffset: [380, 0],
          duration: 15000,
          delay: stagger(2200),
          repeat: -1,
          ease: "linear",
        });
        anims.push(a1);
      }

      // 2. Slow breathing pulse on the architectural focal node
      const focalRing = container.querySelectorAll(".p-focal-ring");
      if (focalRing.length > 0) {
        const a2 = animate(focalRing, {
          scale: [1, 1.45, 1],
          opacity: [0.25, 0.7, 0.25],
          duration: 4800,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a2);
      }

      // 3. Ambient micro vertical drift on the geometric form
      if (!isMobile) {
        const driftGroup = container.querySelector(".p-form-drift");
        if (driftGroup) {
          const a3 = animate(driftGroup, {
            translateY: [-1.6, 1.6],
            duration: 8400,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a3);
        }

        // 4. Subtle opacity breathing across transversal ruled surface lines
        const ruledLines = container.querySelectorAll(".p-ruled-line");
        if (ruledLines.length > 0) {
          const a4 = animate(ruledLines, {
            opacity: [0.12, 0.28, 0.12],
            duration: 6200,
            delay: stagger(220),
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a4);
        }

        // 5. Sparse outer ambient RGB particles drift
        const outerDots = container.querySelectorAll(".p-outer-dot");
        outerDots.forEach((el) => {
          const a5 = animate(el, {
            translateX: [-5, 5],
            translateY: [-4, 4],
            duration: 11000 + Math.random() * 4000,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a5);
        });
      }
    } catch (err) {
      console.warn("ProjectArchitecturalForm animation error:", err);
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

  // Geometric Ribbon Spine Paths across 800 x 260 coordinate space
  // Spine A: Primary Foreground Emerald Ribbon (undulating S-curve with sharp architectural chamfer)
  const PATH_A =
    "M 40 185 C 150 90, 260 220, 390 145 C 510 75, 620 185, 750 115 L 785 115";

  // Spine B: Secondary Upper Ribbon (intertwining Cyan/Emerald trajectory)
  const PATH_B =
    "M 80 205 C 190 115, 300 235, 430 115 C 540 30, 650 140, 760 70";

  // Spine C: Lower Structural Contour (Deep Cyan/Electric Blue foundation)
  const PATH_C =
    "M 30 225 C 140 250, 240 135, 360 195 C 480 250, 600 115, 720 185 L 760 185";

  // Spine D: Upper Architectural Crest (Violet/Cyan subtle trace)
  const PATH_D =
    "M 130 120 C 240 45, 350 160, 480 75 C 580 15, 670 95, 750 45";

  // Transversal ruled surface ribs connecting Spine A and Spine B to simulate digital material curvature
  const RULED_RIBS = [
    { x1: 95,  y1: 155, x2: 125, y2: 175 },
    { x1: 145, y1: 125, x2: 175, y2: 145 },
    { x1: 200, y1: 130, x2: 230, y2: 165 },
    { x1: 255, y1: 165, x2: 285, y2: 195 },
    { x1: 315, y1: 180, x2: 345, y2: 175 },
    { x1: 375, y1: 155, x2: 405, y2: 130 },
    { x1: 435, y1: 120, x2: 465, y2: 95 },
    { x1: 495, y1: 95,  x2: 520, y2: 70 },
    { x1: 555, y1: 105, x2: 575, y2: 90 },
    { x1: 615, y1: 145, x2: 635, y2: 125 },
    { x1: 675, y1: 165, x2: 695, y2: 130 },
    { x1: 725, y1: 135, x2: 745, y2: 95 },
  ];

  // Sparse outer RGB particles (around the visual, away from center)
  const OUTER_RGB_PARTICLES = [
    { x: 30,  y: 40,  color: "#06B6D4", size: 1.6, opacity: 0.35 },
    { x: 110, y: 35,  color: "#00D084", size: 1.4, opacity: 0.30 },
    { x: 740, y: 25,  color: "#3B82F6", size: 1.8, opacity: 0.38 },
    { x: 780, y: 150, color: "#8B5CF6", size: 1.5, opacity: 0.32 },
    { x: 760, y: 220, color: "#EC4899", size: 1.6, opacity: 0.35 },
    { x: 670, y: 240, color: "#EF4444", size: 1.4, opacity: 0.28 },
    { x: 280, y: 245, color: "#F97316", size: 1.5, opacity: 0.30 },
    { x: 50,  y: 130, color: "#84CC16", size: 1.6, opacity: 0.32 },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[360px] sm:max-w-[480px] md:max-w-[620px] lg:max-w-[720px] xl:max-w-[760px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Soft Localized Emerald/Cyan Atmospheric Glow ── */}
      <div
        className="absolute top-[12%] right-[12%] w-[420px] md:w-[560px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(0, 208, 132, 0.08) 0%, rgba(6, 182, 212, 0.03) 48%, transparent 72%)",
          filter: "blur(54px)",
        }}
      />

      {/* ── Generative Digital Material & Architectural Form (800 x 260) ── */}
      <svg
        viewBox="0 0 800 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Emerald accent glow */}
          <filter id="p-glow-emerald" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Linear gradients for ribbons & folded material planes */}
          <linearGradient id="p-grad-emerald-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D084" stopOpacity="0.15" />
            <stop offset="45%" stopColor="#00D084" stopOpacity="0.85" />
            <stop offset="85%" stopColor="#06B6D4" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
          </linearGradient>

          <linearGradient id="p-grad-cyan-violet" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.2" />
          </linearGradient>

          {/* Translucent material membrane fill between ribbons */}
          <linearGradient id="p-membrane-fill" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#00D084" stopOpacity="0.01" />
            <stop offset="35%" stopColor="#00D084" stopOpacity="0.06" />
            <stop offset="70%" stopColor="#06B6D4" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>

          {/* Fading tail gradients */}
          <linearGradient id="p-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D084" stopOpacity="0" />
            <stop offset="100%" stopColor="#00D084" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="p-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00D084" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#00D084" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Subsystem 1: Ambient Background Wire Coordinates & Guidelines ── */}
        <g opacity="0.3">
          {/* Subtle horizontal parametric guide axes */}
          <line
            x1="20"
            y1="50"
            x2="780"
            y2="50"
            stroke="rgba(0, 208, 132, 0.06)"
            strokeWidth="0.75"
            strokeDasharray="2 9"
          />
          <line
            x1="20"
            y1="130"
            x2="780"
            y2="130"
            stroke="rgba(0, 208, 132, 0.05)"
            strokeWidth="0.75"
            strokeDasharray="2 11"
          />
          <line
            x1="20"
            y1="210"
            x2="780"
            y2="210"
            stroke="rgba(0, 208, 132, 0.06)"
            strokeWidth="0.75"
            strokeDasharray="2 9"
          />

          {/* Isometric projection tick marks */}
          {[
            { x: 180, y: 50 },
            { x: 390, y: 50 },
            { x: 620, y: 50 },
            { x: 260, y: 210 },
            { x: 510, y: 210 },
          ].map((pt, i) => (
            <g key={`pt-${i}`} opacity="0.4">
              <line
                x1={pt.x - 3}
                y1={pt.y}
                x2={pt.x + 3}
                y2={pt.y}
                stroke="#00D084"
                strokeWidth="0.7"
              />
              <line
                x1={pt.x}
                y1={pt.y - 3}
                x2={pt.x}
                y2={pt.y + 3}
                stroke="#00D084"
                strokeWidth="0.7"
              />
            </g>
          ))}
        </g>

        {/* ── Subsystem 2: The Flowing Architectural Material Form ── */}
        <g className="p-form-drift">
          {/* Translucent Computational Material Membrane (Filled Mesh Surface) */}
          <path
            d="M 40 185 C 150 90, 260 220, 390 145 C 510 75, 620 185, 750 115 L 760 70 C 650 140, 540 30, 430 115 C 300 235, 190 115, 80 205 Z"
            fill="url(#p-membrane-fill)"
          />

          {/* Transversal Ruled Surface Ribs (Geometric wireframe structure) */}
          {RULED_RIBS.map((rib, i) => (
            <line
              key={`rib-${i}`}
              x1={rib.x1}
              y1={rib.y1}
              x2={rib.x2}
              y2={rib.y2}
              stroke="#00D084"
              strokeWidth="0.8"
              strokeOpacity="0.18"
              className="p-ruled-line"
            />
          ))}

          {/* Secondary Structural Crest (Spine D - Violet/Cyan trace) */}
          <path
            d={PATH_D}
            stroke="url(#p-grad-cyan-violet)"
            strokeWidth="0.9"
            strokeOpacity="0.35"
            strokeDasharray="4 3"
          />

          {/* Lower Structural Contour (Spine C - Deep Cyan/Electric Blue foundation) */}
          <path
            d={PATH_C}
            stroke="#06B6D4"
            strokeWidth="1.1"
            strokeOpacity="0.28"
          />

          {/* Secondary Upper Ribbon (Spine B - Cyan/Emerald trace) */}
          <path
            d={PATH_B}
            stroke="#06B6D4"
            strokeWidth="1.2"
            strokeOpacity="0.38"
          />

          {/* Primary Foreground Emerald Ribbon (Spine A - Main illuminated architectural edge) */}
          <path
            d={PATH_A}
            stroke="url(#p-grad-emerald-cyan)"
            strokeWidth="1.6"
            strokeOpacity="0.65"
          />

          {/* Traveling Light Pulse along Primary Edge (Spine A) */}
          <path
            d={PATH_A}
            stroke="#00D084"
            strokeWidth="2.0"
            strokeOpacity="0.95"
            strokeDasharray="45 320"
            filter="url(#p-glow-emerald)"
            className="p-ribbon-pulse"
          />

          {/* Traveling Light Pulse along Secondary Edge (Spine B) */}
          <path
            d={PATH_B}
            stroke="#22d3ee"
            strokeWidth="1.4"
            strokeOpacity="0.75"
            strokeDasharray="30 260"
            className="p-ribbon-pulse"
          />

          {/* ── Subsystem 3: Precision Architectural Structural Nodes ── */}
          {/* Focal Inflection Node 1: Apex at (390, 145) */}
          <g transform="translate(390, 145)">
            <circle
              r="7.5"
              stroke="#00D084"
              strokeWidth="0.9"
              fill="none"
              className="p-focal-ring"
            />
            <circle
              r="4.5"
              stroke="#06B6D4"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="none"
            />
            <circle
              r="2.8"
              fill="#00D084"
              filter="url(#p-glow-emerald)"
            />
            <circle
              r="1.2"
              fill="#ffffff"
            />
          </g>

          {/* Secondary Inflection Node 2: Helix at (620, 145) */}
          <g transform="translate(620, 145)">
            <circle
              r="5.5"
              stroke="#06B6D4"
              strokeWidth="0.8"
              fill="none"
              className="p-focal-ring"
            />
            <circle
              r="2.4"
              fill="#22d3ee"
              opacity="0.85"
            />
          </g>

          {/* Small Geometric Vertex Markers along Inflections */}
          {[
            { x: 150, y: 90,  r: 1.6 },
            { x: 260, y: 220, r: 1.8 },
            { x: 510, y: 75,  r: 1.8 },
            { x: 750, y: 115, r: 1.6 },
            { x: 430, y: 115, r: 1.7 },
          ].map((node, i) => (
            <circle
              key={`vnode-${i}`}
              cx={node.x}
              cy={node.y}
              r={node.r}
              fill="#00D084"
              opacity="0.75"
            />
          ))}

          {/* ── Subsystem 4: Moving Signal Photons (Gliding along Ribbon Spines) ── */}
          <circle r="1.6" fill="#e6fffa" filter="url(#p-glow-emerald)" opacity="0.95">
            <animateMotion
              path={PATH_A}
              dur="14s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>

          <circle r="1.4" fill="#38bdf8" opacity="0.85">
            <animateMotion
              path={PATH_B}
              dur="11s"
              repeatCount="indefinite"
              begin="3s"
            />
          </circle>
        </g>

        {/* ── Subsystem 5: Sparse Outer RGB Atmosphere (Pockets around visual) ── */}
        <g>
          {OUTER_RGB_PARTICLES.map((dot, i) => (
            <circle
              key={`odot-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill={dot.color}
              opacity={dot.opacity}
              className="p-outer-dot"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
