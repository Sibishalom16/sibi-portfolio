"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function SkillsLightField() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[500px] h-[170px] pointer-events-none select-none overflow-hidden"
    >
      {/* Very faint, deep ambient glow in the negative space */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[100px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 235, 0.045) 0%, rgba(124, 58, 237, 0.02) 45%, transparent 75%)",
          filter: "blur(40px)",
        }}
      />

      <svg
        viewBox="0 0 500 170"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          {/* Subtle flowing light trace gradients */}
          <linearGradient id="wave-cyan-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
            <stop offset="25%" stopColor="#06b6d4" stopOpacity="0.14" />
            <stop offset="70%" stopColor="#2563eb" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="wave-violet-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
            <stop offset="35%" stopColor="#7c3aed" stopOpacity="0.10" />
            <stop offset="75%" stopColor="#1d4ed8" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="wave-amber-cyan" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f97316" stopOpacity="0" />
            <stop offset="45%" stopColor="#f97316" stopOpacity="0.07" />
            <stop offset="80%" stopColor="#06b6d4" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* ── Wave 1: Primary Cyan/Blue ultra-thin flowing curve ──── */}
        <motion.path
          d="M 15 88 C 120 35, 230 145, 350 78 S 460 115, 495 85"
          fill="none"
          stroke="url(#wave-cyan-blue)"
          strokeWidth="1.1"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  d: [
                    "M 15 88 C 120 35, 230 145, 350 78 S 460 115, 495 85",
                    "M 15 84 C 145 135, 215 45, 340 110 S 475 68, 495 95",
                    "M 15 88 C 120 35, 230 145, 350 78 S 460 115, 495 85",
                  ],
                  opacity: [0.12, 0.18, 0.12],
                }
          }
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* ── Wave 2: Secondary Violet/Blue curve ─────────────────── */}
        <motion.path
          d="M 25 125 C 135 158, 255 88, 375 130 S 455 100, 490 118"
          fill="none"
          stroke="url(#wave-violet-blue)"
          strokeWidth="0.85"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  d: [
                    "M 25 125 C 135 158, 255 88, 375 130 S 455 100, 490 118",
                    "M 25 116 C 155 78, 275 150, 395 98 S 445 132, 490 108",
                    "M 25 125 C 135 158, 255 88, 375 130 S 455 100, 490 118",
                  ],
                  opacity: [0.08, 0.14, 0.08],
                }
          }
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        />

        {/* ── Wave 3: Tertiary subtle Warm Orange/Cyan trace ──────── */}
        <motion.path
          d="M 35 50 C 165 78, 290 22, 405 60 S 475 42, 495 48"
          fill="none"
          stroke="url(#wave-amber-cyan)"
          strokeWidth="0.75"
          animate={
            shouldReduceMotion
              ? {}
              : {
                  d: [
                    "M 35 50 C 165 78, 290 22, 405 60 S 475 42, 495 48",
                    "M 35 60 C 145 30, 310 88, 395 38 S 465 65, 495 52",
                    "M 35 50 C 165 78, 290 22, 405 60 S 475 42, 495 48",
                  ],
                  opacity: [0.06, 0.11, 0.06],
                }
          }
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* ── 4–5 Tiny drifting atmospheric light points ─────────── */}
        {!shouldReduceMotion && (
          <>
            <motion.circle
              cx="120"
              cy="75"
              r="1.2"
              fill="#06b6d4"
              animate={{
                cx: [120, 132, 120],
                cy: [75, 68, 75],
                opacity: [0.08, 0.22, 0.08],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle
              cx="260"
              cy="110"
              r="1.4"
              fill="#8b5cf6"
              animate={{
                cx: [260, 248, 260],
                cy: [110, 118, 110],
                opacity: [0.06, 0.18, 0.06],
              }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2,
              }}
            />
            <motion.circle
              cx="380"
              cy="62"
              r="1.1"
              fill="#3b82f6"
              animate={{
                cx: [380, 390, 380],
                cy: [62, 56, 62],
                opacity: [0.08, 0.2, 0.08],
              }}
              transition={{
                duration: 13,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 4,
              }}
            />
            <motion.circle
              cx="440"
              cy="95"
              r="1.2"
              fill="#f97316"
              animate={{
                cx: [440, 432, 440],
                cy: [95, 102, 95],
                opacity: [0.05, 0.15, 0.05],
              }}
              transition={{
                duration: 17,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            />
          </>
        )}
      </svg>
    </div>
  );
}
