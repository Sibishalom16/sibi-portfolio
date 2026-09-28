"use client";

import React, { useEffect, useRef } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseRadius: number;
  baseOpacity: number;
  colorIdx: number; // 0: cyan, 1: blue, 2: violet
}

// Low-opacity subtle colors matching cyan -> blue -> violet progression
const DOT_COLORS = [
  { r: 6, g: 182, b: 212 },   // cyan (#06b6d4)
  { r: 37, g: 99, b: 235 },   // blue (#2563eb)
  { r: 139, g: 92, b: 246 },  // violet (#8b5cf6)
];

export default function SkillsDotField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = false;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const isTouchDevice =
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window;

    // Mouse coordinates relative to canvas
    const mouse = {
      x: -9999,
      y: -9999,
      targetX: -9999,
      targetY: -9999,
      active: false,
    };

    // Wave parameters
    let waveStartTime = 0;
    let waveActive = true;
    const waveSpeed = 0.22; // px per ms
    const waveWidth = 90; // width of wave influence

    let dots: Dot[] = [];

    const initDots = () => {
      dots = [];
      const cols = isTouchDevice ? 11 : 18;
      const rows = isTouchDevice ? 6 : 9;

      const paddingX = 24;
      const paddingY = 20;
      const stepX = (width - paddingX * 2) / (cols - 1);
      const stepY = (height - paddingY * 2) / (rows - 1);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Slight natural organic jitter in base grid positioning
          const jitterX = (Math.sin(r * 3 + c * 5) * 0.4) * 2;
          const jitterY = (Math.cos(r * 5 + c * 3) * 0.4) * 2;
          const baseX = paddingX + c * stepX + jitterX;
          const baseY = paddingY + r * stepY + jitterY;

          // Color index transitions diagonally across the field
          const diag = (c / cols + r / rows) * 0.5;
          const colorIdx = diag < 0.35 ? 0 : diag < 0.7 ? 1 : 2;

          dots.push({
            baseX,
            baseY,
            x: baseX,
            y: baseY,
            vx: 0,
            vy: 0,
            baseRadius: 1.05 + (Math.sin(c + r) * 0.15),
            baseOpacity: 0.08 + (Math.cos(c * 2 + r) * 0.03),
            colorIdx,
          });
        }
      }
    };

    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
      initDots();

      // Trigger initial wave
      waveStartTime = performance.now();
      waveActive = true;

      if (prefersReducedMotion) {
        drawStatic();
      }
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];
        const color = DOT_COLORS[dot.colorIdx];
        ctx.beginPath();
        ctx.arc(dot.baseX, dot.baseY, dot.baseRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, 0.08)`;
        ctx.fill();
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Mouse events
    const handleMouseMove = (e: MouseEvent) => {
      if (isTouchDevice || prefersReducedMotion) return;
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.targetX = -9999;
      mouse.targetY = -9999;
    };

    if (!isTouchDevice) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    // Trigger wave whenever section enters viewport
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry.isIntersecting;
        if (isVisible && !prefersReducedMotion) {
          waveStartTime = performance.now();
          waveActive = true;
        }
      },
      { threshold: 0.15 }
    );
    io.observe(container);

    // Periodically re-trigger subtle wave (every 8.5 seconds)
    const waveInterval = setInterval(() => {
      if (isVisible && !prefersReducedMotion) {
        waveStartTime = performance.now();
        waveActive = true;
      }
    }, 8500);

    // Render loop
    const render = (time: number) => {
      if (!isVisible || prefersReducedMotion) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth mouse coordinate lerping
      if (mouse.active) {
        mouse.x += (mouse.targetX - mouse.x) * 0.12;
        mouse.y += (mouse.targetY - mouse.y) * 0.12;
      } else {
        mouse.x += (-9999 - mouse.x) * 0.1;
        mouse.y += (-9999 - mouse.y) * 0.1;
      }

      // Wave calculation: propagates from upper-left (0,0) to bottom-right
      const waveElapsed = time - waveStartTime;
      const currentWaveDist = waveElapsed * waveSpeed;
      const maxDist = Math.hypot(width, height) + waveWidth;

      if (currentWaveDist > maxDist) {
        waveActive = false;
      }

      const magneticRadius = 65; // subtle small influence

      for (let i = 0; i < dots.length; i++) {
        const dot = dots[i];

        // 1. WAVE EFFECT
        let waveOffset = 0;
        let waveOpacityAdd = 0;
        let waveRadiusAdd = 0;
        let color = DOT_COLORS[dot.colorIdx];

        if (waveActive) {
          const dotDistFromOrigin = Math.hypot(dot.baseX, dot.baseY);
          const distFromWavefront = dotDistFromOrigin - currentWaveDist;

          if (Math.abs(distFromWavefront) < waveWidth) {
            // Normalized bell curve: 1 at wave center, 0 at edges
            const factor = Math.cos((distFromWavefront / waveWidth) * (Math.PI / 2));
            const clamped = Math.max(0, factor);

            // Staggered vertical displacement: 2 to 4px
            waveOffset = -Math.sin(clamped * Math.PI) * 3.5;
            // Opacity increase
            waveOpacityAdd = clamped * 0.22;
            // Radius increase
            waveRadiusAdd = clamped * 0.55;

            // Subtle hue shift along the wave
            if (clamped > 0.4) {
              const nextColor = DOT_COLORS[(dot.colorIdx + 1) % DOT_COLORS.length];
              color = nextColor;
            }
          }
        }

        // 2. MOUSE INTERACTION (subtle magnetic deflection: 2 to 4px)
        let mouseDispX = 0;
        let mouseDispY = 0;
        let mouseOpacityAdd = 0;

        if (mouse.active) {
          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < magneticRadius && dist > 0.001) {
            const influence = (1 - dist / magneticRadius);
            const force = influence * 3.2; // max ~3.2px displacement
            const angle = Math.atan2(dy, dx);

            mouseDispX = Math.cos(angle) * force;
            mouseDispY = Math.sin(angle) * force;
            mouseOpacityAdd = influence * 0.18;
          }
        }

        // Target position
        const targetX = dot.baseX + mouseDispX;
        const targetY = dot.baseY + waveOffset + mouseDispY;

        // Smooth spring dampening back to base
        dot.vx = (targetX - dot.x) * 0.18;
        dot.vy = (targetY - dot.y) * 0.18;
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Final radius and opacity
        const radius = Math.max(0.6, dot.baseRadius + waveRadiusAdd);
        const opacity = Math.min(
          0.38,
          dot.baseOpacity + waveOpacityAdd + mouseOpacityAdd
        );

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity.toFixed(3)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    if (!prefersReducedMotion) {
      animId = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(waveInterval);
      resizeObserver.disconnect();
      io.disconnect();
      if (!isTouchDevice) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="relative w-full max-w-[480px] h-[180px] select-none pointer-events-auto cursor-default overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  );
}
