"use client";

import React, { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

interface CertificateLightFieldProps {
  primaryColor: string;
  glowColor: string;
}

/**
 * CertificateLightField — Abstract digital document & verification light system.
 * Positioned in the upper-right header area of the Certifications & Achievements section.
 *
 * Visual Concept:
 * - Represents recognition, verification, achievement, and documentation without literal icons.
 * - 3–5 thin overlapping rectangular outline frames in an asymmetric editorial composition.
 * - Fine horizontal light lines, vertical alignment marks, and subtle corner brackets.
 * - One prominent glowing verification signal point (─────────────── ●).
 * - One elegant diagonal light beam traversing across the layered frames.
 * - Sized large (360–480px width, 220–270px height) to balance the heading.
 * - Dynamically adapts to the active certificate accent color (#EC4899, #EF4444, #8B5CF6, #F97316, #06B6D4).
 */
export default function CertificateLightField({
  primaryColor,
  glowColor,
}: CertificateLightFieldProps) {
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
      // 1. Slow, elegant diagonal light beam traveling across the layered frames
      const beamPulse = container.querySelector(".clf-beam-pulse");
      if (beamPulse) {
        const a1 = animate(beamPulse, {
          strokeDashoffset: [380, 0],
          duration: 13000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a1);
      }

      // 2. Slow, gentle breathing on the primary verification signal point
      const focalRing = container.querySelectorAll(".clf-focal-ring");
      if (focalRing.length > 0) {
        const a2 = animate(focalRing, {
          scale: [1, 1.45, 1],
          opacity: [0.22, 0.65, 0.22],
          duration: 4400,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a2);
      }

      // 3. Subtle floating micro-drift on the offset document frame
      if (!isMobile) {
        const floatingFrame = container.querySelector(".clf-floating-frame");
        if (floatingFrame) {
          const a3 = animate(floatingFrame, {
            translateY: [-1.6, 1.6],
            duration: 8200,
            alternate: true,
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a3);
        }

        // 4. Subtle opacity breathing across horizontal strata lines
        const strataLines = container.querySelectorAll(".clf-strata-line");
        if (strataLines.length > 0) {
          const a4 = animate(strataLines, {
            opacity: [0.15, 0.38, 0.15],
            duration: 6800,
            delay: stagger(450),
            repeat: -1,
            ease: "inOutSine",
          });
          anims.push(a4);
        }

        // 5. Light pulse along the verification carrier line
        const carrierLine = container.querySelector(".clf-carrier-pulse");
        if (carrierLine) {
          const a5 = animate(carrierLine, {
            strokeDashoffset: [260, 0],
            duration: 11000,
            delay: 1500,
            repeat: -1,
            ease: "linear",
          });
          anims.push(a5);
        }
      }
    } catch (err) {
      console.warn("CertificateLightField animation error:", err);
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
      className="relative w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] lg:max-w-[520px] xl:max-w-[560px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Soft Localized Atmospheric Glow in Active Theme Color ── */}
      <div
        className="absolute top-[10%] right-[10%] w-[380px] md:w-[480px] h-[220px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${primaryColor}15 0%, ${glowColor} 48%, transparent 72%)`,
          filter: "blur(54px)",
        }}
      />

      {/* ── Vector Certificate Light Field (600 x 260) ── */}
      <svg
        viewBox="0 0 600 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <filter id="clf-glow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Fading horizontal datum gradients */}
          <linearGradient id="clf-fade-left" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="clf-fade-right" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.32" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Diagonal beam gradient */}
          <linearGradient id="clf-beam-grad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.05" />
            <stop offset="50%" stopColor={primaryColor} stopOpacity="0.85" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.1" />
          </linearGradient>

          {/* Subtle translucent fill for inner verification sheet */}
          <linearGradient id="clf-sheet-tint" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.04" />
            <stop offset="60%" stopColor={primaryColor} stopOpacity="0.015" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Subsystem 1: Ambient Horizontal Guidelines & Datum Traces ── */}
        <g opacity="0.4">
          {/* Top datum axis */}
          <line
            x1="30"
            y1="60"
            x2="570"
            y2="60"
            stroke={primaryColor}
            strokeWidth="0.75"
            strokeOpacity="0.16"
            strokeDasharray="2 8"
          />
          {/* Bottom datum axis */}
          <line
            x1="30"
            y1="210"
            x2="570"
            y2="210"
            stroke={primaryColor}
            strokeWidth="0.75"
            strokeOpacity="0.16"
            strokeDasharray="2 8"
          />
          {/* Subtle vertical registration guides */}
          <line
            x1="120"
            y1="20"
            x2="120"
            y2="245"
            stroke={primaryColor}
            strokeWidth="0.7"
            strokeOpacity="0.14"
            strokeDasharray="1 8"
          />
          <line
            x1="490"
            y1="20"
            x2="490"
            y2="245"
            stroke={primaryColor}
            strokeWidth="0.7"
            strokeOpacity="0.14"
            strokeDasharray="1 8"
          />

          {/* Corner registration "+" markers */}
          {[
            { x: 50,  y: 30 },
            { x: 560, y: 30 },
            { x: 50,  y: 235 },
            { x: 560, y: 235 },
          ].map((pt, i) => (
            <g key={`mark-${i}`} opacity="0.38">
              <line
                x1={pt.x - 3}
                y1={pt.y}
                x2={pt.x + 3}
                y2={pt.y}
                stroke={primaryColor}
                strokeWidth="0.7"
              />
              <line
                x1={pt.x}
                y1={pt.y - 3}
                x2={pt.x}
                y2={pt.y + 3}
                stroke={primaryColor}
                strokeWidth="0.7"
              />
            </g>
          ))}
        </g>

        {/* ── Subsystem 2: Overlapping Asymmetric Rectangular Outline Frames ── */}
        {/* Frame 3 (Background Offset Layer: Shifted Right & Up) */}
        <rect
          x="190"
          y="20"
          width="350"
          height="185"
          rx="2"
          stroke={primaryColor}
          strokeWidth="0.85"
          strokeOpacity="0.18"
          strokeDasharray="4 6"
        />

        {/* Frame 1 (Primary Base Document Frame: Centered Editorial Proportion) */}
        <rect
          x="120"
          y="42"
          width="370"
          height="190"
          rx="2"
          stroke={primaryColor}
          strokeWidth="1.0"
          strokeOpacity="0.32"
        />

        {/* Frame 1 Corner Architectural Brackets (┌ ┐ └ ┘) */}
        <path
          d="M 120 54 L 120 42 L 132 42"
          stroke={primaryColor}
          strokeWidth="1.4"
          strokeOpacity="0.7"
        />
        <path
          d="M 478 42 L 490 42 L 490 54"
          stroke={primaryColor}
          strokeWidth="1.4"
          strokeOpacity="0.7"
        />
        <path
          d="M 120 220 L 120 232 L 132 232"
          stroke={primaryColor}
          strokeWidth="1.4"
          strokeOpacity="0.7"
        />
        <path
          d="M 478 232 L 490 232 L 490 220"
          stroke={primaryColor}
          strokeWidth="1.4"
          strokeOpacity="0.7"
        />

        {/* Frame 2 (Floating Elevated Sheet: Shifted Left & Down with Micro-drift) */}
        <g className="clf-floating-frame">
          {/* Subtle translucent fill to evoke digital paper/membrane depth */}
          <rect
            x="75"
            y="75"
            width="340"
            height="165"
            rx="2"
            fill="url(#clf-sheet-tint)"
            stroke={primaryColor}
            strokeWidth="0.95"
            strokeOpacity="0.25"
            strokeDasharray="14 4 70 4 150 4"
          />

          {/* Floating Frame Registration Notch Marks */}
          <line
            x1="75"
            y1="110"
            x2="85"
            y2="110"
            stroke={primaryColor}
            strokeWidth="1.0"
            strokeOpacity="0.6"
          />
          <line
            x1="405"
            y1="200"
            x2="415"
            y2="200"
            stroke={primaryColor}
            strokeWidth="1.0"
            strokeOpacity="0.6"
          />
        </g>

        {/* Frame 4 (Inner Precision Viewport / Validation Pane) */}
        <rect
          x="165"
          y="85"
          width="280"
          height="105"
          rx="1"
          stroke={primaryColor}
          strokeWidth="0.8"
          strokeOpacity="0.18"
        />

        {/* ── Subsystem 3: Fine Horizontal Strata & Alignment Lines ── */}
        <g>
          {/* Strata Line 1 */}
          <line
            x1="95"
            y1="110"
            x2="435"
            y2="110"
            stroke={primaryColor}
            strokeWidth="0.85"
            strokeOpacity="0.24"
            className="clf-strata-line"
          />
          {/* Strata Line 2 */}
          <line
            x1="180"
            y1="165"
            x2="520"
            y2="165"
            stroke={primaryColor}
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="3 3"
            className="clf-strata-line"
          />
          {/* Strata Line 3 */}
          <line
            x1="140"
            y1="190"
            x2="410"
            y2="190"
            stroke={primaryColor}
            strokeWidth="0.75"
            strokeOpacity="0.18"
            className="clf-strata-line"
          />

          {/* Fine Vertical Sub-alignment Marks across Strata */}
          {[165, 250, 340, 445].map((x, i) => (
            <line
              key={`tick-${i}`}
              x1={x}
              y1="106"
              x2={x}
              y2="114"
              stroke={primaryColor}
              strokeWidth="0.75"
              strokeOpacity="0.4"
            />
          ))}
        </g>

        {/* ── Subsystem 4: One Elegant Diagonal Light Beam ── */}
        {/* Base diagonal trajectory guide (35° angle traversing across frames) */}
        <line
          x1="135"
          y1="225"
          x2="480"
          y2="35"
          stroke={primaryColor}
          strokeWidth="0.85"
          strokeOpacity="0.2"
          strokeDasharray="4 5"
        />

        {/* Traveling Light Beam Pulse along Diagonal */}
        <line
          x1="135"
          y1="225"
          x2="480"
          y2="35"
          stroke={primaryColor}
          strokeWidth="1.6"
          strokeOpacity="0.85"
          strokeDasharray="45 280"
          filter="url(#clf-glow)"
          className="clf-beam-pulse"
        />

        {/* Intersecting perpendicular diagonal accent (subtle cross-beam) */}
        <line
          x1="220"
          y1="60"
          x2="310"
          y2="140"
          stroke={primaryColor}
          strokeWidth="0.75"
          strokeOpacity="0.15"
        />

        {/* ── Subsystem 5: The Primary Verification Signal Point (─────────────── ●) ── */}
        <g>
          {/* Carrier signal line leading to verification point */}
          <line
            x1="210"
            y1="138"
            x2="445"
            y2="138"
            stroke={primaryColor}
            strokeWidth="1.2"
            strokeOpacity="0.45"
          />

          {/* Traveling light pulse along carrier line */}
          <line
            x1="210"
            y1="138"
            x2="445"
            y2="138"
            stroke={primaryColor}
            strokeWidth="1.8"
            strokeOpacity="0.85"
            strokeDasharray="30 200"
            filter="url(#clf-glow)"
            className="clf-carrier-pulse"
          />

          {/* The Glowing Verification Point (at 445, 138) */}
          <g transform="translate(445, 138)">
            {/* Outer Breathing Aura Ring (Anime.js animated) */}
            <circle
              r="7.5"
              stroke={primaryColor}
              strokeWidth="0.9"
              fill="none"
              className="clf-focal-ring"
            />
            {/* Concentric Guide Ring */}
            <circle
              r="4.5"
              stroke={primaryColor}
              strokeWidth="0.6"
              strokeOpacity="0.45"
              fill="none"
            />
            {/* Luminous Verification Core Node */}
            <circle
              r="2.8"
              fill={primaryColor}
              filter="url(#clf-glow)"
              className="transition-colors duration-500"
            />
            {/* Photon Center */}
            <circle
              r="1.1"
              fill="#ffffff"
            />
          </g>
        </g>

        {/* ── Subsystem 6: Secondary Subtle Verification Nodes ── */}
        {/* Node A at Frame 4 Corner (165, 85) */}
        <circle
          cx="165"
          cy="85"
          r="1.8"
          fill={primaryColor}
          opacity="0.7"
        />
        {/* Node B at Strata Intersection (340, 110) */}
        <circle
          cx="340"
          cy="110"
          r="1.6"
          fill={primaryColor}
          opacity="0.6"
        />
        {/* Node C at Frame 1 Lower Intersection (380, 232) */}
        <circle
          cx="380"
          cy="232"
          r="1.8"
          fill={primaryColor}
          opacity="0.65"
        />
      </svg>
    </div>
  );
}
