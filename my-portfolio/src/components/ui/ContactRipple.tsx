"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

const rippleEase = [0.22, 1, 0.36, 1] as const;

export default function ContactRipple() {
  const shouldReduceMotion = useReducedMotion();

  // Exactly 3 concentric expanding rings: blue, violet, cyan
  const rings = [
    { id: 1, color: "#2563eb", delay: 0 },
    { id: 2, color: "#7c3aed", delay: 1.8 },
    { id: 3, color: "#06b6d4", delay: 3.6 },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -top-16 -left-16 w-[340px] h-[340px] select-none -z-10 overflow-visible"
    >
      <svg
        viewBox="0 0 340 340"
        className="w-full h-full overflow-visible"
        aria-hidden="true"
      >
        {shouldReduceMotion ? (
          <circle
            cx="170"
            cy="170"
            r="80"
            fill="none"
            stroke="#7c3aed"
            strokeWidth="1"
            opacity="0.06"
          />
        ) : (
          rings.map((ring) => (
            <motion.circle
              key={ring.id}
              cx="170"
              cy="170"
              fill="none"
              stroke={ring.color}
              strokeWidth="1"
              initial={{ r: 35, opacity: 0 }}
              whileInView={{
                r: [35, 145],
                opacity: [0.20, 0],
              }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{
                duration: 4.8,
                repeat: Infinity,
                delay: ring.delay,
                ease: rippleEase,
              }}
            />
          ))
        )}
      </svg>
    </div>
  );
}
