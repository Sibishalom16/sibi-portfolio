"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

/**
 * SignalNetwork — Minimal generative RGB technical signal visualization.
 * Positioned in the empty space directly below the "DOWNLOAD RESUME" button.
 *
 * Consists of 4 thin flowing RGB signal paths, 7 small traveling particles,
 * 4 subtle interconnected nodes, and faint coordinate traces.
 */
export default function SignalNetwork() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    let anims: ReturnType<typeof animate>[] = [];
    const isMobile = window.innerWidth < 640;

    try {
      // 1. Gentle breathing pulse on the connection nodes
      const nodeRings = container.querySelectorAll(".signal-node-ring");
      if (nodeRings.length > 0) {
        const a1 = animate(nodeRings, {
          scale: [1, 1.35, 1],
          opacity: [0.28, 0.7, 0.28],
          duration: 4800,
          delay: stagger(750),
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a1);
      }

      // On mobile, simplify animations for performance & battery
      if (!isMobile) {
        // 2. Slow subtle ambient shift on the signal traces
        const shiftTraces = container.querySelectorAll(".signal-shift-trace");
        if (shiftTraces.length > 0) {
          const a2 = animate(shiftTraces, {
            strokeDashoffset: [240, 0],
            duration: 15000,
            delay: stagger(1800),
            repeat: -1,
            ease: "linear",
          });
          anims.push(a2);
        }

        // 3. Very subtle ambient breathing drift (1.2px vertical oscillation)
        const driftGroup = container.querySelector(".signal-group-drift");
        if (driftGroup) {
          const a3 = animate(driftGroup, {
            translateY: [-1.2, 1.2],
            duration: 7500,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a3);
        }
      }
    } catch (err) {
      console.warn("SignalNetwork animation error:", err);
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

  // Defined SVG path coordinates
  const PATH_VIOLET = "M 18 36 C 85 36, 115 84, 185 84 C 255 84, 285 42, 365 42 L 435 42";
  const PATH_CYAN   = "M 15 80 C 80 80, 120 38, 200 38 C 270 38, 315 110, 395 110 L 442 110";
  const PATH_BLUE   = "M 30 118 C 95 118, 140 82, 230 82 C 300 82, 345 58, 420 58";
  const PATH_AMBER  = "M 185 84 C 220 84, 245 38, 290 38";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[300px] sm:max-w-[350px] md:max-w-[390px] select-none pointer-events-none mt-7 sm:mt-9 overflow-visible"
    >
      {/* SVG Signal Visualization System */}
      <svg
        viewBox="0 0 460 145"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          {/* Subtle RGB glow filter */}
          <filter id="sig-glow-violet" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
          <filter id="sig-glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ── Subsystem 1: Extremely faint coordinate / grid traces ── */}
        <g opacity="0.45">
          {/* Horizontal coordinate guidelines */}
          <line
            x1="18"
            y1="36"
            x2="445"
            y2="36"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.75"
            strokeDasharray="2 6"
          />
          <line
            x1="18"
            y1="84"
            x2="445"
            y2="84"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />
          <line
            x1="18"
            y1="110"
            x2="445"
            y2="110"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.75"
            strokeDasharray="2 6"
          />

          {/* Subtle vertical tick marks */}
          <line
            x1="185"
            y1="22"
            x2="185"
            y2="128"
            stroke="rgba(168,85,247,0.12)"
            strokeWidth="0.75"
            strokeDasharray="1 7"
          />
          <line
            x1="290"
            y1="22"
            x2="290"
            y2="128"
            stroke="rgba(6,182,212,0.12)"
            strokeWidth="0.75"
            strokeDasharray="1 7"
          />
          <line
            x1="395"
            y1="25"
            x2="395"
            y2="125"
            stroke="rgba(59,130,246,0.10)"
            strokeWidth="0.75"
            strokeDasharray="1 7"
          />
        </g>

        {/* ── Subsystem 2: Living Signal Network (Drift Group) ── */}
        <g className="signal-group-drift">
          {/* Base Guide Paths (Faint static paths) */}
          {/* 1. Violet Path */}
          <path
            d={PATH_VIOLET}
            stroke="#a855f7"
            strokeWidth="1.1"
            strokeOpacity="0.32"
          />
          {/* 2. Cyan Path */}
          <path
            d={PATH_CYAN}
            stroke="#06b6d4"
            strokeWidth="1.0"
            strokeOpacity="0.28"
          />
          {/* 3. Electric Blue Path */}
          <path
            d={PATH_BLUE}
            stroke="#3b82f6"
            strokeWidth="0.85"
            strokeOpacity="0.24"
          />
          {/* 4. Warm Orange/Amber Interlink */}
          <path
            d={PATH_AMBER}
            stroke="#ff9d08"
            strokeWidth="0.85"
            strokeOpacity="0.32"
            strokeDasharray="3 3"
          />

          {/* Traveling Light Pulse Segments (Anime.js animated dashoffset) */}
          <path
            d={PATH_VIOLET}
            stroke="#c084fc"
            strokeWidth="1.5"
            strokeOpacity="0.65"
            strokeDasharray="40 180"
            className="signal-shift-trace"
          />
          <path
            d={PATH_CYAN}
            stroke="#38bdf8"
            strokeWidth="1.4"
            strokeOpacity="0.6"
            strokeDasharray="35 170"
            className="signal-shift-trace"
          />

          {/* ── Subsystem 3: Interconnection Nodes (2–4 nodes) ── */}
          {/* Node 1: Main Intersection (Violet / Amber) at (185, 84) */}
          <g transform="translate(185, 84)">
            <circle
              r="4.5"
              stroke="#a855f7"
              strokeWidth="0.9"
              fill="none"
              className="signal-node-ring"
            />
            <circle r="1.8" fill="#c084fc" filter="url(#sig-glow-violet)" />
          </g>

          {/* Node 2: Cyan Crest at (200, 38) */}
          <g transform="translate(200, 38)">
            <circle
              r="3.8"
              stroke="#06b6d4"
              strokeWidth="0.85"
              fill="none"
              className="signal-node-ring"
            />
            <circle r="1.5" fill="#38bdf8" filter="url(#sig-glow-cyan)" />
          </g>

          {/* Node 3: Amber Bridge Terminus at (290, 38) */}
          <g transform="translate(290, 38)">
            <circle
              r="3.5"
              stroke="#ff9d08"
              strokeWidth="0.8"
              fill="none"
              className="signal-node-ring"
            />
            <circle r="1.5" fill="#ff9d08" />
          </g>

          {/* Node 4: Violet Terminal Node at (365, 42) */}
          <g transform="translate(365, 42)">
            <circle
              r="3.2"
              stroke="#818cf8"
              strokeWidth="0.75"
              fill="none"
              className="signal-node-ring"
            />
            <circle r="1.4" fill="#a855f7" />
          </g>

          {/* ── Subsystem 4: Small Traveling Particles (5–8 particles) ── */}
          {/* Particle 1: Violet path, violet particle */}
          <circle r="1.6" fill="#c084fc" filter="url(#sig-glow-violet)" opacity="0.9">
            <animateMotion
              path={PATH_VIOLET}
              dur="12s"
              repeatCount="indefinite"
              begin="0s"
            />
          </circle>

          {/* Particle 2: Violet path, white-violet secondary particle */}
          <circle r="1.1" fill="#f5d0fe" opacity="0.7">
            <animateMotion
              path={PATH_VIOLET}
              dur="12s"
              repeatCount="indefinite"
              begin="6s"
            />
          </circle>

          {/* Particle 3: Cyan path, cyan particle */}
          <circle r="1.7" fill="#06b6d4" filter="url(#sig-glow-cyan)" opacity="0.9">
            <animateMotion
              path={PATH_CYAN}
              dur="9.5s"
              repeatCount="indefinite"
              begin="1.2s"
            />
          </circle>

          {/* Particle 4: Cyan path, secondary sky blue particle */}
          <circle r="1.2" fill="#38bdf8" opacity="0.65">
            <animateMotion
              path={PATH_CYAN}
              dur="9.5s"
              repeatCount="indefinite"
              begin="5.8s"
            />
          </circle>

          {/* Particle 5: Electric blue lower path particle */}
          <circle r="1.3" fill="#60a5fa" opacity="0.75">
            <animateMotion
              path={PATH_BLUE}
              dur="14s"
              repeatCount="indefinite"
              begin="2.5s"
            />
          </circle>

          {/* Particle 6: Warm Amber diagonal bridge particle */}
          <circle r="1.4" fill="#ff9d08" opacity="0.85">
            <animateMotion
              path={PATH_AMBER}
              dur="6.5s"
              repeatCount="indefinite"
              begin="0.8s"
            />
          </circle>

          {/* Particle 7: Micro trailing pulse on violet path */}
          <circle r="0.9" fill="#e0e7ff" opacity="0.6">
            <animateMotion
              path={PATH_VIOLET}
              dur="12s"
              repeatCount="indefinite"
              begin="9s"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}
