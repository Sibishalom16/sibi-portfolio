"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * CareerSignalVisual — Refined career trajectory & digital signal visualization.
 * Positioned in the right 40–45% of the "Experience & internships." section header.
 *
 * Communicates: growth → progression → experience → forward movement.
 * - 2–3 layered ascending trajectory lines with diagonal stepped transitions
 * - Fine horizontal scan lines and vertical data milestone traces
 * - Primary accent: Purple (#8B5CF6), Secondary: Electric Blue (#3B82F6), Subtle: Cyan (#06B6D4)
 * - Sparse ambient RGB particles positioned around (not over) the trajectory
 * - Slower, calmer Anime.js ambient light sweep & node breathing
 * - 100% independent of experience data or company count
 */
export default function CareerSignalVisual() {
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
      // 1. Slow, calm traveling light pulse along the primary stepped trajectory
      const pulseLines = container.querySelectorAll(".cs-signal-pulse");
      if (pulseLines.length > 0) {
        const a1 = animate(pulseLines, {
          strokeDashoffset: [460, 0],
          duration: 16000,
          delay: stagger(3200),
          repeat: -1,
          ease: "linear",
        });
        anims.push(a1);
      }

      // 2. Slow, gentle breathing on the apex progression node & launch node
      const focalRings = container.querySelectorAll(".cs-focal-ring");
      if (focalRings.length > 0) {
        const a2 = animate(focalRings, {
          scale: [1, 1.45, 1],
          opacity: [0.2, 0.65, 0.2],
          duration: 5200,
          delay: stagger(1600),
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a2);
      }

      // 3. Very subtle opacity breathing on horizontal scan lines
      const scanLines = container.querySelectorAll(".cs-scan-line");
      if (scanLines.length > 0) {
        const a3 = animate(scanLines, {
          opacity: [0.06, 0.18, 0.06],
          duration: 8400,
          delay: stagger(400),
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a3);
      }

      // 4. Ambient micro vertical drift on the signal group
      if (!isMobile) {
        const driftGroup = container.querySelector(".cs-signal-drift");
        if (driftGroup) {
          const a4 = animate(driftGroup, {
            translateY: [-1.4, 1.4],
            duration: 9000,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a4);
        }

        // 5. Sparse outer ambient RGB particles drift (calm floating)
        const outerDots = container.querySelectorAll(".cs-outer-rgb-dot");
        outerDots.forEach((el) => {
          const a5 = animate(el, {
            translateX: [-5, 5],
            translateY: [-4, 4],
            duration: 12000 + Math.random() * 5000,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a5);
        });
      }
    } catch (err) {
      console.warn("CareerSignalVisual animation error:", err);
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

  // Layered Ascending Trajectory Geometry (900 x 270 space)
  // Stepped architecture: Horizontal base → Diagonal ascension → Elevated plateau → Final ascent to Apex
  //
  // Track 1: Primary Ascending Carrier Highway
  // (30, 210) -> (170, 210) -> (270, 140) -> (470, 140) -> (590, 50) -> (810, 50)
  const PATH_SPINE_1 =
    "M 30 210 L 170 210 L 270 140 L 470 140 L 590 50 L 810 50";

  // Track 2: Secondary Supporting Carrier Track (Offset underneath)
  // (50, 230) -> (230, 230) -> (330, 160) -> (540, 160) -> (660, 85) -> (840, 85)
  const PATH_SPINE_2 =
    "M 50 230 L 230 230 L 330 160 L 540 160 L 660 85 L 840 85";

  // Track 3: Upper Harmonic Vector (Faint precursor crest branching up)
  // (270, 140) -> (370, 75) -> (570, 75) -> (630, 50)
  const PATH_SPINE_3 =
    "M 270 140 L 370 75 L 570 75 L 630 50";

  // Transversal data coupling connectors (between parallel tracks at step inflections)
  const COUPLING_LINKS = [
    { x1: 230, y1: 230, x2: 270, y2: 140 },
    { x1: 330, y1: 160, x2: 370, y2: 75 },
    { x1: 540, y1: 160, x2: 590, y2: 50 },
    { x1: 660, y1: 85,  x2: 710, y2: 50 },
  ];

  // Horizontal scan lines running across altitude
  const SCAN_LINES = [30, 65, 105, 145, 185, 225, 255];

  // Sparse outer RGB particles (safely placed in outer margins AROUND the trajectory, NOT over it)
  const OUTER_RGB_PARTICLES = [
    // Top-left outer margin
    { x: 45,  y: 35,  color: "#8B5CF6", size: 1.5, opacity: 0.35 },
    { x: 120, y: 25,  color: "#3B82F6", size: 1.6, opacity: 0.30 },
    { x: 210, y: 30,  color: "#06B6D4", size: 1.4, opacity: 0.32 },
    // Top-right outer corner
    { x: 860, y: 35,  color: "#8B5CF6", size: 1.6, opacity: 0.38 },
    { x: 740, y: 20,  color: "#06B6D4", size: 1.4, opacity: 0.30 },
    // Right flank beneath apex
    { x: 865, y: 135, color: "#EC4899", size: 1.5, opacity: 0.32 },
    { x: 840, y: 195, color: "#3B82F6", size: 1.6, opacity: 0.35 },
    { x: 770, y: 230, color: "#8B5CF6", size: 1.4, opacity: 0.30 },
    // Bottom-center margin
    { x: 420, y: 245, color: "#EF4444", size: 1.5, opacity: 0.28 },
    { x: 530, y: 250, color: "#F97316", size: 1.4, opacity: 0.30 },
    { x: 640, y: 240, color: "#84CC16", size: 1.5, opacity: 0.32 },
    // Far-left lower margin
    { x: 30,  y: 155, color: "#3B82F6", size: 1.4, opacity: 0.28 },
    { x: 95,  y: 250, color: "#06B6D4", size: 1.5, opacity: 0.32 },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[360px] sm:max-w-[480px] md:max-w-[640px] lg:max-w-[760px] xl:max-w-[820px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Soft Localized Purple Atmospheric Glow behind Apex ── */}
      <div
        className="absolute top-[6%] right-[8%] w-[440px] md:w-[580px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 75% 30%, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.02) 52%, transparent 74%)",
          filter: "blur(54px)",
        }}
      />

      {/* ── Vector Career Signal Trajectory System (900 x 270) ── */}
      <svg
        viewBox="0 0 900 270"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Luminous purple glow filter */}
          <filter id="cs-glow-purple" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Stepped Trajectory Progression Gradient: Purple -> Electric Blue -> Cyan */}
          <linearGradient id="cs-grad-stepped" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.2" />
            <stop offset="28%" stopColor="#8B5CF6" stopOpacity="0.55" />
            <stop offset="65%" stopColor="#3B82F6" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.9" />
          </linearGradient>

          {/* Fading tail gradients into dark background */}
          <linearGradient id="cs-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
            <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="cs-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Subsystem 1: Very Fine Horizontal Scan Lines & Axes ── */}
        <g opacity="0.35">
          {SCAN_LINES.map((y, i) => (
            <line
              key={`scan-${i}`}
              x1="25"
              y1={y}
              x2="875"
              y2={y}
              stroke="rgba(139, 92, 246, 0.10)"
              strokeWidth="0.75"
              strokeDasharray={i % 2 === 0 ? "2 8" : "3 11"}
              className="cs-scan-line"
            />
          ))}

          {/* Vertical milestone guideline traces */}
          {[170, 270, 470, 590, 810].map((x, i) => (
            <line
              key={`vaxis-${i}`}
              x1={x}
              y1="25"
              x2={x}
              y2="250"
              stroke="rgba(59, 130, 246, 0.07)"
              strokeWidth="0.7"
              strokeDasharray="1 9"
            />
          ))}

          {/* Micro coordinate registration marks (+) */}
          {[
            { x: 170, y: 65 },
            { x: 470, y: 65 },
            { x: 710, y: 145 },
            { x: 370, y: 225 },
          ].map((pt, i) => (
            <g key={`pt-${i}`} opacity="0.4">
              <line
                x1={pt.x - 3}
                y1={pt.y}
                x2={pt.x + 3}
                y2={pt.y}
                stroke="#8B5CF6"
                strokeWidth="0.7"
              />
              <line
                x1={pt.x}
                y1={pt.y - 3}
                x2={pt.x}
                y2={pt.y + 3}
                stroke="#8B5CF6"
                strokeWidth="0.7"
              />
            </g>
          ))}
        </g>

        {/* ── Subsystem 2: Layered Trajectory Signal Geometry ── */}
        <g className="cs-signal-drift">
          {/* Fading entrance tail line from left */}
          <line
            x1="10"
            y1="210"
            x2="30"
            y2="210"
            stroke="url(#cs-fade-left)"
            strokeWidth="0.9"
          />

          {/* Fading exit tail line to right */}
          <line
            x1="810"
            y1="50"
            x2="880"
            y2="50"
            stroke="url(#cs-fade-right)"
            strokeWidth="0.9"
          />
          <line
            x1="840"
            y1="85"
            x2="885"
            y2="85"
            stroke="url(#cs-fade-right)"
            strokeWidth="0.8"
          />

          {/* Transversal Coupling Ribs (Connecting parallel tracks at step inflections) */}
          {COUPLING_LINKS.map((link, i) => (
            <line
              key={`link-${i}`}
              x1={link.x1}
              y1={link.y1}
              x2={link.x2}
              y2={link.y2}
              stroke="#3B82F6"
              strokeWidth="0.8"
              strokeOpacity="0.22"
              strokeDasharray="2 3"
            />
          ))}

          {/* Track 3: Upper Harmonic Vector (Faint precursor crest branching up) */}
          <path
            d={PATH_SPINE_3}
            stroke="#8B5CF6"
            strokeWidth="0.95"
            strokeOpacity="0.22"
            strokeDasharray="3 4"
          />

          {/* Track 2: Secondary Supporting Carrier Track (Offset depth layer) */}
          <path
            d={PATH_SPINE_2}
            stroke="#3B82F6"
            strokeWidth="1.15"
            strokeOpacity="0.32"
          />

          {/* Track 1: Primary Ascending Carrier Highway (Main illuminated trajectory) */}
          <path
            d={PATH_SPINE_1}
            stroke="url(#cs-grad-stepped)"
            strokeWidth="1.6"
            strokeOpacity="0.75"
          />

          {/* Traveling Light Pulse along Primary Stepped Highway */}
          <path
            d={PATH_SPINE_1}
            stroke="#c084fc"
            strokeWidth="2.0"
            strokeOpacity="0.9"
            strokeDasharray="50 360"
            filter="url(#cs-glow-purple)"
            className="cs-signal-pulse"
          />

          {/* Traveling Light Pulse along Secondary Carrier Track */}
          <path
            d={PATH_SPINE_2}
            stroke="#60a5fa"
            strokeWidth="1.4"
            strokeOpacity="0.65"
            strokeDasharray="36 300"
            className="cs-signal-pulse"
          />

          {/* ── Subsystem 3: Precision Geometric Modulation Nodes ── */}
          {/* Launch Base Node ● at (170, 210) — The inception point */}
          <g transform="translate(170, 210)">
            <circle
              r="5.5"
              stroke="#8B5CF6"
              strokeWidth="0.8"
              fill="none"
              className="cs-focal-ring"
            />
            <circle
              r="2.2"
              fill="#8B5CF6"
              opacity="0.85"
            />
          </g>

          {/* First Ascension Turn Node at (270, 140) */}
          <g transform="translate(270, 140)">
            <circle
              r="2.0"
              fill="#8B5CF6"
              opacity="0.8"
            />
            <circle
              r="4.2"
              stroke="#8B5CF6"
              strokeWidth="0.6"
              strokeOpacity="0.3"
              fill="none"
            />
          </g>

          {/* Intermediate Plateau Modulation Node at (470, 140) */}
          <g transform="translate(470, 140)">
            <circle
              r="5.0"
              stroke="#3B82F6"
              strokeWidth="0.8"
              fill="none"
              className="cs-focal-ring"
            />
            <circle
              r="2.2"
              fill="#60a5fa"
              opacity="0.85"
            />
          </g>

          {/* Upper Ascension Turn Node at (590, 50) */}
          <g transform="translate(590, 50)">
            <circle
              r="2.2"
              fill="#3B82F6"
              opacity="0.85"
            />
            <circle
              r="4.5"
              stroke="#3B82F6"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              fill="none"
            />
          </g>

          {/* Apex Progression Node ● at (810, 50) — High-Altitude Destination */}
          <g transform="translate(810, 50)">
            <circle
              r="8.0"
              stroke="#8B5CF6"
              strokeWidth="0.9"
              fill="none"
              className="cs-focal-ring"
            />
            <circle
              r="5.0"
              stroke="#06B6D4"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="none"
            />
            <circle
              r="3.0"
              fill="#c084fc"
              filter="url(#cs-glow-purple)"
            />
            <circle
              r="1.2"
              fill="#ffffff"
            />
          </g>

          {/* Secondary Target Node on Track 2 at (840, 85) */}
          <circle
            cx="840"
            cy="85"
            r="2.2"
            fill="#06B6D4"
            opacity="0.8"
          />

          {/* ── Subsystem 4: Gliding Signal Photons (Smooth Continuous Forward Flow) ── */}
          <circle r="1.6" fill="#e0e7ff" filter="url(#cs-glow-purple)" opacity="0.95">
            <animateMotion
              path={PATH_SPINE_1}
              dur="15s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>

          <circle r="1.3" fill="#93c5fd" opacity="0.85">
            <animateMotion
              path={PATH_SPINE_2}
              dur="12s"
              repeatCount="indefinite"
              begin="3s"
            />
          </circle>
        </g>

        {/* ── Subsystem 5: Sparse Ambient RGB Particle Atmosphere ── */}
        {/* Placed around the trajectory in outer negative margins, leaving lines clean */}
        <g>
          {OUTER_RGB_PARTICLES.map((dot, i) => (
            <circle
              key={`cs-outer-${i}`}
              cx={dot.x}
              cy={dot.y}
              r={dot.size}
              fill={dot.color}
              opacity={dot.opacity}
              className="cs-outer-rgb-dot"
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
