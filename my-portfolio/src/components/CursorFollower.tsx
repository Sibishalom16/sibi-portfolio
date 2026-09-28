"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function CursorFollower() {
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);
  const hasInitialized = useRef(false);
  const stopTimeout = useRef<NodeJS.Timeout | null>(null);

  // Position motion values
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  // Spring smoothing for cursor trailing (fluid and restrained)
  const sx = useSpring(x, { stiffness: 125, damping: 24, mass: 0.45 });
  const sy = useSpring(y, { stiffness: 125, damping: 24, mass: 0.45 });

  // Interactive hover detection (0 = idle, 1 = hovering interactive element)
  const isInteractive = useMotionValue(0);
  const springInteractive = useSpring(isInteractive, {
    stiffness: 140,
    damping: 22,
  });

  // Motion velocity detection to subtly brighten nearby light while moving
  const moveBoost = useMotionValue(0);
  const springBoost = useSpring(moveBoost, {
    stiffness: 90,
    damping: 20,
  });

  // Cursor position ratio across viewport for subtle chromatic shift
  const xRatio = useMotionValue(0.5);
  const springXRatio = useSpring(xRatio, { stiffness: 60, damping: 25 });

  // Base opacity with subtle boost over interactive items and during motion (~125% of baseline)
  const baseOpacity = useTransform(springInteractive, [0, 1], [1.0, 1.3]);
  const glowScale = useTransform(springInteractive, [0, 1], [1, 1.04]);

  const totalOpacity = useTransform(
    [baseOpacity, springBoost],
    ([base, boost]) => (visible ? (base as number) + (boost as number) * 0.35 : 0)
  );

  // Subtle color shift gradient based on horizontal position across the screen
  const gradient = useTransform(springXRatio, (ratio) => {
    // Subtle balance: left side has a hint more blush/coral warmth, right side leans into subtle violet/cyan
    const blushAlpha = (0.135 + (0.5 - Math.abs(ratio - 0.5)) * 0.02).toFixed(3);
    return `radial-gradient(circle, rgba(243, 182, 200, ${blushAlpha}) 0%, rgba(216, 170, 225, 0.055) 34%, rgba(124, 58, 237, 0.022) 54%, transparent 72%)`;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Disable on mobile/touch screens and reduced-motion preferences
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setActive(true);

    const move = (e: MouseEvent) => {
      if (!hasInitialized.current) {
        x.set(e.clientX);
        y.set(e.clientY);
        hasInitialized.current = true;
        setVisible(true);
      } else {
        x.set(e.clientX);
        y.set(e.clientY);
      }

      // Track horizontal ratio for delicate color shifting
      xRatio.set(e.clientX / (window.innerWidth || 1));

      // Calculate subtle speed-based brightening during motion
      const speed = Math.min(
        Math.hypot(e.movementX || 0, e.movementY || 0) / 32,
        0.22
      );
      moveBoost.set(speed);
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
      stopTimeout.current = setTimeout(() => {
        moveBoost.set(0);
      }, 100);

      // Check if cursor is over interactive elements without triggering React re-renders
      const target = e.target as HTMLElement | null;
      const isOverInteractive = Boolean(
        target?.closest(
          'a, button, [role="button"], input, textarea, select, [tabindex], span.border, [data-interactive="true"]'
        )
      );
      isInteractive.set(isOverInteractive ? 1 : 0);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      if (stopTimeout.current) clearTimeout(stopTimeout.current);
    };
  }, [x, y, isInteractive, moveBoost, xRatio]);

  if (!active) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[1]"
      style={{
        x: sx,
        y: sy,
        width: 760,
        height: 760,
        marginLeft: -380,
        marginTop: -380,
        scale: glowScale,
        opacity: totalOpacity,
        background: gradient,
        filter: "blur(60px)",
        borderRadius: "50%",
        willChange: "transform, opacity",
      }}
    />
  );
}
