"use client";

import React, { useEffect, useRef } from "react";
import { animate } from "animejs";

interface RecognitionSealVisualProps {
  primaryColor: string;
  glowColor: string;
}

/**
 * RecognitionSealVisual — Large abstract Digital Recognition Field & Achievement Beacon.
 * Positioned in the upper-right area between the heading and certificate showcase.
 *
 * Sized 2.5–3x larger:
 * - Large concentric geometric arcs & partial rings
 * - Multiple thin radial lines & isometric technical axes
 * - One central glowing beacon point with breathing aura
 * - Small orbiting photon points & subtle rotating scanning arc
 * - Layered translucent shapes & soft localized atmospheric glow
 * - Dynamically binds to active certificate color (#EC4899, #EF4444, #8B5CF6, #F97316, #06B6D4)
 */
export default function RecognitionSealVisual({
  primaryColor,
  glowColor,
}: RecognitionSealVisualProps) {
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
      // 1. Very slow continuous rotation of the major outer technical arc
      const outerArc = container.querySelector(".rs-major-orbit");
      if (outerArc) {
        const a1 = animate(outerArc, {
          rotate: 360,
          duration: 54000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a1);
      }

      // 2. Slow counter-rotation of the secondary cadence ring
      const cadenceRing = container.querySelector(".rs-cadence-ring");
      if (cadenceRing && !isMobile) {
        const a2 = animate(cadenceRing, {
          rotate: -360,
          duration: 42000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a2);
      }

      // 3. Ambient breathing on the central beacon core aura
      const centerAura = container.querySelector(".rs-beacon-aura");
      if (centerAura) {
        const a3 = animate(centerAura, {
          scale: [1, 1.45, 1],
          opacity: [0.25, 0.7, 0.25],
          duration: 4600,
          repeat: -1,
          ease: "inOutSine",
        });
        anims.push(a3);
      }

      // 4. Subtle scanning beam sweep
      const scanBeam = container.querySelector(".rs-scan-beam");
      if (scanBeam && !isMobile) {
        const a4 = animate(scanBeam, {
          rotate: [0, 360],
          duration: 26000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a4);
      }

      // 5. Light traveling along the primary radial milestone line
      const pulseRay = container.querySelector(".rs-pulse-ray");
      if (pulseRay && !isMobile) {
        const a5 = animate(pulseRay, {
          strokeDashoffset: [220, 0],
          duration: 12000,
          repeat: -1,
          ease: "linear",
        });
        anims.push(a5);
      }
    } catch (err) {
      console.warn("RecognitionSealVisual animation error:", err);
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

  // Center coordinate of the digital recognition beacon
  const CX = 390;
  const CY = 125;

  // Concentric circle radiuses (scaled 2.5–3x larger)
  const R_OUTER_MAJOR = 112; // Outer major arc (diameter 224px)
  const R_CADENCE     = 88;  // Secondary cadence ring
  const R_MIDDLE      = 66;  // Intermediate contour arc
  const R_INNER       = 44;  // Inner boundary ring
  const R_COLLAR      = 24;  // Beacon collar ring
  const R_CORE        = 12;  // Center beacon node

  // Orbit paths for micro photon points
  const PATH_ORBIT_1 = `M ${CX} ${CY - R_MIDDLE} A ${R_MIDDLE} ${R_MIDDLE} 0 1 1 ${CX} ${CY + R_MIDDLE} A ${R_MIDDLE} ${R_MIDDLE} 0 1 1 ${CX} ${CY - R_MIDDLE}`;
  const PATH_ORBIT_2 = `M ${CX} ${CY - R_CADENCE} A ${R_CADENCE} ${R_CADENCE} 0 1 0 ${CX} ${CY + R_CADENCE} A ${R_CADENCE} ${R_CADENCE} 0 1 0 ${CX} ${CY - R_CADENCE}`;

  // Radial ray lines extending outward from center
  const RADIAL_ANGLES = [0, 30, 60, 120, 150, 180, 210, 240, 300, 330];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[340px] sm:max-w-[440px] md:max-w-[520px] lg:max-w-[580px] xl:max-w-[620px] select-none pointer-events-none overflow-visible"
    >
      {/* ── Soft Localized Atmospheric Glow in Active Theme Color ── */}
      <div
        className="absolute top-[8%] right-[10%] w-[380px] md:w-[480px] h-[220px] rounded-full pointer-events-none transition-all duration-700"
        style={{
          background: `radial-gradient(ellipse at center, ${primaryColor}16 0%, ${glowColor} 48%, transparent 72%)`,
          filter: "blur(54px)",
        }}
      />

      {/* ── Vector Digital Recognition Field / Beacon (640 x 250) ── */}
      <svg
        viewBox="0 0 640 250"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <filter id="rs-glow-filter" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Fading horizontal datum gradients */}
          <linearGradient id="rs-fade-hleft" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.32" />
          </linearGradient>
          <linearGradient id="rs-fade-hright" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.32" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </linearGradient>

          {/* Scanning sector radial gradient */}
          <radialGradient id="rs-scan-grad-large" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.20" />
            <stop offset="70%" stopColor={primaryColor} stopOpacity="0.04" />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Subsystem 1: Horizontal Datum Lines & Radial Rays ── */}
        <g opacity="0.45">
          {/* Main horizontal datum axis through center */}
          <line
            x1="20"
            y1={CY}
            x2={CX - R_OUTER_MAJOR - 15}
            y2={CY}
            stroke="url(#rs-fade-hleft)"
            strokeWidth="0.9"
          />
          <line
            x1={CX + R_OUTER_MAJOR + 15}
            y1={CY}
            x2="620"
            y2={CY}
            stroke="url(#rs-fade-hright)"
            strokeWidth="0.9"
          />

          {/* Secondary subtle horizontal scan lines at y = 60 and y = 190 */}
          <line
            x1="80"
            y1={CY - 65}
            x2="580"
            y2={CY - 65}
            stroke={primaryColor}
            strokeWidth="0.7"
            strokeOpacity="0.15"
            strokeDasharray="2 8"
          />
          <line
            x1="80"
            y1={CY + 65}
            x2="580"
            y2={CY + 65}
            stroke={primaryColor}
            strokeWidth="0.7"
            strokeOpacity="0.15"
            strokeDasharray="2 8"
          />

          {/* Vertical axis guideline */}
          <line
            x1={CX}
            y1="10"
            x2={CX}
            y2={CY - R_OUTER_MAJOR - 10}
            stroke={primaryColor}
            strokeWidth="0.75"
            strokeOpacity="0.22"
            strokeDasharray="2 5"
          />
          <line
            x1={CX}
            y1={CY + R_OUTER_MAJOR + 10}
            x2={CX}
            y2="240"
            stroke={primaryColor}
            strokeWidth="0.75"
            strokeOpacity="0.22"
            strokeDasharray="2 5"
          />

          {/* Multiple Thin Radial Lines extending outward from concentric rings */}
          {RADIAL_ANGLES.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const rStart = R_INNER + 6;
            const rEnd = R_OUTER_MAJOR + 24;
            const x1 = CX + rStart * Math.cos(rad);
            const y1 = CY + rStart * Math.sin(rad);
            const x2 = CX + rEnd * Math.cos(rad);
            const y2 = CY + rEnd * Math.sin(rad);

            return (
              <line
                key={`ray-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={primaryColor}
                strokeWidth="0.7"
                strokeOpacity="0.18"
                strokeDasharray={i % 3 === 0 ? "3 3" : undefined}
              />
            );
          })}

          {/* Primary Milestone Radial Pulse Ray (towards upper-left) */}
          <line
            x1={CX}
            y1={CY}
            x2={CX - R_OUTER_MAJOR * 1.3}
            y2={CY - R_OUTER_MAJOR * 0.75}
            stroke={primaryColor}
            strokeWidth="1.2"
            strokeOpacity="0.6"
            strokeDasharray="30 180"
            className="rs-pulse-ray"
          />

          {/* Micro coordinate registration markers (+) */}
          {[
            { x: 70,  y: 35 },
            { x: 570, y: 35 },
            { x: 70,  y: 215 },
            { x: 570, y: 215 },
          ].map((pt, i) => (
            <g key={`pt-${i}`} opacity="0.4">
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

        {/* ── Subsystem 2: Large Concentric Geometric Arcs & Partial Rings ── */}
        {/* Major Outer Orbit Arc (Continuous slow rotation, 112px radius) */}
        <g
          className="rs-major-orbit"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={R_OUTER_MAJOR}
            stroke={primaryColor}
            strokeWidth="1.0"
            strokeOpacity="0.28"
            strokeDasharray="6 12 18 12 36 14"
          />

          {/* Cardinal markers on major outer arc */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x = CX + (R_OUTER_MAJOR + 5) * Math.cos(rad);
            const y = CY + (R_OUTER_MAJOR + 5) * Math.sin(rad);
            return (
              <circle
                key={`cad-${i}`}
                cx={x}
                cy={y}
                r="1.4"
                fill={primaryColor}
                opacity="0.7"
              />
            );
          })}
        </g>

        {/* Secondary Cadence Ring (Counter-rotating segmented arc, 88px radius) */}
        <g
          className="rs-cadence-ring"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <circle
            cx={CX}
            cy={CY}
            r={R_CADENCE}
            stroke={primaryColor}
            strokeWidth="1.1"
            strokeOpacity="0.22"
            strokeDasharray="60 14 35 14 90 16"
          />
        </g>

        {/* Subtle Rotating Scanning Beam (45-degree sector arc) */}
        <g
          className="rs-scan-beam"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        >
          <path
            d={`M ${CX} ${CY} L ${CX + R_OUTER_MAJOR} ${CY} A ${R_OUTER_MAJOR} ${R_OUTER_MAJOR} 0 0 1 ${CX + R_OUTER_MAJOR * 0.75} ${CY + R_OUTER_MAJOR * 0.66} Z`}
            fill="url(#rs-scan-grad-large)"
          />
          <line
            x1={CX}
            y1={CY}
            x2={CX + R_OUTER_MAJOR}
            y2={CY}
            stroke={primaryColor}
            strokeWidth="1.0"
            strokeOpacity="0.45"
          />
        </g>

        {/* Intermediate Guide Contour (66px radius) */}
        <circle
          cx={CX}
          cy={CY}
          r={R_MIDDLE}
          stroke={primaryColor}
          strokeWidth="0.9"
          strokeOpacity="0.32"
          strokeDasharray="8 4"
        />

        {/* Inner Boundary Arc (44px radius) */}
        <circle
          cx={CX}
          cy={CY}
          r={R_INNER}
          stroke={primaryColor}
          strokeWidth="0.85"
          strokeOpacity="0.3"
        />

        {/* Beacon Collar Ring (24px radius) */}
        <circle
          cx={CX}
          cy={CY}
          r={R_COLLAR}
          stroke={primaryColor}
          strokeWidth="0.85"
          strokeOpacity="0.38"
          strokeDasharray="2 3"
        />

        {/* ── Subsystem 3: Central Glowing Beacon Point ── */}
        {/* Core Node Ring */}
        <circle
          cx={CX}
          cy={CY}
          r={R_CORE}
          stroke={primaryColor}
          strokeWidth="0.9"
          strokeOpacity="0.4"
        />

        {/* Breathing Beacon Aura (Anime.js animated) */}
        <circle
          cx={CX}
          cy={CY}
          r={R_CORE * 0.8}
          stroke={primaryColor}
          strokeWidth="1.0"
          fill="none"
          className="rs-beacon-aura"
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />

        {/* Central Luminous Core Node */}
        <circle
          cx={CX}
          cy={CY}
          r="3.2"
          fill={primaryColor}
          filter="url(#rs-glow-filter)"
          className="transition-colors duration-500"
        />
        <circle
          cx={CX}
          cy={CY}
          r="1.2"
          fill="#ffffff"
        />

        {/* ── Subsystem 4: Small Orbiting Photon Points ── */}
        {/* Orbiting Photon 1 along Intermediate Ring (R_MIDDLE) */}
        <circle r="1.6" fill={primaryColor} filter="url(#rs-glow-filter)" opacity="0.95">
          <animateMotion
            path={PATH_ORBIT_1}
            dur="15s"
            repeatCount="indefinite"
            begin="0s"
          />
        </circle>

        {/* Orbiting Photon 2 along Cadence Ring (R_CADENCE - Counter-orbit) */}
        <circle r="1.3" fill="#ffffff" opacity="0.85">
          <animateMotion
            path={PATH_ORBIT_2}
            dur="20s"
            repeatCount="indefinite"
            begin="3s"
          />
        </circle>
      </svg>
    </div>
  );
}
