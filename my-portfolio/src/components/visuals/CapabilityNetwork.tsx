"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * CapabilityNetwork — Large abstract cyan technical network & capability field.
 * Occupies the center-right to far-right space of the Technical Capabilities header.
 *
 * Sized 2x–2.5x larger:
 * - Wide horizontal reach (920px vector field) stretching across the right half
 * - Multiple branching traces, geometric turns, and crosslinks
 * - 22+ connected nodes and 2 luminous focal nodes (#22d3ee) with breathing rings
 * - Very subtle coordinate matrix, grid dots, and registration marks
 * - Fading entry/exit traces softly dissolving into the dark background (#030304)
 * - Soft cyan atmospheric glow and lightweight, ambient Anime.js animations
 */
export default function CapabilityNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let anims: ReturnType<typeof animate>[] = [];
    const isMobile = window.innerWidth < 768;

    try {
      // 1. Focal node breathing rings
      const rings = container.querySelectorAll(".cap-focal-ring");
      if (rings.length > 0) {
        const a1 = animate(rings, {
          scale: [1, 1.42, 1],
          opacity: [0.22, 0.65, 0.22],
          duration: 4800,
          delay: stagger(1200),
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a1);
      }

      // 2. Secondary node ambient twinkle/pulse
      const secondaryNodes = container.querySelectorAll(".cap-node-pulse");
      if (secondaryNodes.length > 0) {
        const a2 = animate(secondaryNodes, {
          opacity: [0.4, 0.9, 0.4],
          duration: 3600,
          delay: stagger(600),
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a2);
      }

      // On non-mobile screens, add ambient pulse shift along connections
      if (!isMobile) {
        // 3. Traveling light pulse along primary technical lines
        const pulseLines = container.querySelectorAll(".cap-pulse-line");
        if (pulseLines.length > 0) {
          const a3 = animate(pulseLines, {
            strokeDashoffset: [340, 0],
            duration: 14000,
            delay: stagger(2600),
            repeat: -1,
            ease: "linear",
          });
          anims.push(a3);
        }

        // 4. Extremely subtle ambient vertical drift (1.5px)
        const driftGroup = container.querySelector(".cap-ambient-drift");
        if (driftGroup) {
          const a4 = animate(driftGroup, {
            translateY: [-1.4, 1.4],
            duration: 7800,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a4);
        }
      }
    } catch (err) {
      console.warn("CapabilityNetwork animation error:", err);
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

  // Geometry paths for wide technical topology across 920x280 field
  // Path 1: Central Spine Highway
  const PATH_SPINE =
    "M 45 160 L 120 160 L 190 160 L 250 100 L 420 100 L 480 160 L 640 160 L 720 100 L 830 100 L 885 100";

  // Path 2: Upper High-Frequency Branch
  const PATH_UPPER =
    "M 250 100 L 310 40 L 490 40 L 550 100 L 640 100 L 700 40 L 810 40 L 880 40";

  // Path 3: Lower Subsystem / Capability Bus
  const PATH_LOWER =
    "M 190 160 L 240 220 L 370 220 L 430 160 L 520 220 L 680 220 L 740 160 L 810 220 L 885 220";

  // Path 4: Mid-tier Interconnect Traces
  const PATH_MID_CROSS_1 = "M 310 40 L 360 100 L 370 220";
  const PATH_MID_CROSS_2 = "M 550 100 L 590 160 L 640 160";
  const PATH_MID_CROSS_3 = "M 640 100 L 680 140 L 680 220";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[420px] sm:max-w-[560px] md:max-w-[680px] lg:max-w-[760px] xl:max-w-[820px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Very subtle cyan atmospheric glow behind network field ── */}
      <div
        className="absolute top-[8%] right-[8%] w-[480px] md:w-[620px] h-[220px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 52%, transparent 72%)",
          filter: "blur(54px)",
        }}
      />

      {/* ── Vector Technical Network System (920 x 280) ── */}
      <svg
        viewBox="0 0 920 280"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Subtle cyan glow for focal nodes and pulses */}
          <filter id="cap-glow-cyan" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Linear gradients for lines fading softly into background */}
          <linearGradient id="fade-left-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.28" />
          </linearGradient>
          <linearGradient id="fade-right-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Subsystem 1: Very subtle dot matrix & coordinate guidelines (almost invisible) ── */}
        <g opacity="0.35">
          {/* Horizontal coordinate guidelines */}
          <line
            x1="30"
            y1="40"
            x2="890"
            y2="40"
            stroke="rgba(6, 182, 212, 0.07)"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />
          <line
            x1="30"
            y1="100"
            x2="890"
            y2="100"
            stroke="rgba(6, 182, 212, 0.05)"
            strokeWidth="0.75"
            strokeDasharray="2 10"
          />
          <line
            x1="30"
            y1="160"
            x2="890"
            y2="160"
            stroke="rgba(6, 182, 212, 0.06)"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />
          <line
            x1="30"
            y1="220"
            x2="890"
            y2="220"
            stroke="rgba(6, 182, 212, 0.06)"
            strokeWidth="0.75"
            strokeDasharray="2 9"
          />

          {/* Vertical axis alignment traces */}
          <line
            x1="250"
            y1="20"
            x2="250"
            y2="245"
            stroke="rgba(6, 182, 212, 0.07)"
            strokeWidth="0.7"
            strokeDasharray="1 9"
          />
          <line
            x1="420"
            y1="20"
            x2="420"
            y2="245"
            stroke="rgba(6, 182, 212, 0.07)"
            strokeWidth="0.7"
            strokeDasharray="1 9"
          />
          <line
            x1="640"
            y1="20"
            x2="640"
            y2="245"
            stroke="rgba(6, 182, 212, 0.07)"
            strokeWidth="0.7"
            strokeDasharray="1 9"
          />

          {/* Registration "+" markers */}
          {[
            { x: 130, y: 40 },
            { x: 580, y: 40 },
            { x: 340, y: 220 },
            { x: 770, y: 220 },
          ].map((mark, i) => (
            <g key={`mark-${i}`} opacity="0.45">
              <line
                x1={mark.x - 3}
                y1={mark.y}
                x2={mark.x + 3}
                y2={mark.y}
                stroke="#06b6d4"
                strokeWidth="0.7"
              />
              <line
                x1={mark.x}
                y1={mark.y - 3}
                x2={mark.x}
                y2={mark.y + 3}
                stroke="#06b6d4"
                strokeWidth="0.7"
              />
            </g>
          ))}

          {/* Subtle grid dots across matrix */}
          {[
            { cx: 70, cy: 40 },
            { cx: 190, cy: 40 },
            { cx: 370, cy: 40 },
            { cx: 430, cy: 40 },
            { cx: 640, cy: 40 },
            { cx: 750, cy: 40 },
            { cx: 850, cy: 40 },
            { cx: 70, cy: 100 },
            { cx: 150, cy: 100 },
            { cx: 330, cy: 100 },
            { cx: 480, cy: 100 },
            { cx: 590, cy: 100 },
            { cx: 780, cy: 100 },
            { cx: 880, cy: 100 },
            { cx: 70, cy: 160 },
            { cx: 310, cy: 160 },
            { cx: 360, cy: 160 },
            { cx: 550, cy: 160 },
            { cx: 700, cy: 160 },
            { cx: 800, cy: 160 },
            { cx: 880, cy: 160 },
            { cx: 100, cy: 220 },
            { cx: 190, cy: 220 },
            { cx: 460, cy: 220 },
            { cx: 600, cy: 220 },
            { cx: 740, cy: 220 },
            { cx: 860, cy: 220 },
          ].map((dot, i) => (
            <circle
              key={`dot-${i}`}
              cx={dot.cx}
              cy={dot.cy}
              r="0.85"
              fill="rgba(6, 182, 212, 0.28)"
            />
          ))}
        </g>

        {/* ── Subsystem 2: Technical Network Lines & Geometric Traces ── */}
        <g className="cap-ambient-drift">
          {/* Fading entrance tail line from left */}
          <line
            x1="10"
            y1="160"
            x2="45"
            y2="160"
            stroke="url(#fade-left-cyan)"
            strokeWidth="0.95"
          />

          {/* Fading exit tails dissolving into dark background on right */}
          <line
            x1="885"
            y1="100"
            x2="915"
            y2="100"
            stroke="url(#fade-right-cyan)"
            strokeWidth="0.95"
          />
          <line
            x1="880"
            y1="40"
            x2="912"
            y2="40"
            stroke="url(#fade-right-cyan)"
            strokeWidth="0.85"
          />
          <line
            x1="885"
            y1="220"
            x2="915"
            y2="220"
            stroke="url(#fade-right-cyan)"
            strokeWidth="0.85"
          />

          {/* Static Primary Lines (Low opacity cyan) */}
          <path
            d={PATH_SPINE}
            stroke="#06b6d4"
            strokeWidth="1.2"
            strokeOpacity="0.25"
          />

          {/* Static Secondary Branch Lines (Very low opacity) */}
          <path
            d={PATH_UPPER}
            stroke="#06b6d4"
            strokeWidth="0.95"
            strokeOpacity="0.18"
          />
          <path
            d={PATH_LOWER}
            stroke="#06b6d4"
            strokeWidth="0.95"
            strokeOpacity="0.18"
          />

          {/* Geometric Crosslink Traces */}
          <path
            d={PATH_MID_CROSS_1}
            stroke="#06b6d4"
            strokeWidth="0.85"
            strokeOpacity="0.16"
            strokeDasharray="3 3"
          />
          <path
            d={PATH_MID_CROSS_2}
            stroke="#06b6d4"
            strokeWidth="0.85"
            strokeOpacity="0.16"
          />
          <path
            d={PATH_MID_CROSS_3}
            stroke="#06b6d4"
            strokeWidth="0.85"
            strokeOpacity="0.16"
            strokeDasharray="3 3"
          />

          {/* Diagonal Telemetry Connector Lines */}
          <line
            x1="420"
            y1="100"
            x2="460"
            y2="60"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="460"
            y1="60"
            x2="510"
            y2="60"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="720"
            y1="100"
            x2="760"
            y2="140"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="760"
            y1="140"
            x2="810"
            y2="140"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.15"
          />
          <line
            x1="480"
            y1="160"
            x2="520"
            y2="220"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.14"
          />

          {/* Traveling Light Pulses along lines (Anime.js animated dashoffset) */}
          <path
            d={PATH_SPINE}
            stroke="#38bdf8"
            strokeWidth="1.6"
            strokeOpacity="0.6"
            strokeDasharray="45 280"
            className="cap-pulse-line"
          />
          <path
            d={PATH_UPPER}
            stroke="#22d3ee"
            strokeWidth="1.3"
            strokeOpacity="0.5"
            strokeDasharray="32 220"
            className="cap-pulse-line"
          />
          <path
            d={PATH_LOWER}
            stroke="#38bdf8"
            strokeWidth="1.3"
            strokeOpacity="0.5"
            strokeDasharray="35 240"
            className="cap-pulse-line"
          />

          {/* ── Subsystem 3: Connected Nodes (20+ nodes across right field) ── */}
          {[
            { cx: 45,  cy: 160, r: 2.0 },
            { cx: 120, cy: 160, r: 2.0 },
            { cx: 190, cy: 160, r: 2.2 },
            { cx: 250, cy: 100, r: 2.2 },
            { cx: 310, cy: 40,  r: 2.0 },
            { cx: 360, cy: 100, r: 1.8 },
            { cx: 490, cy: 40,  r: 2.1 },
            { cx: 550, cy: 100, r: 2.0 },
            { cx: 640, cy: 100, r: 2.2 },
            { cx: 700, cy: 40,  r: 2.0 },
            { cx: 810, cy: 40,  r: 2.0 },
            { cx: 720, cy: 100, r: 2.1 },
            { cx: 830, cy: 100, r: 2.0 },
            { cx: 240, cy: 220, r: 2.0 },
            { cx: 370, cy: 220, r: 2.1 },
            { cx: 430, cy: 160, r: 2.0 },
            { cx: 480, cy: 160, r: 2.2 },
            { cx: 520, cy: 220, r: 2.0 },
            { cx: 590, cy: 160, r: 1.9 },
            { cx: 680, cy: 220, r: 2.1 },
            { cx: 740, cy: 160, r: 2.0 },
            { cx: 810, cy: 220, r: 2.0 },
            { cx: 460, cy: 60,  r: 1.8 },
            { cx: 510, cy: 60,  r: 1.8 },
            { cx: 760, cy: 140, r: 1.9 },
            { cx: 810, cy: 140, r: 1.8 },
          ].map((node, i) => (
            <g key={`cnode-${i}`}>
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r}
                fill="#06b6d4"
                opacity="0.75"
                className={i % 3 === 0 ? "cap-node-pulse" : undefined}
              />
              <circle
                cx={node.cx}
                cy={node.cy}
                r={node.r + 2.0}
                stroke="#06b6d4"
                strokeWidth="0.6"
                strokeOpacity="0.25"
                fill="none"
              />
            </g>
          ))}

          {/* ── Subsystem 4: One or Two Slightly Brighter Focal Nodes ── */}
          {/* Focal Node 1: Alpha Core at (420, 100) — Center-Left Hub */}
          <g transform="translate(420, 100)">
            {/* Outer Breathing Glow Ring (Anime.js animated) */}
            <circle
              r="7.5"
              stroke="#06b6d4"
              strokeWidth="0.9"
              fill="none"
              className="cap-focal-ring"
            />
            {/* Concentric subtle guide */}
            <circle
              r="4.8"
              stroke="#22d3ee"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="none"
            />
            {/* Brighter Focal Node Core */}
            <circle
              r="3.0"
              fill="#22d3ee"
              filter="url(#cap-glow-cyan)"
            />
            <circle
              r="1.2"
              fill="#ffffff"
            />
          </g>

          {/* Focal Node 2: Beta Core at (640, 160) — Center-Right Hub */}
          <g transform="translate(640, 160)">
            {/* Outer Breathing Glow Ring (Anime.js animated) */}
            <circle
              r="7.0"
              stroke="#06b6d4"
              strokeWidth="0.9"
              fill="none"
              className="cap-focal-ring"
            />
            {/* Concentric subtle guide */}
            <circle
              r="4.5"
              stroke="#22d3ee"
              strokeWidth="0.6"
              strokeOpacity="0.35"
              fill="none"
            />
            {/* Brighter Focal Node Core */}
            <circle
              r="2.8"
              fill="#22d3ee"
              filter="url(#cap-glow-cyan)"
            />
            <circle
              r="1.1"
              fill="#ffffff"
            />
          </g>

          {/* ── Subsystem 5: Ambient Moving Signal Particles ── */}
          {/* Signal Particle on Spine */}
          <circle r="1.6" fill="#e0f2fe" filter="url(#cap-glow-cyan)" opacity="0.95">
            <animateMotion
              path={PATH_SPINE}
              dur="13s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>

          {/* Signal Particle on Upper Branch */}
          <circle r="1.4" fill="#38bdf8" opacity="0.85">
            <animateMotion
              path={PATH_UPPER}
              dur="10s"
              repeatCount="indefinite"
              begin="2.5s"
            />
          </circle>

          {/* Signal Particle on Lower Branch */}
          <circle r="1.4" fill="#22d3ee" opacity="0.8">
            <animateMotion
              path={PATH_LOWER}
              dur="12s"
              repeatCount="indefinite"
              begin="5s"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
