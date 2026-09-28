"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

export default function ExperienceLightHorizon() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="relative w-full max-w-[460px] h-[130px] pointer-events-none select-none flex items-center justify-center overflow-hidden"
    >
      {/* ── Ultra-faint horizon reference line ──────────────────── */}
      <div
        className="absolute w-[360px] h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.035) 25%, rgba(255, 255, 255, 0.05) 50%, rgba(255, 255, 255, 0.035) 75%, transparent 100%)",
        }}
      />

      {/* ── Primary Soft Horizontal Light Horizon Glow ──────────── */}
      {!shouldReduceMotion ? (
        <motion.div
          className="absolute h-[2px] w-[130px] rounded-full will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(124, 58, 237, 0.32) 25%, rgba(6, 182, 212, 0.45) 60%, rgba(249, 115, 22, 0.22) 85%, transparent 100%)",
            boxShadow:
              "0 0 16px 2px rgba(124, 58, 237, 0.16), 0 0 28px 4px rgba(6, 182, 212, 0.08)",
          }}
          animate={{
            x: [-120, 200],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ) : (
        <div
          className="absolute h-[1.5px] w-[110px] rounded-full opacity-40"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent)",
          }}
        />
      )}

      {/* ── Secondary Delayed Faint Horizon Sweep ───────────────── */}
      {!shouldReduceMotion && (
        <motion.div
          className="absolute h-[1.5px] w-[95px] rounded-full will-change-transform"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(37, 99, 235, 0.28) 35%, rgba(139, 92, 246, 0.35) 70%, transparent 100%)",
            boxShadow:
              "0 0 14px 2px rgba(37, 99, 235, 0.12), 0 0 24px 3px rgba(139, 92, 246, 0.07)",
          }}
          animate={{
            x: [-80, 180],
            opacity: [0, 0.65, 0.65, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 7.5,
          }}
        />
      )}

      {/* ── 3–4 Tiny RGB particles crossing near the horizon ─────── */}
      {!shouldReduceMotion && (
        <>
          <motion.span
            className="absolute rounded-full"
            style={{
              width: "1.2px",
              height: "1.2px",
              backgroundColor: "rgba(139, 92, 246, 0.8)",
              top: "42%",
              left: "28%",
            }}
            animate={{
              y: [-5, 6, -5],
              x: [-4, 6, -4],
              opacity: [0.06, 0.22, 0.06],
            }}
            transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{
              width: "1.4px",
              height: "1.4px",
              backgroundColor: "rgba(6, 182, 212, 0.8)",
              top: "54%",
              left: "58%",
            }}
            animate={{
              y: [4, -5, 4],
              x: [5, -4, 5],
              opacity: [0.07, 0.24, 0.07],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{
              width: "1.1px",
              height: "1.1px",
              backgroundColor: "rgba(249, 115, 22, 0.75)",
              top: "46%",
              left: "74%",
            }}
            animate={{
              y: [-3, 5, -3],
              opacity: [0.05, 0.18, 0.05],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4.5,
            }}
          />
          <motion.span
            className="absolute rounded-full"
            style={{
              width: "1.2px",
              height: "1.2px",
              backgroundColor: "rgba(59, 130, 246, 0.75)",
              top: "58%",
              left: "40%",
            }}
            animate={{
              y: [3, -4, 3],
              x: [-3, 4, -3],
              opacity: [0.06, 0.19, 0.06],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </>
      )}
    </div>
  );
}
