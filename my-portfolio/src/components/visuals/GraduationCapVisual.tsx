"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

/**
 * GraduationCapVisual — Minimal abstract graduation cap / academic achievement line-art.
 * Positioned in the upper-right header area above the 2024 → 2028 timeline card.
 *
 * Design:
 * - Large minimal graduation cap wireframe with subtle 3D/depth isometric illusion
 * - Thin geometric outline & inner contour diamond
 * - Cylindrical under-crown band with wireframe volume
 * - Center apex button with breathing aura and gently swaying tassel
 * - Fine technical construction lines and fading datum axes
 * - Accent: Cyan (#06B6D4) with electric blue (#3B82F6) depth traces
 * - Smooth, calm Anime.js ambient floating & edge highlight sweep
 */
export default function GraduationCapVisual() {
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
      // 1. Gentle ambient floating drift of the graduation cap
      const floatingCap = container.querySelector(".gc-floating-group");
      if (floatingCap) {
        const a1 = animate(floatingCap, {
          translateY: [-2, 2],
          duration: 7400,
          alternate: true,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a1);
      }

      // 2. Slow traveling highlight beam along the front rim of the mortarboard
      const rimHighlight = container.querySelector(".gc-rim-pulse");
      if (rimHighlight) {
        const a2 = animate(rimHighlight, {
          strokeDashoffset: [360, 0],
          duration: 12000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a2);
      }

      // 3. Subtle organic micro-sway of the tassel
      const tasselGroup = container.querySelector(".gc-tassel-group");
      if (tasselGroup && !isMobile) {
        const a3 = animate(tasselGroup, {
          rotate: [-1.8, 1.8],
          duration: 4800,
          alternate: true,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a3);
      }

      // 4. Ambient breathing on the central apex button
      const centerAura = container.querySelector(".gc-center-aura");
      if (centerAura) {
        const a4 = animate(centerAura, {
          scale: [1, 1.45, 1],
          opacity: [0.25, 0.7, 0.25],
          duration: 4400,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a4);
      }
    } catch (err) {
      console.warn("GraduationCapVisual animation error:", err);
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

  // Primary front rim trajectory for traveling light beam:
  // (Left vertex 110, 95) -> (Front vertex 270, 145) -> (Right vertex 430, 95)
  const PATH_FRONT_RIM = "M 110 95 L 270 145 L 430 95";

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Soft Localized Cyan Atmospheric Glow ── */}
      <div
        className="absolute top-[8%] left-[15%] w-[360px] md:w-[460px] h-[200px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(6, 182, 212, 0.09) 0%, rgba(59, 130, 246, 0.02) 50%, transparent 72%)",
          filter: "blur(50px)",
        }}
      />

      {/* ── Vector Graduation Cap Wireframe (540 x 220) ── */}
      <svg
        viewBox="0 0 540 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <filter id="gc-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Fading horizontal construction lines */}
          <linearGradient id="gc-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="gc-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>

          {/* Translucent cap plane fill */}
          <linearGradient id="gc-plane-fill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.04" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.02" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Subsystem 1: Ambient Technical Construction Lines & Datum Axes ── */}
        <g opacity="0.4">
          {/* Horizontal datum lines extending outwards */}
          <line
            x1="20"
            y1="95"
            x2="110"
            y2="95"
            stroke="url(#gc-fade-left)"
            strokeWidth="0.85"
          />
          <line
            x1="430"
            y1="95"
            x2="520"
            y2="95"
            stroke="url(#gc-fade-right)"
            strokeWidth="0.85"
          />

          {/* Top & bottom subtle construction guidelines */}
          <line
            x1="60"
            y1="45"
            x2="480"
            y2="45"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />
          <line
            x1="60"
            y1="195"
            x2="480"
            y2="195"
            stroke="rgba(6, 182, 212, 0.12)"
            strokeWidth="0.75"
            strokeDasharray="2 8"
          />

          {/* Vertical symmetry axis */}
          <line
            x1="270"
            y1="15"
            x2="270"
            y2="45"
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeOpacity="0.25"
            strokeDasharray="2 4"
          />
          <line
            x1="270"
            y1="195"
            x2="270"
            y2="215"
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeOpacity="0.25"
            strokeDasharray="2 4"
          />

          {/* Micro registration crosses (+) */}
          {[
            { x: 45,  y: 35 },
            { x: 495, y: 35 },
            { x: 45,  y: 185 },
            { x: 495, y: 185 },
          ].map((pt, i) => (
            <g key={`pt-${i}`} opacity="0.4">
              <line
                x1={pt.x - 3}
                y1={pt.y}
                x2={pt.x + 3}
                y2={pt.y}
                stroke="#06b6d4"
                strokeWidth="0.7"
              />
              <line
                x1={pt.x}
                y1={pt.y - 3}
                x2={pt.x}
                y2={pt.y + 3}
                stroke="#06b6d4"
                strokeWidth="0.7"
              />
            </g>
          ))}
        </g>

        {/* ── Subsystem 2: The Graduation Cap Wireframe (Floating Group) ── */}
        <g className="gc-floating-group">
          {/* 1. Cylindrical Under-Crown Band (3D depth / head fitting) */}
          {/* Under-crown back arc */}
          <path
            d="M 195 125 C 195 110, 345 110, 345 125"
            stroke="#3b82f6"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="3 3"
          />

          {/* Under-crown sides */}
          <line
            x1="205"
            y1="130"
            x2="205"
            y2="162"
            stroke="#06b6d4"
            strokeWidth="1.0"
            strokeOpacity="0.38"
          />
          <line
            x1="335"
            y1="130"
            x2="335"
            y2="162"
            stroke="#06b6d4"
            strokeWidth="1.0"
            strokeOpacity="0.38"
          />

          {/* Under-crown front contour curve */}
          <path
            d="M 205 162 C 205 184, 335 184, 335 162"
            stroke="#06b6d4"
            strokeWidth="1.2"
            strokeOpacity="0.55"
          />

          {/* Under-crown wireframe vertical volume ribs */}
          <line
            x1="245"
            y1="138"
            x2="245"
            y2="173"
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeOpacity="0.2"
          />
          <line
            x1="270"
            y1="145"
            x2="270"
            y2="176"
            stroke="#06b6d4"
            strokeWidth="0.8"
            strokeOpacity="0.25"
          />
          <line
            x1="295"
            y1="138"
            x2="295"
            y2="173"
            stroke="#06b6d4"
            strokeWidth="0.75"
            strokeOpacity="0.2"
          />

          {/* 2. Mortarboard Plinth (Isometric Diamond Plane) */}
          {/* Outer Diamond Outline */}
          <polygon
            points="270,45 430,95 270,145 110,95"
            fill="url(#gc-plane-fill)"
            stroke="#06b6d4"
            strokeWidth="1.3"
            strokeOpacity="0.65"
          />

          {/* Inner Geometric Inset Diamond */}
          <polygon
            points="270,57 415,95 270,133 125,95"
            stroke="#3b82f6"
            strokeWidth="0.85"
            strokeOpacity="0.28"
            strokeDasharray="4 4"
          />

          {/* Diagonal internal construction creases */}
          <line
            x1="270"
            y1="57"
            x2="270"
            y2="133"
            stroke="#06b6d4"
            strokeWidth="0.7"
            strokeOpacity="0.2"
            strokeDasharray="2 3"
          />
          <line
            x1="125"
            y1="95"
            x2="415"
            y2="95"
            stroke="#06b6d4"
            strokeWidth="0.7"
            strokeOpacity="0.2"
            strokeDasharray="2 3"
          />

          {/* Traveling Highlight Pulse along the front rim */}
          <path
            d={PATH_FRONT_RIM}
            stroke="#22d3ee"
            strokeWidth="1.8"
            strokeOpacity="0.9"
            strokeDasharray="45 280"
            filter="url(#gc-glow)"
            className="gc-rim-pulse"
          />

          {/* Diamond Vertices Accent Points */}
          {[
            { x: 270, y: 45 },
            { x: 430, y: 95 },
            { x: 270, y: 145 },
            { x: 110, y: 95 },
          ].map((v, i) => (
            <circle
              key={`v-${i}`}
              cx={v.x}
              cy={v.y}
              r="1.8"
              fill="#06b6d4"
              opacity="0.8"
            />
          ))}

          {/* 3. Center Apex Button (At 270, 95) */}
          <g transform="translate(270, 95)">
            {/* Outer Breathing Aura */}
            <circle
              r="6.5"
              stroke="#06b6d4"
              strokeWidth="0.85"
              fill="none"
              className="gc-center-aura"
            />
            {/* Inner Ring */}
            <circle
              r="4.2"
              stroke="#3b82f6"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="none"
            />
            {/* Center Core */}
            <circle
              r="2.6"
              fill="#22d3ee"
              filter="url(#gc-glow)"
            />
            <circle
              r="1.0"
              fill="#ffffff"
            />
          </g>

          {/* 4. Elegant Flowing Tassel (Attached from center button to left side) */}
          <g
            className="gc-tassel-group"
            style={{ transformOrigin: "140px 105px" }}
          >
            {/* Tassel cord curving over the cap rim */}
            <path
              d="M 270 95 C 220 92, 168 98, 140 108"
              stroke="#06b6d4"
              strokeWidth="1.1"
              strokeOpacity="0.65"
            />

            {/* Tassel cord dropping down from rim */}
            <path
              d="M 140 108 C 135 125, 137 148, 135 170"
              stroke="#06b6d4"
              strokeWidth="1.15"
              strokeOpacity="0.75"
            />

            {/* Tassel knot / band */}
            <circle
              cx="135"
              cy="171"
              r="3.0"
              fill="#06b6d4"
              opacity="0.85"
            />
            <circle
              cx="135"
              cy="171"
              r="4.8"
              stroke="#06b6d4"
              strokeWidth="0.6"
              strokeOpacity="0.4"
              fill="none"
            />

            {/* Tassel fringe threads (flowing downward) */}
            <line
              x1="135"
              y1="174"
              x2="128"
              y2="194"
              stroke="#06b6d4"
              strokeWidth="0.9"
              strokeOpacity="0.7"
            />
            <line
              x1="135"
              y1="174"
              x2="133"
              y2="196"
              stroke="#22d3ee"
              strokeWidth="0.9"
              strokeOpacity="0.85"
            />
            <line
              x1="135"
              y1="174"
              x2="137"
              y2="196"
              stroke="#22d3ee"
              strokeWidth="0.9"
              strokeOpacity="0.85"
            />
            <line
              x1="135"
              y1="174"
              x2="142"
              y2="193"
              stroke="#06b6d4"
              strokeWidth="0.9"
              strokeOpacity="0.7"
            />

            {/* Tiny luminous terminal photon on central fringe */}
            <circle
              cx="135"
              cy="196"
              r="1.2"
              fill="#ffffff"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
